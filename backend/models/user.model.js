import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    avatarUrl: {
      type: String,
      default:
        'images/default.png',
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  { collection: 'users' }
);

const userModel = mongoose.model('User', userSchema);

export default userModel;
