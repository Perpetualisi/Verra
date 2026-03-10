import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import perfumes from "../data/perfumes";

/* ═══════════════════════════════════════════════════════════════
   TOKENS
═══════════════════════════════════════════════════════════════ */
const GOLD   = "#c9a84c";
const GOLD_L = "#f0d080";
const GOLD_D = "#8a6820";
const INK    = "#180809";
const CREAM  = "#fef9f0";

/* ═══════════════════════════════════════════════════════════════
   PALETTES
═══════════════════════════════════════════════════════════════ */
const PALETTES = [
  { accent:"#c9a84c", liquid:"#b05c10", cap:"#f0d080", bg1:"#fef9f0", bg2:"#f3e4b2", dark:"#7a3800" },
  { accent:"#b8896a", liquid:"#7a3b1e", cap:"#e8c4a0", bg1:"#fdf5ee", bg2:"#edd8be", dark:"#4a1e0a" },
  { accent:"#5a8a6a", liquid:"#1e3a28", cap:"#a0c8a8", bg1:"#f0f8f2", bg2:"#c4dfc8", dark:"#0e2218" },
  { accent:"#5888b0", liquid:"#0e2848", cap:"#88b8d8", bg1:"#f0f4fc", bg2:"#bcd0e4", dark:"#081428" },
  { accent:"#a85878", liquid:"#580828", cap:"#e0a0c0", bg1:"#fdf0f4", bg2:"#e8c4d0", dark:"#380418" },
  { accent:"#8a6ab0", liquid:"#2e1848", cap:"#c8a8d8", bg1:"#f4f0fc", bg2:"#d4c0e0", dark:"#180830" },
  { accent:"#a0784a", liquid:"#503018", cap:"#d8b888", bg1:"#faf4ec", bg2:"#e8d4b8", dark:"#301808" },
  { accent:"#6a9898", liquid:"#1e3838", cap:"#a8c8c8", bg1:"#f0f8f8", bg2:"#c0d8d8", dark:"#0e2020" },
];
const getPalette = id => PALETTES[(id - 1) % PALETTES.length];

/* ═══════════════════════════════════════════════════════════════
   BREAKPOINT HOOK
═══════════════════════════════════════════════════════════════ */
function useBreakpoint() {
  const get = () => {
    if (typeof window === "undefined") return "lg";
    const w = window.innerWidth;
    if (w < 480) return "xs";
    if (w < 640) return "sm";
    if (w < 900) return "md";
    if (w < 1280) return "lg";
    return "xl";
  };
  const [bp, setBp] = useState(get);
  useEffect(() => {
    const fn = () => setBp(get());
    window.addEventListener("resize", fn, { passive: true });
    return () => window.removeEventListener("resize", fn);
  }, []);
  return bp;
}

/* ═══════════════════════════════════════════════════════════════
   3D TILT HOOK  — mouse-reactive card tilt with spring physics
═══════════════════════════════════════════════════════════════ */
function useTilt(disabled = false) {
  const ref  = useRef(null);
  const rotX = useSpring(useMotionValue(0), { stiffness: 200, damping: 28 });
  const rotY = useSpring(useMotionValue(0), { stiffness: 200, damping: 28 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const onMove = useCallback((e) => {
    if (disabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    rotX.set(-y * 14);
    rotY.set( x * 14);
    glowX.set((x + 0.5) * 100);
    glowY.set((y + 0.5) * 100);
  }, [disabled, rotX, rotY, glowX, glowY]);

  const onLeave = useCallback(() => {
    rotX.set(0);
    rotY.set(0);
    glowX.set(50);
    glowY.set(50);
  }, [rotX, rotY, glowX, glowY]);

  return { ref, rotX, rotY, glowX, glowY, onMove, onLeave };
}

/* ═══════════════════════════════════════════════════════════════
   GRAIN SVG
═══════════════════════════════════════════════════════════════ */
function Grain({ id = "g0", opacity = 0.022 }) {
  return (
    <svg aria-hidden="true" style={{
      position:"absolute", inset:0, width:"100%", height:"100%",
      pointerEvents:"none", opacity, mixBlendMode:"multiply", zIndex:0,
    }}>
      <filter id={`grain-${id}`}>
        <feTurbulence type="fractalNoise" baseFrequency=".72" numOctaves="4" stitchTiles="stitch"/>
        <feColorMatrix type="saturate" values="0"/>
      </filter>
      <rect width="100%" height="100%" filter={`url(#grain-${id})`}/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BOTTLE SVGs — 4 unique shapes with per-palette color injection
═══════════════════════════════════════════════════════════════ */
function BottleA({ p, uid, compact }) {
  const { accent:A, liquid:L, cap:C } = p;
  const s = compact ? 0.7 : 1;
  return (
    <svg viewBox="0 0 160 320" width="100%" height="100%" fill="none">
      <defs>
        <linearGradient id={`ag${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#fffaee" stopOpacity=".94"/>
          <stop offset="20%"  stopColor={C}       stopOpacity=".55"/>
          <stop offset="50%"  stopColor={L}       stopOpacity=".32"/>
          <stop offset="80%"  stopColor={C}       stopOpacity=".60"/>
          <stop offset="100%" stopColor="#fffaee" stopOpacity=".92"/>
        </linearGradient>
        <linearGradient id={`al${uid}`} x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%"   stopColor={A} stopOpacity=".48"/>
          <stop offset="100%" stopColor={L} stopOpacity=".75"/>
        </linearGradient>
        <linearGradient id={`ac${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#fffbe8"/>
          <stop offset="40%"  stopColor={C}/>
          <stop offset="100%" stopColor={A}/>
        </linearGradient>
        <linearGradient id={`agd${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#fffbe8"/>
          <stop offset="30%"  stopColor={C}/>
          <stop offset="60%"  stopColor="#ffe97a"/>
          <stop offset="100%" stopColor={C}/>
        </linearGradient>
        <filter id={`adr${uid}`} x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor={L} floodOpacity=".20"/>
        </filter>
      </defs>
      <g filter={`url(#adr${uid})`}>
        <polygon points="44,148 34,155 32,252 34,274 80,282 126,274 128,252 126,155 116,148" fill={`url(#al${uid})`} opacity=".82"/>
        <polygon points="42,122 32,148 30,254 32,278 80,286 128,278 130,254 128,148 118,122" fill={`url(#ag${uid})`} stroke={`${C}55`} strokeWidth=".9"/>
        <polygon points="42,122 58,125 48,148 48,268 32,278 30,254 32,148" fill="rgba(0,0,0,.06)"/>
        <polygon points="118,122 112,125 112,268 128,278 130,254 128,148" fill="rgba(255,255,255,.12)"/>
        <polygon points="42,122 118,122 114,128 46,128" fill={`url(#agd${uid})`} opacity=".92"/>
        <polygon points="32,268 128,268 130,276 30,276" fill={`url(#agd${uid})`} opacity=".78"/>
        <rect x="50" y="152" width="60" height="96" rx="2" fill="rgba(255,248,225,.18)" stroke={`${C}44`} strokeWidth=".7"/>
        <polygon points="80,166 86,172 80,178 74,172" fill="none" stroke={`${C}70`} strokeWidth=".8"/>
        <polygon points="80,169 84,172 80,175 76,172" fill={`${C}30`}/>
        <text x="80" y="198" textAnchor="middle" fill={`${C}d8`}
          style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"9px",fontWeight:700,letterSpacing:"4px"}}>VERRA</text>
        <line x1="54" y1="204" x2="106" y2="204" stroke={`${C}38`} strokeWidth=".6"/>
        <text x="80" y="214" textAnchor="middle" fill={`${C}72`}
          style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"4px",letterSpacing:"2.5px"}}>EAU DE PARFUM</text>
        <polygon points="60,88 100,88 106,94 106,123 54,123 54,94" fill={`url(#ac${uid})`} stroke={`${C}48`} strokeWidth=".8"/>
        <polygon points="60,88 100,88 98,94 62,94" fill="rgba(255,255,255,.32)"/>
        <rect x="54" y="118" width="52" height="4" fill={`url(#agd${uid})`}/>
        <rect x="54" y="88"  width="52" height="3" fill={`url(#agd${uid})`}/>
        <polygon points="58,48 102,48 108,54 108,90 52,90 52,54" fill={`url(#ac${uid})`} stroke={`${C}58`} strokeWidth=".9"/>
        <polygon points="58,48 102,48 100,54 60,54" fill="rgba(255,255,255,.35)"/>
        <rect x="52" y="62" width="56" height="2" fill={`url(#agd${uid})`}/>
        <rect x="52" y="82" width="56" height="2" fill={`url(#agd${uid})`}/>
        <rect x="52" y="44" width="56" height="6" rx="1.2" fill={`url(#agd${uid})`} opacity=".96"/>
      </g>
      <motion.rect x="34" y="145" width="3.5" height="88" rx="2" fill="rgba(255,255,255,.35)"
        animate={{opacity:[.18,.58,.18],y:[0,10,0]}}
        transition={{duration:5,repeat:Infinity,ease:"easeInOut"}}/>
    </svg>
  );
}

function BottleB({ p, uid }) {
  const { accent:A, liquid:L, cap:C } = p;
  return (
    <svg viewBox="0 0 160 320" width="100%" height="100%" fill="none">
      <defs>
        <radialGradient id={`bg${uid}`} cx="34%" cy="32%" r="72%">
          <stop offset="0%"   stopColor="#fff8f0" stopOpacity=".96"/>
          <stop offset="30%"  stopColor={C}       stopOpacity=".58"/>
          <stop offset="65%"  stopColor={L}       stopOpacity=".36"/>
          <stop offset="100%" stopColor={A}       stopOpacity=".70"/>
        </radialGradient>
        <radialGradient id={`bl${uid}`} cx="38%" cy="38%" r="68%">
          <stop offset="0%"   stopColor={C} stopOpacity=".55"/>
          <stop offset="100%" stopColor={L} stopOpacity=".80"/>
        </radialGradient>
        <linearGradient id={`bc${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#fffbe8"/>
          <stop offset="50%"  stopColor={C}/>
          <stop offset="100%" stopColor={A}/>
        </linearGradient>
        <linearGradient id={`bgd${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor={C}/>
          <stop offset="40%"  stopColor={A}/>
          <stop offset="70%"  stopColor="#ffe48a"/>
          <stop offset="100%" stopColor={C}/>
        </linearGradient>
        <filter id={`bdr${uid}`} x="-25%" y="-15%" width="150%" height="140%">
          <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor={L} floodOpacity=".18"/>
        </filter>
      </defs>
      <g filter={`url(#bdr${uid})`}>
        <ellipse cx="80" cy="224" rx="50" ry="62" fill={`url(#bl${uid})`} opacity=".76"/>
        <ellipse cx="80" cy="218" rx="56" ry="68" fill={`url(#bg${uid})`} stroke={`${C}55`} strokeWidth="1"/>
        <ellipse cx="58" cy="188" rx="15" ry="22" fill="rgba(255,255,255,.30)"/>
        <ellipse cx="54" cy="182" rx="5"  ry="8"  fill="rgba(255,255,255,.55)"/>
        <path d="M24 218 Q80 230 136 218" stroke={`url(#bgd${uid})`} strokeWidth="2.2" fill="none" opacity=".88"/>
        <text x="80" y="204" textAnchor="middle" fill={`${C}e0`}
          style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"10px",fontWeight:700,letterSpacing:"3.5px"}}>PURE</text>
        <line x1="50" y1="210" x2="110" y2="210" stroke={`${C}40`} strokeWidth=".6"/>
        <text x="80" y="220" textAnchor="middle" fill={`${C}72`}
          style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"4px",letterSpacing:"2.5px"}}>EAU DE PARFUM</text>
        <ellipse cx="80" cy="286" rx="34" ry="7" fill={`url(#bgd${uid})`} opacity=".60"/>
        <rect x="68" y="112" width="24" height="38" rx="7" fill={`url(#bc${uid})`} stroke={`${C}48`} strokeWidth=".9"/>
        <rect x="66" y="144" width="28" height="4.5" rx="2" fill={`url(#bgd${uid})`}/>
        <rect x="66" y="112" width="28" height="3.5" rx="2" fill={`url(#bgd${uid})`}/>
        <path d="M62 110 Q62 62 80 58 Q98 62 98 110 Z" fill={`url(#bc${uid})`} stroke={`${C}62`} strokeWidth=".9"/>
        <ellipse cx="80" cy="110" rx="16" ry="3.5" fill={`url(#bgd${uid})`} opacity=".92"/>
        <circle cx="80" cy="58" r="5.5" fill={A} opacity=".86"/>
        <circle cx="80" cy="58" r="3.2" fill="rgba(255,255,255,.65)"/>
        <circle cx="80" cy="58" r="1.4" fill="#fff" opacity=".90"/>
      </g>
      <motion.ellipse cx="57" cy="192" rx="2.8" ry="11" fill="rgba(255,255,255,.40)"
        animate={{opacity:[.24,.68,.24],cy:[186,200,186]}}
        transition={{duration:5.5,repeat:Infinity,ease:"easeInOut"}}/>
    </svg>
  );
}

function BottleC({ p, uid }) {
  const { accent:A, liquid:L, cap:C } = p;
  return (
    <svg viewBox="0 0 160 320" width="100%" height="100%" fill="none">
      <defs>
        <linearGradient id={`cg${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#f0f6ff" stopOpacity=".93"/>
          <stop offset="22%"  stopColor={C}       stopOpacity=".52"/>
          <stop offset="52%"  stopColor={L}       stopOpacity=".30"/>
          <stop offset="80%"  stopColor={C}       stopOpacity=".58"/>
          <stop offset="100%" stopColor="#f0f6ff" stopOpacity=".90"/>
        </linearGradient>
        <linearGradient id={`cl${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor={C} stopOpacity=".44"/>
          <stop offset="100%" stopColor={L} stopOpacity=".72"/>
        </linearGradient>
        <linearGradient id={`cc${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#e8f2ff"/>
          <stop offset="55%"  stopColor={A}/>
          <stop offset="100%" stopColor="#071c38"/>
        </linearGradient>
        <linearGradient id={`cgd${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor={C}/>
          <stop offset="42%"  stopColor={A}/>
          <stop offset="74%"  stopColor="#c4e2f8"/>
          <stop offset="100%" stopColor={C}/>
        </linearGradient>
        <filter id={`cdr${uid}`} x="-30%" y="-10%" width="160%" height="130%">
          <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor={L} floodOpacity=".18"/>
        </filter>
      </defs>
      <g filter={`url(#cdr${uid})`}>
        <path d="M48 132 Q38 152 36 192 Q34 234 38 260 Q42 285 80 290 Q118 285 122 260 Q126 234 124 192 Q122 152 112 132 Z" fill={`url(#cl${uid})`} opacity=".76"/>
        <path d="M54 118 Q36 144 34 188 Q30 238 36 264 Q40 290 80 294 Q120 290 124 264 Q130 238 126 188 Q124 144 106 118 Z" fill={`url(#cg${uid})`} stroke={`${C}50`} strokeWidth="1"/>
        <path d="M34 188 Q22 194 20 206 Q18 218 34 222" fill="none" stroke={`${A}72`} strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M126 188 Q138 194 140 206 Q142 218 126 222" fill="none" stroke={`${A}72`} strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M50 120 Q80 128 110 120" stroke={`url(#cgd${uid})`} strokeWidth="2.5" fill="none" opacity=".90"/>
        <path d="M34 224 Q80 232 126 224" stroke={`url(#cgd${uid})`} strokeWidth="1.8" fill="none" opacity=".68"/>
        <path d="M36 260 Q80 270 124 260" stroke={`url(#cgd${uid})`} strokeWidth="2.2" fill="none" opacity=".75"/>
        <text x="80" y="196" textAnchor="middle" fill={`${A}e0`}
          style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"10px",fontWeight:600,letterSpacing:"4px"}}>BEAUTY</text>
        <line x1="50" y1="202" x2="110" y2="202" stroke={`${A}38`} strokeWidth=".6"/>
        <text x="80" y="212" textAnchor="middle" fill={`${A}70`}
          style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"4px",letterSpacing:"2.5px"}}>EAU DE PARFUM</text>
        <ellipse cx="80" cy="292" rx="44" ry="7" fill={`url(#cgd${uid})`} opacity=".62"/>
        <path d="M66 88 Q64 96 64 110 L64 122 Q66 126 80 127 Q94 126 96 122 L96 110 Q96 96 94 88 Z" fill={`url(#cc${uid})`} stroke={`${A}42`} strokeWidth=".9"/>
        <path d="M68 54 Q66 60 66 90 L94 90 Q94 60 92 54 Z" fill={`url(#cc${uid})`} stroke={`${A}55`} strokeWidth="1"/>
        <ellipse cx="80" cy="90" rx="14" ry="3.2" fill={`url(#cgd${uid})`} opacity=".96"/>
        <ellipse cx="80" cy="54" rx="12" ry="4.2" fill={`url(#cgd${uid})`} opacity=".96"/>
        <circle cx="80" cy="48" r="5.5" fill={A} opacity=".86"/>
        <circle cx="80" cy="48" r="3.2" fill="rgba(255,255,255,.62)"/>
        <circle cx="80" cy="48" r="1.4" fill="#fff" opacity=".90"/>
      </g>
      <motion.path d="M38 148 Q40 196 38 244"
        stroke="rgba(255,255,255,.32)" strokeWidth="3.5" strokeLinecap="round"
        animate={{opacity:[.14,.50,.14]}}
        transition={{duration:6,repeat:Infinity,ease:"easeInOut"}}/>
    </svg>
  );
}

function BottleD({ p, uid }) {
  const { accent:A, liquid:L, cap:C } = p;
  return (
    <svg viewBox="0 0 160 320" width="100%" height="100%" fill="none">
      <defs>
        <linearGradient id={`dg${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#fff0f5" stopOpacity=".94"/>
          <stop offset="26%"  stopColor={C}       stopOpacity=".52"/>
          <stop offset="54%"  stopColor={L}       stopOpacity=".35"/>
          <stop offset="80%"  stopColor={C}       stopOpacity=".64"/>
          <stop offset="100%" stopColor="#fff0f5" stopOpacity=".92"/>
        </linearGradient>
        <linearGradient id={`dl${uid}`} x1="18%" y1="0%" x2="82%" y2="100%">
          <stop offset="0%"   stopColor={C} stopOpacity=".48"/>
          <stop offset="100%" stopColor={L} stopOpacity=".80"/>
        </linearGradient>
        <linearGradient id={`dc${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#ffd8ec"/>
          <stop offset="48%"  stopColor={A}/>
          <stop offset="100%" stopColor="#380818"/>
        </linearGradient>
        <linearGradient id={`dgd${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor={C}/>
          <stop offset="36%"  stopColor={A}/>
          <stop offset="68%"  stopColor="#ffb8d2"/>
          <stop offset="100%" stopColor={C}/>
        </linearGradient>
        <filter id={`ddr${uid}`} x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="0" dy="12" stdDeviation="9" floodColor={L} floodOpacity=".20"/>
        </filter>
      </defs>
      <g filter={`url(#ddr${uid})`}>
        <polygon points="52,136 40,158 36,210 40,258 56,282 80,288 104,282 120,258 124,210 120,158 108,136" fill={`url(#dl${uid})`} opacity=".72"/>
        <polygon points="52,132 40,156 36,208 40,256 56,280 80,286 104,280 120,256 124,208 120,156 108,132" fill={`url(#dg${uid})`} stroke={`${C}50`} strokeWidth="1"/>
        <polygon points="52,132 68,132 56,156 40,156" fill="rgba(255,255,255,.22)"/>
        <polygon points="68,132 92,132 120,156 104,156" fill="rgba(255,255,255,.07)"/>
        <polygon points="40,156 56,156 52,208 36,208" fill="rgba(0,0,0,.06)"/>
        <polygon points="104,156 120,156 124,208 108,208" fill="rgba(255,255,255,.14)"/>
        <polygon points="52,132 92,132 90,138 54,138" fill={`url(#dgd${uid})`} opacity=".90"/>
        <line x1="40" y1="156" x2="120" y2="156" stroke={`url(#dgd${uid})`} strokeWidth="1.4" opacity=".70"/>
        <line x1="40" y1="256" x2="120" y2="256" stroke={`url(#dgd${uid})`} strokeWidth="1.8" opacity=".76"/>
        <text x="80" y="200" textAnchor="middle" fill={`${A}e0`}
          style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"10px",fontWeight:700,letterSpacing:"4px"}}>BOLD</text>
        <line x1="54" y1="206" x2="106" y2="206" stroke={`${A}40`} strokeWidth=".6"/>
        <text x="80" y="216" textAnchor="middle" fill={`${A}72`}
          style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"4px",letterSpacing:"2.5px"}}>EAU DE PARFUM</text>
        <polygon points="62,100 98,100 104,106 104,134 56,134 56,106" fill={`url(#dc${uid})`} stroke={`${A}45`} strokeWidth=".8"/>
        <polygon points="62,100 98,100 96,106 64,106" fill={`url(#dgd${uid})`} opacity=".85"/>
        <line x1="56" y1="128" x2="104" y2="128" stroke={`url(#dgd${uid})`} strokeWidth="2.5"/>
        <polygon points="58,100 102,100 106,66 54,66" fill={`url(#dc${uid})`} stroke={`${A}58`} strokeWidth="1"/>
        <polygon points="54,66 106,66 104,72 56,72" fill={`url(#dgd${uid})`} opacity=".90"/>
        <ellipse cx="80" cy="66" rx="26" ry="5.2" fill={`url(#dgd${uid})`} opacity=".96"/>
        <polygon points="80,52 88,62 80,70 72,62" fill={A} opacity=".90"/>
        <polygon points="80,55 86,62 80,68 74,62" fill="rgba(255,255,255,.55)"/>
      </g>
      <motion.polygon points="41,158 47,158 44,206 38,206" fill="rgba(255,255,255,.28)"
        animate={{opacity:[.15,.58,.15]}}
        transition={{duration:4.5,repeat:Infinity,ease:"easeInOut"}}/>
      {[0,1,2].map(i=>(
        <motion.circle key={i} cx={80+(i-1)*8} cy={52} r="1.3" fill={C}
          initial={{cy:52,opacity:0}} animate={{cy:52-14-i*5,opacity:[0,.55,0]}}
          transition={{duration:2,delay:i*0.2,repeat:Infinity,repeatDelay:4}}/>
      ))}
    </svg>
  );
}

const BOTTLES = [BottleA, BottleB, BottleC, BottleD];

/* ═══════════════════════════════════════════════════════════════
   STAR RATING
═══════════════════════════════════════════════════════════════ */
function Stars({ rating = 4.8, accent }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:3 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="10" height="10" viewBox="0 0 10 10">
          <polygon
            points="5,1 6.2,3.8 9,4.1 7,6 7.6,9 5,7.5 2.4,9 3,6 1,4.1 3.8,3.8"
            fill={i <= Math.floor(rating) ? accent : `${accent}28`}
            stroke={accent} strokeWidth=".5"
          />
        </svg>
      ))}
      <span style={{
        fontFamily:"'Cinzel',serif", fontSize:".3rem",
        letterSpacing:".18em", color:`${accent}90`, marginLeft:3,
      }}>{rating}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   QUICK VIEW MODAL
═══════════════════════════════════════════════════════════════ */
function QuickView({ perfume, onClose, onOrder }) {
  const p   = getPalette(perfume.id);
  const Btl = BOTTLES[(perfume.id - 1) % BOTTLES.length];
  const uid = `qv${perfume.id}`;

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      style={{
        position:"fixed", inset:0, zIndex:9000,
        background:"rgba(10,4,2,0.70)",
        backdropFilter:"blur(12px)",
        WebkitBackdropFilter:"blur(12px)",
        display:"flex", alignItems:"center", justifyContent:"center",
        padding:"clamp(12px,4vw,40px)",
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale:.88, opacity:0, y:32 }}
        animate={{ scale:1,  opacity:1, y:0 }}
        exit={{ scale:.92, opacity:0, y:16 }}
        transition={{ duration:.44, ease:[.16,1,.3,1] }}
        onClick={e => e.stopPropagation()}
        style={{
          position:"relative",
          background:`linear-gradient(145deg,${p.bg1},${p.bg2})`,
          borderRadius:6,
          border:`1px solid ${p.accent}28`,
          boxShadow:`0 40px 120px ${p.liquid}28, 0 0 0 1px ${p.accent}14`,
          maxWidth:700,
          width:"100%",
          maxHeight:"90vh",
          overflowY:"auto",
          display:"flex",
          flexWrap:"wrap",
        }}>

        <Grain id={`qv${perfume.id}`}/>

        {/* Close */}
        <motion.button
          whileHover={{ scale:1.08, rotate:90 }}
          whileTap={{ scale:.92 }}
          onClick={onClose}
          style={{
            position:"absolute", top:16, right:16, zIndex:10,
            width:34, height:34, borderRadius:"50%",
            background:`${p.accent}18`, border:`1px solid ${p.accent}38`,
            color:p.accent, fontSize:"1rem", lineHeight:1,
            cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
            transition:"background .2s",
          }}>✕</motion.button>

        {/* Bottle column */}
        <div style={{
          flex:"0 0 clamp(140px,35%,240px)",
          display:"flex", alignItems:"center", justifyContent:"center",
          padding:"clamp(24px,4vw,48px) clamp(12px,3vw,32px)",
          position:"relative",
        }}>
          {/* Orbit ring */}
          <motion.div animate={{rotate:360}} transition={{duration:20,repeat:Infinity,ease:"linear"}}
            style={{
              position:"absolute", inset:"10%", borderRadius:"50%",
              border:`1px dashed ${p.accent}20`, pointerEvents:"none",
            }}/>
          {/* Glow */}
          <motion.div animate={{scale:[1,1.15,1],opacity:[.14,.32,.14]}}
            transition={{duration:4,repeat:Infinity,ease:"easeInOut"}}
            style={{
              position:"absolute", inset:"22%", borderRadius:"50%",
              background:`radial-gradient(circle,${p.accent}28 0%,transparent 70%)`,
              filter:"blur(16px)", pointerEvents:"none",
            }}/>
          <motion.div animate={{y:[0,-8,0]}}
            transition={{duration:6,repeat:Infinity,ease:"easeInOut"}}
            style={{width:"clamp(90px,20vw,160px)", height:"clamp(160px,36vw,280px)", zIndex:1}}>
            <Btl p={p} uid={uid}/>
          </motion.div>
        </div>

        {/* Info column */}
        <div style={{
          flex:"1 1 200px", minWidth:0,
          padding:"clamp(24px,4vw,48px) clamp(16px,3vw,36px) clamp(24px,4vw,48px) 0",
          display:"flex", flexDirection:"column", gap:0,
        }}>
          {/* Badge */}
          <span style={{
            fontFamily:"'Cinzel',serif", fontSize:".34rem", letterSpacing:".32em",
            textTransform:"uppercase", padding:"4px 10px", borderRadius:1,
            background:`${p.accent}14`, border:`1px solid ${p.accent}38`,
            color:p.accent, display:"inline-block", marginBottom:14,
            alignSelf:"flex-start",
          }}>{perfume.badge || "Signature"}</span>

          <h2 style={{
            fontFamily:"'Cormorant Garamond',serif",
            fontSize:"clamp(1.5rem,4vw,2.2rem)", fontWeight:600,
            letterSpacing:".02em", color:INK, lineHeight:1.05, marginBottom:8,
          }}>{perfume.name}</h2>

          <Stars rating={perfume.rating || 4.8} accent={p.accent}/>

          <div style={{
            display:"flex", alignItems:"center", gap:10,
            margin:"14px 0",
          }}>
            <div style={{flex:1,height:1,background:`linear-gradient(to right,${p.accent}44,transparent)`}}/>
            <div style={{width:5,height:5,transform:"rotate(45deg)",background:p.accent,opacity:.6}}/>
            <div style={{flex:1,height:1,background:`linear-gradient(to left,${p.accent}44,transparent)`}}/>
          </div>

          <p style={{
            fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(.86rem,1.6vw,.98rem)",
            lineHeight:1.7, color:`${INK}80`, marginBottom:16,
          }}>{perfume.description || perfume.notes}</p>

          {/* Meta pills */}
          <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:20}}>
            {[
              { label:"Notes",  value: perfume.notes   || "–" },
              { label:"Family", value: perfume.family  || "–" },
              { label:"Size",   value: perfume.ml      || "50 ML" },
              { label:"Origin", value: perfume.origin  || "New York" },
            ].map(({label,value}) => (
              <div key={label} style={{
                padding:"7px 13px", borderRadius:2,
                border:`1px solid ${p.accent}22`,
                background:`${p.accent}0a`,
              }}>
                <div style={{fontFamily:"'Cinzel',serif",fontSize:".26rem",letterSpacing:".32em",color:`${p.accent}70`,textTransform:"uppercase",marginBottom:2}}>{label}</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:".82rem",color:INK,letterSpacing:".03em"}}>{value}</div>
              </div>
            ))}
          </div>

          {/* Price + CTA */}
          <div style={{display:"flex",alignItems:"center",gap:16,marginTop:"auto"}}>
            <span style={{
              fontFamily:"'Cormorant Garamond',serif",
              fontSize:"clamp(1.4rem,3vw,1.8rem)", fontWeight:600, color:p.accent,
            }}>{perfume.price}</span>

            <motion.button
              whileHover={{ boxShadow:`0 12px 40px ${p.accent}50` }}
              whileTap={{ scale:.94 }}
              onClick={() => { onOrder(); onClose(); }}
              style={{
                fontFamily:"'Cinzel',serif", fontSize:".44rem", letterSpacing:".32em",
                textTransform:"uppercase", padding:"13px 28px",
                background:`linear-gradient(135deg,${p.cap}40,${p.accent}28)`,
                border:`1px solid ${p.accent}60`, color:p.accent,
                cursor:"pointer", borderRadius:1,
                boxShadow:`0 4px 20px ${p.accent}22, inset 0 1px 0 rgba(255,255,255,.5)`,
                touchAction:"manipulation",
              }}>
              Order Now
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PERFUME CARD — 3D tilt + wishlist + quick view
═══════════════════════════════════════════════════════════════ */
function PerfumeCard({ perfume, index, onOrder, onQuickView, bp, wishlisted, onWishlist }) {
  const p   = getPalette(perfume.id);
  const Btl = BOTTLES[(perfume.id - 1) % BOTTLES.length];
  const uid = `c${perfume.id}`;

  const isXs  = bp === "xs";
  const isSm  = bp === "sm";
  const isMob = isXs || isSm;

  const { ref, rotX, rotY, glowX, glowY, onMove, onLeave } = useTilt(isMob);

  // Holographic glare gradient
  const glareStyle = useTransform(
    [glowX, glowY],
    ([gx, gy]) =>
      `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.22) 0%, transparent 62%)`
  );

  /* ── xs: horizontal layout ── */
  if (isXs) {
    return (
      <motion.article
        initial={{ opacity:0, x:-20 }}
        animate={{ opacity:1, x:0 }}
        exit={{ opacity:0, scale:.96 }}
        transition={{ duration:.5, delay: Math.min(index, 5) * .06, ease:[.16,1,.3,1] }}
        style={{
          position:"relative", overflow:"hidden", borderRadius:4,
          background:`linear-gradient(150deg,${p.bg1},${p.bg2})`,
          border:`1px solid ${p.accent}22`,
          boxShadow:`0 2px 20px ${p.liquid}10`,
          display:"flex", flexDirection:"row",
        }}>
        <Grain id={uid} opacity={.02}/>

        {/* Bottle strip */}
        <div style={{
          width:88, flexShrink:0,
          display:"flex", alignItems:"center", justifyContent:"center",
          padding:"14px 6px", position:"relative",
        }}>
          <motion.div animate={{scale:[1,1.12,1],opacity:[.10,.26,.10]}}
            transition={{duration:4,repeat:Infinity,ease:"easeInOut"}}
            style={{
              position:"absolute", inset:"15%", borderRadius:"50%",
              background:`radial-gradient(circle,${p.accent}28,transparent 70%)`,
              filter:"blur(10px)", pointerEvents:"none",
            }}/>
          <motion.div animate={{y:[0,-4,0]}} transition={{duration:5,repeat:Infinity,ease:"easeInOut"}}
            style={{width:52,height:96,zIndex:1}}>
            <Btl p={p} uid={uid}/>
          </motion.div>
        </div>

        {/* Content */}
        <div style={{flex:1,minWidth:0,padding:"14px 14px 14px 4px",display:"flex",flexDirection:"column"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}>
            <span style={{fontFamily:"'Cinzel',serif",fontSize:".32rem",letterSpacing:".26em",
              color:p.accent,textTransform:"uppercase",padding:"3px 7px",
              background:`${p.accent}14`,border:`1px solid ${p.accent}30`,borderRadius:1}}>
              {perfume.badge || "Signature"}
            </span>
            <motion.button whileTap={{scale:.88}}
              onClick={() => onWishlist(perfume.id)}
              style={{background:"none",border:"none",cursor:"pointer",padding:4,touchAction:"manipulation"}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill={wishlisted ? p.accent : "none"}
                stroke={p.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </motion.button>
          </div>

          <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:6}}>
            <div style={{flex:1,height:1,background:`linear-gradient(to right,${p.accent}44,transparent)`}}/>
            <div style={{width:4,height:4,transform:"rotate(45deg)",background:p.accent,opacity:.6,flexShrink:0}}/>
            <div style={{flex:1,height:1,background:`linear-gradient(to left,${p.accent}44,transparent)`}}/>
          </div>

          <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:".96rem",fontWeight:600,
            color:INK,marginBottom:2,lineHeight:1.1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
            {perfume.name}
          </h3>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:".7rem",
            color:`${p.accent}bb`,marginBottom:6,lineHeight:1.3,
            display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>
            {perfume.notes}
          </p>
          <Stars rating={perfume.rating || 4.8} accent={p.accent}/>
          <div style={{flex:1}}/>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",
            borderTop:`1px solid ${p.accent}18`,paddingTop:8,marginTop:8,gap:6}}>
            <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:".92rem",fontWeight:600,color:p.accent}}>
              {perfume.price}
            </span>
            <div style={{display:"flex",gap:5}}>
              <motion.button whileTap={{scale:.92}}
                onClick={() => onQuickView(perfume)}
                style={{fontFamily:"'Cinzel',serif",fontSize:".3rem",letterSpacing:".2em",
                  textTransform:"uppercase",padding:"7px 10px",
                  border:`1px solid ${p.accent}40`,background:"transparent",
                  color:`${p.accent}90`,cursor:"pointer",borderRadius:1,touchAction:"manipulation"}}>
                View
              </motion.button>
              <motion.button whileTap={{scale:.92}}
                onClick={onOrder}
                style={{fontFamily:"'Cinzel',serif",fontSize:".3rem",letterSpacing:".2em",
                  textTransform:"uppercase",padding:"7px 10px",
                  border:`1px solid ${p.accent}60`,
                  background:`linear-gradient(135deg,${p.cap}28,${p.accent}18)`,
                  color:p.accent,cursor:"pointer",borderRadius:1,touchAction:"manipulation"}}>
                Order
              </motion.button>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  /* ── sm+: vertical card with 3D tilt ── */
  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity:0, y:36 }}
      animate={{ opacity:1, y:0 }}
      exit={{ opacity:0, y:16, scale:.96 }}
      transition={{ duration:.55, delay: Math.min(index, 6) * .07, ease:[.16,1,.3,1] }}
      style={{
        position:"relative", overflow:"hidden", borderRadius:4,
        background:`linear-gradient(155deg,${p.bg1} 0%,${p.bg2} 100%)`,
        border:`1px solid ${p.accent}22`,
        boxShadow:`0 4px 32px ${p.liquid}14, 0 1px 0 rgba(255,255,255,.8) inset`,
        rotateX: rotX, rotateY: rotY,
        transformStyle:"preserve-3d",
        transformOrigin:"center center",
        cursor:"default",
        willChange:"transform",
      }}>

      {/* Dot grid */}
      <div style={{position:"absolute",inset:0,zIndex:0,pointerEvents:"none",
        backgroundImage:`radial-gradient(circle,${p.accent}13 1px,transparent 0)`,
        backgroundSize:"22px 22px"}}/>

      {/* Ambient glow */}
      <div style={{position:"absolute",top:"-20%",right:"-10%",width:"70%",height:"70%",
        borderRadius:"50%",pointerEvents:"none",zIndex:0,
        background:`radial-gradient(circle,${p.accent}1a,transparent 70%)`,filter:"blur(32px)"}}/>

      {/* Holographic glare layer */}
      <motion.div style={{
        position:"absolute",inset:0,zIndex:1,pointerEvents:"none",
        background: glareStyle,
        borderRadius:4, opacity:.7,
      }}/>

      <Grain id={uid} opacity={.02}/>

      {/* Wishlist */}
      <motion.button
        whileHover={{ scale:1.1 }}
        whileTap={{ scale:.88 }}
        onClick={() => onWishlist(perfume.id)}
        style={{
          position:"absolute",top:12,right:12,zIndex:5,
          width:32,height:32,borderRadius:"50%",
          background: wishlisted ? `${p.accent}22` : "rgba(255,255,255,.55)",
          border:`1px solid ${wishlisted ? p.accent : p.accent+"30"}`,
          cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",
          backdropFilter:"blur(6px)",WebkitBackdropFilter:"blur(6px)",
          touchAction:"manipulation",
          transition:"background .22s, border-color .22s",
        }}>
        <svg width="14" height="14" viewBox="0 0 24 24"
          fill={wishlisted ? p.accent : "none"}
          stroke={p.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </motion.button>

      {/* Badge */}
      <div style={{
        position:"relative",zIndex:2,
        display:"flex",alignItems:"center",justifyContent:"space-between",
        padding: isSm ? "12px 14px 0" : "16px 18px 0",
      }}>
        <div style={{
          display:"inline-flex",alignItems:"center",gap:5,
          fontFamily:"'Cinzel',serif",fontSize:".36rem",letterSpacing:".3em",
          textTransform:"uppercase",padding:"5px 10px",borderRadius:1,
          background:`${p.accent}14`,border:`1px solid ${p.accent}38`,color:p.accent,
        }}>
          <motion.span style={{width:4,height:4,borderRadius:"50%",background:p.accent,display:"inline-block"}}
            animate={{opacity:[1,.2,1],scale:[1,.5,1]}} transition={{duration:2,repeat:Infinity}}/>
          {perfume.badge || "Signature"}
        </div>
        <span style={{fontFamily:"'Cinzel',serif",fontSize:".34rem",letterSpacing:".24em",color:`${p.accent}80`}}>
          {perfume.ml || "50 ML"}
        </span>
      </div>

      {/* Bottle stage */}
      <div style={{
        position:"relative",zIndex:2,
        height: isSm ? 170 : 210,
        display:"flex",alignItems:"center",justifyContent:"center",
        padding: isSm ? "0 16px" : "0 24px",
      }}>
        {/* Orbit ring */}
        <motion.div animate={{rotate:360}} transition={{duration:32,repeat:Infinity,ease:"linear"}}
          style={{position:"absolute",width:"68%",height:"68%",borderRadius:"50%",
            border:`1px dashed ${p.accent}18`,pointerEvents:"none"}}/>
        {/* Inner glow */}
        <motion.div animate={{scale:[1,1.18,1],opacity:[.12,.34,.12]}}
          transition={{duration:5,repeat:Infinity,ease:"easeInOut"}}
          style={{position:"absolute",width:"52%",height:"52%",borderRadius:"50%",
            background:`radial-gradient(circle,${p.accent}28,transparent 70%)`,
            filter:"blur(14px)",pointerEvents:"none"}}/>
        {/* Bottle */}
        <motion.div animate={{y:[0,-8,0]}} transition={{duration:6,repeat:Infinity,ease:"easeInOut"}}
          style={{width: isSm ? 82 : 104, height: isSm ? 148 : 186, flexShrink:0, zIndex:1}}>
          <Btl p={p} uid={uid}/>
        </motion.div>
        {/* Shadow */}
        <motion.div animate={{scaleX:[1,1.09,1],opacity:[.10,.22,.10]}}
          transition={{duration:6,repeat:Infinity,ease:"easeInOut"}}
          style={{position:"absolute",bottom:"1%",left:"50%",transform:"translateX(-50%)",
            width:"36%",height:"10px",borderRadius:"50%",
            background:`radial-gradient(ellipse,${p.accent}44,transparent 72%)`,filter:"blur(6px)"}}/>
      </div>

      {/* Content */}
      <div style={{
        position:"relative",zIndex:2,
        padding: isSm ? "0 14px 16px" : "0 20px 22px",
        display:"flex",flexDirection:"column",flex:1,
      }}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom: isSm ? 8 : 11}}>
          <div style={{flex:1,height:1,background:`linear-gradient(to right,${p.accent}44,transparent)`}}/>
          <div style={{width:5,height:5,transform:"rotate(45deg)",background:p.accent,opacity:.6,flexShrink:0}}/>
          <div style={{flex:1,height:1,background:`linear-gradient(to left,${p.accent}44,transparent)`}}/>
        </div>

        <h3 style={{fontFamily:"'Cormorant Garamond',serif",
          fontSize: isSm ? "1rem" : "clamp(1.1rem,2.2vw,1.3rem)",
          fontWeight:600, letterSpacing:".04em", color:INK,
          marginBottom:4, lineHeight:1.1}}>
          {perfume.name}
        </h3>

        <Stars rating={perfume.rating || 4.8} accent={p.accent}/>

        <p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",
          fontSize: isSm ? ".74rem" : ".82rem",
          color:`${p.accent}cc`,letterSpacing:".03em",
          margin:"6px 0",lineHeight:1.4}}>
          {perfume.notes}
        </p>

        {perfume.family && (
          <span style={{fontFamily:"'Cinzel',serif",fontSize:".32rem",letterSpacing:".32em",
            color:`${p.accent}60`,textTransform:"uppercase",marginBottom: isSm ? 8 : 12}}>
            {perfume.family}
          </span>
        )}

        <div style={{flex:1,minHeight:6}}/>

        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",
          borderTop:`1px solid ${p.accent}18`,paddingTop: isSm ? 10 : 13,gap:8}}>
          <span style={{fontFamily:"'Cormorant Garamond',serif",
            fontSize: isSm ? "1rem" : "1.16rem", fontWeight:600, color:p.accent}}>
            {perfume.price}
          </span>

          <div style={{display:"flex",gap:7}}>
            {/* Quick view */}
            <motion.button
              whileHover={{ y:-2, color:p.accent }}
              whileTap={{ scale:.92 }}
              onClick={() => onQuickView(perfume)}
              style={{
                fontFamily:"'Cinzel',serif",fontSize: isSm ? ".34rem" : ".38rem",
                letterSpacing:".26em",textTransform:"uppercase",
                padding: isSm ? "9px 12px" : "10px 15px",
                border:`1px solid ${p.accent}40`,background:"transparent",
                color:`${p.accent}80`,cursor:"pointer",borderRadius:1,
                touchAction:"manipulation",transition:"color .22s,border-color .22s",
              }}>View</motion.button>

            {/* Order */}
            <motion.button
              whileHover={{ boxShadow:`0 8px 28px ${p.accent}44` }}
              whileTap={{ scale:.94 }}
              onClick={onOrder}
              style={{
                fontFamily:"'Cinzel',serif",fontSize: isSm ? ".34rem" : ".42rem",
                letterSpacing:".26em",textTransform:"uppercase",
                padding: isSm ? "9px 14px" : "10px 20px",
                border:`1px solid ${p.accent}60`,
                background:`linear-gradient(135deg,${p.cap}28,${p.accent}18)`,
                color:p.accent,cursor:"pointer",borderRadius:1,
                touchAction:"manipulation",
                boxShadow:`0 2px 14px ${p.accent}1a, inset 0 1px 0 rgba(255,255,255,.45)`,
                whiteSpace:"nowrap",
              }}>Order</motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FILTER BAR  — horizontal scroll on mobile with fade hints
═══════════════════════════════════════════════════════════════ */
function FilterBar({ filter, setFilter, bp }) {
  const TABS = [
    { label:"All",     value:"all"    },
    { label:"For Her", value:"female" },
    { label:"For Him", value:"male"   },
    { label:"Unisex",  value:"unisex" },
  ];
  const isMob = bp === "xs" || bp === "sm";

  return (
    <div style={{
      position:"relative",
      marginBottom:"clamp(28px,5vw,52px)",
      marginInline: isMob ? "-16px" : 0,
    }}>
      {/* Fade hints (mobile only) */}
      {isMob && <>
        <div style={{position:"absolute",left:0,top:0,bottom:4,width:20,zIndex:2,
          background:"linear-gradient(to right,rgba(254,249,240,1),transparent)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",right:0,top:0,bottom:4,width:20,zIndex:2,
          background:"linear-gradient(to left,rgba(254,249,240,1),transparent)",pointerEvents:"none"}}/>
      </>}
      <div style={{
        overflowX: isMob ? "auto" : "visible",
        WebkitOverflowScrolling:"touch",
        scrollbarWidth:"none", msOverflowStyle:"none",
      }}>
        <div style={{
          display:"flex",gap:10,
          justifyContent: isMob ? "flex-start" : "center",
          padding: isMob ? "0 20px 4px" : "0",
          minWidth: isMob ? "max-content" : "auto",
        }}>
          {TABS.map(t => {
            const active = filter === t.value;
            return (
              <motion.button
                key={t.value}
                onClick={() => setFilter(t.value)}
                whileHover={{ y:-2 }}
                whileTap={{ scale:.95 }}
                style={{
                  fontFamily:"'Cinzel',serif",
                  fontSize: isMob ? ".44rem" : ".5rem",
                  letterSpacing:".34em", textTransform:"uppercase",
                  padding: isMob ? "10px 18px" : "12px 26px",
                  borderRadius:1, flexShrink:0, whiteSpace:"nowrap",
                  border:`1px solid ${active ? GOLD : "rgba(201,168,76,.28)"}`,
                  background: active
                    ? `linear-gradient(135deg,${GOLD_L}22,${GOLD}18)`
                    : "rgba(255,255,255,.6)",
                  color: active ? GOLD_D : `${INK}80`,
                  cursor:"pointer", touchAction:"manipulation",
                  backdropFilter:"blur(8px)", WebkitBackdropFilter:"blur(8px)",
                  transition:"border-color .24s, color .24s, background .24s",
                  boxShadow: active
                    ? `0 4px 22px ${GOLD}24, inset 0 1px 0 rgba(255,255,255,.55)`
                    : "inset 0 1px 0 rgba(255,255,255,.4)",
                }}>
                {t.label}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION HEADER
═══════════════════════════════════════════════════════════════ */
function SectionHeader() {
  return (
    <div style={{textAlign:"center",marginBottom:"clamp(32px,5vw,72px)"}}>
      {/* Eyebrow */}
      <motion.div
        initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}}
        viewport={{once:true}} transition={{duration:.6}}
        style={{display:"flex",alignItems:"center",justifyContent:"center",gap:14,marginBottom:18}}>
        <motion.div initial={{scaleX:0}} whileInView={{scaleX:1}}
          viewport={{once:true}} transition={{duration:.7,delay:.1,origin:"right"}}
          style={{width:"clamp(20px,5vw,40px)",height:1.5,
            background:`linear-gradient(to right,transparent,${GOLD})`}}/>
        <span style={{fontFamily:"'Cinzel',serif",fontSize:"clamp(.4rem,.65vw,.48rem)",
          letterSpacing:".44em",color:GOLD,textTransform:"uppercase"}}>Maison Verra</span>
        <motion.div initial={{scaleX:0}} whileInView={{scaleX:1}}
          viewport={{once:true}} transition={{duration:.7,delay:.1}}
          style={{width:"clamp(20px,5vw,40px)",height:1.5,
            background:`linear-gradient(to left,transparent,${GOLD})`}}/>
      </motion.div>

      {/* Heading */}
      <motion.h2
        initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}}
        viewport={{once:true}} transition={{duration:.72,delay:.1,ease:[.16,1,.3,1]}}
        style={{fontFamily:"'Cormorant Garamond',serif",
          fontSize:"clamp(2rem,8vw,5rem)",fontWeight:300,
          letterSpacing:"-.02em",lineHeight:.9,color:INK,margin:"0 0 14px"}}>
        Our Collection
      </motion.h2>

      {/* Sub */}
      <motion.p
        initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}}
        viewport={{once:true}} transition={{duration:.6,delay:.2}}
        style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",
          fontSize:"clamp(.82rem,2vw,1.08rem)",color:`${INK}58`,
          letterSpacing:".05em",maxWidth:440,margin:"0 auto",lineHeight:1.6,padding:"0 16px"}}>
        Handcrafted fragrances that tell stories. Each bottle, a world.
      </motion.p>

      {/* Gold rule */}
      <motion.div initial={{scaleX:0}} whileInView={{scaleX:1}}
        viewport={{once:true}} transition={{duration:.9,delay:.28,ease:[.16,1,.3,1]}}
        style={{width:"clamp(40px,10vw,110px)",height:1,
          background:`linear-gradient(to right,transparent,${GOLD}60,transparent)`,
          margin:"16px auto 0"}}/>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   WISHLIST TOAST
═══════════════════════════════════════════════════════════════ */
function WishlistToast({ msg, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity:0, y:24, scale:.94 }}
          animate={{ opacity:1, y:0, scale:1 }}
          exit={{ opacity:0, y:12, scale:.96 }}
          transition={{ duration:.36, ease:[.16,1,.3,1] }}
          style={{
            position:"fixed", bottom:28, left:"50%", transform:"translateX(-50%)",
            zIndex:9100,
            background: `linear-gradient(135deg,${INK}f0,#2a0a04f0)`,
            border:`1px solid ${GOLD}40`,
            borderRadius:3,
            padding:"12px 24px",
            display:"flex",alignItems:"center",gap:10,
            boxShadow:`0 12px 40px rgba(0,0,0,.36), 0 0 0 1px ${GOLD}14`,
            backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",
          }}>
          <svg width="14" height="14" viewBox="0 0 24 24"
            fill={GOLD} stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <span style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",
            fontSize:".9rem",color:"rgba(255,248,220,.88)",letterSpacing:".04em"}}>
            {msg}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CSS
═══════════════════════════════════════════════════════════════ */
const CSS = `
.cv-wrap{
  position:relative;width:100%;
  padding:clamp(52px,7vw,110px) clamp(14px,4.5vw,80px) clamp(60px,8vw,110px);
  background:linear-gradient(160deg,#fef9f0 0%,#f8ede0 38%,#fef4ec 70%,#f5e8dc 100%);
  overflow:hidden;
}
.cv-grid{
  display:grid;
  gap:clamp(10px,2vw,26px);
  grid-template-columns:repeat(4,1fr);
}
@media(max-width:1280px){ .cv-grid{grid-template-columns:repeat(3,1fr);} }
@media(max-width:900px) { .cv-grid{grid-template-columns:repeat(2,1fr);} }
@media(max-width:479px) { .cv-grid{grid-template-columns:1fr; gap:10px;} }
.cv-empty{
  grid-column:1/-1;padding:64px 20px;text-align:center;
  font-family:'Cormorant Garamond',serif;font-style:italic;
  font-size:1.05rem;color:rgba(24,8,9,.36);letter-spacing:.06em;
}
`;

/* ═══════════════════════════════════════════════════════════════
   MAIN
═══════════════════════════════════════════════════════════════ */
export default function Collection() {
  const [filter,    setFilter]    = useState("all");
  const [quickView, setQuickView] = useState(null);
  const [wishlist,  setWishlist]  = useState(new Set());
  const [toast,     setToast]     = useState({ visible:false, msg:"" });
  const bp = useBreakpoint();

  const filtered = perfumes.filter(p =>
    filter === "all" ? true : p.gender === filter
  );

  const scrollToContact = () =>
    document.querySelector("#contact")?.scrollIntoView({ behavior:"smooth" });

  const toggleWishlist = useCallback((id) => {
    setWishlist(prev => {
      const next = new Set(prev);
      const name = perfumes.find(p => p.id === id)?.name || "Fragrance";
      if (next.has(id)) {
        next.delete(id);
        setToast({ visible:true, msg:`${name} removed from wishlist` });
      } else {
        next.add(id);
        setToast({ visible:true, msg:`${name} added to wishlist` });
      }
      return next;
    });
  }, []);

  // Auto-hide toast
  useEffect(() => {
    if (!toast.visible) return;
    const t = setTimeout(() => setToast(s => ({ ...s, visible:false })), 2600);
    return () => clearTimeout(t);
  }, [toast.visible]);

  return (
    <section className="cv-wrap">
      <style>{CSS}</style>

      {/* Background orbs */}
      <div style={{position:"absolute",top:"-8%",right:"-6%",
        width:"clamp(200px,36vw,520px)",height:"clamp(200px,36vw,520px)",
        borderRadius:"50%",pointerEvents:"none",zIndex:0,
        background:`radial-gradient(circle,${GOLD}0f,transparent 68%)`,filter:"blur(60px)"}}/>
      <div style={{position:"absolute",bottom:"-10%",left:"-4%",
        width:"clamp(160px,28vw,400px)",height:"clamp(160px,28vw,400px)",
        borderRadius:"50%",pointerEvents:"none",zIndex:0,
        background:`radial-gradient(circle,${GOLD_L}18,transparent 68%)`,filter:"blur(60px)"}}/>
      <Grain id="sec"/>

      <div style={{position:"relative",zIndex:1,maxWidth:1400,margin:"0 auto"}}>
        <SectionHeader/>
        <FilterBar filter={filter} setFilter={setFilter} bp={bp}/>

        <div className="cv-grid">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0
              ? filtered.map((perfume, i) => (
                  <PerfumeCard
                    key={perfume.id}
                    perfume={perfume}
                    index={i}
                    onOrder={scrollToContact}
                    onQuickView={setQuickView}
                    bp={bp}
                    wishlisted={wishlist.has(perfume.id)}
                    onWishlist={toggleWishlist}
                  />
                ))
              : (
                <motion.div key="empty" className="cv-empty"
                  initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                  No fragrances found in this collection.
                </motion.div>
              )
            }
          </AnimatePresence>
        </div>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickView && (
          <QuickView
            perfume={quickView}
            onClose={() => setQuickView(null)}
            onOrder={scrollToContact}
          />
        )}
      </AnimatePresence>

      {/* Wishlist Toast */}
      <WishlistToast msg={toast.msg} visible={toast.visible}/>
    </section>
  );
}