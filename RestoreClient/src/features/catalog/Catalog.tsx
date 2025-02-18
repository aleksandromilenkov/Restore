import { Fragment } from "react/jsx-runtime"
import { Product } from "../../app/models/product"
import { Button } from "@mui/material"

type Props = {
  products: Product[]
}
const Catalog = ({products}: Props) => {
  return (
    <Fragment>
      <ul>
        {products?.map((item, idx) => (<li key={idx}>{item.name} - {item.price}</li>))}
      </ul>
      <Button variant='contained'>Add Product</Button>
    </Fragment>
  )
}
export default Catalog