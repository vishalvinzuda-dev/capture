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

  // 2. Phase 1 Tour (Old frames 0..47) refs
  const phase1SectionRef = useRef<HTMLDivElement>(null);
  const phase1CanvasRef = useRef<HTMLCanvasElement>(null);

  // 3. Parallax Frame with Scroll Snap refs (Lobby BG + Desk FG)
  const parallaxSectionRef = useRef<HTMLDivElement>(null);
  const lobbyBgScrollRef = useRef<HTMLDivElement>(null);
  const lobbyBgMouseRef = useRef<HTMLDivElement>(null);
  const deskFgScrollRef = useRef<HTMLDivElement>(null);
  const deskFgMouseRef = useRef<HTMLDivElement>(null);
  const lobbyTextMouseRef = useRef<HTMLDivElement>(null);
  const snapBadgeRef = useRef<HTMLDivElement>(null);

  // 4. Phase 2 Tour (Extra frames 48..98) refs
  const phase2SectionRef = useRef<HTMLDivElement>(null);
  const phase2CanvasRef = useRef<HTMLCanvasElement>(null);

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
    // 4. Mouse Parallax for Lobby Parallax Frame
    // -----------------------------------------------------------------
    const parallaxEl = parallaxSectionRef.current;
    let parallaxMouseMove: ((e: MouseEvent) => void) | null = null;
    let parallaxMouseLeave: (() => void) | null = null;

    if (parallaxEl && lobbyBgMouseRef.current && deskFgMouseRef.current) {
      const lobbyBgQuickX = gsap.quickTo(lobbyBgMouseRef.current, "x", { duration: 0.8, ease: "power2.out" });
      const lobbyBgQuickY = gsap.quickTo(lobbyBgMouseRef.current, "y", { duration: 0.8, ease: "power2.out" });

      const deskFgQuickX = gsap.quickTo(deskFgMouseRef.current, "x", { duration: 0.55, ease: "power2.out" });
      const deskFgQuickY = gsap.quickTo(deskFgMouseRef.current, "y", { duration: 0.55, ease: "power2.out" });
      const deskFgRotY = gsap.quickTo(deskFgMouseRef.current, "rotationY", { duration: 0.55, ease: "power2.out" });
      const deskFgRotX = gsap.quickTo(deskFgMouseRef.current, "rotationX", { duration: 0.55, ease: "power2.out" });

      const lobbyTextQuickX = lobbyTextMouseRef.current ? gsap.quickTo(lobbyTextMouseRef.current, "x", { duration: 0.7, ease: "power2.out" }) : null;
      const lobbyTextQuickY = lobbyTextMouseRef.current ? gsap.quickTo(lobbyTextMouseRef.current, "y", { duration: 0.7, ease: "power2.out" }) : null;

      parallaxMouseMove = (e: MouseEvent) => {
        const rect = parallaxEl.getBoundingClientRect();
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

      parallaxEl.addEventListener("mousemove", parallaxMouseMove);
      parallaxEl.addEventListener("mouseleave", parallaxMouseLeave);
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

      // B) Frame Sequence Part 1: Old Frames (0..47)
      if (phase1SectionRef.current) {
        const frameTrack1 = { frame: 0 };
        gsap.to(frameTrack1, {
          frame: PHASE1_FRAMES - 1,
          ease: "none",
          scrollTrigger: {
            id: "phase-1-old-frames",
            trigger: phase1SectionRef.current,
            start: "top top",
            end: "+=280%",
            pin: true,
            scrub: 0.5,
            onUpdate: () => {
              renderPhase1(Math.round(frameTrack1.frame));
            },
          },
        });
      }

      // C) Parallax Frame with Scroll Snap (Lobby BG + Desk FG)
      // Placed immediately after old frames with magnetic snap scroll!
      if (parallaxSectionRef.current) {
        const parallaxTl = gsap.timeline({
          scrollTrigger: {
            id: "lobby-parallax-snap",
            trigger: parallaxSectionRef.current,
            start: "top top",
            end: "+=200%",
            pin: true,
            scrub: 0.6,
            snap: {
              snapTo: (value) => {
                // Magnetically snaps to the centered hold point (0.50)
                if (value >= 0.25 && value <= 0.75) {
                  return 0.5;
                }
                if (value < 0.25) return 0;
                return 1;
              },
              duration: { min: 0.35, max: 0.65 },
              delay: 0.05,
              ease: "power2.out",
            },
            onUpdate: (self) => {
              const isSnapped = self.progress >= 0.35 && self.progress <= 0.65;
              if (snapBadgeRef.current) {
                snapBadgeRef.current.style.opacity = isSnapped ? "1" : "0.6";
                snapBadgeRef.current.style.transform = isSnapped
                  ? "translate(-50%, 0)"
                  : "translate(-50%, 8px)";
              }
            },
          },
        });

        // Parallax depth motion as user scrubs through this pinned frame
        if (lobbyBgScrollRef.current) {
          parallaxTl.fromTo(
            lobbyBgScrollRef.current,
            { yPercent: -8, scale: 1 },
            { yPercent: 8, scale: 1.08, ease: "none" },
            0
          );
        }

        if (deskFgScrollRef.current) {
          parallaxTl.fromTo(
            deskFgScrollRef.current,
            { yPercent: 8, scale: 1 },
            { yPercent: -10, scale: 1.05, ease: "none" },
            0
          );
        }
      }

      // D) Frame Sequence Part 2: Extra Frames Afterwards (48..98)
      if (phase2SectionRef.current) {
        const frameTrack2 = { frame: 0 };
        gsap.to(frameTrack2, {
          frame: PHASE2_FRAMES - 1,
          ease: "none",
          scrollTrigger: {
            id: "phase-2-extra-frames",
            trigger: phase2SectionRef.current,
            start: "top top",
            end: "+=280%",
            pin: true,
            scrub: 0.5,
            onUpdate: () => {
              renderPhase2(Math.round(frameTrack2.frame));
            },
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
      if (parallaxEl && parallaxMouseMove && parallaxMouseLeave) {
        parallaxEl.removeEventListener("mousemove", parallaxMouseMove);
        parallaxEl.removeEventListener("mouseleave", parallaxMouseLeave);
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
      {/* 2. PHASE 1: Old Frames (Exterior Approach & Entry 0..47)                  */}
      {/* ========================================================================= */}
      <section
        ref={phase1SectionRef}
        className="h-screen w-full relative bg-black overflow-hidden flex items-center justify-center"
      >
        <canvas
          ref={phase1CanvasRef}
          className="w-full h-full block object-cover will-change-transform select-none"
        />

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

        {/* Phase 1 HUD Badge */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center">
          <div className="px-5 py-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="text-xs font-mono uppercase tracking-widest text-white/90">
              Phase 1: Exterior Approach (Frames 0–47)
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. PARALLAX FRAME WITH SCROLL SNAP: Luxury Lobby & Marble Desk            */}
      {/* ========================================================================= */}
      <section
        ref={parallaxSectionRef}
        className="h-screen w-full relative bg-black overflow-hidden flex items-center justify-center cursor-crosshair"
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
          className="absolute top-28 sm:top-32 left-1/2 -translate-x-1/2 z-30 pointer-events-none text-center max-w-lg px-6 will-change-transform"
        >
          <span className="inline-block px-3 py-1 mb-2 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/30 text-[10px] font-mono tracking-widest uppercase text-amber-300">
            Grand Reception • Parallax Experience
          </span>
          <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
            Marble & Illumination
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-white/70 font-light drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Scroll snapped into depth view. Move cursor to inspect architectural perspective.
          </p>
        </div>

        {/* Scroll Snap Locked HUD Badge */}
        <div
          ref={snapBadgeRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 pointer-events-none text-center transition-all duration-400 ease-out"
        >
          <div className="px-6 py-3.5 rounded-2xl bg-black/80 backdrop-blur-xl border border-amber-400/50 shadow-[0_15px_40px_rgba(0,0,0,0.9)] flex flex-col items-center gap-1.5 max-w-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-amber-300">
                Parallax Frame • Scroll Snap Active
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-white/80 uppercase tracking-wider">
              <span>Scroll to Continue into Interior Suites</span>
              <span className="animate-bounce font-bold text-amber-400">↓</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. PHASE 2: Extra Frames Afterwards (Interior Suites 48..98)              */}
      {/* ========================================================================= */}
      <section
        ref={phase2SectionRef}
        className="h-screen w-full relative bg-black overflow-hidden flex items-center justify-center"
      >
        <canvas
          ref={phase2CanvasRef}
          className="w-full h-full block object-cover will-change-transform select-none"
        />

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

        {/* Phase 2 HUD Badge */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center">
          <div className="px-5 py-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="text-xs font-mono uppercase tracking-widest text-white/90">
              Phase 2: Interior Corridor Walkthrough (Frames 48–98)
            </span>
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
