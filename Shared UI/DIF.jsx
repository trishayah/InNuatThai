import React, { useState, useEffect } from 'react';
import SearchBar from './searchBar';
import AccInfo from './AccInfo'; // Import AccInfo component
import UploadForm from "../src/Modal/uploadForm";
import DocumentCard from '../src/Modal/DocumentCard';
import ViewImage from "../src/Modal/ViewImage";
import DIFDownload from './DIFDownloadButton'; // Import DIFDownload component

const DeliveryInstructionForm = () => {
  const [documents, setDocuments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch('http://localhost:3000/images', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setDocuments(data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocuments();
  }, []);

  const handleUploadForm = () => {
    setShowModal(true);
  };

  const handleImageClick = (imageId) => {
    setSelectedImage(`http://localhost:3000/image/${imageId}`);
  };

  const handleUploadSuccess = (newDocument) => {
    setDocuments((prevDocuments) => [newDocument, ...prevDocuments]);
  };

  const user = JSON.parse(localStorage.getItem("user")); // Get user details

  return (
    <div className="flex flex-col flex-1 items-end font-poppins min-w-screen min-h-screen bg-[#D9D9D9]"> {/* Updated class name */}
      <div className="flex justify-between items-center p-4">
        <h2 className="text-2xl font-semibold text-[#133517] mt-4 ml-6 whitespace-nowrap">Delivery Instruction Form</h2>
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
          Add DIF
        </button>
        <DIFDownload /> {/* Add DIFDownload component beside the button */}
      </div>
      <div className="displayImage">
        {documents.slice(0, 16).map((doc, index) => (
          <div key={doc.dif_id} className="flex flex-col cursor-pointer">
            <DocumentCard doc={doc} onImageClick={() => handleImageClick(doc.dif_id)} />
          </div>
        ))}
      </div>
      {showModal && <UploadForm setShowModal={setShowModal} onUploadSuccess={handleUploadSuccess} />}
      {selectedImage && (
        <ViewImage imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </div>
  );
};

export default DeliveryInstructionForm;