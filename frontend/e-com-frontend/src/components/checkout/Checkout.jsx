import React from "react";
import { Stepper } from "@mui/material";
import { useState } from "react";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import AddressInfo from "./AddressInfo";
import { useDispatch, useSelector } from "react-redux";
import { getUserAddresses } from "../../store/actions/index";
import { useEffect } from "react";
import { Button } from "@mui/material";
import { toast } from "react-hot-toast";
import Skeleton from '../shared/Skeleton';
export const Checkout = () => {
  const [activeStep, setActiveState] = useState(0);
  const dispatch = useDispatch();
  const { address, selectedUserCheckoutAddress } = useSelector(
    (state) => state.auth,
  );
  const steps = ["Address", "Payment Method", "Order summary", "Payment"];
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const paymentMethod = false;
  const handleBack = () => {
    setActiveState((prevStep) => prevStep - 1);
  };
  const handleNext = () => {
    if (activeStep === 0 && !selectedUserCheckoutAddress) {
      toast.error("Plese select checkout address before procedding");
      return;
    }
    if (activeStep === 1 && (!selectedUserCheckoutAddress || !paymentMethod)) {
      toast.error("Please select Payment address before proceeding");
      return;
    }
    setActiveState((prevStep) => prevStep + 1);
  };
  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);
  return (
    <div className="py-14 min-h-[calc(100vh-100px)]">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          return (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {isLoading ? (
        <div className="lg:w-[80%] mx-auto py-5">
        <Skeleton />
        </div>
      ) : (
        <div className="mt-5">
          {activeStep === 0 && <AddressInfo address={address} />}
        </div>
      )}

      <div className="flex justify-between items-center px-4 fixed z-50 h-24 bottom-0 bg-white left-0 w-full py-4 border-slate-200">
        <Button
          variant="outlined"
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </Button>
        {activeStep !== steps.length - 1 && (
          <Button
            disabled={
              errorMessage ||
              (activeStep === 0
                ? !selectedUserCheckoutAddress
                : activeStep === 1
                  ? !paymentMethod
                  : false)
            }
            className={`bg-custom-blue font-semibold px-6 h-10 rounded-md text-white ${errorMessage || (activeStep === 0 && !selectedUserCheckoutAddress) || (activeStep === 1 && !paymentMethod) ? "opacity-60" : ""}`}
            onClick={handleNext}
          >
            Proceed
          </Button>
        )}
      </div>

      {errorMessage && <ErrorPage message={"Error Message Here"} />}
    </div>
  );
};

export default Checkout;
