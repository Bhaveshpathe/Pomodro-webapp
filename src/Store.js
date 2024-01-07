import { configureStore } from '@reduxjs/toolkit';
import newsSlice from "./Slice"

export const store = configureStore({
  reducer: {
    news: newsSlice,
  },
});
