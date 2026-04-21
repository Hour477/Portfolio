import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Entry Animation
      gsap.from('.title-word', {
        y: 60,
        rotateX: -45,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.2,
      });

      // Scroll Animation (Parallax)
      gsap.to('.hero-content', {
        y: 100,
        opacity: 0,
        scale: 0.95,
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: 'bottom 40%',
          scrub: true,
        }
      });

      // Parallax for background orbs
      gsap.to('.hero-orb-1', {
        y: 200,
        x: 100,
        scrollTrigger: {
          trigger: container.current,
          scrub: 1,
        }
      });
      gsap.to('.hero-orb-2', {
        y: -150,
        x: -50,
        scrollTrigger: {
          trigger: container.current,
          scrub: 1,
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={container}
      className="relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden pt-20"
    >
      <div className="absolute inset-0 z-0">
        <div className="hero-orb-1 absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-accent/20 rounded-full blur-[120px]" />
        <div className="hero-orb-2 absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="hero-content relative z-10 text-center max-w-4xl mx-auto">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="inline-block px-4 py-1.5 rounded-full glass text-xs font-mono tracking-widest text-secondary uppercase mb-8"
        >
          Product Designer & Full Stack Engineer
        </motion.span>

        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-8 leading-[1.1]"
        >
          <div className="block">
            {["I'm", "Lyhour"].map((word, i) => (
              <span 
                key={i} 
                className={`title-word inline-block mr-[0.3em] ${word === "I'm" ? "text-[#00d2ff] font-extrabold drop-shadow-[0_0_15px_rgba(0,210,255,0.4)]" : "text-gradient"}`}
              >
                {word}
              </span>
            ))}
          </div>
          <div className="block">
            {["Web", "Developer"].map((word, i) => (
              <span 
                key={i} 
                className="title-word inline-block mr-[0.3em] text-gradient"
              >
                {word}
              </span>
            ))}
          </div>
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          I specialize in building high-performance web systems, from scalable e-commerce platforms 
          to complex management systems for hotels and restaurants.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <a
            href="#projects"
            className="px-8 py-4 bg-primary text-bg font-semibold rounded-full hover:bg-accent hover:text-white transition-all duration-300 flex items-center gap-2 group"
          >
            View Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="px-8 py-4 border border-primary/20 hover:border-primary/40 rounded-full transition-all duration-300"
          >
            Let's Talk
          </a>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="absolute bottom-10 left-0 w-full overflow-hidden opacity-20 hover:opacity-50 transition-opacity duration-500 pointer-events-none">
        <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite]">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter mx-4">
              Chann Lyhour <span className="text-accent">·</span> Product Designer <span className="text-accent">·</span> Full Stack Engineer <span className="text-accent">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
