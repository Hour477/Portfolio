import { useLayoutEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import ProjectDetails from './ProjectDetails';

import project1 from '../Projects_image/1.jpg';
import project2 from '../Projects_image/2.jpg';
import project3 from '../Projects_image/3.jpg';
import project4 from '../Projects_image/4.jpg';
import project5 from '../Projects_image/5.jpg';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: 'Project System',
    category: 'Architecture & Design',
    image: project1,
    description: 'A comprehensive project management framework for high-scale enterprise workflows.',
    technologies: ['React', 'Next.js', 'Typescript', 'Node.js', 'PostgreSQL'],
    details: 'This system features real-time task tracking, automated resource allocation, and a highly modular architecture that scales with team size. Built with a focus on low-latency data synchronization and user-centric dashboard design.',
  },
  {
    title: 'E-commerce Website',
    category: 'Full Stack Development',
    image: project2,
    description: 'Next-gen shopping experience with real-time stock management and AI-driven recommendations.',
    technologies: ['React', 'Tailwind CSS', 'Redux', 'Express', 'MongoDB'],
    details: 'A high-performance e-commerce engine supporting thousands of concurrent users. Integrated with Stripe for payments and featuring a custom-built recommendation engine that learns from user behavior.',
  },
  {
    title: 'Food Ordering System',
    category: 'Application UI/UX',
    image: project3,
    description: 'A lightning-fast food delivery platform focusing on real-time tracking and intuitive UX.',
    technologies: ['React Native', 'Firebase', 'Google Maps API', 'Lottie'],
    details: 'Developed with a "mobile-first" approach, this system provides sub-second update speeds for orders and rider positions. Features include geometric geofencing and dynamic delivery fee calculation.',
  },
  {
    title: 'Restaurant System',
    category: 'Business Automation',
    image: project4,
    description: 'Specialized POS and kitchen management system to streamline hospitality operations.',
    technologies: ['Java Swing', 'MySQL', 'Socket.io', 'Electron'],
    details: 'Designed to withstand the heat of the kitchen, this system bridges the gap between the front-of-house and back-of-house. It includes advanced inventory tracking and automated peak-hour staffing suggestions.',
  },
  {
    title: 'Hotel Booking System',
    category: 'Service Platform',
    image: project5,
    description: 'Global reservation platform featuring dynamic pricing and multi-channel synchronization.',
    technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Redis', 'AWS'],
    details: 'A robust booking engine capable of handling multi-hotel networks. Features include automated channel management, dynamic pricing based on occupancy, and a fully integrated SEO-optimized blog.',
  },
];

export default function Projects() {
  const container = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openProject = useCallback((project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeProject = useCallback(() => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.project-item');
      
      items.forEach((item: any, i) => {
        gsap.fromTo(item, 
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              end: 'top 60%',
              scrub: 1,
            }
          }
        );

        // Parallax effect on image
        gsap.to(item.querySelector('img'), {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        });
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="py-32 px-6 bg-primary/[0.02]" ref={triggerRef}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-secondary font-mono text-sm uppercase tracking-widest block mb-4">
              Featured Work
            </span>
            <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter">
              Selected <br /> <span className="text-accent underline">Projects</span>
            </h2>
          </div>
          <p className="text-secondary max-w-sm text-lg">
            A small selection of my favorite projects from the last few years, 
            focusing on complex systems and UX.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          {PROJECTS.map((project, idx) => (
            <div 
              key={project.title} 
              onClick={() => openProject(project)}
              className={`project-item group cursor-pointer ${idx % 2 === 1 ? 'md:mt-32' : ''}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-8 border border-primary/5 bg-primary/5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-linear-to-t from-bg/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-sm text-secondary line-clamp-2 max-w-[200px]">
                    {project.description}
                  </p>
                  <div className="w-12 h-12 rounded-full bg-primary text-bg flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
              <div>
                <span className="text-accent font-mono text-xs uppercase tracking-widest mb-2 block">
                  {project.category}
                </span>
                <h3 className="text-2xl font-display font-medium group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProjectDetails 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeProject}
      />
    </section>
  );
}
