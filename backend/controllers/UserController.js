import userService from '../services/userService.js';

class UserController {
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const user = await userService.refresh(refreshToken);

      res
        .cookie('refreshToken', user.refreshToken, {
          maxAge: process.env.REFRESH_SECRET_TIME,
          httpOnly: true,
        })
        .json(user);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await userService.login(email, password);
      res
        .cookie('refreshToken', user.refreshToken, {
          httpOnly: true,
          maxAge: process.env.REFRESH_SECRET_TIME,
        })
        .json(user);
    } catch (error) {
      next(error);
    }
  }

  async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      await userService.register(name, email, password);
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      await userService.logout(refreshToken);
      res.clearCookie('refreshToken').sendStatus(200);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { name, email } = req.body;
      const { refreshToken } = req.cookies;
      const user = await userService.update(refreshToken, name, email);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}

const userController = new UserController();

export default userController;
