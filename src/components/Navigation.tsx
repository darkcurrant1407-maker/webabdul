import { useEffect, useState } from 'react';
import { Home, Grid3x3, User, Image, BarChart3, Mail, ArrowUpRight } from 'lucide-react';
import { navItems, fiverrLink } from '@/data/portfolio';

const mobileIcons: Record<string, typeof Home> = {
  Home,
  Portfolio: Grid3x3,
  About: User,
  Gallery: Image,
  Stats: BarChart3,
  Contact: Mail,
};

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = navItems.map((item) => item.href.slice(1));
      const offset = window.innerHeight * 0.35;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset && rect.bottom >= offset) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.getElementById(href.slice(1));
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Desktop Nav */}
      <nav
        className={`fixed left-0 right-0 top-0 z-50 hidden transition-all duration-300 md:block ${
          scrolled
            ? 'border-b border-[rgba(203,200,223,0.09)] bg-[#0B0B0F]/80 backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="font-display text-xl italic tracking-tight text-[#F5F3FA]"
          >
            ABDULSALAM<span className="text-[#7A64FF]">ARTS</span>
          </a>
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  activeSection === item.href.slice(1)
                    ? 'text-[#F5F3FA]'
                    : 'text-[#A8A3B8] hover:text-[#F5F3FA]'
                }`}
              >
                {item.label}
                {activeSection === item.href.slice(1) && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#7A64FF] to-[#F43273]" />
                )}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[rgba(203,200,223,0.09)] bg-[#0B0B0F]/90 backdrop-blur-xl md:hidden">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const Icon = mobileIcons[item.label] || Home;
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`flex flex-col items-center gap-1 rounded-lg px-2 py-1.5 transition-colors ${
                  isActive ? 'text-[#7A64FF]' : 'text-[#A8A3B8]'
                }`}
              >
                <Icon size={20} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </a>
            );
          })}
        </div>
      </nav>

      {/* Floating CTA */}
      <a
        href={fiverrLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-5 z-50 flex items-center gap-2 rounded-full bg-[#F43273] px-5 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(244,50,115,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(244,50,115,0.6)] active:scale-95 md:bottom-6 md:right-6 animate-pulse-glow"
      >
        <span className="hidden sm:inline">Start a Project</span>
        <span className="sm:hidden">Start</span>
        <ArrowUpRight size={18} />
      </a>
    </>
  );
}
