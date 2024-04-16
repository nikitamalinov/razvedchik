import { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from 'cloudinary';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {folderName} = req.body;
    await cloudinary.v2.api.create_folder(folderName);
    res.status(201).send('Folder created');
  }
}