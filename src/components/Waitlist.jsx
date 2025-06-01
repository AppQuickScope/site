import { useState, useRef, useEffect } from 'react';

export default function Waitlist() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const waitlistRef = useRef(null);
  
  // Google Apps Script Web App URL
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz9AK8gGx7816x9F_5HeP8DAInxaIXRFSlbvrQ2zu5OHz01hI2Pl2ftJIsbRDYx_lT4/exec';
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Using fetch with CORS mode to submit the form
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // This is important for Google Apps Script
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          source: 'QuickScope Landing Page'
        }),
      });
      
      // Since 'no-cors' doesn't return readable response, we assume success
      setIsSubmitted(true);
      setEmail('');
      
      // Reset state after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('There was an error submitting your email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (waitlistRef.current) {
      observer.observe(waitlistRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <section 
      id="waitlist" 
      className="py-20 md:py-32 bg-gradient-to-br from-indigo-900 to-primary text-white w-full"
      ref={waitlistRef}
    >
      <div className="container-custom">
        <div 
          className={`w-full text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Time to level up your news game 🚀
          </h2>
          <p className="text-xl opacity-90 mb-10">
            No cap - we're changing the news game forever. Grab your spot before the waitlist fills up (fr fr).
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Drop your email here"
                className="flex-grow px-4 py-3 rounded-lg bg-white/10 border border-white/20 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
                disabled={isLoading}
              />
              <button
                type="submit"
                className={`px-6 py-3 bg-white text-primary font-medium rounded-lg hover:bg-opacity-95 transition-all ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Get Early Access'}
              </button>
            </div>
            
            {isSubmitted && (
              <div className="mt-4 p-3 bg-green-500 bg-opacity-20 rounded-lg text-white">
                Let's gooo! 🔥 You're officially in the squad. We'll slide into your inbox with the VIP access soon!
              </div>
            )}
            
            {error && (
              <div className="mt-4 p-3 bg-red-500 bg-opacity-20 rounded-lg text-white">
                {error}
              </div>
            )}
            
            <p className="mt-4 text-sm opacity-70">
              Dw, we keep it 💯 - your email stays private and safe with us.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
} 