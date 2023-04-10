import database from '../MongoConnect';
import { Income } from '../schemas/IncomeSchema';
const store = async (query: any) => {
  try {
    if (!database.connect()) return false;
    const { title, amount, category, description, date, user } = query;

    const dateObj = new Date(date);

    // Obtém a string no formato ISODate
    const isoDate = dateObj.toISOString();

    const income = new Income({
      title,
      amount,
      category,
      date: isoDate,
      description,
      user
    });
    if (await income.save()) {
      return { status: 1, message: `Created with success`, income };
    }
  } catch (e) {
    throw new Error('Error in create income');
  }
};

const show = async (id: string) => {
  try {
    if (!database.connect()) return false;
    const data = await Income.find({ user: id }).sort({ createdAt: -1 });
    return data;
  } catch (e) {
    throw new Error('Error in show income');
  }
};

const deleteById = async (id: string, user: string) => {
  try {
    if (!database.connect()) return false;
    const income = await Income.find({ user, _id: id });
    if (income) {
      const data = await Income.findByIdAndDelete(id);
      return data;
    }
  } catch (e) {
    throw new Error('Error in delete income');
  }
};

const updateIncome = async (user: string, id: string, query: any) => {
  try {
    if (!database.connect()) return false;

    const income = await Income.find({ user, _id: id });

    const dateObj = new Date(query.date);

    const isoDate = dateObj.toISOString();

    const data = { data: isoDate, ...query };
    if (income) {
      const update = await Income.findByIdAndUpdate(id, data);
      return update;
    }
  } catch (e) {
    throw new Error('Error in update income');
  }
};

// Create: Model.create() ou new Model() seguido de model.save()
// Read: Model.find(), Model.findOne(), Model.findById()
// Update: Model.updateOne(), Model.updateMany(), Model.findOneAndUpdate(), Model.findByIdAndUpdate()
// Delete: Model.deleteOne(), Model.deleteMany(), Model.findOneAndDelete(), Model.findByIdAndDelete()

const incomeController = {
  store,
  show,
  deleteById,
  updateIncome
};

export default incomeController;
