import "./App.css";
import {
  Box,
  CardContent,
  CardMedia,
  Collapse,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Slider,
  Switch,
  Typography,
  useTheme,
} from "@mui/material";
import { Card } from "@mui/material";
import { animated, useSpring } from "react-spring";
import { useDispatch, useSelector } from "react-redux";
import {
  updateState,
  updateStation,
  updateVolume,
  updateShowFavorites,
  removeFavorite,
} from "./store/slices/radioSlice";
import {
  Brightness4,
  Brightness7,
  Delete,
  ExpandLess,
  ExpandMore,
  Favorite,
  FileDownload,
  VolumeUp,
} from "@mui/icons-material";
import Play from "./components/Play";
import { useEffect, useRef } from "react";
import { Status } from "./components/Status";
import { exportFavorites } from "./utils/exportFavorites";

function App() {
  const {
    darkMode,
    station,
    stations,
    isPlaying,
    volume,
    favorites,
    showFavorites,
  } = useSelector((state) => state.radio);

  const dispatch = useDispatch();
  const audioRef = useRef();
  const AnimatedCard = animated(Card);
  const theme = useTheme();
  const cardAnimation = useSpring({
    from: { transform: "scale(0.9)", opacity: 0 },
    to: { transform: "scale(1)", opacity: 1 },
    config: { tension: 300, friction: 10 },
  });

  const setDarkMode = () => {
    dispatch(updateState());
  };

  const handleStationChange = (event) => {
    const id = event.target.value;
    dispatch(updateStation(id));
  };

  const handleVolumeChange = (event, newValue) => {
    if (audioRef.current) {
      audioRef.current.volume = newValue / 100;
    }
    dispatch(updateVolume(newValue));
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const handleCanPlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.log("Error al reproducir el audio:", error);
        });
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",

          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          bgcolor: "background.default",
        }}
      >
        <AnimatedCard
          style={cardAnimation}
          sx={{
            width: 350,
            boxShadow: 24,
            borderRadius: 4,
            background: `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.background.paper} 100%)`,
            overflow: "hidden",
            position: "relative",
            minHeight: "632px",
            //height: "560px",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "5px",
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              animation: "moveGradient 5s linear infinite",
              "@keyframes moveGradient": {
                "0%": { backgroundPosition: "0% 50%" },
                "100%": { backgroundPosition: "100% 50%" },
              },
            }}
          />

          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",

                mb: 2,
              }}
            >
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: "bold", color: "text.primary" }}
              >
                Futuristic Radio
              </Typography>
              <Switch
                checked={darkMode}
                onChange={() => setDarkMode()}
                icon={<Brightness7 sx={{ color: "secondary.main" }} />}
                checkedIcon={<Brightness4 sx={{ color: "secondary.main" }} />}
                color="secondary"
              />
            </Box>
            <FormControl fullWidth margin="normal">
              <InputLabel
                id="station-select-label"
                sx={{ color: "text.secondary" }}
              >
                Station
              </InputLabel>
              <Select
                labelId="station-select-label"
                value={station}
                label="Station"
                onChange={handleStationChange}
                sx={{ color: "text.primary" }}
              >
                {stations.map((s) => (
                  <MenuItem key={s.id} value={s.id}>
                    {s.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Info stations*/}

            <Status></Status>

            {/* BARRAS */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                height: "120px",
                mt: 2,
              }}
            >
              {isPlaying ? (
                <CardMedia
                  component={"img"}
                  height={"auto"}
                  //image="/radio-web/sound.gif"
                  image="sound.gif"
                  alt="animation"
                  sx={{ position: "relative", top: "50px", width: "70%" }}
                />
              ) : (
                <></>
              )}
            </Box>

            {/* Audios */}
            <audio
              ref={audioRef}
              src={`${
                import.meta.env.VITE_RADIO_URL
              }:${station}/;listen.pls?sid=1`}
              onCanPlay={handleCanPlay}
            />

            {/* Reproductor */}

            <Play audioRef={audioRef} />

            {/* Volumen */}

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <VolumeUp sx={{ color: "primary.contrastText", mr: 1 }} />
              <Slider
                value={volume}
                onChange={handleVolumeChange}
                aria-labelledby="continuous-slider"
                sx={{ color: "primary.main" }}
                min={0}
                max={100}
              />
            </Box>

            {/* LISTA DE FAVORITOS */}
            <Box sx={{ mt: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  color: "text.primary",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    color: "text.primary",
                  }}
                  onClick={() => dispatch(updateShowFavorites())}
                >
                  <Favorite sx={{ mr: 1 }} />
                  Favorite songs
                  {showFavorites ? <ExpandLess /> : <ExpandMore />}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    color: "text.primary",
                  }}
                  onClick={exportFavorites}
                >
                  Save
                  <FileDownload />
                </Typography>
              </Box>
              <Collapse in={showFavorites} timeout="auto" unmountOnExit>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    maxHeight: 200,
                    // bgcolor: "background.paper",
                    overflowY: "auto",
                  }}
                >
                  {favorites.map((song, index) => (
                    <ListItem
                      key={index}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => dispatch(removeFavorite(song))}
                        >
                          <Delete />
                        </IconButton>
                      }
                    >
                      <ListItemText
                        primary={song}
                        sx={{ color: "text.secondary" }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </Box>
          </CardContent>
        </AnimatedCard>

        {/* Favorite List */}
      </Box>
    </>
  );
}

export default App;
