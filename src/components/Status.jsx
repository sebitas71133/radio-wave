import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  updateError,
  updateStat,
  updateStationInfo,
} from "../store/slices/radioSlice";
import { parseXML } from "../utils/xmlParser";
import {
  Box,
  Chip,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import { MusicNote, Person, Refresh } from "@mui/icons-material";
import { Shazam } from "./Shazam";

export const Status = () => {
  const { stat, stationInfo, error } = useSelector((state) => state.radio);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchStatus = async () => {
    setIsLoading(true);
    setIsDisabled(true);
    try {
      //  const response = await axios.get(`/api/${stat}/stats?sid=1`);
      const response = await axios.get(
        `/.netlify/functions/radioStats?stat=${stat}`
      );

      const parseDate = await parseXML(response.data);

      dispatch(updateStationInfo(parseDate));
    } catch (error) {
      dispatch(updateError(error));
      console.error(error);
    } finally {
      setIsDisabled(false); // Rehabilitar el botón cuando termine la acción
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchStatus();
  }, [stat]);

  if (error) {
    return <div>Error al obtener los datos: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleRefreshStats = () => {
    fetchStatus();
  };

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
                disabled={isDisabled}
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
