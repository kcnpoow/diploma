import bcrypt from 'bcrypt';

import tokenService from './tokenService.js';
import ApiError from '../errors/ApiError.js';
import userModel from '../models/userModel.js';
import UserDto from '../dtos/UserDto.js';
import tokenModel from '../models/tokenModel.js';

class UserService {
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.Unauthorized();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenDb = await tokenService.findRefreshToken(refreshToken);

    if (!userData || !tokenDb) {
      throw ApiError.Unauthorized();
    }

    const user = await userModel.findById(userData.id);
    const userDto = new UserDto(user);

    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);

    return { user: userDto, ...tokens };
  }

  async login(email, password) {
    const user = await userModel.findOne({ email });

    if (!user) {
      throw ApiError.NotFound('Неправильные почта и/или пароль');
    }

    const isPasswordEquals = bcrypt.compareSync(password, user.password);
    if (!isPasswordEquals) {
      throw ApiError.Forbidden('Неправильные почта и/или пароль');
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);

    return { user: userDto, ...tokens };
  }

  async register(name, email, password) {
    const candidate = await userModel.findOne({ email });
    if (candidate) {
      throw ApiError.Conflict('Пользователь с такой почтой уже существует');
    }

    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT)
    );

    await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
  }

  async logout(refreshToken) {
    await tokenService.removeToken(refreshToken);
  }

  async update(refreshToken, name, email) {
    const oldUser = tokenService.validateRefreshToken(refreshToken);
    const newUser = await userModel.updateOne(
      { id: oldUser.id },
      { name, email }
    );
    return newUser;
  }
}

const userService = new UserService();

export default userService;
