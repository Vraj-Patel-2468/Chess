import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './index.css';
import Landing from './pages/Landing';
import Chess from './pages/Chess';

export default function App() {
    return (
        <>
          <nav className="flex justify-center space-x-4 p-4">
            <Link to="/" className="text-blue-500">Home</Link>
            <Link to="/chess" className="text-blue-500">Chess</Link>
          </nav>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/chess" element={<Chess />} />
          </Routes>
        </>
    );
}
