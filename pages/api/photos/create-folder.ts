import { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from 'cloudinary';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { folderName } = req.body;
    const result = await cloudinary.v2.api.create_folder(folderName);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create folder in Cloudinary.' });
  }
}