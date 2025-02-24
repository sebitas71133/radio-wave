import { createSlice } from "@reduxjs/toolkit";
import { parseXML } from "../../utils/xmlParser";
import axios from "axios";

const radioSlice = createSlice({
  name: "radio",
  initialState: {
    darkMode: false,
    station: 8062,
    stat: 8010,
    isPlaying: false,
    isLoadingStats: false,
    isDisableButtonStats: false,
    volume: 30,
    stationInfo: {},
    error: false,
    favorites: [],
    showFavorites: false,
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

    updateIsLoadingStats: (state, action) => {
      state.isLoadingStats = action.payload;
    },

    updateIsDisableButtonStats: (state, action) => {
      state.isDisableButtonStats = action.payload;
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

    updateShowFavorites: (state, action) => {
      state.showFavorites = !state.showFavorites;
    },

    toggleFavorite: (state, action) => {
      const song = action.payload;
      let newFavorites;
      if (state.favorites.includes(song)) {
        newFavorites = state.favorites.filter((fav) => fav !== song);
        state.favorites = newFavorites;
      } else {
        newFavorites = [song, ...state.favorites];
        state.favorites = newFavorites;
      }
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    },

    removeFavorite: (state, action) => {
      const song = action.payload;

      const newFavorites = state.favorites.filter((fav) => fav !== song);
      state.favorites = newFavorites;
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    },

    getListFavorites: (state, action) => {
      const storedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      if (storedFavorites) {
        state.favorites = storedFavorites;
      }
    },
  },
});

export const getStats = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(updateIsLoadingStats(true));
      dispatch(updateIsDisableButtonStats(true));
      dispatch(updatePlaying());
      const state = getState();
      const stat = state.radio.stat;

      // const response = await axios.get(
      //   `/.netlify/functions/radioStats?stat=${stat}`
      // );
      const response = await axios.request({
        method: "GET",
        url: `/api/${stat}/stats`,
        params: {
          sid: 1,
        },
      });
      const parseDate = await parseXML(response.data);

      console.log(parseDate);

      dispatch(updateStationInfo(parseDate));
      dispatch(updatePlaying());
    } catch (error) {
      console.error(error);
      dispatch(updateError(error));
    } finally {
      dispatch(updateIsLoadingStats(false));
      dispatch(updateIsDisableButtonStats(false));
    }
  };
};

export const radioReducer = radioSlice.reducer;
export const {
  updateState,
  updateStation,
  updatePlaying,
  updateVolume,
  updateStat,
  updateStationInfo,
  updateError,
  updateIsLoadingStats,
  updateIsDisableButtonStats,
  updateShowFavorites,
  toggleFavorite,
  getListFavorites,
  removeFavorite,
} = radioSlice.actions;
