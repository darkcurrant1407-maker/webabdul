import { useState, useEffect, useCallback } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  X,
  LogOut,
  Upload,
  Star,
  GripVertical,
  ArrowLeft,
  Image as ImageIcon,
  GalleryVerticalEnd,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import type { DbProject } from '@/hooks/useProjects';
import type { DbGalleryImage } from '@/hooks/useGallery';

const CATEGORIES = [
  { value: 'cover-art', label: 'Cover Art' },
  { value: 'amv', label: 'Anime Music Video' },
  { value: 'music-video', label: 'Music Video Animation' },
  { value: 'character-design', label: 'Character Design' },
];

interface EditForm {
  id?: string;
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
}

const emptyForm: EditForm = {
  title: '',
  category: 'cover-art',
  category_label: 'Cover Art',
  type: '',
  result: '',
  thumbnail: '',
  brief: '',
  concept: '',
  process_visuals: [],
  video_embed_url: '',
  video_url: '',
  outcome: '',
  featured: false,
  sort_order: 0,
};

interface GalleryEditForm {
  id?: string;
  title: string;
  image_url: string;
  alt: string;
  span: boolean;
  sort_order: number;
}

const emptyGalleryForm: GalleryEditForm = {
  title: '',
  image_url: '',
  alt: '',
  span: false,
  sort_order: 0,
};

function youtubeEmbed(url: string): string {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

export default function AdminDashboard() {
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<'projects' | 'gallery'>('projects');
  const [projects, setProjects] = useState<DbProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<EditForm | null>(null);
  const [uploading, setUploading] = useState(false);

  const [galleryImages, setGalleryImages] = useState<DbGalleryImage[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(true);
  const [editingGallery, setEditingGallery] = useState<GalleryEditForm | null>(null);
  const [galleryUploading, setGalleryUploading] = useState(false);

  const load = useCallback(async () => {
    if (!supabase) return;
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    setProjects((data as DbProject[]) ?? []);
    setLoading(false);
  }, []);

  const loadGallery = useCallback(async () => {
    if (!supabase) return;
    const { data } = await supabase.from('gallery_images').select('*').order('sort_order', { ascending: true });
    setGalleryImages((data as DbGalleryImage[]) ?? []);
    setGalleryLoading(false);
  }, []);

  useEffect(() => {
    load();
    loadGallery();
  }, [load, loadGallery]);

  const uploadFile = async (file: File, target: 'thumbnail' | `process-${number}` | 'video') => {
    if (!supabase) return;
    setUploading(true);
    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const bucket = target === 'video' ? 'project-videos' : 'project-images';
    const { error } = await supabase.storage.from(bucket).upload(fileName, file, {
      contentType: file.type || undefined,
      upsert: false,
    });

    if (error) {
      alert('Upload failed: ' + error.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(fileName);
    const url = urlData.publicUrl;

    if (!editing) return;

    if (target === 'thumbnail') {
      setEditing({ ...editing, thumbnail: url });
    } else if (target === 'video') {
      setEditing({ ...editing, video_url: url });
    } else {
      const idx = parseInt(target.split('-')[1]);
      const newVisuals = [...editing.process_visuals];
      newVisuals[idx] = url;
      setEditing({ ...editing, process_visuals: newVisuals });
    }
    setUploading(false);
  };

  const uploadGalleryImage = async (file: File) => {
    if (!supabase) return;
    setGalleryUploading(true);
    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from('gallery-images').upload(fileName, file, {
      contentType: file.type || undefined,
      upsert: false,
    });

    if (error) {
      alert('Upload failed: ' + error.message);
      setGalleryUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from('gallery-images').getPublicUrl(fileName);
    const url = urlData.publicUrl;

    if (editingGallery) {
      setEditingGallery({ ...editingGallery, image_url: url });
    }
    setGalleryUploading(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, target: 'thumbnail' | `process-${number}` | 'video') => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file, target);
    }
  };

  const saveProject = async () => {
    if (!supabase || !editing) return;

    const payload = {
      title: editing.title,
      category: editing.category,
      category_label: CATEGORIES.find((c) => c.value === editing.category)?.label ?? editing.category_label,
      type: editing.type,
      result: editing.result,
      thumbnail: editing.thumbnail,
      brief: editing.brief,
      concept: editing.concept,
      process_visuals: editing.process_visuals,
      video_embed_url: youtubeEmbed(editing.video_embed_url),
      video_url: editing.video_url,
      outcome: editing.outcome,
      featured: editing.featured,
      sort_order: editing.sort_order,
    };

    if (editing.id) {
      await supabase.from('projects').update(payload).eq('id', editing.id);
    } else {
      await supabase.from('projects').insert(payload);
    }

    setEditing(null);
    load();
  };

  const saveGalleryImage = async () => {
    if (!supabase || !editingGallery) return;

    const payload = {
      title: editingGallery.title,
      image_url: editingGallery.image_url,
      alt: editingGallery.alt,
      span: editingGallery.span,
      sort_order: editingGallery.sort_order,
    };

    if (editingGallery.id) {
      await supabase.from('gallery_images').update(payload).eq('id', editingGallery.id);
    } else {
      await supabase.from('gallery_images').insert(payload);
    }

    setEditingGallery(null);
    loadGallery();
  };

  const deleteProject = async (id: string) => {
    if (!supabase) return;
    if (!confirm('Delete this project? This cannot be undone.')) return;
    await supabase.from('projects').delete().eq('id', id);
    load();
  };

  const deleteGalleryImage = async (id: string) => {
    if (!supabase) return;
    if (!confirm('Delete this gallery image? This cannot be undone.')) return;
    await supabase.from('gallery_images').delete().eq('id', id);
    loadGallery();
  };

  const startEdit = (p: DbProject) => {
    setEditing({
      id: p.id,
      title: p.title,
      category: p.category,
      category_label: p.category_label,
      type: p.type,
      result: p.result,
      thumbnail: p.thumbnail,
      brief: p.brief,
      concept: p.concept,
      process_visuals: p.process_visuals ?? [],
      video_embed_url: p.video_embed_url,
      video_url: p.video_url ?? '',
      outcome: p.outcome,
      featured: p.featured,
      sort_order: p.sort_order,
    });
  };

  const startNew = () => {
    setEditing({ ...emptyForm, sort_order: projects.length });
  };

  const startGalleryEdit = (g: DbGalleryImage) => {
    setEditingGallery({
      id: g.id,
      title: g.title,
      image_url: g.image_url,
      alt: g.alt,
      span: g.span,
      sort_order: g.sort_order,
    });
  };

  const startNewGallery = () => {
    setEditingGallery({ ...emptyGalleryForm, sort_order: galleryImages.length });
  };

  const addProcessVisual = () => {
    if (!editing) return;
    setEditing({ ...editing, process_visuals: [...editing.process_visuals, ''] });
  };

  const updateProcessVisual = (idx: number, url: string) => {
    if (!editing) return;
    const newVisuals = [...editing.process_visuals];
    newVisuals[idx] = url;
    setEditing({ ...editing, process_visuals: newVisuals });
  };

  const removeProcessVisual = (idx: number) => {
    if (!editing) return;
    setEditing({ ...editing, process_visuals: editing.process_visuals.filter((_, i) => i !== idx) });
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F]">
      {/* Header */}
      <header className="border-b border-[rgba(203,200,223,0.09)] bg-[#13101C]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-sm text-[#A8A3B8] transition-colors hover:text-[#F5F3FA]"
            >
              <ArrowLeft size={16} />
              View site
            </a>
            <span className="text-[rgba(203,200,223,0.2)]">|</span>
            <h1 className="font-display text-xl italic text-[#F5F3FA]">
              Admin<span className="text-[#7A64FF]"> Dashboard</span>
            </h1>
          </div>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 rounded-lg border border-[rgba(203,200,223,0.12)] px-4 py-2 text-sm font-medium text-[#A8A3B8] transition-colors hover:border-[#F43273]/40 hover:text-[#F43273]"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* Tab Switcher */}
        <div className="mb-6 flex gap-2 border-b border-[rgba(203,200,223,0.09)]">
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'projects'
                ? 'border-b-2 border-[#7A64FF] text-[#F5F3FA]'
                : 'text-[#A8A3B8] hover:text-[#F5F3FA]'
            }`}
          >
            <ImageIcon size={16} />
            Projects
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'gallery'
                ? 'border-b-2 border-[#7A64FF] text-[#F5F3FA]'
                : 'text-[#A8A3B8] hover:text-[#F5F3FA]'
            }`}
          >
            <GalleryVerticalEnd size={16} />
            Behind the Scenes
          </button>
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-[#F5F3FA]">Projects</h2>
              <button
                onClick={startNew}
                className="flex items-center gap-2 rounded-lg bg-[#7A64FF] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#7A64FF]/90"
              >
                <Plus size={18} />
                Add Project
              </button>
            </div>

            {loading ? (
              <p className="py-12 text-center text-[#A8A3B8]">Loading...</p>
            ) : projects.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[rgba(203,200,223,0.15)] py-16 text-center">
                <ImageIcon size={40} className="mx-auto mb-4 text-[#A8A3B8]/40" />
                <p className="text-[#A8A3B8]">No projects yet. Click "Add Project" to create your first one.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((p) => (
                  <div
                    key={p.id}
                    className="group overflow-hidden rounded-xl border border-[rgba(203,200,223,0.09)] bg-[#13101C]"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      {p.thumbnail ? (
                        <img src={p.thumbnail} alt={p.title} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-[rgba(255,255,255,0.03)]">
                          <ImageIcon size={32} className="text-[#A8A3B8]/30" />
                        </div>
                      )}
                      {p.featured && (
                        <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-[#FFB800] px-2 py-0.5 text-xs font-semibold text-black">
                          <Star size={12} fill="black" />
                          Featured
                        </span>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                        <button
                          onClick={() => startEdit(p)}
                          className="rounded-lg bg-[#7A64FF] p-2.5 text-white transition-colors hover:bg-[#7A64FF]/80"
                          aria-label="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => deleteProject(p.id)}
                          className="rounded-lg bg-[#F43273] p-2.5 text-white transition-colors hover:bg-[#F43273]/80"
                          aria-label="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="rounded-md bg-[rgba(122,100,255,0.15)] px-2 py-0.5 text-xs font-medium text-[#7A64FF]">
                          {p.category_label}
                        </span>
                      </div>
                      <h3 className="font-semibold text-[#F5F3FA]">{p.title}</h3>
                      <p className="mt-1 text-sm text-[#A8A3B8]">{p.type}</p>
                      {p.result && <p className="mt-1 text-xs text-[#FFB800]">{p.result}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-[#F5F3FA]">Behind the Scenes</h2>
                <p className="mt-1 text-sm text-[#A8A3B8]">Add workspace shots, work in progress, and concept art.</p>
              </div>
              <button
                onClick={startNewGallery}
                className="flex items-center gap-2 rounded-lg bg-[#7A64FF] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#7A64FF]/90"
              >
                <Plus size={18} />
                Add Image
              </button>
            </div>

            {galleryLoading ? (
              <p className="py-12 text-center text-[#A8A3B8]">Loading...</p>
            ) : galleryImages.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[rgba(203,200,223,0.15)] py-16 text-center">
                <ImageIcon size={40} className="mx-auto mb-4 text-[#A8A3B8]/40" />
                <p className="text-[#A8A3B8]">No gallery images yet. Click "Add Image" to upload your first one.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {galleryImages.map((g) => (
                  <div
                    key={g.id}
                    className="group overflow-hidden rounded-xl border border-[rgba(203,200,223,0.09)] bg-[#13101C]"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      {g.image_url ? (
                        <img src={g.image_url} alt={g.alt || g.title} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-[rgba(255,255,255,0.03)]">
                          <ImageIcon size={32} className="text-[#A8A3B8]/30" />
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                        <button
                          onClick={() => startGalleryEdit(g)}
                          className="rounded-lg bg-[#7A64FF] p-2.5 text-white transition-colors hover:bg-[#7A64FF]/80"
                          aria-label="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => deleteGalleryImage(g.id)}
                          className="rounded-lg bg-[#F43273] p-2.5 text-white transition-colors hover:bg-[#F43273]/80"
                          aria-label="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="truncate text-sm font-medium text-[#F5F3FA]">{g.title || 'Untitled'}</h3>
                      {g.span && (
                        <span className="mt-1 inline-block rounded-md bg-[rgba(122,100,255,0.15)] px-2 py-0.5 text-xs font-medium text-[#7A64FF]">
                          Wide
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Project Edit / Create Modal */}
      {editing && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/80 backdrop-blur-md" onClick={() => setEditing(null)}>
          <div
            className="my-8 mx-4 w-full max-w-2xl rounded-2xl border border-[rgba(203,200,223,0.09)] bg-[#13101C] p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#F5F3FA]">
                {editing.id ? 'Edit Project' : 'New Project'}
              </h2>
              <button onClick={() => setEditing(null)} className="rounded-full bg-[rgba(255,255,255,0.08)] p-2 text-[#A8A3B8] transition-colors hover:text-[#F5F3FA]">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#A8A3B8]">Title</label>
                <input
                  type="text"
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  className="w-full rounded-lg border border-[rgba(203,200,223,0.12)] bg-[rgba(255,255,255,0.04)] px-4 py-2.5 text-sm text-[#F5F3FA] outline-none focus:border-[#7A64FF]/50"
                  placeholder="Project title"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#A8A3B8]">Category</label>
                  <select
                    value={editing.category}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                    className="w-full rounded-lg border border-[rgba(203,200,223,0.12)] bg-[rgba(255,255,255,0.04)] px-4 py-2.5 text-sm text-[#F5F3FA] outline-none focus:border-[#7A64FF]/50"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#A8A3B8]">Type</label>
                  <input
                    type="text"
                    value={editing.type}
                    onChange={(e) => setEditing({ ...editing, type: e.target.value })}
                    className="w-full rounded-lg border border-[rgba(203,200,223,0.12)] bg-[rgba(255,255,255,0.04)] px-4 py-2.5 text-sm text-[#F5F3FA] outline-none focus:border-[#7A64FF]/50"
                    placeholder="e.g. Animated Cover Art"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#A8A3B8]">Result / Achievement</label>
                <input
                  type="text"
                  value={editing.result}
                  onChange={(e) => setEditing({ ...editing, result: e.target.value })}
                  className="w-full rounded-lg border border-[rgba(203,200,223,0.12)] bg-[rgba(255,255,255,0.04)] px-4 py-2.5 text-sm text-[#F5F3FA] outline-none focus:border-[#7A64FF]/50"
                  placeholder="e.g. 2.4M+ views in first month"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#A8A3B8]">Thumbnail</label>
                <div className="flex items-center gap-3">
                  {editing.thumbnail && (
                    <img src={editing.thumbnail} alt="Thumbnail" className="h-16 w-28 rounded-lg object-cover" />
                  )}
                  <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-[rgba(203,200,223,0.12)] px-4 py-2 text-sm text-[#A8A3B8] transition-colors hover:border-[#7A64FF]/40 hover:text-[#F5F3FA]">
                    <Upload size={16} />
                    {uploading ? 'Uploading...' : 'Upload image'}
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileSelect(e, 'thumbnail')} />
                  </label>
                </div>
                <input
                  type="text"
                  value={editing.thumbnail}
                  onChange={(e) => setEditing({ ...editing, thumbnail: e.target.value })}
                  className="mt-2 w-full rounded-lg border border-[rgba(203,200,223,0.12)] bg-[rgba(255,255,255,0.04)] px-4 py-2.5 text-sm text-[#F5F3FA] outline-none focus:border-[#7A64FF]/50"
                  placeholder="Or paste an image URL"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#A8A3B8]">Brief</label>
                <textarea
                  value={editing.brief}
                  onChange={(e) => setEditing({ ...editing, brief: e.target.value })}
                  rows={2}
                  className="w-full rounded-lg border border-[rgba(203,200,223,0.12)] bg-[rgba(255,255,255,0.04)] px-4 py-2.5 text-sm text-[#F5F3FA] outline-none focus:border-[#7A64FF]/50"
                  placeholder="Short project description"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#A8A3B8]">Concept</label>
                <textarea
                  value={editing.concept}
                  onChange={(e) => setEditing({ ...editing, concept: e.target.value })}
                  rows={3}
                  className="w-full rounded-lg border border-[rgba(203,200,223,0.12)] bg-[rgba(255,255,255,0.04)] px-4 py-2.5 text-sm text-[#F5F3FA] outline-none focus:border-[#7A64FF]/50"
                  placeholder="Creative concept description"
                />
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-xs font-medium uppercase tracking-wider text-[#A8A3B8]">Process Visuals</label>
                  <button
                    type="button"
                    onClick={addProcessVisual}
                    className="flex items-center gap-1 text-xs font-medium text-[#7A64FF] transition-colors hover:text-[#F5F3FA]"
                  >
                    <Plus size={14} />
                    Add visual
                  </button>
                </div>
                <div className="space-y-2">
                  {editing.process_visuals.map((url, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      {url && <img src={url} alt={`Process ${idx + 1}`} className="h-12 w-20 rounded-lg object-cover" />}
                      <input
                        type="text"
                        value={url}
                        onChange={(e) => updateProcessVisual(idx, e.target.value)}
                        className="flex-1 rounded-lg border border-[rgba(203,200,223,0.12)] bg-[rgba(255,255,255,0.04)] px-4 py-2 text-sm text-[#F5F3FA] outline-none focus:border-[#7A64FF]/50"
                        placeholder="Image URL"
                      />
                      <label className="flex cursor-pointer items-center gap-1 rounded-lg border border-[rgba(203,200,223,0.12)] px-2.5 py-2 text-sm text-[#A8A3B8] transition-colors hover:text-[#F5F3FA]">
                        <Upload size={14} />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileSelect(e, `process-${idx}`)}
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => removeProcessVisual(idx)}
                        className="rounded-lg p-2 text-[#F43273] transition-colors hover:bg-[#F43273]/10"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#A8A3B8]">Video File</label>
                <div className="flex items-center gap-3">
                  {editing.video_url && (
                    <span className="text-xs text-[#7A64FF]">Video uploaded</span>
                  )}
                  <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-[rgba(203,200,223,0.12)] px-4 py-2 text-sm text-[#A8A3B8] transition-colors hover:border-[#7A64FF]/40 hover:text-[#F5F3FA]">
                    <Upload size={16} />
                    {uploading ? 'Uploading...' : 'Upload video'}
                    <input type="file" accept="video/*" className="hidden" onChange={(e) => handleFileSelect(e, 'video')} />
                  </label>
                </div>
                {editing.video_url && (
                  <button
                    type="button"
                    onClick={() => setEditing({ ...editing, video_url: '' })}
                    className="mt-2 text-xs text-[#F43273] transition-colors hover:text-[#F43273]/80"
                  >
                    Remove uploaded video
                  </button>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#A8A3B8]">Or paste a YouTube link</label>
                <input
                  type="text"
                  value={editing.video_embed_url}
                  onChange={(e) => setEditing({ ...editing, video_embed_url: e.target.value })}
                  className="w-full rounded-lg border border-[rgba(203,200,223,0.12)] bg-[rgba(255,255,255,0.04)] px-4 py-2.5 text-sm text-[#F5F3FA] outline-none focus:border-[#7A64FF]/50"
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#A8A3B8]">Outcome</label>
                <textarea
                  value={editing.outcome}
                  onChange={(e) => setEditing({ ...editing, outcome: e.target.value })}
                  rows={2}
                  className="w-full rounded-lg border border-[rgba(203,200,223,0.12)] bg-[rgba(255,255,255,0.04)] px-4 py-2.5 text-sm text-[#F5F3FA] outline-none focus:border-[#7A64FF]/50"
                  placeholder="Results and impact"
                />
              </div>

              <div className="flex items-center gap-6">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-[#A8A3B8]">
                  <input
                    type="checkbox"
                    checked={editing.featured}
                    onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                    className="h-4 w-4 rounded accent-[#7A64FF]"
                  />
                  Show in Featured section
                </label>
                <div className="flex items-center gap-2">
                  <GripVertical size={16} className="text-[#A8A3B8]" />
                  <input
                    type="number"
                    value={editing.sort_order}
                    onChange={(e) => setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })}
                    className="w-20 rounded-lg border border-[rgba(203,200,223,0.12)] bg-[rgba(255,255,255,0.04)] px-3 py-2 text-sm text-[#F5F3FA] outline-none focus:border-[#7A64FF]/50"
                    placeholder="Order"
                  />
                  <span className="text-xs text-[#A8A3B8]">Sort order</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setEditing(null)}
                className="rounded-lg border border-[rgba(203,200,223,0.12)] px-5 py-2.5 text-sm font-medium text-[#A8A3B8] transition-colors hover:text-[#F5F3FA]"
              >
                Cancel
              </button>
              <button
                onClick={saveProject}
                disabled={!editing.title}
                className="rounded-lg bg-[#7A64FF] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#7A64FF]/90 disabled:opacity-50"
              >
                {editing.id ? 'Save Changes' : 'Create Project'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Edit / Create Modal */}
      {editingGallery && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/80 backdrop-blur-md" onClick={() => setEditingGallery(null)}>
          <div
            className="my-8 mx-4 w-full max-w-lg rounded-2xl border border-[rgba(203,200,223,0.09)] bg-[#13101C] p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#F5F3FA]">
                {editingGallery.id ? 'Edit Gallery Image' : 'New Gallery Image'}
              </h2>
              <button onClick={() => setEditingGallery(null)} className="rounded-full bg-[rgba(255,255,255,0.08)] p-2 text-[#A8A3B8] transition-colors hover:text-[#F5F3FA]">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#A8A3B8]">Title / Caption</label>
                <input
                  type="text"
                  value={editingGallery.title}
                  onChange={(e) => setEditingGallery({ ...editingGallery, title: e.target.value })}
                  className="w-full rounded-lg border border-[rgba(203,200,223,0.12)] bg-[rgba(255,255,255,0.04)] px-4 py-2.5 text-sm text-[#F5F3FA] outline-none focus:border-[#7A64FF]/50"
                  placeholder="e.g. Workspace setup, Work in progress..."
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#A8A3B8]">Image</label>
                <div className="flex items-center gap-3">
                  {editingGallery.image_url && (
                    <img src={editingGallery.image_url} alt={editingGallery.title} className="h-20 w-20 rounded-lg object-cover" />
                  )}
                  <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-[rgba(203,200,223,0.12)] px-4 py-2 text-sm text-[#A8A3B8] transition-colors hover:border-[#7A64FF]/40 hover:text-[#F5F3FA]">
                    <Upload size={16} />
                    {galleryUploading ? 'Uploading...' : 'Upload image'}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) uploadGalleryImage(file);
                      }}
                    />
                  </label>
                </div>
                <input
                  type="text"
                  value={editingGallery.image_url}
                  onChange={(e) => setEditingGallery({ ...editingGallery, image_url: e.target.value })}
                  className="mt-2 w-full rounded-lg border border-[rgba(203,200,223,0.12)] bg-[rgba(255,255,255,0.04)] px-4 py-2.5 text-sm text-[#F5F3FA] outline-none focus:border-[#7A64FF]/50"
                  placeholder="Or paste an image URL"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#A8A3B8]">Alt Text (for accessibility)</label>
                <input
                  type="text"
                  value={editingGallery.alt}
                  onChange={(e) => setEditingGallery({ ...editingGallery, alt: e.target.value })}
                  className="w-full rounded-lg border border-[rgba(203,200,223,0.12)] bg-[rgba(255,255,255,0.04)] px-4 py-2.5 text-sm text-[#F5F3FA] outline-none focus:border-[#7A64FF]/50"
                  placeholder="Brief description of the image"
                />
              </div>

              <div className="flex items-center gap-6">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-[#A8A3B8]">
                  <input
                    type="checkbox"
                    checked={editingGallery.span}
                    onChange={(e) => setEditingGallery({ ...editingGallery, span: e.target.checked })}
                    className="h-4 w-4 rounded accent-[#7A64FF]"
                  />
                  Display as wide (spans two columns)
                </label>
                <div className="flex items-center gap-2">
                  <GripVertical size={16} className="text-[#A8A3B8]" />
                  <input
                    type="number"
                    value={editingGallery.sort_order}
                    onChange={(e) => setEditingGallery({ ...editingGallery, sort_order: parseInt(e.target.value) || 0 })}
                    className="w-20 rounded-lg border border-[rgba(203,200,223,0.12)] bg-[rgba(255,255,255,0.04)] px-3 py-2 text-sm text-[#F5F3FA] outline-none focus:border-[#7A64FF]/50"
                    placeholder="Order"
                  />
                  <span className="text-xs text-[#A8A3B8]">Sort order</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setEditingGallery(null)}
                className="rounded-lg border border-[rgba(203,200,223,0.12)] px-5 py-2.5 text-sm font-medium text-[#A8A3B8] transition-colors hover:text-[#F5F3FA]"
              >
                Cancel
              </button>
              <button
                onClick={saveGalleryImage}
                disabled={!editingGallery.image_url}
                className="rounded-lg bg-[#7A64FF] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#7A64FF]/90 disabled:opacity-50"
              >
                {editingGallery.id ? 'Save Changes' : 'Add Image'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
