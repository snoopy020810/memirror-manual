// components/Login.jsx
import React from 'react';
import { signInWithGoogle } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">Welcome to MeMirror</h1>
      <p className="mb-4 text-lg text-gray-700">Reflect, grow, and talk to your past self.</p>
      <button onClick={handleLogin} className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg shadow-md">
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;