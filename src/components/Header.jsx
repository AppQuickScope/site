import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white py-4 shadow-sm fixed w-full top-0 z-50">
      <div className="container-custom flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-primary">
            QuickScope
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-600 hover:text-primary transition-colors">
            Features
          </a>
          <a href="#mission" className="text-gray-600 hover:text-primary transition-colors">
            Mission
          </a>
          <Link to="/pitch" className="text-gray-600 hover:text-primary transition-colors">
            Pitch Deck
          </Link>
          <a href="#waitlist" className="btn btn-primary">
            Get Early Access
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md py-4 px-6 space-y-4">
          <a 
            href="#features" 
            className="block text-gray-600 hover:text-primary" 
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </a>
          <a 
            href="#mission" 
            className="block text-gray-600 hover:text-primary" 
            onClick={() => setIsMenuOpen(false)}
          >
            Mission
          </a>
          <Link 
            to="/pitch" 
            className="block text-gray-600 hover:text-primary" 
            onClick={() => setIsMenuOpen(false)}
          >
            Pitch Deck
          </Link>
          <a 
            href="#waitlist" 
            className="block btn btn-primary text-center" 
            onClick={() => setIsMenuOpen(false)}
          >
            Get Early Access
          </a>
        </div>
      )}
    </header>
  );
} 