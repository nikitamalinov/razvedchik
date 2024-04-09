import { NextApiRequest, NextApiResponse } from 'next';
import { cloudinary } from '../../../lib/cloudinary';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { resources } = await cloudinary.search.expression('folder:your_folder_name/*').execute();
    const folders = resources.map(resource => resource.folder);
    res.status(200).json({ folders });
  } catch (error) {
    res.status(500).json({ error: 'Failed to list folders' });
  }
}