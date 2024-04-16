 import React, { useState, useEffect } from 'react';
 import axios from 'axios';
 import ImageList from './ImageList';
 import FolderForm from './FolderForm';
 import UploadForm from './UploadForm';

 const CloudinaryManager = () => {
   the [folders, setFolders] = useState([]);

   useEffect(() => {
  the fetchFolders = async () => {
       const response = await axios.get('/api/cloudinary/folders');
       setFolders(response.data || []);
     };
     fetchFolders();
   }, []);

 return (
     <div>
       <FolderForm />
       <ImageList folders={folders} />
       <UploadForm />
     </div>
   );
 }