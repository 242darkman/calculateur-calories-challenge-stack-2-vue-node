import { Schema, mongoose } from 'mongoose';

const refreshTokenSchema = new Schema({
  token: String,
  userId: String,
  expiryDate: Date,
});

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);
export default RefreshToken;
