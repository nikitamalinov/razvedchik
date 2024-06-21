import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCalendarContext } from "@/context/CalendarContext";
import { Spinner, useDisclosure } from "@chakra-ui/react";
import { convertDate } from "@/utils/mapping";
import { BsFacebook, BsInstagram, BsGithub, BsGit } from "react-icons/bs";
import JoinModal from "@/components/HomePage/JoinModal";
import YouTube from "react-youtube";
import TicketModal from "@/components/HomePage/TicketModal";
// https://www.youtube.com/watch?v=4N55fVuxxOg

import EventModal from "@/components/Modal/EventModal";

function HomePage() {
  const { events, isLoading } = useCalendarContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isTicketOpen,
    onOpen: onTicketOpen,
    onClose: onTicketClose,
  } = useDisclosure();
  const [squareSiteLink, setSquareSiteLink] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [disclaimer, setDisclaimer] = useState("");
  const [title, setTitle] = useState("");

  const {
    isOpen: isImageOpen,
    onOpen: onImageOpen,
    onClose: onImageClose,
  } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [muteVideo, setMuteVideo] = useState(1);
  const opts = {
    height: "300",
    width: "534",
    playerVars: {
      autoplay: 1,
      disablekb: 1,
    },
  };

  const opts2 = {
    height: "250",
    width: "445",
    playerVars: {
      autoplay: 1,
      disablekb: 1,
    },
  };

  const opts3 = {
    height: "214",
    width: "381",
    playerVars: {
      autoplay: 1,
      disablekb: 1,
    },
  };

  const opts4 = {
    height: "177",
    width: "315",
    playerVars: {
      autoplay: 1,
      disablekb: 1,
    },
  };

  const onReady = (event: any) => {
    event.target.mute();
  };

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
