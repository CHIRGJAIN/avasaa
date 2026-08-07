import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Stay from './pages/Stay';
import About from './pages/About';
import RoomDetail from './pages/RoomDetail';
import Blog from './pages/Blog';
import Journal from './pages/Journal';
import Contact from './pages/Contact';
import Book from './pages/Book';
import ExperienceDetail from './pages/ExperienceDetail';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="pt-32 p-6 max-w-xl mx-auto text-red-700 bg-red-50 border border-red-200 rounded-2xl">
          <h2 className="font-bold text-lg">Error rendering page:</h2>
          <pre className="text-xs mt-2 overflow-x-auto whitespace-pre-wrap">{this.state.error?.stack || this.state.error?.toString()}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
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
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stay" element={<Stay />} />
            <Route path="/about" element={<About />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/journal/:id" element={<ExperienceDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book" element={<ErrorBoundary><Book /></ErrorBoundary>} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/room/:roomId" element={<RoomDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
