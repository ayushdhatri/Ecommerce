import React from 'react'
import {Stepper} from '@mui/material';
import {useState} from 'react';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import AddressInfo from './AddressInfo';

export const Checkout = () => {
    const [activeStep,setActiveState] = useState(0);
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
        <div className='mt-5'>
            {activeStep === 0 && <AddressInfo />}
        </div>

    </div>
  )
}

export default Checkout
