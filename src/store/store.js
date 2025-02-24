import { configureStore } from "@reduxjs/toolkit";
import { radioReducer } from "./slices/radioSlice";
import { shazamReducer } from "./slices/shazamSilce";

export const store = configureStore({
  reducer: {
    radio: radioReducer,
    shazam: shazamReducer,
  },
});
