'use client';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';

interface IncomeStates {
  title: string;
  date: string;
  type: string;
  amount: number;
  category: string;
  description: string;
  _id: string;
}

interface IncomesStates {
  incomes: IncomeStates[];
  totIncome: number;
}
const initialState: IncomesStates = {
  incomes: [
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
  totIncome: 0
};

export const incomesSlice = createSlice({
  name: 'Income',
  initialState,
  reducers: {
    setIncomes: (
      state: IncomesStates,
      action: PayloadAction<IncomeStates[]>
    ) => {
      state.incomes = action.payload;
      state.totIncome = action.payload?.reduce(
        (acc, income) => acc + income.amount,
        0
      );
    },
    incrementIncomes: (
      state: IncomesStates,
      action: PayloadAction<IncomeStates>
    ) => {
      state.incomes.push(action.payload);
      state.totIncome = state.totIncome + action.payload.amount;
    },
    deleteIncomes: (
      state: IncomesStates,
      action: PayloadAction<IncomeStates>
    ) => {
      state.incomes = state.incomes.filter(
        (income) => income._id !== action.payload._id
      );
      state.totIncome -= action.payload.amount;
    }
  }
});

export const { setIncomes, incrementIncomes, deleteIncomes } =
  incomesSlice.actions;
export const incomesReducer = incomesSlice.reducer;
