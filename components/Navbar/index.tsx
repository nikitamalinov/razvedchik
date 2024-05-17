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

      {/* Yearly Dues Banner */}
      {/* {router.pathname !== "/Lina-Sirch" && router.pathname !== "/camp" && (
        <Link
          href="/camp"
          className="bg-[#ffe320] py-2 w-full text-black flex justify-center hover:bg-yellowHover "
        >
          <div className="mx-5 text-center">
            <span className="semi-bold">
              Submit your yearly dues by March 31st! &nbsp;
            </span>
            <span className="underline">Forms here</span>
          </div>
        </Link>
          <a href="https://github.com/nikitamalinov/razvedchik" target="_blank" rel="noopener noreferrer" aria-label="Visit GitHub repository" className="flex items-center justify-center gap-2">
            <svg role="img" aria-labelledby="githubIconTitle" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><title id="githubIconTitle">GitHub</title><path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.6-3.37-1.35-3.37-1.35-.45-1.17-1.11-1.48-1.11-1.48-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.42 9.42 0 0112 4.8c.85.004 1.7.115 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.10 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10.06 10.06 0 0022 12c0-5.52-4.48-10-10-10z" clipRule="evenodd"/></svg>
            <span className="text-sm font-medium">GitHub</span>
          </a>
      )} */}

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
