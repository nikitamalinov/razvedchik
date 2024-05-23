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

      <Link
        href="https://www.zeffy.com/en-US/ticketing/becab808-3c97-462e-b0d7-b26b5fd76e79"
        target="_blank"
        className="bg-[#ffe320] py-2 w-full text-black flex justify-center hover:bg-yellowHover "
      >
        <div className="mx-5 text-center">
          <span className="semi-bold">Get your Ball tickets&nbsp;</span>
          <span className="underline">here</span>
        </div>
      </Link>
    </div>
  );
}
