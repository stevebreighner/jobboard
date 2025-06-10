import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth.jsx'; // Ensure this path is correct

function useMagicAutoLogin(setUser) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token');
    if (token) {
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/magic-login?token=${token}`, { withCredentials: true })
        .then((res) => {
          setUser(res.data.user);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          navigate('/dashboard');
        })
        .catch(() => alert('⚠️ Magic link expired or invalid'));
    }
  }, []);
}

export default function Dashboard() {
  const { user, loading, logout } = useAuth(); // Using useAuth for authentication state
  const [jobs, setJobs] = useState([]);
  const [resumeURL, setResumeURL] = useState('');
  const navigate = useNavigate();
  const referralUrl = `${import.meta.env.VITE_REFERRAL_URL}${user.id}`;
  useMagicAutoLogin(() => {}); // You may not need this if useAuth handles authentication

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate('/login');
      return;
    }

    axios.get(`${import.meta.env.VITE_API_BASE_URL}/user-jobs`, { withCredentials: true })
      .then((res) => setJobs(res.data))
      .catch(console.error);
  }, [user, loading]);

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/upload-resume`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResumeURL(res.data.url);
    } catch (err) {
      alert('❌ Resume upload failed');
    }
  };

  if (loading) return <p>Loading session...</p>;
  if (!user) return <p>You are not logged in.</p>;

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '600px', margin: 'auto' }}>
      <h1>Hello, {user.username}</h1>
      <button onClick={logout}>Logout</button>

      <h2>👤 Profile</h2>
      <p><strong>Email:</strong> {user.email}</p>

      <h2>📄 Resume</h2>
      <input type="file" onChange={handleResumeUpload} />
      {resumeURL && <p>Uploaded: <a href={resumeURL} target="_blank" rel="noreferrer">{resumeURL}</a></p>}

      <h2>📋 My Job Submissions</h2>
      {jobs.length === 0 ? <p>No submissions yet.</p> : (
        <ul>{jobs.map((job) => <li key={job.id}>{job.title} ({new Date(job.created_at).toLocaleDateString()})</li>)}</ul>
      )}

      <h2>🔗 Referrals</h2>
      <p>Share your referral link:</p>
      <code>{referralUrl}</code>
    </div>
  );
}
