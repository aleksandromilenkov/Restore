import { Grid2, Typography } from "@mui/material"
import OrderSummary from "../../app/shared/components/OrderSummary"
import CheckoutStepper from "./CheckoutStepper"
import {loadStripe, StripeElementsOptions} from "@stripe/stripe-js"
import {Elements} from "@stripe/react-stripe-js"
import { useFetchCartQuery } from "../cart/cartApi"
import { useMemo } from "react"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const CheckoutPage = () => {
  const {data:cart} = useFetchCartQuery();
  const options:StripeElementsOptions | undefined = useMemo(()=>{
    if(!cart?.clientSecret) return undefined;
    return {
      clientSecret: cart?.clientSecret
    }
  },[cart?.clientSecret])
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={8}>
        {(!stripePromise || !options) ? (<Typography variant="h6">Loading checkout...</Typography>) : (
        <Elements stripe={stripePromise} options={options}>
        <CheckoutStepper/>
        </Elements>
        )}
      </Grid2>
      <Grid2 size={4}>
        <OrderSummary/>
      </Grid2>
    </Grid2>
  )
}
export default CheckoutPage