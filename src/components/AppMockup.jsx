import { useState, useEffect, useRef } from 'react';

export default function AppMockup() {
  const [activeCard, setActiveCard] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [animationState, setAnimationState] = useState('initial');
  const questionRef = useRef(null);
  const answerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  
  const mockContent = [
    {
      title: "Global Climate Summit",
      summary: "Leaders from 195 countries agree on new emissions targets",
      question: "How does this affect renewable energy investments?",
      answer: "The new climate agreement is likely to accelerate investments in renewable energy, particularly solar and wind. Analysts predict up to 30% growth in the sector by 2025.",
      whyItMatters: "This could impact your investment portfolio if you own stocks in energy companies."
    },
    {
      title: "Tech Giant Launches AI Assistant",
      summary: "New AI tool aims to simplify complex tasks for everyday users",
      question: "Is this different from existing assistants?",
      answer: "Yes, it's built on a more advanced neural network and can understand context better than previous models, making it more useful for complex tasks.",
      whyItMatters: "This could change how you interact with technology in your daily life."
    },
    {
      title: "Housing Market Update",
      summary: "Mortgage rates drop to 3.5%, lowest in six months",
      question: "Is now a good time to buy?",
      answer: "While rates are favorable, housing prices remain high in most markets. Experts suggest waiting for price corrections in overheated markets.",
      whyItMatters: "This could save you thousands if you're planning to buy a home soon."
    },
  ];

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setActiveCard(prevCard => (prevCard + 1) % mockContent.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [mockContent.length]);

  useEffect(() => {
    let timeoutId;

    const runAnimation = () => {
      // Reset to initial state
      setAnimationState('initial');
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          top: 0,
          behavior: 'instant'
        });
      }

      // Start animation sequence
      timeoutId = setTimeout(() => {
        setAnimationState('showQuestion');
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTo({
            top: 300,
            behavior: 'smooth'
          });
        }
      }, 3000);

      timeoutId = setTimeout(() => {
        setAnimationState('showAnswer');
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTo({
            top: 400,
            behavior: 'smooth'
          });
        }
      }, 4500);

      // Hold the final state for a moment
      timeoutId = setTimeout(() => {
        // Restart the animation
        runAnimation();
      }, 8000);
    };

    // Start the initial animation
    runAnimation();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden w-full">
      <div 
        className={`container-custom transition-transform duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">See how it works</h2>
          <p className="text-xl text-gray-600">
            Experience news in a whole new way with our intuitive interface
          </p>
        </div>
        
        {/* Desktop version - hidden on mobile */}
        <div className="relative hidden md:flex justify-center">
          {/* Desktop Mockup */}
          <div className="relative w-full max-w-4xl mx-auto">
            {/* Desktop Frame */}
            <div className="bg-gray-800 rounded-lg shadow-2xl p-3 overflow-hidden">
              {/* Browser Top Bar */}
              <div className="bg-gray-700 rounded-t-lg p-2 flex items-center space-x-2 mb-1">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 text-center">
                  <div className="bg-gray-600 mx-auto w-1/2 h-6 rounded-md"></div>
                </div>
              </div>
              
              {/* Browser Content */}
              <div className="bg-gray-100 rounded-b-lg overflow-hidden">
                {/* App Header */}
                <div className="bg-primary text-white p-4 flex items-center justify-between">
                  <div className="text-xl font-bold">QuickScope</div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm">Today's Top Stories</span>
                    <span className="text-sm">My Feed</span>
                    <span className="text-sm bg-white text-primary px-3 py-1 rounded-full">Account</span>
                  </div>
                </div>
                
                {/* App Content - Two Column Layout */}
                <div className="flex h-[450px]">
                  {/* News Cards Column */}
                  <div className="w-2/3 p-5 relative overflow-hidden">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">Today's Headlines</h3>
                    
                    {/* News Card 1 */}
                    <div
                      className="bg-white rounded-xl shadow-lg p-5 mb-4 transition-all duration-300 transform"
                      style={{
                        transform: `translateX(${(activeCard - 0) * 100}%)`,
                        opacity: activeCard === 0 ? 1 : 0,
                        position: activeCard === 0 ? 'relative' : 'absolute',
                        width: 'calc(100% - 2.5rem)',
                      }}
                    >
                      <h3 className="text-lg font-bold mb-3">{mockContent[0].title}</h3>
                      <p className="text-gray-600 mb-3 text-base">{mockContent[0].summary}</p>
                      <div className="bg-indigo-50 p-3 rounded-lg">
                        <p className="text-sm text-primary font-medium mb-1">Why it matters to you:</p>
                        <p className="text-gray-700 text-sm">{mockContent[0].whyItMatters}</p>
                      </div>
                      
                      <div className="flex justify-between mt-4">
                        <button className="px-3 py-1 bg-gray-200 rounded-lg text-gray-700 text-sm">Details</button>
                        <div className="flex space-x-2">
                          <button className="p-1 rounded-full bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                          <button className="p-1 rounded-full bg-green-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* News Card 2 */}
                    <div
                      className="bg-white rounded-xl shadow-lg p-5 mb-4 transition-all duration-300 transform"
                      style={{
                        transform: `translateX(${(activeCard - 1) * 100}%)`,
                        opacity: activeCard === 1 ? 1 : 0,
                        position: activeCard === 1 ? 'relative' : 'absolute',
                        width: 'calc(100% - 2.5rem)',
                      }}
                    >
                      <h3 className="text-lg font-bold mb-3">{mockContent[1].title}</h3>
                      <p className="text-gray-600 mb-3 text-base">{mockContent[1].summary}</p>
                      <div className="bg-indigo-50 p-3 rounded-lg">
                        <p className="text-sm text-primary font-medium mb-1">Why it matters to you:</p>
                        <p className="text-gray-700 text-sm">{mockContent[1].whyItMatters}</p>
                      </div>
                      
                      <div className="flex justify-between mt-4">
                        <button className="px-3 py-1 bg-gray-200 rounded-lg text-gray-700 text-sm">Details</button>
                        <div className="flex space-x-2">
                          <button className="p-1 rounded-full bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                          <button className="p-1 rounded-full bg-green-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* News Card 3 */}
                    <div
                      className="bg-white rounded-xl shadow-lg p-5 mb-4 transition-all duration-300 transform"
                      style={{
                        transform: `translateX(${(activeCard - 2) * 100}%)`,
                        opacity: activeCard === 2 ? 1 : 0,
                        position: activeCard === 2 ? 'relative' : 'absolute',
                        width: 'calc(100% - 2.5rem)',
                      }}
                    >
                      <h3 className="text-lg font-bold mb-3">{mockContent[2].title}</h3>
                      <p className="text-gray-600 mb-3 text-base">{mockContent[2].summary}</p>
                      <div className="bg-indigo-50 p-3 rounded-lg">
                        <p className="text-sm text-primary font-medium mb-1">Why it matters to you:</p>
                        <p className="text-gray-700 text-sm">{mockContent[2].whyItMatters}</p>
                      </div>
                      
                      <div className="flex justify-between mt-4">
                        <button className="px-3 py-1 bg-gray-200 rounded-lg text-gray-700 text-sm">Details</button>
                        <div className="flex space-x-2">
                          <button className="p-1 rounded-full bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                          <button className="p-1 rounded-full bg-green-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Card Pagination Indicator */}
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {mockContent.map((_, index) => (
                        <div 
                          key={index} 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            activeCard === index ? 'w-8 bg-primary' : 'w-2 bg-gray-300'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* AI Question Panel */}
                  <div className="w-1/3 bg-gray-50 p-4 border-l border-gray-200">
                    <h3 className="text-base font-semibold mb-3 text-gray-700">Your Thoughts</h3>
                    
                    <div className="bg-white rounded-xl shadow-md p-3 mb-3">
                      <div className="flex items-start mb-2">
                        <div className="bg-indigo-100 rounded-full p-1.5 mr-2 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700 text-sm">{mockContent[activeCard].question}</p>
                        </div>
                      </div>
                      <div className="pl-8 border-l-2 border-indigo-200 ml-3">
                        <p className="text-gray-600 text-xs">{mockContent[activeCard].answer}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="Ask a question..."
                          className="w-full p-2.5 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                        />
                        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white rounded-full w-7 h-7 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Feature Label Annotations - Desktop */}
            <div className="absolute -right-3 top-1/4 transform translate-x-full">
              <div className="bg-primary text-white px-2 py-1 rounded-md shadow-md relative text-xs">
                <div className="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 border-t border-primary w-4"></div>
                <p className="font-medium">Ask what it means for you</p>
              </div>
            </div>
            
            <div className="absolute -left-3 top-1/3 transform -translate-x-full">
              <div className="bg-secondary text-white px-2 py-1 rounded-md shadow-md relative text-xs">
                <div className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2 border-t border-secondary w-4"></div>
                <p className="font-medium">Swipe through news like flashcards</p>
              </div>
            </div>
            
            <div className="absolute -left-3 top-2/4 transform -translate-x-full">
              <div className="bg-indigo-700 text-white px-2 py-1 rounded-md shadow-md relative text-xs">
                <div className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2 border-t border-indigo-700 w-4"></div>
                <p className="font-medium">Personal relevance explained</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile version - visible only on mobile */}
        <div className="md:hidden flex flex-col items-center">
          {/* Mobile Phone Mockup */}
          <div className="relative w-full max-w-[320px] mx-auto">
            {/* Phone Frame */}
            <div className="bg-black rounded-[45px] p-3 shadow-2xl relative">
              {/* App Content */}
              <div className="bg-gray-100 rounded-[40px] overflow-hidden h-[640px] flex flex-col">
                {/* App Header */}
                <div className="bg-primary text-white p-4 flex-shrink-0 rounded-t-[40px]">
                  <div className="text-lg font-bold mb-2">QuickScope</div>
                  <div className="flex items-center space-x-3 text-xs">
                    <span className="bg-white/20 px-3 py-1 rounded-full">Today's Stories</span>
                    <span>My Feed</span>
                  </div>
                </div>

                {/* Scrollable Content Area */}
                <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 scroll-smooth">
                  {/* News Card */}
                  <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
                    <h3 className="text-lg font-bold mb-2">Global Climate Summit</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Leaders from 195 countries agree on new emissions targets
                    </p>
                    <div className="bg-indigo-50 p-3 rounded-lg mb-4">
                      <p className="text-xs text-primary font-medium mb-1">Why it matters to you:</p>
                      <p className="text-gray-700 text-sm">This could impact your investment portfolio if you own stocks in energy companies.</p>
                    </div>
                  </div>

                  {/* Question Card */}
                  <div 
                    ref={questionRef}
                    className={`transition-all duration-500 transform ${
                      animationState === 'initial' ? 'translate-y-[20px] opacity-0' :
                      'translate-y-0 opacity-100'
                    } bg-white rounded-xl shadow-lg p-4 mb-4`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <p className="text-xs text-gray-500 font-medium">Your Thoughts</p>
                      </div>
                      <div className="text-xs text-gray-400">Just now</div>
                    </div>
                    <p className="text-gray-800 text-sm">How will this affect renewable energy stocks?</p>
                  </div>

                  {/* Answer Card */}
                  <div 
                    ref={answerRef}
                    className={`transition-all duration-500 transform ${
                      animationState === 'showAnswer' ? 'translate-y-0 opacity-100' :
                      'translate-y-[20px] opacity-0'
                    }`}
                  >
                    <div className="bg-indigo-50 rounded-xl shadow-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <p className="text-xs text-gray-500 font-medium">HardScope</p>
                        </div>
                        <div className="text-xs text-gray-400">Just now</div>
                      </div>
                      <p className="text-sm text-gray-700">Based on the new climate agreement, renewable energy stocks are expected to see significant growth. The targets will drive increased investment in solar and wind companies, and many analysts predict a 20-30% market expansion over the next few years.</p>
                    </div>
                  </div>
                </div>

                {/* Chat Input - Fixed at bottom */}
                <div className="p-4 bg-gray-100 border-t border-gray-200">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Ask anything about this story..." 
                      className="w-full bg-white rounded-full py-3 pl-4 pr-12 text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/20" 
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-4 4l4-4m-4-4l4 4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Feature Labels for Mobile - Stacked below the mockup */}
          <div className="flex flex-col space-y-3 mt-8 max-w-xs text-center">
            <div className="bg-secondary text-white px-4 py-2 rounded-lg shadow-md">
              <p className="font-medium">Swipe through news like flashcards</p>
            </div>
            
            <div className="bg-primary text-white px-4 py-2 rounded-lg shadow-md">
              <p className="font-medium">Ask what it means for you</p>
            </div>
            
            <div className="bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md">
              <p className="font-medium">Personal relevance explained</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 