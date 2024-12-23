import React, { useState } from 'react';
import SearchBar from './searchBar';
// import accInfo from './accInfo';
import UploadForm from "../src/Modal/uploadForm";
import DocumentCard from '../src/Modal/DocumentCard';
import ViewImage from "../src/Modal/ViewImage";
// import Sidebar from './sidebar';
import WSRRDownload from './WSRRDownload';
import SelectAndDelete from './SelectDelete';

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

  return (
    <div className="flex h-screen font-poppins bg-white">
      <div className="flex flex-col w-screen h-screen min-w-screen  min-h-screen p-4 md:p-8">
        <h1 className="text-2xl font-semibold mb-6 text-[#133517]">Purchase Order</h1>
        <accInfo/>
        <div className="mb-4 relative mx-4 md:mx-8">
          <SearchBar />
        </div>
        <div className="flex mb-6 bg-[#133517]">
          <button 
            className="w-[40px] sm:w-[200px] h-[40px] bg-[#105D2B] rounded-[15px] shadow-m3-elevation-light-4 text-white text-base sm:text-lg font-medium hover:bg-[#003d1a] transition duration-300"
            onClick={handleUploadForm}
          >
            Add Purchase Order
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {documents.map((doc, index) => (
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
    </div>
  );
};

export default PurchaseOrder;