import Image from "next/image";
import {
  PayPalScriptProvider,
  PayPalHostedFieldsProvider,
  PayPalHostedField,
  usePayPalHostedFields,
  PayPalButtons,
} from "@paypal/react-paypal-js";
export default function Merch({ index, title, price }) {
  return (
    <div className="flex flex-col  items-center justify-center gap-5">
      <Image
        src={`/merch/${index}.jpg`}
        width={300}
        height={300}
        alt="merch/2.jpg"
      />
      <div className="flex gap-2 items-center justify-between">
        <span className="font-semibold text-xl">{title}</span>
        <span className="text-lg">${price}</span>
      </div>
      <div>+ Add to Cart</div>
    </div>
  );
}
