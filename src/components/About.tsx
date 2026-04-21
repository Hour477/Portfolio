import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';
import myPic from '../assets/mypic.jpg';

function TypingText({ text }: { text: string }) {
  const words = text.split(" ");
  let charCount = 0;

  const childVariants = {
    hidden: { opacity: 0, y: 5, filter: "blur(2px)" },
    visible: (i: number) => ({
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: { 
        duration: 0.4, 
        ease: "easeOut",
        delay: i * 0.03 
      }
    }),
  };

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="inline flex flex-wrap"
    >
      {words.map((word, wordIndex) => {
        const wordChars = word.split("");
        const element = (
          <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
            {wordChars.map((char, charIndex) => {
              const globalIndex = charCount;
              charCount++;
              return (
                <motion.span 
                  key={charIndex} 
                  custom={globalIndex}
                  variants={childVariants}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
        return element;
      })}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block w-[3px] h-[0.9em] bg-accent ml-1 align-middle shadow-[0_0_8px_var(--color-accent)]"
      />
    </motion.span>
  );
}

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
            <span className="text-accent font-mono text-sm uppercase tracking-widest block mb-4">
              Our Vision
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight mb-6">
              <TypingText text="I am Chann Lyhour, turning complex ideas into seamless digital solutions." />
            </h2>
            <div className="space-y-6 text-secondary text-lg leading-relaxed">
              <p>
                As a specialized software architect, I have a deep passion for 
                creating systems that solve real-world problems. Whether it's 
                automating a restaurant's workflow or building a high-traffic 
                e-commerce platform, my focus is always on performance and user experience.
              </p>
              <p>
                My work spans multiple industries, providing tailored solutions for 
                Hotel management, Food ordering, and robust E-commerce systems. 
                I believe in code that is as elegant as the interface it powers.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 pt-10 border-t border-white/5">
              <div>
                <h4 className="text-3xl font-display font-bold text-accent mb-1">2+</h4>
                <p className="text-sm text-secondary uppercase tracking-tight">Years Experience</p>
              </div>
              <div>
                <h4 className="text-3xl font-display font-bold text-primary mb-1">5+</h4>
                <p className="text-sm text-secondary uppercase tracking-tight">Projects Completed</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex-1 relative group flex justify-center lg:justify-end">
          <motion.div
            style={{ y: parallaxY }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 1, ease: "backOut" }}
            className="relative w-72 h-72 md:w-96 md:h-96 rounded-full p-4 glass ring-1 ring-primary/10"
          >
            {/* Big 5px Ring Border */}
            <div className="absolute -inset-2 rounded-full border-[5px] border-accent/20 animate-pulse" />
            
            {/* Animated Ring Border */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-accent/30 animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-2 rounded-full border border-accent/20 animate-[spin_15s_linear_infinite_reverse]" />
            
            <div className="w-full h-full rounded-full overflow-hidden relative z-10 border-[5px] border-primary/10 shadow-2xl">
              <img
                src={myPic}
                alt="Chann Lyhour Professional Portrait"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Glowing Orbs */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl animate-pulse delay-700" />
          </motion.div>
          
          {/* Decorative Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-accent/5 rounded-full -z-10 scale-90 group-hover:scale-100 transition-transform duration-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-accent/5 rounded-full -z-10 scale-75 group-hover:scale-90 transition-transform duration-1000 delay-100" />
        </div>
      </motion.div>
    </section>
  );
}
