
import './App.css';
import Navbar from './Components/Navbar';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Pages/Dashboard';
import Login from './Components/Pages/Login';
import Register from './Components/Pages/Register';
import Add from './Components/Pages/Add';
import Home from './Components/Pages/Home';

function App() {
  return (
    <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/add' element={<Add />} />
          <Route path='/Register' element={<Register />} />
        </Routes>
         
        
    </Router>
    //<div className="profile-picture-button"></div>
  );
}
export default App;
