import { Send, Instagram, Linkedin, Github, Facebook } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden glass border border-white/5 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 blur-[150px] -z-10" />
        
        <div className="grid lg:grid-cols-2">
          <div className="p-8 md:p-16 border-b lg:border-b-0 lg:border-r border-white/5">
            <span className="text-accent font-mono text-sm uppercase tracking-widest block mb-4">
              Get in Touch
            </span>
            <h2 className="text-5xl md:text-6xl font-display font-medium tracking-tight mb-8">
              LETS CREATE <br /> SOMETHING <br /> <span className="text-accent">LEGENDARY.</span>
            </h2>
            
            <div className="space-y-6 mb-12">
              <p className="text-secondary text-lg">
                Always open to discussing new projects, creative ideas, or 
                opportunities to be part of your visions.
              </p>
              <div className="space-y-4">
                <a href="mailto:chann@lyhour.me" className="block text-2xl font-medium hover:text-accent transition-colors">
                  chann@lyhour.me
                </a>
                <a href="tel:+1234567890" className="block text-xl text-secondary hover:text-white transition-colors">
                  +855-68642521 (KH)
                </a>
              </div>
            </div>

            <div className="flex gap-6">
              <a href="https://www.facebook.com/bro.hour.1422409" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full border border-white/10 hover:border-accent hover:text-accent transition-all">
                <Facebook size={20} />
              </a>
              <a href="https://github.com/Hour477" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full border border-white/10 hover:border-accent hover:text-accent transition-all">
                <Github size={20} />
              </a>
            </div>
          </div>

          <div className="p-8 md:p-16">
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-secondary">Full Name</label>
                <input 
                  type="text" 
                  className="w-full bg-transparent border-b border-white/10 py-4 focus:border-accent outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-secondary">Email Address</label>
                <input 
                  type="email" 
                  className="w-full bg-transparent border-b border-white/10 py-4 focus:border-accent outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-secondary">Project Details</label>
                <textarea 
                  rows={4}
                  className="w-full bg-transparent border border-white/10 rounded-xl p-4 focus:border-accent outline-none transition-all resize-none mt-4"
                  placeholder="Tell me about your amazing project..."
                />
              </div>
              
              <button 
                type="submit"
                className="w-full py-6 bg-accent text-white font-bold rounded-xl flex items-center justify-center gap-3 group overflow-hidden relative"
              >
                <span className="relative z-10">Send Message</span>
                <Send size={18} className="relative z-10 translate-x-0 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <div className="mt-32 border-t border-white/5 pt-16 flex flex-col md:flex-row justify-between items-center gap-8 max-w-7xl mx-auto opacity-50 text-xs font-mono lowercase tracking-widest">
        <p>© 2025 CHANN LYHOUR.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary transition-colors">Cookies</a>
          <a href="#" className="hover:text-primary transition-colors">License</a>
        </div>
        <p>Built with passion and precision.</p>
      </div>
    </section>
  );
}
