import {cloudinary} from '../../../lib/client';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { file, folder } = req.body;
      the response = await cloudinary.uploader.upload(file, { folder: folder });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: 'Failed to upload image' });
    }
  }
}