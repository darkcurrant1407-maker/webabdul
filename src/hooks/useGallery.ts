import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { galleryItems, type GalleryItem } from '@/data/portfolio';

export interface DbGalleryImage {
  id: string;
  title: string;
  image_url: string;
  alt: string;
  span: boolean;
  sort_order: number;
}

export function useGallery() {
  const [items, setItems] = useState<GalleryItem[]>(galleryItems);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  const load = useCallback(async () => {
    if (!supabase) {
      setUsingFallback(true);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      setUsingFallback(true);
      setLoading(false);
      return;
    }

    const mapped = (data as DbGalleryImage[]).map((d) => ({
      src: d.image_url,
      alt: d.alt || d.title,
      span: d.span,
    }));
    setItems(mapped);
    setUsingFallback(false);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { items, loading, usingFallback, reload: load };
}
