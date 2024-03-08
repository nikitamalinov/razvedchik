import { useShoppingCart } from "@/context/ShoppingCartContext";
import { formatCurrency } from "@/utilities/formatCurrency";
import { BsCartPlus } from "react-icons/bs";
import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);
  const [size, setSize] = useState("SM");
  return (
    <div
      className={`relative w-[315px] h-[420px] rounded-3xl bg-white 
        shadow-lg hover:shadow-xl flex flex-col items-center justify-center px-3`}
    >
      <img src={imgUrl} alt={name} height="200px" />
      <div className="flex flex-col w-full">
        <div className="flex justify-between  mt-2 mb-3 mx-5">
          <span className="font-semibold">{name}</span>
          <span className="">{formatCurrency(price)}</span>
        </div>
        <div className="flex items-center justify-center">
          <button
            className={`border rounded-full py-1 px-2 mr-1 ${
              size === "SM" && "bg-blue"
            }`}
            onClick={() => setSize("SM")}
          >
            SM
          </button>{" "}
          <button
            className={`border  rounded-full py-1 px-2 mr-1 ${
              size === "MD" && "bg-blue"
            }`}
            onClick={() => setSize("MD")}
          >
            MD
          </button>{" "}
          <button
            className={`border  rounded-full py-1 px-2 mr-1 ${
              size === "LG" && "bg-blue"
            }`}
            onClick={() => setSize("LG")}
          >
            LG
          </button>{" "}
          <button
            className={`border rounded-full py-1 px-2 mr-1 ${
              size === "XL" && "bg-blue"
            }`}
            onClick={() => setSize("XL")}
          >
            XL
          </button>
        </div>
        <div className="flex flex-col items-center mt-3 mb-2">
          <div className="flex items-center justify-center border border-1 text-xl p-1 bg-blue rounded-lg">
            <button
              className="ml-2 mr-2"
              onClick={() => decreaseCartQuantity(id, size)}
            >
              <AiOutlineMinus />
            </button>
            <div className="mx-2 ">{quantity}</div>
            <button
              className="mr-2 ml-2"
              onClick={() => increaseCartQuantity(id, size)}
            >
              <AiOutlinePlus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
