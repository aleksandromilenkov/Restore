import { useEffect, useState } from "react"
import { Product } from "../models/product";
import Catalog from "../../features/catalog/Catalog";

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
    <div>
      <Catalog products={products}/>
    </div>
  )
}

export default App
