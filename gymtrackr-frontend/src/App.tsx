import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup'; // if you have this page
import WorkoutForm from './pages/Workouts'; // if you have a form page
import WorkoutList from './pages/WorkoutList';
import WorkoutEdit from './pages/Workoutedit';

<Route path="/workouts/edit/:id" element={<WorkoutEdit />} />

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-workout" element={<WorkoutForm />} />
        <Route path="/workouts" element={<WorkoutList />} />
        <Route path="/workouts/edit/:id" element={<WorkoutEdit />} />
      </Routes>
    </Router>
  );
}

export default App;

