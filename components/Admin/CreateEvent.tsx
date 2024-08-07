import { useState } from "react";
import { BsTrash3 } from "react-icons/bs";
import DatePicker from "react-datepicker";
import Image from "next/image";
// UI libraries
import { motion } from "framer-motion";
import { Spinner } from "@chakra-ui/react";

import { convertDate } from "@/utils/mapping";

export default function CreateEvent({ idToken, email, events, mutate }: any) {
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [buttonOption, setButtonOption] = useState("No Button");

  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());

  const [isEventLoading, setIsEventLoading] = useState(false);
  const [eventDeleteId, setEventDeleteId] = useState("");
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [image, setImage] = useState<string>("");
  const [imageLoading, setImageLoading] = useState(false);
  const [squareSiteLink, setSquareSiteLink] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [disclaimer, setDisclaimer] = useState("");

  const inputStyles =
    "text-lg footerSM:text-lg bg-white outline-none indent-1 border-2 rounded-lg focus:ring focus:border-transparent focus:ring-opacity-50";
  const labelStyles = "text-lg";

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "eyhu7vur");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/duaiiecow/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    return data.secure_url;
  };

  const handleFileSelect = async (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    setImageLoading(true);
    if (file) {
      const imageUrl = await handleImageUpload(file);
      setImage(imageUrl);
    }
    setImageLoading(false);
    return;
  };

  const handleClick = () => {
    const input = document.getElementById("input") as HTMLInputElement | null;
    if (input) {
      input.type = "file";
      input.accept = "image/*";
      input.onchange = handleFileSelect;
      input.click();
    }
  };
  async function createEvent(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsEventLoading(true);

    const response = await fetch("/api/calendar/create-event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventName: eventName,
        location: location,
        from: from,
        to: to,
        email: email,
        imageUrl: image,
        buttonOption: buttonOption,
        squareSiteLink: squareSiteLink,
        ticketPrice: ticketPrice,
        disclaimer: disclaimer,
      }),
    });
    const res = await response.json();
    mutate();
    setIsEventLoading(false);
    return await res;
  }

  async function deleteEvent(
    event: React.FormEvent<HTMLFormElement>,
    id: string
  ) {
    event.preventDefault();
    setIsDeleteLoading(true);

    const response = await fetch("/api/calendar/delete-event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        eventId: id,
      }),
    });
    const res = await response.json();
    mutate();
    setIsDeleteLoading(false);
    setEventDeleteId("");
    return await res;
  }

  return (
    <>
      <button
        onClick={(e) => setShowCreateEvent(!showCreateEvent)}
        className="mt-5 border border-1 p-2"
      >
        Show Create Event Form
      </button>
      {showCreateEvent && (
        <>
          <div className="flex flex-col gap-5 mx-5">
            {events &&
              events.length > 0 &&
              events.map((event: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col five:flex-row items-center gap-4 five:gap-6"
                  >
                    <Image
                      src={
                        event.imageUrl ||
                        "https://res.cloudinary.com/duaiiecow/image/upload/v1698730024/rcvhbweur9cgg3umpg9b.png"
                      }
                      alt="event"
                      width={150}
                      height={150}
                    />
                    <div className="flex flex-col">
                      <span className="text-xl xs:text-2xl">
                        {event.event_name}
                      </span>
                      <span className="text-md xs:text-lg mt-2 ">
                        {convertDate(event.from, event.to)}
                      </span>
                      <span className="text-md xs:text-lg">
                        {event.location}
                      </span>
                    </div>
                    <div className="relative items-center ml-auto">
                      <BsTrash3
                        className={`text-red ml-auto cursor-pointer   ${
                          isDeleteLoading && event.id === eventDeleteId
                            ? "opacity-0 pointer-events-none"
                            : ""
                        }`}
                        onClick={(e: any) => {
                          setEventDeleteId(event.id);
                          deleteEvent(e, event.id);
                        }}
                        size="22"
                      />
                      {isDeleteLoading && event.id === eventDeleteId && (
                        <div
                          className="absolute right-0 top-0 flex items-center justify-center bg-red opacity-50 rounded-lg shadow-md ml-auto px-2 py-1
											cursor-not-allowed "
                        >
                          <Spinner size="sm" color="white" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="mt-16 flex flex-col mx-5">
            <span className="mx-auto text-xl mb-5 text-black">
              Create an Event
            </span>
            <form
              className="border border-1 flex flex-col p-5 rounded-lg bg-light text-black"
              onSubmit={(e) => createEvent(e)}
            >
              <label className={labelStyles}>
                Event Name <span className="text-[#E53B17] ml-[2px]">*</span>
              </label>
              <input
                className={inputStyles}
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="Vistovka"
                required
              ></input>
              <label className={`${labelStyles} mt-2`}>
                Event Location{" "}
                <span className="text-[#E53B17] ml-[2px]">*</span>
              </label>
              <input
                className={inputStyles}
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Scouts House"
                required
              ></input>
              <label className={`${labelStyles} mt-2`}>
                From <span className="text-[#E53B17] ml-[2px]">*</span>
              </label>
              <DatePicker
                selected={from}
                onChange={(date: Date) => setFrom(date)}
                showTimeSelect
                timeFormat="h:mm aa"
                timeIntervals={30}
                dateFormat="MMMM d, yyyy h:mm aa"
                timeCaption="Time"
                className="w-[225px] footerXM:w-[300px] text-black"
                isClearable
              />
              <label className={`${labelStyles} mt-2`}>
                To <span className="text-[#E53B17] ml-[2px]">*</span>
              </label>
              <DatePicker
                selected={to}
                onChange={(date: Date) => setTo(date)}
                showTimeSelect
                timeFormat="h:mm aa"
                timeIntervals={30}
                dateFormat="MMMM d, yyyy h:mm aa"
                timeCaption="Time"
                isClearable
                className="w-[225px] footerXM:w-[300px] text-black"
              />
              <input type="file" id="input" style={{ display: "none" }} />

              {image.length === 0 ? (
                <motion.button
                  type="button"
                  whileHover={{
                    scale: 1.04,
                    transition: { duration: 0.1 },
                  }}
                  whileTap={{
                    scale: 0.98,
                    transition: { duration: 0.1 },
                  }}
                  className="mt-8 rounded-lg py-[3px] px-3 text-lg footerSM:text-xl mx-auto whitespace-nowrap shadow-md hover:shadow-lg cursor-pointer hover:border-blueHover hover:text-blueHover border-blue text-blue border"
                  onClick={handleClick}
                >
                  Attach an Image
                </motion.button>
              ) : (
                <Image src={image} alt="event image" width={200} height={200} />
              )}

              <div className="flex items-center justify-center mt-6">
                <button
                  className={`border p-2 rounded-l-xl ${
                    buttonOption === "No Button" && "bg-white border-blue"
                  }`}
                  onClick={() => {
                    setButtonOption("No Button");
                  }}
                  type="button"
                >
                  No Button
                </button>
                <button
                  className={`border p-2  ${
                    buttonOption === "RSVP" && "bg-white border-blue"
                  }`}
                  onClick={() => {
                    setButtonOption("RSVP");
                  }}
                  type="button"
                >
                  RSVP
                </button>
                <button
                  className={`border p-2 rounded-r-xl ${
                    buttonOption === "Get Tickets" &&
                    "bg-white border-blue whitespace-nowrap "
                  }`}
                  onClick={() => {
                    setButtonOption("Get Tickets");
                  }}
                  type="button"
                >
                  Get Tickets
                </button>
              </div>
              {buttonOption === "Get Tickets" && (
                <div className=" flex flex-col ">
                  <label className={`${labelStyles} mt-2`}>
                    {" "}
                    Square Site Link
                  </label>
                  <input
                    className={inputStyles}
                    type="text"
                    value={squareSiteLink}
                    onChange={(e) => setSquareSiteLink(e.target.value)}
                    placeholder="https://razvedchik.square.site/product/malibu-creek-sp-overnight-sbor/28?cp=true&sa=true&sbp=false&q=false"
                    required
                  ></input>
                  <label className={`${labelStyles} mt-2`}>Ticket Price</label>
                  <input
                    className={inputStyles}
                    type="text"
                    value={ticketPrice}
                    onChange={(e) => setTicketPrice(e.target.value)}
                    placeholder="$24"
                    required
                  ></input>
                  <label className={`${labelStyles} mt-2`}>
                    Disclaimer(if there is one)
                  </label>
                  <textarea
                    className={inputStyles}
                    value={disclaimer}
                    onChange={(e) => setDisclaimer(e.target.value)}
                    placeholder="You will need to buy your own ferry tickets for the Catalina Trip."
                    required
                  ></textarea>
                </div>
              )}

              <div className="mt-8 relative items-center mx-auto">
                <button
                  type="submit"
                  className="bg-blue text-white rounded-full transition-colors duration-200 py-2 px-8 whitespace-nowrap shadow-md hover:shadow-lg cursor-pointer hover:bg-blueHover"
                >
                  Add Event
                </button>
                {isEventLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-blue opacity-50 rounded-full shadow-md py-2 px-8 cursor-not-allowed">
                    <Spinner size="md" color="white" />
                  </div>
                )}
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
