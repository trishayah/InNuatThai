import React, { useState } from 'react';
import SearchBar from './searchBar';
import AccInfo from './AccInfo'; // Import AccInfo component
import UploadForm from "../src/Modal/uploadForm";
import DocumentCard from '../src/Modal/DocumentCard';
import ViewImage from "../src/Modal/ViewImage";
import PODownload from './PODownloadButton'; // Import PODownload component

const PurchaseOrder = () => {
  const [documents, setDocuments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleUploadForm = () => {
    setShowModal(true);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const user = JSON.parse(localStorage.getItem("user")); // Get user details

  return (
    <div className="flex flex-col flex-1 items-end w-full min-h-screen font-poppins bg-[#D9D9D9]">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-2xl font-semibold text-[#133517] mt-4 ml-6 whitespace-nowrap">Purchase Order</h2>
        <AccInfo user={user} /> {/* Display AccInfo component */}
      </div>
      <div className="mb-4 relative mx-4 md:mx-8 ml-4">
        <SearchBar />
      </div>
      <div className="flex mb-6">
        <button 
          className="addbtn"
          onClick={handleUploadForm}
        >
          Add PO
        </button>
        <PODownload /> {/* Add PODownload component beside the button */}
      </div>
      <div className="displayImage">
        {documents.slice(0, 16).map((doc, index) => (
          <div key={doc.id} className="flex flex-col cursor-pointer">
            <DocumentCard doc={doc} onImageClick={handleImageClick} />
          </div>
        ))}
      </div>
      {showModal && <UploadForm setShowModal={setShowModal} setDocuments={setDocuments} />}
      {selectedImage && (
        <ViewImage imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </div>
  );
};

export default PurchaseOrder;