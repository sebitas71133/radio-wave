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

export const Shazam = (props) => {
  const [shazamInfo, setShazamInfo] = useState([]);
  const [isShazamDialogOpen, setIsShazamDialogOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [title, setTitle] = useState("");
  const { songTitle } = props;
  useEffect(() => {
    setTitle(songTitle);
  }, [songTitle]);

  const searchShazam = async () => {
    setIsSearching(true);
    setIsShazamDialogOpen(true);
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
        setShazamInfo(response.data.tracks.hits); // Guardamos todos los hits
      } else {
        setShazamInfo([]); // Si no existen hits, dejamos el array vacío
      }
    } catch (error) {
      console.error("Error searching Shazam:", error);
      setShazamInfo(null);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <>
      <IconButton
        onClick={searchShazam}
        size="small"
        sx={{ color: "secondary.main" }}
      >
        <Search />
      </IconButton>

      <Dialog
        open={isShazamDialogOpen}
        onClose={() => setIsShazamDialogOpen(false)}
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
          <Button onClick={() => setIsShazamDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
