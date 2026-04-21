import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
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
          <Projects />
          <Timeline />
          <Contact />
        </main>
      </div>
    </SmoothScroll>
  );
}

