import { Grid2, Typography } from "@mui/material";
import ProductList from "./ProductList";
import { useFetchProductsQuery } from "./catalogApi";
import Filters from "./Filters";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import AppPagination from "../../app/shared/components/AppPagination";
import { setPageNumber } from "./catalogSlice";

const Catalog = () => {
  const productParams = useAppSelector((state) => state.catalogSlice);
  const dispatch = useAppDispatch();
  const { data, isLoading } = useFetchProductsQuery(productParams);
  if (isLoading || !data) return <div>Loading...</div>;
  const onPageChangeHandler = (page:number)=>{
    dispatch(setPageNumber(page));
  }
  return (
    <Grid2 container spacing={4}>
      <Grid2 size={3}>
        <Filters />
      </Grid2>
      <Grid2 size={9}>
        {data.items && data.items.length > 0 ? (<>
        <ProductList products={data.items} />
        <AppPagination metadata={data.pagination} onPageChange={onPageChangeHandler}/>
        </>) : <Typography variant="h5">There are no results for this filter</Typography>}
        
      </Grid2>
    </Grid2>
  );
};
export default Catalog;
