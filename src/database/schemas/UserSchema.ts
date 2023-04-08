import mongoose, { Schema } from 'mongoose';
const UserSchema = new Schema({
  fullname: { type: String, required: true, maxLength: 51 },
  username: { type: String, required: true, maxLength: 16 },
  password: { type: String, required: true },
  email: { type: String, required: true },
  active: { type: Boolean, default: true }
});

const User = mongoose.model('User', UserSchema);

export { User };
