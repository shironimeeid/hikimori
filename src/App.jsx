

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState('mp3');

  const downloadVideo = async () => {
    const downloadUrl = `http://localhost:3000/download?URL=${encodeURIComponent(url)}&format=${format}`;
    window.open(downloadUrl, '_blank');
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">YouTube Downloader</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter YouTube URL"
        />
      </div>
      <select className="form-select mb-3" value={format} onChange={(e) => setFormat(e.target.value)}>
        <option value="mp3">MP3</option>
        <option value="mp4">MP4</option>
      </select>
      <button className="btn btn-primary" onClick={downloadVideo}>Download</button>
    </div>
  );
}

export default App;
