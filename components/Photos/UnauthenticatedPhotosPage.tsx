import { motion } from "framer-motion";
import { Spinner, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";

import { signIn } from "next-auth/react";
import JoinModal from "../HomePage/JoinModal";

export default function UnauthenticatedPhotosPage() {
  const [isSignInLoading, setIsSignInLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div className=" flex flex-col items-center justify-center min-h-[calc(100svh-133px)]">
        <span className="text-xl">
          Please log in to access lager photos&nbsp;
        </span>

        <div className="text-xl mt-5">
          If you don&apos;t have an account, please join us and we&apos;ll reach
          back out once we&apos;ve verified you.
        </div>
        <div className="flex items-center mt-10">
          <div className="relative items-center text-xl">
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
                setIsSignInLoading(true);
                signIn(
                  "auth0",
                  { callbackUrl: "photos" },
                  {
                    prompt: "login",
                  }
                ).then(() => {
                  setIsSignInLoading(false);
                });
              }}
              className={` bg-blue text-white rounded-lg transition-colors duration-200 text-xl
         py-1 px-3 whitespace-nowrap shadow-md hover:shadow-lg cursor-pointer hover:bg-blueHover mr-5
         ${isSignInLoading ? "opacity-0 pointer-events-none" : ""}`}
            >
              Log In
            </motion.button>
            {isSignInLoading && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-blue opacity-50 rounded-lg shadow-md py-1 px-3
           cursor-not-allowed mr-5"
              >
                <Spinner size="md" color="white" />
              </div>
            )}
          </div>

          <div className="flex items-center justify-center text-xl">
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
              className="bg-blue text-white rounded-lg transition-colors duration-200 text-xl
							py-1 px-3 whitespace-nowrap shadow-md hover:shadow-lg cursor-pointer hover:bg-blueHover"
            >
              Join Us
            </motion.button>
          </div>

          <JoinModal isOpen={isOpen} onClose={onClose} />
        </div>
      </div>
    </>
  );
}
