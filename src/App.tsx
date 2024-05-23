import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hotels from './Components/Hotels';
import Bookings from './Components/Bookings';
import Header from './Components/layout/navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <Header />
                <div className="container mt-4">
                    <Routes>
                        <Route path="/" element={<Hotels />} />
                        <Route path="/bookings" element={<Bookings />} />
                    </Routes>
                </div>
                <ToastContainer /> 
            </div>
        </Router>
    );
};

export default App;
