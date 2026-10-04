import { ChevronDown } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0F] via-[#130D1F] to-[#0B0B0F]" />
      <AnimatedBackground intensity="full" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <p className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-[#A8A3B8]">
          2D / 3D Motion Designer
        </p>
        <h1 className="font-display text-5xl italic leading-[1.05] text-[#F5F3FA] sm:text-7xl lg:text-8xl">
          Sound,
          <br />
          <span className="bg-gradient-to-r from-[#7A64FF] via-[#F43273] to-[#FFB800] bg-clip-text text-transparent">
            Seen.
          </span>
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg text-[#A8A3B8] sm:text-xl">
          I'm <span className="font-semibold text-[#F5F3FA]">ABDULSALAMARTS</span> — bringing music to
          life through motion. Music video animation, animated cover art, promo visuals, and cinematic
          edits that make your sound impossible to ignore.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#portfolio"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="rounded-full bg-[#7A64FF] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(122,100,255,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(122,100,255,0.5)]"
          >
            View Portfolio
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="rounded-full border border-[rgba(203,200,223,0.2)] px-8 py-3.5 text-sm font-semibold text-[#F5F3FA] transition-all duration-300 hover:border-[#F43273]/50 hover:text-[#F43273]"
          >
            Get in Touch
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#A8A3B8] animate-bounce-slow">
        <ChevronDown size={24} />
      </div>
    </section>
  );
}
