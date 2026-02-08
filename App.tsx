import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Experiences from './pages/Experiences';
import Projects from './pages/Projects';
import Publications from './pages/Publications';
import Contact from './pages/Contact';
import Skills from './pages/Skills';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;
