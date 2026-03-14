import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import SetQuantity from "./SetQuantity";
import { useDispatch } from "react-redux";
import {
  increaseCartQuantity,
  decreaseCartQuantity,
  removeFromCart
} from "../../store/actions/index";
import {formatPrice} from '../../utils/formatPrice';

import { toast } from "react-hot-toast";
const ItemContent = ({
  productId,
  productName,
  image,
  description,
  quantity,
  price,
  discount,
  specialPrice,
  cartId,
}) => {
  const dispatch = useDispatch();
  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  const handleQtyIncrease = (cartItems) => {
    dispatch(
      increaseCartQuantity(
        cartItems,
        toast,
        currentQuantity,
        setCurrentQuantity,
      ),
    );
  };
  const handleQtyDecrease = (cartItems) => {
    if (currentQuantity > 1) {
      dispatch(
        decreaseCartQuantity(
          cartItems,
          toast,
          currentQuantity,
          setCurrentQuantity,
        ),
      );
    }
  };
  const removeItemFromCart = (cartItems) => {
     dispatch(removeFromCart(cartItems,toast));
  };

  return (
    <div className="grid md:grid-cols-5 grid-cols-4 md:text-md text-sm gap-4 items-center border border-slate-200 rounded-md lg:px-4 py-4 p-2">
      <div className="col-span-2 md:col-span-2 justify-self-start flex flex-col gap-2">
        <div className="flex flex-col lg:gap-4 sm:gap-3 gap-2 items-start">
          <h3 className="lg:text-[17px] text-sm font-semibold text-slate-600">
            {productName}
          </h3>
          <div className="md:w-36 sm:w-24 w-12">
            <img
              src={image}
              alt={productName}
              className="md:h-36 sm:h-24 h-12 w-full object-cover rounded-md"
            />
          </div>
          <div className="flex items-start gap-5 mt-3">
            <button
              onClick={() => {
                removeItemFromCart({
                  image,
                  productName,
                  description,
                  specialPrice,
                  price,
                  productId,
                  quantity,
              });
              }}
              className="flex items-center font-semibold space-x-2 px-4 py-1 text-xs border border-rose-600 text-rose-600 rounded-md hover:bg-red-50 transition-colors duration-200"
            >
              <HiOutlineTrash size={16} className="text-rose-600" />
              Remove From Cart
            </button>
          </div>
        </div>
      </div>

      <div className="justify-self-center lg:text-[17px] text-sm text-slate-700 font-semibold">
        {formatPrice(Number(specialPrice))}
      </div>
      <div className="justify-self-center lg:text-[17px] text-sm text-slate-700 font-semibold">
        {
          <SetQuantity
            quantity={currentQuantity}
            cardCounter={true}
            handleQtyIncrease={() => {
              handleQtyIncrease(
                {
                  image,
                  productName,
                  description,
                  specialPrice,
                  price,
                  productId,
                  quantity,
                },
                toast,
                currentQuantity,
                setCurrentQuantity,
              );
            }}
            handleQtyDecrease={() => {
              handleQtyDecrease({
                image,
                productName,
                description,
                specialPrice,
                price,
                productId,
                quantity,
              });
            }}
          />
        }
      </div>
      <div className="justify-self-center lg:text-[17px] text-sm text-slate-700 font-semibold">
        {formatPrice(Number(currentQuantity) * Number(specialPrice))}
      </div>
    </div>
  );
};

export default ItemContent;
