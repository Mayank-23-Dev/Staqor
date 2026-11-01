"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import gsap from "gsap";
import { createClient } from "@/lib/supabase/client";
import { getAppUrl } from "@/lib/auth/url";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import {
  ArrowRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Sparkles,
  Lock,
  Mail,
  Terminal,
} from "lucide-react";
export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const router = useRouter();
  const supabase = createClient();

  // Autologin redirect if user is already authenticated
  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        router.replace("/problems");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        router.replace("/problems");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  // 3D GSAP Tilt Ref
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 6;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      scale: 1.01,
      duration: 0.3,
      ease: "power2.out",
    });

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0.8,
        x: x - rect.width / 2,
        y: y - rect.height / 2,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: "elastic.out(1, 0.7)",
    });

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0,
        duration: 0.4,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      const appUrl = getAppUrl();
      const { data, error: authError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            name: name.trim(),
            full_name: name.trim(),
            username: name.trim(),
          },
          emailRedirectTo: `${appUrl}/auth/callback?next=/problems`,
        },
      });

      if (authError) {
        throw authError;
      }

      if (data.session) {
        router.push("/problems");
        router.refresh();
      } else {
        setSuccessMessage("Account created! Please check your email inbox to confirm your registration.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setGoogleLoading(true);
    try {
      const appUrl = getAppUrl();
      const { error: oauthErr } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${appUrl}/auth/callback?next=/problems`,
        },
      });
      if (oauthErr) throw oauthErr;
    } catch (err: any) {
      setError(err.message || "Failed to authenticate with Google.");
      setGoogleLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0A0A0F] text-[#F5F5F7] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Grid & Ambient Blur */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(to right, #26262E 1px, transparent 1px),
            linear-gradient(to bottom, #26262E 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0.1) 100%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0.1) 100%)",
        }}
      />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#ABDAC8]/15 via-[#ABDAC8]/5 to-transparent blur-[140px] pointer-events-none z-0" />

      {/* Top Left Home Back Link */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white px-3 py-1.5 rounded-full bg-[#111117] border border-[#26262E] hover:border-[#ABDAC8]/40 transition-all"
        >
          <span>← Back to Staqor</span>
        </Link>
      </div>

      <div style={{ perspective: "1000px" }} className="w-full max-w-md mx-auto z-10">
        <Card
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full bg-[#111117] border-[#26262E] relative shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_40px_rgba(171,218,200,0.06)] rounded-3xl p-6 sm:p-8 overflow-hidden will-change-transform transition-colors hover:border-[#ABDAC8]/50"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Dynamic Specular Light Glow */}
          <div
            ref={glowRef}
            className="absolute w-72 h-72 rounded-full pointer-events-none opacity-0 blur-3xl -translate-x-1/2 -translate-y-1/2 z-0"
            style={{
              background: "radial-gradient(circle, rgba(171,218,200,0.2) 0%, transparent 70%)",
              left: "50%",
              top: "50%",
            }}
          />

          {/* Ambient Top Glow */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(171,218,200,0.22),transparent_100%)] pointer-events-none z-0" />

          <div className="relative z-10 space-y-6">
            {/* Logo & Header */}
            <div className="text-center space-y-2">
              <Link href="/" className="inline-block transition-transform hover:scale-105">
                <Logo />
              </Link>
              <h1 className="text-2xl font-bold font-sans text-white tracking-tight pt-2">
                Create Staqor Account
              </h1>
              <p className="text-xs text-zinc-400 font-sans">
                Practice Frontend UI, Backend APIs, and SQL challenges with sub-2.5s AI scoring.
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/40 text-rose-400 text-xs flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {successMessage ? (
              <div className="p-6 rounded-2xl bg-[#111614] border border-[#4ADE80]/40 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#4ADE80] mx-auto animate-pulse" />
                <h3 className="text-sm font-bold text-white">Confirm Your Email</h3>
                <p className="text-xs text-zinc-300 leading-relaxed">{successMessage}</p>
                <Link href="/login" className="block pt-2">
                  <Button variant="outline" className="w-full border-[#26262E] hover:border-[#ABDAC8] text-xs font-mono">
                    Back to Sign In
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                {/* Google OAuth Button */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleLogin}
                  disabled={googleLoading || loading}
                  className="w-full bg-[#16161F] border-[#26262E] hover:bg-[#1E1E2A] text-white hover:border-[#ABDAC8]/40 text-xs font-semibold h-11 rounded-xl gap-2.5 shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  {googleLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-[#ABDAC8]" />
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                  )}
                  <span>{googleLoading ? "Connecting to Google..." : "Sign up with Google"}</span>
                </Button>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#26262E]" />
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase">
                    <span className="bg-[#111117] px-3 text-zinc-500 font-mono tracking-wider">
                      or register with email
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5 text-left">
                    <Label htmlFor="name" className="text-xs text-zinc-300 font-medium">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Alex Rivers"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-[#0B0B10] border-[#26262E] focus-visible:border-[#ABDAC8] focus-visible:ring-[#ABDAC8]/30 text-white text-xs h-10 rounded-xl transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <Label htmlFor="email" className="text-xs text-zinc-300 font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="alex@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-[#0B0B10] border-[#26262E] focus-visible:border-[#ABDAC8] focus-visible:ring-[#ABDAC8]/30 text-white text-xs h-10 rounded-xl transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <Label htmlFor="password" className="text-xs text-zinc-300 font-medium">
                      Password (min 6 characters)
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-[#0B0B10] border-[#26262E] focus-visible:border-[#ABDAC8] focus-visible:ring-[#ABDAC8]/30 text-white text-xs h-10 rounded-xl transition-all"
                      minLength={6}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-b from-[#ABDAC8] via-[#ABDAC8] to-[#7BC4A8] hover:from-[#c2e8dc] hover:to-[#8cd4b9] text-[#0A0A0F] font-extrabold text-xs h-11 rounded-xl shadow-lg shadow-[#ABDAC8]/25 hover:shadow-xl hover:shadow-[#ABDAC8]/35 border border-[#ABDAC8]/40 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : null}
                    <span>{loading ? "Creating account..." : "Create Free Account"}</span>
                    {!loading && <ArrowRight className="w-3.5 h-3.5 ml-2" />}
                  </Button>
                </form>

                {/* Footer Link */}
                <div className="pt-2 text-center text-xs text-zinc-400">
                  Already have an account?{" "}
                  <Link href="/login" className="text-[#ABDAC8] font-bold hover:underline">
                    Sign In
                  </Link>
                </div>
              </>
            )}
          </div>
        </Card>
      </div>

      {/* Bottom Proof Strip */}
      <div className="mt-8 flex items-center justify-center gap-6 text-[11px] font-mono text-zinc-500 z-10">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#ABDAC8]" /> Sub-2.5s AI Evaluation
        </span>
        <span className="hidden sm:flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-[#ABDAC8]" /> All Engineering Domains
        </span>
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#ABDAC8]" /> Free Forever Starter
        </span>
      </div>
    </main>
  );
}
