import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  motion, AnimatePresence,
  useMotionValue, useSpring, useTransform,
} from "framer-motion";

/* ═══════════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════════ */
const G      = "#c9a84c";
const G_LT   = "#f0d080";
const G_DK   = "#8a6820";
const INK    = "#1a0800";
const CREAM  = "#fdf8f2";

const LINKS = [
  { label: "Home",       href: "#home"       },
  { label: "Collection", href: "#collection" },
  { label: "Notes",      href: "#notes"      },
  { label: "About",      href: "#about"      },
  { label: "Contact",    href: "#contact"    },
];

/* ═══════════════════════════════════════════════════
   INJECT FONTS
═══════════════════════════════════════════════════ */
if (typeof document !== "undefined" && !document.getElementById("mv-nav-fonts")) {
  const l = document.createElement("link");
  l.id   = "mv-nav-fonts";
  l.rel  = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Cinzel:wght@400;500;600&display=swap";
  document.head.appendChild(l);
}

/* ═══════════════════════════════════════════════════
   INJECT CSS
═══════════════════════════════════════════════════ */
if (typeof document !== "undefined" && !document.getElementById("mv-nav-css")) {
  const s = document.createElement("style");
  s.id = "mv-nav-css";
  s.textContent = `
    .mv-navlink {
      position: relative;
      text-decoration: none;
      font-family: 'Cinzel', serif;
      font-size: 0.58rem;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: ${INK};
      padding: 4px 0;
      transition: color 0.28s ease;
    }
    .mv-navlink::after {
      content: '';
      position: absolute;
      bottom: -2px; left: 0; right: 100%;
      height: 1px;
      background: ${G};
      transition: right 0.34s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .mv-navlink:hover { color: ${G}; }
    .mv-navlink:hover::after { right: 0; }

    .mv-nav-scrolled .mv-navlink { color: ${INK}; }
    .mv-nav-scrolled .mv-navlink:hover { color: ${G_DK}; }
    .mv-nav-scrolled .mv-navlink::after { background: ${G_DK}; }

    .mv-drawer-link {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 18px 32px;
      text-decoration: none;
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.45rem;
      font-weight: 400;
      letter-spacing: 0.04em;
      color: ${INK};
      border-bottom: 1px solid rgba(201,168,76,0.12);
      transition: background 0.22s ease, padding-left 0.28s cubic-bezier(0.16,1,0.3,1);
    }
    .mv-drawer-link:hover {
      background: rgba(201,168,76,0.06);
      padding-left: 42px;
    }
    .mv-drawer-link:last-child { border-bottom: none; }

    .mv-cart {
      width: 36px; height: 36px;
      display: flex; align-items: center; justify-content: center;
      background: none; border: none; cursor: pointer;
      color: ${INK};
      text-decoration: none;
      transition: color 0.28s ease, transform 0.28s ease;
    }
    .mv-cart:hover { color: ${G}; transform: scale(1.08); }

    .mv-hbar {
      display: block;
      width: 22px; height: 1.5px;
      background: ${INK};
      border-radius: 2px;
      transform-origin: center;
    }

    /* ── Wordmark shine sweep — scoped clip so it NEVER leaks outside ── */
    .mv-wordmark-wrap {
      position: relative;
      display: inline-block;
      /* clip-path instead of overflow:hidden — avoids stacking context
         issues caused by svg { backface-visibility:hidden } in index.css */
      clip-path: inset(0 0 0 0);
    }
    .mv-shine {
      position: absolute;
      inset: 0;
      /* the sweep gradient */
      background: linear-gradient(
        105deg,
        transparent 20%,
        rgba(255,252,200,0.55) 50%,
        transparent 80%
      );
      pointer-events: none;
      /* hardware layer isolated — won't bleed through other elements */
      will-change: transform;
      transform: translateX(-120%);
    }
  `;
  document.head.appendChild(s);
}

/* ═══════════════════════════════════════════════════
   GEM MARK SVG
═══════════════════════════════════════════════════ */
function GemMark({ rotY, rotX, size = 36 }) {
  return (
    <motion.div style={{
      rotateY: rotY, rotateX: rotX,
      transformStyle: "preserve-3d",
      flexShrink: 0, display: "flex",
    }}>
      <svg width={size} height={size} viewBox="0 0 44 44" fill="none"
        style={{ display:"block", overflow:"visible" }}>
        <defs>
          <linearGradient id="ng-base" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#fff8e0"/>
            <stop offset="28%"  stopColor={G}/>
            <stop offset="65%"  stopColor="#e08010"/>
            <stop offset="100%" stopColor={G_DK}/>
          </linearGradient>
          <linearGradient id="ng-face" x1="30%" y1="0%" x2="70%" y2="100%">
            <stop offset="0%"   stopColor="rgba(255,252,220,0.82)"/>
            <stop offset="100%" stopColor="rgba(201,168,76,0.28)"/>
          </linearGradient>
          <radialGradient id="ng-glow" cx="50%" cy="42%" r="52%">
            <stop offset="0%"   stopColor="rgba(255,248,200,0.9)"/>
            <stop offset="100%" stopColor="rgba(201,168,76,0)"/>
          </radialGradient>
          <filter id="ng-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="2" stdDeviation="2.5"
              floodColor={G_DK} floodOpacity="0.32"/>
          </filter>
        </defs>
        <polygon points="22,3 37,11 37,31 22,41 7,31 7,11"
          fill="url(#ng-base)" filter="url(#ng-shadow)"/>
        <polygon points="7,11 22,3 22,17 12,22"   fill="rgba(255,255,255,0.32)"/>
        <polygon points="37,11 22,3 22,17 32,22"  fill="rgba(0,0,0,0.08)"/>
        <polygon points="7,31 22,41 22,27 12,22"  fill="rgba(0,0,0,0.10)"/>
        <polygon points="22,3 37,11 37,31 22,41 7,31 7,11"
          fill="url(#ng-face)" opacity="0.55"/>
        <polygon points="22,3 37,11 37,31 22,41 7,31 7,11"
          fill="none" stroke={`${G_LT}88`} strokeWidth="0.8"/>
        <circle cx="22" cy="22" r="6"   fill="url(#ng-glow)"/>
        <circle cx="22" cy="22" r="2.8" fill="rgba(255,255,255,0.78)"/>
        <motion.circle cx="22" cy="5.5" r="1.2" fill={G_LT}
          animate={{ opacity:[0.4,1,0.4], scale:[0.8,1.3,0.8] }}
          transition={{ duration:2.4, repeat:Infinity, ease:"easeInOut" }}/>
        <motion.line x1="8" y1="14" x2="12" y2="17"
          stroke="rgba(255,252,200,0.72)" strokeWidth="1"
          animate={{ opacity:[0,0.8,0] }}
          transition={{ duration:3, repeat:Infinity, ease:"easeInOut", delay:1.2 }}/>
      </svg>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   WORDMARK
   FIX: shine sweep uses CSS class + translateX animation
   instead of animating `left` on an absolute span.
   clip-path: inset(0) on .mv-wordmark-wrap ensures the
   sweep is always clipped to the text bounds — even when
   index.css applies backface-visibility:hidden to svg
   elements which creates new compositing layers.
═══════════════════════════════════════════════════ */
function Wordmark({ rotY, rotX, scrolled }) {
  return (
    <motion.div style={{
      rotateY: rotY, rotateX: rotX,
      transformStyle: "preserve-3d",
      display: "flex", flexDirection: "column",
      alignItems: "flex-start",
      lineHeight: 1,
    }}>
      {/* ── Text + shine, clipped via clip-path ── */}
      <div className="mv-wordmark-wrap">
        {/* depth shadow layer */}
        <span style={{
          position: "absolute", top: 1.5, left: 1.5,
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.52rem", fontWeight: 700,
          letterSpacing: "0.06em",
          color: `${G_DK}55`,
          userSelect: "none", pointerEvents: "none",
          whiteSpace: "nowrap",
        }}>Verra</span>

        {/* gold gradient text */}
        <span style={{
          position: "relative", zIndex: 1,
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.52rem", fontWeight: 700,
          letterSpacing: "0.06em",
          background: scrolled
            ? `linear-gradient(135deg, ${G_DK} 0%, ${G} 48%, ${G_LT} 72%, ${G} 100%)`
            : `linear-gradient(135deg, ${G_LT} 0%, ${G} 38%, #ffe97a 62%, ${G} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          whiteSpace: "nowrap",
          display: "block",
        }}>Verra</span>

        {/* shine sweep — translateX instead of `left` so it
            stays within the compositing layer of its parent */}
        <motion.div
          className="mv-shine"
          animate={{ translateX: ["-120%", "220%"] }}
          transition={{
            duration: 3.6,
            repeat: Infinity,
            repeatDelay: 5,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* sub caption */}
      <span style={{
        fontFamily: "'Cinzel', serif",
        fontSize: "0.34rem",
        letterSpacing: "0.52em",
        color: scrolled ? `${G_DK}90` : `${G}c0`,
        textTransform: "uppercase",
        marginTop: 2,
        paddingLeft: 2,
        display: "block",
      }}>Maison · Paris</span>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   HAMBURGER
═══════════════════════════════════════════════════ */
function Hamburger({ open }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:6, width:22, pointerEvents:"none" }}>
      <motion.span className="mv-hbar"
        animate={open ? { rotate:45, y:7.5 } : { rotate:0, y:0 }}
        transition={{ duration:0.3, ease:[0.16,1,0.3,1] }}/>
      <motion.span className="mv-hbar"
        animate={open ? { opacity:0, scaleX:0 } : { opacity:1, scaleX:1 }}
        transition={{ duration:0.2 }}/>
      <motion.span className="mv-hbar"
        animate={open ? { rotate:-45, y:-7.5 } : { rotate:0, y:0 }}
        transition={{ duration:0.3, ease:[0.16,1,0.3,1] }}/>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MOBILE DRAWER
═══════════════════════════════════════════════════ */
function Drawer({ open, onClose }) {
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            transition={{ duration:0.32 }}
            onClick={onClose}
            style={{
              position:"fixed", inset:0, zIndex:8998,
              background:"rgba(10,5,0,0.46)",
              backdropFilter:"blur(5px)",
              WebkitBackdropFilter:"blur(5px)",
            }}/>

          <motion.aside
            initial={{ x:"100%" }} animate={{ x:0 }} exit={{ x:"100%" }}
            transition={{ duration:0.44, ease:[0.16,1,0.3,1] }}
            style={{
              position:"fixed", top:0, right:0, bottom:0,
              width:"min(320px,82vw)",
              zIndex:8999,
              background:CREAM,
              display:"flex", flexDirection:"column",
              boxShadow:"-8px 0 48px rgba(0,0,0,0.18)",
            }}>

            <div style={{
              height:3,
              background:`linear-gradient(to right,${G_DK},${G},${G_LT},${G})`,
            }}/>

            <div style={{
              display:"flex", alignItems:"center",
              justifyContent:"space-between",
              padding:"20px 24px 16px",
              borderBottom:`1px solid ${G}1a`,
            }}>
              <span style={{
                fontFamily:"'Cormorant Garamond',serif",
                fontSize:"1.05rem", fontWeight:600,
                letterSpacing:"0.12em", color:INK,
              }}>Maison Verra</span>
              <motion.button
                onClick={onClose}
                style={{
                  width:34, height:34, borderRadius:"50%",
                  background:`${G}14`, border:`1px solid ${G}38`,
                  cursor:"pointer",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  color:G, fontSize:"1rem", lineHeight:1,
                }}
                whileHover={{ background:`${G}28`, scale:1.05 }}
                whileTap={{ scale:0.94 }}>
                ✕
              </motion.button>
            </div>

            <nav style={{ flex:1, overflowY:"auto", padding:"8px 0" }}>
              {LINKS.map(({ label, href }, i) => (
                <motion.a
                  key={label} href={href}
                  className="mv-drawer-link"
                  onClick={onClose}
                  initial={{ opacity:0, x:24 }}
                  animate={{ opacity:1, x:0 }}
                  transition={{ delay:0.1+i*0.055, duration:0.38, ease:[0.16,1,0.3,1] }}>
                  <span style={{
                    fontFamily:"'Cinzel',serif",
                    fontSize:"0.42rem", letterSpacing:"0.3em",
                    color:`${G}88`, width:18, flexShrink:0,
                  }}>{String(i+1).padStart(2,"0")}</span>
                  {label}
                  <span style={{ marginLeft:"auto", fontSize:"0.72rem", color:`${G}55` }}>→</span>
                </motion.a>
              ))}
            </nav>

            <div style={{ padding:"20px 32px", borderTop:`1px solid ${G}14` }}>
              <div style={{ display:"flex", gap:18, marginBottom:14 }}>
                {["IG","TW","FB"].map(s => (
                  <a key={s} href="#" style={{
                    fontFamily:"'Cinzel',serif",
                    fontSize:"0.44rem", letterSpacing:"0.22em",
                    color:`${G}90`, textDecoration:"none",
                    transition:"color 0.22s",
                  }}
                  onMouseEnter={e=>e.target.style.color=G}
                  onMouseLeave={e=>e.target.style.color=`${G}90`}>
                    {s}
                  </a>
                ))}
              </div>
              <div style={{
                fontFamily:"'Cinzel',serif",
                fontSize:"0.38rem", letterSpacing:"0.36em",
                color:`${G}55`, textTransform:"uppercase",
              }}>© 2024 Maison Verra</div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════
   LOGO
═══════════════════════════════════════════════════ */
function Logo({ narrow, scrolled }) {
  const mx   = useMotionValue(0);
  const my   = useMotionValue(0);
  const rotY = useSpring(useTransform(mx, [-1,1], [-16,16]), { stiffness:220, damping:26 });
  const rotX = useSpring(useTransform(my, [-1,1], [ 10,-10]), { stiffness:220, damping:26 });

  return (
    <a href="#home"
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX-r.left)/r.width  - 0.5)*2);
        my.set(((e.clientY-r.top) /r.height - 0.5)*2);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{
        display:"flex", alignItems:"center", gap:10,
        textDecoration:"none", perspective:700, flexShrink:0,
      }}>
      <GemMark rotY={rotY} rotX={rotX} size={narrow ? 30 : 36}/>
      {!narrow && <Wordmark rotY={rotY} rotX={rotX} scrolled={scrolled}/>}
    </a>
  );
}

/* ═══════════════════════════════════════════════════
   CART ICON
═══════════════════════════════════════════════════ */
function CartIcon() {
  return (
    <a href="#collection" className="mv-cart" aria-label="View collection">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke={INK} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
        style={{ display:"block", overflow:"visible" }}>
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 01-8 0"/>
      </svg>
    </a>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN NAVBAR
═══════════════════════════════════════════════════ */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted,  setMounted]  = useState(false);
  const [width,    setWidth]    = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    setMounted(true);
    setWidth(window.innerWidth);

    const onResize = () => setWidth(window.innerWidth);

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y   = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setScrolled(y > 60);
        setProgress(max > 0 ? (y / max) * 100 : 0);
        ticking.current = false;
      });
    };

    window.addEventListener("resize",  onResize, { passive:true });
    window.addEventListener("scroll",  onScroll, { passive:true });
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (!mounted) return null;

  const isMobile = width <= 768;
  const isNarrow = width <= 400;
  const NAV_H    = isMobile ? 52 : 58;

  return createPortal(
    <>
      {/* ════════════════════════════════════════
          NAV BAR
          overflow: visible — must stay visible.
          The progress bar is a sibling, NOT a child.
      ════════════════════════════════════════ */}
      <motion.nav
        className={scrolled ? "mv-nav-scrolled" : ""}
        animate={{ y:0, height: NAV_H }}
        transition={{ duration:0.42, ease:[0.16,1,0.3,1] }}
        style={{
          position:"fixed", top:0, left:0, right:0,
          zIndex: 8990,
          display:"flex", alignItems:"center",
          justifyContent:"space-between",
          padding: isMobile ? "0 18px" : width < 1100 ? "0 40px" : "0 56px",
          background: "rgba(253,248,242,1)",
          borderBottom: "1px solid rgba(0,0,0,0.07)",
          boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.06)" : "none",
          transition: "box-shadow 0.3s ease",
          willChange: "transform",
          overflow: "visible",   /* ← must be visible, never hidden */
        }}>

        <Logo narrow={isNarrow} scrolled={scrolled}/>

        {!isMobile && (
          <ul style={{
            display:"flex", gap: width < 1100 ? 28 : 40,
            listStyle:"none", margin:0, padding:0, alignItems:"center",
          }}>
            {LINKS.map(({ label, href }) => (
              <li key={label}><a href={href} className="mv-navlink">{label}</a></li>
            ))}
          </ul>
        )}

        <div style={{ display:"flex", alignItems:"center", gap: isMobile ? 10 : 18 }}>
          <CartIcon/>

          {!isMobile && (
            <div style={{ width:1, height:20, background:`${G}40`, flexShrink:0 }}/>
          )}

          {isMobile && (
            <motion.button
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              style={{
                width:40, height:40,
                display:"flex", alignItems:"center", justifyContent:"center",
                background:"none", border:"none", cursor:"pointer",
                borderRadius:6, flexShrink:0,
              }}
              whileHover={{ backgroundColor:`${G}14` }}
              whileTap={{ scale:0.92 }}>
              <Hamburger open={menuOpen}/>
            </motion.button>
          )}

          {!isMobile && (
            <motion.a
              href="#collection"
              style={{
                fontFamily:"'Cinzel',serif",
                fontSize:"0.52rem", letterSpacing:"0.32em",
                textTransform:"uppercase", textDecoration:"none",
                padding:"10px 22px",
                border:`1px solid ${G}60`,
                color: scrolled ? G_DK : G,
                background:"transparent", borderRadius:1,
                whiteSpace:"nowrap",
                transition:"border-color 0.28s, background 0.28s, color 0.28s",
              }}
              whileHover={{ backgroundColor:`${G}18`, borderColor:G }}
              whileTap={{ scale:0.97 }}>
              Shop Now
            </motion.a>
          )}
        </div>
      </motion.nav>

      {/* ════════════════════════════════════════
          SCROLL PROGRESS BAR
          — sibling of the nav, NOT a child
          — top: NAV_H puts it flush below the bar
          — zIndex 8989 (below nav 8990) = can never
            paint over any nav content including logo
      ════════════════════════════════════════ */}
      <div style={{
        position: "fixed",
        top: NAV_H,
        left: 0,
        width: `${progress}%`,
        height: 2,
        background: `linear-gradient(to right, ${G_DK}, ${G}, ${G_LT})`,
        zIndex: 8989,
        pointerEvents: "none",
        transition: "width 0.08s linear",
      }}/>

      {/* ════════════════════════════════════════
          MOBILE DRAWER
      ════════════════════════════════════════ */}
      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)}/>
    </>,
    document.body
  );
}