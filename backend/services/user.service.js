import fs from 'fs';
import bcrypt from 'bcrypt';

import ApiError from '../errors/Api.error.js';
import userModel from '../models/user.model.js';
import UserDto from '../dtos/User.dto.js';
import tokenService from './token.service.js';

class UserService {
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.Unauthorized();
    }

    const tokenData = tokenService.validateRefreshToken(refreshToken);
    const tokenDb = await tokenService.findRefreshToken(refreshToken);

    if (!tokenData || !tokenDb) {
      throw ApiError.Unauthorized();
    }

    const user = await userModel.findById(tokenData.id);
    const userDto = new UserDto(user);

    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);

    return { user: userDto, tokens };
  }

  async login(email, password) {
    const user = await userModel.findOne({ email });

    if (!user) {
      throw ApiError.NotFound('Неправильные почта и/или пароль');
    }

    const isPasswordsEquals = bcrypt.compareSync(password, user.password);
    if (!isPasswordsEquals) {
      throw ApiError.Forbidden('Неправильные почта и/или пароль');
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);

    return { user: userDto, tokens };
  }

  async register(name, email, password) {
    const candidate = await userModel.findOne({ email });
    if (candidate) {
      throw ApiError.Conflict('Пользователь с такой почтой уже существует');
    }

    const hashedPassword = bcrypt.hashSync(password, Number(process.env.SALT));

    await userModel.create({ name, email, password: hashedPassword });
  }

  async logout(refreshToken) {
    await tokenService.removeRefreshToken(refreshToken);
  }

  async update(id, data) {
    const user = await userModel.findById(id);
    const errors = {};

    if (data.avatar) {
      const url = `images/${id}-${Date.now()}.png`;

      fs.renameSync(data.avatar.path, `public/${url}`);

      user.avatarUrl = url;
    }

    if (data.name) {
      user.name = data.name;
    }

    if (data.email) {
      const usersWithSimilarEmail = await userModel.find({
        _id: { $ne: id },
        email: data.email,
      });

      if (usersWithSimilarEmail.length === 0) {
        user.email = data.email;
      } else {
        errors.email = {
          message: 'Данный адрес элетронной почты занят',
          status: 409,
        };
      }
    }

    if (data.newPassword) {
      const isPasswordsEquals = bcrypt.compareSync(
        data.password,
        user.password
      );

      if (isPasswordsEquals) {
        const hashedPassword = bcrypt.hashSync(
          data.newPassword,
          Number(process.env.SALT)
        );
        user.password = hashedPassword;
      } else {
        errors.password = { message: 'Неверный пароль', status: 403 };
      }
    }

    if (Object.keys(errors).length > 0) {
      throw ApiError.BadRequest(JSON.stringify(errors));
    }

    const updatedUser = await user.save();
    const userDto = new UserDto(updatedUser);

    return userDto;
  }
}

export default new UserService();
