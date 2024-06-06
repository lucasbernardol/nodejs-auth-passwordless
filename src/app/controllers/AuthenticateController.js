export class AuthenticateController {
  async signIn(request, response, next) {
    try {
      return response.render('pages/sign-in', { state: {} });
    } catch (error) {
      return next(error);
    }
  }

  async resend(request, response, next) {
    try {
      return response.render('pages/resend-email');
    } catch (error) {
      return next(error);
    }
  }

  async authenticate(request, response, next) {
    try {
      return response.render('pages/authenticate', { state: {} });
    } catch (error) {
      return next(error);
    }
  }

  async complete(request, response, next) {
    try {
      return response.render('pages/complete', { state: {} });
    } catch (error) {
      return next(error);
    }
  }
}

export default new AuthenticateController();
