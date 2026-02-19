import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Divider from "@mui/material/Divider";
import { MdDone, MdClose } from "react-icons/md";
import Status from "./Status";

function ProductViewModal({ open, setOpen, product, isAvailable }) {
  const {
    productId,
    productName,
    image,
    description,
    quantity,
    price,
    discount,
    specialPrice,
  } = product;

  return (
    <Dialog
      open={open}
      as="div"
      className="relative z-10"
      onClose={() => setOpen(false)}
    >
      {/* Backdrop */}
      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75" />

      {/* Modal wrapper */}
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="relative w-full max-w-[620px] rounded-lg bg-white shadow-xl overflow-hidden">
            
            {/* Product Image */}
            {image && (
              <div className="aspect-[3/2] w-full">
                <img
                  src={image}
                  alt={productName}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            {/* Title */}
            <div className="px-6 pt-6">
              <DialogTitle
                as="h1"
                className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800"
              >
                {productName}
              </DialogTitle>
            </div>

            {/* Content */}
            <div className="px-6 py-4 space-y-4 text-gray-700">
              
              {/* Price + Stock */}
              <div className="flex items-center justify-between">
                {specialPrice ? (
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 line-through">
                      ₹{Number(price).toFixed(2)}
                    </span>
                    <span className="text-xl font-semibold text-slate-700">
                      ₹{Number(specialPrice).toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="text-xl font-bold text-slate-700">
                    ₹{Number(price).toFixed(2)}
                  </span>
                )}

                <span
                  className={`font-medium ${
                    isAvailable ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isAvailable ? (
                    <Status 
                        text="In Stock"
                        icon ={MdDone}
                        bg="bg-teal-200"
                        color="text-teal-900"
                    />

                  ) : (
                      <Status 
                        text="Out-Of-Stock"
                        icon ={MdClose}
                        bg="bg-rose-200"
                        color="text-rose-700"
                    />

                  )}
                </span>
              </div>

              <Divider />

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {description}
              </p>

              {/* Close Button (Bottom Right) */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 transition"
                >
                  Close
                </button>
              </div>
            </div>

          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default ProductViewModal;
