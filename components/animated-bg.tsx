"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/** Soft floating particles and gentle light motes — daylight palette only */
export function AnimatedBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xfff5f0, 1.1);
    scene.add(ambient);

    const key = new THREE.PointLight(0xffe4ec, 0.9, 80);
    key.position.set(4, 8, 10);
    scene.add(key);

    const fill = new THREE.PointLight(0xe0c3fc, 0.65, 70);
    fill.position.set(-10, 2, 6);
    scene.add(fill);

    const particleGeometry = new THREE.BufferGeometry();
    const count = 220;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 52;
      positions[i + 1] = (Math.random() - 0.5) * 32;
      positions[i + 2] = (Math.random() - 0.5) * 24;
      speeds[i / 3] = 0.15 + Math.random() * 0.55;
    }
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: "#ffffff",
      size: 0.12,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const dotGeometry = new THREE.BufferGeometry();
    const dotCount = 90;
    const dotPositions = new Float32Array(dotCount * 3);
    for (let i = 0; i < dotCount * 3; i += 3) {
      dotPositions[i] = (Math.random() - 0.5) * 48;
      dotPositions[i + 1] = (Math.random() - 0.5) * 28;
      dotPositions[i + 2] = (Math.random() - 0.5) * 20;
    }
    dotGeometry.setAttribute("position", new THREE.BufferAttribute(dotPositions, 3));
    const dotMaterial = new THREE.PointsMaterial({
      color: "#ffd6e8",
      size: 0.22,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const dots = new THREE.Points(dotGeometry, dotMaterial);
    scene.add(dots);

    let frameId = 0;
    let t = 0;

    const animate = () => {
      t += 0.012;
      particles.rotation.y += 0.00055;
      particles.rotation.x += 0.00025;
      particles.position.y = Math.sin(t * 0.35) * 0.35;

      dots.rotation.y -= 0.0004;
      dots.position.y = Math.cos(t * 0.28) * 0.25;

      const pos = particleGeometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < pos.count; i += 1) {
        const y = pos.getY(i) + Math.sin(t + i * 0.08) * 0.0018 * speeds[i];
        pos.setY(i, y);
      }
      pos.needsUpdate = true;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      particleGeometry.dispose();
      dotGeometry.dispose();
      particleMaterial.dispose();
      dotMaterial.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="pointer-events-none absolute inset-0 opacity-90" aria-hidden="true" />;
}
