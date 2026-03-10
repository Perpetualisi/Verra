import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { createPortal } from 'react-dom';

import Navbar    from './components/Navbar';
import Hero      from './components/Hero';
import Collection from './components/Collection';
import Notes     from './components/Notes';
import About     from './components/About';
import OrderForm from './components/OrderForm';
import Footer    from './components/Footer';
import './index.css';

/* ═══════════════════════════════════════════════════════════════
   TOKENS (mirror index.css custom props for JS use)
═══════════════════════════════════════════════════════════════ */
const G    = '#c9a84c';
const G_LT = '#f0d080';
const G_DK = '#8a6820';
const INK  = '#1a0800';

/* ═══════════════════════════════════════════════════════════════
   PRELOADER
   — Luxury countdown: animated gem, shimmer wordmark, progress bar
═══════════════════════════════════════════════════════════════ */
function Preloader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [phase, setPhase] = useState('counting'); // counting | reveal | exit

  useEffect(() => {
    // Simulate asset loading with eased progress
    let frame;
    let start = null;
    const DURATION = 2200;

    const tick = (ts) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const t = Math.min(elapsed / DURATION, 1);
      // ease-in-out quad
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      setPct(Math.round(eased * 100));

      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setPhase('reveal');
        setTimeout(() => setPhase('exit'), 600);
        setTimeout(() => onDone(), 1100);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onDone]);

  return (
    <motion.div
      className="mv-preloader"
      initial={{ opacity: 1 }}
      animate={phase === 'exit' ? { opacity: 0, scale: 1.03 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Ambient radial glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${G}0f 0%, transparent 70%)`,
      }}/>

      {/* Animated gem SVG */}
      <motion.div
        animate={{ rotateY: [0, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <svg width="72" height="72" viewBox="0 0 44 44" fill="none">
          <defs>
            <linearGradient id="pl-gem" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#fff8e0"/>
              <stop offset="28%"  stopColor={G}/>
              <stop offset="65%"  stopColor="#e08010"/>
              <stop offset="100%" stopColor={G_DK}/>
            </linearGradient>
            <radialGradient id="pl-glow" cx="50%" cy="42%" r="52%">
              <stop offset="0%"   stopColor="rgba(255,248,200,0.9)"/>
              <stop offset="100%" stopColor="rgba(201,168,76,0)"/>
            </radialGradient>
            <filter id="pl-shadow">
              <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor={G} floodOpacity="0.5"/>
            </filter>
          </defs>
          <polygon points="22,3 37,11 37,31 22,41 7,31 7,11"
            fill="url(#pl-gem)" filter="url(#pl-shadow)"/>
          <polygon points="7,11 22,3 22,17 12,22"  fill="rgba(255,255,255,0.28)"/>
          <polygon points="37,11 22,3 22,17 32,22" fill="rgba(0,0,0,0.07)"/>
          <polygon points="7,31 22,41 22,27 12,22" fill="rgba(0,0,0,0.09)"/>
          <polygon points="22,3 37,11 37,31 22,41 7,31 7,11"
            fill="none" stroke={`${G_LT}66`} strokeWidth="0.8"/>
          <circle cx="22" cy="22" r="6"   fill="url(#pl-glow)"/>
          <circle cx="22" cy="22" r="2.5" fill="rgba(255,255,255,0.85)"/>
        </svg>
      </motion.div>

      {/* Wordmark */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: 'center' }}
      >
        <div className="mv-preloader__wordmark text-gold-shimmer">
          Maison Verra
        </div>
        <div className="mv-preloader__sub" style={{ marginTop: 10 }}>
          Elegance in Every Drop
        </div>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}
      >
        <div className="mv-preloader__bar-track">
          <div className="mv-preloader__bar-fill" style={{ width: `${pct}%` }}/>
        </div>
        <div className="mv-preloader__pct">{pct}%</div>
      </motion.div>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div key={i}
          style={{
            position: 'absolute',
            width:  i % 2 === 0 ? 4 : 2.5,
            height: i % 2 === 0 ? 4 : 2.5,
            borderRadius: '50%',
            background: G,
            top:  `${15 + (i * 10) % 70}%`,
            left: `${5  + (i * 13) % 90}%`,
          }}
          animate={{
            opacity: [0, 0.7, 0],
            y: [0, -20, 0],
            scale: [0.6, 1.2, 0.6],
          }}
          transition={{
            duration: 2.4 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.28,
            ease: 'easeInOut',
          }}
        />
      ))}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CUSTOM CURSOR
   Smooth spring-follow outer ring + snap inner dot.
   Reacts to hoverable elements.
═══════════════════════════════════════════════════════════════ */
function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef    = useRef(null);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  // Spring-lagged outer ring
  const springX = useSpring(mx, { stiffness: 180, damping: 22, mass: 0.6 });
  const springY = useSpring(my, { stiffness: 180, damping: 22, mass: 0.6 });

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return;

    const move = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);

      // Snap dot immediately
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
      }
    };

    const over = (e) => {
      const t = e.target;
      const body = document.body;
      if (t.matches('a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]')) {
        body.classList.add('cursor-hover');
        body.classList.remove('cursor-text');
      } else if (t.matches('p, h1, h2, h3, span, [data-cursor="text"]')) {
        body.classList.add('cursor-text');
        body.classList.remove('cursor-hover');
      } else {
        body.classList.remove('cursor-hover', 'cursor-text');
      }
    };

    const leave = () => {
      document.body.classList.add('cursor-hidden');
    };
    const enter = () => {
      document.body.classList.remove('cursor-hidden');
    };

    window.addEventListener('mousemove', move,  { passive: true });
    window.addEventListener('mouseover', over,  { passive: true });
    document.documentElement.addEventListener('mouseleave', leave);
    document.documentElement.addEventListener('mouseenter', enter);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      document.documentElement.removeEventListener('mouseleave', leave);
      document.documentElement.removeEventListener('mouseenter', enter);
    };
  }, [mx, my]);

  return createPortal(
    <>
      {/* Outer ring — spring lagged */}
      <motion.div
        ref={cursorRef}
        className="mv-cursor"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
      />
      {/* Dot — instant snap (handled directly in mousemove) */}
      <div ref={dotRef} className="mv-cursor-dot" style={{ position: 'fixed', top: 0, left: 0 }}/>
    </>,
    document.body
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION DIVIDER ORNAMENT
═══════════════════════════════════════════════════════════════ */
function Divider() {
  return (
    <div className="mv-divider" aria-hidden="true">
      <div className="mv-divider__line"/>
      <div className="mv-divider__dot"/>
      <div className="mv-divider__gem"/>
      <div className="mv-divider__dot"/>
      <div className="mv-divider__line"/>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL REVEAL HOOK
   — attaches IntersectionObserver to elements with .mv-reveal
     or .mv-reveal-children, adding .is-visible on entry
═══════════════════════════════════════════════════════════════ */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.mv-reveal, .mv-reveal-children');
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ═══════════════════════════════════════════════════════════════
   AMBIENT FLOATING PARTICLES
   — decorative gold specks that float across the full page
═══════════════════════════════════════════════════════════════ */
function AmbientParticles() {
  const particles = [
    { x: '8%',  dur: 18, delay: 0,   size: 3, op: 0.18 },
    { x: '22%', dur: 24, delay: 3,   size: 2, op: 0.12 },
    { x: '41%', dur: 20, delay: 7,   size: 4, op: 0.14 },
    { x: '58%', dur: 22, delay: 1.5, size: 2, op: 0.10 },
    { x: '73%', dur: 19, delay: 5,   size: 3, op: 0.16 },
    { x: '87%', dur: 25, delay: 9,   size: 2, op: 0.12 },
    { x: '15%', dur: 21, delay: 12,  size: 2, op: 0.10 },
    { x: '65%', dur: 17, delay: 6,   size: 3, op: 0.14 },
  ];

  return (
    <div style={{
      position: 'fixed', inset: 0,
      pointerEvents: 'none', zIndex: 2,
      overflow: 'hidden',
    }}>
      {particles.map((p, i) => (
        <motion.div key={i}
          style={{
            position: 'absolute',
            bottom: '-10px',
            left: p.x,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: G,
            opacity: p.op,
          }}
          animate={{
            y: [0, -(window.innerHeight + 40)],
            opacity: [0, p.op, p.op * 0.5, 0],
            scale: [0.5, 1, 0.8, 0.3],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION WRAPPER
   Adds scroll offset id, reveal class, and optional divider
═══════════════════════════════════════════════════════════════ */
function Section({ id, children, dividerAfter = true, className = '' }) {
  return (
    <>
      <section id={id} className={`scroll-offset mv-reveal ${className}`}>
        {children}
      </section>
      {dividerAfter && <Divider/>}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE WIPE TRANSITION
   — plays once on initial load after preloader exits
═══════════════════════════════════════════════════════════════ */
function PageWipe({ active }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="mv-page-wipe"
          initial={{ scaleY: 1, transformOrigin: 'top' }}
          exit={{ scaleY: 0, transformOrigin: 'top' }}
          transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
        />
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════
   APP
═══════════════════════════════════════════════════════════════ */
const App = () => {
  const [loading,   setLoading]   = useState(true);
  const [wipeActive, setWipeActive] = useState(true);

  const handlePreloaderDone = useCallback(() => {
    setLoading(false);
    // Small delay then remove wipe
    setTimeout(() => setWipeActive(false), 80);
  }, []);

  // Activate scroll reveals after load
  useScrollReveal();

  return (
    <>
      {/* ── Preloader — shown until assets conceptually "loaded" ── */}
      <AnimatePresence>
        {loading && <Preloader onDone={handlePreloaderDone}/>}
      </AnimatePresence>

      {/* ── Page wipe curtain ── */}
      <PageWipe active={wipeActive}/>

      {/* ── Animated ambient grain overlay ── */}
      <div id="mv-grain" aria-hidden="true"/>

      {/* ── Floating ambient particles ── */}
      {!loading && <AmbientParticles/>}

      {/* ── Custom cursor (portal to body) ── */}
      <CustomCursor/>

      {/* ── Main content ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {/* Navbar — always on top, portalled to body inside component */}
        <Navbar/>

        {/* ── Hero — full-bleed, no divider above ── */}
        <section id="home" className="scroll-offset">
          <Hero/>
        </section>

        <Divider/>

        {/* ── Collection ── */}
        <section id="collection" className="scroll-offset mv-reveal">
          <Collection/>
        </section>

        <Divider/>

        {/* ── Notes ── */}
        <section id="notes" className="scroll-offset mv-reveal">
          <Notes/>
        </section>

        <Divider/>

        {/* ── About ── */}
        <section id="about" className="scroll-offset mv-reveal">
          <About/>
        </section>

        <Divider/>

        {/* ── Order / Contact ── */}
        <section id="contact" className="scroll-offset mv-reveal">
          <OrderForm/>
        </section>

        {/* ── Footer — no divider after ── */}
        <Footer/>
      </motion.div>
    </>
  );
};

export default App;