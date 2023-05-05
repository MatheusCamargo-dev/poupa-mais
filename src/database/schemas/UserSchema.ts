import mongoose, { Schema } from 'mongoose';
const UserSchema = new Schema({
  fullname: { type: String, required: true, maxLength: 51 },
  username: { type: String, required: true, maxLength: 16 },
  password: { type: String, required: true },
  email: { type: String, required: true },
  active: { type: Boolean, default: true },
  avatar: {type: String, default: 'avatars/6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws'},
  expenseCategories: {type: Array,
    default: [
      {expenseCategory: 'Moradia'},
      {expenseCategory: 'Alimentação'},
      {expenseCategory: 'Assinaturas'},
      {expenseCategory: 'Transporte'},
      {expenseCategory: 'Saúde'},
      {expenseCategory: 'Educação'},
      {expenseCategory: 'Dívidas'},
      {expenseCategory: 'Transações'},
      {expenseCategory: 'Outros'},
    ]
  },
});

const User = mongoose.model('User', UserSchema);

export { User };
