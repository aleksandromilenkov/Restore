import { useParams } from "react-router-dom";
import {
  Button,
  Divider,
  Grid2,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useFetchProductsDetailsQuery } from "./catalogApi";
import { useState } from "react";
import { useAddItemToCartMutation } from "../cart/cartApi";
import { CreateCartItem } from "../../app/models/createCartItem";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity ]= useState(1);
  const {data: product, isLoading} = useFetchProductsDetailsQuery(+id!);
  const [addToCart, {isLoading: addingItemToCart} ] = useAddItemToCartMutation();
  if (!product || isLoading || addingItemToCart) return <div>Loading...</div>;
  const addToCartHandler = async ()=>{
    const cartItemToCreate: CreateCartItem = {
      product: product,
      quantity: quantity
    };
   const result = await addToCart(cartItemToCreate);
   if(result.data) {
    toast.success("Product added to cart.")
   }
  }
  const productDetails = [
    { label: "Name", value: product.name },
    { label: "Description", value: product.description },
    { label: "Type", value: product.type },
    { label: "Brand", value: product.brand },
    { label: "Quantity in stock", value: product.quantityInStock },
  ];
  return (
    <div>
      <Grid2 container spacing={6} maxWidth="lg" sx={{ mx: "auto" }}>
        <Grid2 size={6}>
          <img
            src={product.pictureUrl}
            alt={product.name}
            style={{ width: "100%" }}
          />
        </Grid2>
        <Grid2 size={6}>
          <Typography variant="h3">{product.name}</Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="h4" color="secondary">
            ${(product.price / 100).toFixed(2)}
          </Typography>
          <TableContainer>
            <Table
              sx={{
                "& td": { fontSize: "1rem" },
              }}
            >
              <TableBody>
                {productDetails.map((detail, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      {detail.label}
                    </TableCell>
                    <TableCell>{detail.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid2 container spacing={2} marginTop={3}>
            <Grid2 size={6}>
              <TextField
                variant="outlined"
                type="number"
                label="Quantity in cart"
                fullWidth
                defaultValue={1}
                onChange={(e)=> setQuantity(+e.target.value)}
              />
            </Grid2>
            <Grid2 size={6}>
              <Button
              sx={{height:'55px'}}
                color="primary"
                size="large"
                variant="contained"
                fullWidth
                onClick={addToCartHandler}
              >
                Add to cart
              </Button>
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>
    </div>
  );
};
export default ProductDetails;
