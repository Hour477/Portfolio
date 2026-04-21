import { motion } from 'motion/react';
import myPic from '../assets/mypic.jpg';

export default function About() {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent font-mono text-sm uppercase tracking-widest block mb-4">
              Our Vision
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight mb-6">
              I am Chann Lyhour, turning complex ideas into seamless digital solutions.
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
                <h4 className="text-3xl font-display font-bold text-accent mb-1">5+</h4>
                <p className="text-sm text-secondary uppercase tracking-tight">Years Experience</p>
              </div>
              <div>
                <h4 className="text-3xl font-display font-bold text-white mb-1">100+</h4>
                <p className="text-sm text-secondary uppercase tracking-tight">Projects Completed</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex-1 relative group">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl overflow-hidden aspect-[4/5] perspective-1000"
          >
            <div className="absolute inset-0 bg-accent/20 z-10 group-hover:opacity-0 transition-opacity duration-700" />
            <img
              src={myPic}
              alt="Chann Lyhour Professional Portrait"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 glass rounded-2xl -z-10 animate-float" />
          <div className="absolute -top-6 -left-6 w-32 h-32 border border-accent/20 rounded-2xl -z-10" />
        </div>
      </div>
    </section>
  );
}
