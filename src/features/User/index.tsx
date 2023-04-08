'use client';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';

interface UserState {
  id: string;
  fullname: string;
  email: string;
}
const initialState: UserState = {
  id: '',
  fullname: '',
  email: ''
};

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.fullname = action.payload.fullname;
      state.email = action.payload.email;
    }
  }
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
