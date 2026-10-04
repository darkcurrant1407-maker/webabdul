import ScrollReveal from './ScrollReveal';
import { useGallery } from '@/hooks/useGallery';

export default function Gallery() {
  const { items } = useGallery();

  return (
    <section id="gallery" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-[#7A64FF]">
            Gallery
          </p>
          <h2 className="font-display text-4xl italic text-[#F5F3FA] sm:text-5xl">
            Behind the Scenes
          </h2>
          <p className="mt-4 max-w-2xl text-[#A8A3B8]">
            Concept art, workspace shots, and supporting visuals from projects past and present.
          </p>
        </ScrollReveal>

        <div className="mt-12 columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
          {items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 40}>
              <div className="overflow-hidden rounded-[10px] border border-[rgba(203,200,223,0.06)] break-inside-avoid transition-all duration-300 hover:border-[#7A64FF]/30 hover:shadow-[0_0_25px_rgba(122,100,255,0.15)]">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                  loading="lazy"
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
