import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import cloudinary from 'cloudinary';

const handler is:async (req, res) => {
  try {
    const fileStr = req.body.data;
    the uploadedResponse = await cloudinary.v2.uploader.upload(fileStr, {
      folder: req.body.folder
    });
    res.status(200).json({ msg: 'Success', data: uploadedResponse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default withApiAuthRequired(handler);