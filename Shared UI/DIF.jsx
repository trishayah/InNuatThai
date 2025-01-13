import React, { useState, useEffect } from 'react';
import SearchBar from './searchBar';
import AccInfo from './AccInfo'; // Import AccInfo component
import UploadDIF from "../src/Modal/uploadDIF";
import DisplayDIF from '../src/Modal/DisplayDIF';
import ViewImage from "../src/Modal/ViewImage";
import DIFDownload from './DIFDownloadButton'; // Import DIFDownload component
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const DeliveryInstructionForm = () => {
  const [documents, setDocuments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch('http://localhost:3000/dif-forms', {
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
    setSelectedImage(`http://localhost:3000/dif/${imageId}`);
  };

  const handleUploadSuccess = (newDocument) => {
    setDocuments((prevDocuments) => [newDocument, ...prevDocuments]);
  };

  const handleEdit = async (docId, updatedData) => {
    try {
      const response = await fetch(`http://localhost:3000/dif/${docId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updatedData)
      });
  
      if (response.ok) {
        setDocuments((prevDocuments) => prevDocuments.map(doc => doc.dif_id === docId ? { ...doc, ...updatedData } : doc));
        console.log(`Updated document with ID: ${docId}`);
      } else {
        console.error('Failed to update document');
      }
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };
  
  const handleDelete = async (docId) => {
    try {
      const response = await fetch(`http://localhost:3000/dif/${docId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      if (response.ok) {
        setDocuments((prevDocuments) => prevDocuments.filter(doc => doc.dif_id !== docId));
        console.log(`Deleted document with ID: ${docId}`);
      } else {
        console.error('Failed to delete document');
      }
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  // Filter documents based on the search query
  // const filteredDocuments = documents.filter(doc =>
  //   doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  
  const user = JSON.parse(localStorage.getItem("user")); // Get user details

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#D9D9D9] font-poppins overflow-hidden">
        <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-semibold text-[#133517] mt-4 ml-6">Delivery Instruction Form</h1>
        <div className="flex items-center space-x-4">
          {/* <Notification
            modifiedItems={Object.entries(editedRows).map(([id, changes]) => ({ id, changes }))}
          /> */}
          <AccInfo user={user} />
        </div>
        </div>
        <div className="px-4 mt-4">
        <div className="flex items-center gap-2 mb-2">        
          <SearchBar />
        <button
          className="addbtn"
          onClick={handleUploadForm}
        >
          Add DIF
        </button>
        <DIFDownload /> {/* Add DIFDownload component beside the button */}
        <button className='ml-8 mr-4 bg-green-950 rounded-[15px] p-2 px-6 text-white' onClick={() => handleEdit(selectedDocId, updatedData)}><FaEdit/></button>
        <button className='ml-4 mr-4 bg-green-950 rounded-[15px] p-2 px-6 text-white' onClick={() => handleDelete(selectedDocId)}><MdDelete/></button>

      </div>
      <div className="displayImage">
        {documents.slice(0, 16).map((doc, index) => (
          <div key={doc.dif_id} className="flex flex-col cursor-pointer">
            <DisplayDIF doc={doc} onImageClick={() => handleImageClick(doc.dif_id)} />
          </div>
        ))}
      </div>
      {showModal && <UploadDIF setShowModal={setShowModal} onUploadSuccess={handleUploadSuccess} />}
      {selectedImage && (
        <ViewImage imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </div>
    </div>
  );
};

export default DeliveryInstructionForm;