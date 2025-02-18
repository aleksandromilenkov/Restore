import { useEffect, useState } from "react";
import { Product } from "../models/product";
import Catalog from "../../features/catalog/Catalog";
import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import Navbar from "./Navbar";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
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
  useEffect(() => {
    const fetchProducts = async () => {
      const resp = await fetch("https://localhost:5001/api/products");
      const data = await resp.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar setDarkMode={setDarkModeHandler} darkMode={darkMode}/>
      <Box
        sx={{
          background: darkMode
            ? "radial-gradient(circle, #1e3aBa, #111B27)"
            : "radial-gradient(circle, #baecf9, #f0f9ff)",
          pt: 12
        }}
      >
        <Container maxWidth="xl">
          <Catalog products={products} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
