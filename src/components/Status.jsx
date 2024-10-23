import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  updateError,
  updateStat,
  updateStationInfo,
} from "../store/slices/radioSlice";
import { parseXML } from "../utils/xmlParser";
import { Box, Chip, Typography } from "@mui/material";
import { MusicNote, Person } from "@mui/icons-material";

export const Status = () => {
  const { stat, stationInfo, error } = useSelector((state) => state.radio);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get(
          `/.netlify/functions/radioStats?stat=${stat}`
        );
        console.log(response);

        const parseDate = await parseXML(response);
        console.log(parseDate);
        // dispatch(updateStationInfo(parseDate));
      } catch (error) {
        dispatch(updateError(error));
        console.error(error);
      }
    };

    fetchStatus();
  }, [stat]);

  if (error) {
    return <div>Error al obtener los datos: {error.message}</div>;
  }

  return (
    <>
      {stationInfo && (
        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography variant="subtitle1" sx={{ color: "text.primary", mb: 1 }}>
            {stationInfo.SERVERTITLE}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <MusicNote sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {stationInfo.SONGTITLE}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Person sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              DJ: {stationInfo.DJ}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
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
      )}
    </>
  );
};
