 import { uploadImage } from 'lib/cloudinary';
 export default async (req, res) => {
   if (req.method === 'POST') {
     try {
       const { folder, image } = req.body;
       const result = await uploadImage(folder, image);
       res.status(200).json(result);
     } catch (error) {
       res.status(500).json({ error: error.message });
     }
   } else {
     res.setHeader('Allow', ['POST']);
     res.status(405).end(`Method ${req.method} Not Allowed`);
   }
 };