import { createTheme, CssBaseline } from "@mui/material";
import React, { useMemo } from "react";
import { ThemeProvider } from "@emotion/react";
import { useSelector } from "react-redux";

const Apptheme = ({ children }) => {
  const { darkMode } = useSelector((state) => state.radio);

  // Memorizar el tema solo cuando cambie darkMode
  const colorTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: darkMode ? "#00ffff" : "#ff00ff",
          },
          background: {
            default: darkMode ? "#000000" : "#ffffff",
            paper: darkMode ? "#1a1a1a" : "#f0f0f0",
          },
        },
      }),
    [darkMode] // Dependencia en darkMode
  );

  return (
    <ThemeProvider theme={colorTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Apptheme;
