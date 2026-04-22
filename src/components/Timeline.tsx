import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { Briefcase } from 'lucide-react';

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

      // Animate cards and year markers
      const cards = gsap.utils.toArray('.experience-card');
      const years = gsap.utils.toArray('.architectural-year');

      cards.forEach((card: any, idx) => {
        gsap.fromTo(card, 
          { 
            opacity: 0, 
            y: 100,
            scale: 0.9,
            filter: "blur(10px)" 
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      years.forEach((year: any) => {
        gsap.to(year, {
          y: -100,
          ease: "none",
          scrollTrigger: {
            trigger: year,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-32">
          <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center mb-8 animate-bounce-slow">
            <Briefcase className="text-accent w-8 h-8" />
          </div>
          <span className="text-accent font-mono text-sm uppercase tracking-[0.4em] block mb-4">
            Professional Ledger
          </span>
          <h2 className="text-5xl md:text-8xl font-display font-bold tracking-tighter">EXPERIENCE</h2>
          <div className="h-1.5 w-24 bg-accent/20 rounded-full mt-6" />
        </div>

        <div className="relative pt-12">
          {/* Central Line - Background */}
          <div className="absolute left-8 md:left-1/2 top-0 -translate-x-1/2 w-1 h-full bg-white/5 rounded-full" />
          
          {/* Central Line - Active (GSAP) */}
          <div 
            ref={lineRef}
            className="absolute left-8 md:left-1/2 top-0 -translate-x-1/2 w-1 h-full bg-accent origin-top scale-y-0 rounded-full shadow-[0_0_30px_rgba(var(--accent-rgb),0.8)]" 
          >
            {/* Laser Tip Effect */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-accent rounded-full blur-[2px] shadow-[0_0_20px_var(--color-accent)]" />
          </div>

          <div className="space-y-32 md:space-y-48">
            {EXPERIENCE.map((exp, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col md:flex-row items-center justify-between relative min-h-[300px] ${
                  idx % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Architectural Year Marker */}
                <div 
                  className={`architectural-year absolute top-0 hidden lg:block opacity-[0.03] select-none pointer-events-none font-display font-black text-[12rem] leading-none ${
                    idx % 2 === 1 ? 'right-full translate-x-1/2' : 'left-full -translate-x-1/2'
                  }`}
                >
                  {exp.year.split(' ')[0]}
                </div>

                {/* Node - Interactive Point */}
                <div className="absolute left-8 md:left-1/2 top-10 md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: false, margin: "-20%" }}
                    className="relative flex items-center justify-center"
                  >
                    <div className="w-10 h-10 rounded-full bg-bg border border-white/10 flex items-center justify-center shadow-2xl">
                      <div className="w-4 h-4 rounded-full bg-accent shadow-[0_0_20px_var(--color-accent)]" />
                    </div>
                    {/* Outer Pulse */}
                    <div className="absolute -inset-2 rounded-full border border-accent/20 animate-ping" />
                  </motion.div>
                </div>

                {/* Experience Card */}
                <div 
                  className={`group experience-card w-[calc(100%-5rem)] ml-auto md:ml-0 md:w-[44%] glass p-8 md:p-12 rounded-[40px] relative overflow-hidden transition-all duration-700 border-white/5 hover:border-accent/30 ${
                    idx % 2 === 1 ? 'md:text-left' : 'md:text-right'
                  }`}
                >
                  <div className="relative z-10">
                    {/* Internal Glow */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/5 rounded-full blur-[80px] group-hover:bg-accent/15 transition-all duration-500" />
                    
                    <div className={`flex items-center gap-4 mb-8 ${idx % 2 === 1 ? 'justify-start' : 'md:justify-end'}`}>
                      <span className="text-accent font-mono text-sm font-bold tracking-[0.3em] bg-accent/10 px-4 py-1 rounded-full border border-accent/20">
                        {exp.year}
                      </span>
                    </div>
                    
                    <h3 className="text-3xl md:text-5xl font-display font-bold mb-4 text-white tracking-tight leading-none group-hover:text-accent transition-all duration-300">
                      {exp.role}
                    </h3>
                    
                    <h4 className="text-xl text-white/90 font-display font-semibold mb-8 flex items-center gap-3">
                      {idx % 2 === 0 && <span className="hidden md:block flex-1 h-px bg-white/10" />}
                      <span className="bg-linear-to-r from-white to-white/60 bg-clip-text text-transparent">
                        {exp.company}
                      </span>
                      {idx % 2 === 1 && <span className="hidden md:block flex-1 h-px bg-white/10" />}
                    </h4>
                    
                    <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-2xl ml-auto group-hover:text-white/90 transition-all duration-300">
                      {exp.desc}
                    </p>
                  </div>

                  {/* High-End Connector Line (Desktop) */}
                  <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-16 h-px bg-linear-to-r from-accent to-transparent -z-10 opacity-30 group-hover:opacity-100 transition-opacity ${
                    idx % 2 === 1 ? '-left-16 rotate-180' : '-right-16'
                  }`} />
                </div>
                
                <div className="hidden md:block w-[44%]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
