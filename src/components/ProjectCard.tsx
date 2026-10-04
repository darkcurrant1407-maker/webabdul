interface ProjectCardProps {
  title: string;
  type: string;
  result: string;
  thumbnail: string;
  onClick: () => void;
}

export default function ProjectCard({ title, type, result, thumbnail, onClick }: ProjectCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative w-full overflow-hidden rounded-2xl border border-[rgba(203,200,223,0.09)] bg-[rgba(255,255,255,0.05)] text-left backdrop-blur-sm transition-all duration-300 hover:border-[#7A64FF]/40 hover:shadow-[0_0_40px_rgba(122,100,255,0.25)]"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-[#0B0B0F]/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-[#FFB800]">{type}</p>
          <h4 className="font-display text-xl italic text-[#F5F3FA]">{title}</h4>
          <p className="mt-1 text-sm text-[#A8A3B8]">{result}</p>
        </div>
      </div>
    </button>
  );
}
