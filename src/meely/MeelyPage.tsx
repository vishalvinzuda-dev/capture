import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Eye,
  Play,
  Pause,
  ChevronUp,
  ArrowLeft,
  Sparkles,
  Layers,
  Sliders,
  CheckCircle2,
} from "lucide-react";
import bgImg from "./bg.png";
import fgImg from "./fg.png";
import lobbyBgImg from "./lobby-bg.png";
import deskFgImg from "./desk-fg.png";

gsap.registerPlugin(ScrollTrigger);

const PHASE1_FRAMES = 48; // Frames: 0..47
const PHASE2_FRAMES = 51; // Frames: 48..98
const TOTAL_FRAMES = PHASE1_FRAMES + PHASE2_FRAMES; // 99 frames total

export const MeelyPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Loading & Decoding State
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [loaderDismissed, setLoaderDismissed] = useState(false);

  // Active Scrub Telemetry (driven smoothly by GSAP ScrollTrigger)
  const [activeStage, setActiveStage] = useState<1 | 2 | 3>(1);
  const [scrollDepthPercent, setScrollDepthPercent] = useState(0);
  const [currentFrameDisplay, setCurrentFrameDisplay] = useState("FRAME 01 / 48");
  const [isAutoTouring, setIsAutoTouring] = useState(false);

  // 1. Hero Parallax refs
  const heroRef = useRef<HTMLDivElement>(null);
  const heroBgScrollRef = useRef<HTMLDivElement>(null);
  const heroBgMouseRef = useRef<HTMLDivElement>(null);
  const heroFgScrollRef = useRef<HTMLDivElement>(null);
  const heroFgMouseRef = useRef<HTMLDivElement>(null);
  const heroTextMouseRef = useRef<HTMLDivElement>(null);

  // 2. Pinned Master Section Stack refs
  const stackedContainerRef = useRef<HTMLDivElement>(null);
  const pinnedViewportRef = useRef<HTMLDivElement>(null);

  // Stack Layer 1: Exterior Approach (Frames 0..47)
  const stackLayer1Ref = useRef<HTMLDivElement>(null);
  const phase1CanvasRef = useRef<HTMLCanvasElement>(null);

  // Stack Layer 2: Grand Lobby (3D Parallax & Depth)
  const stackLayer2Ref = useRef<HTMLDivElement>(null);
  const lobbyBgScrollRef = useRef<HTMLDivElement>(null);
  const lobbyBgMouseRef = useRef<HTMLDivElement>(null);
  const deskFgScrollRef = useRef<HTMLDivElement>(null);
  const deskFgMouseRef = useRef<HTMLDivElement>(null);
  const lobbyTextMouseRef = useRef<HTMLDivElement>(null);

  // Stack Layer 3: Executive Suites (Frames 48..98)
  const stackLayer3Ref = useRef<HTMLDivElement>(null);
  const phase2CanvasRef = useRef<HTMLCanvasElement>(null);

  // Persistent Image Refs & Zero-Reflow Frame Tracking
  const phase1ImagesRef = useRef<HTMLImageElement[]>([]);
  const phase2ImagesRef = useRef<HTMLImageElement[]>([]);
  const currentP1FrameRef = useRef<number>(-1);
  const currentP2FrameRef = useRef<number>(-1);
  const p1RafRef = useRef<number | null>(null);
  const p2RafRef = useRef<number | null>(null);

  // Auto-tour animation frame ref
  const autoTourRafRef = useRef<number | null>(null);

  // -------------------------------------------------------------------------
  // High-Performance Zero-Allocation Canvas Blitter
  // Note: Reads NO clientWidth/clientHeight during scrub to avoid layout thrashing!
  // -------------------------------------------------------------------------
  const drawFrameDirect = useCallback(
    (canvas: HTMLCanvasElement | null, img: HTMLImageElement | undefined) => {
      if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const cW = canvas.width;
      const cH = canvas.height;
      if (cW === 0 || cH === 0) return;

      const hRatio = cW / img.naturalWidth;
      const vRatio = cH / img.naturalHeight;
      const ratio = Math.max(hRatio, vRatio);

      const dW = img.naturalWidth * ratio;
      const dH = img.naturalHeight * ratio;
      const dX = (cW - dW) * 0.5;
      const dY = (cH - dH) * 0.5;

      // Direct hardware-accelerated image blit: covers 100% of buffer without clearRect
      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, dX, dY, dW, dH);
    },
    []
  );

  // -------------------------------------------------------------------------
  // Sizing Buffers on Mount and Window Resize ONLY (Zero DOM queries on scrub)
  // -------------------------------------------------------------------------
  const syncCanvasDimensions = useCallback(() => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    const bufW = Math.floor(w * dpr);
    const bufH = Math.floor(h * dpr);

    [phase1CanvasRef.current, phase2CanvasRef.current].forEach((cvs) => {
      if (cvs) {
        if (cvs.width !== bufW || cvs.height !== bufH) {
          cvs.width = bufW;
          cvs.height = bufH;
        }
      }
    });

    // Re-draw current frames at the new resolution
    if (phase1CanvasRef.current && phase1ImagesRef.current.length > 0) {
      const idx = Math.max(0, currentP1FrameRef.current);
      drawFrameDirect(phase1CanvasRef.current, phase1ImagesRef.current[idx]);
    }
    if (phase2CanvasRef.current && phase2ImagesRef.current.length > 0) {
      const idx = Math.max(0, currentP2FrameRef.current);
      drawFrameDirect(phase2CanvasRef.current, phase2ImagesRef.current[idx]);
    }
  }, [drawFrameDirect]);

  // -------------------------------------------------------------------------
  // Throttled RAF Canvas Renderers (Coalesces multiple scrub updates per vsync)
  // -------------------------------------------------------------------------
  const renderPhase1 = useCallback(
    (targetIndex: number) => {
      const idx = Math.min(Math.max(Math.round(targetIndex), 0), PHASE1_FRAMES - 1);
      if (idx === currentP1FrameRef.current) return;
      currentP1FrameRef.current = idx;

      if (p1RafRef.current !== null) return;
      p1RafRef.current = requestAnimationFrame(() => {
        p1RafRef.current = null;
        let img = phase1ImagesRef.current[currentP1FrameRef.current];
        if (!img?.complete) {
          // Fallback to nearest loaded previous frame
          for (let j = currentP1FrameRef.current; j >= 0; j--) {
            if (phase1ImagesRef.current[j]?.complete) {
              img = phase1ImagesRef.current[j];
              break;
            }
          }
        }
        drawFrameDirect(phase1CanvasRef.current, img);
      });
    },
    [drawFrameDirect]
  );

  const renderPhase2 = useCallback(
    (targetIndex: number) => {
      const idx = Math.min(Math.max(Math.round(targetIndex), 0), PHASE2_FRAMES - 1);
      if (idx === currentP2FrameRef.current) return;
      currentP2FrameRef.current = idx;

      if (p2RafRef.current !== null) return;
      p2RafRef.current = requestAnimationFrame(() => {
        p2RafRef.current = null;
        let img = phase2ImagesRef.current[currentP2FrameRef.current];
        if (!img?.complete) {
          // Fallback to nearest loaded previous frame
          for (let j = currentP2FrameRef.current; j >= 0; j--) {
            if (phase2ImagesRef.current[j]?.complete) {
              img = phase2ImagesRef.current[j];
              break;
            }
          }
        }
        drawFrameDirect(phase2CanvasRef.current, img);
      });
    },
    [drawFrameDirect]
  );

  // -------------------------------------------------------------------------
  // Progressive Preloading & Image Decoding (Eliminates main-thread decompress jank)
  // -------------------------------------------------------------------------
  useEffect(() => {
    let active = true;
    let decodedCount = 0;

    const checkReadyThreshold = () => {
      if (!active) return;
      const pct = Math.min(Math.round((decodedCount / TOTAL_FRAMES) * 100), 100);
      setLoadProgress(pct);
      // Once critical frames (hero + first 30 frames) are decoded, allow instant start
      if (decodedCount >= 30) {
        setIsReady(true);
      }
      if (decodedCount >= 60) {
        setLoaderDismissed(true);
      }
    };

    // 1. Preload Phase 1 Frames (0..47)
    const p1Arr: HTMLImageElement[] = [];
    for (let i = 0; i < PHASE1_FRAMES; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, "0");
      img.src = `/meely-frames/frame-${paddedIndex}.webp`;
      img
        .decode()
        .catch(() => {})
        .finally(() => {
          decodedCount++;
          checkReadyThreshold();
        });
      p1Arr.push(img);
    }
    phase1ImagesRef.current = p1Arr;

    // 2. Preload Phase 2 Frames (48..98)
    const p2Arr: HTMLImageElement[] = [];
    for (let i = 0; i < PHASE2_FRAMES; i++) {
      const img = new Image();
      const frameNum = PHASE1_FRAMES + i;
      const paddedIndex = String(frameNum).padStart(3, "0");
      img.src = `/meely-frames/frame-${paddedIndex}.webp`;
      img
        .decode()
        .catch(() => {})
        .finally(() => {
          decodedCount++;
          checkReadyThreshold();
        });
      p2Arr.push(img);
    }
    phase2ImagesRef.current = p2Arr;

    // Render initial poster frames once ready
    if (p1Arr[0]) {
      if (p1Arr[0].complete) renderPhase1(0);
      else p1Arr[0].onload = () => renderPhase1(0);
    }
    if (p2Arr[0]) {
      if (p2Arr[0].complete) renderPhase2(0);
      else p2Arr[0].onload = () => renderPhase2(0);
    }

    // Auto-dismiss loader after maximum timeout to prevent blocking on slow networks
    const fallbackTimer = setTimeout(() => {
      setIsReady(true);
      setLoaderDismissed(true);
    }, 2400);

    return () => {
      active = false;
      clearTimeout(fallbackTimer);
    };
  }, [renderPhase1, renderPhase2]);

  // -------------------------------------------------------------------------
  // Main Animation Engine: Lenis Smooth Scrolling + GSAP ScrollTrigger Harmony
  // -------------------------------------------------------------------------
  useEffect(() => {
    // 1. Initialize Lenis Inertia Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Silky exponential curve
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on("scroll", (e) => {
      ScrollTrigger.update();
      // If user manually touches the wheel/trackpad, disengage auto-tour
      if (Math.abs(e.velocity) > 0.4) {
        setIsAutoTouring(false);
      }
    });

    // Run Lenis within GSAP ticker for 60/120fps frame-synced smoothness
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0); // Zero lag jumps

    // Setup initial canvas pixel buffers
    syncCanvasDimensions();

    // 2. Mouse Parallax (Zero getBoundingClientRect layout queries on mousemove!)
    const heroBgQuickX = heroBgMouseRef.current
      ? gsap.quickTo(heroBgMouseRef.current, "x", { duration: 0.8, ease: "power2.out" })
      : null;
    const heroBgQuickY = heroBgMouseRef.current
      ? gsap.quickTo(heroBgMouseRef.current, "y", { duration: 0.8, ease: "power2.out" })
      : null;

    const heroFgQuickX = heroFgMouseRef.current
      ? gsap.quickTo(heroFgMouseRef.current, "x", { duration: 0.6, ease: "power2.out" })
      : null;
    const heroFgQuickY = heroFgMouseRef.current
      ? gsap.quickTo(heroFgMouseRef.current, "y", { duration: 0.6, ease: "power2.out" })
      : null;
    const heroFgQuickRotY = heroFgMouseRef.current
      ? gsap.quickTo(heroFgMouseRef.current, "rotationY", { duration: 0.6, ease: "power2.out" })
      : null;
    const heroFgQuickRotX = heroFgMouseRef.current
      ? gsap.quickTo(heroFgMouseRef.current, "rotationX", { duration: 0.6, ease: "power2.out" })
      : null;

    const heroTextQuickX = heroTextMouseRef.current
      ? gsap.quickTo(heroTextMouseRef.current, "x", { duration: 0.7, ease: "power2.out" })
      : null;
    const heroTextQuickY = heroTextMouseRef.current
      ? gsap.quickTo(heroTextMouseRef.current, "y", { duration: 0.7, ease: "power2.out" })
      : null;

    const lobbyBgQuickX = lobbyBgMouseRef.current
      ? gsap.quickTo(lobbyBgMouseRef.current, "x", { duration: 0.75, ease: "power2.out" })
      : null;
    const lobbyBgQuickY = lobbyBgMouseRef.current
      ? gsap.quickTo(lobbyBgMouseRef.current, "y", { duration: 0.75, ease: "power2.out" })
      : null;

    const deskFgQuickX = deskFgMouseRef.current
      ? gsap.quickTo(deskFgMouseRef.current, "x", { duration: 0.55, ease: "power2.out" })
      : null;
    const deskFgQuickY = deskFgMouseRef.current
      ? gsap.quickTo(deskFgMouseRef.current, "y", { duration: 0.55, ease: "power2.out" })
      : null;
    const deskFgRotY = deskFgMouseRef.current
      ? gsap.quickTo(deskFgMouseRef.current, "rotationY", { duration: 0.55, ease: "power2.out" })
      : null;
    const deskFgRotX = deskFgMouseRef.current
      ? gsap.quickTo(deskFgMouseRef.current, "rotationX", { duration: 0.55, ease: "power2.out" })
      : null;

    const lobbyTextQuickX = lobbyTextMouseRef.current
      ? gsap.quickTo(lobbyTextMouseRef.current, "x", { duration: 0.65, ease: "power2.out" })
      : null;
    const lobbyTextQuickY = lobbyTextMouseRef.current
      ? gsap.quickTo(lobbyTextMouseRef.current, "y", { duration: 0.65, ease: "power2.out" })
      : null;

    const handleWindowMouseMove = (e: MouseEvent) => {
      // Direct viewport normalization (-1 to 1): ZERO layout thrashing!
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;

      heroBgQuickX?.(-normX * 24);
      heroBgQuickY?.(-normY * 16);
      heroFgQuickX?.(normX * 38);
      heroFgQuickY?.(normY * 22);
      heroFgQuickRotY?.(normX * 3.8);
      heroFgQuickRotX?.(-normY * 3.8);
      heroTextQuickX?.(normX * 14);
      heroTextQuickY?.(normY * 8);

      lobbyBgQuickX?.(-normX * 22);
      lobbyBgQuickY?.(-normY * 14);
      deskFgQuickX?.(normX * 36);
      deskFgQuickY?.(normY * 20);
      deskFgRotY?.(normX * 3.4);
      deskFgRotX?.(-normY * 3.4);
      lobbyTextQuickX?.(normX * 14);
      lobbyTextQuickY?.(normY * 8);
    };

    window.addEventListener("mousemove", handleWindowMouseMove, { passive: true });

    // 3. GSAP Master Timeline Construction
    const ctx = gsap.context(() => {
      // A) Hero Scroll Depth Parallax
      if (heroRef.current) {
        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });

        if (heroBgScrollRef.current) {
          heroTl.to(heroBgScrollRef.current, { yPercent: 16, scale: 1.04, ease: "none" }, 0);
        }
        if (heroFgScrollRef.current) {
          heroTl.to(heroFgScrollRef.current, { yPercent: -12, scale: 1.05, ease: "none" }, 0);
        }
      }

      // B) Unified Master Continuous Stack Pin
      // Stacking: Phase 1 (Exterior) -> Grand Lobby Parallax -> Phase 2 (Suites)
      if (stackedContainerRef.current && pinnedViewportRef.current) {
        gsap.set(stackLayer1Ref.current, { yPercent: 0, scale: 1, opacity: 1 });
        gsap.set(stackLayer2Ref.current, { yPercent: 100, scale: 1, opacity: 1 });
        gsap.set(stackLayer3Ref.current, { yPercent: 100, scale: 1, opacity: 1 });

        const frameTrack1 = { frame: 0 };
        const frameTrack2 = { frame: 0 };

        const masterTl = gsap.timeline({
          scrollTrigger: {
            id: "meely-stacked-sequence",
            trigger: stackedContainerRef.current,
            start: "top top",
            end: "+=780%", // Spacious scroll room for fluid, cinema-paced scrubbing
            pin: pinnedViewportRef.current,
            pinSpacing: true,
            scrub: 0.75, // Seamlessly interpolated with Lenis
            onUpdate: (self) => {
              const p = self.progress;
              setScrollDepthPercent(Math.round(p * 100));

              // State & HUD Progression
              if (p < 0.36) {
                setActiveStage(1);
                const cur = Math.min(PHASE1_FRAMES, Math.round(frameTrack1.frame) + 1);
                setCurrentFrameDisplay(`EXTERIOR // FRAME ${String(cur).padStart(2, "0")} / 48`);
              } else if (p < 0.68) {
                setActiveStage(2);
                setCurrentFrameDisplay(`RECEPTION // 3D PARALLAX DEPTH`);
              } else {
                setActiveStage(3);
                const cur = Math.min(PHASE2_FRAMES, Math.round(frameTrack2.frame) + 1);
                setCurrentFrameDisplay(`SUITES // FRAME ${String(cur).padStart(2, "0")} / 51`);
              }
            },
          },
        });

        // 1. Scrub Phase 1 frames 0..47 (Exterior Approach)
        masterTl.to(frameTrack1, {
          frame: PHASE1_FRAMES - 1,
          duration: 3.4,
          ease: "none",
          onUpdate: () => {
            renderPhase1(frameTrack1.frame);
          },
        });

        // 2. Smooth Stack Transition: Grand Lobby slides up over Exterior
        masterTl.to(stackLayer2Ref.current, {
          yPercent: 0,
          duration: 1.1,
          ease: "power2.inOut",
        });
        masterTl.to(
          stackLayer1Ref.current,
          {
            scale: 0.93,
            opacity: 0.25,
            duration: 1.1,
            ease: "power2.inOut",
          },
          "<"
        );

        // 3. Scrub Lobby Parallax Depth Layers (while in focus)
        if (lobbyBgScrollRef.current) {
          masterTl.fromTo(
            lobbyBgScrollRef.current,
            { yPercent: -8, scale: 1.02 },
            { yPercent: 8, scale: 1.07, duration: 2.4, ease: "none" }
          );
        }
        if (deskFgScrollRef.current) {
          masterTl.fromTo(
            deskFgScrollRef.current,
            { yPercent: 8, scale: 1 },
            { yPercent: -8, scale: 1.05, duration: 2.4, ease: "none" },
            "<"
          );
        }

        // 4. Smooth Stack Transition: Phase 2 Suites slide up over Grand Lobby
        masterTl.to(stackLayer3Ref.current, {
          yPercent: 0,
          duration: 1.1,
          ease: "power2.inOut",
        });
        masterTl.to(
          stackLayer2Ref.current,
          {
            scale: 0.93,
            opacity: 0.25,
            duration: 1.1,
            ease: "power2.inOut",
          },
          "<"
        );

        // 5. Scrub Phase 2 frames 48..98 (Interior Suites Walkthrough)
        masterTl.to(frameTrack2, {
          frame: PHASE2_FRAMES - 1,
          duration: 3.6,
          ease: "none",
          onUpdate: () => {
            renderPhase2(frameTrack2.frame);
          },
        });
      }
    }, containerRef);

    const handleResize = () => {
      syncCanvasDimensions();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("resize", handleResize);
      if (p1RafRef.current) cancelAnimationFrame(p1RafRef.current);
      if (p2RafRef.current) cancelAnimationFrame(p2RafRef.current);
      if (autoTourRafRef.current) cancelAnimationFrame(autoTourRafRef.current);
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
      ctx.revert();
    };
  }, [renderPhase1, renderPhase2, syncCanvasDimensions]);

  // -------------------------------------------------------------------------
  // Interactive Smooth Jump to Stage (Powered by Lenis + ScrollTrigger)
  // -------------------------------------------------------------------------
  const handleJumpToStage = (targetStage: 1 | 2 | 3) => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    const st = ScrollTrigger.getById("meely-stacked-sequence");
    if (!st) return;

    let targetRatio = 0.16;
    if (targetStage === 2) targetRatio = 0.52;
    if (targetStage === 3) targetRatio = 0.86;

    const targetScroll = st.start + (st.end - st.start) * targetRatio;
    setIsAutoTouring(false);
    lenis.scrollTo(targetScroll, {
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  };

  // -------------------------------------------------------------------------
  // Cinema Auto-Tour Playback Toggle
  // -------------------------------------------------------------------------
  const toggleAutoTour = () => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    if (isAutoTouring) {
      setIsAutoTouring(false);
      if (autoTourRafRef.current) cancelAnimationFrame(autoTourRafRef.current);
    } else {
      setIsAutoTouring(true);
      const st = ScrollTrigger.getById("meely-stacked-sequence");
      // If near end, loop back to start of sequence
      if (st && lenis.scroll >= st.end - 50) {
        lenis.scrollTo(st.start, { immediate: true });
      }

      // Smooth automated RAF scrolling
      let lastTime = performance.now();
      const tourStep = (time: number) => {
        const delta = Math.min((time - lastTime) / 1000, 0.1);
        lastTime = time;

        const scrollSpeed = 175; // Pixels per second: serene architectural cinematic pace
        const nextScroll = lenis.scroll + scrollSpeed * delta;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

        if (nextScroll >= maxScroll - 10) {
          setIsAutoTouring(false);
          return;
        }

        lenis.scrollTo(nextScroll, { immediate: true });
        autoTourRafRef.current = requestAnimationFrame(tourStep);
      };
      autoTourRafRef.current = requestAnimationFrame(tourStep);
    }
  };

  return (
    <div
      ref={containerRef}
      className="bg-[#09090b] text-white min-h-screen selection:bg-amber-400 selection:text-black overflow-x-hidden relative"
    >
      {/* ========================================================================= */}
      {/* 0. ARCHITECTURAL PRELOADER & TELEMETRY SHIELD (Motion UI)                 */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {!loaderDismissed && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02, filter: "blur(12px)" }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#09090b] flex flex-col items-center justify-center p-6 select-none"
          >
            {/* Ambient Background Glow */}
            <div className="absolute w-[600px] h-[600px] rounded-full bg-amber-500/10 blur-[130px] pointer-events-none" />

            <div className="relative z-10 max-w-md w-full flex flex-col items-center text-center">
              {/* Compass Icon Badge */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 mb-6 shadow-[0_0_40px_rgba(251,191,36,0.15)]"
              >
                <Compass className="w-8 h-8" />
              </motion.div>

              <span className="font-mono text-[11px] uppercase tracking-widest text-amber-400/90 mb-2">
                Computational Architecture • 99 HDR WebP Frames
              </span>
              <h2 className="text-3xl font-light text-white tracking-tight mb-3">
                MEELY ARCHITECTURAL TOUR
              </h2>
              <p className="text-xs text-white/50 font-light leading-relaxed mb-8 max-w-sm">
                Optimized with Lenis inertia smoothing, GSAP frame-scrubbing, and zero-allocation
                canvas rendering.
              </p>

              {/* Progress Gauge */}
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden relative mb-4">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 via-amber-300 to-white origin-left"
                  style={{ width: `${loadProgress}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>

              <div className="flex items-center justify-between w-full font-mono text-xs text-white/40 mb-8">
                <span>BUFFERING STREAM</span>
                <span className="text-amber-400 font-semibold">{loadProgress}%</span>
              </div>

              {/* Enter Button (Revealed or ready) */}
              <motion.button
                onClick={() => setLoaderDismissed(true)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`px-8 py-3.5 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 flex items-center gap-2 ${
                  isReady
                    ? "bg-amber-400 text-black shadow-[0_0_30px_rgba(251,191,36,0.35)] cursor-pointer"
                    : "bg-white/10 text-white/40 cursor-not-allowed"
                }`}
              >
                {isReady ? (
                  <>
                    <Eye className="w-4 h-4" />
                    <span>Enter 3D Experience</span>
                  </>
                ) : (
                  <span>Decoding Frames...</span>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* TOP GLOW SCRUB PROGRESS BAR                                              */}
      {/* ========================================================================= */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-40 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-amber-500 via-amber-300 to-white origin-left will-change-transform transition-all duration-75"
          style={{ width: `${scrollDepthPercent}%` }}
        />
      </div>

      {/* ========================================================================= */}
      {/* FLOATING HEADER DOCK (Motion UI)                                         */}
      {/* ========================================================================= */}
      <header className="fixed top-6 left-6 right-6 z-40 flex items-center justify-between pointer-events-none">
        {/* Left: Brand & Telemetry */}
        <div className="flex items-center gap-3 px-4 sm:px-5 py-2.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl pointer-events-auto">
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-white/90">
            Meely Tour
          </span>
          <span className="text-white/20">|</span>
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-amber-300">
            {scrollDepthPercent}% Depth
          </span>
        </div>

        {/* Right: Auto Tour & Exit Links */}
        <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
          <button
            onClick={toggleAutoTour}
            className={`px-3.5 sm:px-4 py-2 rounded-full text-[11px] font-mono tracking-wider uppercase flex items-center gap-1.5 transition-all duration-300 ${
              isAutoTouring
                ? "bg-amber-400 text-black font-semibold shadow-[0_0_20px_rgba(251,191,36,0.35)]"
                : "bg-black/60 backdrop-blur-xl border border-white/10 text-white/80 hover:bg-white/10"
            }`}
          >
            {isAutoTouring ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Auto Tour</span>
              </>
            )}
          </button>

          <a
            href="/"
            className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 text-[11px] font-mono tracking-wider uppercase text-white/80 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Main Agency</span>
          </a>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 1. HERO SECTION: Streetscape Parallax & 3D Interactive Depth             */}
      {/* ========================================================================= */}
      <section
        ref={heroRef}
        className="relative min-h-screen h-[105vh] w-full overflow-hidden flex items-center justify-center bg-black cursor-crosshair"
        style={{ perspective: "1200px" }}
      >
        {/* Background Layer: Urban Streetscape */}
        <div
          ref={heroBgScrollRef}
          className="absolute inset-0 w-[114%] h-[120%] -left-[7%] -top-[10%] overflow-hidden pointer-events-none"
        >
          <div ref={heroBgMouseRef} className="w-full h-full will-change-transform">
            <img
              src={bgImg}
              alt="Tranquil Landscaped Urban Streetscape"
              className="w-full h-full object-cover select-none"
              style={{ transform: "translate3d(0, 0, 0)" }}
            />
          </div>
        </div>

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/95 pointer-events-none z-10" />

        {/* Foreground Layer: Mixed-Use Building */}
        <div
          ref={heroFgScrollRef}
          className="absolute inset-x-0 bottom-0 top-0 w-full h-full pointer-events-none z-20 flex items-end justify-center pt-24 sm:pt-32 md:pt-40 lg:pt-48 pb-0"
        >
          <div
            ref={heroFgMouseRef}
            className="w-full h-full max-w-[1920px] flex items-end justify-center will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            <img
              src={fgImg}
              alt="Modern Mixed-Use Building Render"
              className="w-full h-full max-h-[85vh] object-contain object-bottom select-none drop-shadow-[0_30px_70px_rgba(0,0,0,0.95)]"
              style={{ transform: "translate3d(0, 0, 0)" }}
            />
          </div>
        </div>

        {/* Overlay Hero Typography (Motion UI) */}
        <div
          ref={heroTextMouseRef}
          className="relative z-30 text-center pointer-events-none px-6 will-change-transform mt-[-4vh]"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-5 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/30 text-[11px] font-mono tracking-widest uppercase text-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.1)]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Architectural Vision • Lenis & GSAP Smooth Scrub</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tight text-white drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)]"
          >
            MEELY
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-4 max-w-xl mx-auto text-sm sm:text-base md:text-lg text-white/80 font-light tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
          >
            Move mouse for 3D perspective depth. Scroll down to enter the unbroken 99-frame
            computational tour.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-10 flex items-center justify-center gap-2 text-white/60 text-xs font-mono tracking-widest uppercase"
          >
            <span>Scroll Down to Scrub</span>
            <span className="inline-block animate-bounce">↓</span>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. UNIFIED CONTINUOUS SECTION STACK: Phase 1 -> Lobby -> Phase 2          */}
      {/* Single unbroken master scroll pin with Lenis inertia interpolation        */}
      {/* ========================================================================= */}
      <section ref={stackedContainerRef} className="relative w-full bg-black">
        <div
          ref={pinnedViewportRef}
          className="h-screen w-full relative overflow-hidden bg-black cursor-crosshair select-none"
        >
          {/* ======================================================================= */}
          {/* STACK LAYER 1: Phase 1 (Exterior Approach Canvas 0..47)                 */}
          {/* ======================================================================= */}
          <div
            ref={stackLayer1Ref}
            className="absolute inset-0 w-full h-full bg-black overflow-hidden flex items-center justify-center will-change-transform z-10"
          >
            <canvas
              ref={phase1CanvasRef}
              className="w-full h-full block object-cover will-change-transform select-none"
            />

            {/* Cinematic Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/45 pointer-events-none" />

            {/* Layer 1 Narrative HUD */}
            <div className="absolute top-24 sm:top-28 left-6 sm:left-12 z-20 pointer-events-none max-w-sm sm:max-w-md">
              <span className="inline-block px-3 py-1 mb-2 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/25 text-[10px] font-mono tracking-widest uppercase text-amber-300">
                Phase 01 • Exterior Approach
              </span>
              <h2 className="text-2xl sm:text-4xl font-light text-white tracking-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
                Curtain Wall Facade
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                Approaching the architectural entrance. Glazing engineered with solar fins and
                cantilevered podium.
              </p>
            </div>
          </div>

          {/* ======================================================================= */}
          {/* STACK LAYER 2: Grand Reception (3D Parallax & Depth)                    */}
          {/* Stacks smoothly over Layer 1 as the user scrolls                         */}
          {/* ======================================================================= */}
          <div
            ref={stackLayer2Ref}
            className="absolute inset-0 w-full h-full bg-black overflow-hidden flex items-center justify-center will-change-transform z-20 shadow-[0_-30px_70px_rgba(0,0,0,0.95)] border-t border-white/10"
            style={{ perspective: "1400px" }}
          >
            {/* Background Layer: Symmetrical Luxury Lobby with Ring Lights */}
            <div
              ref={lobbyBgScrollRef}
              className="absolute inset-0 w-[114%] h-[120%] -left-[7%] -top-[10%] overflow-hidden pointer-events-none"
            >
              <div ref={lobbyBgMouseRef} className="w-full h-full will-change-transform">
                <img
                  src={lobbyBgImg}
                  alt="Symmetrical Luxury Lobby with Ring Lights"
                  className="w-full h-full object-cover select-none"
                  style={{ transform: "translate3d(0, 0, 0)" }}
                />
              </div>
            </div>

            {/* Warm Ambient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/60 pointer-events-none z-10" />

            {/* Foreground Layer: Meely Marble Reception Desk and Logo */}
            <div
              ref={deskFgScrollRef}
              className="absolute inset-0 w-full h-full flex items-end justify-center pointer-events-none z-20 pb-4 sm:pb-8"
            >
              <div
                ref={deskFgMouseRef}
                className="w-full h-full max-w-[1920px] flex items-end justify-center will-change-transform"
                style={{ transformStyle: "preserve-3d" }}
              >
                <img
                  src={deskFgImg}
                  alt="Meely Marble Reception Desk and Logo"
                  className="w-full h-auto max-h-[82vh] object-contain object-bottom select-none drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
                  style={{ transform: "translate3d(0, 0, 0)" }}
                />
              </div>
            </div>

            {/* Typography in Parallax Section */}
            <div
              ref={lobbyTextMouseRef}
              className="absolute top-24 sm:top-28 left-1/2 -translate-x-1/2 z-30 pointer-events-none text-center max-w-lg px-6 will-change-transform"
            >
              <span className="inline-block px-3 py-1 mb-2 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/30 text-[10px] font-mono tracking-widest uppercase text-amber-300">
                Phase 02 • Parallax Layer Stack
              </span>
              <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
                Marble & Illumination
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-white/70 font-light drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                Bookmatched Calacatta marble counter paired with bespoke acoustic ring luminaires.
              </p>
            </div>
          </div>

          {/* ======================================================================= */}
          {/* STACK LAYER 3: Phase 2 (Interior Corridor Walkthrough 48..98)            */}
          {/* Stacks smoothly over Layer 2 as scroll continues                          */}
          {/* ======================================================================= */}
          <div
            ref={stackLayer3Ref}
            className="absolute inset-0 w-full h-full bg-black overflow-hidden flex items-center justify-center will-change-transform z-30 shadow-[0_-30px_70px_rgba(0,0,0,0.95)] border-t border-white/10"
          >
            <canvas
              ref={phase2CanvasRef}
              className="w-full h-full block object-cover will-change-transform select-none"
            />

            {/* Cinematic Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/45 pointer-events-none" />

            {/* Layer 3 Narrative HUD */}
            <div className="absolute top-24 sm:top-28 right-6 sm:right-12 z-20 pointer-events-none max-w-sm sm:max-w-md text-right">
              <span className="inline-block px-3 py-1 mb-2 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/25 text-[10px] font-mono tracking-widest uppercase text-amber-300">
                Phase 03 • Interior Corridor
              </span>
              <h2 className="text-2xl sm:text-4xl font-light text-white tracking-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
                Executive Suites
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                Rhythmically fluted oak acoustic paneling leading into private chambers and
                boardrooms.
              </p>
            </div>
          </div>

          {/* ======================================================================= */}
          {/* FLOATING INTERACTIVE STAGE HUD DOCK (Motion UI)                         */}
          {/* Interactive Stage Jump with animated spring layout indicator            */}
          {/* ======================================================================= */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 text-center pointer-events-auto">
            <div className="px-3 py-2 rounded-full bg-black/85 backdrop-blur-2xl border border-white/15 shadow-[0_15px_40px_rgba(0,0,0,0.9)] flex items-center gap-1 sm:gap-2">
              {/* Stage 1 Button */}
              <button
                onClick={() => handleJumpToStage(1)}
                className={`relative px-3.5 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-colors duration-200 flex items-center gap-1.5 ${
                  activeStage === 1 ? "text-amber-300 font-semibold" : "text-white/50 hover:text-white"
                }`}
              >
                {activeStage === 1 && (
                  <motion.div
                    layoutId="active-stage-indicator"
                    className="absolute inset-0 rounded-full bg-amber-400/20 border border-amber-400/40"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>01 Exterior</span>
              </button>

              <span className="text-white/20">/</span>

              {/* Stage 2 Button */}
              <button
                onClick={() => handleJumpToStage(2)}
                className={`relative px-3.5 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-colors duration-200 flex items-center gap-1.5 ${
                  activeStage === 2 ? "text-amber-300 font-semibold" : "text-white/50 hover:text-white"
                }`}
              >
                {activeStage === 2 && (
                  <motion.div
                    layoutId="active-stage-indicator"
                    className="absolute inset-0 rounded-full bg-amber-400/20 border border-amber-400/40"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>02 Lobby 3D</span>
              </button>

              <span className="text-white/20">/</span>

              {/* Stage 3 Button */}
              <button
                onClick={() => handleJumpToStage(3)}
                className={`relative px-3.5 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-colors duration-200 flex items-center gap-1.5 ${
                  activeStage === 3 ? "text-amber-300 font-semibold" : "text-white/50 hover:text-white"
                }`}
              >
                {activeStage === 3 && (
                  <motion.div
                    layoutId="active-stage-indicator"
                    className="absolute inset-0 rounded-full bg-amber-400/20 border border-amber-400/40"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>03 Suites</span>
              </button>
            </div>

            {/* Live Frame Telemetry Badge */}
            <div className="mt-2.5 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/60 tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              <span>{currentFrameDisplay}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. OUTRO SECTION: Architectural Precision & Completion (Motion UI)       */}
      {/* ========================================================================= */}
      <section className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center px-6 py-28 relative border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-block px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-[11px] font-mono uppercase tracking-widest text-amber-400 mb-4"
          >
            Architectural Precision Complete
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-tight"
          >
            Crafted for Perspective.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white/60 text-sm sm:text-base md:text-lg mt-5 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Every camera trajectory, focal shift, and lighting layer rendered with computational
            fidelity. From street frontage to the luminous marble reception and intimate interior
            suites.
          </motion.p>

          {/* 3 Detail Cards (Motion UI) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-4">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-amber-300">
                01. Exterior Envelope
              </h3>
              <p className="text-xs text-white/60 mt-2 leading-relaxed">
                Solar responsive double-glazed curtain facade with customized mullions and
                cantilever geometry.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-4">
                <Eye className="w-4 h-4" />
              </div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-amber-300">
                02. Grand Reception
              </h3>
              <p className="text-xs text-white/60 mt-2 leading-relaxed">
                Bookmatched Calacatta marble counter paired with bespoke suspended halo ring
                luminaires.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-4">
                <Sliders className="w-4 h-4" />
              </div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-amber-300">
                03. Suite Walkthrough
              </h3>
              <p className="text-xs text-white/60 mt-2 leading-relaxed">
                Continuous 51-frame walkthrough across acoustic fluted timber corridors into private
                suites.
              </p>
            </motion.div>
          </div>

          {/* Navigation Action Buttons */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/"
              className="px-8 py-3.5 rounded-full bg-white text-black text-xs font-mono uppercase tracking-wider font-semibold hover:bg-amber-400 transition-colors shadow-xl shadow-white/5"
            >
              Return to Agency Main Site
            </a>
            <button
              onClick={() => {
                lenisRef.current?.scrollTo(0, {
                  duration: 1.6,
                  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                });
              }}
              className="px-8 py-3.5 rounded-full bg-white/5 border border-white/15 text-white text-xs font-mono uppercase tracking-wider hover:bg-white/10 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <ChevronUp className="w-4 h-4" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
