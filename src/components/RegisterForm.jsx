import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function RegisterForm() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [strength, setStrength] = useState('');
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const checkStrength = (password) => {
    if (password.length < 6) return 'Too short';
    if (!/[A-Z]/.test(password)) return 'Add uppercase';
    if (!/[0-9]/.test(password)) return 'Add number';
    if (!/[^A-Za-z0-9]/.test(password)) return 'Add symbol';
    return 'Strong';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    if (name === 'password') {
      setStrength(checkStrength(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (form.password !== form.confirmPassword) {
      return setError('❌ Passwords do not match.');
    }

    try {
      const res = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Registration failed.');
      }

      setMessage(data.message || '✅ Registered successfully.');
      navigate('/dashboard');
      setForm({ username: '', email: '', password: '', confirmPassword: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Register</h2>
      <input
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Username"
        required
        style={{ width: '100%', marginBottom: 8 }}
      />
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        required
        style={{ width: '100%', marginBottom: 8 }}
      />
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        required
        style={{ width: '100%', marginBottom: 8 }}
      />
      <div style={{ fontSize: '0.9em', marginBottom: 10 }}>Strength: {strength}</div>
      <input
        name="confirmPassword"
        type="password"
        value={form.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm Password"
        required
        style={{ width: '100%', marginBottom: 8 }}
      />
      <button type="submit">Register</button>
      {message && <div style={{ color: 'green', marginTop: 10 }}>{message}</div>}
      {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
    </form>
  );
}
