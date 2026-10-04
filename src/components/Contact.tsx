import { useState } from 'react';
import { Instagram, Briefcase, MessageCircle, Send, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import AnimatedBackground from './AnimatedBackground';
import { supabase } from '@/lib/supabase';
import { socialLinks, fiverrLink } from '@/data/portfolio';

const projectTypes = ['Cover Art', 'Animated Cover Art', '15 Second Animation', '30 Second Animation', 'Full Animated Music Video', 'AMV Edit', 'Other'];
const pricingTiers = [
  { label: 'Cover Art  ·  $50 to $80', value: 'Cover Art · $50 to $80' },
  { label: 'Animated Cover Art  ·  $80 to $120', value: 'Animated Cover Art · $80 to $120' },
  { label: '15 Second Animation  ·  $100', value: '15 Second Animation · $100' },
  { label: '30 Second Animation  ·  $250', value: '30 Second Animation · $250' },
  { label: 'Full Animated Music Video  ·  $400', value: 'Full Animated Music Video · $400' },
  { label: 'Not sure yet, let\'s discuss', value: 'Not sure yet' },
];
const timelines = ['ASAP', 'Within 2 weeks', 'Within 4 weeks', 'Within 2 months', 'Flexible'];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    project_type: '',
    pricing_tier: '',
    timeline: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.project_type || !formData.pricing_tier || !formData.timeline || !formData.message) {
      setStatus('error');
      return;
    }
    setStatus('submitting');
    try {
      if (!supabase) throw new Error('Database not configured');
      const { error } = await supabase.from('contact_submissions').insert({
        name: formData.name,
        project_type: formData.project_type,
        budget_range: formData.pricing_tier,
        timeline: formData.timeline,
        message: formData.message,
      });
      if (error) throw error;
      setStatus('success');
      setFormData({ name: '', project_type: '', pricing_tier: '', timeline: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const inputClass =
    'w-full rounded-xl border border-[rgba(203,200,223,0.12)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-sm text-[#F5F3FA] placeholder:text-[#A8A3B8]/60 transition-all duration-200 focus:border-[#7A64FF] focus:outline-none focus:ring-1 focus:ring-[#7A64FF]';
  const labelClass = 'mb-2 block text-xs font-medium uppercase tracking-wider text-[#A8A3B8]';

  return (
    <section id="contact" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0F] via-[#130D1F] to-[#0B0B0F]" />
      <AnimatedBackground intensity="subtle" />

      <div className="relative z-10 mx-auto max-w-2xl px-6">
        <ScrollReveal>
          <div className="text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-[#7A64FF]">
              Contact
            </p>
            <h2 className="font-display text-4xl italic text-[#F5F3FA] sm:text-5xl">
              Let's Create Something
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#A8A3B8]">
              Every great visual starts with a conversation. Tell me about your vision and I'll get back to you within 48 hours.
            </p>
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-[rgba(203,200,223,0.09)] bg-[rgba(255,255,255,0.03)] px-4 py-4 text-center transition-all duration-300 hover:border-[#7A64FF]/30 hover:bg-[rgba(122,100,255,0.06)]">
                <p className="text-xs font-medium uppercase tracking-wider text-[#A8A3B8]">Cover Art</p>
                <p className="mt-2 text-lg font-semibold text-[#F5F3FA]">$50<span className="text-sm text-[#A8A3B8]"> to </span>$80</p>
              </div>
              <div className="rounded-xl border border-[rgba(203,200,223,0.09)] bg-[rgba(255,255,255,0.03)] px-4 py-4 text-center transition-all duration-300 hover:border-[#7A64FF]/30 hover:bg-[rgba(122,100,255,0.06)]">
                <p className="text-xs font-medium uppercase tracking-wider text-[#A8A3B8]">Animated Cover</p>
                <p className="mt-2 text-lg font-semibold text-[#F5F3FA]">$80<span className="text-sm text-[#A8A3B8]"> to </span>$120</p>
              </div>
              <div className="rounded-xl border border-[rgba(203,200,223,0.09)] bg-[rgba(255,255,255,0.03)] px-4 py-4 text-center transition-all duration-300 hover:border-[#7A64FF]/30 hover:bg-[rgba(122,100,255,0.06)]">
                <p className="text-xs font-medium uppercase tracking-wider text-[#A8A3B8]">15 Second Animation</p>
                <p className="mt-2 text-lg font-semibold text-[#F5F3FA]">$100</p>
              </div>
              <div className="rounded-xl border border-[rgba(203,200,223,0.09)] bg-[rgba(255,255,255,0.03)] px-4 py-4 text-center transition-all duration-300 hover:border-[#7A64FF]/30 hover:bg-[rgba(122,100,255,0.06)]">
                <p className="text-xs font-medium uppercase tracking-wider text-[#A8A3B8]">30 Second Animation</p>
                <p className="mt-2 text-lg font-semibold text-[#F5F3FA]">$250</p>
              </div>
              <div className="col-span-2 rounded-xl border border-[#7A64FF]/20 bg-[rgba(122,100,255,0.06)] px-4 py-4 text-center transition-all duration-300 hover:border-[#7A64FF]/40 hover:bg-[rgba(122,100,255,0.1)]">
                <p className="text-xs font-medium uppercase tracking-wider text-[#7A64FF]">Full Animated Music Video</p>
                <p className="mt-2 text-lg font-semibold text-[#F5F3FA]">$400</p>
                <p className="mt-0.5 text-xs text-[#A8A3B8]">Final price depends on duration, number of characters, and animation complexity</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <form onSubmit={handleSubmit} className="mt-12 space-y-5">
            <div>
              <label className={labelClass} htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div>
                <label className={labelClass} htmlFor="project_type">Project Type</label>
                <select id="project_type" name="project_type" value={formData.project_type} onChange={handleChange} className={inputClass}>
                  <option value="" className="bg-[#13101C]">Select...</option>
                  {projectTypes.map((t) => (
                    <option key={t} value={t} className="bg-[#13101C]">{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass} htmlFor="pricing_tier">Service & Price</label>
                <select id="pricing_tier" name="pricing_tier" value={formData.pricing_tier} onChange={handleChange} className={inputClass}>
                  <option value="" className="bg-[#13101C]">Select...</option>
                  {pricingTiers.map((p) => (
                    <option key={p.value} value={p.value} className="bg-[#13101C]">{p.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass} htmlFor="timeline">Timeline</label>
                <select id="timeline" name="timeline" value={formData.timeline} onChange={handleChange} className={inputClass}>
                  <option value="" className="bg-[#13101C]">Select...</option>
                  {timelines.map((t) => (
                    <option key={t} value={t} className="bg-[#13101C]">{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Describe your vision, the song or concept, and any references you have in mind..."
                className={`${inputClass} resize-none`}
              />
            </div>

            {status === 'success' && (
              <div className="flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                <CheckCircle2 size={18} />
                Message sent! I'll be in touch within 48 hours.
              </div>
            )}

            {status === 'error' && (
              <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                <AlertCircle size={18} />
                Something went wrong. Please fill all fields and try again.
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#7A64FF] px-6 py-4 text-sm font-semibold text-white shadow-[0_0_30px_rgba(122,100,255,0.3)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(122,100,255,0.5)] disabled:opacity-50"
            >
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
              <Send size={16} />
            </button>
          </form>
        </ScrollReveal>

        {/* Fiverr CTA */}
        <ScrollReveal delay={150}>
          <a
            href={fiverrLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-[#F43273]/40 bg-[#F43273]/10 px-6 py-4 text-sm font-semibold text-[#F43273] transition-all duration-300 hover:bg-[#F43273]/20 hover:shadow-[0_0_30px_rgba(244,50,115,0.3)]"
          >
            Start a Project on Fiverr
            <ExternalLink size={16} />
          </a>
        </ScrollReveal>

        {/* Social Links */}
        <ScrollReveal delay={200}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2.5 rounded-full border border-[rgba(203,200,223,0.12)] bg-[rgba(255,255,255,0.04)] px-5 py-2.5 text-sm font-medium text-[#A8A3B8] transition-all duration-300 hover:border-[#E1306C]/50 hover:text-[#F5F3FA] hover:shadow-[0_0_20px_rgba(225,48,108,0.15)]">
              <Instagram size={18} className="transition-colors group-hover:text-[#E1306C]" />
              Instagram
            </a>
            <a href={socialLinks.fiverr} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2.5 rounded-full border border-[rgba(203,200,223,0.12)] bg-[rgba(255,255,255,0.04)] px-5 py-2.5 text-sm font-medium text-[#A8A3B8] transition-all duration-300 hover:border-[#1DBF73]/50 hover:text-[#F5F3FA] hover:shadow-[0_0_20px_rgba(29,191,115,0.15)]">
              <Briefcase size={18} className="transition-colors group-hover:text-[#1DBF73]" />
              Fiverr
            </a>
            <a href={socialLinks.discord} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2.5 rounded-full border border-[rgba(203,200,223,0.12)] bg-[rgba(255,255,255,0.04)] px-5 py-2.5 text-sm font-medium text-[#A8A3B8] transition-all duration-300 hover:border-[#5865F2]/50 hover:text-[#F5F3FA] hover:shadow-[0_0_20px_rgba(88,101,242,0.15)]">
              <MessageCircle size={18} className="transition-colors group-hover:text-[#5865F2]" />
              Discord
            </a>
            <a href={socialLinks.telegram} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2.5 rounded-full border border-[rgba(203,200,223,0.12)] bg-[rgba(255,255,255,0.04)] px-5 py-2.5 text-sm font-medium text-[#A8A3B8] transition-all duration-300 hover:border-[#26A5E4]/50 hover:text-[#F5F3FA] hover:shadow-[0_0_20px_rgba(38,165,228,0.15)]">
              <Send size={18} className="transition-colors group-hover:text-[#26A5E4]" />
              Telegram
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
