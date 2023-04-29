import { authReducer } from '@/features/Auth';
import { expensesReducer } from '@/features/Expenses';
import { incomesReducer } from '@/features/Incomes';
import { userReducer } from '@/features/User';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    Auth: authReducer,
    User: userReducer,
    Incomes: incomesReducer,
    Expenses: expensesReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
