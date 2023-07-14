import {
  checkRefreshToken,
  generateAccessToken,
} from '../controllers/auth/auth.controller.js';

import User from '../models/user/user.model.js';
import get from 'lodash/get.js';
import jwt from 'jsonwebtoken';

export async function authorize(req, res, next) {
  // Récupérez le token du cookie
  const token = get(req.cookies, 'access_token');

  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }

  // Vérifiez le token
  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if (err) {
      // Si le token n'est pas valide, essayez de le rafraîchir
      const refreshToken = get(req.cookies, 'refresh_token');

      if (!refreshToken) {
        return res
          .status(403)
          .send({ auth: false, message: 'No refresh token provided.' });
      }

      jwt.verify(refreshToken, process.env.SECRET, async (err, decoded) => {
        if (err) {
          return res.status(500).send({
            auth: false,
            message: 'Failed to authenticate refresh token.',
          });
        }

        const user = await User.findById(decoded.id);

        if (!user) {
          return res.status(404).send('No user found.');
        }

        // Créez un nouveau token
        const newToken = jwt.sign({ id: user._id }, process.env.SECRET, {
          expiresIn: 86400,
        });

        // Envoyez le nouveau token
        res.cookie('access_token', newToken, {
          httpOnly: true,
          secure: true,
          sameSite: true,
        });

        next();
      });
    } else {
      // Si le token est valide, passez à la requête suivante
      req.userId = decoded.id;
      next();
    }
  });
}
