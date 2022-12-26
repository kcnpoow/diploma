import jwt from 'jsonwebtoken';

import tokenModel from '../models/tokenModel.js';

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

  async saveRefreshToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({ user: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return await tokenData.save();
    }

    await tokenModel.create({ user: userId, refreshToken });
  }

  async removeToken(refreshToken) {
    await tokenModel.deleteOne({ refreshToken });
  }

  async findRefreshToken(refreshToken) {
    const token = await tokenModel.findOne({ refreshToken });; 
    return token;
  } 

  validateAccessToken(accessToken) {
    try {
      return jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY);
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(refreshToken) {
    try {
      return jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
    } catch (e) {
      return null;
    }
  }
}

const tokenService = new TokenService();

export default tokenService;
