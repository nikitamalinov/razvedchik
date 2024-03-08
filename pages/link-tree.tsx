import Image from "next/image";
import JoinModal from "@/components/HomePage/JoinModal";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import { motion } from "framer-motion";

import { useDisclosure } from "@chakra-ui/react";

export default function LinkTree() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className="flex flex-col w-[100vw] text-white min-h-[100svh]">
      <div className="flex flex-col items-center justify-center text-black pt-16">
        <div
          className="relative
							w-[116px] h-[116px] 
							xs:w-[140px] xs:h-[140px] "
        >
          <Image src="/favicon.png" alt="Logo" fill />
        </div>
        <div className="flex flex-col items-center gap-10 mt-12">
          <motion.a
            whileHover={{
              scale: 1.04,
              transition: { duration: 0.1 },
            }}
            whileTap={{
              scale: 0.98,
              transition: { duration: 0.1 },
            }}
            className="text-[#0866ff]"
            href="https://www.facebook.com/sgpathfinders/"
            target="_blank"
          >
            <BsFacebook className="text-6xl" />
          </motion.a>
          <motion.a
            whileHover={{
              scale: 1.04,
              transition: { duration: 0.1 },
            }}
            whileTap={{
              scale: 0.98,
              transition: { duration: 0.1 },
            }}
            className="text-[#f70764]"
            href="https://www.instagram.com/razvedchik.dnn"
            target="_blank"
          >
            <BsInstagram className="text-6xl" />
          </motion.a>
          <motion.a
            href="/"
            target="_blank"
            whileHover={{
              scale: 1.04,
              transition: { duration: 0.1 },
            }}
            whileTap={{
              scale: 0.98,
              transition: { duration: 0.1 },
            }}
            className="text-xl bg-purple text-white hover:bg-purpleHover px-5 py-3 rounded-lg"
          >
            Website
          </motion.a>
          <motion.button
            whileHover={{
              scale: 1.04,
              transition: { duration: 0.1 },
            }}
            whileTap={{
              scale: 0.98,
              transition: { duration: 0.1 },
            }}
            onClick={() => {
              onOpen();
            }}
            className="text-xl bg-blue hover:bg-blueHover px-5 py-3 rounded-lg"
          >
            Join Us
          </motion.button>
        </div>
      </div>
      <JoinModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
}
