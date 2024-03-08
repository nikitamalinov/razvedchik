import MobileDrawer from "./MobileDrawer";
import { BsCartPlus } from "react-icons/bs";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { useState } from "react";
import HamburgerMenu from "./HamburgerMenu";

export default function MobileNav() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const { openCart, cartQuantity, closeCart, cartItems, isOpen } =
    useShoppingCart();
  return (
    <div className="flex items-center ml:hidden">
      {/*cartQuantity > 0 && (
        <button
          onClick={openCart}
          style={{ width: "3rem", height: "3rem", position: "relative" }}
          className="mr-5"
        >
          <BsCartPlus size="32" />

          <div
            className=" bg-blue flex justify-center items-center rounded-full"
            style={{
              width: "1.5rem",
              height: "1.5rem",
              position: "absolute",
              bottom: 0,
              right: 0,
              transform: "translate(25%, 25%)",
            }}
          >
            {cartQuantity}
          </div>
        </button>
      )*/}
      <HamburgerMenu setIsNavOpen={setIsNavOpen} isNavOpen={isNavOpen} />
      <MobileDrawer setIsNavOpen={setIsNavOpen} isNavOpen={isNavOpen} />
    </div>
  );
}
