import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Checkbox,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import createErrorToast from "../Toast/createErrorToast";
import createSuccessToast from "../Toast/createSuccessToast";
import { motion } from "framer-motion";

export default function TicketModal({
  isOpen,
  onClose,
  squareSiteLink,
  ticketPrice,
  disclaimer,
  title,
}: any) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      preserveScrollBarGap={true}
      isCentered
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(1px)" />
      <ModalContent>
        <ModalCloseButton />

        <ModalBody>
          <div className="flex flex-col gap-5 mt-16 items-center mb-6">
            <motion.a
              whileHover={{
                scale: 1.04,
                transition: { duration: 0.1 },
              }}
              whileTap={{
                scale: 0.98,
                transition: { duration: 0.1 },
              }}
              className={`border rounded-lg px-5 py-3 bg-purple hover:bg-purpleHover text-white `}
              href={squareSiteLink}
              target="_blank"
            >
              Pay with Square
            </motion.a>
            <span>Or</span>
            <span className="text-center">
              Zelle {ticketPrice} to razvedchik.dnn@gmail.com with the memo
              containing {title} and the participant scout&apos;s name.{" "}
              <a
                className="underline"
                href="https://www.zellepay.com/"
                target="_blank"
              >
                Click here
              </a>{" "}
              to learn more.
            </span>
            {disclaimer && (
              <p>
                <span className="text-red">*</span>DISLAIMER: {disclaimer}
              </p>
            )}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
