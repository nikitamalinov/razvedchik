import React from "react";
import {
  Alert,
  AlertIcon,
  chakra,
  CloseButton,
  AlertTitle,
  useDisclosure,
  AlertDescription,
} from "@chakra-ui/react";
interface ToastProps {
  message?: string;
  title?: string;
}

export default function Success({
  message = "",
  title = "Saved",
}: ToastProps): JSX.Element {
  const { isOpen: isVisible, onClose } = useDisclosure({ defaultIsOpen: true });

  return isVisible ? (
    <Alert
      addRole={false}
      bg="green"
      alignItems="start"
      mr="5"
      mt="1"
      borderRadius="md"
      boxShadow="lg"
      paddingEnd={5}
      textAlign="start"
      width="300px"
      status="success"
    >
      <AlertIcon color="white" />
      <chakra.div flex="1" maxWidth="100%">
        <AlertTitle color="white" fontWeight="bold" fontSize="1.2rem">
          {title}
        </AlertTitle>
        <AlertDescription maxWidth="sm" color="white" display="block">
          {message}
        </AlertDescription>
      </chakra.div>
      <CloseButton
        size="sm"
        onClick={onClose}
        position="absolute"
        insetEnd={1}
        top={1}
      />
    </Alert>
  ) : (
    <></>
  );
}
