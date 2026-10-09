"use client";

import React, { useState } from "react";
import Timeline from "@/components/ui/timeline";
import AgenticFactory3D from "@/components/ui/agentic-factory-3d";
import Riffle from "@/components/ui/hairline-riffle";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { Marquee } from "@/components/ui/marquee";
import {
  ArrowLeft,
  Box,
  Clock,
  Code,
  FileCode,
  Sparkles,
  Sliders,
  Sun,
  Moon,
  CreditCard,
  Keyboard,
  Info,
  Maximize2,
  Video,
  Image as ImageIcon,
  Calendar,
  FileText,
  User,
  Orbit,
  Repeat,
  Zap,
  CheckCircle2,
  Play,
  Pause,
} from "lucide-react";

const timelineSettings = {
  textColor: "var(--color-foreground, #09090b)",
  mutedTextColor: "var(--color-muted-foreground, #71717a)",
  activeColor: "#2563eb",
  backgroundColor: "var(--color-background, #fafaf9)",
  duration: 1.4,
};

const sampleMediaContent: Record<
  string,
  {
    src: string;
    poster?: string;
    background: string;
    title: string;
    date: string;
    scrollToExpand: string;
    about: { overview: string; conclusion: string };
  }
> = {
  video: {
    src: "https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-city-street-in-neon-lights-40134-large.mp4",
    poster:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    background:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80",
    title: "Immersive Video Experience",
    date: "Cosmic Journey",
    scrollToExpand: "Scroll / Wheel down to Expand",
    about: {
      overview:
        "This is a live interactive demonstration of the ScrollExpandMedia component with high-definition video. As you wheel or drag-scroll down, the media viewport dynamically expands from a subtle central card into an edge-to-edge cinematic frame.",
      conclusion:
        "The ScrollExpandMedia hero component provides a captivating landing page experience with scroll-scrubbed typography split animation and text color blending.",
    },
  },
  image: {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80",
    background:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
    title: "Dynamic Image Showcase",
    date: "Underwater Adventure",
    scrollToExpand: "Scroll / Wheel down to Expand",
    about: {
      overview:
        "This is a live demonstration of the ScrollExpandMedia component using static high-resolution imagery. The smooth expansion physics work flawlessly without video assets.",
      conclusion:
        "Ideal for showcase portfolios, product reveals, and agency case study introductions.",
    },
  },
};

const orbitalTimelineData = [
  {
    id: 1,
    title: "Planning",
    date: "Jan 2024",
    content: "Project planning and requirements gathering phase.",
    category: "Planning",
    icon: Calendar,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Design",
    date: "Feb 2024",
    content: "UI/UX design and system architecture.",
    category: "Design",
    icon: FileText,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 3,
    title: "Development",
    date: "Mar 2024",
    content: "Core features implementation and testing.",
    category: "Development",
    icon: Code,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 60,
  },
  {
    id: 4,
    title: "Testing",
    date: "Apr 2024",
    content: "User testing and bug fixes.",
    category: "Testing",
    icon: User,
    relatedIds: [3, 5],
    status: "pending" as const,
    energy: 30,
  },
  {
    id: 5,
    title: "Release",
    date: "May 2024",
    content: "Final deployment and release.",
    category: "Release",
    icon: Clock,
    relatedIds: [4],
    status: "pending" as const,
    energy: 10,
  },
];

const marqueeTechs = [
  "React 19",
  "Next.js 15",
  "TypeScript 5",
  "Tailwind CSS v4",
  "Three.js / WebGL",
  "GSAP ScrollTrigger",
  "Framer Motion",
  "Shadcn UI",
  "Vite 6",
  "Node.js",
  "Supabase",
  "GraphQL",
];

const marqueeBrands = [
  { name: "Apex Dynamics", logo: "⚡" },
  { name: "Nebula Labs", logo: "🌌" },
  { name: "Vortex Creative", logo: "🌀" },
  { name: "Quantum Systems", logo: "⚛️" },
  { name: "Prabhu Group", logo: "💎" },
  { name: "Hyperion Inc.", logo: "🚀" },
  { name: "Pulse Technologies", logo: "💓" },
  { name: "Aura Media", logo: "✨" },
];

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState<
    "all" | "timeline" | "factory" | "riffle" | "hero" | "orbital" | "marquee"
  >("all");

  const [riffleIntensity, setRiffleIntensity] = useState<number>(0.65);
  const [riffleTheme, setRiffleTheme] = useState<"auto" | "light" | "dark">("auto");
  const [riffleStatusText, setRiffleStatusText] = useState<string>(
    "Tray at rest. Hover or use arrow keys."
  );

  const [heroMediaType, setHeroMediaType] = useState<"video" | "image">("video");
  const currentHeroMedia = sampleMediaContent[heroMediaType];

  // Marquee controls
  const [marqueeDuration, setMarqueeDuration] = useState<number>(18);
  const [marqueeDirection, setMarqueeDirection] = useState<"left" | "right" | "up" | "down">("left");
  const [marqueePauseHover, setMarqueePauseHover] = useState<boolean>(true);
  const [marqueeFade, setMarqueeFade] = useState<boolean>(true);

  const navigateHome = () => {
    window.location.href = "/";
  };

  return (
    <main className="min-h-screen bg-[#FAFAF9] text-[#18181B] font-sans antialiased selection:bg-neutral-900 selection:text-white">
      {/* Top Demo Bar */}
      <header className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between px-5 py-3 rounded-2xl bg-white/90 backdrop-blur-md border border-neutral-200 shadow-sm max-w-6xl mx-auto">
        <div className="flex items-center space-x-3">
          <button
            onClick={navigateHome}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-xs font-semibold text-neutral-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Main Studio Site</span>
          </button>
          <div className="h-4 w-px bg-neutral-200" />
          <div className="flex items-center space-x-1.5 text-xs text-neutral-600 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>UI Lab Experiments</span>
          </div>
        </div>

        {/* View switcher */}
        <div className="flex items-center space-x-1 p-1 bg-neutral-100 rounded-xl border border-neutral-200 text-xs font-medium overflow-x-auto">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1 rounded-lg transition-all ${
              activeTab === "all"
                ? "bg-white text-neutral-900 shadow-2xs font-bold"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            All Components
          </button>
          <button
            onClick={() => setActiveTab("timeline")}
            className={`px-3 py-1 rounded-lg flex items-center space-x-1.5 transition-all ${
              activeTab === "timeline"
                ? "bg-white text-neutral-900 shadow-2xs font-bold"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            <Clock className="w-3 h-3 text-blue-600" />
            <span>timeline.tsx</span>
          </button>
          <button
            onClick={() => setActiveTab("factory")}
            className={`px-3 py-1 rounded-lg flex items-center space-x-1.5 transition-all ${
              activeTab === "factory"
                ? "bg-white text-neutral-900 shadow-2xs font-bold"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            <Box className="w-3 h-3 text-amber-600" />
            <span>agentic-factory-3d.tsx</span>
          </button>
          <button
            onClick={() => setActiveTab("riffle")}
            className={`px-3 py-1 rounded-lg flex items-center space-x-1.5 transition-all ${
              activeTab === "riffle"
                ? "bg-white text-neutral-900 shadow-2xs font-bold"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            <CreditCard className="w-3 h-3 text-emerald-600" />
            <span>hairline-riffle.tsx</span>
          </button>
          <button
            onClick={() => setActiveTab("hero")}
            className={`px-3 py-1 rounded-lg flex items-center space-x-1.5 transition-all ${
              activeTab === "hero"
                ? "bg-white text-neutral-900 shadow-2xs font-bold"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            <Maximize2 className="w-3 h-3 text-indigo-600" />
            <span>scroll-expansion-hero.tsx</span>
          </button>
          <button
            onClick={() => setActiveTab("orbital")}
            className={`px-3 py-1 rounded-lg flex items-center space-x-1.5 transition-all ${
              activeTab === "orbital"
                ? "bg-white text-neutral-900 shadow-2xs font-bold"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            <Orbit className="w-3 h-3 text-purple-600" />
            <span>radial-orbital-timeline.tsx</span>
          </button>
          <button
            onClick={() => setActiveTab("marquee")}
            className={`px-3 py-1 rounded-lg flex items-center space-x-1.5 transition-all ${
              activeTab === "marquee"
                ? "bg-white text-neutral-900 shadow-2xs font-bold"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            <Repeat className="w-3 h-3 text-rose-600" />
            <span>marquee.tsx</span>
          </button>
        </div>
      </header>

      {/* ============================================================ */}
      {/* SECTION 1: timeline.tsx — GSAP Horizontal Scrub Timeline */}
      {/* ============================================================ */}
      {(activeTab === "all" || activeTab === "timeline") && (
        <section id="section-timeline" className="pt-24 border-b border-neutral-200/80">
          <div className="max-w-6xl mx-auto px-6 mb-6">
            <div className="p-4 rounded-2xl bg-white border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <FileCode className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-neutral-900 font-mono">
                      timeline.tsx
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 text-neutral-600 border border-neutral-200">
                      src/components/ui/timeline.tsx
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    GSAP ScrollTrigger + SplitText character-by-character horizontal pinned journey
                  </p>
                </div>
              </div>
              <div className="text-[11px] font-mono text-neutral-400">
                Dependencies: gsap, ScrollTrigger, SplitText
              </div>
            </div>
          </div>

          <div className="flex min-h-[75vh] flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Section 1: timeline.tsx</span>
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500">
              Product & Innovation Roadmap
            </p>
            <h1 className="max-w-[18ch] text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl text-neutral-900 font-display">
              Six years, one horizontal scroll.
            </h1>
            <p className="max-w-md text-sm leading-relaxed text-neutral-600">
              Keep scrolling — the section pins, the track slides sideways, and each milestone
              draws its stem and reveals its copy as it reaches centre.
            </p>
            <span className="mt-4 animate-bounce text-neutral-400 font-mono text-xs">
              ↓ Scroll Down To Trigger Horizontal Journey
            </span>
          </div>

          <Timeline
            title="Studio Storyline"
            periodLabel="2020 — 2026"
            backgroundColor={timelineSettings.backgroundColor}
            textColor={timelineSettings.textColor}
            mutedTextColor={timelineSettings.mutedTextColor}
            activeColor={timelineSettings.activeColor}
            imageUrl="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
            imageAlt="Team at work in a bright studio"
            duration={timelineSettings.duration}
          />

          <div className="flex py-16 flex-col items-center justify-center gap-2 px-6 text-center text-sm text-neutral-500 bg-white">
            <p className="text-sm font-semibold text-neutral-800 font-display">
              End of Section: <span className="font-mono text-blue-600">timeline.tsx</span>
            </p>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* SECTION 2: agentic-factory-3d.tsx — Procedural 3D Machine    */}
      {/* ============================================================ */}
      {(activeTab === "all" || activeTab === "factory") && (
        <section id="section-agentic-factory" className={activeTab === "factory" ? "pt-24" : "pt-12"}>
          <div className="max-w-6xl mx-auto px-6 mb-6">
            <div className="p-4 rounded-2xl bg-[#171b21] border border-neutral-700 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
                  <Box className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-white font-mono">
                      agentic-factory-3d.tsx
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                      src/components/ui/agentic-factory-3d.tsx
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Procedural Three.js video production factory with 5 interactive stations, conveyor spline & orbital cameras
                  </p>
                </div>
              </div>
              <div className="text-[11px] font-mono text-amber-400/90">
                Dependencies: three, OrbitControls, RoomEnvironment
              </div>
            </div>
          </div>

          <div className="py-12 px-6 text-center bg-[#0d1117] text-white">
            <div className="max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                <Box className="w-3.5 h-3.5" />
                <span>Section 2: agentic-factory-3d.tsx</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white">
                Agentic Factory 3D
              </h2>
            </div>
          </div>

          <div className="relative w-full h-[85vh] bg-black border-y border-neutral-800 overflow-hidden">
            <AgenticFactory3D height="100%" />
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* SECTION 3: hairline-riffle.tsx — Isometric Interactive Cards */}
      {/* ============================================================ */}
      {(activeTab === "all" || activeTab === "riffle") && (
        <section id="section-hairline-riffle" className={activeTab === "riffle" ? "pt-24 pb-20 border-b border-neutral-200" : "pt-16 pb-20 border-b border-neutral-200"}>
          <div className="max-w-6xl mx-auto px-6 mb-6">
            <div className="p-4 rounded-2xl bg-white border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-neutral-900 font-mono">
                      hairline-riffle.tsx
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                      src/components/ui/hairline-riffle.tsx
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    Isometric vector card tray — 8 cards with responsive 700ms ripple lift curve, live-region screen-reader readout & keyboard control
                  </p>
                </div>
              </div>
              <div className="text-[11px] font-mono text-emerald-700 bg-emerald-50/70 px-2.5 py-1 rounded-md border border-emerald-100">
                Dependencies: @lucasmarkes/hairline (MIT)
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm relative overflow-hidden group">
              <div className="w-full max-w-lg mx-auto py-4">
                <Riffle
                  intensity={riffleIntensity}
                  theme={riffleTheme}
                  aria-label="A tray of eight cards. Hover or use the arrow keys to pull a card."
                  className="w-full transition-transform duration-300"
                  onRead={(text) => setRiffleStatusText(text)}
                />
              </div>

              <div className="mt-4 p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <Info className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-neutral-500 font-medium">Card Status:</span>
                  <span className="font-mono font-bold text-neutral-800">{riffleStatusText}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-5">
              <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-xs space-y-5">
                <div className="flex items-center space-x-2 text-neutral-900 font-bold text-sm">
                  <Sliders className="w-4 h-4 text-emerald-600" />
                  <span>Component Parameters</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-neutral-700">Ripple Intensity</span>
                    <span className="font-mono text-emerald-600 font-bold">{riffleIntensity.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.05"
                    value={riffleIntensity}
                    onChange={(e) => setRiffleIntensity(parseFloat(e.target.value))}
                    className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* SECTION 4: scroll-expansion-hero.tsx — Scroll Media Hero     */}
      {/* ============================================================ */}
      {(activeTab === "all" || activeTab === "hero") && (
        <section id="section-scroll-hero" className={activeTab === "hero" ? "pt-24 pb-20 border-b border-neutral-200" : "pt-16 pb-20 border-b border-neutral-200"}>
          <div className="max-w-6xl mx-auto px-6 mb-6">
            <div className="p-4 rounded-2xl bg-indigo-950 border border-indigo-800 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center font-bold">
                  <Maximize2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-white font-mono">
                      scroll-expansion-hero.tsx
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-900 text-indigo-200 border border-indigo-700">
                      src/components/ui/scroll-expansion-hero.tsx
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative border-y border-neutral-200 overflow-hidden bg-neutral-900">
            <ScrollExpandMedia
              mediaType={heroMediaType}
              mediaSrc={currentHeroMedia.src}
              posterSrc={heroMediaType === "video" ? currentHeroMedia.poster : undefined}
              bgImageSrc={currentHeroMedia.background}
              title={currentHeroMedia.title}
              date={currentHeroMedia.date}
              scrollToExpand={currentHeroMedia.scrollToExpand}
              textBlend
            >
              <div className="max-w-4xl mx-auto text-white space-y-6">
                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white">
                  About ScrollExpandMedia
                </h2>
                <p className="text-base text-neutral-300 leading-relaxed">
                  {currentHeroMedia.about.overview}
                </p>
              </div>
            </ScrollExpandMedia>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* SECTION 5: radial-orbital-timeline.tsx — Radial Orbital Timeline */}
      {/* ============================================================ */}
      {(activeTab === "all" || activeTab === "orbital") && (
        <section id="section-radial-orbital" className={activeTab === "orbital" ? "pt-24 pb-20 border-b border-neutral-200" : "pt-16 pb-20 border-b border-neutral-200"}>
          <div className="max-w-6xl mx-auto px-6 mb-6">
            <div className="p-4 rounded-2xl bg-black border border-purple-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold">
                  <Orbit className="w-4 h-4 animate-spin" style={{ animationDuration: "10s" }} />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-white font-mono">
                      radial-orbital-timeline.tsx
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                      src/components/ui/radial-orbital-timeline.tsx
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-6">
            <div className="rounded-3xl overflow-hidden border border-purple-900/50 shadow-2xl">
              <RadialOrbitalTimeline timelineData={orbitalTimelineData} />
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* SECTION 6: marquee.tsx — Endless Seamless Motion Ticker    */}
      {/* ============================================================ */}
      {(activeTab === "all" || activeTab === "marquee") && (
        <section id="section-marquee" className={activeTab === "marquee" ? "pt-24 pb-20" : "pt-16 pb-20"}>
          {/* Section File Header Banner */}
          <div className="max-w-6xl mx-auto px-6 mb-6">
            <div className="p-4 rounded-2xl bg-white border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                  <Repeat className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-neutral-900 font-mono">
                      marquee.tsx
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 font-semibold">
                      src/components/ui/marquee.tsx
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    Seamless continuous infinite loop marquee supporting 4 directions, hover-pause & gradient edge masks
                  </p>
                </div>
              </div>
              <div className="text-[11px] font-mono text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
                Dependencies: cn (clsx + tailwind-merge)
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-6 text-center mb-10 space-y-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Section 6: marquee.tsx</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-neutral-900">
              Infinite Marquee Scroller
            </h2>
            <p className="text-sm text-neutral-600 max-w-xl mx-auto leading-relaxed">
              Accelerate, change directions, toggle gradient edge masks, or hover over elements to pause the animation loop in real time.
            </p>
          </div>

          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Live Interactive Marquee Showcase */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Primary Tech Stack Pills Marquee */}
              <div className="p-8 rounded-3xl bg-neutral-900 text-white border border-neutral-800 shadow-xl space-y-4">
                <div className="flex items-center justify-between text-xs text-neutral-400 font-mono pb-2 border-b border-neutral-800">
                  <span>Horizontal Tech Stack Marquee</span>
                  <span>direction="{marqueeDirection}"</span>
                </div>
                
                <Marquee
                  duration={marqueeDuration}
                  direction={marqueeDirection}
                  pauseOnHover={marqueePauseHover}
                  fade={marqueeFade}
                  className="py-4"
                >
                  {marqueeTechs.map((tech, idx) => (
                    <div
                      key={idx}
                      className="mx-3 px-5 py-2.5 rounded-2xl bg-neutral-800/90 border border-neutral-700 text-xs font-semibold text-neutral-100 flex items-center space-x-2 shadow-sm hover:border-rose-500/50 hover:bg-neutral-800 transition-all cursor-pointer"
                    >
                      <span className="w-2 h-2 rounded-full bg-rose-500" />
                      <span>{tech}</span>
                    </div>
                  ))}
                </Marquee>
              </div>

              {/* Secondary Brand Logo Ticker */}
              <div className="p-8 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between text-xs text-neutral-500 font-mono pb-2 border-b border-neutral-100">
                  <span>Reverse Partner Brand Ticker</span>
                  <span>direction="right"</span>
                </div>

                <Marquee
                  duration={24}
                  direction="right"
                  pauseOnHover={true}
                  fade={true}
                  className="py-2"
                >
                  {marqueeBrands.map((brand, idx) => (
                    <div
                      key={idx}
                      className="mx-6 flex items-center space-x-2.5 px-4 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-bold text-neutral-800 hover:shadow-xs transition-all"
                    >
                      <span className="text-lg">{brand.logo}</span>
                      <span className="font-mono">{brand.name}</span>
                    </div>
                  ))}
                </Marquee>
              </div>

            </div>

            {/* Controls Panel */}
            <div className="lg:col-span-4 space-y-5">
              <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-xs space-y-5">
                <div className="flex items-center space-x-2 text-neutral-900 font-bold text-sm">
                  <Sliders className="w-4 h-4 text-rose-600" />
                  <span>Marquee Controls</span>
                </div>

                {/* Direction Switcher */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-neutral-700 block">Scroll Direction</span>
                  <div className="grid grid-cols-4 gap-1 p-1 bg-neutral-100 rounded-xl">
                    {(["left", "right", "up", "down"] as const).map((dir) => (
                      <button
                        key={dir}
                        onClick={() => setMarqueeDirection(dir)}
                        className={`py-1.5 text-xs font-mono capitalize rounded-lg transition-all ${
                          marqueeDirection === dir
                            ? "bg-rose-600 text-white font-bold shadow-2xs"
                            : "text-neutral-600 hover:text-neutral-900"
                        }`}
                      >
                        {dir}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration / Speed Slider */}
                <div className="space-y-2 pt-2 border-t border-neutral-100">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-neutral-700">Animation Duration</span>
                    <span className="font-mono text-rose-600 font-bold">{marqueeDuration}s</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    step="1"
                    value={marqueeDuration}
                    onChange={(e) => setMarqueeDuration(parseInt(e.target.value))}
                    className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                  />
                  <p className="text-[11px] text-neutral-400">
                    Lower seconds = faster motion speed.
                  </p>
                </div>

                {/* Feature Toggles */}
                <div className="space-y-3 pt-2 border-t border-neutral-100 text-xs font-semibold">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-neutral-700">Pause on Hover</span>
                    <input
                      type="checkbox"
                      checked={marqueePauseHover}
                      onChange={(e) => setMarqueePauseHover(e.target.checked)}
                      className="w-4 h-4 rounded text-rose-600 accent-rose-600 cursor-pointer"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-neutral-700">Gradient Edge Mask Fade</span>
                    <input
                      type="checkbox"
                      checked={marqueeFade}
                      onChange={(e) => setMarqueeFade(e.target.checked)}
                      className="w-4 h-4 rounded text-rose-600 accent-rose-600 cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <footer className="py-16 px-6 text-center bg-white text-neutral-500 text-xs border-t border-neutral-200 mt-16">
            <p className="font-semibold text-neutral-800 font-display">
              End of Section: <span className="font-mono text-rose-600">marquee.tsx</span>
            </p>
            <button
              onClick={navigateHome}
              className="mt-6 px-6 py-3 rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 font-bold text-xs tracking-wider transition-all shadow-md inline-flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>RETURN TO CAPTURE CREATIVES MAIN SITE</span>
            </button>
          </footer>
        </section>
      )}
    </main>
  );
}
