import { useEffect, useState } from "react"
import { Product } from "../models/product";
import Catalog from "../../features/catalog/Catalog";
import { Container, Typography } from "@mui/material";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(()=>{
    const fetchProducts = async()=>{
      const resp = await fetch('https://localhost:5001/api/products');
      const data = await resp.json();
      setProducts(data);
    }
    fetchProducts();
  },[])
  return (
    <Container maxWidth="xl">
      <Typography variant='h4'>Re-Store</Typography>
      <Catalog products={products}/>
    </Container>
  )
}

export default App
