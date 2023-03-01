import ApiError from '../errors/Api.error.js';

const errorMiddleware = (error, req, res, next) => {
  if (error instanceof ApiError) {
    return res.status(error.status).json({ message: error.message });
  }

  return res.status(500).json({ message: 'Internal Server Error' });
};

export default errorMiddleware;
