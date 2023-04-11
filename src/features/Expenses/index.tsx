'use client';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';

interface ExpenseStates {
  title: string;
  date: string;
  type: string;
  amount: number;
  category: string;
  description: string;
  _id: string;
}

interface ExpensesStates {
  expenses: ExpenseStates[];
  totExpenses: number;
}
const initialState: ExpensesStates = {
  expenses: [
    {
      title: '',
      date: '',
      type: '',
      amount: 0,
      category: '',
      description: '',
      _id: ''
    }
  ],
  totExpenses: 0
};

export const expensesSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    setexpenses: (
      state: ExpensesStates,
      action: PayloadAction<ExpenseStates[]>
    ) => {
      state.expenses = action.payload;
      state.totExpenses = action.payload.reduce(
        (acc, expense) => acc + expense.amount,
        0
      );
    },
    incrementexpenses: (
      state: ExpensesStates,
      action: PayloadAction<ExpenseStates>
    ) => {
      state.expenses.push(action.payload);
      state.totExpenses = state.totExpenses + action.payload.amount;
    },
    deleteExpenses: (
      state: ExpensesStates,
      action: PayloadAction<ExpenseStates>
    ) => {
      state.expenses = state.expenses.filter(
        (expense) => expense._id !== action.payload._id
      );
      state.totExpenses -= action.payload.amount;
    }
  }
});

export const { setexpenses, incrementexpenses, deleteExpenses } =
  expensesSlice.actions;
export const expensesReducer = expensesSlice.reducer;
