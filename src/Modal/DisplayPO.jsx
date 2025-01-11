import React from "react";

const DisplayPO = ({ doc, onImageClick }) => {
    return (
        <div className="imageBox ml-8 mr-6">
            <div className="relative max-w-xs max-h-xs overflow-hidden rounded-sm shadow-xl group">
                <img
                    src={`http://localhost:3000/po/${doc.po_id}`}
                    alt={doc.po_name}
                    className="transition-transform group-hover:scale-105 duration-200 cursor-pointer"
                    onClick={() => onImageClick(doc.po_id)}
                />
            </div>
            <div className="text-base text-center text-black font-poppins">
                {doc.po_name} - {new Date(doc.po_dateadded).toLocaleDateString()}
            </div>
        </div>
    );
};

export default DisplayPO;
