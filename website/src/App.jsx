import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Features from './pages/Features';
import Documentation from './pages/Documentation';
import Examples from './pages/Examples';
import Download from './pages/Download';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/examples" element={<Examples />} />
          <Route path="/download" element={<Download />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
