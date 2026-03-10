import React, { useState, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

/* ─────────────────────────────────────
   CONSTANTS
───────────────────────────────────── */
const GOLD       = "#d4af37";
const GOLD_LIGHT = "#f3d6a1";
const GOLD_DARK  = "#a07020";
const GOLD_DEEP  = "#e96b05";
const INK        = "#1a0900";
const LINKS      = ["Home", "Collection", "Notes", "About", "Contact"];

/* ─────────────────────────────────────
   FONTS
───────────────────────────────────── */
if (typeof document !== "undefined" && !document.getElementById("verra-fonts")) {
  const l = document.createElement("link");
  l.id = "verra-fonts"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Cinzel:wght@400;600;700&display=swap";
  document.head.appendChild(l);
}

/* ─────────────────────────────────────
   GEM MARK SVG
───────────────────────────────────── */
function GemMark({ rotY, rotX }) {
  return (
    <motion.div style={{ rotateY: rotY, rotateX: rotX, transformStyle: "preserve-3d", flexShrink: 0, display: "flex" }}>
      <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
        <defs>
          <linearGradient id="vgBase" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#fff5d6"/>
            <stop offset="30%"  stopColor={GOLD}/>
            <stop offset="68%"  stopColor={GOLD_DEEP}/>
            <stop offset="100%" stopColor={GOLD_DARK}/>
          </linearGradient>
          <linearGradient id="vgTL" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#fff8e8" stopOpacity="0.95"/>
            <stop offset="100%" stopColor={GOLD}    stopOpacity="0.72"/>
          </linearGradient>
          <linearGradient id="vgBL" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor={GOLD_LIGHT} stopOpacity="0.82"/>
            <stop offset="100%" stopColor="#7a3800"    stopOpacity="0.52"/>
          </linearGradient>
          <linearGradient id="vgRim" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#ffe97a"/>
            <stop offset="100%" stopColor={GOLD_DARK}/>
          </linearGradient>
          <filter id="vgGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <polygon points="20,2 34,10 34,30 20,38 6,30 6,10" fill="url(#vgBase)"/>
        <polygon points="20,2 6,10 13,20 20,11"  fill="url(#vgTL)" opacity="0.84"/>
        <polygon points="20,2 34,10 27,20 20,11" fill="rgba(255,255,255,0.20)"/>
        <polygon points="6,10 6,30 13,20"         fill="rgba(0,0,0,0.13)"/>
        <polygon points="34,10 34,30 27,20"       fill="rgba(255,255,255,0.17)"/>
        <polygon points="6,30 20,38 13,20"        fill="url(#vgBL)" opacity="0.78"/>
        <polygon points="34,30 20,38 27,20"       fill="rgba(155,100,18,0.52)"/>
        <polygon points="20,11 27,20 20,29 13,20" fill="rgba(255,248,215,0.32)"/>
        <line x1="20" y1="11" x2="13" y2="20" stroke="rgba(255,255,255,0.26)" strokeWidth="0.7"/>
        <line x1="20" y1="11" x2="27" y2="20" stroke="rgba(255,255,255,0.16)" strokeWidth="0.7"/>
        <line x1="13" y1="20" x2="20" y2="29" stroke="rgba(255,255,255,0.14)" strokeWidth="0.6"/>
        <line x1="27" y1="20" x2="20" y2="29" stroke="rgba(255,255,255,0.10)" strokeWidth="0.6"/>
        <polygon points="20,2 34,10 34,30 20,38 6,30 6,10" fill="none" stroke="url(#vgRim)" strokeWidth="1.1" opacity="0.9"/>
        <circle cx="20" cy="20" r="4.8" fill="rgba(255,248,215,0.42)" filter="url(#vgGlow)"/>
        <circle cx="20" cy="20" r="2.4" fill="rgba(255,255,255,0.72)"/>
        <motion.circle cx="20" cy="3.2" r="1.5" fill="#ffe97a"
          animate={{ opacity: [0.3, 1, 0.3], r: [1.2, 2.1, 1.2] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}/>
        <motion.polygon points="7.5,11 10.5,13.5 7.5,15" fill="rgba(255,255,255,0.72)"
          animate={{ opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}/>
      </svg>
    </motion.div>
  );
}

/* ─────────────────────────────────────
   WORDMARK SVG
───────────────────────────────────── */
function Wordmark({ rotY, rotX }) {
  return (
    <motion.div style={{ rotateY: rotY, rotateX: rotX, transformStyle: "preserve-3d", position: "relative", lineHeight: 1, display: "flex" }}>
      <svg width="80" height="34" viewBox="0 0 80 34" fill="none">
        <defs>
          <linearGradient id="vwGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#fff5d6"/>
            <stop offset="28%"  stopColor={GOLD}/>
            <stop offset="62%"  stopColor={GOLD_LIGHT}/>
            <stop offset="100%" stopColor={GOLD_DARK}/>
          </linearGradient>
          <linearGradient id="vwShd" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#4a2200" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#4a2200" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <text x="2.5" y="25.5" fill="url(#vwShd)"
          style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "24px", fontWeight: 700, letterSpacing: "2px" }}>
          Verra
        </text>
        <text x="1" y="24" fill="url(#vwGold)"
          style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "24px", fontWeight: 700, letterSpacing: "2px" }}>
          Verra
        </text>
        <line x1="1" y1="28" x2="79" y2="28" stroke="url(#vwGold)" strokeWidth="0.6" opacity="0.4"/>
        <text x="40" y="33.5" textAnchor="middle" fill={`${GOLD}70`}
          style={{ fontFamily: "'Cinzel',serif", fontSize: "5px", letterSpacing: "3.5px" }}>
          PARIS
        </text>
      </svg>
      {/* shine sweep */}
      <motion.div style={{
        position: "absolute", top: 0, left: 0, width: "42%", height: "100%",
        background: "linear-gradient(108deg, transparent 28%, rgba(255,248,200,0.5) 50%, transparent 72%)",
        pointerEvents: "none",
      }}
        initial={{ x: "-115%" }} animate={{ x: "265%" }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 4.5, ease: "easeInOut" }}/>
    </motion.div>
  );
}

/* ─────────────────────────────────────
   HAMBURGER BARS
───────────────────────────────────── */
function Hamburger({ open }) {
  const bar = {
    display: "block", width: 22, height: 1.5,
    background: INK, borderRadius: 2, transformOrigin: "center",
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, width: 22 }}>
      <motion.span style={bar}
        animate={open ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}/>
      <motion.span style={bar}
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.18 }}/>
      <motion.span style={bar}
        animate={open ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}/>
    </div>
  );
}

/* ─────────────────────────────────────
   MOBILE DRAWER
───────────────────────────────────── */
function Drawer({ open, onClose }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* backdrop */}
          <motion.div key="ovl"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{ position: "fixed", inset: 0, zIndex: 1998, background: "rgba(8,4,0,0.5)", backdropFilter: "blur(4px)" }}/>

          {/* panel */}
          <motion.aside key="panel"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed", top: 0, right: 0, bottom: 0,
              width: "min(300px,85vw)", zIndex: 1999,
              background: "rgba(253,248,242,0.98)",
              backdropFilter: "blur(28px)",
              borderLeft: `1px solid rgba(212,175,55,0.18)`,
              display: "flex", flexDirection: "column", overflowY: "auto",
            }}>

            {/* gold top stripe */}
            <div style={{ height: 3, flexShrink: 0, background: `linear-gradient(to right, ${GOLD}, ${GOLD_LIGHT}, transparent)` }}/>

            {/* header row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px 0", flexShrink: 0 }}>
              <span style={{ fontFamily: "'Cinzel',serif", fontSize: "0.44rem", letterSpacing: "0.44em", color: `${GOLD}aa`, textTransform: "uppercase" }}>
                Maison Verra
              </span>
              <motion.button onClick={onClose}
                style={{ background: "none", border: `1px solid rgba(212,175,55,0.28)`, borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "rgba(80,50,10,0.6)", flexShrink: 0 }}
                whileHover={{ borderColor: `${GOLD}cc`, color: GOLD }} whileTap={{ scale: 0.9 }}>
                <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                  <line x1="1" y1="1" x2="13" y2="13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  <line x1="13" y1="1" x2="1"  y2="13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </motion.button>
            </div>

            {/* divider */}
            <div style={{ margin: "16px 24px 0", height: 1, background: "rgba(212,175,55,0.1)" }}/>

            {/* links */}
            <nav style={{ flex: 1 }}>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {LINKS.map((link, i) => (
                  <motion.li key={link}
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: 0.04 + i * 0.055, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                    <a href={`#${link.toLowerCase()}`} onClick={onClose}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "15px 24px",
                        borderBottom: "1px solid rgba(212,175,55,0.08)",
                        fontFamily: "'Cormorant Garamond',serif",
                        fontSize: "clamp(1.4rem,5.5vw,1.75rem)",
                        fontWeight: 300, color: INK, textDecoration: "none",
                        transition: "color 0.2s, padding-left 0.24s, background 0.2s",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = GOLD; e.currentTarget.style.paddingLeft = "32px"; e.currentTarget.style.background = "rgba(212,175,55,0.04)"; }}
                      onMouseLeave={e => { e.currentTarget.style.color = INK;  e.currentTarget.style.paddingLeft = "24px"; e.currentTarget.style.background = "transparent"; }}>
                      <span>{link}</span>
                      <span style={{ fontFamily: "'Cinzel',serif", fontSize: "0.46rem", letterSpacing: "0.3em", color: `${GOLD}60` }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* social row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ delay: 0.32, duration: 0.4 }}
              style={{ padding: "18px 24px 28px", flexShrink: 0 }}>
              <div style={{ height: 1, background: "rgba(212,175,55,0.1)", marginBottom: 16 }}/>
              <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
                {["IG", "TW", "FB", "PT"].map(s => (
                  <span key={s}
                    style={{ fontFamily: "'Cinzel',serif", fontSize: "0.44rem", letterSpacing: "0.24em", color: "rgba(120,80,10,0.36)", cursor: "pointer", transition: "color 0.18s" }}
                    onMouseEnter={e => e.currentTarget.style.color = GOLD}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(120,80,10,0.36)"}>
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────
   NAVBAR — main export
───────────────────────────────────── */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // useLayoutEffect fires synchronously before the browser paints
  // so width is correct on the very first render — no flash, no missing hamburger
  const [width, setWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useLayoutEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y   = window.scrollY;
      const max = document.body.scrollHeight - window.innerHeight;
      setScrolled(y > 50);
      setProgress(max > 0 ? (y / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isMobile = width <= 768;
  const isTablet = width <= 1100;
  const pad      = width <= 360 ? "14px" : width <= 768 ? "20px" : width <= 1100 ? "32px" : "48px";

  // Logo: gem + wordmark (wordmark hidden on ≤360)
  const LogoMemo = () => {
    const mx   = useMotionValue(0);
    const my   = useMotionValue(0);
    const rotY = useSpring(useTransform(mx, [-1, 1], [-18, 18]), { stiffness: 200, damping: 24 });
    const rotX = useSpring(useTransform(my, [-1, 1], [12, -12]), { stiffness: 200, damping: 24 });

    return (
      <a href="#home"
        onMouseMove={e => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set(((e.clientX - r.left) / r.width  - 0.5) * 2);
          my.set(((e.clientY - r.top)  / r.height - 0.5) * 2);
        }}
        onMouseLeave={() => { mx.set(0); my.set(0); }}
        style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none", cursor: "pointer", perspective: 700, userSelect: "none", flexShrink: 0 }}
      >
        <GemMark rotY={rotY} rotX={rotX}/>
        {width > 360 && <Wordmark rotY={rotY} rotX={rotX}/>}
      </a>
    );
  };

  return createPortal(
    <>
      {/* ══════ NAV BAR ══════ */}
      <nav style={{
        position:   "fixed",
        top: 0, left: 0, right: 0,
        zIndex:     9999,
        height:     scrolled ? (isMobile ? 56 : 62) : (isMobile ? 62 : 70),
        display:    "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding:    `0 ${pad}`,
        background: scrolled
          ? "rgba(253,248,242,0.94)"
          : "linear-gradient(to bottom, rgba(253,248,242,0.55) 0%, transparent 100%)",
        backdropFilter:       scrolled ? "blur(20px) saturate(160%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(160%)" : "none",
        boxShadow:    scrolled ? "0 1px 0 rgba(212,175,55,0.18), 0 6px 32px rgba(160,110,20,0.06)" : "none",
        borderBottom: scrolled ? "1px solid rgba(212,175,55,0.14)" : "1px solid transparent",
        transition:   "height 0.38s ease, background 0.45s ease, box-shadow 0.45s ease, border-color 0.45s ease",
        // IMPORTANT: no overflow:hidden so nothing clips
      }}>

        {/* scroll progress bar */}
        <div style={{
          position: "absolute", bottom: 0, left: 0,
          height: 1.5, width: `${progress}%`,
          background: `linear-gradient(to right, ${GOLD}, ${GOLD_LIGHT}, ${GOLD_DEEP})`,
          borderRadius: "0 2px 2px 0",
          pointerEvents: "none",
          transition: "width 0.1s linear",
        }}/>

        {/* ── Logo ── */}
        <LogoMemo/>

        {/* ── Desktop nav links (hidden on mobile) ── */}
        {!isMobile && (
          <ul style={{ display: "flex", gap: isTablet ? 20 : 36, listStyle: "none", padding: 0, margin: 0, alignItems: "center" }}>
            {LINKS.map((link, i) => (
              <li key={link} style={{ listStyle: "none" }}>
                <a href={`#${link.toLowerCase()}`}
                  style={{
                    position: "relative", display: "inline-block",
                    fontFamily: "'Cinzel',serif",
                    fontSize: "0.57rem", letterSpacing: "0.26em", textTransform: "uppercase",
                    color: "rgba(26,14,0,0.68)", textDecoration: "none", paddingBottom: 4,
                    transition: "color 0.22s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = GOLD;
                    const b = e.currentTarget.querySelector("[data-bar]");
                    if (b) b.style.width = "100%";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = "rgba(26,14,0,0.68)";
                    const b = e.currentTarget.querySelector("[data-bar]");
                    if (b) b.style.width = "0%";
                  }}>
                  {link}
                  <span data-bar style={{
                    position: "absolute", bottom: 0, left: 0,
                    height: 1, width: "0%",
                    background: `linear-gradient(to right, ${GOLD}, ${GOLD_LIGHT})`,
                    borderRadius: 1,
                    transition: "width 0.32s cubic-bezier(0.16,1,0.3,1)",
                    pointerEvents: "none",
                  }}/>
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* ── Right cluster ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>

          {/* Cart link — desktop/tablet only */}
          {!isMobile && (
            <a href="#collection"
              style={{ color: "rgba(26,14,0,0.55)", display: "flex", alignItems: "center", textDecoration: "none", padding: "4px", transition: "color 0.22s" }}
              onMouseEnter={e => e.currentTarget.style.color = GOLD}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(26,14,0,0.55)"}
              aria-label="View collection">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
            </a>
          )}

          {/* Thin divider — wide desktop only */}
          {!isTablet && (
            <div style={{ width: 1, height: 20, background: "rgba(212,175,55,0.25)", flexShrink: 0 }}/>
          )}

          {/* Hamburger — MOBILE ONLY — plain button, always in flex row */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                width: 36,
                height: 36,
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
              <Hamburger open={menuOpen}/>
            </button>
          )}
        </div>
      </nav>

      {/* ══════ MOBILE DRAWER ══════ */}
      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)}/>

      {/* ══════ SIDE DOTS — desktop only ══════ */}
      {!isMobile && (
        <div style={{
          position: "fixed", right: 18, top: "50%", transform: "translateY(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
          zIndex: 800,
        }}>
          {LINKS.map((link, i) => (
            <motion.a key={link} href={`#${link.toLowerCase()}`} title={link}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.07, duration: 0.4 }}
              style={{
                width: 5, height: 5, borderRadius: "50%",
                background: "rgba(212,175,55,0.22)",
                border: "1px solid rgba(212,175,55,0.4)",
                display: "block", textDecoration: "none",
                transition: "all 0.26s ease",
              }}
              whileHover={{ scale: 1.6, backgroundColor: GOLD, borderColor: GOLD, boxShadow: `0 0 9px rgba(212,175,55,0.5)` }}/>
          ))}
        </div>
      )}
    </>,
    document.body
  );
}