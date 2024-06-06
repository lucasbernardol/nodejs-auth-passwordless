import { Router } from 'express';
import HomeController from './app/controllers/HomeController.js';
import SessionController from './app/controllers/api/SessionController.js';
import DashboardController from './app/controllers/DashboardController.js';
import AuthenticateController from './app/controllers/AuthenticateController.js';

import UserController from './app/controllers/api/UserController.js';

import {
  authenticateMagicToken,
  authenticate,
} from './app/middlewares/authenticate.js';

const routes = Router();

const { guard, verifyIdentity } = authenticate();

routes.get('/', guard(), HomeController.home);
routes.get('/sign-in', guard(), AuthenticateController.signIn);
routes.get('/resend-email', guard(), AuthenticateController.resend);
routes.get('/authenticate', AuthenticateController.authenticate);

/**
 * Private routes
 */
routes.get(
  '/sign-in/complete',
  verifyIdentity(),
  AuthenticateController.complete,
);

routes.get('/dashboard', verifyIdentity(), DashboardController.dashboard);

/**
 * API routes
 */
routes.post('/api/sessions/sign-in', SessionController.signUp);

routes.post(
  '/api/sessions/authenticate',
  authenticateMagicToken(),
  SessionController.authenticate,
);

routes.delete(
  '/api/sessions/logout',
  verifyIdentity(),
  SessionController.logout,
);

routes.get(
  '/api/users/sign-in/completed',
  verifyIdentity(),
  UserController.ckeck,
);
routes.post('/api/users/available', verifyIdentity(), UserController.available);
routes.post('/api/users/setup', verifyIdentity(), UserController.setup);

export { routes };
