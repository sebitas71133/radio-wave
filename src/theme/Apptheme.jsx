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
          secondary: {
            main: darkMode ? "#ff9100" : "#00e5ff",
          },
          background: {
            default: darkMode ? "#121212" : "#f0f0f0",
            paper: darkMode ? "#1e1e1e" : "#ffffff",
          },
          text: {
            primary: darkMode ? "#ffffff" : "#000000",
            secondary: darkMode ? "#b3e5fc" : "#311b92",
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
