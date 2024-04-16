import { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from 'cloudinary';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {file, folder} = req.body;
    await cloudinary.v2.uploader.upload(file,{folder: folder},
      function(error, result) {console.log(result, error);});
    res.status(200).json({message: 'Image uploaded successfully'});
  }
}