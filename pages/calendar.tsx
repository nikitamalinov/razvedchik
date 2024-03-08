import React, { useState } from "react";
import useSWR from "swr";
import { convertDate } from "@/utils/mapping";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useCalendarContext } from "@/context/CalendarContext";
import Image from "next/image";
import { useDisclosure } from "@chakra-ui/react";
import TicketModal from "@/components/HomePage/TicketModal";
import EventModal from "@/components/Modal/EventModal";

export default function Calendar() {
  const { events, isLoading } = useCalendarContext();

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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-[calc(100svh-133px)] py-8 px-4 ml:pr-8 flex flex-col items-center bg-gradient-to-t from-[#f9fde6] to-white text-black ">
      {events && events.length > 0 && (
        <div className="flex flex-col gap-5 mx-5">
          {events.map((event: any, index: number) => {
            return (
              <div
                key={index}
                className="flex flex-col lg:flex-row items-center justify-center gap-4 five:gap-6"
              >
                <Image
                  src={
                    event.imageUrl ||
                    "https://res.cloudinary.com/duaiiecow/image/upload/v1698730024/rcvhbweur9cgg3umpg9b.png"
                  }
                  alt="event"
                  width={150}
                  height={150}
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedImage(event.imageUrl);
                    onImageOpen();
                  }}
                />
                <div className="flex flex-col text-center lg:text-left ">
                  <span className="text-xl xs:text-2xl">
                    {event.event_name}
                  </span>
                  <span className="text-md xs:text-lg mt-2">
                    {convertDate(event.from, event.to)}
                  </span>
                  <span className="text-md xs:text-lg">{event.location}</span>
                </div>
                {event.buttonOption === "Get Tickets" ? (
                  <button
                    className="text-white lg:ml-8 text-xl bg-blue hover:bg-blueHover px-5 py-3 rounded-lg mb-3 whitespace-nowrap"
                    onClick={() => {
                      setSquareSiteLink(event.squareSiteLink);
                      setTicketPrice(event.ticketPrice);
                      setDisclaimer(event.disclaimer);
                      setTitle(event.event_name);
                      onTicketOpen();
                    }}
                  >
                    Get Tickets
                  </button>
                ) : (
                  <div className="ml-auto"></div>
                )}
              </div>
            );
          })}
        </div>
      )}
      <TicketModal
        isOpen={isTicketOpen}
        onClose={onTicketClose}
        squareSiteLink={squareSiteLink}
        ticketPrice={ticketPrice}
        disclaimer={disclaimer}
        title={title}
      />
      <EventModal
        isImageOpen={isImageOpen}
        onImageClose={onImageClose}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </div>
  );
}
