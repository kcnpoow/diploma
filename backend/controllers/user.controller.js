import userService from '../services/user.service.js';

class UserController {
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const { user, tokens } = await userService.refresh(refreshToken);
      res
        .cookie('refreshToken', tokens.refreshToken, {
          maxAge: process.env.REFRESH_SECRET_TIME,
          httpOnly: true,
        })
        .json({ info: user, accessToken: tokens.accessToken });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const { user, tokens } = await userService.login(email, password);
      res
        .cookie('refreshToken', tokens.refreshToken, {
          httpOnly: true,
          maxAge: process.env.REFRESH_SECRET_TIME,
        })
        .json({ info: user, accessToken: tokens.accessToken });
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
      const user = await userService.update(req.user.id, req.body);
      res.json(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

export default new UserController();
