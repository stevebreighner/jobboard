import { useState } from 'react';
import axios from 'axios';

export default function MagicLinkForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/magic-link`, { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage('Failed to send magic link.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button type="submit">Send Magic Link</button>
      <p>{message}</p>
    </form>
  );
}
