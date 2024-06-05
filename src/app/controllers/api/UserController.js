import { StatusCodes } from 'http-status-codes';

import { User } from '../../models/User.js';

const unix = () => Math.floor(Date.now() / 1000);

export class UserController {
  async available(request, response, next) {
    try {
      const { username } = request.body;

      const user = await User.findOne({ username }).select(['_id', 'username']);

      const availableUser = Boolean(user?._id);

      return response
        .status(StatusCodes.OK)
        .json({ available: !availableUser });
    } catch (error) {
      return next(error);
    }
  }

  async ckeck(request, response, next) {
    try {
      const userId = request.userId;

      const { finishedAt } = await User.findById(userId).select([
        '_id',
        'finishedAt',
      ]);

      return response.status(StatusCodes.OK).json({ finishedAt });
    } catch (error) {
      return next(error);
    }
  }

  async setup(request, response, next) {
    try {
      const { name, username } = request.body;

      const userId = await request.userId;

      const user = await User.findOne({ username }).select(['_id', 'username']);

      if (user) {
        return response.status(StatusCodes.BAD_REQUEST).json({
          message: 'Invalid username',
        });
      }

      // Already setup
      const setupCompleted = await User.findById(userId).select([
        ['_id', 'finishedAt'],
      ]);

      if (setupCompleted?.finishedAt) {
        return response.status(StatusCodes.BAD_REQUEST).json({
          message: 'User completed setup',
        });
      }

      await User.updateOne(
        {
          _id: userId,
        },
        {
          $set: {
            name,
            username,
            finishedAt: unix(),
          },
        },
      );

      return response.status(StatusCodes.NO_CONTENT).end();
    } catch (error) {
      return next(error);
    }
  }
}

export default new UserController();
