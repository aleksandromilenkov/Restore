import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, Paper, Radio, TextField } from "@mui/material";
import { useFetchFiltersQuery } from "./catalogApi";

const sortOptions = [
    {value: "Name", label: "Alphabetical"},
    {value: "priceDesc", label: "Price: High to low"},
    {value: "price", label: "Price: Low to high"},
]

const Filters = () => {
    const {data} = useFetchFiltersQuery();
    console.log(data)
  return (
    <Box display="flex" flexDirection="column" gap={3}>
        <Paper>
            <TextField
                label="Search products"
                variant="outlined"
                fullWidth
            />
        </Paper>
        <Paper sx={{padding:3}}>
            <FormControl>
                {sortOptions.map(({value, label}, idx)=> (
                    <FormControlLabel key={idx} control={<Radio sx={{py: 0.7}}/>} label={label} value={value}/>
                ))}
            </FormControl>
        </Paper>
        <Paper sx={{padding:3}}>
            <FormGroup>
                {data && data.brands?.map((item: string)=> (
                    <FormControlLabel
                        key={item}
                        control={<Checkbox color="secondary" sx={{py:0.7, fontSize:40}}/>}
                        label={item}
                    />
                ))}
            </FormGroup>
        </Paper>
        <Paper sx={{padding:3}}>
            <FormGroup>
                {data && data.types?.map(item=> (
                    <FormControlLabel
                        key={item}
                        control={<Checkbox color="secondary" sx={{py:0.7, fontSize:40}}/>}
                        label={item}
                    />
                ))}
            </FormGroup>
        </Paper>
    </Box>
  )
}
export default Filters