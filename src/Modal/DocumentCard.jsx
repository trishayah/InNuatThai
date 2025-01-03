import React from "react";

const DocumentCard = ({ doc, onImageClick }) => {
    return (
        <div className="imageBox ml-6 mr-6">
            <div className="relative max-w-xs max-h-xs overflow-hidden rounded-sm shadow-xl group">
                <img
                    src={doc.imageUrl}
                    alt={doc.name}
                    className="transition-transform group-hover:scale-105 duration-200 cursor-pointer"
                    onClick={() => onImageClick(doc.imageUrl)}
                />
            </div>
            <div className="text-base text-center text-black font-poppins">
                {doc.name} - {doc.date}
            </div>
        </div>
    );
};

export default DocumentCard;
