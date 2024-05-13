import { Spinner } from "@chakra-ui/react";
import Image from "next/image";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-[calc(100svh-93px)] bg-light">
      <div className="relative flex items-center">
        <Spinner
          thickness="4px"
          speed=".8s"
          emptyColor="gray.200"
          color="#336042"
          width={{ base: "250px", xs: "300px" }}
          height={{ base: "250px", xs: "300px" }}
        />
        <div
          className="absolute
			w-[116px] h-[116px] ml-[67px]
			xs:w-[140px] xs:h-[140px] xs:ml-[80px]"
        >
          <Image src="/favicon.png" alt="Logo" fill />
        </div>
      </div>
    </div>
  );
}
