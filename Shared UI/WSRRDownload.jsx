import React from 'react';

function WSRRDownload() {
  return (
    <div>
      <a href="/public/warehouse-stock-receiving-report.docx" download="/public/warehouse-stock-receiving-report.docx">
        <button className="downloadbutton">Download WSRR</button>
      </a>
    </div>
  );
}

export default WSRRDownload;
