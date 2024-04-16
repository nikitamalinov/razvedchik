import React, {useState, useEffect} from 'react';
import axios from 'axios';

const CloudinaryManager = () => {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    axios.get('/api/cloudinary/folders').then(res => {
      setFolders(res.data);
    });
  }, []);

  return(
    <div>{folders.map(folder => <div key={folder.name}>{folder.name}</div>)}</div>
  );
};