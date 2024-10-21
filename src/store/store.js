import { configureStore } from "@reduxjs/toolkit";
import { radioReducer } from "./slices/radioSlice";

export const store = configureStore({
  reducer: {
    radio: radioReducer,
  },
});
