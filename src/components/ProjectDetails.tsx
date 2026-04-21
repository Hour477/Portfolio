import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, Layers, Cpu, Globe } from 'lucide-react';

interface Project {
  title: string;
  category: string;
  image: string;
  description: string;
  technologies: string[];
  details: string;
}

interface ProjectDetailsProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDetails({ project, isOpen, onClose }: ProjectDetailsProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-bg/90 backdrop-blur-xl"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-6xl max-h-[90vh] bg-bg border border-primary/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-20 p-2 bg-primary/10 hover:bg-primary/20 rounded-full text-primary transition-colors"
            >
              <X size={20} />
            </button>

            {/* Image Column */}
            <div className="w-full md:w-1/2 h-[300px] md:h-full relative overflow-hidden group">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-bg via-transparent to-transparent opacity-60" />
              
              <div className="absolute bottom-8 left-8 right-8">
                <span className="text-accent font-mono text-sm uppercase tracking-widest block mb-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full w-fit">
                  {project.category}
                </span>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
                  {project.title}
                </h2>
              </div>
            </div>

            {/* Content Column */}
            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
              <div className="space-y-10">
                {/* DescriptionSection */}
                <motion.section
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-secondary mb-4 flex items-center gap-2">
                    <Layers size={14} className="text-accent" />
                    Overview
                  </h4>
                  <p className="text-xl text-primary leading-relaxed font-light">
                    {project.details}
                  </p>
                </motion.section>

                {/* Technologies Section */}
                <motion.section
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-secondary mb-6 flex items-center gap-2">
                    <Cpu size={14} className="text-accent" />
                    Technology Stack
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech, i) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="px-4 py-2 rounded-xl bg-primary/5 border border-primary/10 text-secondary hover:text-primary transition-colors text-sm"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.section>

                {/* Links Section */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="pt-8 border-t border-primary/5 flex flex-wrap gap-6"
                >
                  <a
                    href="javascript:void(0)"
                    onClick={(e) => e.preventDefault()}
                    className="flex-1 min-w-[160px] py-4 bg-primary text-bg font-bold rounded-2xl flex items-center justify-center gap-2 group transition-all hover:scale-105 active:scale-95"
                  >
                    View Live <ExternalLink size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                  <a
                    href="javascript:void(0)"
                    onClick={(e) => e.preventDefault()}
                    className="flex-1 min-w-[160px] py-4 glass border border-primary/10 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-primary/10 transition-colors"
                  >
                    Source Code <Github size={18} />
                  </a>
                </motion.div>

                <div className="flex items-center gap-3 text-secondary text-xs uppercase tracking-widest pt-4">
                  <Globe size={14} className="animate-pulse" />
                  Live Deployment: Active
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
