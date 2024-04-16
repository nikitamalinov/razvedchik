import {cloudinary} from '../../../lib/client';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const response = await cloudinary.api.sub_folders('main');
      res.status(200).json(response.folders);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch folders' });
    }
  } else if (req.method === 'POST') {
    try {
      const { folderName } = req.body;
      const response = await cloudinary.api.create_folder(folderName);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create folder' });
    }
  }
}