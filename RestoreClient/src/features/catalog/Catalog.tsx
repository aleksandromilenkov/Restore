import { Fragment } from "react/jsx-runtime"
import { Product } from "../../app/models/product"

type Props = {
  products: Product[]
}
const Catalog = ({products}: Props) => {
  return (
    <Fragment>
      <ul>
        {products?.map((item, idx) => (<li key={idx}>{item.name} - {item.price}</li>))}
      </ul>
    </Fragment>
  )
}
export default Catalog