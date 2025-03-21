import { Controller, useForm } from "react-hook-form"
import { CreateProductChema, createProductSchema } from "../../lib/schemas/createProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid2, Paper, TextField, Typography } from "@mui/material";

const ProductForm = () => {
    const {control, handleSubmit} = useForm<CreateProductChema>({
        mode:"onTouched",
        resolver: zodResolver(createProductSchema)
    });
    const onSubmit = (data: CreateProductChema)=>{
        console.log(data);
    }
  return (
    <Box component={Paper} sx={{p:4, maxWidth: 'lg', mx:"auto"}}>
        <Typography variant="h4" sx={{mb:4}}>
            Product Details 
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid2 container spacing={3}>
                <Grid2 size={12}>
                    <Controller
                        render={({field})=> <TextField {...field} fullWidth label="name"/>}
                        name="name"
                        control={control}
                        defaultValue=""
                    />
                </Grid2>
            </Grid2>
            <Box display="flex" justifyContent="space-between" sx={{mt:3}}>
                <Button variant="contained" color="inherit">Cancel</Button>
                <Button variant="contained" color="inherit" type="submit">Submit</Button>
            </Box>
        </form>
    </Box>
  )
}
export default ProductForm