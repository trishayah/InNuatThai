import React, { useState } from 'react'
import axios from 'axios'

function UploadForm({ setShowModal, onUploadSuccess }) {
  const [newFileName, setNewFileName] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [dateAdded, setDateAdded] = useState('')
  const [errorMessage, setErrorMessage] = useState('') // Add state for error message

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    setSelectedFile(file)
  }

  const handleUpload = async (event) => {
    event.preventDefault()

    if (selectedFile) {
      const formData = new FormData()
      formData.append('image', selectedFile)
      formData.append('name', newFileName)
      formData.append('dateAdded', dateAdded)

      try {
        const response = await axios.post('http://localhost:3000/upload-dif', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })

        const newDoc = {
          dif_id: response.data.document.dif_id,
          dif_name: response.data.document.dif_name,
          dif_dateadded: response.data.document.dif_dateadded,
        }

        onUploadSuccess(newDoc)
        setShowModal(false)
        setNewFileName('')
        setSelectedFile(null)
        setDateAdded('')
        setErrorMessage('') // Clear error message on success
      } catch (error) {
        console.error('Error uploading image:', error)
        setErrorMessage('Failed to upload the document. Please try again.') // Set error message
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 font-poppins">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-green-950">Upload Form</h2>
          <form onSubmit={handleUpload}>
            <div className="mb-4">
              <label className="block text-green-900 text-sm font-bold mb-2" htmlFor="file">
                Select File
              </label>
              <input
                type="file"
                id="file"
                onChange={handleFileUpload}
                accept="image/*,.pdf"
                className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:border-green-700"
              />
            </div>
            <div className="mb-4">
              <label className="block text-green-900 text-sm font-bold mb-2" htmlFor="fileName">
                File Name
              </label>
              <input
                type="text"
                id="fileName"
                placeholder="Enter file name"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:border-green-700"
              />
            </div>
            <div className="mb-6">
              <label className="block text-green-900 text-sm font-bold mb-2" htmlFor="dateAdded">
                Date Added
              </label>
              <input
                type="date"
                id="dateAdded"
                value={dateAdded}
                onChange={(e) => setDateAdded(e.target.value)}
                className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:border-green-700"   
              />
            </div>
            {errorMessage && ( // Display error message if exists
              <div className="mb-4 text-red-500 text-sm">
                {errorMessage}
              </div>
            )}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowModal(false)
                  setNewFileName('')
                  setSelectedFile(null)
                  setDateAdded('')
                  setErrorMessage('') // Clear error message on cancel
                }}
                className="px-4 py-2 text-black bg-gray-200 rounded-lg focus:outline-none mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-green-950 rounded-lg focus:outline-none"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UploadForm;

