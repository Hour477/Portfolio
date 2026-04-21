import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCE = [
  {
    year: '2023 - Present',
    role: 'Lead System Architect',
    company: 'Nexus Digital',
    desc: 'Leading the development of scalable B2B systems and enterprise management platforms.',
  },
  {
    year: '2021 - 2023',
    role: 'Senior Full Stack Developer',
    company: 'Skyline Solutions',
    desc: 'Architected and implemented high-volume e-commerce and food ordering applications.',
  },
  {
    year: '2019 - 2021',
    role: 'Software Engineer',
    company: 'Innovate Labs',
    desc: 'Developing internal tools for automation in the hospitality and service sectors.',
  },
  {
    year: '2017 - 2019',
    role: 'Junior UI/UX Designer',
    company: 'Creative Hub',
    desc: 'Designing user-centric interfaces with a focus on usability and accessibility.',
  },
];

export default function Timeline() {
  const lineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the central line height on scroll
      gsap.fromTo(lineRef.current, 
        { scaleY: 0 },
        { 
          scaleY: 1, 
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
          }
        }
      );

      // Animate cards
      const cards = gsap.utils.toArray('.experience-card');
      cards.forEach((card: any, idx) => {
        gsap.from(card, {
          x: idx % 2 === 0 ? -100 : 100,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="py-32 px-6 overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-accent font-mono text-sm uppercase tracking-widest block mb-4">
            Curriculum Vitae
          </span>
          <h2 className="text-5xl md:text-6xl font-display font-medium">PROFESSIONAL JOURNEY</h2>
        </div>

        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-full bg-primary/10" />
          <div 
            ref={lineRef}
            className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-full bg-accent origin-top scale-y-0" 
          />

          <div className="space-y-24 md:space-y-32">
            {EXPERIENCE.map((exp, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 ${
                  idx % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className={`experience-card w-full md:w-[45%] ${idx % 2 === 1 ? 'md:text-left' : 'md:text-right'}`}>
                  <span className="text-accent font-mono text-sm mb-2 block">{exp.year}</span>
                  <h3 className="text-2xl md:text-3xl font-display font-medium mb-1">{exp.role}</h3>
                  <h4 className="text-lg text-secondary mb-4">{exp.company}</h4>
                  <p className="text-secondary text-lg leading-relaxed">{exp.desc}</p>
                </div>
                
                <div className="relative z-10 w-4 h-4 rounded-full bg-bg border-4 border-accent" />
                
                <div className="hidden md:block w-[45%]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
