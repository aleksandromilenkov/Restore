import { Box, LinearProgress, Paper } from "@mui/material";
import { useFetchFiltersQuery } from "./catalogApi";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { setBrands, setOrderBy, setTypes } from "./catalogSlice";
import Search from "./Search";
import RadioButtonGroup from "../../app/shared/components/RadioButtonGroup";
import CheckboxButtons from "../../app/shared/components/CheckboxButtons";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price: High to low" },
  { value: "price", label: "Price: Low to high" },
];

const Filters = () => {
    const {orderBy, brands, types} = useAppSelector(state=> state.catalogSlice);
    const dispatch = useAppDispatch();
    const {data, isLoading} = useFetchFiltersQuery();
    if(isLoading || !data || !brands || !types || !orderBy) return <LinearProgress/>

    const orderByHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
        dispatch(setOrderBy(e.target.value));
    }
    const brandsHandler = (updatedBrands:string[]) => {
        dispatch(setBrands(updatedBrands));
    }
    const typesHandler = (updatedTypes: string[]) => {
        dispatch(setTypes(updatedTypes));
    }

  return (
    <Box display="flex" flexDirection="column" gap={3}>
        <Paper>
            <Search/>
        </Paper>
        <Paper sx={{padding:3}}>
            <RadioButtonGroup selectedValue={orderBy} onChange={orderByHandler} options={sortOptions}/>
        </Paper>
        <Paper sx={{padding:3}}>
            <CheckboxButtons checkboxes={data.brands} checked={brands} onChange={brandsHandler}/>
        </Paper>
        <Paper sx={{padding:3}}>
            <CheckboxButtons checkboxes={data.types} checked={types} onChange={typesHandler}/>
        </Paper>
    </Box>
  )
}
export default Filters