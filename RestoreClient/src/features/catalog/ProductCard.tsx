import {
    Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import { useAddItemToCartMutation } from "../cart/cartApi";
import { CreateCartItem } from "../../app/models/createCartItem";
import { toast } from "react-toastify";

type Props = {
  product: Product;
}; 
const ProductCard = ({ product }: Props) => {
   const [addToCart, {isLoading: isLoading} ] = useAddItemToCartMutation();
   const addToCartHandler = async ()=>{
       const cartItemToCreate: CreateCartItem = {
         product: product,
         quantity: 1
       };
      const result = await addToCart(cartItemToCreate);
      if(result.data) {
       toast.success("Product added to cart.")
      }
    }
  return (
    <Card
      elevation={3}
      sx={{
        width: 280,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        sx={{ height: 240, backgroundSize: "cover" }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="subtitle2"
          sx={{ textTransform: "uppercase" }}
        >
          {product.name}
        </Typography>
        <Typography variant="h6" sx={{ color: "secondary.main" }}>
          ${(product.price / 100).toFixed(2)}
        </Typography>
      </CardContent>
      <Box sx={{ justifyContent: "space-between" }}>
        <Button onClick={addToCartHandler} disabled={isLoading}>Add to cart</Button>
        <Button component={Link} to={`/catalog/${product.id}`}>View</Button>
      </Box>
    </Card>
  );
};
export default ProductCard;
