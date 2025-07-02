// src/pages/WorkoutForm.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function WorkoutForm() {
  const [formData, setFormData] = useState({
    name: '',
    reps: '',
    sets: '',
    weight: '',
    date: '',
    notes: '',
    duration: '',
    type: '',
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:3000/workouts',
        {
          ...formData,
          reps: Number(formData.reps),
          sets: Number(formData.sets),
          weight: Number(formData.weight),
          duration: Number(formData.duration),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Workout saved!');
      console.log(res.data);
      navigate('/workouts'); // redirect after saving
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to save workout');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="w-1/2 bg-[#B6C5DB] flex flex-col justify-center items-center p-10 text-left">
        <h1 className="text-2xl font-semibold text-[#2E3569] mb-4">
          Track your <span className="font-bold text-[#1D2951]">Workout Progress</span>
        </h1>
        <p className="text-lg text-[#2E3569]">Stay motivated and hit your fitness goals!</p>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-10">
        <button
          className="text-sm text-blue-600 underline mb-4 self-start"
          onClick={() => navigate('/workouts')}
        >
          View My Workouts
        </button>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white shadow-lg rounded-2xl p-10 space-y-4"
        >
          <h2 className="text-2xl font-bold text-center text-[#2E3569] mb-4">Add Workout</h2>

          <input name="name" type="text" placeholder="Workout Name" required className="w-full border p-2 rounded" onChange={handleChange} />
          <input name="reps" type="number" placeholder="Reps" required className="w-full border p-2 rounded" onChange={handleChange} />
          <input name="sets" type="number" placeholder="Sets" required className="w-full border p-2 rounded" onChange={handleChange} />
          <input name="weight" type="number" placeholder="Weight (kg)" required className="w-full border p-2 rounded" onChange={handleChange} />
          <input name="duration" type="number" placeholder="Duration (minutes)" required className="w-full border p-2 rounded" onChange={handleChange} />
          <select name="type" required className="w-full border p-2 rounded" onChange={handleChange}>
            <option value="">Workout Type</option>
            <option value="cardio">Cardio</option>
            <option value="strength">Strength</option>
            <option value="hiit">HIIT</option>
            <option value="yoga">Yoga</option>
            <option value="walking">Walking</option>
          </select>
          <input name="date" type="date" required className="w-full border p-2 rounded" onChange={handleChange} />
          <textarea name="notes" placeholder="Notes (optional)" className="w-full border p-2 rounded" onChange={handleChange} />

          <button type="submit" className="w-full bg-[#2E3569] text-white py-2 rounded hover:bg-[#1D2951]">
            Save Workout
          </button>
        </form>
      </div>
    </div>
  );
}


