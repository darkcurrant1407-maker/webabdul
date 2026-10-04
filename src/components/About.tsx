import ScrollReveal from './ScrollReveal';
import AnimatedBackground from './AnimatedBackground';
import { milestones } from '@/data/portfolio';

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0F] via-[#100B18] to-[#0B0B0F]" />
      <AnimatedBackground intensity="subtle" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-[#7A64FF]">
            About / Journey
          </p>
          <h2 className="font-display text-4xl italic text-[#F5F3FA] sm:text-5xl">
            Motion with Intention
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#A8A3B8]">
            I don't just animate — I translate sound into visual emotion. Every project starts with
            listening: to the track, the artist, the feeling they want to leave behind. Then I build
            worlds that carry that feeling forward. Whether it's a 3D music video that drops you into
            another dimension, an animated cover that breathes on a Spotify canvas, or a cinematic AMV
            that turns footage into a story — the goal is always the same. Make sound something you
            can see.
          </p>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative mt-20">
          {/* Central line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[#7A64FF] via-[#F43273] to-transparent md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-12">
            {milestones.map((milestone, i) => {
              const isLeft = i % 2 === 0;
              return (
                <ScrollReveal key={milestone.year} delay={i * 50}>
                  <div
                    className={`relative flex items-start gap-6 md:gap-0 ${
                      isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Node */}
                    <div className="absolute left-4 top-2 z-10 -translate-x-1/2 md:left-1/2">
                      <div className="h-4 w-4 rounded-full border-2 border-[#0B0B0F] bg-gradient-to-br from-[#7A64FF] to-[#F43273] shadow-[0_0_15px_rgba(122,100,255,0.5)]" />
                    </div>

                    {/* Content */}
                    <div className={`ml-10 md:ml-0 md:w-1/2 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                      <div className="rounded-2xl border border-[rgba(203,200,223,0.09)] bg-[rgba(255,255,255,0.05)] p-5 backdrop-blur-sm transition-all duration-300 hover:border-[#7A64FF]/30 hover:shadow-[0_0_30px_rgba(122,100,255,0.15)]">
                        <p className="mb-1 font-display text-2xl italic text-[#FFB800]">
                          {milestone.year}
                        </p>
                        <h4 className="mb-2 text-lg font-semibold text-[#F5F3FA]">
                          {milestone.title}
                        </h4>
                        <p className="text-sm leading-relaxed text-[#A8A3B8]">
                          {milestone.description}
                        </p>
                      </div>
                    </div>

                    {/* Spacer for opposite side on desktop */}
                    <div className="hidden md:block md:w-1/2" />
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
