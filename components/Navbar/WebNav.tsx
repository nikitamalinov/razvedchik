import Link from "next/link";
import { useRouter } from "next/router";
import { BsCartPlus } from "react-icons/bs";
import { useShoppingCart } from "@/context/ShoppingCartContext";

export default function WebNav() {
  const router = useRouter();
  const { openCart, cartQuantity, closeCart, cartItems, isOpen } =
    useShoppingCart();
  const LinkStyles = "mr-8 flex items-center ";

  let isHome = false;
  let isCalendar = false;
  let isCamp = false;
  let isPhotos = false;
  let isMerch = false;
  let isMaterials = false;
  if (router.pathname == "/") {
    isHome = true;
  }
  if (router.pathname == "/calendar") {
    isCalendar = true;
  }

  if (router.pathname == "/camp") {
    isCamp = true;
  }
  if (router.pathname == "/photos") {
    isPhotos = true;
  }
  if (router.pathname == "/merch") {
    isMerch = true;
  }
  if (router.pathname == "/materials") {
    isMaterials = true;
  }

  return (
    <div className="hidden ml:flex items-center">
      <ol className="flex flex-nowrap items-center">
        <li>
          <Link href="/" className={LinkStyles}>
            <span className={`link ${isHome ? "selected-link" : ""}`}>
              Home
            </span>
          </Link>
        </li>
        <li>
          <Link href="/calendar" className={LinkStyles}>
            <span className={`link  ${isCalendar ? "selected-link" : ""}`}>
              Calendar
            </span>
          </Link>
        </li>
        <li>
          <Link href="/camp" className={LinkStyles}>
            <span className={`link  ${isCamp ? "selected-link" : ""}`}>
              Camp
            </span>
          </Link>
        </li>
        <li>
          <Link href="/materials" className={LinkStyles}>
            <span className={`link  ${isMaterials ? "selected-link" : ""}`}>
              Materials
            </span>
          </Link>
        </li>
        <li>
          <Link href="/photos" className={LinkStyles}>
            <span className={`link  ${isPhotos ? "selected-link" : ""}`}>
              Photos
            </span>
          </Link>
        </li>

        {/*cartQuantity > 0 && (
          <button
            onClick={openCart}
            style={{ width: "3rem", height: "3rem", position: "relative" }}
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
      </ol>
    </div>
  );
}
