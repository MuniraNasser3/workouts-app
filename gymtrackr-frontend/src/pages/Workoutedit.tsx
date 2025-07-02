// src/pages/WorkoutEdit.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function WorkoutEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchWorkout = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:3000/workouts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const w = res.data;
      setFormData({
        name: w.name,
        reps: w.reps,
        sets: w.sets,
        weight: w.weight,
        date: w.date,
        notes: w.notes || '',
        duration: w.duration,
        type: w.type,
      });
    };
    fetchWorkout();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:3000/workouts/${id}`, {
        ...formData,
        reps: Number(formData.reps),
        sets: Number(formData.sets),
        weight: Number(formData.weight),
        duration: Number(formData.duration),
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Workout updated!');
      navigate('/workouts');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update workout');
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-[#B6C5DB] flex flex-col justify-center items-center p-10 text-left">
        <h1 className="text-2xl font-semibold text-[#2E3569] mb-4">Update Workout</h1>
        <p className="text-lg text-[#2E3569]">Edit your workout details below.</p>
      </div>

      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-10">
        <form onSubmit={handleSubmit} className="w-full max-w-md shadow-lg rounded-2xl p-10 space-y-4">
          <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Workout Name" required className="w-full border p-2 rounded" />
          <input name="reps" value={formData.reps} onChange={handleChange} type="number" placeholder="Reps" required className="w-full border p-2 rounded" />
          <input name="sets" value={formData.sets} onChange={handleChange} type="number" placeholder="Sets" required className="w-full border p-2 rounded" />
          <input name="weight" value={formData.weight} onChange={handleChange} type="number" placeholder="Weight (kg)" required className="w-full border p-2 rounded" />
          <input name="duration" value={formData.duration} onChange={handleChange} type="number" placeholder="Duration (minutes)" required className="w-full border p-2 rounded" />
          <select name="type" value={formData.type} onChange={handleChange} required className="w-full border p-2 rounded">
            <option value="">Workout Type</option>
            <option value="cardio">Cardio</option>
            <option value="strength">Strength</option>
            <option value="hiit">HIIT</option>
            <option value="yoga">Yoga</option>
            <option value="walking">Walking</option>
          </select>
          <input name="date" value={formData.date} onChange={handleChange} type="date" required className="w-full border p-2 rounded" />
          <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Notes (optional)" className="w-full border p-2 rounded" />

          <button type="submit" className="w-full bg-[#2E3569] text-white py-2 rounded hover:bg-[#1D2951]">
            Update Workout
          </button>
        </form>
      </div>
    </div>
  );
}
