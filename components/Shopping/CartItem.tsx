import { useShoppingCart } from "@/context/ShoppingCartContext";
import storeItems from "@/data/items.json";
import { formatCurrency } from "@/utilities/formatCurrency";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
type CartItemProps = {
  id: string;
  quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  let [first, size] = id.split("-");
  let index = parseInt(first);
  const item = storeItems.find((i) => i.id === index);

  if (item == null) return null;

  return (
    <div className="flex flex-col">
      <div className="flex items-center mt-5">
        <img src={item.imgUrl} width="125px" height="75px" />
        <div className="ml-5 mr-auto">
          <div>
            {item.name}{" "}
            {quantity > 1 && (
              <span className="text-muted" style={{ fontSize: ".65rem" }}>
                x{quantity}
              </span>
            )}
          </div>
          Size: {size}
          <div className="text-muted" style={{ fontSize: ".75rem" }}>
            {formatCurrency(item.price)}
          </div>
        </div>
        <div> {formatCurrency(item.price * quantity)}</div>
      </div>
      <div className="flex justify-center items-center mt-3 mb-2">
        <div className="flex items-center justify-center border border-1 text-xl p-1 bg-blue rounded-lg">
          <button
            className="ml-2 mr-2"
            onClick={() => decreaseCartQuantity(index, size)}
          >
            <AiOutlineMinus />
          </button>
          <div className="mx-2 ">{quantity}</div>
          <button
            className="mr-2 ml-2"
            onClick={() => increaseCartQuantity(index, size)}
          >
            <AiOutlinePlus />
          </button>
        </div>
        <button onClick={() => removeFromCart(index, size)}>
          <BsTrash3 size="24" className="ml-2" />
        </button>
      </div>
    </div>
  );
}
