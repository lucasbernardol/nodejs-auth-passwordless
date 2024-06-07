import { User } from '../models/User.js';

export class DashboardController {
  async dashboard(request, response, next) {
    try {
      const userId = request.userId;

      const user = await User.findById(userId);

      return response.render('pages/dashboard', {
        user,
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default new DashboardController();
