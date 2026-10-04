import { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import TiltCard from './TiltCard';
import ProjectCard from './ProjectCard';
import CaseStudyModal from './CaseStudyModal';
import AnimatedBackground from './AnimatedBackground';
import { useProjects } from '@/hooks/useProjects';
import {
  coverArtProjects as fallbackCoverArt,
  amvProjects as fallbackAmv,
  musicVideoProjects as fallbackMusicVideo,
  characterDesignProjects as fallbackCharacterDesign,
  type Project,
} from '@/data/portfolio';

interface PortfolioSectionProps {
  id: string;
  title: string;
  subtitle: string;
  projects: Project[];
  showBackground?: boolean;
}

function PortfolioSection({ id, title, subtitle, projects, showBackground }: PortfolioSectionProps) {
  const [selected, setSelected] = useState<Project | null>(null);

  if (projects.length === 0) return null;

  return (
    <div id={id} className="relative py-20">
      {showBackground && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0F] via-[#0F0B16] to-[#0B0B0F]" />
          <AnimatedBackground intensity="subtle" />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="mb-10">
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-[#FFB800]">
              {subtitle}
            </p>
            <h3 className="font-display text-3xl italic text-[#F5F3FA] sm:text-4xl">{title}</h3>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 100}>
              <TiltCard className="h-full">
                <ProjectCard
                  title={project.title}
                  type={project.type}
                  result={project.result}
                  thumbnail={project.thumbnail}
                  onClick={() => setSelected(project)}
                />
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <CaseStudyModal project={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

export default function Portfolio() {
  const { coverArt, amv, musicVideo, characterDesign, loading } = useProjects();

  const coverArtProjects = loading ? fallbackCoverArt : coverArt;
  const amvProjectsList = loading ? fallbackAmv : amv;
  const musicVideoProjectsList = loading ? fallbackMusicVideo : musicVideo;
  const characterDesignProjectsList = loading ? fallbackCharacterDesign : characterDesign;

  return (
    <section id="portfolio" className="relative">
      {/* Section divider heading */}
      <div className="mx-auto max-w-7xl px-6 pt-20 text-center">
        <ScrollReveal>
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-[#7A64FF]">
            The Portfolio
          </p>
          <h2 className="font-display text-4xl italic text-[#F5F3FA] sm:text-6xl">
            Every Piece Tells a Story
          </h2>
        </ScrollReveal>
      </div>

      <PortfolioSection
        id="cover-art"
        title="Cover Art"
        subtitle="Animated & Static Cover Art"
        projects={coverArtProjects}
      />

      <div className="mx-auto h-px max-w-7xl bg-gradient-to-r from-transparent via-[rgba(203,200,223,0.09)] to-transparent" />

      <PortfolioSection
        id="amv"
        title="Anime Music Videos"
        subtitle="AMV Edits"
        projects={amvProjectsList}
        showBackground
      />

      <div className="mx-auto h-px max-w-7xl bg-gradient-to-r from-transparent via-[rgba(203,200,223,0.09)] to-transparent" />

      <PortfolioSection
        id="music-video"
        title="Music Video Animations"
        subtitle="Original Animated Music Videos"
        projects={musicVideoProjectsList}
      />

      <div className="mx-auto h-px max-w-7xl bg-gradient-to-r from-transparent via-[rgba(203,200,223,0.09)] to-transparent" />

      <PortfolioSection
        id="character-design"
        title="Character Design"
        subtitle="Original Characters & Concept Art"
        projects={characterDesignProjectsList}
        showBackground
      />
    </section>
  );
}
