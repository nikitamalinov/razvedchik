import React from "react";

import { motion } from "framer-motion";
import { useDisclosure } from "@chakra-ui/react";

import JoinModal from "@/components/HomePage/JoinModal";

// https://www.youtube.com/watch?v=4N55fVuxxOg

import EventModal from "@/components/Modal/EventModal";

function HomePage() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="flex flex-col w-[100vw] text-black">
      <div className="flex flex-col items-center  ">
        <h1 className="text-2xl text-center mt-12 mx-5">
          Sorry, we don&apos;t recognize your email. Please join us in order to
          view camp photos.
        </h1>

        <div className="flex items-center justify-center mt-12 gap-8 footerXM:gap-10 text-xl">
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
            className="text-lg five:text-xl bg-blue hover:bg-blueHover px-5 py-3 rounded-lg font-semibold whitespace-nowrap"
          >
            Join Us
          </motion.button>

          <JoinModal isOpen={isOpen} onClose={onClose} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
