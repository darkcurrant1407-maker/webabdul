import { useEffect } from 'react';
import { X } from 'lucide-react';
import type { Project } from '@/data/portfolio';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative my-8 mx-4 w-full max-w-3xl rounded-2xl border border-[rgba(203,200,223,0.09)] bg-[#13101C] p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-[rgba(255,255,255,0.08)] p-2 text-[#A8A3B8] transition-colors hover:bg-[#F43273]/20 hover:text-[#F5F3FA]"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="mb-6">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[#FFB800]">
            {project.categoryLabel} · {project.type}
          </p>
          <h3 className="font-display text-3xl italic text-[#F5F3FA] sm:text-4xl">{project.title}</h3>
        </div>

        <div className="mb-6 overflow-hidden rounded-xl">
          <img src={project.thumbnail} alt={project.title} className="w-full object-cover" />
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#7A64FF]">Brief</h4>
            <p className="text-[#A8A3B8]">{project.brief}</p>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#7A64FF]">Concept</h4>
            <p className="text-[#A8A3B8]">{project.concept}</p>
          </div>

          {project.processVisuals.length > 0 && (
            <div>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#7A64FF]">Process</h4>
              <div className="grid grid-cols-2 gap-4">
                {project.processVisuals.map((src, i) => (
                  <div key={i} className="overflow-hidden rounded-xl">
                    <img src={src} alt={`Process visual ${i + 1}`} className="w-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#7A64FF]">Final Video</h4>
            <div className="overflow-hidden rounded-xl">
              <div className="relative aspect-video">
                {project.videoUrl ? (
                  <video
                    src={project.videoUrl}
                    controls
                    className="absolute inset-0 h-full w-full object-contain bg-black"
                  />
                ) : (
                  <iframe
                    src={project.videoEmbedUrl}
                    title={project.title}
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#F43273]">Outcome</h4>
            <p className="text-[#F5F3FA]">{project.outcome}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
