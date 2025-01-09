import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [uploadType, setUploadType] = useState('dif'); // Default to 'dif'
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [dateAdded, setDateAdded] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', name);
    formData.append('dateAdded', dateAdded);

    try {
      const response = await axios.post(`/upload-${uploadType}-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload successful:', response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <div>
        <label>
          Select Upload Type:
          <select value={uploadType} onChange={(e) => setUploadType(e.target.value)}>
            <option value="dif">DIF</option>
            <option value="wsrr">WSRR</option>
            <option value="po">PO</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          File:
          <input type="file" onChange={handleFileChange} />
        </label>
      </div>
      <div>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Date Added:
          <input type="date" value={dateAdded} onChange={(e) => setDateAdded(e.target.value)} />
        </label>
      </div>
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadForm;
