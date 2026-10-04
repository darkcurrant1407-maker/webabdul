import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  featuredWork,
  coverArtProjects,
  amvProjects,
  musicVideoProjects,
  characterDesignProjects,
  type Project,
} from '@/data/portfolio';

export interface DbProject {
  id: string;
  title: string;
  category: string;
  category_label: string;
  type: string;
  result: string;
  thumbnail: string;
  brief: string;
  concept: string;
  process_visuals: string[];
  video_embed_url: string;
  video_url: string;
  outcome: string;
  featured: boolean;
  sort_order: number;
  created_at: string;
}

function toProject(db: DbProject): Project {
  return {
    id: db.id,
    title: db.title,
    category: db.category as Project['category'],
    categoryLabel: db.category_label,
    type: db.type,
    result: db.result,
    thumbnail: db.thumbnail,
    brief: db.brief,
    concept: db.concept,
    processVisuals: db.process_visuals ?? [],
    videoEmbedUrl: db.video_embed_url,
    videoUrl: db.video_url ?? '',
    outcome: db.outcome,
  };
}

export function useProjects() {
  const [featured, setFeatured] = useState<Project[]>(featuredWork);
  const [coverArt, setCoverArt] = useState<Project[]>(coverArtProjects);
  const [amv, setAmv] = useState<Project[]>(amvProjects);
  const [musicVideo, setMusicVideo] = useState<Project[]>(musicVideoProjects);
  const [characterDesign, setCharacterDesign] = useState<Project[]>(characterDesignProjects);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  const load = useCallback(async () => {
    if (!supabase) {
      setUsingFallback(true);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      setUsingFallback(true);
      setLoading(false);
      return;
    }

    const mapped = (data as DbProject[]).map(toProject);
    const dbData = data as DbProject[];

    const featuredItems = mapped.filter((_, i) => dbData[i].featured);
    setFeatured(featuredItems.length > 0 ? featuredItems : mapped.slice(0, 4));
    setCoverArt(mapped.filter((p) => p.category === 'cover-art'));
    setAmv(mapped.filter((p) => p.category === 'amv'));
    setMusicVideo(mapped.filter((p) => p.category === 'music-video'));
    setCharacterDesign(mapped.filter((p) => p.category === 'character-design'));
    setUsingFallback(false);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { featured, coverArt, amv, musicVideo, characterDesign, loading, usingFallback, reload: load };
}
