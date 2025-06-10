// src/components/ResumeUpload.jsx
import { useState } from 'react';
import axios from 'axios';

export default function ResumeUpload() {
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('resume', file);
    setUploading(true);
    setSuccess(null);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/upload-resume`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess(res.data.url);
      alert('✅ Resume uploaded');
    } catch (err) {
      alert('❌ Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2>📄 Resume</h2>
      <input type="file" onChange={handleResumeUpload} disabled={uploading} />
      {uploading && <p>Uploading...</p>}
      {success && (
        <p>
          Uploaded: <a href={success} target="_blank" rel="noreferrer">View Resume</a>
        </p>
      )}
    </div>
  );
}
