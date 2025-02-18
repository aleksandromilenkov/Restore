import { Box } from "@mui/material"
import { Product } from "../../app/models/product"
import ProductCard from "./ProductCard"

type Props = {
    products: Product[]
}
const ProductList = ({products}: Props) => {
  return (
    <div>
        <Box sx={{display:'flex', flexWrap:'wrap', gap:3, justifyContent:'center'}}>
        {products?.map(item => (<ProductCard key={item.id} product={item}/>))}
      </Box>
    </div>
  )
}
export default ProductList