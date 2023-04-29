import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';

export interface UserState {
  id: string;
  fullname: string;
  username: string;
  email: string;
}
const initialState: UserState = {
  id: '',
  fullname: '',
  username: '',
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
      state.username = action.payload.username;
    }
  }
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
