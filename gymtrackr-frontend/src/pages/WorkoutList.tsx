// src/pages/WorkoutList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Workout {
  id: number;
  name: string;
  reps: number;
  sets: number;
  weight: number;
  date: string;
  notes?: string;
  duration: number;
  caloriesBurned: number;
  type: string;
}

export default function WorkoutList() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const navigate = useNavigate();

  const fetchWorkouts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/workouts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWorkouts(res.data);
    } catch (err: any) {
  console.error('Fetch error:', err); 
  alert('Failed to fetch workouts');
  if (err.response?.status === 401) navigate('/login');
}

  };

  const deleteWorkout = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/workouts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Workout deleted');
      fetchWorkouts(); // refresh the list
    } catch (err: any) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <div className="min-h-screen bg-white p-10 text-[#2E3569]">
      <h1 className="text-2xl font-bold mb-6 text-center">My Workouts</h1>

      <div className="text-right mb-4">
        <button
          onClick={() => navigate('/add-workout')}

          className="bg-[#2E3569] text-white px-4 py-2 rounded hover:bg-[#1D2951]"
        >
          Add Workout
        </button>
      </div>

      <div className="space-y-4">
        {workouts.map((w) => (
          <div
            key={w.id}
            className="border p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold">{w.name} ({w.type})</h2>
            <p>Date: {w.date}</p>
            <p>Sets: {w.sets} | Reps: {w.reps} | Weight: {w.weight}kg</p>
            <p>Duration: {w.duration} min | Calories Burned: {w.caloriesBurned}</p>
            {w.notes && <p className="italic">Note: {w.notes}</p>}

            <div className="mt-2 space-x-2">
              <button
                onClick={() => deleteWorkout(w.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>

              {/* Later we will implement Edit */}
              <button
              onClick={() => navigate(`/workouts/edit/${w.id}`)}
              className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
               >
              Edit
             </button>

            </div>
          </div>
        ))}
        {workouts.length === 0 && <p className="text-center">No workouts found.</p>}
      </div>
    </div>
  );
}



