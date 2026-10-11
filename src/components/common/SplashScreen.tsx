import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  C_EMBLEM_PATHS,
  CAPTURE_PATHS,
  CREATIVES_PATHS,
  TAGLINE_PATHS,
} from './logoPaths';

interface SplashScreenProps {
  onComplete: () => void;
}

// Normalize color fills for seamless presentation on architectural background
function getCleanFill(fill: string): string {
  // Amber / Golden script and accent elements
  if (
    fill.includes('248') ||
    fill.includes('246') ||
    fill.includes('247') ||
    fill.includes('243')
  ) {
    return '#F8BA1D';
  }
  // Dark text and brand body (capure-logo.svg has native compound cutouts)
  return '#18181B';
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const finish = useCallback(() => {
    setProgress(100);
    setIsFinished(true);
    setTimeout(() => {
      onCompleteRef.current();
    }, 450);
  }, []);

  useEffect(() => {
    let animId: number;
    let holdTimeout: ReturnType<typeof setTimeout>;
    const startTime = performance.now();
    // Total active animation time: 3700ms (0 to 100%) + 350ms final hold = exactly 4.05s total
    const ANIMATION_DURATION = 3700;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(100, (elapsed / ANIMATION_DURATION) * 100);
      setProgress(Math.round(rawProgress));

      if (elapsed < ANIMATION_DURATION) {
        animId = requestAnimationFrame(tick);
      } else {
        // Hold for 350ms at 100% so the user experiences the complete master lockup
        holdTimeout = setTimeout(finish, 350);
      }
    };

    animId = requestAnimationFrame(tick);

    // Hard safety timeout: max 4.6s
    const safety = setTimeout(() => {
      cancelAnimationFrame(animId);
      clearTimeout(holdTimeout);
      finish();
    }, 4600);

    // Keyboard shortcut to skip immediately
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        cancelAnimationFrame(animId);
        clearTimeout(holdTimeout);
        clearTimeout(safety);
        finish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(holdTimeout);
      clearTimeout(safety);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [finish]);

  // Cinematic Motion Choreography Phases:
  // Phase 1 (0% - 28% | 0.0s - 1.1s): Origin - Centered Standalone C Aperture Emblem with rotating HUD reticle
  // Phase 2 (28% - 74% | 1.1s - 2.8s): Creation - Kinetic glide upward while radiant laser horizon reveals text
  // Phase 3 (74% - 100% | 2.8s - 3.7s): Master - Unified vector lockup with specular light sheen & lens flare
  // Phase 4 (Hold 3.7s - 4.05s): Complete Master Brand Resolution
  const isCreationPhase = progress >= 28;
  const isMasterPhase = progress >= 74;

  // Smooth linear progression within Phase 2 (0 to 1)
  const creationProgress = !isCreationPhase
    ? 0
    : isMasterPhase
    ? 1
    : Math.min(1, Math.max(0, (progress - 28) / 46));

  // Laser beam Y coordinate in local SVG coordinate space (sweeps from 590 to 885)
  const laserY = 590 + creationProgress * 295;
  const revealedHeight = Math.max(0, laserY - 580);

  // Emblem transform: starts at center (+21.1px, +128.5px) scaled 1.65x, then glides to (0, 0) scale 1.0x
  const emblemTranslateX = isCreationPhase ? 0 : 21.1;
  const emblemTranslateY = isCreationPhase ? 0 : 128.5;
  const emblemScale = isCreationPhase ? 1.0 : 1.65;

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            filter: 'blur(12px)',
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
          }}
          onClick={finish}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAFAF9] text-[#18181B] select-none cursor-pointer overflow-hidden"
          title="Click to enter immediately"
        >
          {/* Subtle architectural engineering grid */}
          <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

          {/* Ambient Warm Volumetric Golden Light Pulse */}
          <motion.div
            animate={{
              scale: isCreationPhase ? [1, 1.25, 1.1] : [0.95, 1.15, 0.95],
              opacity: isMasterPhase ? 0.35 : 0.65,
            }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[480px] h-96 sm:h-[480px] rounded-full bg-gradient-to-tr from-amber-300/30 via-amber-400/20 to-transparent blur-3xl pointer-events-none"
          />

          {/* Architectural Viewport Crosshair Accents */}
          <div className="absolute top-6 left-6 text-neutral-300 text-xs font-mono select-none pointer-events-none">
            +
          </div>
          <div className="absolute top-6 right-6 text-neutral-300 text-xs font-mono select-none pointer-events-none">
            +
          </div>
          <div className="absolute bottom-6 left-6 text-neutral-300 text-xs font-mono select-none pointer-events-none">
            +
          </div>
          <div className="absolute bottom-6 right-6 text-neutral-300 text-xs font-mono select-none pointer-events-none">
            +
          </div>

          {/* Top HUD Telemetry Bar */}
          <div className="absolute top-6 left-0 right-0 px-8 flex items-center justify-between pointer-events-none text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 bg-[#18181B] inline-block" />
              <span className="font-semibold text-neutral-700">Capture Creatives</span>
              <span className="text-neutral-300">/</span>
              <span className="text-neutral-400 hidden sm:inline">Brand Identity System</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              <span>SEQ // 01 · 24FPS</span>
            </div>
          </div>

          {/* =============================================================== */}
          {/* MAIN VECTOR MOTION GRAPHICS STAGE                               */}
          {/* Full-bleed, seamless pure SVG vector artwork - Zero Boxes       */}
          {/* =============================================================== */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full px-6">
            
            <div className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[480px] aspect-[640/660] flex items-center justify-center">
              
              <svg
                viewBox="192 248 640 660"
                className="w-full h-full overflow-visible drop-shadow-[0_12px_32px_rgba(0,0,0,0.06)]"
              >
                <defs>
                  {/* Glowing Laser Horizon Gradient */}
                  <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F8BA1D" stopOpacity="0" />
                    <stop offset="25%" stopColor="#F8BA1D" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#FFE082" stopOpacity="1" />
                    <stop offset="75%" stopColor="#F8BA1D" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#F8BA1D" stopOpacity="0" />
                  </linearGradient>

                  {/* Laser Spark Glow Filter */}
                  <filter id="laserGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {/* Golden Aperture Lens Pulse Filter */}
                  <filter id="amberAura" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {/* Diagonal Metallic Specular Sheen Gradient */}
                  <linearGradient id="specularSheen" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                    <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#FFE58F" stopOpacity="0.85" />
                    <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                  </linearGradient>

                  {/* Typography Reveal ClipPath */}
                  <clipPath id="laserRevealClip">
                    <rect
                      x="180"
                      y="580"
                      width="660"
                      height={isMasterPhase ? 340 : revealedHeight}
                    />
                  </clipPath>
                </defs>

                {/* ----------------------------------------------------------- */}
                {/* HUD APERTURE RETICLE (Phase 1 Only - Rotates & Dissolves)   */}
                {/* ----------------------------------------------------------- */}
                <motion.g
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={
                    isCreationPhase
                      ? { opacity: 0, scale: 1.25, transition: { duration: 0.8, ease: 'easeOut' } }
                      : { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } }
                  }
                  style={{ transformOrigin: '512px 578px' }}
                >
                  {/* Rotating Dashed Compass Ring */}
                  <motion.circle
                    cx="512"
                    cy="578"
                    r="150"
                    fill="none"
                    stroke="rgba(248, 186, 29, 0.4)"
                    strokeWidth="1.2"
                    strokeDasharray="6 8"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: '512px 578px' }}
                  />

                  {/* Cardinal Alignment Ticks */}
                  <line x1="512" y1="416" x2="512" y2="424" stroke="rgba(248, 186, 29, 0.7)" strokeWidth="1.5" />
                  <line x1="512" y1="732" x2="512" y2="740" stroke="rgba(248, 186, 29, 0.7)" strokeWidth="1.5" />
                  <line x1="350" y1="578" x2="358" y2="578" stroke="rgba(248, 186, 29, 0.7)" strokeWidth="1.5" />
                  <line x1="666" y1="578" x2="674" y2="578" stroke="rgba(248, 186, 29, 0.7)" strokeWidth="1.5" />

                  {/* Technical Optics Telemetry Labels */}
                  <text
                    x="512"
                    y="405"
                    textAnchor="middle"
                    fill="#A1A1AA"
                    fontSize="9"
                    fontFamily="monospace"
                    letterSpacing="0.25em"
                  >
                    F/1.4 · 50MM
                  </text>
                  <text
                    x="512"
                    y="758"
                    textAnchor="middle"
                    fill="#A1A1AA"
                    fontSize="9"
                    fontFamily="monospace"
                    letterSpacing="0.25em"
                  >
                    RAW · EXP 01
                  </text>
                </motion.g>

                {/* ----------------------------------------------------------- */}
                {/* GROUP 1: Standalone C Emblem (Capure.svg) Kinetic Glide     */}
                {/* ----------------------------------------------------------- */}
                <motion.g
                  animate={{
                    x: emblemTranslateX,
                    y: emblemTranslateY,
                    scale: emblemScale,
                  }}
                  transition={{
                    duration: 1.25,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ transformOrigin: '490.9px 449.5px' }}
                >
                  {/* Glowing Amber Backlight on C Emblem crescent */}
                  <circle
                    cx="605"
                    cy="540"
                    r="45"
                    fill="rgba(248, 186, 29, 0.25)"
                    filter="url(#amberAura)"
                  />

                  {/* Vector Paths of C Emblem */}
                  {C_EMBLEM_PATHS.map((path, idx) => (
                    <motion.path
                      key={`emblem-${idx}`}
                      d={path.d}
                      fill={getCleanFill(path.fill)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8 }}
                    />
                  ))}
                </motion.g>

                {/* ----------------------------------------------------------- */}
                {/* GROUP 2: Typography Lockup (capure-logo.svg) Vector Reveal   */}
                {/* Clipped dynamically by the laser beam horizon               */}
                {/* ----------------------------------------------------------- */}
                <g clipPath="url(#laserRevealClip)">
                  {/* "CAPTURE" Wordmark Paths */}
                  {CAPTURE_PATHS.map((path, idx) => (
                    <path
                      key={`capture-${idx}`}
                      d={path.d}
                      fill={getCleanFill(path.fill)}
                    />
                  ))}

                  {/* "CREATIVES" Radiant Amber Script Paths */}
                  {CREATIVES_PATHS.map((path, idx) => (
                    <path
                      key={`creatives-${idx}`}
                      d={path.d}
                      fill={getCleanFill(path.fill)}
                    />
                  ))}

                  {/* Descriptor Tagline Paths */}
                  {TAGLINE_PATHS.map((path, idx) => (
                    <path
                      key={`tagline-${idx}`}
                      d={path.d}
                      fill={getCleanFill(path.fill)}
                    />
                  ))}
                </g>

                {/* ----------------------------------------------------------- */}
                {/* GROUP 3: Radiant Golden Laser Horizon Line & Plasma Sparks   */}
                {/* ----------------------------------------------------------- */}
                {isCreationPhase && !isMasterPhase && (
                  <g>
                    {/* Glowing Laser Beam */}
                    <line
                      x1="220"
                      y1={laserY}
                      x2="804"
                      y2={laserY}
                      stroke="url(#laserGrad)"
                      strokeWidth="2.5"
                      filter="url(#laserGlow)"
                    />

                    {/* Central Plasma Spark Emitters */}
                    <circle cx="512" cy={laserY} r="3" fill="#FFE082" />
                    <circle cx="512" cy={laserY} r="8" fill="none" stroke="rgba(248,186,29,0.6)" strokeWidth="1" />
                    <circle cx="410" cy={laserY} r="1.5" fill="#FFE082" />
                    <circle cx="614" cy={laserY} r="1.5" fill="#FFE082" />

                    {/* Laser Telemetry Y Coordinate Indicator */}
                    <text
                      x="816"
                      y={laserY + 3}
                      fill="#F8BA1D"
                      fontSize="7"
                      fontFamily="monospace"
                      letterSpacing="0.1em"
                    >
                      {Math.round(creationProgress * 100)}%
                    </text>
                  </g>
                )}

                {/* ----------------------------------------------------------- */}
                {/* GROUP 4: Specular Light Sheen & Starburst Flare (Phase 3)    */}
                {/* ----------------------------------------------------------- */}
                {isMasterPhase && (
                  <>
                    {/* Diagonal Specular Sheen Sweep Across Full Vector Lockup */}
                    <motion.rect
                      x="100"
                      y="240"
                      width="130"
                      height="680"
                      fill="url(#specularSheen)"
                      transform="skewX(-28)"
                      initial={{ x: -120 }}
                      animate={{ x: 1020 }}
                      transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
                      style={{ pointerEvents: 'none' }}
                    />

                    {/* Anamorphic Lens Flare Starburst on Golden Aperture Crescent */}
                    <motion.g
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: [0, 1.35, 1],
                        opacity: [0, 0.95, 0.25],
                      }}
                      transition={{ duration: 1.1, ease: 'easeOut', delay: 0.15 }}
                      style={{ transformOrigin: '585px 538px' }}
                    >
                      <circle cx="585" cy="538" r="18" fill="rgba(255, 224, 130, 0.7)" filter="url(#amberAura)" />
                      <line x1="550" y1="538" x2="620" y2="538" stroke="#FFF9C4" strokeWidth="1.5" />
                      <line x1="585" y1="503" x2="585" y2="573" stroke="#FFF9C4" strokeWidth="1.5" />
                    </motion.g>
                  </>
                )}

              </svg>

            </div>

            {/* =============================================================== */}
            {/* MINIMALIST TELEMETRY & PROGRESS CONTROLS                         */}
            {/* =============================================================== */}
            <div className="mt-8 flex flex-col items-center w-64 sm:w-72">
              
              {/* Precision Dual Progress Bar */}
              <div className="w-full h-1 bg-neutral-200/90 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-neutral-900 rounded-full relative"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'linear', duration: 0.05 }}
                >
                  {/* Radiant Amber Energy Tip */}
                  <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-amber-400 rounded-full shadow-[0_0_8px_rgba(248,186,29,0.95)]" />
                </motion.div>
              </div>

              {/* Architectural Status Line */}
              <div className="flex items-center justify-between w-full mt-2.5 text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                <span className="flex items-center gap-1.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isMasterPhase
                        ? 'bg-amber-500 animate-pulse'
                        : isCreationPhase
                        ? 'bg-[#F9BA1D]'
                        : 'bg-neutral-900'
                    }`}
                  />
                  <span className="font-medium">
                    {isMasterPhase
                      ? 'MASTER LOCKUP READY'
                      : isCreationPhase
                      ? 'SYNTHESIZING LOGO'
                      : 'APERTURE ORIGIN'}
                  </span>
                </span>
                <span className="font-semibold text-neutral-900">{progress}%</span>
              </div>

              {/* Click / Key Skip Prompt */}
              <div className="mt-3 text-[9px] font-mono tracking-wider text-neutral-400">
                Press Space or Click anywhere to enter
              </div>

            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
