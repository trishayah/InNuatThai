import React from "react";

const DocumentCard = ({ doc, onImageClick }) => {
    return (
        <div className="imageBox">
            <div className="relative max-w-xs overflow-hidden rounded-lg shadow-lg group">
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