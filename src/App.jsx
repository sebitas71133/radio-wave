import "./App.css";
import {
  Box,
  CardContent,
  FormControl,
  InputLabel,
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
  updatePlaying,
  updateState,
  updateStation,
  updateVolume,
} from "./store/slices/radioSlice";
import { Brightness4, Brightness7, VolumeUp } from "@mui/icons-material";
import Barras from "./components/Barras";
import Play from "./components/Play";
import { useEffect, useRef } from "react";

function App() {
  const { darkMode, station, stations, isPlaying, volume } = useSelector(
    (state) => state.radio
  );

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
    dispatch(updateStation(event.target.value));
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
                sx={{ fontWeight: "bold", color: "primary.contrastText" }}
              >
                Futuristic Radio
              </Typography>
              <Switch
                checked={darkMode}
                onChange={() => setDarkMode()}
                icon={<Brightness7 />}
                checkedIcon={<Brightness4 />}
                color="default"
              />
            </Box>
            <FormControl fullWidth margin="normal">
              <InputLabel id="station-select-label">Station</InputLabel>
              <Select
                labelId="station-select-label"
                value={station}
                label="Station"
                onChange={handleStationChange}
                sx={{ color: "primary.contrastText" }}
              >
                {stations.map((s) => (
                  <MenuItem key={s.id} value={s.id}>
                    {s.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* BARRAS */}

            <Barras></Barras>

            {/* Audios */}
            <audio
              ref={audioRef}
              src={`https://www.partyvibe.com:${station}/;listen.pls?sid=1`}
              onCanPlay={handleCanPlay}
            />

            {/* Reproductos */}

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
          </CardContent>
        </AnimatedCard>
      </Box>
    </>
  );
}

export default App;
