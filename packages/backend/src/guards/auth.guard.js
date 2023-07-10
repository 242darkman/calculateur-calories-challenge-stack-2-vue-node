import {
  checkRefreshToken,
  generateAccessToken,
} from '../controllers/auth/auth.controller.js';
import { get, includes } from 'lodash';

import User from '../../models/user/user.model.js';
import jwt from 'jsonwebtoken';

export async function userGuard(req, res, next) {
  const token = req.headers['x-access-token'];
  const refreshToken = req.headers['x-refresh-token'];

  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }

  jwt.verify(token, process.env.SECRET, async function (err, decoded) {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        try {
          const userId = await checkRefreshToken(refreshToken);
          const user = await User.findById(userId);
          if (!user) {
            return res
              .status(404)
              .send({ auth: false, message: 'No user found.' });
          }

          const newToken = generateAccessToken(user);
          res.setHeader('x-access-token', newToken);
        } catch (refreshTokenErr) {
          return res
            .status(403)
            .send({ auth: false, message: refreshTokenErr.message });
        }
      } else {
        return res
          .status(500)
          .send({ auth: false, message: 'Failed to authenticate token.' });
      }
    } else {
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).send({ auth: false, message: 'No user found.' });
      }

      req.user = user;
      next();
    }
  });
}

export async function adminGuard(req, res, next) {
  const token = req.headers['x-access-token'];
  const refreshToken = req.headers['x-refresh-token'];

  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }

  jwt.verify(token, process.env.SECRET, async function (err, decoded) {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        try {
          const userId = await checkRefreshToken(refreshToken);
          const user = await User.findById(userId);
          if (!user) {
            return res
              .status(404)
              .send({ auth: false, message: 'No user found.' });
          }

          const roles = get(user, 'roles');
          if (!includes(roles, 'admin')) {
            return res
              .status(403)
              .send({ auth: false, message: 'Requires admin role.' });
          }

          const newToken = generateAccessToken(user);
          res.setHeader('x-access-token', newToken);
        } catch (refreshTokenErr) {
          return res
            .status(403)
            .send({ auth: false, message: refreshTokenErr.message });
        }
      } else {
        return res
          .status(500)
          .send({ auth: false, message: 'Failed to authenticate token.' });
      }
    } else {
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).send({ auth: false, message: 'No user found.' });
      }

      const roles = get(user, 'roles');
      if (!includes(roles, 'admin')) {
        return res
          .status(403)
          .send({ auth: false, message: 'Requires admin role.' });
      }

      req.user = user;
      next();
    }
  });
}
