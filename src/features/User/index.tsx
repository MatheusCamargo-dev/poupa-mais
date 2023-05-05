import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';

export interface expenseCategories {
  expenseCategory: string
}
export interface UserState {
  id: string;
  fullname: string;
  username: string;
  email: string;
  avatar: string;
  expenseCategories: expenseCategories[];
}
const initialState: UserState = {
  id: '',
  fullname: '',
  username: '',
  email: '',
  avatar: 'avatars/6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws',
  expenseCategories: [
    {expenseCategory: 'Moradia'},
    {expenseCategory: 'Alimentação'},
    {expenseCategory: 'Assinaturas'},
    {expenseCategory: 'Transporte'},
    {expenseCategory: 'Saúde'},
    {expenseCategory: 'Educação'},
    {expenseCategory: 'Dívidas'},
    {expenseCategory: 'Transações'},
    {expenseCategory: 'Outros'},
  ],
};

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.fullname = action.payload.fullname;
      state.email = action.payload.email;
      state.username = action.payload.username;
      if(action.payload.avatar) state.avatar = action.payload.avatar;
      if(action.payload.expenseCategories) state.expenseCategories = action.payload.expenseCategories;
    }
  }
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
