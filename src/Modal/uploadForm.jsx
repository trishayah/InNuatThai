import React, { useState } from 'react';
function UploadForm({ setShowModal, setDocuments }) {
  const [newFileName, setNewFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const newDoc = {
        id: Date.now() + Math.random(),
        name: newFileName || selectedFile.name,
        date: new Date().toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: '2-digit'
        }),
        imageUrl: URL.createObjectURL(selectedFile)
      };
      setDocuments(prev => [...prev, newDoc]);
      setShowModal(false);
      setNewFileName('');
      setSelectedFile(null);
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