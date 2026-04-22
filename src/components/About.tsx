import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';
import { Calendar, Briefcase, Sparkles, Code2, Globe } from 'lucide-react';
import myPic from '../assets/mypic.jpg';


export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -100]), { stiffness: 100, damping: 30 });
  const scaleProgress = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.8, 1, 1, 0.8]);
  const opacityProgress = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="about" ref={containerRef} className="py-32 px-6 relative overflow-hidden">
      <motion.div 
        style={{ opacity: opacityProgress, scale: scaleProgress }}
        className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center"
      >
        <div className="flex-1 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="text-accent w-5 h-5 animate-pulse" />
              <span className="text-accent font-mono text-sm uppercase tracking-[0.3em] block">
                The Architect
              </span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tight mb-8 leading-tight">
              Turning complex logic into elegant digital experiences.
            </h2>
            
            <div className="space-y-6 text-secondary text-lg leading-relaxed max-w-xl">
              <p>
                As a specialized <span className="text-primary font-medium">Software Architect</span>, I possess a deep passion for 
                engineering systems that transcend simple code. My focus is on creating 
                resilient architectures that prioritize <span className="text-accent">performance</span> and <span className="text-accent">scalability</span>.
              </p>
              <p>
                From sophisticated <span className="text-primary">E-commerce ecosystems</span> to streamlined 
                <span className="text-primary">POS systems</span>, my work is defined by the intersection 
                of technical excellence and intuitive design.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-12">
              <motion.div 
                whileHover={{ y: -5 }}
                className="glass p-6 rounded-2xl border-l-4 border-accent"
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Calendar className="text-accent w-5 h-5" />
                  </div>
                  <h4 className="text-3xl font-display font-bold text-primary">2+</h4>
                </div>
                <p className="text-xs text-secondary uppercase tracking-widest font-mono">Years in Industry</p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5 }}
                className="glass p-6 rounded-2xl border-l-4 border-white/20"
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-2 rounded-lg bg-white/5">
                    <Briefcase className="text-primary w-5 h-5" />
                  </div>
                  <h4 className="text-3xl font-display font-bold text-primary">5+</h4>
                </div>
                <p className="text-xs text-secondary uppercase tracking-widest font-mono">Large Scale Projects</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="flex-1 relative group flex justify-center lg:justify-end">
          <motion.div
            style={{ y: parallaxY }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-72 h-72 md:w-[480px] md:h-[480px] flex items-center justify-center"
          >
            {/* Architectural Rings */}
            <div className="absolute inset-0 rounded-full border border-accent/10 animate-[spin_40s_linear_infinite]" />
            <div className="absolute inset-8 rounded-full border border-dashed border-accent/20 animate-[spin_60s_linear_infinite_reverse]" />
            <div className="absolute inset-16 rounded-full border-2 border-white/5" />
            
            {/* Dynamic Glows */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-[100px] opacity-50 group-hover:opacity-80 transition-opacity duration-1000" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px] opacity-30 group-hover:opacity-60 transition-opacity duration-1000" />

            {/* Main Image Container with Octagonal Clip or stylized frame */}
            <div className="w-[75%] h-[75%] relative z-10 p-4">
              <div className="absolute inset-0 bg-accent/5 rounded-[40px] rotate-6 group-hover:rotate-12 transition-transform duration-700" />
              <div className="absolute inset-0 bg-white/5 rounded-[40px] -rotate-3 group-hover:-rotate-6 transition-transform duration-700" />
              
              <div className="relative h-full w-full rounded-[35px] overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src={myPic}
                  alt="Chann Lyhour Professional Portrait"
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-bg/80 via-transparent to-transparent opacity-60" />
              </div>
            </div>

            {/* Floating Tech Badges */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 right-0 glass p-3 rounded-xl border border-accent/30 z-20"
            >
              <Code2 className="text-accent w-6 h-6" />
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-20 left-0 glass p-3 rounded-xl border border-white/20 z-20"
            >
              <Globe className="text-primary w-6 h-6" />
            </motion.div>

            {/* Decorative Dots */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full shadow-[0_0_15px_var(--color-accent)]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_15px_white]" />
          </motion.div>
          
          {/* Large Abstract Background Shapes */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border border-white/[0.02] rounded-full -z-10 scale-90 group-hover:scale-100 transition-transform duration-1000" />
        </div>
      </motion.div>
    </section>
  );
}
