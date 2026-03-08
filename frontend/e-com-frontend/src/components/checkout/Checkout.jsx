import React from 'react'
import {Stepper} from '@mui/material';
import {useState} from 'react';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

export const Checkout = () => {
    const [activeStep,setActiveState] = useState();
    const steps = [
        "Address",
        "Payment Method",
        "Order summary",
        "Payment"
    ]
  return (
    <div className='py-14 min-h-[calc(100vh-100px)]'>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label,index)=>{
            return(
            <Step key = {index}>
                <StepLabel>{label}</StepLabel>
            </Step>
            )
        })}

      </Stepper>
    </div>
  )
}

export default Checkout
