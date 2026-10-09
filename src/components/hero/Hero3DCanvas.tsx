import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6.5;

    // Renderer with explicit 100% alpha transparency
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Completely transparent background
    container.appendChild(renderer.domElement);

    // Main Group to hold architectural 3D shapes
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Outer Icosahedron Wireframe Cage (Vibrant Blue Digital Structure)
    const icosahedronGeo = new THREE.IcosahedronGeometry(2.2, 1);
    const icosahedronMat = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.2,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
      roughness: 0.2,
    });
    const icosahedronMesh = new THREE.Mesh(icosahedronGeo, icosahedronMat);
    mainGroup.add(icosahedronMesh);

    // 2. Inner High-Contrast Glossy Core (Design & Precision)
    const octahedronGeo = new THREE.OctahedronGeometry(1.45, 0);
    const octahedronMat = new THREE.MeshStandardMaterial({
      color: 0x09090b,
      metalness: 0.95,
      roughness: 0.12,
      emissive: 0x1e1b4b,
      emissiveIntensity: 0.35,
      transparent: true,
      opacity: 0.92,
    });
    const octahedronMesh = new THREE.Mesh(octahedronGeo, octahedronMat);
    mainGroup.add(octahedronMesh);

    // Inner Core Accent Wireframe Overlay
    const innerWireGeo = new THREE.OctahedronGeometry(1.48, 0);
    const innerWireMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const innerWireMesh = new THREE.Mesh(innerWireGeo, innerWireMat);
    octahedronMesh.add(innerWireMesh);

    // 3. Primary Glowing Cyan Orbital Ring
    const ringGeo1 = new THREE.TorusGeometry(2.7, 0.025, 32, 100);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.8,
      roughness: 0.1,
      metalness: 0.8,
      transparent: true,
      opacity: 0.85,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3;
    mainGroup.add(ringMesh1);

    // 4. Secondary Glowing Indigo Orbital Ring
    const ringGeo2 = new THREE.TorusGeometry(3.0, 0.02, 32, 100);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x4f46e5,
      emissive: 0x818cf8,
      emissiveIntensity: 0.7,
      roughness: 0.1,
      metalness: 0.8,
      transparent: true,
      opacity: 0.75,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.y = Math.PI / 4;
    ringMesh2.rotation.x = -Math.PI / 6;
    mainGroup.add(ringMesh2);

    // 5. Floating Glowing Satellite Nodes
    const nodeGroup = new THREE.Group();
    const nodeGeo = new THREE.SphereGeometry(0.09, 16, 16);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      emissive: 0x60a5fa,
      emissiveIntensity: 0.9,
      metalness: 0.5,
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

    // Lighting Setup for Pop & High Contrast 3D Definition
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x3b82f6, 4.0);
    dirLight1.position.set(6, 8, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x818cf8, 3.0);
    dirLight2.position.set(-6, -6, 4);
    scene.add(dirLight2);

    const rimLight = new THREE.PointLight(0x38bdf8, 5.0, 15);
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

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[420px] lg:min-h-[520px] relative bg-transparent pointer-events-none flex items-center justify-center filter drop-shadow-[0_15px_35px_rgba(37,99,235,0.2)]"
      aria-hidden="true"
    />
  );
};
