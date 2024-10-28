import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getListFavorites,
  getStats,
  toggleFavorite,
} from "../store/slices/radioSlice";

import {
  Box,
  Chip,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  FavoriteSharp,
  MusicNote,
  Person,
  Refresh,
} from "@mui/icons-material";
import { Shazam } from "./Shazam";

export const Status = () => {
  const {
    stat,
    stationInfo,
    error,
    isLoadingStats,
    isDisableButtonStats,
    favorites,
    showFavorites,
  } = useSelector((state) => state.radio);

  const dispatch = useDispatch();

  // Carga del localstorage
  useEffect(() => {
    dispatch(getListFavorites());
  }, []);

  useEffect(() => {
    dispatch(getStats());
  }, [stat]);

  if (error) {
    return <div>Error al obtener los datos: {error.message}</div>;
  }

  if (isLoadingStats) {
    return <div>Loading...</div>;
  }

  const handleRefreshStats = () => {
    dispatch(getStats());
  };

  // const toggleFavorite = (song) => {
  //   dispatch(toggleFavorite(song));
  // };

  return (
    <>
      {stationInfo === null ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}>
          <CircularProgress size={24} sx={{ color: "secondary.main" }} />
        </Box>
      ) : (
        stationInfo && (
          <Box sx={{ mt: 2, mb: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ color: "text.primary", mb: 1 }}
              >
                {stationInfo.SERVERTITLE}
              </Typography>
              <IconButton
                onClick={handleRefreshStats}
                size="small"
                sx={{ color: "secondary.main" }}
                disabled={isDisableButtonStats}
              >
                <Refresh />
              </IconButton>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <MusicNote sx={{ mr: 1, color: "primary.main" }} />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {stationInfo.SONGTITLE}
              </Typography>
              {/* STATION INFO */}
              {stationInfo ? (
                <Shazam songTitle={stationInfo.SONGTITLE} />
              ) : (
                <div>No song title available</div>
              )}
              <IconButton
                size="small"
                sx={{ color: "primary.main" }}
                onClick={() => dispatch(toggleFavorite(stationInfo.SONGTITLE))}
              >
                {favorites.includes(stationInfo.SONGTITLE) ? (
                  <Favorite />
                ) : (
                  <FavoriteBorder />
                )}
              </IconButton>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Person sx={{ mr: 1, color: "primary.main" }} />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                DJ: {stationInfo.DJ}
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Chip
                label={`${stationInfo.CURRENTLISTENERS} listeners`}
                size="small"
                sx={{ bgcolor: "primary.main", color: "background.paper" }}
              />
              <Chip
                label={`${stationInfo.BITRATE} kbps`}
                size="small"
                sx={{ bgcolor: "secondary.main", color: "background.paper" }}
              />
              <Chip
                label={stationInfo.SERVERGENRE}
                size="small"
                sx={{ bgcolor: "primary.main", color: "background.paper" }}
              />
            </Box>
          </Box>
        )
      )}
    </>
  );
};
