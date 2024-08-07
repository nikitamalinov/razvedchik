import type { NextApiRequest, NextApiResponse } from "next";

import { z, ZodError } from "zod";

const schema = z.object({
  email: z.string().email(),
  idToken: z.string(),
  folderName: z.string(),
});

import { v2 as cloudinary } from "cloudinary";
import { isValidToken } from "@/utils/auth";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    const { email, idToken, folderName } = schema.parse(req.query);
    if (!isValidToken(email, idToken)) {
      return res.status(405).json({ message: "Invalid token" });
    }

    const images = await cloudinary.api.resources({
      type: "upload",
      prefix: folderName,
      max_results: 100,
    });
    const videos = await cloudinary.api.resources({
      type: "upload",
      resource_type: "video",
      prefix: folderName,
      max_results: 100,
    });

    let imageAssets = images.resources.map((resource: any) => ({
      public_id: resource.public_id,
      url: resource.secure_url,
    }));

    let videoAssets = videos.resources.map((resource: any) => ({
      public_id: resource.public_id,
      url: resource.secure_url,
    }));

    res
      .status(200)
      .json({ imageAssets: imageAssets, videoAssets: videoAssets });
  } catch (err) {
    console.error(err);
    if (err instanceof ZodError) {
      res.status(400).json({ message: err.issues[0].message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
  return;
}
