export default function AnimatedBackground({ intensity = 'full' }: { intensity?: 'full' | 'subtle' }) {
  const opacity = intensity === 'full' ? 'opacity-60' : 'opacity-25';
  const blurSize = intensity === 'full' ? 'blur-[120px]' : 'blur-[100px]';

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${opacity}`}>
      <div
        className={`absolute -top-1/4 -left-1/4 h-[60vh] w-[60vh] rounded-full ${blurSize} animate-blob-1`}
        style={{ background: '#7A64FF' }}
      />
      <div
        className={`absolute top-1/3 -right-1/4 h-[55vh] w-[55vh] rounded-full ${blurSize} animate-blob-2`}
        style={{ background: '#F43273' }}
      />
      <div
        className={`absolute -bottom-1/4 left-1/3 h-[50vh] w-[50vh] rounded-full ${blurSize} animate-blob-3`}
        style={{ background: '#7A64FF' }}
      />
      <div
        className={`absolute top-1/2 left-1/2 h-[45vh] w-[45vh] -translate-x-1/2 -translate-y-1/2 rounded-full ${blurSize} animate-blob-4`}
        style={{ background: '#F43273' }}
      />
    </div>
  );
}
