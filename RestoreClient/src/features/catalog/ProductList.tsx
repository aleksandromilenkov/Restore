import { Grid2 } from "@mui/material"
import { Product } from "../../app/models/product"
import ProductCard from "./ProductCard"

type Props = {
    products: Product[]
}
const ProductList = ({products}: Props) => {
  return (
        <Grid2 container spacing={3}>
        {products?.map(item => (
          <Grid2 size={3} display="flex" key={item.id}>
           <ProductCard key={item.id} product={item}/>
          </Grid2>
          ))}
      </Grid2>
  )
}
export default ProductList