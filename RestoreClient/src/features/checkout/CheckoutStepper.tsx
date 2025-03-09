import { Box, Button, FormControlLabel, Paper, Step, StepLabel, Stepper, Checkbox, Typography } from "@mui/material";
import { AddressElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react"
import Review from "./Review";
import { useFetchAddressQuery, useUpdateUserAddressMutation } from "../account/accountApi";
import { Address } from "../../app/models/user";
import { ConfirmationToken, StripeAddressElementChangeEvent, StripePaymentElementChangeEvent } from "@stripe/stripe-js";
import { useCart } from "../../lib/hooks/useCart";
import { currencyFormat } from "../../lib/util";
import { toast } from "react-toastify";

const steps = ["Address", "Payment", "Review"];

const CheckoutStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const {data: {name, ...rest} = {} as Address, isLoading} = useFetchAddressQuery();
  const [updateAddress] = useUpdateUserAddressMutation();
  const [saveAddressChecked, setSaveAddressChecked] = useState(false);
  const elements = useElements();
  const stripe = useStripe()
  const [addressComplete, setAddressComplete] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [confirmationToken, setConfirmationToken] = useState<ConfirmationToken | null>(null);
  const {total} = useCart();

  const getStripeAddress = async()=>{
    const addressElement = elements?.getElement("address");
    if(!addressElement) return null;
    const {value:{name, address}} = await addressElement.getValue();
    if(name && address) return {...address, name};
    return null;
  }

  const handleNext = async()=>{
    if(activeStep === 0 && saveAddressChecked && elements){
        const address = await getStripeAddress();
        if (address) await updateAddress(address);
    }
    if(activeStep === 1) {
        if(!elements || !stripe) return;
        const result = await elements.submit();
        if(result.error) return toast.error(result.error.message);
        const stripeResult = await stripe.createConfirmationToken({elements});
        if(stripeResult.error) return toast.error(stripeResult.error.message);
        setConfirmationToken(stripeResult.confirmationToken);
    }
    setActiveStep(prevState => prevState + 1);
  }

  const handleBack = ()=>{
    setActiveStep(prevState => prevState - 1);
  }

  const handleAddressChange = (event: StripeAddressElementChangeEvent) => {
    setAddressComplete(event.complete);
  }

  const handlePaymentChange = (event: StripePaymentElementChangeEvent) => {
    setPaymentComplete(event.complete);
  }

  if(isLoading) return <Typography variant="h6">Loading checkout...</Typography>

  return (
    <Paper sx={{p:3, borderRadius:3}}>
        <Stepper activeStep={activeStep}>
            {steps.map((step, idx)=> {
                return (
                    <Step key={idx}>
                        <StepLabel>{step}</StepLabel>
                    </Step>
                    )
            })}
        </Stepper>
        <Box sx={{mt:2}}>
            <Box sx={{display: activeStep === 0 ? "block" : "none"}}>
                <AddressElement
                    options={{
                        mode: "shipping",
                        defaultValues: {
                            name: name,
                            address: rest
                        }
                    }}
                    onChange={handleAddressChange}
                />
                <FormControlLabel
                    sx={{display:'flex', justifyContent: 'end'}}
                    control={<Checkbox 
                        checked={saveAddressChecked}
                        onChange={(e)=>setSaveAddressChecked(e.target.checked)}
                    />}
                    label="Save as default address"
                  
                />
            </Box>
            <Box sx={{display: activeStep === 1 ? "block" : "none"}}>
                <PaymentElement onChange={handlePaymentChange}/>
            </Box>
            <Box sx={{display: activeStep === 2 ? "block" : "none"}}>
                <Review confirmationToken={confirmationToken}/>
            </Box>
        </Box>
        <Box display="flex" paddingTop={2} justifyContent="space-between">
            <Button onClick={handleBack}>Back</Button>
            <Button
             onClick={handleNext}
             disabled={(activeStep === 0 && !addressComplete) || (activeStep === 1 && !paymentComplete)}
            >
                {activeStep === steps.length -1 ? `Pay ${currencyFormat(total)}`: "Next"}
            </Button>
        </Box>
    </Paper>
  )
}
export default CheckoutStepper