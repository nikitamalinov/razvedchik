import { cloudinary } from '../../../lib/client';
export default function handler(req, res) {
  if(req.method === 'POST') {
    const { fileStr, folder } = req.body;
    cloudinary.uploader.upload(fileStr, { folder: folder },
      function(error, result) {
        res.status(201).json(result);
      });