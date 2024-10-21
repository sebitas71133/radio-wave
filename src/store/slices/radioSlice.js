import { createSlice } from "@reduxjs/toolkit";

const radioSlice = createSlice({
  name: "radio",
  initialState: {
    darkMode: false,
    station: 8062,
    isPlaying: false,
    volume: 30,
    stations: [
      { id: 8062, name: "Ufftopia" },
      { id: 8066, name: "Rock Radio" },
      { id: 8064, name: "Jazz Radio" },
    ],
  },
  reducers: {
    updateState: (state, action) => {
      state.darkMode = !state.darkMode;
    },

    updateStation: (state, action) => {
      state.station = action.payload;
    },

    updatePlaying: (state, action) => {
      state.isPlaying = !state.isPlaying;
    },

    updateVolume: (state, action) => {
      state.volume = action.payload;
    },
  },
});

export const radioReducer = radioSlice.reducer;
export const { updateState, updateStation, updatePlaying, updateVolume } =
  radioSlice.actions;
