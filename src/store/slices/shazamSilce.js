import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//THUNKS

export const searchShazam = (title) => {
  return async (dispatch, getState) => {
    dispatch(setIsSearching(true));
    dispatch(setIsShazamDialogOpen(true));

    const options = {
      method: "GET",
      url: "https://shazam.p.rapidapi.com/search",
      params: {
        term: title,
        locale: "en-US",
        offset: "0",
        limit: "5",
      },
      headers: {
        "x-rapidapi-key": `${import.meta.env.VITE_SHAZAM_KEY}`,
        "x-rapidapi-host": "shazam.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);

      if (response.data && response.data.tracks && response.data.tracks.hits) {
        dispatch(updateShazamInfo(response.data.tracks.hits));
      } else {
        dispatch(updateShazamInfo([]));
      }
    } catch (error) {
      console.error("Error searching Shazam:", error);
      dispatch(updateShazamInfo(null));
    } finally {
      dispatch(setIsSearching(false));
    }
  };
};

//SLICE
const shazamSlice = createSlice({
  name: "shazam",
  initialState: {
    shazamInfo: [],
    isShazamDialogOpen: false,
    isSearching: false,
    title: "",
  },
  reducers: {
    updateShazamInfo: (state, action) => {
      state.shazamInfo = action.payload;
    },

    setIsShazamDialogOpen: (state, action) => {
      state.isShazamDialogOpen = action.payload;
    },

    setIsSearching: (state, action) => {
      state.isSearching = action.payload;
    },

    setTitle: (state, action) => {
      state.title = action.payload;
    },
  },
});

export const {
  updateShazamInfo,
  setIsShazamDialogOpen,
  setIsSearching,
  setTitle,
} = shazamSlice.actions;

export const shazamReducer = shazamSlice.reducer;
