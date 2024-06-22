import React from "react";
import { useState, useEffect } from "react";

import useSWR from "swr";
import YouTube from "react-youtube";

import { useSession } from "next-auth/react";

import LoadingSpinner from "@/components/LoadingSpinner";
import Layout from "@/components/Layout";
import Unauthenticated from "@/components/Unauthenticated";

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

  let url = `/api/photos/get-cloudinary-photos?folderName=Collage/Catalina Trip 2023`;

  const { data: catalinaPhotos, isLoading } = useSWR(
    email ? url : null, //only load if email is set
    async () => {
      const res = await fetch(url);
      return res.json();
    }
  );

  useEffect(() => {
    if (session && session.user && session.user.email) {
      setEmail(session.user.email);
    }
  }, [session]);

  if (status === "unauthenticated") {
    return <Unauthenticated callbackUrl="/photos" />;
  }

  if (isLoading || !catalinaPhotos || status === "loading") {
    return <LoadingSpinner />;
  }

  return (
    <Layout className="bg-light">
      <div className="py-8 px-4 ml:pr-8 ">
        <h2 className="text-2xl mx-auto text-center">
          Catalina Trip November 2023
        </h2>
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

        <div className="columns-1 xs:columns-2 lg:columns-3 mb-5">
          {catalinaPhotos.videoAssets.map(
            (asset: { url: string }, index: number) => {
              return (
                <div
                  className={`transition-all duration-350 ease-in-out mb-5 ${
                    areVideosLoading ? "hidden" : "block"
                  }`}
                  key={index}
                >
                  <video
                    muted
                    controls
                    onLoadedData={() => {
                      setAreVideosLoading(false);
                    }}
                  >
                    <source src={asset.url} type="video/mp4" />
                  </video>
                </div>
              );
            }
          )}
        </div>
        <div className="columns-1 xs:columns-2 lg:columns-3">
          {catalinaPhotos.imageAssets.map(
            (asset: { url: string }, index: number) => {
              return (
                <div
                  className={`transition-all duration-350 ease-in-out mb-5  ${
                    areVideosLoading ? "hidden" : "block"
                  }`}
                  key={index}
                  onClick={() => {
                    // setSlideNumber(index);
                    // setOpenModal(true);
                  }}
                >
                  <img
                    src={asset.url}
                    alt={`Catalina Trip ${index}`}
                    style={{ width: "100%" }}
                    loading="lazy"
                  />
                </div>
              );
            }
          )}
        </div>

        {/* </div> */}
        <div className="mb-16"></div>
        <h2 className="text-2xl mx-auto text-center mb-5">Other Photos</h2>
        <div className="columns-1 xs:columns-2 lg:columns-3">
          {divArray.map((index: number) => {
            return (
              <div
                className={`transition-all duration-350 ease-in-out mb-5 ${
                  areVideosLoading ? "hidden" : "block"
                }`}
                key={index}
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
      </div>
    </Layout>
  );
}
