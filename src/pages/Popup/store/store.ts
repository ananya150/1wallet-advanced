// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import tokensReducer from './tokens/tokensSlice';

export const store = configureStore({
  reducer: {
    tokens: tokensReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
