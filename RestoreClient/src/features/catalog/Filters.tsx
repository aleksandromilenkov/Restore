import { Box, Button, Paper } from "@mui/material";
import { useAppDispatch } from "../../app/store/store";
import { resetParams, setBrands, setOrderBy, setTypes } from "./catalogSlice";
import Search from "./Search";
import RadioButtonGroup from "../../app/shared/components/RadioButtonGroup";
import CheckboxButtons from "../../app/shared/components/CheckboxButtons";
import { ProductParams } from "../../app/models/productParams";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price: High to low" },
  { value: "price", label: "Price: Low to high" },
];

type Props = {
    filtersData: {brands: string[], types: string[]; },
    catalogSlice: ProductParams
}

const Filters = ({filtersData:data, catalogSlice}:Props) => {
    const dispatch = useAppDispatch();

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
            <RadioButtonGroup selectedValue={catalogSlice.orderBy} onChange={orderByHandler} options={sortOptions}/>
        </Paper>
        <Paper sx={{padding:3}}>
            <CheckboxButtons checkboxes={data.brands} checked={catalogSlice.brands} onChange={brandsHandler}/>
        </Paper>
        <Paper sx={{padding:3}}>
            <CheckboxButtons checkboxes={data.types} checked={catalogSlice.types} onChange={typesHandler}/>
        </Paper>
        <Button onClick={()=> dispatch(resetParams())}>Reset filters</Button>
    </Box>
  )
}
export default Filters