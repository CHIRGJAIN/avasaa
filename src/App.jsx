import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Stay from './pages/Stay';
import About from './pages/About';
import RoomDetail from './pages/RoomDetail';
import Blog from './pages/Blog';
import BookingModal from './components/BookingModal';

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [initialCheckIn, setInitialCheckIn] = useState('');
  const [initialCheckOut, setInitialCheckOut] = useState('');
  const [initialGuestsCount, setInitialGuestsCount] = useState(1);

  const openBooking = (roomId = '', checkIn = '', checkOut = '', guests = 1) => {
    setSelectedRoomId(roomId);
    setInitialCheckIn(checkIn);
    setInitialCheckOut(checkOut);
    setInitialGuestsCount(guests);
    setIsBookingOpen(true);
  };

  // Scroll reveal setup
  useEffect(() => {
    const handleReveal = () => {
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach((el) => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
          el.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleReveal);
    // Initial call
    setTimeout(handleReveal, 100);

    return () => window.removeEventListener('scroll', handleReveal);
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar onBookClick={() => openBooking()} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home onBookRoom={openBooking} />} />
            <Route path="/stay" element={<Stay onBookRoom={openBooking} />} />
            <Route path="/about" element={<About onBookRoom={openBooking} />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/room/:roomId" element={<RoomDetail onBookRoom={openBooking} />} />
          </Routes>
        </main>
        <Footer />
        <BookingModal 
          isOpen={isBookingOpen} 
          onClose={() => setIsBookingOpen(false)} 
          initialRoomId={selectedRoomId}
          initialCheckIn={initialCheckIn}
          initialCheckOut={initialCheckOut}
          initialGuestsCount={initialGuestsCount}
        />
      </div>
    </Router>
  );
}

export default App;
