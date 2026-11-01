import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages Import
import Home from './pages/Home';
import FindDonors from './pages/FindDonors';
import BloodRequests from './pages/BloodRequests';
import CreateDonorPost from './pages/CreateDonorPost';
import CreateBloodRequest from './pages/CreateBloodRequest';
import Login from './pages/Login';
import Register from './pages/Register';
import MyAccount from './pages/MyAccount';
import MyPosts from './pages/MyPosts';
import About from './pages/About';
import Policies from './pages/Policies';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';
import Report from './pages/Report';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/donors" element={<FindDonors />} />
            <Route path="/requests" element={<BloodRequests />} />
            <Route path="/create-donor" element={<CreateDonorPost />} />
            <Route path="/create-request" element={<CreateBloodRequest />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<MyAccount />} />
            <Route path="/my-posts" element={<MyPosts />} />
            <Route path="/about" element={<About />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/report" element={<Report />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}