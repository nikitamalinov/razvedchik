import type { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from 'cloudinary';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if(req.method === 'GET'){
      const { resources } = await cloudinary.v2.api.sub_folders("main_folder_path");
      res.status(200).json(resources);
    }
    else if(req.method === 'POST'){
      const { folder } = req.body;
      const result = await cloudinary.v2.api.create_folder(folder);
      res.status(201).json(result);
    }
    else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to connect with Cloudinary API', detail: error });
  }
}