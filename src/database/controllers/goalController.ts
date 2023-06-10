import database from '../MongoConnect';
import { Goal } from '../schemas/GoalSchema';

import { GoalStates } from '@/features/Goals';


const store = async (query: GoalStates) => {
  try {
    if (!database.connect()) return false;

    const goal = new Goal(query);
    if (await goal.save()) {
      return { status: 1, message: `Created with success`, goal };
    }
  } catch (e) {
    throw new Error('Error in create goal');
  }
};

const show = async (id: string) => {
  try {
    if (!database.connect()) return false;
    const data = await Goal.find({ user: id }).sort({ createdAt: -1 });
    return data;
  } catch (e) {
    throw new Error('Error in show income');
  }
};


const deleteById = async (id: string, user: string) => {
  try {
    if (!database.connect()) return false;
    const goal = await Goal.find({ user, _id: id });
    if (goal) {
      const data = await Goal.findByIdAndDelete(id);
      return data;
    }
  } catch (e) {
    throw new Error('Error in delete goal');
  }
};

const update = async (user: string, query: GoalStates) => {
  try {
    if (!database.connect()) return false;

    const goal = await Goal.find({ user, _id: query._id });


    if (goal) {
      await Goal.findByIdAndUpdate(query._id, query);
      return { query };
    }
  } catch (e) {
    throw new Error('Error in update goal');
  }
};

const goalController = {
  store,
  show,
  deleteById,
  update
};

export default goalController;
