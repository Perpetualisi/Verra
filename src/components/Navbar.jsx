import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

/* ─────────────────────────────────────
   CONSTANTS
───────────────────────────────────── */
const GOLD = "#d4af37";
const GOLD_LIGHT = "#f3d6a1";
const GOLD_DARK = "#a07020";
const GOLD_DEEP = "#e96b05";
const INK = "#1a0900";
const LINKS = ["Home", "Collection", "Notes", "About", "Contact"];

/* ─────────────────────────────────────
   FONTS
───────────────────────────────────── */
if (typeof document !== "undefined" && !document.getElementById("verra-fonts")) {
  const l = document.createElement("link");
  l.id = "verra-fonts";
  l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Cinzel:wght@400;600;700&display=swap";
  document.head.appendChild(l);
}

/* ─────────────────────────────────────
   COMPONENTS
───────────────────────────────────── */

function GemMark({ rotY, rotX }) {
  return (
    <motion.div style={{ rotateY: rotY, rotateX: rotX, transformStyle: "preserve-3d", flexShrink: 0, display: "flex" }}>
      <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
        <defs>
          <linearGradient id="vgBase" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff5d6" />
            <stop offset="30%" stopColor={GOLD} />
            <stop offset="68%" stopColor={GOLD_DEEP} />
            <stop offset="100%" stopColor={GOLD_DARK} />
          </linearGradient>
          <filter id="vgGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <polygon points="20,2 34,10 34,30 20,38 6,30 6,10" fill="url(#vgBase)" />
        <circle cx="20" cy="20" r="4.8" fill="rgba(255,248,215,0.42)" filter="url(#vgGlow)" />
        <circle cx="20" cy="20" r="2.4" fill="rgba(255,255,255,0.72)" />
      </svg>
    </motion.div>
  );
}

function Wordmark({ rotY, rotX }) {
  return (
    <motion.div style={{ rotateY: rotY, rotateX: rotX, transformStyle: "preserve-3d", position: "relative", lineHeight: 1, display: "flex" }}>
      <svg width="80" height="34" viewBox="0 0 80 34" fill="none">
        <text x="1" y="24" fill={GOLD} style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "24px", fontWeight: 700, letterSpacing: "2px" }}>
          Verra
        </text>
        <text x="40" y="33.5" textAnchor="middle" fill={`${GOLD}70`} style={{ fontFamily: "'Cinzel',serif", fontSize: "5px", letterSpacing: "3.5px" }}>
          PARIS
        </text>
      </svg>
    </motion.div>
  );
}

function Hamburger({ open }) {
  const bar = {
    display: "block", width: 22, height: 1.5,
    background: INK, borderRadius: 2, transformOrigin: "center",
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, width: 22 }}>
      <motion.span style={bar} animate={open ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }} />
      <motion.span style={bar} animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={{ duration: 0.2 }} />
      <motion.span style={bar} animate={open ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }} />
    </div>
  );
}

function Drawer({ open, onClose }) {
  useEffect(() => {
    if (typeof document !== "undefined") document.body.style.overflow = open ? "hidden" : "";
    return () => { if (typeof document !== "undefined") document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: "fixed", inset: 0, zIndex: 1998, background: "rgba(8,4,0,0.4)", backdropFilter: "blur(4px)" }}
          />
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed", top: 0, right: 0, bottom: 0,
              width: "min(300px, 80vw)", zIndex: 1999,
              background: "#fdf8f2", display: "flex", flexDirection: "column",
            }}
          >
            <div style={{ padding: "24px", display: "flex", justifyContent: "flex-end" }}>
               <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.5rem", color: GOLD }}>✕</button>
            </div>
            <nav>
              {LINKS.map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} onClick={onClose}
                  style={{ display: "block", padding: "20px 30px", textDecoration: "none", color: INK, fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", borderBottom: "1px solid rgba(212,175,55,0.1)" }}>
                  {link}
                </a>
              ))}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Logo({ width }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotY = useSpring(useTransform(mx, [-1, 1], [-18, 18]), { stiffness: 200, damping: 24 });
  const rotX = useSpring(useTransform(my, [-1, 1], [12, -12]), { stiffness: 200, damping: 24 });

  return (
    <a href="#home"
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
        my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none", perspective: 700 }}
    >
      <GemMark rotY={rotY} rotX={rotX} />
      {width > 480 && <Wordmark rotY={rotY} rotX={rotX} />}
    </a>
  );
}

/* ─────────────────────────────────────
   MAIN NAVBAR
───────────────────────────────────── */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setMounted(true);
    setWidth(window.innerWidth);
    const onResize = () => setWidth(window.innerWidth);
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.body.scrollHeight - window.innerHeight;
      setScrolled(y > 50);
      setProgress(max > 0 ? (y / max) * 100 : 0);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (!mounted) return null;

  const isMobile = width <= 768;

  return createPortal(
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 9000,
        height: scrolled ? 60 : 80,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: isMobile ? "0 20px" : "0 50px",
        background: scrolled ? "rgba(253,248,242,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        transition: "all 0.4s ease",
        borderBottom: scrolled ? `1px solid ${GOLD}33` : "1px solid transparent"
      }}>
        {/* Progress Bar */}
        <div style={{ position: "absolute", bottom: 0, left: 0, height: 2, width: `${progress}%`, background: GOLD, transition: "width 0.1s" }} />

        <Logo width={width} />

        {/* Desktop Links */}
        {!isMobile && (
          <ul style={{ display: "flex", gap: "30px", listStyle: "none" }}>
            {LINKS.map(link => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`} style={{ textDecoration: "none", color: INK, fontFamily: "'Cinzel', serif", fontSize: "0.7rem", letterSpacing: "2px" }}>
                  {link}
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* Mobile Toggle - ONLY shown on mobile */}
        {isMobile && (
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer" }}>
            <Hamburger open={menuOpen} />
          </button>
        )}
      </nav>

      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>,
    document.body
  );
}