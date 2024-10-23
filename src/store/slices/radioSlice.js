import { createSlice } from "@reduxjs/toolkit";

const radioSlice = createSlice({
  name: "radio",
  initialState: {
    darkMode: false,
    station: 8062,
    stat: 8010,
    isPlaying: false,
    volume: 30,
    stationInfo: {},
    error: false,
    stations: [
      { id: 8069, stats: 8056, name: "Ambient Radio" },
      { id: 8061, stats: 8004, name: "Drum and Bass Radio" },
      { id: 8067, stats: 8004, name: "Dubstep Radio" },
      { id: 8064, stats: 8020, name: "Jazz Radio" },
      { id: 8062, stats: 8010, name: "Psychedelic Trance Radio" },
      { id: 8063, stats: 8016, name: "Rap Radio" },
      { id: 8060, stats: 8000, name: "Reggae Radio" },
      { id: 8066, stats: 8032, name: "Rock Radio" },
      { id: 8068, stats: 8046, name: "Techno Radio" },
    ],
  },
  reducers: {
    updateState: (state, action) => {
      state.darkMode = !state.darkMode;
    },

    updateStation: (state, action) => {
      const id = action.payload;
      state.station = id;

      const station = state.stations.find((station) => station.id === id);
      state.stat = station.stats;
    },

    updatePlaying: (state, action) => {
      state.isPlaying = !state.isPlaying;
    },

    updateVolume: (state, action) => {
      state.volume = action.payload;
    },

    updateStat: (state, action) => {
      state.stat = action.payload;
    },

    updateStationInfo: (state, action) => {
      state.stationInfo = action.payload;
    },

    updateError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const radioReducer = radioSlice.reducer;
export const {
  updateState,
  updateStation,
  updatePlaying,
  updateVolume,
  updateStat,
  updateStationInfo,
  updateError,
} = radioSlice.actions;
