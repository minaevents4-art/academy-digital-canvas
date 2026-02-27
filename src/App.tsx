import React, { useState } from 'react';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Courses from './components/Courses';
import InteractiveShowcase from './components/InteractiveShowcase';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-sky-200">
      <Toaster position="top-center" expand={false} richColors />
      <Navbar />
      <main>
        <Hero />
        <Courses />
        <InteractiveShowcase />
      </main>
      <Footer />
    </div>
  );
}

export default App;