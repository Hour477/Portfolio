import { useEffect, useRef } from 'react';
import { motion, useTransform, animate, useInView, useScroll, useSpring, useMotionValue } from 'motion/react';
import { 
  SiReact, 
  SiNextdotjs, 
  SiLaravel, 
  SiHtml5, 
  SiCss, 
  SiTailwindcss, 
  SiBootstrap, 
  SiSharp, 
  SiCplusplus, 
  SiPhp
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { Cpu, Code2 } from 'lucide-react';

const SKILLS = {
  frameworks: [
    { name: 'React.js', percent: 60, icon: SiReact, color: '#61DAFB' },
    { name: 'Next.js', percent: 70, icon: SiNextdotjs, color: 'var(--nextjs-color)' },
    { name: 'Laravel', percent: 80, icon: SiLaravel, color: '#FF2D20' }
  ],
  languages: [
    { name: 'HTML', percent: 100, icon: SiHtml5, color: '#E34F26' },
    { name: 'CSS', percent: 70, icon: SiCss, color: '#1572B6' },
    { name: 'Tailwind CSS', percent: 70, icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'Bootstrap CSS', percent: 80, icon: SiBootstrap, color: '#7952B3' },
    { name: 'C#', percent: 40, icon: SiSharp, color: '#239120' },
    { name: 'Java', percent: 65, icon: FaJava, color: '#007396' },
    { name: 'C++', percent: 55, icon: SiCplusplus, color: '#00599C' },
    { name: 'PHP', percent: 85, icon: SiPhp, color: '#777BB4' }
  ]
};

function Counter({ value, duration = 2 }: { value: number, duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(0, value, {
        duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = Math.round(latest).toString() + "%";
          }
        },
      });
      return controls.stop;
    }
  }, [inView, value, duration]);

  return <span ref={ref}>0%</span>;
}

function SkillCard({ skill, index, className = "" }: any) {
  const Icon = skill.icon;
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`group relative glass p-6 rounded-3xl transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20 ${className}`}
    >
      {/* Background Glow */}
      <div 
        className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 -z-10"
        style={{ backgroundColor: skill.color }}
      />

      <div className="flex justify-between items-start mb-6" style={{ transform: "translateZ(20px)" }}>
        <div className="flex items-center gap-4">
          <div 
            className="p-3 rounded-2xl bg-white/5 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/10"
            style={{ 
              boxShadow: `0 0 20px ${skill.color}33`,
              border: `1px solid ${skill.color}33`
            }}
          >
            <Icon size={28} color={skill.color} />
          </div>
          <div>
            <h4 className="font-display font-semibold text-xl tracking-tight">
              {skill.name}
            </h4>
            <span className="text-xs text-secondary font-mono uppercase tracking-widest opacity-60">
              Expertise
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-display font-bold tabular-nums" style={{ color: skill.color }}>
            <Counter value={skill.percent} duration={1.5} />
          </span>
        </div>
      </div>
      
      <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden" style={{ transform: "translateZ(10px)" }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.percent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: index * 0.1 + 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="h-full relative"
          style={{ backgroundColor: skill.color }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.4)_50%,transparent_100%)] animate-[shimmer_2s_infinite]" />
          <div 
            className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full blur-sm"
            style={{ backgroundColor: skill.color, boxShadow: `0 0 15px ${skill.color}` }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Skill() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -100]), { stiffness: 100, damping: 30 });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, 100]), { stiffness: 100, damping: 30 });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  return (
    <motion.section 
      id="skills" 
      ref={containerRef}
      style={{ opacity, scale }}
      className="py-20 md:py-32 px-6 relative overflow-hidden"
    >
      {/* Scroll Background Decorations */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-20 -right-20 w-64 h-64 md:w-96 md:h-96 bg-accent/10 rounded-full blur-2xl md:blur-3xl -z-10"
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-20 -left-20 w-64 h-64 md:w-96 md:h-96 bg-accent/10 rounded-full blur-2xl md:blur-3xl -z-10"
      />

      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <span className="text-accent font-mono text-sm uppercase tracking-[0.4em] block mb-4">
            Proficiency
          </span>
          <h2 className="text-4xl md:text-7xl font-display font-medium tracking-tight mb-8">
            Technical Stack
          </h2>
          <p className="text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            My expertise is built on a solid foundation of modern industry standards 
            and powerful open-source technologies.
          </p>
        </motion.div>

        <div className="flex flex-col gap-24">
          {/* Frameworks Category */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            <div className="flex flex-col items-center text-center mb-16">
              <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center mb-6">
                <Cpu className="text-accent w-8 h-8" />
              </div>
              <h3 className="text-4xl font-display font-bold">Core Frameworks</h3>
              <div className="h-1 w-20 bg-accent/20 rounded-full mt-4" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SKILLS.frameworks.map((skill, idx) => (
                <SkillCard 
                  key={skill.name} 
                  skill={skill} 
                  index={idx} 
                  className={idx === 0 ? "lg:col-span-2 lg:row-span-1" : ""}
                />
              ))}
            </div>
          </motion.div>

          {/* Languages & Libraries Category */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.05 } }
            }}
          >
             <div className="flex flex-col items-center text-center mb-16">
              <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center mb-6">
                <Code2 className="text-accent w-8 h-8" />
              </div>
              <h3 className="text-4xl font-display font-bold">Languages & Tools</h3>
              <div className="h-1 w-20 bg-accent/20 rounded-full mt-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SKILLS.languages.map((skill, idx) => (
                <SkillCard 
                  key={skill.name} 
                  skill={skill} 
                  index={idx} 
                  className={idx === 0 || idx === 3 ? "md:col-span-2" : ""}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
