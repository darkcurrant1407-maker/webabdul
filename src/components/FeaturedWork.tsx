import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import TiltCard from './TiltCard';
import ProjectCard from './ProjectCard';
import CaseStudyModal from './CaseStudyModal';
import { useProjects } from '@/hooks/useProjects';
import { featuredWork as fallbackFeatured, type Project } from '@/data/portfolio';

export default function FeaturedWork() {
  const { featured, loading } = useProjects();
  const [selected, setSelected] = useState<Project | null>(null);

  const projects = loading ? fallbackFeatured : featured;

  if (projects.length === 0) return null;

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-wider text-[#7A64FF]">
                Selected Work
              </p>
              <h2 className="font-display text-4xl italic text-[#F5F3FA] sm:text-5xl">Featured</h2>
            </div>
            <a
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group hidden items-center gap-2 text-sm font-medium text-[#A8A3B8] transition-colors hover:text-[#F5F3FA] sm:flex"
            >
              View all
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
    </section>
  );
}
