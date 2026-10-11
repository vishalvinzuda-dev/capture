import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const isWebGLAvailable = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
};

export const Hero3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    if (!isWebGLAvailable()) {
      setUseFallback(true);
      return;
    }

    // Dimensions
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // Scene
    const scene = new THREE.Scene();

    // Camera positioned with generous safety frustum so model + outer orbital rings are never clipped on any side
    const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 1000);
    camera.position.z = 8.5;

    // Renderer with explicit 100% alpha transparency
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "default",
        failIfMajorPerformanceCaveat: false,
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setClearColor(0x000000, 0); // Completely transparent background
      renderer.domElement.style.background = 'transparent';
      renderer.domElement.style.pointerEvents = 'none';
      renderer.domElement.style.overflow = 'visible';
      container.appendChild(renderer.domElement);
    } catch (err) {
      console.warn("WebGL renderer creation failed, falling back to SVG visualizer:", err);
      setUseFallback(true);
      return;
    }

    // Main Group to hold architectural 3D shapes
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Outer Icosahedron Wireframe Cage (Vibrant Amber/Gold Digital Structure #f9ba1d)
    const icosahedronGeo = new THREE.IcosahedronGeometry(2.2, 1);
    const icosahedronMat = new THREE.MeshStandardMaterial({
      color: 0xf9ba1d, // Brand Accent #f9ba1d
      emissive: 0xd97706, // Deep monochromatic amber
      emissiveIntensity: 0.35,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
      roughness: 0.2,
    });
    const icosahedronMesh = new THREE.Mesh(icosahedronGeo, icosahedronMat);
    mainGroup.add(icosahedronMesh);

    // 2. Inner High-Contrast Glossy Core (Design & Precision with warm bronze hue)
    const octahedronGeo = new THREE.OctahedronGeometry(1.45, 0);
    const octahedronMat = new THREE.MeshStandardMaterial({
      color: 0x09090b,
      metalness: 0.95,
      roughness: 0.12,
      emissive: 0x451a03, // Deep warm amber-black
      emissiveIntensity: 0.45,
      transparent: true,
      opacity: 0.94,
    });
    const octahedronMesh = new THREE.Mesh(octahedronGeo, octahedronMat);
    mainGroup.add(octahedronMesh);

    // Inner Core Accent Wireframe Overlay (Luminous golden lattice)
    const innerWireGeo = new THREE.OctahedronGeometry(1.48, 0);
    const innerWireMat = new THREE.MeshBasicMaterial({
      color: 0xfde047, // Luminous light gold
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const innerWireMesh = new THREE.Mesh(innerWireGeo, innerWireMat);
    octahedronMesh.add(innerWireMesh);

    // 3. Primary Glowing Golden Orbital Ring (#f9ba1d)
    const ringGeo1 = new THREE.TorusGeometry(2.7, 0.025, 32, 100);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0xf9ba1d,
      emissive: 0xfbbf24,
      emissiveIntensity: 0.9,
      roughness: 0.1,
      metalness: 0.8,
      transparent: true,
      opacity: 0.85,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3;
    mainGroup.add(ringMesh1);

    // 4. Secondary Glowing Deep Amber Bronze Orbital Ring
    const ringGeo2 = new THREE.TorusGeometry(3.0, 0.02, 32, 100);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0xb45309,
      emissive: 0xd97706,
      emissiveIntensity: 0.75,
      roughness: 0.1,
      metalness: 0.8,
      transparent: true,
      opacity: 0.75,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.y = Math.PI / 4;
    ringMesh2.rotation.x = -Math.PI / 6;
    mainGroup.add(ringMesh2);

    // 5. Floating Glowing Golden Satellite Nodes
    const nodeGroup = new THREE.Group();
    const nodeGeo = new THREE.SphereGeometry(0.09, 16, 16);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xf9ba1d,
      emissive: 0xfde047,
      emissiveIntensity: 1.0,
      metalness: 0.6,
      roughness: 0.1,
    });

    const nodePositions = [
      [2.3, 0.9, 0.6],
      [-1.9, 1.6, -0.9],
      [0.7, -2.2, 1.3],
      [-2.1, -1.3, 1.0],
      [1.5, 1.9, -1.5],
      [-0.8, 2.3, 0.7],
    ];

    nodePositions.forEach(([x, y, z]) => {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(x, y, z);
      nodeGroup.add(node);
    });
    mainGroup.add(nodeGroup);

    // Lighting Setup for Pop & High Contrast 3D Definition in Amber Palette
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xf9ba1d, 4.2);
    dirLight1.position.set(6, 8, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xd97706, 3.2);
    dirLight2.position.set(-6, -6, 4);
    scene.add(dirLight2);

    const rimLight = new THREE.PointLight(0xfde047, 5.5, 15);
    rimLight.position.set(0, 0, -4);
    scene.add(rimLight);

    // Mouse Tracking for Smooth Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (event.clientX / innerWidth - 0.5) * 2;
      mouseY = (event.clientY / innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Mouse interpolation
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Group rotation
      mainGroup.rotation.y = elapsedTime * 0.22 + targetX * 0.45;
      mainGroup.rotation.x = Math.sin(elapsedTime * 0.18) * 0.2 + targetY * 0.35;

      // Inner object counter rotation
      octahedronMesh.rotation.y = -elapsedTime * 0.45;
      octahedronMesh.rotation.z = elapsedTime * 0.35;

      // Orbital rings bobbing
      ringMesh1.rotation.z = elapsedTime * 0.12;
      ringMesh2.rotation.z = -elapsedTime * 0.1;

      // Satellite node pulsing
      nodeGroup.rotation.y = elapsedTime * 0.15;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, []);

  if (useFallback) {
    return (
      <div
        className="w-full h-full relative bg-transparent flex items-center justify-center select-none pointer-events-none"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 500 500"
          className="w-full max-w-[620px] h-auto animate-float-gentle"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="fallbackGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F9BA1D" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#D97706" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#451A03" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="amberWire" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="50%" stopColor="#F9BA1D" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <linearGradient id="coreFacet" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#18181B" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#09090B" stopOpacity="0.85" />
            </linearGradient>
          </defs>

          {/* Ambient Glow */}
          <circle cx="250" cy="250" r="210" fill="url(#fallbackGlow)" className="animate-pulse-slow" />

          {/* Outer Orbital Ring 1 */}
          <ellipse
            cx="250"
            cy="250"
            rx="195"
            ry="75"
            stroke="#F9BA1D"
            strokeWidth="1.8"
            strokeDasharray="6 8"
            strokeOpacity="0.75"
            transform="rotate(-25 250 250)"
          />

          {/* Outer Orbital Ring 2 */}
          <ellipse
            cx="250"
            cy="250"
            rx="180"
            ry="85"
            stroke="#D97706"
            strokeWidth="1.8"
            strokeDasharray="12 6"
            strokeOpacity="0.6"
            transform="rotate(35 250 250)"
          />

          {/* Floating Satellite Nodes */}
          <circle cx="110" cy="210" r="5" fill="#F9BA1D" />
          <circle cx="110" cy="210" r="10" stroke="#F9BA1D" strokeWidth="1" strokeOpacity="0.4" />

          <circle cx="390" cy="290" r="6" fill="#FDE047" />
          <circle cx="390" cy="290" r="12" stroke="#FDE047" strokeWidth="1" strokeOpacity="0.3" />

          <circle cx="290" cy="115" r="4.5" fill="#FBBF24" />
          <circle cx="200" cy="380" r="5" fill="#D97706" />

          {/* Central Architectural Wireframe Octahedron/Cage */}
          <g transform="translate(250, 250)">
            {/* Dark Glossy Inner Facets */}
            <polygon points="0,-105 90,0 0,35 -90,0" fill="url(#coreFacet)" stroke="#F9BA1D" strokeWidth="1.5" strokeOpacity="0.8" />
            <polygon points="0,105 90,0 0,35 -90,0" fill="url(#coreFacet)" stroke="#D97706" strokeWidth="1.5" strokeOpacity="0.8" />
            <polygon points="0,-105 0,35 90,0" fill="#F9BA1D" fillOpacity="0.12" />
            <polygon points="0,-105 0,35 -90,0" fill="#FDE047" fillOpacity="0.08" />

            {/* Outer Icosahedron Wireframe Lines */}
            <polygon points="0,-140 120,-45 75,100 -75,100 -120,-45" fill="none" stroke="url(#amberWire)" strokeWidth="2" strokeOpacity="0.85" />
            <line x1="0" y1="-140" x2="75" y2="100" stroke="#FDE047" strokeWidth="1.5" strokeOpacity="0.6" />
            <line x1="0" y1="-140" x2="-75" y2="100" stroke="#FDE047" strokeWidth="1.5" strokeOpacity="0.6" />
            <line x1="-120" y1="-45" x2="120" y2="-45" stroke="#F9BA1D" strokeWidth="1.2" strokeOpacity="0.65" strokeDasharray="4 4" />
            <line x1="-120" y1="-45" x2="75" y2="100" stroke="#D97706" strokeWidth="1.2" strokeOpacity="0.5" />
            <line x1="120" y1="-45" x2="-75" y2="100" stroke="#D97706" strokeWidth="1.2" strokeOpacity="0.5" />

            {/* Center Core Light Node */}
            <circle cx="0" cy="0" r="8" fill="#FDE047" />
            <circle cx="0" cy="0" r="16" fill="#F9BA1D" fillOpacity="0.3" />
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="w-full h-full relative bg-transparent pointer-events-none flex items-center justify-center overflow-visible"
      aria-hidden="true"
    />
  );
};
