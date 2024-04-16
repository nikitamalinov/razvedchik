import { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from 'cloudinary';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.v2.uploader.upload(fileStr, {
      folder: req.body.folder,
    });
    res.status(200).json({ message: 'Photo uploaded successfully!', data: uploadedResponse });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload photo to Cloudinary.' });
  }
}