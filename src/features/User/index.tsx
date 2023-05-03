import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';

export interface UserState {
  id: string;
  fullname: string;
  username: string;
  email: string;
  avatar: string;
}
const initialState: UserState = {
  id: '',
  fullname: '',
  username: '',
  email: '',
  avatar: 'avatars/6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws'
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
      if(action.payload.avatar){
        state.avatar = action.payload.avatar;
      }
    }
  }
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
