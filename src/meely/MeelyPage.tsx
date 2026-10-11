import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bgImg from "./bg.png";
import fgImg from "./fg.png";
import lobbyBgImg from "./lobby-bg.png";
import deskFgImg from "./desk-fg.png";

gsap.registerPlugin(ScrollTrigger);

const PHASE1_FRAMES = 48; // Old frames: 0..47
const PHASE2_FRAMES = 51; // Extra frames: 48..98
const TOTAL_FRAMES = PHASE1_FRAMES + PHASE2_FRAMES; // 99 frames

export const MeelyPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Hero Parallax refs
  const heroRef = useRef<HTMLDivElement>(null);
  const heroBgScrollRef = useRef<HTMLDivElement>(null);
  const heroBgMouseRef = useRef<HTMLDivElement>(null);
  const heroFgScrollRef = useRef<HTMLDivElement>(null);
  const heroFgMouseRef = useRef<HTMLDivElement>(null);
  const heroTextMouseRef = useRef<HTMLDivElement>(null);

  // 2. Unified Stacked Master Sequence refs (Phase 1 -> Lobby Parallax -> Phase 2)
  const stackedContainerRef = useRef<HTMLDivElement>(null);
  const pinnedViewportRef = useRef<HTMLDivElement>(null);

  // Stack Layer 1: Phase 1 (Frames 0..47)
  const stackLayer1Ref = useRef<HTMLDivElement>(null);
  const phase1CanvasRef = useRef<HTMLCanvasElement>(null);

  // Stack Layer 2: Lobby Parallax
  const stackLayer2Ref = useRef<HTMLDivElement>(null);
  const lobbyBgScrollRef = useRef<HTMLDivElement>(null);
  const lobbyBgMouseRef = useRef<HTMLDivElement>(null);
  const deskFgScrollRef = useRef<HTMLDivElement>(null);
  const deskFgMouseRef = useRef<HTMLDivElement>(null);
  const lobbyTextMouseRef = useRef<HTMLDivElement>(null);
  const snapBadgeRef = useRef<HTMLDivElement>(null);

  // Stack Layer 3: Phase 2 (Frames 48..98)
  const stackLayer3Ref = useRef<HTMLDivElement>(null);
  const phase2CanvasRef = useRef<HTMLCanvasElement>(null);

  // Unified Stage HUD Step Indicators
  const hudStep1Ref = useRef<HTMLDivElement>(null);
  const hudStep2Ref = useRef<HTMLDivElement>(null);
  const hudStep3Ref = useRef<HTMLDivElement>(null);

  // Global Progress bar
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // -----------------------------------------------------------------
    // Helper: Canvas Frame Renderer (High-DPI object-cover)
    // -----------------------------------------------------------------
    const drawFrameOnCanvas = (
      canvas: HTMLCanvasElement | null,
      img: HTMLImageElement | undefined
    ) => {
      if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || window.innerHeight;

      const targetCanvasWidth = Math.floor(width * dpr);
      const targetCanvasHeight = Math.floor(height * dpr);

      if (canvas.width !== targetCanvasWidth || canvas.height !== targetCanvasHeight) {
        canvas.width = targetCanvasWidth;
        canvas.height = targetCanvasHeight;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      const hRatio = width / img.naturalWidth;
      const vRatio = height / img.naturalHeight;
      const ratio = Math.max(hRatio, vRatio);
      const centerShift_x = (width - img.naturalWidth * ratio) / 2;
      const centerShift_y = (height - img.naturalHeight * ratio) / 2;

      ctx.clearRect(0, 0, width, height);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(
        img,
        0,
        0,
        img.naturalWidth,
        img.naturalHeight,
        centerShift_x,
        centerShift_y,
        img.naturalWidth * ratio,
        img.naturalHeight * ratio
      );
      ctx.restore();
    };

    // -----------------------------------------------------------------
    // 1. Preload Phase 1 Frames (Old frames 0..47)
    // -----------------------------------------------------------------
    const phase1Images: HTMLImageElement[] = [];
    for (let i = 0; i < PHASE1_FRAMES; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, "0");
      img.src = `/meely-frames/frame-${paddedIndex}.webp`;
      phase1Images.push(img);
    }

    const renderPhase1 = (index: number) => {
      let img = phase1Images[index];
      if (!img?.complete) {
        for (let j = index; j >= 0; j--) {
          if (phase1Images[j]?.complete) {
            img = phase1Images[j];
            break;
          }
        }
      }
      drawFrameOnCanvas(phase1CanvasRef.current, img);
    };

    if (phase1Images[0]) {
      if (phase1Images[0].complete) renderPhase1(0);
      else phase1Images[0].onload = () => renderPhase1(0);
    }

    // -----------------------------------------------------------------
    // 2. Preload Phase 2 Frames (Extra frames 48..98)
    // -----------------------------------------------------------------
    const phase2Images: HTMLImageElement[] = [];
    for (let i = 0; i < PHASE2_FRAMES; i++) {
      const img = new Image();
      const frameNum = PHASE1_FRAMES + i; // 48, 49, ..., 98
      const paddedIndex = String(frameNum).padStart(3, "0");
      img.src = `/meely-frames/frame-${paddedIndex}.webp`;
      phase2Images.push(img);
    }

    const renderPhase2 = (index: number) => {
      let img = phase2Images[index];
      if (!img?.complete) {
        for (let j = index; j >= 0; j--) {
          if (phase2Images[j]?.complete) {
            img = phase2Images[j];
            break;
          }
        }
      }
      drawFrameOnCanvas(phase2CanvasRef.current, img);
    };

    if (phase2Images[0]) {
      if (phase2Images[0].complete) renderPhase2(0);
      else phase2Images[0].onload = () => renderPhase2(0);
    }

    // -----------------------------------------------------------------
    // 3. Mouse Parallax for Hero
    // -----------------------------------------------------------------
    const heroEl = heroRef.current;
    let heroMouseMove: ((e: MouseEvent) => void) | null = null;
    let heroMouseLeave: (() => void) | null = null;

    if (heroEl && heroBgMouseRef.current && heroFgMouseRef.current) {
      const bgQuickX = gsap.quickTo(heroBgMouseRef.current, "x", { duration: 0.9, ease: "power2.out" });
      const bgQuickY = gsap.quickTo(heroBgMouseRef.current, "y", { duration: 0.9, ease: "power2.out" });

      const fgQuickX = gsap.quickTo(heroFgMouseRef.current, "x", { duration: 0.65, ease: "power2.out" });
      const fgQuickY = gsap.quickTo(heroFgMouseRef.current, "y", { duration: 0.65, ease: "power2.out" });
      const fgQuickRotY = gsap.quickTo(heroFgMouseRef.current, "rotationY", { duration: 0.65, ease: "power2.out" });
      const fgQuickRotX = gsap.quickTo(heroFgMouseRef.current, "rotationX", { duration: 0.65, ease: "power2.out" });

      const textQuickX = heroTextMouseRef.current ? gsap.quickTo(heroTextMouseRef.current, "x", { duration: 0.75, ease: "power2.out" }) : null;
      const textQuickY = heroTextMouseRef.current ? gsap.quickTo(heroTextMouseRef.current, "y", { duration: 0.75, ease: "power2.out" }) : null;

      heroMouseMove = (e: MouseEvent) => {
        const rect = heroEl.getBoundingClientRect();
        if (!rect || rect.height === 0) return;
        const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

        bgQuickX(-normX * 28);
        bgQuickY(-normY * 18);
        fgQuickX(normX * 48);
        fgQuickY(normY * 28);
        fgQuickRotY(normX * 4.5);
        fgQuickRotX(-normY * 4.5);
        textQuickX?.(normX * 18);
        textQuickY?.(normY * 12);
      };

      heroMouseLeave = () => {
        bgQuickX(0);
        bgQuickY(0);
        fgQuickX(0);
        fgQuickY(0);
        fgQuickRotY(0);
        fgQuickRotX(0);
        textQuickX?.(0);
        textQuickY?.(0);
      };

      heroEl.addEventListener("mousemove", heroMouseMove);
      heroEl.addEventListener("mouseleave", heroMouseLeave);
    }

    // -----------------------------------------------------------------
    // 4. Mouse Parallax for Stacked Stage (Grand Lobby Depth)
    // -----------------------------------------------------------------
    const pinnedEl = pinnedViewportRef.current;
    let parallaxMouseMove: ((e: MouseEvent) => void) | null = null;
    let parallaxMouseLeave: (() => void) | null = null;

    if (pinnedEl && lobbyBgMouseRef.current && deskFgMouseRef.current) {
      const lobbyBgQuickX = gsap.quickTo(lobbyBgMouseRef.current, "x", { duration: 0.8, ease: "power2.out" });
      const lobbyBgQuickY = gsap.quickTo(lobbyBgMouseRef.current, "y", { duration: 0.8, ease: "power2.out" });

      const deskFgQuickX = gsap.quickTo(deskFgMouseRef.current, "x", { duration: 0.55, ease: "power2.out" });
      const deskFgQuickY = gsap.quickTo(deskFgMouseRef.current, "y", { duration: 0.55, ease: "power2.out" });
      const deskFgRotY = gsap.quickTo(deskFgMouseRef.current, "rotationY", { duration: 0.55, ease: "power2.out" });
      const deskFgRotX = gsap.quickTo(deskFgMouseRef.current, "rotationX", { duration: 0.55, ease: "power2.out" });

      const lobbyTextQuickX = lobbyTextMouseRef.current ? gsap.quickTo(lobbyTextMouseRef.current, "x", { duration: 0.7, ease: "power2.out" }) : null;
      const lobbyTextQuickY = lobbyTextMouseRef.current ? gsap.quickTo(lobbyTextMouseRef.current, "y", { duration: 0.7, ease: "power2.out" }) : null;

      parallaxMouseMove = (e: MouseEvent) => {
        const rect = pinnedEl.getBoundingClientRect();
        if (!rect || rect.height === 0) return;
        const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

        lobbyBgQuickX(-normX * 26);
        lobbyBgQuickY(-normY * 16);
        deskFgQuickX(normX * 42);
        deskFgQuickY(normY * 24);
        deskFgRotY(normX * 4);
        deskFgRotX(-normY * 4);
        lobbyTextQuickX?.(normX * 16);
        lobbyTextQuickY?.(normY * 10);
      };

      parallaxMouseLeave = () => {
        lobbyBgQuickX(0);
        lobbyBgQuickY(0);
        deskFgQuickX(0);
        deskFgQuickY(0);
        deskFgRotY(0);
        deskFgRotX(0);
        lobbyTextQuickX?.(0);
        lobbyTextQuickY?.(0);
      };

      pinnedEl.addEventListener("mousemove", parallaxMouseMove);
      pinnedEl.addEventListener("mouseleave", parallaxMouseLeave);
    }

    // -----------------------------------------------------------------
    // 5. GSAP ScrollTrigger Sequence Context
    // -----------------------------------------------------------------
    const ctx_gsap = gsap.context(() => {
      // Global Page Scroll Progress
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${self.progress})`;
          }
        },
      });

      // A) Hero Scroll Parallax
      if (heroRef.current) {
        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        if (heroBgScrollRef.current) {
          heroTl.to(heroBgScrollRef.current, { yPercent: 18, scale: 1.05, ease: "none" }, 0);
        }
        if (heroFgScrollRef.current) {
          heroTl.to(heroFgScrollRef.current, { yPercent: -10, scale: 1.04, ease: "none" }, 0);
        }
      }

      // B) Unified Master Section Stack: Phase 1 -> Grand Lobby Parallax -> Phase 2
      // Single continuous master scroll pin so scrubbing never breaks between sections!
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
            end: "+=720%",
            pin: pinnedViewportRef.current,
            pinSpacing: true,
            scrub: 0.6,
            onUpdate: (self) => {
              const p = self.progress;

              // Stage HUD indicator progression:
              // Phase 1 (0.00 - 0.36) | Grand Lobby (0.36 - 0.68) | Phase 2 (0.68 - 1.00)
              if (hudStep1Ref.current && hudStep2Ref.current && hudStep3Ref.current) {
                if (p < 0.36) {
                  hudStep1Ref.current.className = "flex items-center gap-1.5 text-amber-400 font-semibold transition-all duration-300";
                  hudStep2Ref.current.className = "flex items-center gap-1.5 text-white/40 transition-all duration-300";
                  hudStep3Ref.current.className = "flex items-center gap-1.5 text-white/40 transition-all duration-300";
                } else if (p < 0.68) {
                  hudStep1Ref.current.className = "flex items-center gap-1.5 text-white/40 transition-all duration-300";
                  hudStep2Ref.current.className = "flex items-center gap-1.5 text-amber-400 font-semibold transition-all duration-300";
                  hudStep3Ref.current.className = "flex items-center gap-1.5 text-white/40 transition-all duration-300";
                } else {
                  hudStep1Ref.current.className = "flex items-center gap-1.5 text-white/40 transition-all duration-300";
                  hudStep2Ref.current.className = "flex items-center gap-1.5 text-white/40 transition-all duration-300";
                  hudStep3Ref.current.className = "flex items-center gap-1.5 text-amber-400 font-semibold transition-all duration-300";
                }
              }

              if (snapBadgeRef.current) {
                const isParallaxActive = p >= 0.36 && p <= 0.68;
                snapBadgeRef.current.style.opacity = isParallaxActive ? "1" : "0";
                snapBadgeRef.current.style.transform = isParallaxActive ? "translate(-50%, 0)" : "translate(-50%, 12px)";
              }
            },
          },
        });

        // 1. Scrub Phase 1 frames 0..47 (Exterior Approach)
        masterTl.to(frameTrack1, {
          frame: PHASE1_FRAMES - 1,
          duration: 3.2,
          ease: "none",
          onUpdate: () => {
            renderPhase1(Math.round(frameTrack1.frame));
          },
        });

        // 2. Stack Transition: Layer 2 (Grand Lobby Parallax) slides up over Layer 1
        masterTl.to(stackLayer2Ref.current, {
          yPercent: 0,
          duration: 1.2,
          ease: "power2.inOut",
        });
        masterTl.to(stackLayer1Ref.current, {
          scale: 0.93,
          opacity: 0.35,
          duration: 1.2,
          ease: "power2.inOut",
        }, "<");

        // 3. Scrub Lobby Parallax Depth Layers (while in full focus)
        if (lobbyBgScrollRef.current) {
          masterTl.fromTo(
            lobbyBgScrollRef.current,
            { yPercent: -8, scale: 1.02 },
            { yPercent: 8, scale: 1.08, duration: 2.2, ease: "none" }
          );
        }
        if (deskFgScrollRef.current) {
          masterTl.fromTo(
            deskFgScrollRef.current,
            { yPercent: 8, scale: 1 },
            { yPercent: -10, scale: 1.05, duration: 2.2, ease: "none" },
            "<"
          );
        }

        // 4. Stack Transition: Layer 3 (Phase 2 Suites) slides up over Layer 2
        masterTl.to(stackLayer3Ref.current, {
          yPercent: 0,
          duration: 1.2,
          ease: "power2.inOut",
        });
        masterTl.to(stackLayer2Ref.current, {
          scale: 0.93,
          opacity: 0.35,
          duration: 1.2,
          ease: "power2.inOut",
        }, "<");

        // 5. Scrub Phase 2 frames 48..98 (Interior Suites Walkthrough)
        masterTl.to(frameTrack2, {
          frame: PHASE2_FRAMES - 1,
          duration: 3.5,
          ease: "none",
          onUpdate: () => {
            renderPhase2(Math.round(frameTrack2.frame));
          },
        });
      }
    }, containerRef);

    const handleResize = () => {
      renderPhase1(0);
      renderPhase2(0);
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (heroEl && heroMouseMove && heroMouseLeave) {
        heroEl.removeEventListener("mousemove", heroMouseMove);
        heroEl.removeEventListener("mouseleave", heroMouseLeave);
      }
      if (pinnedEl && parallaxMouseMove && parallaxMouseLeave) {
        pinnedEl.removeEventListener("mousemove", parallaxMouseMove);
        pinnedEl.removeEventListener("mouseleave", parallaxMouseLeave);
      }
      window.removeEventListener("resize", handleResize);
      ctx_gsap.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-[#09090b] text-white min-h-screen selection:bg-amber-400 selection:text-black overflow-x-hidden"
    >
      {/* Top Scrub Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-50 pointer-events-none">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 origin-left scale-x-0 transition-transform duration-75 will-change-transform"
        />
      </div>

      {/* Floating Header */}
      <header className="fixed top-6 left-6 right-6 z-40 flex items-center justify-between px-6 py-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 pointer-events-auto">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-white/80">
            Meely Experience
          </span>
        </div>
        <a
          href="/"
          className="text-xs font-mono tracking-wider uppercase px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white/90"
        >
          Exit to Main
        </a>
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
          className="absolute inset-0 w-[116%] h-[125%] -left-[8%] -top-[12%] overflow-hidden pointer-events-none"
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

        {/* Ambient Dark Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none z-10" />

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

        {/* Overlay Hero Typography */}
        <div
          ref={heroTextMouseRef}
          className="relative z-30 text-center pointer-events-none px-6 will-change-transform mt-[-5vh]"
        >
          <span className="inline-block px-3 py-1 mb-4 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono tracking-widest uppercase text-amber-300">
            Architectural Vision • Interactive 3D Depth
          </span>
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tight text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.95)]">
            MEELY
          </h1>
          <p className="mt-4 max-w-lg mx-auto text-sm sm:text-base md:text-lg text-white/80 font-light tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Move mouse to explore depth. Scroll down to enter the sequential experience.
          </p>

          <div className="mt-12 flex items-center justify-center gap-2 text-white/60 text-xs font-mono tracking-widest uppercase">
            <span>Scroll Down to Tour</span>
            <span className="inline-block animate-bounce">↓</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* UNIFIED CONTINUOUS SECTION STACK: Phase 1 -> Lobby Parallax -> Phase 2   */}
      {/* Continuous single master scroll pin (unbroken, zero scroll jitter)       */}
      {/* ========================================================================= */}
      <section
        ref={stackedContainerRef}
        className="relative w-full bg-black"
      >
        <div
          ref={pinnedViewportRef}
          className="h-screen w-full relative overflow-hidden bg-black cursor-crosshair select-none"
        >
          {/* ======================================================================= */}
          {/* STACK LAYER 1: Phase 1 (Exterior Approach Frames 0..47)                */}
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

            {/* Layer 1 Narrative HUD */}
            <div className="absolute top-24 sm:top-28 left-6 sm:left-12 z-20 pointer-events-none max-w-sm sm:max-w-md">
              <span className="inline-block px-3 py-1 mb-2 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono tracking-widest uppercase text-amber-300">
                Phase 01 • Exterior Approach
              </span>
              <h2 className="text-2xl sm:text-4xl font-light text-white tracking-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
                Threshold & Facade
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                Approaching the architectural entrance. Scrub down to seamlessly transition inside.
              </p>
            </div>
          </div>

          {/* ======================================================================= */}
          {/* STACK LAYER 2: Grand Reception (3D Parallax & Depth)                   */}
          {/* Stacks smoothly over Layer 1 as the user scrolls                        */}
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

            {/* Ambient Warm Gradient Blend */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/60 pointer-events-none z-10" />

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
                Stacked in place. Move cursor to inspect perspective depth.
              </p>
            </div>

            {/* Active Parallax Indicator Badge */}
            <div
              ref={snapBadgeRef}
              className="absolute bottom-24 sm:bottom-28 left-1/2 -translate-x-1/2 z-30 pointer-events-none text-center transition-all duration-300 ease-out"
            >
              <div className="px-5 py-2.5 rounded-2xl bg-black/80 backdrop-blur-xl border border-amber-400/40 shadow-[0_15px_40px_rgba(0,0,0,0.9)] flex items-center gap-2 max-w-sm">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-amber-300">
                  3D Parallax Stack Active • Keep Scrolling ↓
                </span>
              </div>
            </div>
          </div>

          {/* ======================================================================= */}
          {/* STACK LAYER 3: Phase 2 (Interior Corridor Walkthrough 48..98)           */}
          {/* Stacks smoothly over Layer 2 as scroll continues                         */}
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

            {/* Layer 3 Narrative HUD */}
            <div className="absolute top-24 sm:top-28 right-6 sm:right-12 z-20 pointer-events-none max-w-sm sm:max-w-md text-right">
              <span className="inline-block px-3 py-1 mb-2 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono tracking-widest uppercase text-amber-300">
                Phase 03 • Interior Corridor
              </span>
              <h2 className="text-2xl sm:text-4xl font-light text-white tracking-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
                Executive Suites
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                Walkthrough scrub continuing into private executive chambers.
              </p>
            </div>
          </div>

          {/* ======================================================================= */}
          {/* UNIFIED PERSISTENT HUD NAVIGATOR (Across Entire Stack)                  */}
          {/* ======================================================================= */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none text-center">
            <div className="px-5 py-2.5 rounded-full bg-black/85 backdrop-blur-xl border border-white/15 shadow-[0_10px_35px_rgba(0,0,0,0.9)] flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs font-mono uppercase tracking-wider">
              <div
                ref={hudStep1Ref}
                className="flex items-center gap-1.5 text-amber-400 font-semibold transition-all duration-300"
              >
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>01 Exterior</span>
              </div>
              <span className="text-white/20">/</span>
              <div
                ref={hudStep2Ref}
                className="flex items-center gap-1.5 text-white/40 transition-all duration-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                <span>02 Lobby Parallax</span>
              </div>
              <span className="text-white/20">/</span>
              <div
                ref={hudStep3Ref}
                className="flex items-center gap-1.5 text-white/40 transition-all duration-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                <span>03 Interior Suites</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. OUTRO SECTION: Final Architecture Showcase                            */}
      {/* ========================================================================= */}
      <section className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center px-6 py-24 relative border-t border-white/10">
        <div className="max-w-2xl text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-amber-400">Design Complete</span>
          <h2 className="text-4xl sm:text-6xl font-light text-white mt-3 tracking-tight">
            Crafted for Perspective.
          </h2>
          <p className="text-white/60 text-sm sm:text-base mt-4 leading-relaxed font-light">
            Every angle captured with computational fidelity. The complete progression flows seamlessly from exterior approach to the grand marble reception and inner architectural suites.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/"
              className="px-6 py-3 rounded-full bg-white text-black text-xs font-mono uppercase tracking-wider font-semibold hover:bg-amber-400 transition-colors shadow-lg shadow-white/10"
            >
              Explore Full Agency Site
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-6 py-3 rounded-full bg-white/5 border border-white/15 text-white text-xs font-mono uppercase tracking-wider hover:bg-white/10 transition-colors"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
