import { NextApiRequest, NextApiResponse } from 'next';
import { cloudinary } from '../../../lib/cloudinary';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const fileStr = req.body.data;
      const uploadedResponse = await cloudinary.uploader.upload(fileStr, { upload_preset: 'ml_default' });
      res.status(200).json({ data: uploadedResponse });
    } catch (error) {
      res.status(500).json({ error: 'Failed to upload photo' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}