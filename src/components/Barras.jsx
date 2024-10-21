import { useTheme } from "@emotion/react";
import { Box, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Barras = () => {
  const theme = useTheme();
  const GlowingBar = styled(Box)(() => ({
    width: 4,
    marginRight: 3,
    backgroundColor: theme.palette.primary.main,
    boxShadow: `0 0 10px ${theme.palette.primary.main}`,
    transition: "height 0.5s",
  }));

  const [barHeights, setBarHeights] = useState(Array(10).fill(10));
  const { isPlaying, station } = useSelector((state) => state.radio);

  useEffect(() => {
    // Reiniciamos las barras al cambiar de estacion
    setBarHeights(Array(10).fill(10));

    //Funcion que actualiza las barritas
    const animateBars = () => {
      setBarHeights(barHeights.map(() => Math.random() * 40 + 10));
    };

    //Se actualizara los valores de las barritas cada 0.1 segundos
    let intervalId;
    if (isPlaying) {
      // Breve retraso para dar efecto de reinicio visual tras cambiar estación
      setTimeout(() => {
        intervalId = setInterval(animateBars, 100);
      }, 500);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying, station]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        height: 60,
        mb: 2,
      }}
    >
      {barHeights.map((height, index) => (
        <GlowingBar key={index} sx={{ height: `${height}px` }} />
      ))}
    </Box>
  );
};

export default Barras;
