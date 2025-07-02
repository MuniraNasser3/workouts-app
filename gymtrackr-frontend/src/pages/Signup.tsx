import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    weightKg: '',
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/user/register', {

        ...formData,
        weightKg: parseFloat(formData.weightKg),
      });
      alert('Sign up successful! You can now log in.');
      navigate('/');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Sign up failed');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="w-1/2 bg-[#B6C5DB] flex flex-col justify-center items-center p-10 text-left">
        <h1 className="text-2xl font-semibold text-[#2E3569] mb-4">
          Welcome to <span className="font-bold text-[#1D2951]">GymTrackr</span>
        </h1>
        <p className="text-lg text-[#2E3569]">
          Track your fitness and monitor your progress!
        </p>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white shadow-lg rounded-2xl p-10 space-y-4"
        >
          <h2 className="text-2xl font-bold text-center text-[#2E3569] mb-4">Sign Up</h2>

          <input
            name="name"
            type="text"
            placeholder="Full Name"
            required
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />
          <input
            name="weightKg"
            type="number"
            placeholder="Weight (kg)"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-[#2E3569] text-white py-2 rounded hover:bg-[#1D2951]"
          >
            Sign Up
          </button>

          <p className="text-center mt-4 text-sm">
            Already have an account?{' '}
            <Link to="/" className="text-blue-600 hover:underline">
              Log in here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}



