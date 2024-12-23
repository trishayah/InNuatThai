import React from 'react';

function WSRRDownload() {
  return (
    <div>
      <a href="/public/warehous-stock-receiving-report.doc" download="/public/warehous-stock-receiving-report.doc">
        <button className="downloadbutton">Download WSRR</button>
      </a>
    </div>
  );
}

export default WSRRDownload;
