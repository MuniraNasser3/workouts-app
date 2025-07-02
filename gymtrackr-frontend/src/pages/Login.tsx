import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/user/login', formData);
      localStorage.setItem('token', res.data.access_token); // Save the token
      alert('Login successful!');
      navigate('/workouts'); //  Redirect to workouts page
    } catch (err: any) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left section */}
      <div className="w-1/2 bg-[#B6C5DB] flex flex-col justify-center items-center p-10 text-left">
        <h1 className="text-2xl font-semibold text-[#2E3569] mb-4">
          Track your <span className="text-[#1D2951] font-bold">Workout Progress</span>
        </h1>
        <p className="text-lg text-[#2E3569]">
          Stay motivated and hit your fitness goals!
        </p>
      </div>

      {/* Right section */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-10">
        <div className="w-full max-w-md shadow-lg p-10 rounded-2xl">
          <h2 className="text-2xl font-bold text-center text-[#2E3569] mb-8">Sign-in</h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                onChange={handleChange}
                className="mt-1 block w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2E3569]"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                required
                onChange={handleChange}
                className="mt-1 block w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2E3569]"
              />
              <div className="text-right mt-1">
                <a href="#" className="text-sm text-[#2E3569] hover:underline">
                  Forgot your password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#2E3569] text-white py-2 px-4 rounded-md hover:bg-[#1D2951] transition"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-4 text-sm">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}



