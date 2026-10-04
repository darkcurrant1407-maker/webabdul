import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Session } from '@supabase/supabase-js';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import FeaturedWork from '@/components/FeaturedWork';
import Portfolio from '@/components/Portfolio';
import About from '@/components/About';
import Gallery from '@/components/Gallery';
import Stats from '@/components/Stats';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminDashboard from '@/components/admin/AdminDashboard';

function isAdminRoute() {
  return window.location.pathname.startsWith('/admin');
}

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const isAdmin = isAdminRoute();

  useEffect(() => {
    if (!supabase) {
      setAuthLoading(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  if (isAdmin) {
    if (authLoading) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#0B0B0F]">
          <p className="text-[#A8A3B8]">Loading...</p>
        </div>
      );
    }
    return session ? <AdminDashboard /> : <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-[#0B0B0F]">
      <Navigation />
      <main>
        <Hero />
        <FeaturedWork />
        <Portfolio />
        <About />
        <Gallery />
        <Stats />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
