import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import AppMockup from './components/AppMockup';
import Features from './components/Features';
import Mission from './components/Mission';
import Waitlist from './components/Waitlist';
import Footer from './components/Footer';
import Pitch from './components/Pitch';

function HomePage() {
  return (
    <>
      <main className="w-full">
        <Hero />
        <AppMockup />
        <Features />
        <Mission />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="w-full">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pitch" element={<Pitch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
