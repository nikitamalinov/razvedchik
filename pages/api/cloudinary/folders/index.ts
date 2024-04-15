import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Implement Cloudinary folders/images listing logic here
  res.status(200).json({ message: 'List of folders and images' });
}