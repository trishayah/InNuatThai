import React, { useState, useEffect } from 'react';
import SearchBar from './searchBar';
import AccInfo from './AccInfo'; // Import AccInfo component
import UploadPO from "../src/Modal/uploadPO"; // Import UploadPO component
import DisplayPO from '../src/Modal/DisplayPO';
import ViewImage from "../src/Modal/ViewImage";
import PODownload from './PODownloadButton'; // Import PODownload component
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const PurchaseOrder = () => {
  const [documents, setDocuments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch('http://localhost:3000/po-forms', {
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
    setSelectedImage(`http://localhost:3000/po/${imageId}`);
  };

  const handleUploadSuccess = (newDocument) => {
    setDocuments((prevDocuments) => [newDocument, ...prevDocuments]);
  };

  const user = JSON.parse(localStorage.getItem("user")); // Get user details
  return (
    <div className="flex flex-col flex-1 items-end w-full min-h-screen font-poppins bg-[#D9D9D9]">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-2xl font-semibold text-[#133517] mt-4 ml-6 whitespace-nowrap">Purchase Order</h2>
        <AccInfo user={user} /> {/* Display AccInfo component */}
      </div>
      <div className="px-4 mt-4">
        <div className="flex items-center gap-2 mb-2"> 
        <SearchBar />
        <button
          className="addbtn"
          onClick={handleUploadForm}
        >
          Add PO
        </button>
        <PODownload /> {/* Add PODownload component beside the button */}
        <button className='ml-8 mr-4 bg-green-950 rounded-[15px] p-2 px-6 text-white'><FaEdit /></button>
        <button className='ml-4 mr-4 bg-green-950 rounded-[15px] p-2 px-6 text-white'><MdDelete /></button>
      </div>
      <div className="displayImage">
        {documents.slice(0, 16).map((doc, index) => (
          <div key={doc.po_id} className="flex flex-col cursor-pointer">
            <DisplayPO doc={doc} onImageClick={() => handleImageClick(doc.po_id)} />
          </div>
        ))}
      </div>
      {showModal && <UploadPO setShowModal={setShowModal} onUploadSuccess={handleUploadSuccess} />}
      {selectedImage && (
        <ViewImage imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </div>
    </div>
  );
};

export default PurchaseOrder;