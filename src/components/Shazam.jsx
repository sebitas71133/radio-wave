import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  searchShazam,
  setIsShazamDialogOpen,
  setTitle,
} from "../store/slices/shazamSilce";

export const Shazam = (props) => {
  const { songTitle } = props;

  const { shazamInfo, isShazamDialogOpen, isSearching, title } = useSelector(
    (state) => state.shazam
  );

  const dispatch = useDispatch();

  const handleClickButton = () => {
    dispatch(searchShazam(title));
  };

  useEffect(() => {
    dispatch(setTitle(songTitle));
  }, [songTitle]);

  return (
    <>
      <IconButton
        onClick={handleClickButton}
        size="small"
        sx={{ color: "secondary.main" }}
      >
        <Search />
      </IconButton>

      <Dialog
        open={isShazamDialogOpen}
        onClose={() => dispatch(setIsShazamDialogOpen(false))}
      >
        <DialogTitle>Song Information</DialogTitle>
        <DialogContent>
          {isSearching ? (
            <CircularProgress />
          ) : shazamInfo.length > 0 ? (
            <Box>
              {shazamInfo.map((hit, index) => (
                <Box key={index} mb={2}>
                  <Typography variant="h6">{hit.track.title}</Typography>
                  <Typography variant="subtitle1">
                    {hit.track.subtitle}
                  </Typography>
                  {hit.track.images && hit.track.images.coverart && (
                    <img
                      src={hit.track.images.coverart}
                      alt="Album Cover"
                      style={{ width: "100%", marginTop: "10px" }}
                    />
                  )}
                </Box>
              ))}
            </Box>
          ) : (
            <Typography>No information found for this song.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dispatch(setIsShazamDialogOpen(false))}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
