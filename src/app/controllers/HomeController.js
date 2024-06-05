export class HomeController {
  async home(request, response, next) {
    try {
      return response.render('home');
    } catch (error) {
      return next(error);
    }
  }
}

export default new HomeController();
