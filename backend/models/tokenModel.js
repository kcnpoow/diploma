import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    refreshToken: { type: String },
  },
  { collection: 'tokens' }
);

const tokenModel = mongoose.model('Token', tokenSchema);

export default tokenModel;
