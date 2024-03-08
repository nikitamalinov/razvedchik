import React from "react";

import { useState } from "react";
import useSWR from "swr";
import LoadingSpinner from "@/components/LoadingSpinner";
import YouTube from "react-youtube";

export const getStaticProps = async () => {
  const divArray = Array.from({ length: 33 }, (_, index) => index + 1);

  return {
    props: {
      divArray,
    },
  };
};

export default function Photos({ divArray }: { divArray: number[] }) {
  const [slideNumber, setSlideNumber] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [areVideosLoading, setAreVideosLoading] = useState(true);
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

  const { data: catalinaPhotos, isLoading } = useSWR(url, async () => {
    const res = await fetch(url);
    return res.json();
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-[calc(100svh-133px)] py-8 px-4 ml:pr-8 bg-light">
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
  );
}
