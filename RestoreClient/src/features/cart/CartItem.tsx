import { Box, Grid2, IconButton, Paper, Typography } from "@mui/material"
import { CartItem as modelCartItem } from "../../app/models/cartItem"
import { Add, Close, Remove } from "@mui/icons-material"
import { useRemoveItemFromCartMutation } from "./cartApi"

type Props = {
    item: modelCartItem
}
const CartItem = ({item}: Props) => {
    const [removeItem] = useRemoveItemFromCartMutation();
  const removeCartItemHandler = async ()=>{
    await removeItem({productId: item.productId, quantity: 1});
  }
  const completlyRemoveCartItemHandler = async()=>{
    await removeItem({productId: item.productId, quantity: item.quantity});
  }
  return (
    <Paper sx={{
        height:140,
        borderRadius:3,
        display:'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb:2
    }}>
        <Box display='flex' alignItems='center'>
            <Box component='img' src={item.pictureUrl} alt={item.name} sx={{
                width:100,
                height:100,
                objectFit:'cover',
                borderRadius:'4px',
                mr:8,
                ml:4
            }}/>
            <Box display='flex' flexDirection='column' gap={1}>
                <Typography variant='h6'>{item.name}</Typography>
                <Box display='flex' alignItems='center' gap={3}>
                    <Typography sx={{fontSize:'1.1rem'}}>
                        ${(item.price / 100).toFixed(2)} x {item.quantity} {/*because price is long, and long must be divided by 100*/}
                    </Typography>
                    <Typography sx={{fontSize:'1.1rem'}} color="primary">
                        ${(item.price / 100 * item.quantity).toFixed(2)}
                    </Typography>
                </Box>
                <Grid2 container spacing={1} alignItems='center'>
                    <IconButton color='error' size='small' sx={{
                        border:1,
                        borderRadius:1,
                        minWidth:0
                    }}
                    onClick={removeCartItemHandler}
                    >
                        <Remove/>
                    </IconButton>
                    <Typography variant="h6">{item.quantity}</Typography>
                    <IconButton color='success' size='small' sx={{
                        border:1,
                        borderRadius:1,
                        minWidth:0
                    }}>
                        <Add/>
                    </IconButton>
                </Grid2>
            </Box>
        </Box>
        <IconButton color="error" size='small' sx={{
                        border:1,
                        borderRadius:1,
                        minWidth:0,
                        alignSelf:'start',
                        mr:1,
                        mt:1
                    }}
                    onClick={completlyRemoveCartItemHandler}>
            <Close/>            
        </IconButton>
    </Paper>
  )
}
export default CartItem