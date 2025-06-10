import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';

import Home from './pages/Home';
import Jobs from './pages/Jobs.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/DashboardPage.jsx';
import DevChecklist from './pages/DevChecklistPage.jsx';
import Login from './pages/Login.jsx';
import Footer from './components/Footer.jsx';



export default function App() {
  return (

      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dev" element={<DevChecklist />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
 
  );
}
