import React from 'react';

function PODownload() {
  return (
    <div>
      <a href="/public/Purchase Order(blank) (1).doc" download="/public/Purchase Order(blank) (1).doc">
        <button className="downloadbutton">Download PO</button>
      </a>
    </div>
  );
}

export default PODownload;
