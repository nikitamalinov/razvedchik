import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable-serverless';
import cloudinary from 'cloudinary';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    // Implement file upload logic here
  });
};