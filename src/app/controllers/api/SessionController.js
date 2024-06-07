import { promisify } from 'node:util';

import jwt from 'jsonwebtoken';
import gravatar from 'gravatar';
import { StatusCodes } from 'http-status-codes';

import { User } from '../../models/User.js';
import { sendMagicLink } from '../../utils/sendMagicLink.js';

const MAGIC_TOKEN_SECRET = process.env.JWT_MAGIC_TOKEN_SECRET;
const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;

const accessTokenExpires = 1 * 24 * 60 * 60;

const signToken = promisify(jwt.sign);

const unix = () => Math.floor(Date.now() / 1000); // seconds

const milliseconds = (seconds) => Math.floor(seconds * 1000);

export class SessionController {
  async signUp(request, response, next) {
    try {
      const { email } = request.body;

      const user = await User.findOneAndUpdate(
        { email },
        { email, gravatar: gravatar.url(email, { default: 'mp', size: 128 }) },
        {
          upsert: true,
          new: true,
        },
      );

      const magicToken = await signToken({ id: user._id }, MAGIC_TOKEN_SECRET, {
        expiresIn: 30 * 60, // 5 minutes
      });

      await sendMagicLink({
        email,
        magicLink: `${process.env.HOST}/authenticate/?token=${magicToken}`,
      });

      return response.status(StatusCodes.ACCEPTED).end();
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Authenticate
   * @param {import('express').Request} request
   * @param {import('express').Response} response
   * @param {import('express').NextFunction} next
   * @returns
   */
  async authenticate(request, response, next) {
    try {
      const userId = request.userId; // Middleware to verify magic token

      const user = await User.findById(userId);

      if (!user) {
        return response.status(StatusCodes.UNAUTHORIZED).json({
          message: 'Invalid credentials',
        });
      }

      const accessToken = await signToken(
        { id: user._id },
        ACCESS_TOKEN_SECRET,
        {
          expiresIn: accessTokenExpires, // 1 day
        },
      );

      const currentDate = unix();

      if (!user.activatedAt) {
        await User.updateOne(
          {
            _id: user._id,
          },
          {
            $set: {
              activatedAt: currentDate,
            },
          },
        );
      }

      response.cookie('token', accessToken, {
        httpOnly: true,
        maxAge: milliseconds(accessTokenExpires),
      });

      return response.status(StatusCodes.OK).json({
        finishedAt: user.finishedAt,
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Logout
   * @param {import('express').Request} request
   * @param {import('express').Response} response
   * @param {import('express').NextFunction} next
   * @returns
   */
  async logout(request, response, next) {
    try {
      response.clearCookie('token');

      return response.status(StatusCodes.NO_CONTENT).end();
    } catch (error) {
      return next(error);
    }
  }
}

export default new SessionController();
