import database from '../MongoConnect';
import { User } from '../schemas/UserSchema';

import bcryptjs from 'bcryptjs';

const createUser = async (queryUser: any) => {
  try {
    if (!database.connect()) return false;
    const { password, email, username } = queryUser;

    const alreadyEmail = await User.findOne({ email });
    if (alreadyEmail) {
      return { status: 0, message: `Email já cadastrado` };
    }

    const alreadyName = await User.findOne({ username });
    if (alreadyName) {
      return { status: 0, message: `Usuário já cadastrado` };
    }

    const salt = bcryptjs.genSaltSync();
    const cryptPassword = bcryptjs.hashSync(password, salt);

    const dataUser = { ...queryUser, password: cryptPassword };
    const user = new User(dataUser);
    if (await user.save()) {
      return { status: 1, email, message: `Created with success` };
    }
  } catch (e) {
    throw new Error('Error in create user');
  }
};

// Create: Model.create() ou new Model() seguido de model.save()
// Read: Model.find(), Model.findOne(), Model.findById()
// Update: Model.updateOne(), Model.updateMany(), Model.findOneAndUpdate(), Model.findByIdAndUpdate()
// Delete: Model.deleteOne(), Model.deleteMany(), Model.findOneAndDelete(), Model.findByIdAndDelete()

const showUser = async (id?: string) => {
  try {
    if (!database.connect()) return false;
    if (id) {
      const user = await User.findById(id);
      return user;
    } else {
      const user = await User.find();
      return user;
    }
  } catch (e) {
    console.error(e);
  }
};
const userController = {
  createUser,
  showUser
};

export default userController;
