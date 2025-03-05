import { Box, Button, Paper, Step, StepLabel, Stepper } from "@mui/material";
import { useState } from "react"

const steps = ["Address", "Payment", "Review"];

const CheckoutStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = ()=>{
    setActiveStep(prevState => prevState + 1);
  }
  const handleBack = ()=>{
    setActiveStep(prevState => prevState - 1);
  }
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
                Address step
            </Box>
            <Box sx={{display: activeStep === 1 ? "block" : "none"}}>
                Payment step
            </Box>
            <Box sx={{display: activeStep === 2 ? "block" : "none"}}>
                Review step
            </Box>
        </Box>
        <Box display="flex" paddingTop={2} justifyContent="space-between">
            <Button onClick={handleBack}>Back</Button>
            <Button onClick={handleNext}>Next</Button>
        </Box>
    </Paper>
  )
}
export default CheckoutStepper