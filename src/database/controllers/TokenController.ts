import database from '../MongoConnect';
import { User } from '../schemas/UserSchema';

import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const createToken = async (queryUser: any) => {
  const { email = '', password = '' } = queryUser;

  if (!email || !password) {
    return { status: 0, message: 'invalid values' };
  }

  if (!database.connect()) return false;
  const user = await User.findOne({ email });
  if (!user) {
    return { status: 0, message: `User doesn't exists` };
  }

  if (!(await bcryptjs.compare(password, user.password))) {
    return { status: 0, message: `Invalid password` };
  }

  const { id } = user;
  const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET as string, {
    expiresIn: '7 days'
  });
  return { status: 1, token };
};

const validToken = async (token: string) => {
  try {
    const userData = jwt.verify(token, process.env.TOKEN_SECRET as string);
    return { status: 1, userData };
  } catch (e) {
    return { status: 0, message: e };
  }
};

const tokenController = {
  createToken,
  validToken
};

export default tokenController;
