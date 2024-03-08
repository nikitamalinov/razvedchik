import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Image as ChakraImage,
} from "@chakra-ui/react";

export default function EventModal({
  isImageOpen,
  onImageClose,
  selectedImage,
  setSelectedImage,
}: {
  isImageOpen: boolean;
  onImageClose: () => void;
  selectedImage: string | null;
  setSelectedImage: (x: any) => void;
}) {
  return (
    <Modal
      isOpen={isImageOpen}
      onClose={() => {
        setSelectedImage(null);
        onImageClose();
      }}
      size="full"
      preserveScrollBarGap={true}
    >
      <ModalOverlay />

      <ModalContent
        onClick={() => {
          setSelectedImage(null);
          onImageClose();
        }}
        bg="blackAlpha.300"
        backdropFilter="blur(1px)"
      >
        <ModalBody p={0} className="mx-auto">
          <ModalCloseButton textColor="white" />
          <ChakraImage
            src={selectedImage || ""}
            alt="Enlarged Image"
            height="100svh"
            objectFit="contain"
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
