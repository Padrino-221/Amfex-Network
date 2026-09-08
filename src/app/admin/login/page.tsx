"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/lib/admin-auth";

export default function LoginPage() {
  const { login, user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user) {
    return (
      <main className="min-h-screen bg-charcoal flex items-center justify-center p-6">
        <div className="bg-white rounded-xl border border-charcoal/10 p-8 max-w-md w-full text-center">
          <h1 className="text-xl font-bold text-charcoal mb-2">Already signed in</h1>
          <p className="text-sm text-charcoal/60 mb-5">You are logged in as {user.full_name}.</p>
          <Link href="/admin" className="btn-primary w-full justify-center">
            Go to dashboard
          </Link>
        </div>
      </main>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-[420px]">
        <div className="bg-white rounded-2xl border border-charcoal/10 p-8 sm:p-9">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-xl bg-charcoal flex items-center justify-center">
              <Image src="/logo.png" alt="Amfex logo" width={36} height={36} className="w-9 h-9 object-contain" priority />
            </div>
          </div>

          <h1 className="text-[18px] font-bold leading-[0.9] tracking-[-0.02em] text-charcoal text-center whitespace-nowrap" style={{ fontSize: '18px' }}>
            Amfex CMS
          </h1>
          <p className="text-[13px] text-charcoal/60 mt-2 mb-8 text-center">Sign in to manage site content.</p>

          {error && (
            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="block text-[13px] font-semibold text-charcoal mb-1.5">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@amfex.network"
                className="w-full px-3.5 py-3 text-[14px] text-charcoal bg-white border border-charcoal/15 rounded-lg focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal placeholder:text-charcoal/30"
                autoFocus
                required
              />
            </label>
            <label className="block">
              <span className="block text-[13px] font-semibold text-charcoal mb-1.5">Password</span>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 pr-10 py-3 text-[14px] text-charcoal bg-white border border-charcoal/15 rounded-lg focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal placeholder:text-charcoal/30"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-charcoal/40 hover:text-charcoal"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </label>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-charcoal text-white font-bold text-[13px] tracking-[0.08em] uppercase py-3.5 rounded-lg hover:bg-charcoal/90 transition-colors disabled:opacity-60"
            >
              {submitting ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <Link href="/" className="flex items-center justify-center gap-1.5 text-xs text-charcoal/60 mt-6 hover:text-charcoal transition-colors">
            <span>←</span> Back to site
          </Link>
        </div>
      </div>
    </main>
  );
}
