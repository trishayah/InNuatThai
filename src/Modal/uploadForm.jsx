import React, { useState } from 'react';
import axios from 'axios';

function UploadForm({ setShowModal, onUploadSuccess }) {
  const [newFileName, setNewFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [dateAdded, setDateAdded] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('name', newFileName);
      formData.append('dateAdded', dateAdded);

      try {
        const response = await axios.post('http://localhost:3000/upload-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
          },
        });

        const newDoc = {
          dif_id: response.data.document.dif_id,
          dif_name: response.data.document.dif_name,
          dif_dateadded: response.data.document.dif_dateadded,
        };

        onUploadSuccess(newDoc);
        setShowModal(false);
        setNewFileName('');
        setSelectedFile(null);
        setDateAdded('');
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <div className="font-poppins fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-[#D9D9D9] p-6 rounded shadow-lg w-11/12 md:w-1/3 items-center">
        <h2 className="text-xl mb-4 text-center">Upload Form</h2>
        <input
          type="file"
          onChange={handleFileUpload}
          accept="image/*,.pdf"
          className="mb-4 p-4 border border-gray-300 rounded-10px w-full"
        />
        <input
          type="text"
          placeholder="Enter file name"
          value={newFileName}
          onChange={(e) => setNewFileName(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="date"
          value={dateAdded}
          onChange={(e) => setDateAdded(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <button
          onClick={handleUpload}
          className="w-[40px] sm:w-[150px] h-[40px] bg-[#105D2B] rounded-[15px] ml-6 mr-4 text-white text-base sm:text-lg font-medium hover:bg-[#003d1a] transition duration-300"
        >
          Upload
        </button>
        <button
          onClick={() => {
            setShowModal(false);
            setNewFileName('');
            setSelectedFile(null);
            setDateAdded('');
          }}
          className="w-[40px] sm:w-[150px] h-[40px] bg-[#105D2B] rounded-[15px] ml-4 text-white text-base sm:text-lg font-medium hover:bg-[#003d1a] transition duration-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default UploadForm;