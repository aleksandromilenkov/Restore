import {useState } from "react";
import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const setDarkModeHandler = () => {
    setDarkMode((prevState) => !prevState);
  };
  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "dark" ? "#121212" : "#eaeaea",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar setDarkMode={setDarkModeHandler} darkMode={darkMode}/>
      <Box
        sx={{
          minHeight: '100vh',
          background: darkMode
            ? "radial-gradient(circle, #1e3aBa, #111B27)"
            : "radial-gradient(circle, #baecf9, #f0f9ff)",
          pt: 12
        }}
      >
        <Container maxWidth="xl">
          <Outlet/>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
