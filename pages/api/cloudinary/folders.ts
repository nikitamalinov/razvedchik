import { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from 'cloudinary';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const folders = await cloudinary.v2.api.sub_folders("main_folder");
    res.status(200).json(folders);
  }
}