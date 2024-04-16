import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import cloudinary from 'cloudinary';

const handler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        const result = await cloudinary.v2.api.sub_folders('main_folder');
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    case 'POST':
      try {
        const result = await cloudinary.v2.api.create_folder(req.body.folderName);
        res.status(201).json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default withApiAuthRequired(handler);