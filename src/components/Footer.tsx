import AnimatedBackground from './AnimatedBackground';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[rgba(203,200,223,0.09)] py-12">
      <div className="absolute inset-0 bg-[#0B0B0F]" />
      <AnimatedBackground intensity="subtle" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        <p className="font-display text-2xl italic text-[#F5F3FA]">
          ABDULSALAM<span className="text-[#7A64FF]">ARTS</span>
        </p>
        <p className="mt-3 text-sm text-[#A8A3B8]">
          Sound, Seen. — 2D/3D Motion Design for Music
        </p>
        <a href="/admin" className="mt-4 inline-block text-xs text-[#A8A3B8]/40 transition-colors hover:text-[#A8A3B8]">
          Admin
        </a>
        <p className="mt-6 text-xs text-[#A8A3B8]/60">
          © {new Date().getFullYear()} ABDULSALAMARTS. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
