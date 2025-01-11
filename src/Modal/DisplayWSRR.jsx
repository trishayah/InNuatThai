import React from "react";

const DisplayWSRR = ({ doc, onImageClick }) => {
    return (
        <div className="imageBox ml-8 mr-6">
            <div className="relative max-w-xs max-h-xs overflow-hidden rounded-sm shadow-xl group">
                <img
                    src={`http://localhost:3000/wsrr/${doc.wsrr_id}`}
                    alt={doc.wsrr_name}
                    className="transition-transform group-hover:scale-105 duration-200 cursor-pointer"
                    onClick={() => onImageClick(doc.wsrr_id)}
                />
            </div>
            <div className="text-base text-center text-black font-poppins">
                {doc.wsrr_name} - {new Date(doc.wsrr_dateadded).toLocaleDateString()}
            </div>
        </div>
    );
};

export default DisplayWSRR;
