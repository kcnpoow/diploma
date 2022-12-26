class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }

  static Unauthorized() {
    return new ApiError(401, 'Not authorized');
  }
  1;
  static Forbidden(message) {
    return new ApiError(403, message);
  }

  static NotFound(message) {
    return new ApiError(404, message);
  }

  static Conflict(message) {
    return new ApiError(409, message);
  }
}

export default ApiError;
