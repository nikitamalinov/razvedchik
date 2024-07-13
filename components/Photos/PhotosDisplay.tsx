import useSWR from "swr";
import { useState } from "react";
import LazyImage from "./LazyImage";
import { Skeleton } from "@chakra-ui/react";

export default function PhotosDisplay({ idToken, email, folderName }: any) {
  const [areVideosLoading, setAreVideosLoading] = useState(true);

  let photosURL = "";
  if (email && idToken) {
    photosURL = `/api/photos/get-cloudinary-photos?email=${email}&idToken=${idToken}&folderName=Collage/${folderName}`;
  }

  const { data: photos, isLoading } = useSWR(photosURL, async () => {
    const res = await fetch(photosURL);
    return res.json();
  });

  if (!photos || isLoading) {
    return (
      <div className="columns-1 xs:columns-2 lg:columns-3 mb-5 mt-6">
        <Skeleton height="1000px" />
      </div>
    );
  }
  console.log(photos);
  return (
    <>
      <div className="columns-1 xs:columns-2 lg:columns-3 mb-5 mt-6">
        {photos.videoAssets.map((asset: { url: string }, index: number) => {
          return (
            <div
              className={`transition-all duration-350 ease-in-out mb-5 ${
                areVideosLoading ? "hidden" : "block"
              }`}
              key={index + asset.url}
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
        })}
      </div>
      <div className="columns-1 xs:columns-2 lg:columns-3">
        {photos.imageAssets.map((asset: { url: string }, index: number) => {
          return (
            <div
              className={`transition-all duration-350 ease-in-out mb-5  ${
                areVideosLoading ? "hidden" : "block"
              }`}
              key={asset.url + index}
              onClick={() => {
                // setSlideNumber(index);
                // setOpenModal(true);
              }}
            >
              {/* <img
                src={asset.url}
                alt={`${folderName} ${index}`}
                style={{ width: "100%" }}
                loading="lazy"
              /> */}
              <LazyImage src={asset.url} alt={`${folderName} ${index}`} />
            </div>
          );
        })}
      </div>
    </>
  );
}
