import type { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";

// Set up Cloudinary configuration with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to list all folders
async function listFolders() {
  const { folders } = await cloudinary.api.sub_folders("your_base_folder_path");
  return folders;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const folders = await listFolders();
        res.status(200).json(folders);
      } catch (error) {
        console.error("Error listing folders:", error);
        res.status(500).json({ error: "Failed to list folders" });
      }
      break;
    case "POST":
      // Implement folder creation logic here
      break;
    case "DELETE":
      // Implement folder deletion logic here
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}