import React from "react";
import { useState, useEffect } from "react";

import useSWR from "swr";
import YouTube from "react-youtube";

import { signOut, useSession } from "next-auth/react";

import LoadingSpinner from "@/components/LoadingSpinner";
import Layout from "@/components/Layout";
import Unauthenticated from "@/components/Unauthenticated";
import FolderList from "@/components/Photos/FolderList";
import jwt from "jsonwebtoken";
import PhotosDisplay from "@/components/Photos/PhotosDisplay";
import UnauthenticatedPhotosPage from "@/components/Photos/UnauthenticatedPhotosPage";

export const getStaticProps = async () => {
  const divArray = Array.from({ length: 33 }, (_, index) => index + 1);

  return {
    props: {
      divArray,
    },
  };
};

export default function Photos({ divArray }: { divArray: number[] }) {
  const { data: session, status } = useSession();
  const [areVideosLoading, setAreVideosLoading] = useState(true);

  const [email, setEmail] = useState<null | string>(null);
  const [idToken, setIdToken] = useState<null | string>(null);

  const [folder, setFolder] = useState(null);

  const opts = {
    height: "300",
    width: "534",
    playerVars: {
      autoplay: 1,
    },
  };

  const opts4 = {
    height: "177",
    width: "315",
    playerVars: {
      autoplay: 1,
    },
  };

  const onReady = (event: any) => {
    event.target.mute();
  };

  let folderListURL = "";
  if (email && idToken) {
    folderListURL = `/api/photos/get-folders?email=${email}&idToken=${idToken}`;
  }

  const { data: folderList, isLoading: isFolderListLoading } = useSWR(
    folderListURL,
    async () => {
      const res = await fetch(folderListURL);
      return res.json();
    }
  );

  useEffect(() => {
    if (session && session.user && session.user.email) {
      setEmail(session.user.email);
    }
    if (session && session.idToken) {
      setIdToken(session.idToken);
    }
  }, [session]);

  if (status === "unauthenticated") {
    return <UnauthenticatedPhotosPage />;
  }

  if (status === "loading" || isFolderListLoading || !folderList) {
    return <LoadingSpinner />;
  }
  if (idToken) {
    const decodedToken: any = jwt.decode(idToken);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < currentTime) {
      signOut({ callbackUrl: "/photos" });
    }
  }
  console.log(folderList);
  console.log(folder);
  return (
    <Layout className="bg-light">
      <div className="py-8 px-4 ml:pr-8 ">
        {/* <div className="flex p-1 pb-3 bg-gray rounded-lg outline-none shadow-lg"> */}
        <div className="my-5 mx-auto flex items-center justify-center">
          <YouTube
            className="hidden footerSM:block"
            videoId="eV7_IkguORM"
            opts={opts}
            onReady={onReady}
          />
          <YouTube
            className="footerSM:hidden"
            videoId="eV7_IkguORM"
            opts={opts4}
            onReady={onReady}
          />
        </div>

        <FolderList
          folderList={folderList}
          folder={folder}
          setFolder={setFolder}
        />

        {folder !== "Other Photos" && (
          <PhotosDisplay idToken={idToken} email={email} folderName={folder} />
        )}

        {folder === "Other Photos" && (
          <div className="columns-1 xs:columns-2 lg:columns-3 mt-6">
            {divArray.map((index: number) => {
              return (
                <div
                  className={`transition-all duration-350 ease-in-out mb-5`}
                  key={index + "other photos"}
                  onClick={() => {
                    // setSlideNumber(index);
                    // setOpenModal(true);
                  }}
                >
                  <img
                    src={`/photos/${index}.jpg`}
                    alt={`LA Lager ${index}`}
                    style={{ width: "100%" }}
                    loading="lazy"
                  />
                </div>
              );
            })}
            {/*openModal && (
          <div className="fixed top-0 right-0 left-0 bottom-0 z-[1000] bg-transparent flex flex-col items-center justify-center w-[100vw] h-[100svh]">
            <div>Exit</div>
            <div className="flex items-center justify-center w-[100vw]">
              <span>Previous Slide</span>{" "}
              <img
                src={`/photos/${slideNumber}.jpg`}
                alt={`LA Lager ${slideNumber}`}
                style={{ width: "calc(80%)" }}
              />{" "}
              <span onClick={() => setSlideNumber(slideNumber + 1)}>
                NextSlide
              </span>
            </div>
          </div>
        )*/}
            {/*    <Box overflow="hidden" bg="purple.100" minH="100svh" py="6">
        <Wrap px="1rem" spacing={4} justify="center">
          {divArray.map((index: number) => {
            return (
              <WrapItem
                key={index}
                boxShadow="base"
                rounded="20px"
                overflow="hidden"
                bg="transparent"
                lineHeight="0"
                alignItems={"center"}
                _hover={{ boxShadow: "dark-lg" }}
              >
                <Image
                  key={index}
                  src={`/photos/${index}.jpg`}
                  width={500}
                  height={500}
                  alt={`LA Lager ${index}`}
                />
              </WrapItem>
            );
          })}
        </Wrap>
      </Box>*/}
          </div>
        )}
      </div>
    </Layout>
  );
}
