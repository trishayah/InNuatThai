import React from "react";

const DocumentCard = ({ doc, onImageClick }) => {
    return (
        <div className="imageBox ml-6 mr-6">
            <div className="relative max-w-xs max-h-xs overflow-hidden rounded-sm shadow-xl group">
                <img
                    src={`http://localhost:3000/image/${doc.dif_id}`}
                    alt={doc.dif_name}
                    className="transition-transform group-hover:scale-105 duration-200 cursor-pointer"
                    onClick={() => onImageClick(doc.dif_id)}
                />
            </div>
            <div className="text-base text-center text-black font-poppins">
                {doc.dif_name} - {new Date(doc.dif_dateadded).toLocaleDateString()}
            </div>
        </div>
    );
};

export default DocumentCard;
