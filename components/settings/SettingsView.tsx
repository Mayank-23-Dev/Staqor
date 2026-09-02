"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { LogoIcon } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/sonner";
import {
  ArrowLeft,
  User,
  Sliders,
  Bell,
  Shield,
  Code2,
  Save,
  Loader2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export function SettingsView() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Profile Form States
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");

  // Editor Preferences
  const [fontSize, setFontSize] = useState("13");
  const [tabSize, setTabSize] = useState("2");
  const [autoSave, setAutoSave] = useState(true);
  const [minimap, setMinimap] = useState(false);

  // Notification States
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [streakReminders, setStreakReminders] = useState(true);

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function loadUser() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUser(user);
          const meta = user.user_metadata || {};
          setFullName(meta.full_name || meta.name || "");
          setUsername(meta.username || meta.user_name || user.email?.split("@")[0] || "");
          setBio(meta.bio || "Full-stack developer building on Staqor.");
          setGithub(meta.github || "");
          setLinkedin(meta.linkedin || "");
        }
      } catch {
        // anonymous
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, [supabase]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (!user) {
        toast.error("Please sign in to update your profile settings.");
        setSaving(false);
        return;
      }

      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          username: username,
          bio: bio,
          github: github,
          linkedin: linkedin,
        },
      });

      if (error) throw error;
      toast.success("Profile settings updated successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile settings.");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveEditor = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "staqor_editor_prefs",
        JSON.stringify({ fontSize, tabSize, autoSave, minimap })
      );
    }
    toast.success("Editor preferences saved!");
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F5F5F7] flex flex-col selection:bg-[#A7DDC9] selection:text-[#0A0A0F]">
      {/* Top Navigation Bar */}
      <header className="h-14 border-b border-[#26262E] bg-[#111117]/90 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/problems"
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group select-none text-xs font-mono"
            title="Back to Problems"
          >
            <LogoIcon variant="aqua" className="w-5 h-5 group-hover:scale-105 transition-transform" />
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Problems</span>
          </Link>
          <div className="h-4 w-px bg-[#26262E]" />
          <h1 className="font-bold text-sm text-white tracking-tight">Account & Workspace Settings</h1>
        </div>
      </header>

      {/* Main Settings Container */}
      <main className="flex-1 container mx-auto max-w-4xl px-4 sm:px-6 py-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-white">Settings</h2>
            <p className="text-xs text-zinc-400 mt-1">
              Manage your Staqor profile, developer preferences, editor configuration, and notification alerts.
            </p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="bg-[#111117] border border-[#26262E] p-1 rounded-xl">
              <TabsTrigger
                value="profile"
                className="data-[state=active]:bg-[#1E1E2E] data-[state=active]:text-[#A7DDC9] text-xs font-mono gap-1.5"
              >
                <User className="w-3.5 h-3.5" /> Profile
              </TabsTrigger>
              <TabsTrigger
                value="editor"
                className="data-[state=active]:bg-[#1E1E2E] data-[state=active]:text-[#A7DDC9] text-xs font-mono gap-1.5"
              >
                <Code2 className="w-3.5 h-3.5" /> Code Editor
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="data-[state=active]:bg-[#1E1E2E] data-[state=active]:text-[#A7DDC9] text-xs font-mono gap-1.5"
              >
                <Bell className="w-3.5 h-3.5" /> Notifications
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="data-[state=active]:bg-[#1E1E2E] data-[state=active]:text-[#A7DDC9] text-xs font-mono gap-1.5"
              >
                <Shield className="w-3.5 h-3.5" /> Security
              </TabsTrigger>
            </TabsList>

            {/* 1. Profile Settings Tab */}
            <TabsContent value="profile">
              <Card className="bg-[#111117] border-[#26262E]">
                <form onSubmit={handleSaveProfile}>
                  <CardHeader className="p-5 pb-3">
                    <CardTitle className="text-sm font-bold text-white">Public Profile Information</CardTitle>
                    <CardDescription className="text-xs text-zinc-400">
                      This information will be displayed on your verified recruiter portfolio page.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-5 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs text-zinc-300 font-mono">Full Name</Label>
                        <Input
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Simran Dev"
                          className="h-9 bg-[#0A0A0F] border-[#26262E] text-xs"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs text-zinc-300 font-mono">Username</Label>
                        <Input
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="e.g. simran_dev"
                          className="h-9 bg-[#0A0A0F] border-[#26262E] text-xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs text-zinc-300 font-mono">Developer Bio</Label>
                      <Input
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Brief summary of your development expertise"
                        className="h-9 bg-[#0A0A0F] border-[#26262E] text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1.5">
                        <Label className="text-xs text-zinc-300 font-mono">GitHub Profile Handle</Label>
                        <Input
                          value={github}
                          onChange={(e) => setGithub(e.target.value)}
                          placeholder="e.g. simran"
                          className="h-9 bg-[#0A0A0F] border-[#26262E] text-xs"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs text-zinc-300 font-mono">LinkedIn Handle</Label>
                        <Input
                          value={linkedin}
                          onChange={(e) => setLinkedin(e.target.value)}
                          placeholder="e.g. in/simran-dev"
                          className="h-9 bg-[#0A0A0F] border-[#26262E] text-xs"
                        />
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="p-5 pt-0 flex justify-end">
                    <Button
                      type="submit"
                      disabled={saving}
                      className="h-8 px-4 text-xs font-mono font-bold bg-[#A7DDC9] text-[#0A0A0F] hover:bg-[#A7DDC9]/90 gap-1.5"
                    >
                      {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                      <span>Save Profile Changes</span>
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            {/* 2. Code Editor Preferences Tab */}
            <TabsContent value="editor">
              <Card className="bg-[#111117] border-[#26262E]">
                <CardHeader className="p-5 pb-3">
                  <CardTitle className="text-sm font-bold text-white">Monaco Code Editor Configuration</CardTitle>
                  <CardDescription className="text-xs text-zinc-400">
                    Customize your coding workspace font, tab sizing, and auto-save behavior.
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs text-zinc-300 font-mono">Font Size (px)</Label>
                      <Input
                        type="number"
                        min={11}
                        max={20}
                        value={fontSize}
                        onChange={(e) => setFontSize(e.target.value)}
                        className="h-9 bg-[#0A0A0F] border-[#26262E] text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs text-zinc-300 font-mono">Tab Size (Spaces)</Label>
                      <Input
                        type="number"
                        min={2}
                        max={4}
                        value={tabSize}
                        onChange={(e) => setTabSize(e.target.value)}
                        className="h-9 bg-[#0A0A0F] border-[#26262E] text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#0A0A0F] border border-[#26262E]">
                    <div className="space-y-0.5">
                      <div className="text-xs font-semibold text-white">Auto-Save Code Changes</div>
                      <div className="text-[11px] text-zinc-400">Automatically save challenge work to browser storage</div>
                    </div>
                    <Switch checked={autoSave} onCheckedChange={setAutoSave} />
                  </div>
                </CardContent>

                <CardFooter className="p-5 pt-0 flex justify-end">
                  <Button
                    onClick={handleSaveEditor}
                    className="h-8 px-4 text-xs font-mono font-bold bg-[#A7DDC9] text-[#0A0A0F] hover:bg-[#A7DDC9]/90 gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Editor Settings</span>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* 3. Notifications Tab */}
            <TabsContent value="notifications">
              <Card className="bg-[#111117] border-[#26262E]">
                <CardHeader className="p-5 pb-3">
                  <CardTitle className="text-sm font-bold text-white">Email & Activity Notifications</CardTitle>
                  <CardDescription className="text-xs text-zinc-400">
                    Control when Staqor notifies you about streaks, submissions, and platform updates.
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#0A0A0F] border border-[#26262E]">
                    <div className="space-y-0.5">
                      <div className="text-xs font-semibold text-white">Daily Streak Reminders</div>
                      <div className="text-[11px] text-zinc-400">Get notified to maintain your daily coding streak</div>
                    </div>
                    <Switch checked={streakReminders} onCheckedChange={setStreakReminders} />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#0A0A0F] border border-[#26262E]">
                    <div className="space-y-0.5">
                      <div className="text-xs font-semibold text-white">AI Evaluation Score Reports</div>
                      <div className="text-[11px] text-zinc-400">Receive summary reports of your passed challenge evaluations</div>
                    </div>
                    <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 4. Security Tab */}
            <TabsContent value="security">
              <Card className="bg-[#111117] border-[#26262E]">
                <CardHeader className="p-5 pb-3">
                  <CardTitle className="text-sm font-bold text-white">Security & Authenticated Session</CardTitle>
                  <CardDescription className="text-xs text-zinc-400">
                    Manage session authentication and security credentials.
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-5 space-y-3">
                  <div className="p-3 rounded-lg bg-[#0A0A0F] border border-[#26262E] flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-white">Active Session</div>
                      <div className="text-zinc-400 text-[11px] font-mono">{user?.email || "Anonymous Session"}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold">
                      Authenticated
                    </span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}