import {
  Drawer,
  DrawerContent,
  Divider,
  DrawerBody,
  Text,
} from "@chakra-ui/react";

import Link from "next/link";

import { useRouter } from "next/router";

interface MobileDrawerProps {
  setIsNavOpen: (prev: boolean) => void;
  isNavOpen: boolean;
}

export default function MobileDrawer({
  setIsNavOpen,
  isNavOpen,
}: MobileDrawerProps) {
  const router = useRouter();
  let isHome = false;
  let isCalendar = false;
  let isCamp = false;
  let isPhotos = false;
  let isMerch = false;
  let isMaterials = false;
  if (router.pathname == "/") {
    isHome = true;
  }
  if (router.pathname == "/calendar") {
    isCalendar = true;
  }

  if (router.pathname == "/camp") {
    isCamp = true;
  }
  if (router.pathname == "/photos") {
    isPhotos = true;
  }
  if (router.pathname == "/merch") {
    isMerch = true;
  }
  if (router.pathname == "/materials") {
    isMaterials = true;
  }
  return (
    <Drawer
      isOpen={isNavOpen}
      placement="right"
      size="full"
      onClose={() => setIsNavOpen(!isNavOpen)}
    >
      <DrawerContent className="text-2xl" bg="#3D405B">
        <DrawerBody
          p={0}
          className="flex flex-col items-center text-3xl gap-16 mt-16 text-white"
        >
          <Link
            href="/"
            className={` whitespace-nowrap text-center outline-none ${
              isHome ? "text-yellow" : ""
            }`}
            onClick={() => setIsNavOpen(false)}
          >
            HOME
          </Link>

          <Link
            href="/calendar"
            className={`  ${isCalendar ? "text-yellow" : ""}`}
            onClick={() => setIsNavOpen(false)}
          >
            CALENDAR
          </Link>

          <Link
            href="/materials"
            className={`  ${isMaterials ? "text-yellow" : ""}`}
            onClick={() => setIsNavOpen(false)}
          >
            MATERIALS
          </Link>

          <Link
            href="/camp"
            className={`  ${isCamp ? "text-yellow" : ""}`}
            onClick={() => setIsNavOpen(false)}
          >
            CAMP
          </Link>

          <Link
            href="/photos"
            className={`  ${isPhotos ? "text-yellow" : ""}`}
            onClick={() => setIsNavOpen(false)}
          >
            PHOTOS
          </Link>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
