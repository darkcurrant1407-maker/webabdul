import { useEffect, useRef, useState } from 'react';
import ScrollReveal from './ScrollReveal';
import { stats, type Stat } from '@/data/portfolio';

function AnimatedCounter({ stat }: { stat: Stat }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        const duration = 2000;
        const steps = 60;
        const increment = stat.value / steps;
        let current = 0;
        const interval = setInterval(() => {
          current += increment;
          if (current >= stat.value) {
            setCount(stat.value);
            clearInterval(interval);
          } else {
            setCount(Math.floor(current));
          }
        }, duration / steps);
        return () => clearInterval(interval);
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [stat.value]);

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-[rgba(203,200,223,0.09)] bg-[rgba(255,255,255,0.05)] p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-[#7A64FF]/30 hover:shadow-[0_0_30px_rgba(122,100,255,0.15)]"
    >
      <p className="font-display text-4xl italic text-[#F5F3FA] sm:text-5xl">
        {count}
        <span className="bg-gradient-to-r from-[#7A64FF] to-[#F43273] bg-clip-text text-transparent">
          {stat.suffix}
        </span>
      </p>
      <p className="mt-2 text-sm font-medium text-[#A8A3B8]">{stat.label}</p>
    </div>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0F] via-[#100B18] to-[#0B0B0F]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-[#7A64FF]">
            By the Numbers
          </p>
          <h2 className="font-display text-4xl italic text-[#F5F3FA] sm:text-5xl">Track Record</h2>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 100}>
              <AnimatedCounter stat={stat} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
