import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView, useScroll, useSpring } from 'motion/react';
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
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, value]);

  useEffect(() => {
    return rounded.on("change", (latest) => {
      setDisplayValue(latest);
    });
  }, [rounded]);

  return <span ref={ref}>{displayValue}%</span>;
}

function SkillBar({ skill, index }: any) {
  const Icon = skill.icon;
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <div className="flex justify-between items-end mb-2">
        <div className="flex items-center gap-3">
          <div 
            className="p-2 rounded-xl bg-white/5 transition-all duration-300 transform group-hover:scale-110"
            style={{ 
              boxShadow: `0 0 20px ${skill.color}00`,
            }}
          >
            <Icon size={24} color={skill.color} />
          </div>
          <span className="font-medium text-lg tracking-tight group-hover:text-primary transition-colors">
            {skill.name}
          </span>
        </div>
        <span className="text-secondary font-mono font-bold tracking-widest text-sm">
          <Counter value={skill.percent} duration={1.5} />
        </span>
      </div>
      
      <div className="h-1.5 w-full bg-primary/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.percent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="h-full relative"
          style={{ backgroundColor: skill.color }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(var(--primary-rgb),0.3)_50%,transparent_100%)] animate-[shimmer_2s_infinite]" />
          <div 
            className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"
            style={{ boxShadow: `0 0 15px ${skill.color}` }}
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
      className="py-32 px-6 relative overflow-hidden"
    >
      {/* Scroll Background Decorations */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-20 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10"
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-20 -left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10"
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
          <h2 className="text-5xl md:text-7xl font-display font-medium tracking-tight mb-8">
            Technical Stack
          </h2>
          <p className="text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            My expertise is built on a solid foundation of modern industry standards 
            and powerful open-source technologies.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-x-20 gap-y-16">
          {/* Frameworks Category */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="space-y-12"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center">
                <Cpu className="text-accent w-6 h-6" />
              </div>
              <h3 className="text-3xl font-display font-semibold">Frameworks</h3>
            </div>
            
            <div className="space-y-8">
              {SKILLS.frameworks.map((skill) => (
                <SkillBar key={skill.name} skill={skill} index={SKILLS.frameworks.indexOf(skill)} />
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
            className="space-y-12"
          >
             <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center">
                <Code2 className="text-accent w-6 h-6" />
              </div>
              <h3 className="text-3xl font-display font-semibold">Languages & Libraries</h3>
            </div>

            <div className="space-y-8">
              {SKILLS.languages.map((skill) => (
                <SkillBar key={skill.name} skill={skill} index={SKILLS.languages.indexOf(skill)} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
