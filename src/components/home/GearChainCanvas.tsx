"use client";

import React, { useEffect, useRef } from "react";
import type { Locale } from "@/lib/i18n";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GearChainCanvasProps {
  lang: Locale;
}

interface GearDef {
  index: number;
  spriteIndex: number;
  radius: number; // visual radius in px
  ratio: number;  // gear teeth ratio relative to base gear
  dir: number;    // 1 or -1 for alternating rotation
}

export function GearChainCanvas({ lang }: GearChainCanvasProps) {
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const fgCanvasRef = useRef<HTMLCanvasElement>(null);
  const isRtl = lang === "ar";

  useEffect(() => {
    const bgCanvas = bgCanvasRef.current;
    const fgCanvas = fgCanvasRef.current;
    if (!bgCanvas || !fgCanvas) return;

    const bgCtx = bgCanvas.getContext("2d", { alpha: true });
    const fgCtx = fgCanvas.getContext("2d", { alpha: true });
    if (!bgCtx || !fgCtx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // 1. Load Pre-rendered Gear Sprites
    const spriteUrls = [
      "/images/gears/gear-drive-spur.webp",  // 0: Titanium Spur (Large)
      "/images/gears/gear-pinion-steel.webp", // 1: Steel Pinion (Small)
      "/images/gears/gear-accent-brass.webp", // 2: Brass Idler (Medium)
    ];

    const sprites: HTMLImageElement[] = [];
    let loadedCount = 0;
    spriteUrls.forEach((url, idx) => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
      };
      img.onerror = () => {
        console.error("Failed to load gear sprite:", url);
      };
      img.src = url;
      if (img.complete && img.naturalWidth > 0) {
        loadedCount++;
      }
      sprites[idx] = img;
    });

    // 2. Define Chain of Gears
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let isMobile = width < 768;
    let totalGears = isMobile ? 16 : 26;

    let baseRadius = isMobile ? 28 : 42;
    let pinionRadius = baseRadius * 0.58;
    let brassRadius = baseRadius * 0.78;

    let gears: GearDef[] = [];
    const rebuildGears = () => {
      isMobile = width < 768;
      totalGears = isMobile ? 16 : 26;
      baseRadius = isMobile ? 28 : 42;
      pinionRadius = baseRadius * 0.58;
      brassRadius = baseRadius * 0.78;

      gears = [];
      for (let i = 0; i < totalGears; i++) {
        let spriteIdx = 0;
        let r = baseRadius;
        if (i % 3 === 1) {
          spriteIdx = 1;
          r = pinionRadius;
        } else if (i % 3 === 2) {
          spriteIdx = 2;
          r = brassRadius;
        } else {
          spriteIdx = 0;
          r = baseRadius;
        }

        gears.push({
          index: i,
          spriteIndex: spriteIdx,
          radius: r,
          ratio: baseRadius / r,
          dir: i % 2 === 0 ? 1 : -1,
        });
      }

      computeLineOffsets();
    };

    // Cumulative horizontal offsets for the straight gear train line
    const lineXOffsets: number[] = [];
    let totalLineWidth = 0;
    const computeLineOffsets = () => {
      lineXOffsets.length = 0;
      totalLineWidth = 0;
      lineXOffsets.push(0);
      for (let i = 0; i < gears.length - 1; i++) {
        const dist = (gears[i].radius + gears[i + 1].radius) * 0.94;
        totalLineWidth += dist;
        lineXOffsets.push(totalLineWidth);
      }
    };

    rebuildGears();

    // 3. Dynamic Tracking of the Hero Orb
    const getOrbMetrics = () => {
      const orbEl = document.getElementById("hero-mechanical-orb");
      if (orbEl) {
        const rect = orbEl.getBoundingClientRect();
        if (rect.width > 30 && rect.height > 30) {
          return {
            cx: rect.left + rect.width / 2,
            cy: rect.top + rect.height / 2,
            radius: Math.min(rect.width, rect.height) * 0.44,
          };
        }
      }
      return {
        cx: isRtl
          ? (isMobile ? width * 0.5 : width * 0.26)
          : (isMobile ? width * 0.5 : width * 0.74),
        cy: isMobile ? height * 0.62 : height * 0.44,
        radius: isMobile ? 135 : 245,
      };
    };

    // 4. Saturn Planetary Ring Kinematics (Wrapping Around the Orb from Behind to Front)
    const ringBaseAngles: number[] = [];
    const computeRingBaseAngles = (orbRadius: number) => {
      ringBaseAngles.length = 0;
      let currentTheta = isRtl ? 0 : Math.PI;

      for (let i = 0; i < gears.length; i++) {
        ringBaseAngles.push(currentTheta);

        if (i < gears.length - 1) {
          const a_i = orbRadius * (1.16 + (i / gears.length) * 0.32);
          const b_i = a_i * 0.44;
          const meshDist = (gears[i].radius + gears[i + 1].radius) * 0.94;

          const sinT = Math.sin(currentTheta);
          const cosT = Math.cos(currentTheta);
          const speed = Math.sqrt(
            a_i * a_i * sinT * sinT + b_i * b_i * cosT * cosT
          );
          const dTheta = (meshDist / Math.max(speed, 1)) * (isRtl ? -1 : 1);
          currentTheta += dTheta;
        }
      }
    };

    let lastOrbCx = 0;
    let lastOrbCy = 0;
    let lastOrbRadius = 0;

    const initialOrb = getOrbMetrics();
    lastOrbCx = initialOrb.cx;
    lastOrbCy = initialOrb.cy;
    lastOrbRadius = initialOrb.radius;
    computeRingBaseAngles(initialOrb.radius);

    const handleResize = () => {
      if (!bgCanvas || !fgCanvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      const canvasWidth = Math.floor(width * dpr);
      const canvasHeight = Math.floor(height * dpr);

      bgCanvas.width = canvasWidth;
      bgCanvas.height = canvasHeight;
      bgCanvas.style.width = `${width}px`;
      bgCanvas.style.height = `${height}px`;

      fgCanvas.width = canvasWidth;
      fgCanvas.height = canvasHeight;
      fgCanvas.style.width = `${width}px`;
      fgCanvas.style.height = `${height}px`;

      rebuildGears();
      const orb = getOrbMetrics();
      lastOrbCx = orb.cx;
      lastOrbCy = orb.cy;
      lastOrbRadius = orb.radius;
      computeRingBaseAngles(orb.radius);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Watch for orb element load / layout shift
    const orbEl = document.getElementById("hero-mechanical-orb");
    let resizeObserver: ResizeObserver | null = null;
    if (orbEl && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        const orb = getOrbMetrics();
        lastOrbCx = orb.cx;
        lastOrbCy = orb.cy;
        lastOrbRadius = orb.radius;
        computeRingBaseAngles(orb.radius);
      });
      resizeObserver.observe(orbEl);
    }

    // 5. Scroll Progress State
    const scrollState = {
      progress: 0,
      targetProgress: 0,
    };

    const updateScrollProgress = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      scrollState.targetProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
    };

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    updateScrollProgress();

    let scrollTriggerInstance: ScrollTrigger | null = null;
    if (!prefersReducedMotion) {
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
        onUpdate: (self) => {
          scrollState.targetProgress = self.progress;
        },
      });
    }

    // Sinuous Worm Path: Continuously spans and flows through all sections throughout the page
    const getWormPos = (i: number, scrollProg: number) => {
      const padding = 140;
      const spanHeight = height + padding * 2;

      // Position each gear along the full vertical height of the screen
      const baseFraction = i / gears.length;

      // Continuous movement driven by scrollProg: travels through ~3 full screen cycles across the site
      const flow = scrollProg * 3.2;
      const rawFraction = (baseFraction + flow) % 1.0;
      const fraction = rawFraction < 0 ? rawFraction + 1.0 : rawFraction;

      // Vertical position in viewport
      const y = -padding + fraction * spanHeight;

      // Organic serpentine wave that adapts as you scroll past different sections
      const waveFreq = 0.0024;
      const wavePhase = scrollProg * Math.PI * 2.5;
      const waveAmp = width * (isMobile ? 0.32 : 0.20);

      // Base anchor line for the wave (right side in LTR, left side in RTL)
      const orb = getOrbMetrics();
      const baseCenterX = isRtl
        ? (isMobile ? width * 0.5 : Math.max(orb.cx, width * 0.30))
        : (isMobile ? width * 0.5 : Math.min(orb.cx, width * 0.70));

      const x = baseCenterX + Math.sin(y * waveFreq + wavePhase) * waveAmp;

      return { x, y };
    };

    // Horizontal Line above Footer: Forms an architectural meshed gear line slightly overlapping the footer for 3D depth
    const getLinePos = (i: number) => {
      const footerEl = document.querySelector("footer");
      let lineY = height - baseRadius * 0.60;

      if (footerEl) {
        const footerRect = footerEl.getBoundingClientRect();
        // Position gears so teeth slightly overlap the top boundary of the footer (~12-18px) for realistic depth
        lineY = footerRect.top - baseRadius * 0.60;
      }

      // Center the meshed gear line across the width of the screen
      const startX = (width - totalLineWidth) / 2;
      const lineX = startX + (lineXOffsets[i] ?? 0);

      return { x: lineX, y: lineY };
    };

    // 6. High-Performance Render Loop
    let animFrameId = 0;
    let idleRotation = 0;
    let isVisible = true;
    const animStartTime = performance.now();

    const handleVisibility = () => {
      isVisible = document.visibilityState === "visible";
      if (!isVisible) {
        cancelAnimationFrame(animFrameId);
        animFrameId = 0;
      } else if (!prefersReducedMotion && animFrameId === 0) {
        animFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // Tilt angle for Saturn's ring plane (-22 degrees in LTR, +22 in RTL)
    const tiltAngle = (isRtl ? 22 : -22) * (Math.PI / 180);
    const cosTilt = Math.cos(tiltAngle);
    const sinTilt = Math.sin(tiltAngle);

    // Pre-allocated array for depth-sorted rendering
    interface RenderGear {
      gear: GearDef;
      x: number;
      y: number;
      radius: number;
      angle: number;
      alpha: number;
      zDepth: number;
      isFront: boolean;
    }
    const renderList: RenderGear[] = [];

    const render = (currentTime: number) => {
      if (!isVisible) {
        animFrameId = 0;
        return;
      }
      animFrameId = 0;

      // Snappy and responsive lerp for scroll progress (eliminates delay/lag)
      const scrollDiff = scrollState.targetProgress - scrollState.progress;
      scrollState.progress += scrollDiff * 0.22;

      if (!prefersReducedMotion) idleRotation += 0.008;

      // Reset transform and clear both background and foreground canvases
      bgCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bgCtx.clearRect(0, 0, width, height);

      fgCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fgCtx.clearRect(0, 0, width, height);

      // Check if orb position has updated dynamically
      const orb = getOrbMetrics();
      if (
        Math.abs(orb.cx - lastOrbCx) > 2 ||
        Math.abs(orb.cy - lastOrbCy) > 2 ||
        Math.abs(orb.radius - lastOrbRadius) > 2
      ) {
        lastOrbCx = orb.cx;
        lastOrbCy = orb.cy;
        lastOrbRadius = orb.radius;
        computeRingBaseAngles(orb.radius);
      }

      if (loadedCount >= 3 && ringBaseAngles.length === gears.length) {
        const elapsedSec = (currentTime - animStartTime) / 1000;

        // Snappy, cinematic entrance over ~1.2 seconds
        const introMasterProgress = prefersReducedMotion
          ? 1
          : Math.min(Math.max((elapsedSec - 0.05) / 1.2, 0), 1);

        // Slow celestial orbital drift along Saturn's ring
        const celestialDrift = elapsedSec * 0.035 * (isRtl ? -1 : 1);

        // Uncoiling factor from Saturn ring to serpentine worm
        const uncoil = Math.min(
          Math.max((scrollState.progress - 0.01) / 0.12, 0),
          1
        );
        const easeUncoil = uncoil * uncoil * (3 - 2 * uncoil);

        // Transition factor from serpentine worm to horizontal line above footer
        // Begins smoothly morphing as the user scrolls towards the footer (~80% scroll)
        const lineProg = Math.min(
          Math.max((scrollState.progress - 0.80) / 0.16, 0),
          1
        );
        const easeLine = lineProg * lineProg * (3 - 2 * lineProg);

        renderList.length = 0;

        for (let i = 0; i < gears.length; i++) {
          const gear = gears[i];
          const baseTheta = ringBaseAngles[i];

          // 1. Saturn Ring Target Coordinates
          const a_i = orb.radius * (1.16 + (i / gears.length) * 0.32);
          const b_i = a_i * 0.44;

          const theta = baseTheta + celestialDrift;
          const unrotX = a_i * Math.cos(theta);
          const unrotY = b_i * Math.sin(theta);

          const ringX = orb.cx + unrotX * cosTilt - unrotY * sinTilt;
          const ringY = orb.cy + unrotX * sinTilt + unrotY * cosTilt;

          // 2. Entrance Animation: Appear from the right side of the canvas
          const startX = isRtl
            ? -160 - i * 35
            : width + 160 + i * 35;
          const startY =
            orb.cy - 90 + i * 18 + Math.sin(i * 0.6) * 30;

          const stagger = 0.018;
          const gearFlightProgress = prefersReducedMotion
            ? 1
            : Math.min(
                Math.max((introMasterProgress - i * stagger) / 0.42, 0),
                1
              );
          const easeIntro = 1 - Math.pow(1 - gearFlightProgress, 3);

          // Flight path with celestial swoop arc
          const currentIntroX = startX + (ringX - startX) * easeIntro;
          const swoop = Math.sin(Math.PI * easeIntro) * (60 * (1 - i / gears.length));
          const currentIntroY = startY + (ringY - startY) * easeIntro - swoop;

          // 3. Sinuous Worm Spline Path during scroll
          const wormP = getWormPos(i, scrollState.progress);

          // 4. Horizontal Line above Footer
          const lineP = getLinePos(i);

          // Step A: Blend entrance -> Saturn ring -> serpentine worm
          const wormX =
            currentIntroX + (wormP.x - currentIntroX) * easeUncoil;
          const wormY =
            currentIntroY + (wormP.y - currentIntroY) * easeUncoil;

          // Step B: Blend serpentine worm -> horizontal line above footer
          const finalX = wormX + (lineP.x - wormX) * easeLine;
          const finalY = wormY + (lineP.y - wormY) * easeLine;

          if (
            finalX < -gear.radius * 3 ||
            finalX > width + gear.radius * 3 ||
            finalY < -gear.radius * 3 ||
            finalY > height + gear.radius * 3
          ) {
            continue;
          }

          // 4. Perspective 3D Depth & True Spherical Wrapping
          // zDepth > 0 indicates the front hemisphere (sweeping in front of the orb)
          // zDepth <= 0 indicates the rear hemisphere (sweeping behind the orb)
          const zDepth = Math.sin(theta);
          const isFront = zDepth >= 0;

          const depthScale = 0.94 + 0.12 * ((zDepth + 1) * 0.5);
          const depthAlpha = 0.85 + 0.15 * ((zDepth + 1) * 0.5);

          const entranceSpin = (1 - easeIntro) * 6 * gear.dir;
          const scrollRotation =
            (scrollState.progress * height * 3.8) / gear.radius;
          const totalAngle =
            gear.dir *
            (idleRotation + scrollRotation + entranceSpin) *
            gear.ratio;

          // Edge fade: horizontal entry fade from right + vertical fade at top/bottom of viewport
          const horizFade = isRtl
            ? Math.min(Math.max((finalX + 80) / 140, 0), 1)
            : Math.min(Math.max((width + 80 - finalX) / 140, 0), 1);

          const topFade = Math.min(Math.max((finalY + gear.radius) / (gear.radius * 2), 0), 1);
          const bottomFade = Math.min(Math.max((height + gear.radius - finalY) / (gear.radius * 2), 0), 1);
          const vertFade = topFade * bottomFade;

          // Seamless edge blending:
          // In Saturn ring (easeUncoil=0): only horizFade applies
          // In continuous worm: vertFade enables seamless looping through sections
          // In horizontal line above footer (easeLine=1): line stays 100% visible across the footer
          const activeVertFade = vertFade * (1 - easeLine) + 1.0 * easeLine;
          const edgeFade = horizFade * (1 - easeUncoil + easeUncoil * activeVertFade);

          const alpha = edgeFade * 0.90 * depthAlpha * (1 - easeUncoil * 0.10);

          renderList.push({
            gear,
            x: finalX,
            y: finalY,
            radius: gear.radius * depthScale,
            angle: totalAngle,
            alpha,
            zDepth,
            isFront,
          });
        }

        // Draw gears sorted by zDepth (rear gears first, front gears last)
        renderList.sort((a, b) => a.zDepth - b.zDepth);

        for (let k = 0; k < renderList.length; k++) {
          const item = renderList[k];
          const sprite = sprites[item.gear.spriteIndex];
          if (sprite && sprite.complete && sprite.naturalWidth > 0) {
            // Draw to Canvas Front (z-20) if:
            // 1. Front hemisphere of Saturn ring around hero orb
            // 2. OR when morphing into horizontal line above footer (so gears physically overlap ON TOP of the footer edge for depth!)
            const frontAlpha = item.isFront
              ? item.alpha * (1 - easeUncoil) + item.alpha * easeLine
              : item.alpha * easeLine;

            // Draw to Canvas Back (z-0) if rear hemisphere OR in background serpentine worm
            const backAlpha = item.isFront
              ? item.alpha * easeUncoil * (1 - easeLine)
              : item.alpha * (1 - easeLine);

            if (backAlpha > 0.01) {
              bgCtx.save();
              bgCtx.globalAlpha = backAlpha;
              bgCtx.translate(item.x, item.y);
              bgCtx.rotate(item.angle);
              bgCtx.drawImage(
                sprite,
                -item.radius,
                -item.radius,
                item.radius * 2,
                item.radius * 2
              );
              bgCtx.restore();
            }

            if (frontAlpha > 0.01) {
              fgCtx.save();
              fgCtx.globalAlpha = frontAlpha;
              fgCtx.translate(item.x, item.y);
              fgCtx.rotate(item.angle);
              fgCtx.drawImage(
                sprite,
                -item.radius,
                -item.radius,
                item.radius * 2,
                item.radius * 2
              );
              fgCtx.restore();
            }
          }
        }
      }

      if (!prefersReducedMotion && isVisible) animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    // Cleanup
    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
    };
  }, [lang, isRtl]);

  return (
    <>
      {/* Background Canvas: z-0 (Renders rear gears behind the orb & content) */}
      <canvas
        ref={bgCanvasRef}
        aria-hidden="true"
        className="fixed inset-0 w-full h-full pointer-events-none select-none z-0"
      />

      {/* Foreground Canvas: z-20 (Renders front gears wrapping directly across the front face of the orb) */}
      <canvas
        ref={fgCanvasRef}
        aria-hidden="true"
        className="fixed inset-0 w-full h-full pointer-events-none select-none z-20"
      />
    </>
  );
}
