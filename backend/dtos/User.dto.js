class UserDto {
  constructor(user) {
    this.id = user._id;
    this.avatarUrl = user.avatarUrl;
    this.name = user.name;
    this.email = user.email;
  }
}

export default UserDto;
