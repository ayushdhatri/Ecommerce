import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { InputField } from "../shared/InputField";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaAddressCard } from "react-icons/fa";
import { useSelector } from "react-redux";
import {addUpdateUserAddress} from '../../store/actions/index';
import {toast} from 'react-hot-toast';
import {Spinners} from '../shared/Spinners';
const AddAddressForm = ({address,setOpenAddressModal}) => {
  const { btnLoader } = useSelector((state) => state.errors);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSaveAddressHandler = async (data) => {
    console.log("Save Address Clicked");
    dispatch(addUpdateUserAddress(
        data,
        toast,
        address?.addressId,
        setOpenAddressModal
    ))
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center bg-white">
      <form onSubmit={handleSubmit(onSaveAddressHandler)}>
        <div className="flex justify-center items-center mb-4 font-semibold text-2xl text-slate-800 py-2 px-4">
          <FaAddressCard className="mr-2 text-2xl" />
          Add Address
        </div>
        <div className="flex flex-col gap-4">
          <InputField
            message="*Building Name is required"
            label="Building"
            required
            id="buildingName"
            type="text"
            register={register}
            errors={errors}
            placeholder="Enter Your Building Name"
          />
          <InputField
            message="*City is required"
            label="city"
            required
            id="city"
            type="text"
            register={register}
            errors={errors}
            placeholder="Enter Your city"
          />
          <InputField
            message="*Pincode is required"
            label="pincode"
            required
            id="pincode"
            type="text"
            register={register}
            errors={errors}
            placeholder="Enter Your Pincode"
          />
          <InputField
            message="*Street is required"
            label="street"
            required
            id="street"
            type="text"
            register={register}
            errors={errors}
            placeholder="Enter Your Street"
          />
          <InputField
            message="*Country is required"
            label="country"
            required
            id="country"
            type="text"
            register={register}
            errors={errors}
            placeholder="Enter Your Country"
          />
            <InputField
            message="*State is required"
            label="state"
            required
            id="state"
            type="text"
            register={register}
            errors={errors}
            placeholder="Enter Your State"
          />
          <button disabled={btnLoader} className=" text-white bg-custom-blue px-4 py-2" type="submit">
            {btnLoader ? (
              <>
                <Spinners /> Loading...
              </>
            ) : (
              <>Save</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAddressForm;
