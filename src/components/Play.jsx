import { Pause, PlayArrow, SkipNext, SkipPrevious } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePlaying, updateStation } from "../store/slices/radioSlice";

const Play = (props) => {
  const { audioRef } = props;
  const {
    station,
    stations = [],
    isPlaying,
  } = useSelector((state) => state.radio);

  const currentIndex = stations.findIndex((indx) => indx.id === station);

  const dispatch = useDispatch();

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.log("Error al reproducir el audio:", error);
        });
      }
      dispatch(updatePlaying());
    }
  };

  const handlePreviousStation = () => {
    const prevIndex = (currentIndex + stations.length - 1) % stations.length;
    dispatch(updateStation(stations[prevIndex].id));
  };

  const handleNextStation = () => {
    const nextIndex = (currentIndex + 1) % stations.length;
    dispatch(updateStation(stations[nextIndex].id));
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mb: 2,
      }}
    >
      <IconButton
        onClick={() => handlePreviousStation()}
        aria-label="previous"
        sx={{ color: "primary.contrastText" }}
      >
        <SkipPrevious />
      </IconButton>
      <IconButton
        aria-label="play/pause"
        onClick={togglePlayPause}
        sx={{ color: "primary.contrastText" }}
      >
        {isPlaying ? <Pause /> : <PlayArrow />}
      </IconButton>
      <IconButton
        onClick={() => handleNextStation()}
        aria-label="next"
        sx={{ color: "primary.contrastText" }}
      >
        <SkipNext />
      </IconButton>
    </Box>
  );
};

export default Play;
