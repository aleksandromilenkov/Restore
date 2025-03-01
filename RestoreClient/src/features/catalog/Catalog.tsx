import { Grid2, LinearProgress, Typography } from "@mui/material";
import ProductList from "./ProductList";
import { useFetchFiltersQuery, useFetchProductsQuery } from "./catalogApi";
import Filters from "./Filters";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import AppPagination from "../../app/shared/components/AppPagination";
import { setPageNumber } from "./catalogSlice";

const Catalog = () => {
  const productParams = useAppSelector((state) => state.catalogSlice);
  const { data, isLoading } = useFetchProductsQuery(productParams);
  const {data:filtersData, isLoading: filtersLoading} = useFetchFiltersQuery();
  const dispatch = useAppDispatch();
  if (isLoading || !data || filtersLoading || !filtersData || !productParams) return <LinearProgress/>;
  const onPageChangeHandler = (page:number)=>{
    dispatch(setPageNumber(page));
    window.scrollTo({top:0, behavior:"smooth"})
  }
  return (
    <Grid2 container spacing={4}>
      <Grid2 size={3}>
        <Filters filtersData={filtersData} catalogSlice={productParams}/>
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
