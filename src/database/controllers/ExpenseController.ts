import database from '../MongoConnect';
import { Expense } from '../schemas/ExpenseSchema';
const store = async (query: any) => {
  try {
    if (!database.connect()) return false;
    const { title, amount, category, description, date, user } = query;

    const dateObj = new Date(date);

    // Obtém a string no formato ISODate
    const isoDate = dateObj.toISOString();

    const expense = new Expense({
      title,
      amount,
      category,
      date: isoDate,
      description,
      user
    });
    if (await expense.save()) {
      return { status: 1, message: `Created with success`, expense };
    }
  } catch (e) {
    throw new Error('Error in create expense');
  }
};

const show = async (id: string) => {
  try {
    if (!database.connect()) return false;
    const data = await Expense.find({ user: id }).sort({ createdAt: -1 });
    return data;
  } catch (e) {
    throw new Error('Error in show expense');
  }
};

const deleteById = async (id: string, user: string) => {
  try {
    if (!database.connect()) return false;
    const expense = await Expense.find({ user, _id: id });
    if (expense) {
      const data = await Expense.findByIdAndDelete(id);
      return data;
    }
  } catch (e) {
    throw new Error('Error in delete expense');
  }
};

const updateExpense = async (user: string, query: any) => {
  try {
    if (!database.connect()) return false;

    const expense = await Expense.find({ user, _id: query._id });

    const dateObj = new Date(query.date);

    const isoDate = dateObj.toISOString();

    const data = { data: isoDate, ...query };
    if (expense) {
      await Expense.findByIdAndUpdate(query._id, data);
      return { data: isoDate, ...query };
    }
  } catch (e) {
    throw new Error('Error in update expense');
  }
};

// Create: Model.create() ou new Model() seguido de model.save()
// Read: Model.find(), Model.findOne(), Model.findById()
// Update: Model.updateOne(), Model.updateMany(), Model.findOneAndUpdate(), Model.findByIdAndUpdate()
// Delete: Model.deleteOne(), Model.deleteMany(), Model.findOneAndDelete(), Model.findByIdAndDelete()

const expenseController = {
  store,
  show,
  deleteById,
  updateExpense
};

export default expenseController;
