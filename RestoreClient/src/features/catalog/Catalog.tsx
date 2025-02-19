import { useEffect, useState } from "react";
import { Product } from "../../app/models/product"
import ProductList from "./ProductList"

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const resp = await fetch("https://localhost:5001/api/products");
      const data = await resp.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);
  return (
    <>
      <ProductList products={products}/>
    </>
  )
}
export default Catalog