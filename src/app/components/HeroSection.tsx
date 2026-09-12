'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const parallaxEl = heroRef.current.querySelector('.parallax-img') as HTMLElement;
      if (parallaxEl) {
        parallaxEl.style.transform = `translateY(${scrollY * 0.2}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Subtle geometric particle animation — slow drifting dots referencing Karakalpak weaving grid
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = 0;
    let h = 0;

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Small number of slow-drifting geometric points
    const count = 18;
    const pts = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.12,
      r: Math.random() * 1.2 + 0.4,
      opacity: Math.random() * 0.25 + 0.08
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(241,235,221,${p.opacity})`;
        ctx.fill();
      });
      // Draw very faint connecting lines between nearby points
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(241,235,221,${0.04 * (1 - dist / 160)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };

    // Respect prefers-reduced-motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mq.matches) {
      draw();
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <header
      ref={heroRef}
      id="hero"
      className="relative w-full min-h-screen flex items-end overflow-hidden"
      aria-label="Hero">

      {/* Full-bleed background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="parallax-img absolute inset-0 scale-110">
          <AppImage
            src="https://img.rocket.new/generatedImages/rocket_gen_img_4bba23389-1788614283694.png"
            alt="Deep atmospheric Karakalpak desert landscape at dusk, ancient ruins silhouetted against a vast indigo sky, warm ochre earth, cinematic and still"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw" />
        </div>
        {/* Deep atmospheric overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0e1420]/85 via-[#181714]/60 to-[#1a2a1a]/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#181714]/95 via-transparent to-transparent z-10" />
      </div>

      {/* Subtle canvas animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-20 w-full h-full pointer-events-none"
        aria-hidden="true" />

      {/* Karakalpak ornament — subtle side border marks */}
      <div className="absolute left-6 md:left-12 top-1/3 bottom-1/3 z-20 pointer-events-none hidden lg:flex flex-col justify-between" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="w-px h-4" style={{ background: 'rgba(241,235,221,0.12)' }} />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-30 w-full px-6 md:px-12 pb-20 md:pb-32 pt-32 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">

        {/* Main identity — left column */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="animate-fade-slide-up">
            <div className="rule-oxide mb-6 w-16" />
          </div>

          {/* SAVITSKY MUSEUM — Cormorant Garamond editorial display */}
          <h1
            className="font-hero animate-fade-slide-up delay-100 text-primary-foreground"
            style={{
              fontSize: 'clamp(4.5rem, 13vw, 11rem)',
              lineHeight: '0.85',
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
            }}>
            SAVITSKY
            <br />
            <span style={{ fontStyle: 'italic', fontWeight: 400 }}>MUSEUM</span>
          </h1>

          <div className="animate-fade-slide-up delay-200">
            <Link
              href="/#collection"
              className="btn-primary bg-primary-foreground text-primary hover:bg-accent hover:text-primary-foreground inline-flex items-center gap-3">
              Explore the Collection
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

      </div>
    </header>);

}