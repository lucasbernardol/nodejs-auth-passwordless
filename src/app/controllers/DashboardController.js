import { User } from '../models/User.js';

export class DashboardController {
  async dashboard(request, response, next) {
    try {
      const userId = request.userId;

      const user = await User.findById(userId);

      return response.render('pages/dashboard', {
        user: JSON.stringify(user, null, 2),
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default new DashboardController();
