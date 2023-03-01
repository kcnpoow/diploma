import jwt from 'jsonwebtoken';

import tokenModel from '../models/token.model.js';

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {
      expiresIn: process.env.ACCESS_SECRET_TIME,
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {
      expiresIn: process.env.REFRESH_SECRET_TIME,
    });

    return { accessToken, refreshToken };
  }

  async findRefreshToken(refreshToken) {
    return await tokenModel.findOne({ refreshToken });
  }

  async saveRefreshToken(userId, refreshToken) {
    const token = await tokenModel.findOne({ user: userId });

    if (token) {
      token.refreshToken = refreshToken;
      await token.save();
    } else {
      await tokenModel.create({ user: userId, refreshToken });
    }
  }

  async removeRefreshToken(refreshToken) {
    await tokenModel.deleteOne({ refreshToken });
  }

  validateAccessToken(accessToken) {
    try {
      return jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY);
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(refreshToken) {
    try {
      return jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
    } catch (error) {
      return null;
    }
  }
}

export default new TokenService();
