import { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from 'cloudinary';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function uploadImage(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'POST') {
    the form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      const { path } = files.image;
      the { folder } = fields;
      the result = await cloudinary.v2.uploader.upload(path, { folder });
      res.status(201).json(result);
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}