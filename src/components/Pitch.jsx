import { useEffect, useState, useRef } from 'react';

export default function Pitch() {
  const [activeSection, setActiveSection] = useState(0);
  const [animationState, setAnimationState] = useState('initial');
  const sectionRefs = useRef([]);
  const questionRef = useRef(null);
  const answerRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex(ref => ref === entry.target);
            setActiveSection(index);
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '50px 0px'  // Preload content before it comes into view
      }
    );

    sectionRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

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

  const sections = [
    {
      id: 'hero',
      content: (
        <section className="min-h-screen flex items-center justify-center w-full bg-gradient-to-br from-white via-indigo-50 to-white relative overflow-hidden">
          {/* Background Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl"></div>
          </div>

          <div className="container-custom relative z-10">
            <div className="text-center">
              {/* Main Heading */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-600">
                  QuickScope
                </span>
                <br />
                <span className="relative">
                  The news app Gen Z
                  <span className="relative">
                    <span className="relative z-10"> actually wants</span>
                    <svg className="absolute bottom-0 left-0 w-full h-3 text-primary/20" viewBox="0 0 200 9" fill="currentColor">
                      <path d="M0,9 C50,5 100,0 200,9" />
                    </svg>
                  </span>
                </span>
              </h1>

              {/* Subheading with enhanced typography */}
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                Quick, personalized news that 
                <span className="text-primary font-semibold"> actually makes sense</span>
                {" "}— powered by AI that explains what matters to you.
              </p>

              {/* CTA Section with enhanced design */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <a 
                  href="mailto:jihanraiyan@live.com"
                  className="group inline-flex items-center px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Talk to Us
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      )
    },
    {
      id: 'problem',
      content: (
        <section className="section bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">The Problem</h2>
              <p className="text-xl text-gray-600">
                Staying informed shouldn't feel like a chore — but for Gen Z, it often does.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="text-2xl flex-shrink-0">🧠</div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Complex & Confusing</h3>
                    <p className="text-gray-600 text-sm">
                      News is filled with jargon and assumptions. We skim headlines but walk away confused, not informed.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="text-2xl flex-shrink-0">📱</div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Information Overload</h3>
                    <p className="text-gray-600 text-sm">
                      60% feel overwhelmed by news. Gen Z often avoids it entirely to protect their mental health.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="text-2xl flex-shrink-0">🎯</div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Not Personalized</h3>
                    <p className="text-gray-600 text-sm">
                      News feels disconnected from our lives. Without clear relevance, we scroll past.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="text-2xl flex-shrink-0">❓</div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">No Way to Ask</h3>
                    <p className="text-gray-600 text-sm">
                      Most platforms are one-way. When confused, you're stuck googling or pretending to understand.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="text-2xl flex-shrink-0">🧩</div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">One Size Fits None</h3>
                    <p className="text-gray-600 text-sm">
                      Current platforms deliver one format, alienating users who want different levels of depth.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="text-2xl flex-shrink-0">💡</div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Time to Change</h3>
                    <p className="text-gray-600 text-sm">
                      The news experience needs a complete redesign for how Gen Z thinks and learns.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-8">
              <div className="max-w-2xl mx-auto text-center">
                <p className="text-xl font-medium text-gray-800 mb-3">
                  Gen Z isn't disconnected — we're just tired of products that talk at us instead of helping us understand.
                </p>
                <p className="text-2xl font-bold text-primary">
                  That's the problem QuickScope is solving.
                </p>
              </div>
            </div>
          </div>
        </section>
      )
    },
    {
      id: 'solution',
      content: (
        <section className="section bg-gray-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">The Solution</h2>
              <p className="text-xl text-gray-600">
                QuickScope reimagines news for Gen Z with an intuitive, AI-powered experience that makes understanding the world effortless.
              </p>
            </div>

            {/* App Mockup */}
            <div className="relative mb-24">
              {/* Desktop Mockup - Hidden on mobile */}
              <div className="relative hidden md:block">
                <div className="relative w-full max-w-5xl mx-auto transform scale-[0.85] origin-top">
                  <div className="bg-gray-800 rounded-2xl shadow-2xl p-4 overflow-hidden">
                    {/* Browser Top Bar */}
                    <div className="bg-gray-700 rounded-t-lg p-2 flex items-center space-x-2 mb-2">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                    
                    {/* App Interface */}
                    <div className="bg-gray-100 rounded-lg overflow-hidden">
                      {/* App Header */}
                      <div className="bg-primary text-white p-4 flex items-center justify-between">
                        <div className="text-xl font-bold">QuickScope</div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm">Today's Stories</span>
                          <span className="text-sm">My Feed</span>
                          <span className="text-sm bg-white text-primary px-3 py-1 rounded-full">Profile</span>
                        </div>
                      </div>
                      
                      {/* App Content */}
                      <div className="flex h-[500px] p-6 gap-6">
                        {/* News Card */}
                        <div className="w-2/3 bg-white rounded-xl shadow-lg p-6">
                          <h3 className="text-xl font-bold mb-3">Global Climate Summit</h3>
                          <div className="space-y-2 mb-4">
                            <p className="text-gray-600">Leaders from 195 countries agree on new emissions targets</p>
                            <ul className="list-disc list-inside text-gray-600 text-sm pl-1 space-y-1">
                              <li>Major economies commit to 50% reduction by 2030</li>
                              <li>$100B annual fund established for clean energy</li>
                              <li>New carbon trading market to launch in 2024</li>
                            </ul>
                          </div>
                          <div className="bg-indigo-50 p-4 rounded-lg mb-6">
                            <p className="text-sm text-primary font-medium mb-2">Why it matters to you:</p>
                            <p className="text-gray-700">This could impact your investment portfolio if you own stocks in energy companies.</p>
                          </div>
                          <div className="flex justify-between items-center">
                            <button className="px-4 py-2 bg-primary text-white rounded-lg">Learn More</button>
                            <div className="flex space-x-3">
                              <button className="p-2 rounded-full bg-gray-100">
                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                              <button className="p-2 rounded-full bg-green-500">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* AI Chat */}
                        <div className="w-1/3 bg-white rounded-xl shadow-lg p-6 flex flex-col">
                          <h4 className="font-semibold mb-4">Ask anything about this story</h4>
                          <div className="flex-1 space-y-4">
                            <div className="bg-gray-100 rounded-lg p-3">
                              <p className="text-sm text-gray-700">How does this affect renewable energy investments?</p>
                            </div>
                            <div className="bg-indigo-50 rounded-lg p-3">
                              <p className="text-sm text-gray-700">The new climate agreement is likely to accelerate investments in renewable energy. Analysts expect significant growth in solar and wind sectors.</p>
                            </div>
                          </div>
                          <div className="mt-4">
                            <div className="relative">
                              <input 
                                type="text" 
                                placeholder="Ask a question..." 
                                className="w-full bg-gray-100 rounded-full py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all duration-300" 
                              />
                              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors duration-300">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-4 4l4-4m-4-4l4 4" />
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

              {/* Mobile Mockup - Shown only on mobile */}
              <div className="md:hidden">
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
                          <div className="space-y-2 mb-3">
                            <p className="text-gray-600 text-sm">Leaders from 195 countries agree on new emissions targets</p>
                            <ul className="list-disc list-inside text-gray-600 text-sm pl-1 space-y-1">
                              <li>Major economies commit to 50% reduction by 2030</li>
                              <li>$100B annual fund established for clean energy</li>
                              <li>New carbon trading market to launch in 2024</li>
                            </ul>
                          </div>
                          <div className="bg-indigo-50 p-3 rounded-lg mb-4">
                            <p className="text-xs text-primary font-medium mb-1">Why it matters to you:</p>
                            <p className="text-gray-700 text-sm">This could impact your investment portfolio if you own stocks in energy companies.</p>
                          </div>
                        </div>

                        {/* Flashcard Interface */}
                        <div className="relative mt-8">
                          {/* Question Card */}
                          <div 
                            ref={questionRef}
                            className={`transition-all duration-500 transform ${
                              animationState === 'initial' ? 'translate-y-[20px] opacity-0' :
                              'translate-y-0 opacity-100'
                            } bg-white rounded-xl shadow-lg p-4`}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                <p className="text-xs text-gray-500 font-medium">Your Thoughts</p>
                              </div>
                              <div className="text-xs text-gray-400">Just now</div>
                            </div>
                            <p className="text-sm text-gray-700 font-medium">How will this affect renewable energy stocks?</p>
                          </div>

                          {/* Answer Card */}
                          <div 
                            ref={answerRef}
                            className={`absolute w-full transition-all duration-500 transform ${
                              animationState === 'showAnswer' ? 'translate-y-2 opacity-100' :
                              'translate-y-[120%] opacity-0'
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
                      </div>

                      {/* Chat Input - Fixed at bottom */}
                      <div className="flex-shrink-0 p-4 bg-gray-100 border-t border-gray-200">
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
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">Smart Summaries</h3>
                    <p className="text-gray-600">
                      Complex news simplified into bite-sized cards. Get the key points and why they matter to you in seconds.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">HardScope</h3>
                    <p className="text-gray-600">
                      Ask questions, get instant explanations, and understand complex topics through natural conversation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">Personalized Relevance</h3>
                    <p className="text-gray-600">
                      Every story explains why it matters to you, based on your interests, location, and preferences.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">Adaptive Learning</h3>
                    <p className="text-gray-600">
                      Content adapts to your understanding level. Start simple and go deeper when you're ready.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    },
    {
      id: 'why-now',
      content: (
        <section className="section bg-white">
          <div className="container-custom">
            <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Why Now</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-xl font-bold mb-4">Attention Crisis</h3>
                <p className="text-gray-600 mb-4">Traditional news formats are becoming increasingly ineffective for younger audiences.</p>
                <div className="bg-indigo-50 rounded-lg p-4">
                  <p className="text-primary font-semibold">Significant rise in short-form content consumption</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-xl font-bold mb-4">Trust Crisis</h3>
                <p className="text-gray-600 mb-4">Trust in traditional media is at historic lows, especially among Gen Z.</p>
                <div className="bg-indigo-50 rounded-lg p-4">
                  <p className="text-primary font-semibold">Majority of Gen Z seek alternative news sources</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-xl font-bold mb-4">AI Revolution</h3>
                <p className="text-gray-600 mb-4">AI technology has reached the capability to provide personalized news understanding at scale.</p>
                <div className="bg-indigo-50 rounded-lg p-4">
                  <p className="text-primary font-semibold">Growing demand for AI-powered personalization</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-xl font-bold mb-4">Digital Learning Shift</h3>
                <p className="text-gray-600 mb-4">Gen Z demands educational content that's interactive, personalized, and mobile-first.</p>
                <div className="bg-indigo-50 rounded-lg p-4">
                  <p className="text-primary font-semibold">Strong preference for interactive learning experiences</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    },
    {
      id: 'market',
      content: (
        <section className="section bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Market Opportunity</h2>
            <div className="space-y-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <div className="text-5xl md:text-6xl font-black text-primary mb-4">2B+</div>
                  <p className="text-xl text-gray-600">Gen Z globally</p>
                </div>
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <div className="text-5xl md:text-6xl font-black text-primary mb-4">$350B+</div>
                  <p className="text-xl text-gray-600">EdTech market by 2025</p>
                </div>
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <div className="text-5xl md:text-6xl font-black text-primary mb-4">$400B+</div>
                  <p className="text-xl text-gray-600">Digital media market</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-8 text-center">Targeting the Sweet Spot</h3>
                <div className="flex flex-wrap justify-center gap-6">
                  <div className="px-8 py-4 bg-indigo-100 text-primary rounded-full font-semibold">EdTech ($350B+)</div>
                  <div className="px-8 py-4 bg-indigo-100 text-primary rounded-full font-semibold">Digital Media ($400B+)</div>
                  <div className="px-8 py-4 bg-indigo-100 text-primary rounded-full font-semibold">Digital Wellness ($350B+)</div>
                </div>
                <p className="text-xl text-gray-600 text-center mt-8">
                  QuickScope sits at the intersection of three massive, growing markets
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-center">Competitive Advantage</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h4 className="font-bold mb-2">First Mover</h4>
                    <p className="text-gray-600">First AI-powered news app built specifically for Gen Z</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h4 className="font-bold mb-2">Proprietary AI</h4>
                    <p className="text-gray-600">Advanced personalization and explanation algorithms</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h4 className="font-bold mb-2">Network Effects</h4>
                    <p className="text-gray-600">Platform becomes smarter with each user interaction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    },
    {
      id: 'vision',
      content: (
        <section className="section bg-white">
          <div className="container-custom">
            <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Our Vision</h2>
            <div className="space-y-16">
              <div className="text-center max-w-4xl mx-auto">
                <p className="text-2xl md:text-4xl font-bold text-primary mb-8">
                  "We're not just summarizing news — we're building the interface of curiosity."
                </p>
                <div className="space-y-8 text-xl text-gray-600">
                  <p>QuickScope starts with news but expands into a comprehensive knowledge platform that makes understanding the world intuitive and engaging for Gen Z.</p>
                  <p>Our goal is to become the trust layer for Gen Z's digital learning journey, powered by AI that truly understands how young people think and learn.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                  <h4 className="text-xl font-bold mb-4">Phase 1: News</h4>
                  <p className="text-gray-600">Launch core news understanding platform with AI-powered flashcards and explanations</p>
                </div>
                <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                  <h4 className="text-xl font-bold mb-4">Phase 2: Knowledge</h4>
                  <p className="text-gray-600">Expand into broader topics: finance, tech, culture, and more</p>
                </div>
                <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                  <h4 className="text-xl font-bold mb-4">Phase 3: Network</h4>
                  <p className="text-gray-600">Build social features for collaborative learning and discussion</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    },
    {
      id: 'ask',
      content: (
        <section className="section bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">The Ask</h2>
            <div className="bg-white rounded-xl p-8 shadow-lg mb-12">
              <h3 className="text-2xl font-bold mb-12 text-center">Raising a pre-seed round to:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-primary font-bold mx-auto">1</div>
                  <h4 className="text-xl font-bold text-center">Build MVP</h4>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Core flashcard system</li>
                    <li>• AI explanation engine</li>
                    <li>• Mobile app v1</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-primary font-bold mx-auto">2</div>
                  <h4 className="text-xl font-bold text-center">Test & Iterate</h4>
                  <ul className="text-gray-600 space-y-2">
                    <li>• User testing</li>
                    <li>• Retention optimization</li>
                    <li>• Content partnerships</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-primary font-bold mx-auto">3</div>
                  <h4 className="text-xl font-bold text-center">Launch & Scale</h4>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Marketing campaign</li>
                    <li>• Campus ambassador program</li>
                    <li>• Growth optimization</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="text-center space-y-6">
              <a 
                href="mailto:jihanraiyan@live.com"
                className="inline-block px-12 py-6 bg-primary text-white text-xl font-semibold rounded-lg hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Let's Talk
              </a>
            </div>
          </div>
        </section>
      )
    }
  ];

  return (
    <div className="bg-white">
      {sections.map((section, index) => (
        <div
          key={section.id}
          ref={el => sectionRefs.current[index] = el}
          className={`transition-opacity duration-300 ${
            Math.abs(activeSection - index) <= 1 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {section.content}
        </div>
      ))}
    </div>
  );
}

const styles = {
  '@keyframes typing': {
    '0%': { width: '0%' },
    '100%': { width: '100%' }
  },
  '@keyframes blink': {
    '50%': { borderColor: 'transparent' }
  },
  '@keyframes slideUp': {
    '0%': { 
      opacity: 0,
      transform: 'translateY(20px)'
    },
    '100%': { 
      opacity: 1,
      transform: 'translateY(0)'
    }
  },
  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 }
  },
  '.animate-fade-in': {
    animation: 'fadeIn 0.8s ease-out forwards'
  },
  '.typing-container': {
    opacity: 0,
    animation: 'fadeIn 0.1s forwards'
  },
  '.typing-container-2': {
    opacity: 0,
    animation: 'fadeIn 0.1s 3s forwards'
  },
  '.typing-text, .typing-text-2': {
    display: 'inline-block',
    overflow: 'hidden',
    borderRight: '2px solid #4F46E5',
    whiteSpace: 'nowrap',
    margin: 0,
    width: 0,
    animation: 'typing 1s steps(40, end) forwards, blink 0.75s step-end infinite'
  },
  '.typing-text': {
    animationDelay: '0.2s'
  },
  '.typing-text-2': {
    animationDelay: '3.2s'
  },
  '.slide-up-animation': {
    opacity: 0,
    animation: 'slideUp 0.5s ease-out 1.5s forwards'
  },
  '.slide-up-animation-2': {
    opacity: 0,
    animation: 'slideUp 0.5s ease-out 4.5s forwards'
  },
  '.slide-up': {
    animation: 'slideUp 0.6s ease-out 0.5s forwards'
  },
  '.slide-up-delayed': {
    animation: 'slideUp 0.6s ease-out 2s forwards'
  },
  '@keyframes slideUp': {
    '0%': {
      opacity: 0,
      transform: 'translateY(100%)'
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)'
    }
  }
};

export { styles }; 