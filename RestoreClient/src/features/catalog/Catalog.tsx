import { Grid2 } from "@mui/material";
import ProductList from "./ProductList"
import { useFetchProductsQuery } from "./catalogApi";
import Filters from "./Filters";
import { useAppSelector } from "../../app/store/store";

const Catalog = () => {
  const productParams = useAppSelector(state => state.catalogSlice);
  const {data, isLoading} = useFetchProductsQuery(productParams);
  if(isLoading || !data) return <div>Loading...</div>
  return (
    <Grid2 container spacing={4}>
      <Grid2 size={3}>
        <Filters/>
      </Grid2>
      <Grid2 size={9}>
        <ProductList products={data}/>
      </Grid2>
    </Grid2>
  )
}
export default Catalog