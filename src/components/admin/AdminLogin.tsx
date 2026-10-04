import { useState } from 'react';
import { Lock, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function AdminLogin() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const fn = mode === 'login' ? signIn : signUp;
    const { error } = await fn(email, password);

    if (error) {
      setError(error.message);
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B0B0F] px-4">
      <div className="w-full max-w-md">
        <a
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-[#A8A3B8] transition-colors hover:text-[#F5F3FA]"
        >
          <ArrowLeft size={16} />
          Back to site
        </a>

        <div className="mb-8 text-center">
          <h1 className="font-display text-3xl italic text-[#F5F3FA]">
            ABDULSALAM<span className="text-[#7A64FF]">ARTS</span>
          </h1>
          <p className="mt-2 text-sm text-[#A8A3B8]">
            {mode === 'login' ? 'Sign in to manage your portfolio' : 'Create an admin account'}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-[rgba(203,200,223,0.09)] bg-[#13101C] p-6"
        >
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#A8A3B8]">
              Email
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8A3B8]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-[rgba(203,200,223,0.12)] bg-[rgba(255,255,255,0.04)] py-2.5 pl-10 pr-4 text-sm text-[#F5F3FA] placeholder-[#A8A3B8]/60 outline-none transition-colors focus:border-[#7A64FF]/50"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#A8A3B8]">
              Password
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8A3B8]" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-[rgba(203,200,223,0.12)] bg-[rgba(255,255,255,0.04)] py-2.5 pl-10 pr-4 text-sm text-[#F5F3FA] placeholder-[#A8A3B8]/60 outline-none transition-colors focus:border-[#7A64FF]/50"
                placeholder="Min 6 characters"
              />
            </div>
          </div>

          {error && (
            <p className="rounded-lg bg-[#F43273]/10 px-4 py-2.5 text-sm text-[#F43273]">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#7A64FF] py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#7A64FF]/90 disabled:opacity-50"
          >
            {submitting ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
            <ArrowRight size={16} />
          </button>

          <p className="text-center text-sm text-[#A8A3B8]">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login');
                setError(null);
              }}
              className="font-medium text-[#7A64FF] transition-colors hover:text-[#F5F3FA]"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
