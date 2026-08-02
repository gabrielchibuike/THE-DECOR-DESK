"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Sparkles, Mail, Lock, AlertCircle, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-brand-taupe-dark" />
            <span className="font-serif text-2xl font-bold text-brand-black">THE DECOR <span className="font-sans font-normal text-brand-taupe text-sm tracking-widest uppercase">DESK</span></span>
          </div>
          <h1 className="font-serif text-3xl font-extrabold text-brand-black">Admin Login</h1>
          <p className="text-sm text-brand-charcoal/60">Sign in to manage content</p>
        </div>

        <form onSubmit={handleLogin} className="bg-brand-warmwhite border border-brand-taupe-light rounded-xl p-8 shadow-sm space-y-5">
          <div className="space-y-1.5">
            <label htmlFor="admin-email" className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal/70">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-charcoal/40" />
              <input id="admin-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading}
                className="w-full pl-10 pr-4 py-3 bg-brand-cream border border-brand-taupe-light rounded-md text-brand-black text-sm focus:outline-none focus:ring-1 focus:ring-brand-taupe transition disabled:opacity-50"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="admin-password" className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal/70">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-charcoal/40" />
              <input id="admin-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={loading}
                className="w-full pl-10 pr-4 py-3 bg-brand-cream border border-brand-taupe-light rounded-md text-brand-black text-sm focus:outline-none focus:ring-1 focus:ring-brand-taupe transition disabled:opacity-50"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md text-xs text-red-700">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button type="submit" disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 bg-brand-black text-brand-cream text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-brand-taupe-dark transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
