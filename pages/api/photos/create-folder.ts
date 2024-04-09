import { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from 'cloudinary';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { folderName } = req.body;
    cloudinary.v2.api.create_folder(folderName, (error, result) => {
      res.status(200).json({ result, error });
    });
  }
};