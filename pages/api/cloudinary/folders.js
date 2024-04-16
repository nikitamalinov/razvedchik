 import { listFolders } from 'lib/cloudinary';
 export default async (req, res) => {
   res.status(200).json(await listFolders());