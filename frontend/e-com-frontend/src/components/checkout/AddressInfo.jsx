import React from "react";
import Skeleton from "../shared/Skeleton";
import {FaAddressBook} from 'react-icons/fa'
import {useState} from 'react';
import AddressInfoModal from './AddressInfoModal';
import AddAddressForm from './AddAddressForm';
const AddressInfo = () => {
    const [openAddressModal, setOpenAddressModal] = useState(false);
    const [selectedAddress, setSelectedAddres] = useState("");
    const addNewAddressHandler = ()=>{
        setSelectedAddres("");
        setOpenAddressModal(true);



    }
  const noAddressExist = true;
  const isLoading = true;
  return (
    <div className="pt-4">
      {noAddressExist ? (
        <div className="p-6 rounded-lg max-w-md mx-auto flex flex-col items-center">
            <FaAddressBook size={50} className='text-gray-500 mb-4' />
             <h1 className="md-2 text-slate-900 text-center font-semibold text-2xl">
              No Address Added Yet
            </h1>
            <p className="md-2 text-slate-400 text-center font-semibold my-4">
                Please Add your address to complete purchase
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-all"
                onClick={addNewAddressHandler}
            >
                Add Address
            </button>
            
        </div>
      ) : (
        <div>
          <div className="relative p-6 rounded-lg max-w-md mx-auto">
            <h1 className="text-slate-800 text-center font-bold text-2xl">
              Select Address
            </h1>
            {isLoading ? (
              <div className="py-4 px-8 ">
                <Skeleton />
              </div>
            ) : (
              <div className="space-y-4 pt-6">
                <p>Address List is here </p>
                </div>
            )}
          </div>
        </div>
      )}

      <AddressInfoModal 
        open = {openAddressModal}
        setOpen={setOpenAddressModal} >
            <AddAddressForm/>
        </AddressInfoModal>

    </div>
  );
};

export default AddressInfo;
