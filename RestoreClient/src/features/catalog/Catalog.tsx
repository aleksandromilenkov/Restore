import ProductList from "./ProductList"
import { useFetchProductsQuery } from "./catalogApi";

const Catalog = () => {
  const {data, isLoading} = useFetchProductsQuery();
  if(isLoading || !data) return <div>Loading...</div>
  return (
    <>
      <ProductList products={data}/>
    </>
  )
}
export default Catalog