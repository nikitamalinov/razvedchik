import { useState } from "react";

import useSWR from "swr";
import LoadingSpinner from "../LoadingSpinner";

export default function Photos({ idToken, email }: any) {
  let getAlbumURL = "";
  if (email && idToken) {
    getAlbumURL = `api/admin/get-album?email=${email}&idToken=${idToken}`;
  }

  const { data: album } = useSWR(getAlbumURL, async () => {
    const res = await fetch(getAlbumURL);
    return res.json();
  });

  const [showPhotos, setShowPhotos] = useState(false);

  console.log("al", album);

  if (!album) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <button
        onClick={(e) => setShowPhotos(!showPhotos)}
        className="mt-5 border border-1 p-2"
      >
        Photos
      </button>
      {showPhotos && <>hello</>}
    </>
  );
}
