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
      const loginField = get(req.body, 'loginName');
      if (includes(loginField, '@')) {
        const email = get(req.body, 'loginName');
        const getUserByHisEmail = await User.findOne({ email });
        return getUserByHisEmail;
      }
      const userName = get(req.body, 'loginName');
      const getUserByHisUsername = await User.findOne({ userName });
      return getUserByHisUsername;
    })();

    if (!user) {
      return res.status(404).send('No user found.');
    }

    const password = get(req.body, 'password');
    const userHashPassword = get(user, 'password');
    const passwordIsValid = bcrypt.compareSync(password, userHashPassword);

    if (!passwordIsValid) {
      return res.status(401).send({ auth: false });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: 86400,
    });

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: true,
    });

    return res.status(200).send({ auth: true });
  } catch (err) {
    return res.status(500).send('There was a problem logging in.');
  }
}

export async function me(req, res) {
  const cookies = req.headers['cookie'];
  const token = cookies
    .split(';')
    .find((cookie) => cookie.trim().startsWith('access_token='));
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  }
  console.log('la valeur est : ' + req.headers);
  const accessToken = token.split('=')[1].trim();

  jwt.verify(accessToken, process.env.SECRET, async function (err, decoded) {
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

export async function logout(req, res) {
  try {
    const token = req.headers['cookie'];
    if (!token) {
      return res
        .status(401)
        .send({ auth: false, message: 'No token provided.' });
    }

    res.clearCookie('access_token');
    return res.status(200).send({ auth: false, token: null });
  } catch (err) {
    return res.status(500).send('There was a problem logging out.');
  }
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
