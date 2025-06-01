import { useEffect, useState } from 'react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleScroll = (e) => {
    e.preventDefault();
    const waitlistSection = document.getElementById('waitlist');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-br from-white via-indigo-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden max-w-[2000px] mx-auto">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center max-w-[1200px] mx-auto px-4">
          {/* Main Heading */}
          <h1 
            className={`text-4xl md:text-5xl lg:text-7xl font-bold mb-6 transition-all duration-700 max-w-[900px] mx-auto flex flex-col ${
              isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
            }`}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-600 mb-2 whitespace-nowrap">
              Quick, personalized news
            </span>
            <span className="whitespace-nowrap">
              that actually makes sense
            </span>
          </h1>

          {/* Subheading */}
          <p 
            className={`text-xl md:text-2xl text-gray-600 mb-12 transition-all duration-700 delay-300 max-w-[700px] mx-auto ${
              isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
            }`}
          >
            Swipe through today's headlines. Ask questions. Actually get it.
          </p>

          {/* CTA Section */}
          <div 
            className={`transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
            }`}
          >
            <button 
              onClick={handleScroll}
              className="group inline-flex items-center px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Get Early Access
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 