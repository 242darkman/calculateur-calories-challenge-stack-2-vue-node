import { createUser, updateUser } from '../user/user.controller.js';

import RefreshToken from '../../models/auth/refresh-token.model.js';
import User from '../../models/user/user.model.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import get from 'lodash/get.js';
import includes from 'lodash/includes.js';
import jwt from 'jsonwebtoken';

dotenv.config();

export async function register(req, res, next) {
  try {
    await createUser(req, res, next);
  } catch (err) {
    return res.status(500).send('There was a problem registering the user.');
  }
}

export async function login(req, res) {
  try {
    // Déterminer si le champ est un email ou un username
    const user = await (async () => {
      const loginField = get(req.body, 'login');
      console.log(
        '🚀 ~ file: auth.controller.js:26 ~ user ~ loginField:',
        loginField
      );
      if (includes(loginField, '@')) {
        return await User.findOne({ email: req.body.login });
      }
      return await User.findOne({ username: req.body.login });
    })();
    console.log('🚀 ~ file: auth.controller.js:35 ~ user ~ user:', user);

    if (!user) {
      return res.status(404).send('No user found.');
    }

    const password = get(req.body, 'password');
    const userHashPassword = get(user, 'password');
    const passwordIsValid = bcrypt.compareSync(password, userHashPassword);

    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, token: null });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: 86400,
    });

    return res.status(200).send({ auth: true, token: token });
  } catch (err) {
    return res.status(500).send('There was a problem logging in.');
  }
}

export async function me(req, res) {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  }

  jwt.verify(token, process.env.SECRET, async function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' });

    const id = get(decoded, 'id');
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).send('No user found.');
    }

    return res.status(200).send(user);
  });
}

export async function createRefreshToken(user) {
  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );
  const newRefreshToken = new RefreshToken({
    token: refreshToken,
    userId: user._id,
  });
  await newRefreshToken.save();

  return refreshToken;
}

export function generateAccessToken(user) {
  const payload = { id: user._id };
  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' });
  return token;
}

export async function checkRefreshToken(refreshToken) {
  const refreshTokenFromDB = await RefreshToken.findOne({
    token: refreshToken,
  });
  if (!refreshTokenFromDB) {
    throw new Error('Invalid refresh token.');
  }

  if (Date.now() > refreshTokenFromDB.expiryDate) {
    throw new Error('Refresh token expired.');
  }

  return refreshTokenFromDB.userId;
}

export async function assignRole(req, res) {
  const { userId, role } = req.body;

  try {
    const user = await User.findById({ _id: userId });
    if (!user) return res.status(404).send('No user found.');

    if (user.roles.includes(role))
      return res.status(400).send('Role already assigned.');

    user.roles.push(role);
    await updateUser(user);

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send('There was a problem adding the role.');
  }
}
