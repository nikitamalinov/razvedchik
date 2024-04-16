import { cloudinary } from '../../../lib/client';
export default function handler(req, res) {
  if(req.method === 'POST') {
    cloudinary.api.create_folder(req.body.folderName, function(error, result){
      res.status(201).json(result);
    });
  }