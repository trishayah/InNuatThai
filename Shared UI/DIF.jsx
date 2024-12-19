import React, { useState } from 'react';
import SearchBar from './searchBar';
import accInfo from './accInfo';
import Sidebar from './sidebar';

const DeliveryInstructionForm = () => {
  const [documents, setDocuments] = useState([]);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newDocs = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      date: new Date().toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit'
      }),
      // Add this to show the actual image
      imageUrl: URL.createObjectURL(file)
    }));
    setDocuments(prev => [...prev, ...newDocs]);
  };
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar role="accounting" />

      {/* Main Content */}
    <div className="flex flex-col w-full min-w-screen h-full min-h-screen bg-[#D9D9D9]">
      <h1 className="text-2xl font-semibold mb-6 text-[#133517]">Delivery Instruction Form</h1>
      <accInfo/>
      
      {/* Search Bar */}
      <div className="mb-6 relative">
        <SearchBar />
      </div>

      {/* Action Button */}
      <div className="flex mb-6">
        <button 
          className="px-4 py-2 bg-white text-black rounded hover:bg-gray-50 transition border border-gray-300"
          onClick={() => document.getElementById('file-upload').click()}
        >
          Add DIF
        </button>
        <input
          id="file-upload"
          type="file"
          multiple
          className="hidden"
          onChange={handleFileUpload}
          accept="image/*,.pdf"
        />
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-inherit">
        {documents.map(doc => (
          <div key={doc.id} className="bg-white rounded-lg shadow-sm overflow-hidden p-4">
            <div className="aspect-w-1 aspect-h-1 bg-gray-50 flex items-left justify-center mb-3 rounded">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                //   d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="text-sm text-center text-gray-600">
              DIF - {doc.date}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default DeliveryInstructionForm;