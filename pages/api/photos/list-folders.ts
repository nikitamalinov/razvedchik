import { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from 'cloudinary';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await cloudinary.v2.api.sub_folders("main_folder");
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to list folders from Cloudinary.' });
  }
}