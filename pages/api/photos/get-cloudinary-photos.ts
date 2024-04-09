import type { NextApiRequest, NextApiResponse } from "next";

import { z, ZodError } from "zod";

const schema = z.object({
  folderName: z.string(),
});

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function listFolders() {
  try {
    const folders = await cloudinary.api.sub_folders("main_folder_path/");
    return folders.folders.map(folder => folder.name);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to list folders");
  }
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    const folderName = schema.parse(req.query).folderName;

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
