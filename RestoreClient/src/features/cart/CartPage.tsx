import { Typography } from "@mui/material";
import { useFetchCartQuery } from "./cartApi";

type Props = {}
const CartPage = (props: Props) => {
    const {data, isLoading} = useFetchCartQuery();
    console.log(data);
    if(isLoading) return <div>Loading...</div>
    console.log(data);
    if(!data) return <Typography variant="h3">Your cart is empty.</Typography>
  return (
    <div>Cart
        {data.items.map(item=>(<div key={item.productId}>
            <p>{item.name}</p>
            <p>{item.quantity}</p>
            
            </div>))}
    </div>
  )
}
export default CartPage