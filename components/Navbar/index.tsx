import Link from "next/link";
import WebNav from "./WebNav";
import Image from "next/image";
import MobileNav from "./MobileNav";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full justify-center font-helvetica font-normal items-center bg-purple text-white ">
      <div className="flex flex-col w-[95vw] footerXM:w-[90vw] footerSM:w-[85vw] sm:w-[80vw] xxl:w-[1280px] ">
        <nav className="flex text-lg justify-center items-center">
          <Link href="/" className="mr-auto ml-5 py-4">
            <Image src="/favicon.png" width={60} height={60} alt="LA Lager" />
          </Link>
          <WebNav />
          <MobileNav />
        </nav>
      </div>
      <hr className="h-[1px] opacity-50 bg-[#C2C2C2] w-full border-0 rounded"></hr>
          </div>
        </Link>
      )}
      {router.pathname !== "/Lina-Sirch" && (
        <Link
          href="/Lina-Sirch"
          className="bg-blue py-2 w-full text-white flex justify-center hover:bg-blueHover hover:text-white"
        >
          <div className="mx-5 text-center">
            <span className="semi-bold">
              In loving memory of Lina Sirch, please consider donating to honor
              their life. &nbsp;
            </span>
            <span className="underline">Donate here</span>
          </div>
        </Link>
      )}
      {/*<Drawer isOpen={isOpen} onClose={closeCart} size="lg">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Cart</DrawerHeader>

          <DrawerBody>
            {cartItems.map((item) => {
              return <CartItem key={item.id} {...item} />;
            })}
            <div className="text-lg mb-8">
              Total{" "}
              {formatCurrency(
                cartItems.reduce((total, cartItem) => {
                  const item = [
                    storeItems.find(
                      (i) => i.id.toString() + "-SM" === cartItem.id
                    ),
                    storeItems.find(
                      (i) => i.id.toString() + "-MD" === cartItem.id
                    ),

                    storeItems.find(
                      (i) => i.id.toString() + "-LG" === cartItem.id
                    ),

                    storeItems.find(
                      (i) => i.id.toString() + "-XL" === cartItem.id
                    ),
                  ];
                  for (let i = 0; i < item.length; i++) {
                    total += (item[i]?.price || 0) * cartItem.quantity;
                  }

                  return total;
                }, 0)
              )}
            </div>
            <button
              onClick={() => {
                closeCart();
              }}
              className="flex gap-1 items-center bg-purple rounded-lg px-2 py-1 text-lg"
            >
              Checkout <MdOutlineShoppingCartCheckout />
            </button>
          </DrawerBody>
        </DrawerContent>
            </Drawer>*/}
    </div>
  );
}
