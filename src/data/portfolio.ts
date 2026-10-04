export type ProjectCategory = 'cover-art' | 'amv' | 'music-video' | 'character-design';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  type: string;
  result: string;
  thumbnail: string;
  brief: string;
  concept: string;
  processVisuals: string[];
  videoEmbedUrl: string;
  videoUrl: string;
  outcome: string;
}

export const featuredWork: Project[] = [
  {
    id: 'fw1',
    title: 'Neon Pulse',
    category: 'music-video',
    categoryLabel: 'Music Video Animation',
    type: '2D / 3D Motion',
    result: '2.4M+ views in first month',
    thumbnail: 'https://images.pexels.com/photos/8041226/pexels-photo-8041226.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    brief: 'A high-energy animated music video blending 2D character animation with 3D environment design for an emerging electronic artist.',
    concept: 'The concept centered on translating the track\'s pulsing bassline into a visual journey through a neon-drenched cityscape, where the protagonist moves through light itself.',
    processVisuals: [
      'https://images.pexels.com/photos/8041225/pexels-photo-8041225.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/2510431/pexels-photo-2510431.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    videoEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoUrl: '',
    outcome: 'The video surpassed 2.4 million views in its first month and was featured on the artist\'s official channel, leading to three additional project commissions.',
  },
  {
    id: 'fw2',
    title: 'Crimson Reverie',
    category: 'cover-art',
    categoryLabel: 'Cover Art',
    type: 'Animated Cover Art',
    result: 'Featured on Spotify Canvas',
    thumbnail: 'https://images.pexels.com/photos/8896511/pexels-photo-8896511.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    brief: 'An animated cover art piece for a single release, combining abstract liquid motion with bold typographic treatment.',
    concept: 'The design evoked the song\'s melancholic warmth through flowing crimson and amber gradients, with the title emerging from the liquid surface like a ripple.',
    processVisuals: [
      'https://images.pexels.com/photos/8168564/pexels-photo-8168564.png?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/8659276/pexels-photo-8659276.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    videoEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoUrl: '',
    outcome: 'Adopted as the official Spotify Canvas for the release, contributing to a 40% increase in listener retention during the opening week.',
  },
  {
    id: 'fw3',
    title: 'Echoes of Armor',
    category: 'amv',
    categoryLabel: 'Anime Music Video',
    type: 'AMV Edit',
    result: '500K+ views, contest finalist',
    thumbnail: 'https://images.pexels.com/photos/15465095/pexels-photo-15465095.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    brief: 'A cinematic anime music video edit weaving multiple series into a cohesive emotional narrative synced to an orchestral track.',
    concept: 'The edit built a story of a warrior\'s internal struggle, using scene selection and color grading to unify footage from different series into one seamless arc.',
    processVisuals: [
      'https://images.pexels.com/photos/15116104/pexels-photo-15116104.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/7321295/pexels-photo-7321295.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    videoEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoUrl: '',
    outcome: 'Selected as a finalist in a major AMV contest and accumulated over 500K organic views, establishing the editor\'s reputation in the AMV community.',
  },
  {
    id: 'fw4',
    title: 'Static Bloom',
    category: 'music-video',
    categoryLabel: 'Music Video Animation',
    type: '3D Motion Design',
    result: 'Brand collaboration launch',
    thumbnail: 'https://images.pexels.com/photos/7688765/pexels-photo-7688765.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    brief: 'A surreal 3D animated music video for a fashion brand\'s campaign soundtrack, blending organic forms with glitch aesthetics.',
    concept: 'The video explored the tension between nature and technology, with flowers blooming into pixelated fragments that reassembled into the brand\'s logo.',
    processVisuals: [
      'https://images.pexels.com/photos/4123586/pexels-photo-4123586.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/5563238/pexels-photo-5563238.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    videoEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoUrl: '',
    outcome: 'Used as the centerpiece of the brand\'s seasonal campaign launch, generating significant social engagement and a follow-up retainer.',
  },
];

export const coverArtProjects: Project[] = [
  {
    id: 'ca1',
    title: 'Crimson Reverie',
    category: 'cover-art',
    categoryLabel: 'Cover Art',
    type: 'Animated Cover Art',
    result: 'Featured on Spotify Canvas',
    thumbnail: 'https://images.pexels.com/photos/8896511/pexels-photo-8896511.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    brief: 'An animated cover art piece combining abstract liquid motion with bold typographic treatment for a single release.',
    concept: 'Flowing crimson and amber gradients with the title emerging from the liquid surface.',
    processVisuals: [
      'https://images.pexels.com/photos/8168564/pexels-photo-8168564.png?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/8659276/pexels-photo-8659276.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    videoEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoUrl: '',
    outcome: 'Adopted as official Spotify Canvas, 40% increase in listener retention.',
  },
  {
    id: 'ca2',
    title: 'Velvet Static',
    category: 'cover-art',
    categoryLabel: 'Cover Art',
    type: 'Static Cover Art',
    result: 'Album pre-save campaign',
    thumbnail: 'https://images.pexels.com/photos/8168570/pexels-photo-8168570.png?auto=compress&cs=tinysrgb&h=650&w=940',
    brief: 'A static cover art design for an EP release with a gritty, textured aesthetic.',
    concept: 'Dark velvet textures interrupted by static noise patterns, reflecting the EP\'s themes of distortion and intimacy.',
    processVisuals: [
      'https://images.pexels.com/photos/2157888/pexels-photo-2157888.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/9965283/pexels-photo-9965283.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    videoEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoUrl: '',
    outcome: 'Used across the full pre-save campaign, contributing to a successful launch day.',
  },
  {
    id: 'ca3',
    title: 'Spectrum Drift',
    category: 'cover-art',
    categoryLabel: 'Cover Art',
    type: 'Animated Cover Art',
    result: '1M+ streams milestone art',
    thumbnail: 'https://images.pexels.com/photos/4391611/pexels-photo-4391611.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    brief: 'A vibrant animated cover celebrating a streaming milestone for a pop single.',
    concept: 'Pastel watercolor washes that slowly drift and blend, symbolizing the fluidity of the song\'s melody.',
    processVisuals: [
      'https://images.pexels.com/photos/2157885/pexels-photo-2157885.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/1561020/pexels-photo-1561020.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    videoEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoUrl: '',
    outcome: 'Shared by the artist to celebrate 1M streams, boosting follower engagement.',
  },
];

export const amvProjects: Project[] = [
  {
    id: 'amv1',
    title: 'Echoes of Armor',
    category: 'amv',
    categoryLabel: 'Anime Music Video',
    type: 'AMV Edit',
    result: '500K+ views, contest finalist',
    thumbnail: 'https://images.pexels.com/photos/15465095/pexels-photo-15465095.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    brief: 'A cinematic AMV weaving multiple anime series into a cohesive emotional narrative synced to an orchestral track.',
    concept: 'A warrior\'s internal struggle told through unified color grading and scene selection across different series.',
    processVisuals: [
      'https://images.pexels.com/photos/15116104/pexels-photo-15116104.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/7321295/pexels-photo-7321295.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    videoEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoUrl: '',
    outcome: 'Finalist in a major AMV contest, 500K+ organic views.',
  },
  {
    id: 'amv2',
    title: 'Neon Dreams',
    category: 'amv',
    categoryLabel: 'Anime Music Video',
    type: 'AMV Edit',
    result: 'Viral on social media',
    thumbnail: 'https://images.pexels.com/photos/23191211/pexels-photo-23191211.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    brief: 'A high-energy AMV set to a synthwave track, featuring fast cuts and neon color overlays.',
    concept: 'Retro-futuristic aesthetic with neon glows and VHS distortion effects matching the synthwave genre.',
    processVisuals: [
      'https://images.pexels.com/photos/29971342/pexels-photo-29971342.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/6868220/pexels-photo-6868220.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    videoEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoUrl: '',
    outcome: 'Went viral on social platforms, driving significant traffic to the editor\'s channel.',
  },
  {
    id: 'amv3',
    title: 'Shattered Light',
    category: 'amv',
    categoryLabel: 'Anime Music Video',
    type: 'AMV Edit',
    result: 'Editor\'s pick on AMV platform',
    thumbnail: 'https://images.pexels.com/photos/15282704/pexels-photo-15282704.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    brief: 'An emotionally charged AMV focusing on themes of loss and recovery, synced to a ballad.',
    concept: 'Fragile light motifs and shattered glass transitions reflecting the song\'s emotional peaks and valleys.',
    processVisuals: [
      'https://images.pexels.com/photos/9817422/pexels-photo-9817422.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/15116104/pexels-photo-15116104.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    videoEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoUrl: '',
    outcome: 'Featured as an editor\'s pick, praised for its emotional storytelling and technical precision.',
  },
];

export const musicVideoProjects: Project[] = [
  {
    id: 'mv1',
    title: 'Neon Pulse',
    category: 'music-video',
    categoryLabel: 'Music Video Animation',
    type: '2D / 3D Motion',
    result: '2.4M+ views in first month',
    thumbnail: 'https://images.pexels.com/photos/8041226/pexels-photo-8041226.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    brief: 'A high-energy animated music video blending 2D character animation with 3D environment design.',
    concept: 'Translating a pulsing bassline into a visual journey through a neon-drenched cityscape.',
    processVisuals: [
      'https://images.pexels.com/photos/8041225/pexels-photo-8041225.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/2510431/pexels-photo-2510431.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    videoEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoUrl: '',
    outcome: '2.4M+ views, featured on official channel, led to three additional commissions.',
  },
  {
    id: 'mv2',
    title: 'Static Bloom',
    category: 'music-video',
    categoryLabel: 'Music Video Animation',
    type: '3D Motion Design',
    result: 'Brand collaboration launch',
    thumbnail: 'https://images.pexels.com/photos/7688765/pexels-photo-7688765.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    brief: 'A surreal 3D animated music video for a fashion brand\'s campaign soundtrack.',
    concept: 'Flowers blooming into pixelated fragments, exploring the tension between nature and technology.',
    processVisuals: [
      'https://images.pexels.com/photos/4123586/pexels-photo-4123586.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/5563238/pexels-photo-5563238.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    videoEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoUrl: '',
    outcome: 'Centerpiece of brand\'s seasonal campaign, generated significant social engagement.',
  },
  {
    id: 'mv3',
    title: 'Gravity Well',
    category: 'music-video',
    categoryLabel: 'Music Video Animation',
    type: '2D Motion + Compositing',
    result: 'Music blog feature',
    thumbnail: 'https://images.pexels.com/photos/8041345/pexels-photo-8041345.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    brief: 'A 2D animated music video with compositing, following characters falling through a surreal dreamscape.',
    concept: 'Gravity as metaphor for emotional pull, with characters drifting through shifting 2D landscapes that bend and warp.',
    processVisuals: [
      'https://images.pexels.com/photos/5488369/pexels-photo-5488369.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/8041226/pexels-photo-8041226.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    videoEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoUrl: '',
    outcome: 'Featured on multiple music blogs, praised for its inventive visual storytelling.',
  },
];

export const characterDesignProjects: Project[] = [
  {
    id: 'cd1',
    title: 'Lunar Sentinel',
    category: 'character-design',
    categoryLabel: 'Character Design',
    type: 'Original Character Design',
    result: 'Mascot for indie music label',
    thumbnail: 'https://images.pexels.com/photos/8041225/pexels-photo-8041225.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    brief: 'A full character design for an indie music label mascot, including turnaround sheets and expression variations.',
    concept: 'A celestial guardian figure blending futuristic streetwear with lunar motifs, designed to feel approachable yet otherworldly.',
    processVisuals: [
      'https://images.pexels.com/photos/2510431/pexels-photo-2510431.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/8041226/pexels-photo-8041226.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    videoEmbedUrl: '',
    videoUrl: '',
    outcome: 'Adopted as the label official mascot across all social channels and merchandise.',
  },
  {
    id: 'cd2',
    title: 'Static Prince',
    category: 'character-design',
    categoryLabel: 'Character Design',
    type: 'Character Concept Art',
    result: 'Used in animated music video',
    thumbnail: 'https://images.pexels.com/photos/15116104/pexels-photo-15116104.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    brief: 'A character concept designed for a music video protagonist, with full color palette and costume variations.',
    concept: 'A digital age prince with glitching pixel textures woven into royal garments, symbolizing the collision of tradition and technology.',
    processVisuals: [
      'https://images.pexels.com/photos/7321295/pexels-photo-7321295.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/15465095/pexels-photo-15465095.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    videoEmbedUrl: '',
    videoUrl: '',
    outcome: 'Character became the visual anchor for the artist entire album campaign.',
  },
  {
    id: 'cd3',
    title: 'Echo Sprite',
    category: 'character-design',
    categoryLabel: 'Character Design',
    type: 'Creature Design',
    result: 'Featured in AMV intro sequence',
    thumbnail: 'https://images.pexels.com/photos/8659276/pexels-photo-8659276.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    brief: 'A creature design created for an AMV intro, blending organic and mechanical elements into a single cohesive being.',
    concept: 'A sound based lifeform whose body pulses and shifts with the music, with translucent panels revealing an inner core of light.',
    processVisuals: [
      'https://images.pexels.com/photos/8168564/pexels-photo-8168564.png?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/8896511/pexels-photo-8896511.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    videoEmbedUrl: '',
    videoUrl: '',
    outcome: 'The intro sequence gained significant attention, with fans requesting the creature as a recurring motif.',
  },
];

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export const milestones: Milestone[] = [
  {
    year: '2022',
    title: 'Discovering the Craft',
    description: 'Started learning 2D animation and video editing through personal AMV projects, building foundational skills in motion design and visual storytelling.',
  },
  {
    year: '2023',
    title: 'Going Professional',
    description: 'Launched ABDULSALAMARTS across social platforms and began taking commissioned cover art and animation work from independent artists, building a reputation for reliable, high quality delivery.',
  },
  {
    year: '2024',
    title: 'Expanding the Toolkit',
    description: 'Added 3D motion design and advanced compositing to the workflow, enabling more ambitious projects like full animated music videos and brand campaign visuals.',
  },
  {
    year: '2025',
    title: 'Growing the Client Base',
    description: 'Reached over 50 clients and 100 completed projects, with work generating tens of thousands of views across platforms and repeat commissions becoming the norm.',
  },
  {
    year: '2026',
    title: 'Scaling the Vision',
    description: 'Now focused on long form animated music videos and ongoing creative partnerships, helping artists build a consistent visual identity across every release.',
  },
];

export interface Stat {
  label: string;
  value: number;
  suffix: string;
}

export const stats: Stat[] = [
  { label: 'Projects Completed', value: 100, suffix: '+' },
  { label: 'Clients Worked With', value: 50, suffix: '+' },
  { label: 'Years of Experience', value: 4, suffix: '' },
  { label: 'Views Generated', value: 100, suffix: 'K+' },
];

export interface GalleryItem {
  src: string;
  alt: string;
  span: boolean;
}

export const galleryItems: GalleryItem[] = [
  { src: 'https://images.pexels.com/photos/9128851/pexels-photo-9128851.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Workspace setup with neon lighting', span: false },
  { src: 'https://images.pexels.com/photos/38392131/pexels-photo-38392131.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Editing desk in neon-lit room', span: false },
  { src: 'https://images.pexels.com/photos/6199739/pexels-photo-6199739.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Night city lights abstract', span: true },
  { src: 'https://images.pexels.com/photos/9128859/pexels-photo-9128859.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Computer desk with neon lights', span: false },
  { src: 'https://images.pexels.com/photos/37897851/pexels-photo-37897851.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Light painting with neon trails', span: false },
  { src: 'https://images.pexels.com/photos/33888376/pexels-photo-33888376.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Dimly lit gaming PC setup', span: false },
  { src: 'https://images.pexels.com/photos/22809489/pexels-photo-22809489.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Light trails around glass sphere', span: true },
  { src: 'https://images.pexels.com/photos/20120130/pexels-photo-20120130.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Abstract overlapping light lines', span: false },
  { src: 'https://images.pexels.com/photos/36389508/pexels-photo-36389508.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Home office with neon lights', span: false },
];

export const socialLinks = {
  instagram: 'https://www.instagram.com/abdulsalamarts/',
  discord: 'https://discord.gg/3PBKbxM',
  telegram: 'https://t.me/abdulsalamarts',
  fiverr: 'https://www.fiverr.com/s/d0D9dR6',
};

export const fiverrLink = 'https://www.fiverr.com/s/d0D9dR6';

export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Stats', href: '#stats' },
  { label: 'Contact', href: '#contact' },
];
