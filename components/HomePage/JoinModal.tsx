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

export default function JoinModal({ isOpen, onClose }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [childrenInfo, setChildrenInfo] = useState("");
  const [subscribe, setSubscribe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetch("/api/join-us", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        childrenInfo: childrenInfo,
        subscribe: subscribe,
      }),
    });
    const res = await response.json();
    if (response.ok) {
      createSuccessToast(toast, "Form sent successfully!");
      setEmail("");
      setName("");
      setPhone("");
      setChildrenInfo("");
      setSubscribe(false);
      onClose();
    } else {
      createErrorToast(toast, res.message);
    }
    setIsLoading(false);
    return await res;
  }

  const inputStyles =
    "text-lg footerSM:text-xl mt-2 bg-white outline-none  border-2 rounded-lg focus:ring-2 focus:border-transparent";
  const labelStyles = "text-base footerSM:text-lg";
  return (
    <Modal isOpen={isOpen} onClose={onClose} preserveScrollBarGap={true}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(1px)" />
      <ModalContent>
        <ModalCloseButton />

        <ModalBody>
          <form
            className="flex flex-col my-8"
            onSubmit={(e) => handleSubmit(e)}
          >
            <label className={` ${labelStyles}`}>
              Name
              <span className="text-[#E53B17] ml-[2px]">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={`t ${inputStyles}`}
              required
            ></input>
            <label className={`mt-3 ${labelStyles}`}>
              Email
              <span className="text-[#E53B17] ml-[2px]">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={`  ${inputStyles}`}
              required
            ></input>
            <label className={`mt-3 ${labelStyles}`}>
              Phone Number <span className="text-[#E53B17] ml-[2px]">*</span>
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              required
              onChange={(event) => setPhone(event.target.value)}
              className={` ${inputStyles}`}
            ></input>
            <label className={`mt-3 ${labelStyles}`}>
              Number of children, their ages, and their names
            </label>
            <textarea
              id="childrenInfo"
              value={childrenInfo}
              onChange={(event) => setChildrenInfo(event.target.value)}
              className={` ${inputStyles}`}
            ></textarea>
            <div className="flex items-center gap-3 mt-5">
              <Checkbox
                size="lg"
                colorScheme="switchBlueScheme"
                isChecked={subscribe}
                onChange={() => setSubscribe(!subscribe)}
              />
              <label
                className={`cursor-pointer ${labelStyles}`}
                onClick={() => setSubscribe(!subscribe)}
              >
                Subscribe to our newsletter
              </label>
            </div>
            <div className="relative items-center mt-8 mx-auto">
              <button
                type="submit"
                className={` bg-blue hover:bg-blueHover px-5 py-3 rounded-lg  ${labelStyles} ${
                  isLoading ? "opacity-0 pointer-events-none" : ""
                }`}
              >
                Submit
              </button>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center  opacity-50 rounded-lg bg-blue hover:bg-blueHover px-5 py-3 cursor-not-allowed ">
                  <Spinner size="md" color="white" />
                </div>
              )}
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
