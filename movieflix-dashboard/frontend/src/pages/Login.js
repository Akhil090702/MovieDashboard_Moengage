import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      navigate('/stats');
    } catch (err) {
      setError('Invalid credentials. Try again.');
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded shadow">
    <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
  
    {error && <p className="text-red-500 mb-2 text-sm text-center">{error}</p>}
  
    <input
      type="text"
      placeholder="Username"
      className="border p-2 rounded w-full mb-3"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
  
    <input
      type="password"
      placeholder="Password"
      className="border p-2 rounded w-full mb-4"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
  
    <button
      onClick={handleLogin}
      className="bg-blue-600 text-white px-4 py-2 w-full rounded hover:bg-blue-700"
    >
      Login
    </button>
  </div>
  
  );
};

export default Login;
