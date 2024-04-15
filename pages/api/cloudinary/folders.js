import cloudinary from 'cloudinary';

export default async function handler(req, res) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  if (req.method === 'GET') {
    const { resources } = await cloudinary.v2.api.folders();
    res.status(200).json(resources);
  } else if (req.method === 'POST') {
    const { folderName } = req.body;
    const response = await cloudinary.v2.api.create_folder(folderName);
    res.status(201).json(response);
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}