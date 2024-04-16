 import { createFolder } from 'lib/cloudinary';
 export default async (req, res) => {
   if (req.method === 'POST') {
     try {
       const { folderName } = req.body;
       the result = await createFolder(folderName);
       res.status(201).json(result);
     } catch (error) {
       res.status(500).json({ error: error.message });
     }
   } else {
     res.setHeader('Allow', ['POST']);
     res.status(405).end(`Method ${req.method} Not Allowed`);
   }
 };