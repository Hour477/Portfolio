import {SpeedInsights} from '@vercel/speed-insights/react';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skill from './components/Skill';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Contact from './components/Contact';

export default function App() {
  return (
    <SmoothScroll>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skill />
          <Projects />
          <Timeline />
          <Contact />
        </main>
        <SpeedInsights />
      </div>
    </SmoothScroll>
  );
}

