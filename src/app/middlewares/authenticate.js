import { promisify } from 'node:util';

import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

const verify = promisify(jwt.verify);

export function authenticateMagicToken() {
  const MAGIC_TOKEN_SECRET = process.env.JWT_MAGIC_TOKEN_SECRET;

  return async (request, response, next) => {
    try {
      const { token } = request.query;

      if (!token) {
        return response.status(StatusCodes.UNAUTHORIZED).json({
          message: 'Token not provided',
        });
      }

      const payload = await verify(token, MAGIC_TOKEN_SECRET);

      request.userId = payload.id;

      return next();
    } catch (error) {
      console.log('ERROR', error);

      return response
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Unauthorized' });
    }
  };
}

export function authenticate() {
  const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;

  /**
   * @param {import('express').Request} request Express request object.
   * @returns
   */
  const cookie = (request) => request?.cookies?.token; // jwt

  function guard() {
    return (request, response, next) => {
      try {
        if (cookie(request)) {
          return response.redirect('/dashboard');
        }

        return next();
      } catch (error) {
        return next(error);
      }
    };
  }

  function verifyIdentity() {
    return async (request, response, next) => {
      try {
        const token = cookie(request);

        if (!token) {
          return response.redirect('/sign-in');
        }

        const payload = await verify(token, ACCESS_TOKEN_SECRET);

        request.userId = payload.id;

        return next();
      } catch (error) {
        console.log(error); // Ignoring expires/malformat errors

        // respone.clearCookie('token')
        response.cookie('token', ' ', { maxAge: 0 });

        return response.redirect('/');
      }
    };
  }

  return { guard, verifyIdentity };
}
