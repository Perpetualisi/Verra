import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import perfumes from "../data/perfumes";

/* ═══════════════════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════════════════ */
const GOLD   = "#c9a84c";
const GOLD_L = "#f0d080";
const GOLD_D = "#8a6820";
const INK    = "#180809";

/* ═══════════════════════════════════════════════════════════
   PALETTES
═══════════════════════════════════════════════════════════ */
const PALETTES = [
  { accent:"#c9a84c", liquid:"#b05c10", cap:"#f0d080", bg1:"#fef9f0", bg2:"#f3e4b2" },
  { accent:"#b8896a", liquid:"#7a3b1e", cap:"#e8c4a0", bg1:"#fdf5ee", bg2:"#edd8be" },
  { accent:"#5a8a6a", liquid:"#1e3a28", cap:"#a0c8a8", bg1:"#f0f8f2", bg2:"#c4dfc8" },
  { accent:"#5888b0", liquid:"#0e2848", cap:"#88b8d8", bg1:"#f0f4fc", bg2:"#bcd0e4" },
  { accent:"#a85878", liquid:"#580828", cap:"#e0a0c0", bg1:"#fdf0f4", bg2:"#e8c4d0" },
  { accent:"#8a6ab0", liquid:"#2e1848", cap:"#c8a8d8", bg1:"#f4f0fc", bg2:"#d4c0e0" },
  { accent:"#a0784a", liquid:"#503018", cap:"#d8b888", bg1:"#faf4ec", bg2:"#e8d4b8" },
  { accent:"#6a9898", liquid:"#1e3838", cap:"#a8c8c8", bg1:"#f0f8f8", bg2:"#c0d8d8" },
];
function getPalette(id) { return PALETTES[(id - 1) % PALETTES.length]; }

/* ═══════════════════════════════════════════════════════════
   RESPONSIVE HOOK
═══════════════════════════════════════════════════════════ */
function useBreakpoint() {
  const [bp, setBp] = useState(() => {
    if (typeof window === "undefined") return "lg";
    const w = window.innerWidth;
    if (w < 480) return "xs";
    if (w < 640) return "sm";
    if (w < 900) return "md";
    if (w < 1280) return "lg";
    return "xl";
  });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 480) setBp("xs");
      else if (w < 640) setBp("sm");
      else if (w < 900) setBp("md");
      else if (w < 1280) setBp("lg");
      else setBp("xl");
    };
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return bp;
}

/* ═══════════════════════════════════════════════════════════
   BOTTLE SVG VARIANTS
═══════════════════════════════════════════════════════════ */
function BottleA({ p, uid }) {
  const { accent:A, liquid:L, cap:C } = p;
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
        <polygon points="44,148 34,155 32,252 34,274 80,282 126,274 128,252 126,155 116,148"
          fill={`url(#al${uid})`} opacity=".82"/>
        <polygon points="42,122 32,148 30,254 32,278 80,286 128,278 130,254 128,148 118,122"
          fill={`url(#ag${uid})`} stroke={`${C}55`} strokeWidth=".9"/>
        <polygon points="42,122 58,125 48,148 48,268 32,278 30,254 32,148" fill="rgba(0,0,0,.06)"/>
        <polygon points="118,122 112,125 112,268 128,278 130,254 128,148" fill="rgba(255,255,255,.12)"/>
        <polygon points="42,122 118,122 114,128 46,128"  fill={`url(#agd${uid})`} opacity=".92"/>
        <polygon points="32,268 128,268 130,276 30,276"  fill={`url(#agd${uid})`} opacity=".78"/>
        <rect x="50" y="152" width="60" height="96" rx="2"
          fill="rgba(255,248,225,.18)" stroke={`${C}44`} strokeWidth=".7"/>
        <polygon points="80,166 86,172 80,178 74,172" fill="none" stroke={`${C}70`} strokeWidth=".8"/>
        <polygon points="80,169 84,172 80,175 76,172" fill={`${C}30`}/>
        <text x="80" y="198" textAnchor="middle" fill={`${C}d8`}
          style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"9px",fontWeight:700,letterSpacing:"4px"}}>
          VERRA
        </text>
        <line x1="54" y1="204" x2="106" y2="204" stroke={`${C}38`} strokeWidth=".6"/>
        <text x="80" y="214" textAnchor="middle" fill={`${C}72`}
          style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"4px",letterSpacing:"2.5px"}}>
          EAU DE PARFUM
        </text>
        <polygon points="60,88 100,88 106,94 106,123 54,123 54,94"
          fill={`url(#ac${uid})`} stroke={`${C}48`} strokeWidth=".8"/>
        <polygon points="60,88 100,88 98,94 62,94" fill="rgba(255,255,255,.32)"/>
        <rect x="54" y="118" width="52" height="4"  fill={`url(#agd${uid})`}/>
        <rect x="54" y="88"  width="52" height="3"  fill={`url(#agd${uid})`}/>
        <polygon points="58,48 102,48 108,54 108,90 52,90 52,54"
          fill={`url(#ac${uid})`} stroke={`${C}58`} strokeWidth=".9"/>
        <polygon points="58,48 102,48 100,54 60,54" fill="rgba(255,255,255,.35)"/>
        <rect x="52" y="62"  width="56" height="2" fill={`url(#agd${uid})`}/>
        <rect x="52" y="82"  width="56" height="2" fill={`url(#agd${uid})`}/>
        <rect x="52" y="44"  width="56" height="6" rx="1.2" fill={`url(#agd${uid})`} opacity=".96"/>
      </g>
      <motion.rect x="34" y="145" width="3.5" height="88" rx="2"
        fill="rgba(255,255,255,.35)"
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
          style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"10px",fontWeight:700,letterSpacing:"3.5px"}}>
          PURE
        </text>
        <line x1="50" y1="210" x2="110" y2="210" stroke={`${C}40`} strokeWidth=".6"/>
        <text x="80" y="220" textAnchor="middle" fill={`${C}72`}
          style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"4px",letterSpacing:"2.5px"}}>
          EAU DE PARFUM
        </text>
        <ellipse cx="80" cy="286" rx="34" ry="7" fill={`url(#bgd${uid})`} opacity=".60"/>
        <rect x="68" y="112" width="24" height="38" rx="7" fill={`url(#bc${uid})`} stroke={`${C}48`} strokeWidth=".9"/>
        <rect x="66" y="144" width="28" height="4.5" rx="2" fill={`url(#bgd${uid})`}/>
        <rect x="66" y="112" width="28" height="3.5" rx="2" fill={`url(#bgd${uid})`}/>
        <path d="M62 110 Q62 62 80 58 Q98 62 98 110 Z"
          fill={`url(#bc${uid})`} stroke={`${C}62`} strokeWidth=".9"/>
        <ellipse cx="80" cy="110" rx="16" ry="3.5" fill={`url(#bgd${uid})`} opacity=".92"/>
        <circle cx="80" cy="58" r="5.5" fill={A} opacity=".86"/>
        <circle cx="80" cy="58" r="3.2" fill="rgba(255,255,255,.65)"/>
        <circle cx="80" cy="58" r="1.4" fill="#fff" opacity=".90"/>
      </g>
      <motion.ellipse cx="57" cy="192" rx="2.8" ry="11"
        fill="rgba(255,255,255,.40)"
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
        <path d="M48 132 Q38 152 36 192 Q34 234 38 260 Q42 285 80 290 Q118 285 122 260 Q126 234 124 192 Q122 152 112 132 Z"
          fill={`url(#cl${uid})`} opacity=".76"/>
        <path d="M54 118 Q36 144 34 188 Q30 238 36 264 Q40 290 80 294 Q120 290 124 264 Q130 238 126 188 Q124 144 106 118 Z"
          fill={`url(#cg${uid})`} stroke={`${C}50`} strokeWidth="1"/>
        <path d="M34 188 Q22 194 20 206 Q18 218 34 222"
          fill="none" stroke={`${A}72`} strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M126 188 Q138 194 140 206 Q142 218 126 222"
          fill="none" stroke={`${A}72`} strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M34 188 Q22 194 20 206 Q18 218 34 222"
          fill="none" stroke={`${C}48`} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M126 188 Q138 194 140 206 Q142 218 126 222"
          fill="none" stroke={`${C}48`} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M50 120 Q80 128 110 120" stroke={`url(#cgd${uid})`} strokeWidth="2.5" fill="none" opacity=".90"/>
        <path d="M34 224 Q80 232 126 224" stroke={`url(#cgd${uid})`} strokeWidth="1.8" fill="none" opacity=".68"/>
        <path d="M36 260 Q80 270 124 260" stroke={`url(#cgd${uid})`} strokeWidth="2.2" fill="none" opacity=".75"/>
        <text x="80" y="196" textAnchor="middle" fill={`${A}e0`}
          style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"10px",fontWeight:600,letterSpacing:"4px"}}>
          BEAUTY
        </text>
        <line x1="50" y1="202" x2="110" y2="202" stroke={`${A}38`} strokeWidth=".6"/>
        <text x="80" y="212" textAnchor="middle" fill={`${A}70`}
          style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"4px",letterSpacing:"2.5px"}}>
          EAU DE PARFUM
        </text>
        <ellipse cx="80" cy="292" rx="44" ry="7" fill={`url(#cgd${uid})`} opacity=".62"/>
        <path d="M66 88 Q64 96 64 110 L64 122 Q66 126 80 127 Q94 126 96 122 L96 110 Q96 96 94 88 Z"
          fill={`url(#cc${uid})`} stroke={`${A}42`} strokeWidth=".9"/>
        <ellipse cx="80" cy="124" rx="16" ry="3.5" fill={`url(#cgd${uid})`} opacity=".92"/>
        <path d="M68 54 Q66 60 66 90 L94 90 Q94 60 92 54 Z"
          fill={`url(#cc${uid})`} stroke={`${A}55`} strokeWidth="1"/>
        <ellipse cx="80" cy="90"  rx="14" ry="3.2" fill={`url(#cgd${uid})`} opacity=".96"/>
        <ellipse cx="80" cy="54"  rx="12" ry="4.2" fill={`url(#cgd${uid})`} opacity=".96"/>
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
        <polygon points="52,136 40,158 36,210 40,258 56,282 80,288 104,282 120,258 124,210 120,158 108,136"
          fill={`url(#dl${uid})`} opacity=".72"/>
        <polygon points="52,132 40,156 36,208 40,256 56,280 80,286 104,280 120,256 124,208 120,156 108,132"
          fill={`url(#dg${uid})`} stroke={`${C}50`} strokeWidth="1"/>
        <polygon points="52,132 68,132 56,156 40,156"   fill="rgba(255,255,255,.22)"/>
        <polygon points="68,132 92,132 120,156 104,156" fill="rgba(255,255,255,.07)"/>
        <polygon points="40,156 56,156 52,208 36,208"   fill="rgba(0,0,0,.06)"/>
        <polygon points="104,156 120,156 124,208 108,208" fill="rgba(255,255,255,.14)"/>
        <polygon points="52,132 92,132 90,138 54,138"   fill={`url(#dgd${uid})`} opacity=".90"/>
        <line x1="40"  y1="156" x2="120" y2="156" stroke={`url(#dgd${uid})`} strokeWidth="1.4" opacity=".70"/>
        <line x1="40"  y1="256" x2="120" y2="256" stroke={`url(#dgd${uid})`} strokeWidth="1.8" opacity=".76"/>
        <text x="80" y="200" textAnchor="middle" fill={`${A}e0`}
          style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"10px",fontWeight:700,letterSpacing:"4px"}}>
          BOLD
        </text>
        <line x1="54" y1="206" x2="106" y2="206" stroke={`${A}40`} strokeWidth=".6"/>
        <text x="80" y="216" textAnchor="middle" fill={`${A}72`}
          style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"4px",letterSpacing:"2.5px"}}>
          EAU DE PARFUM
        </text>
        <polygon points="62,100 98,100 104,106 104,134 56,134 56,106"
          fill={`url(#dc${uid})`} stroke={`${A}45`} strokeWidth=".8"/>
        <polygon points="62,100 98,100 96,106 64,106" fill={`url(#dgd${uid})`} opacity=".85"/>
        <line x1="56" y1="128" x2="104" y2="128" stroke={`url(#dgd${uid})`} strokeWidth="2.5"/>
        <polygon points="58,100 102,100 106,66 54,66"
          fill={`url(#dc${uid})`} stroke={`${A}58`} strokeWidth="1"/>
        <polygon points="58,100 80,82 54,66" fill="rgba(255,255,255,.22)"/>
        <polygon points="102,100 80,82 106,66" fill="rgba(255,255,255,.08)"/>
        <polygon points="54,66 106,66 104,72 56,72" fill={`url(#dgd${uid})`} opacity=".90"/>
        <ellipse cx="80" cy="66" rx="26" ry="5.2" fill={`url(#dgd${uid})`} opacity=".96"/>
        <polygon points="80,52 88,62 80,70 72,62" fill={A} opacity=".90"/>
        <polygon points="80,55 86,62 80,68 74,62" fill="rgba(255,255,255,.55)"/>
      </g>
      <motion.polygon points="41,158 47,158 44,206 38,206"
        fill="rgba(255,255,255,.28)"
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

const BOTTLE_SHAPES = [BottleA, BottleB, BottleC, BottleD];

/* ═══════════════════════════════════════════════════════════
   GRAIN OVERLAY
═══════════════════════════════════════════════════════════ */
function Grain() {
  return (
    <svg aria-hidden="true" style={{
      position:"absolute",inset:0,width:"100%",height:"100%",
      pointerEvents:"none",opacity:.022,mixBlendMode:"multiply",zIndex:0,
    }}>
      <filter id="cgrain">
        <feTurbulence type="fractalNoise" baseFrequency=".72" numOctaves="4" stitchTiles="stitch"/>
        <feColorMatrix type="saturate" values="0"/>
      </filter>
      <rect width="100%" height="100%" filter="url(#cgrain)"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   FILTER BAR — horizontal scroll on mobile
═══════════════════════════════════════════════════════════ */
function FilterBar({ filter, setFilter, bp }) {
  const FILTERS = [
    { label:"All",     value:"all"    },
    { label:"For Her", value:"female" },
    { label:"For Him", value:"male"   },
    { label:"Unisex",  value:"unisex" },
  ];

  const isMobile = bp === "xs" || bp === "sm";

  return (
    <div style={{
      overflowX: isMobile ? "auto" : "visible",
      WebkitOverflowScrolling: "touch",
      scrollbarWidth: "none",
      msOverflowStyle: "none",
      marginBottom: isMobile ? 28 : "clamp(32px,5vw,56px)",
      /* negative margin trick so pills reach screen edge on mobile */
      margin: isMobile
        ? "0 -16px clamp(28px,5vw,48px)"
        : `0 0 clamp(32px,5vw,56px)`,
      paddingBottom: 4,
    }}>
      <div style={{
        display: "flex",
        gap: 10,
        justifyContent: isMobile ? "flex-start" : "center",
        padding: isMobile ? "0 16px 4px" : "0",
        minWidth: "max-content",
        width: isMobile ? "max-content" : "auto",
      }}>
        {FILTERS.map(f => {
          const active = filter === f.value;
          return (
            <motion.button
              key={f.value}
              onClick={() => setFilter(f.value)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: .96 }}
              style={{
                fontFamily: "'Cinzel',serif",
                fontSize: isMobile ? ".48rem" : ".52rem",
                letterSpacing: ".34em",
                textTransform: "uppercase",
                padding: isMobile ? "10px 18px" : "11px 24px",
                borderRadius: 1,
                border: `1px solid ${active ? GOLD : "rgba(201,168,76,.28)"}`,
                background: active
                  ? `linear-gradient(135deg,${GOLD_L}22,${GOLD}18)`
                  : "rgba(255,255,255,.6)",
                color: active ? GOLD_D : `${INK}88`,
                cursor: "pointer",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                transition: "border-color .26s,color .26s,background .26s",
                flexShrink: 0,
                whiteSpace: "nowrap",
                touchAction: "manipulation",
                boxShadow: active
                  ? `0 4px 20px ${GOLD}22,inset 0 1px 0 rgba(255,255,255,.5)`
                  : "inset 0 1px 0 rgba(255,255,255,.4)",
              }}>
              {f.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PERFUME CARD — fully responsive
═══════════════════════════════════════════════════════════ */
function PerfumeCard({ perfume, index, onOrder, bp }) {
  const p   = getPalette(perfume.id);
  const Btl = BOTTLE_SHAPES[(perfume.id - 1) % BOTTLE_SHAPES.length];
  const uid = `c${perfume.id}`;

  const isXs = bp === "xs";
  const isSm = bp === "sm";
  const isTiny = isXs || isSm;

  /* On xs: horizontal card layout (image left, text right) */
  const isHorizontal = isXs;

  return (
    <motion.article
      initial={{ opacity:0, y:32 }}
      animate={{ opacity:1, y:0 }}
      exit={{ opacity:0, y:16, scale:.96 }}
      transition={{ duration:.55, delay: Math.min(index,.5)*.08, ease:[.16,1,.3,1] }}
      whileHover={{ y: isTiny ? 0 : -6, transition:{ duration:.32 } }}
      style={{
        position: "relative",
        borderRadius: 4,
        overflow: "hidden",
        background: `linear-gradient(160deg,${p.bg1} 0%,${p.bg2} 100%)`,
        border: `1px solid ${p.accent}22`,
        boxShadow: `0 4px 32px ${p.liquid}14, 0 1px 0 rgba(255,255,255,.8) inset`,
        display: "flex",
        flexDirection: isHorizontal ? "row" : "column",
        cursor: "default",
        minHeight: isHorizontal ? 0 : "auto",
      }}>

      {/* Dot grid bg */}
      <div style={{
        position:"absolute",inset:0,zIndex:0,
        backgroundImage:`radial-gradient(circle,${p.accent}14 1px,transparent 0)`,
        backgroundSize:"22px 22px",
        pointerEvents:"none",
      }}/>

      {/* Ambient glow */}
      <div style={{
        position:"absolute",top:"-20%",right:"-10%",
        width:"70%",height:"70%",borderRadius:"50%",
        background:`radial-gradient(circle,${p.accent}1a 0%,transparent 70%)`,
        filter:"blur(32px)",pointerEvents:"none",zIndex:0,
      }}/>

      <Grain/>

      {/* ── HORIZONTAL LAYOUT (xs) ── */}
      {isHorizontal ? (
        <>
          {/* Bottle column */}
          <div style={{
            position:"relative",zIndex:1,
            width: 100,
            flexShrink: 0,
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            padding:"16px 8px",
          }}>
            <motion.div
              animate={{y:[0,-5,0]}}
              transition={{duration:6,repeat:Infinity,ease:"easeInOut"}}
              style={{width:60,height:110}}>
              <Btl p={p} uid={uid}/>
            </motion.div>
          </div>

          {/* Content column */}
          <div style={{
            position:"relative",zIndex:1,
            flex:1,
            display:"flex",
            flexDirection:"column",
            padding:"14px 14px 14px 4px",
            minWidth:0,
          }}>
            {/* Badge row */}
            <div style={{
              display:"flex",
              alignItems:"center",
              justifyContent:"space-between",
              marginBottom:8,
            }}>
              <span style={{
                fontFamily:"'Cinzel',serif",fontSize:".34rem",
                letterSpacing:".28em",textTransform:"uppercase",
                padding:"4px 8px",borderRadius:1,
                background:`${p.accent}14`,
                border:`1px solid ${p.accent}38`,
                color:p.accent,
              }}>
                {perfume.badge || "Signature"}
              </span>
              <span style={{
                fontFamily:"'Cinzel',serif",fontSize:".34rem",
                letterSpacing:".24em",color:`${p.accent}88`,
              }}>
                {perfume.ml || "50 ML"}
              </span>
            </div>

            {/* Divider */}
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
              <div style={{flex:1,height:1,background:`linear-gradient(to right,${p.accent}44,transparent)`}}/>
              <div style={{width:4,height:4,transform:"rotate(45deg)",background:p.accent,opacity:.6,flexShrink:0}}/>
              <div style={{flex:1,height:1,background:`linear-gradient(to left,${p.accent}44,transparent)`}}/>
            </div>

            {/* Name */}
            <h3 style={{
              fontFamily:"'Cormorant Garamond',serif",
              fontSize:"1rem",
              fontWeight:600,
              letterSpacing:".04em",
              color:INK,
              marginBottom:2,
              lineHeight:1.1,
              whiteSpace:"nowrap",
              overflow:"hidden",
              textOverflow:"ellipsis",
            }}>
              {perfume.name}
            </h3>

            {/* Notes */}
            <p style={{
              fontFamily:"'Cormorant Garamond',serif",
              fontStyle:"italic",
              fontSize:".72rem",
              color:`${p.accent}cc`,
              letterSpacing:".03em",
              marginBottom:6,
              lineHeight:1.3,
              display:"-webkit-box",
              WebkitLineClamp:2,
              WebkitBoxOrient:"vertical",
              overflow:"hidden",
            }}>
              {perfume.notes}
            </p>

            <div style={{flex:1,minHeight:4}}/>

            {/* Price + CTA */}
            <div style={{
              display:"flex",alignItems:"center",
              justifyContent:"space-between",
              borderTop:`1px solid ${p.accent}18`,
              paddingTop:10,
              gap:8,
            }}>
              <span style={{
                fontFamily:"'Cormorant Garamond',serif",
                fontSize:"1rem",
                fontWeight:600,
                color:p.accent,
              }}>
                {perfume.price}
              </span>
              <motion.button
                onClick={onOrder}
                whileTap={{ scale:.94 }}
                style={{
                  fontFamily:"'Cinzel',serif",
                  fontSize:".38rem",
                  letterSpacing:".26em",
                  textTransform:"uppercase",
                  padding:"9px 14px",
                  border:`1px solid ${p.accent}60`,
                  background:`linear-gradient(135deg,${p.cap}28,${p.accent}18)`,
                  color:p.accent,
                  cursor:"pointer",
                  borderRadius:1,
                  touchAction:"manipulation",
                  whiteSpace:"nowrap",
                  boxShadow:`0 2px 14px ${p.accent}1a,inset 0 1px 0 rgba(255,255,255,.45)`,
                }}>
                Order
              </motion.button>
            </div>
          </div>
        </>
      ) : (
        /* ── VERTICAL LAYOUT (sm → xl) ── */
        <>
          {/* Top meta bar */}
          <div style={{
            position:"relative",zIndex:1,
            display:"flex",alignItems:"center",justifyContent:"space-between",
            padding: isSm ? "12px 14px 0" : "14px 18px 0",
          }}>
            <div style={{
              display:"inline-flex",alignItems:"center",gap:5,
              fontFamily:"'Cinzel',serif",
              fontSize: isSm ? ".36rem" : ".38rem",
              letterSpacing:".32em",textTransform:"uppercase",
              padding:"5px 10px",borderRadius:1,
              background:`${p.accent}14`,
              border:`1px solid ${p.accent}38`,
              color:p.accent,
            }}>
              <motion.span
                style={{width:4,height:4,borderRadius:"50%",background:p.accent,display:"inline-block"}}
                animate={{opacity:[1,.2,1],scale:[1,.5,1]}}
                transition={{duration:2,repeat:Infinity}}/>
              {perfume.badge || "Signature"}
            </div>
            <span style={{
              fontFamily:"'Cinzel',serif",
              fontSize: isSm ? ".34rem" : ".38rem",
              letterSpacing:".26em",color:`${p.accent}88`,
            }}>
              {perfume.ml || "50 ML"}
            </span>
          </div>

          {/* Bottle stage */}
          <div style={{
            position:"relative",zIndex:1,
            height: isSm ? 160 : 200,
            display:"flex",alignItems:"center",justifyContent:"center",
            padding: isSm ? "0 16px" : "0 24px",
          }}>
            <motion.div
              animate={{rotate:360}}
              transition={{duration:32,repeat:Infinity,ease:"linear"}}
              style={{
                position:"absolute",
                width:"68%",height:"68%",
                borderRadius:"50%",
                border:`1px dashed ${p.accent}18`,
                pointerEvents:"none",
              }}/>
            <motion.div
              animate={{scale:[1,1.18,1],opacity:[.12,.36,.12]}}
              transition={{duration:5,repeat:Infinity,ease:"easeInOut"}}
              style={{
                position:"absolute",
                width:"55%",height:"55%",
                borderRadius:"50%",
                background:`radial-gradient(circle,${p.accent}28 0%,transparent 70%)`,
                filter:"blur(12px)",pointerEvents:"none",
              }}/>
            <motion.div
              animate={{y:[0,-8,0]}}
              transition={{duration:6,repeat:Infinity,ease:"easeInOut"}}
              style={{
                width: isSm ? 78 : 100,
                height: isSm ? 140 : 180,
                flexShrink:0,
              }}>
              <Btl p={p} uid={uid}/>
            </motion.div>
            <motion.div
              animate={{scaleX:[1,1.08,1],opacity:[.10,.22,.10]}}
              transition={{duration:6,repeat:Infinity,ease:"easeInOut"}}
              style={{
                position:"absolute",bottom:"2%",left:"50%",transform:"translateX(-50%)",
                width:"38%",height:"10px",borderRadius:"50%",
                background:`radial-gradient(ellipse,${p.accent}44 0%,transparent 72%)`,
                filter:"blur(7px)",
              }}/>
          </div>

          {/* Content */}
          <div style={{
            position:"relative",zIndex:1,
            padding: isSm ? "0 14px 16px" : "0 20px 20px",
            display:"flex",flexDirection:"column",
            flex:1,
          }}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom: isSm ? 8 : 12}}>
              <div style={{flex:1,height:1,background:`linear-gradient(to right,${p.accent}44,transparent)`}}/>
              <div style={{width:5,height:5,transform:"rotate(45deg)",background:p.accent,opacity:.6,flexShrink:0}}/>
              <div style={{flex:1,height:1,background:`linear-gradient(to left,${p.accent}44,transparent)`}}/>
            </div>

            <h3 style={{
              fontFamily:"'Cormorant Garamond',serif",
              fontSize: isSm ? "1rem" : "clamp(1.1rem,2.5vw,1.32rem)",
              fontWeight:600,
              letterSpacing:".04em",
              color:INK,
              marginBottom:3,
              lineHeight:1.1,
            }}>
              {perfume.name}
            </h3>

            <p style={{
              fontFamily:"'Cormorant Garamond',serif",
              fontStyle:"italic",
              fontSize: isSm ? ".74rem" : ".82rem",
              color:`${p.accent}cc`,
              letterSpacing:".03em",
              marginBottom:3,
              lineHeight:1.4,
            }}>
              {perfume.notes}
            </p>

            {perfume.family && (
              <span style={{
                fontFamily:"'Cinzel',serif",
                fontSize: isSm ? ".32rem" : ".36rem",
                letterSpacing:".34em",
                color:`${p.accent}70`,
                textTransform:"uppercase",
                marginBottom: isSm ? 10 : 14,
              }}>
                {perfume.family}
              </span>
            )}

            <div style={{flex:1,minHeight:8}}/>

            <div style={{
              display:"flex",alignItems:"center",justifyContent:"space-between",
              borderTop:`1px solid ${p.accent}18`,
              paddingTop: isSm ? 10 : 14,
              gap:8,
            }}>
              <span style={{
                fontFamily:"'Cormorant Garamond',serif",
                fontSize: isSm ? "1rem" : "1.18rem",
                fontWeight:600,
                color:p.accent,
                letterSpacing:".02em",
              }}>
                {perfume.price}
              </span>

              <motion.button
                onClick={onOrder}
                whileHover={{ boxShadow:`0 8px 28px ${p.accent}40` }}
                whileTap={{ scale:.94 }}
                style={{
                  fontFamily:"'Cinzel',serif",
                  fontSize: isSm ? ".38rem" : ".46rem",
                  letterSpacing:".3em",
                  textTransform:"uppercase",
                  padding: isSm ? "9px 16px" : "10px 22px",
                  border:`1px solid ${p.accent}60`,
                  background:`linear-gradient(135deg,${p.cap}28,${p.accent}18)`,
                  color:p.accent,
                  cursor:"pointer",
                  borderRadius:1,
                  touchAction:"manipulation",
                  transition:"border-color .26s",
                  boxShadow:`0 2px 14px ${p.accent}1a,inset 0 1px 0 rgba(255,255,255,.45)`,
                  whiteSpace:"nowrap",
                }}>
                Order
              </motion.button>
            </div>
          </div>
        </>
      )}
    </motion.article>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION HEADER
═══════════════════════════════════════════════════════════ */
function SectionHeader({ bp }) {
  const isMobile = bp === "xs" || bp === "sm";
  return (
    <div style={{textAlign:"center",marginBottom:"clamp(32px,5vw,72px)"}}>
      <motion.div
        initial={{opacity:0,y:12}} animate={{opacity:1,y:0}}
        transition={{duration:.6}}
        style={{
          display:"flex",alignItems:"center",justifyContent:"center",gap:isMobile ? 10 : 14,
          marginBottom:isMobile ? 12 : 18,
        }}>
        <motion.div
          initial={{scaleX:0}} animate={{scaleX:1}}
          transition={{duration:.7,delay:.1}}
          style={{
            width: isMobile ? 24 : 36,
            height:1.5,
            background:`linear-gradient(to right,transparent,${GOLD})`,
            originX:1,
          }}/>
        <span style={{
          fontFamily:"'Cinzel',serif",
          fontSize: isMobile ? ".44rem" : ".48rem",
          letterSpacing:".44em",
          color:GOLD,
          textTransform:"uppercase",
        }}>
          Maison Verra
        </span>
        <motion.div
          initial={{scaleX:0}} animate={{scaleX:1}}
          transition={{duration:.7,delay:.1}}
          style={{
            width: isMobile ? 24 : 36,
            height:1.5,
            background:`linear-gradient(to left,transparent,${GOLD})`,
            originX:0,
          }}/>
      </motion.div>

      <motion.h2
        initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
        transition={{duration:.7,delay:.12,ease:[.16,1,.3,1]}}
        style={{
          fontFamily:"'Cormorant Garamond',serif",
          fontSize: "clamp(2rem,8vw,5rem)",
          fontWeight:300,
          letterSpacing:"-.02em",
          lineHeight:.9,
          color:INK,
          margin:"0 0 12px",
        }}>
        Our Collection
      </motion.h2>

      <motion.p
        initial={{opacity:0,y:12}} animate={{opacity:1,y:0}}
        transition={{duration:.6,delay:.22}}
        style={{
          fontFamily:"'Cormorant Garamond',serif",
          fontStyle:"italic",
          fontSize:"clamp(.82rem,2vw,1.1rem)",
          color:`${INK}60`,
          letterSpacing:".05em",
          maxWidth:480,
          margin:"0 auto",
          lineHeight:1.6,
          padding:"0 16px",
        }}>
        Handcrafted fragrances that tell stories. Each bottle, a world.
      </motion.p>

      <motion.div
        initial={{scaleX:0}} animate={{scaleX:1}}
        transition={{duration:.9,delay:.28,ease:[.16,1,.3,1]}}
        style={{
          width:"clamp(48px,10vw,120px)",
          height:1,
          background:`linear-gradient(to right,transparent,${GOLD}60,transparent)`,
          margin:"16px auto 0",
        }}/>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CSS
═══════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;}

.cv-section{
  position:relative;
  width:100%;
  padding: clamp(48px,7vw,100px) clamp(12px,4vw,80px) clamp(56px,7vw,100px);
  background: linear-gradient(160deg,#fef9f0 0%,#f8ede0 38%,#fef4ec 70%,#f5e8dc 100%);
  overflow:hidden;
}

/* scrollbar hide for filter row */
.cv-filter-scroll::-webkit-scrollbar { display:none; }

/* ── Grid ── */
.cv-grid{
  display:grid;
  gap: clamp(12px,2.5vw,28px);
  grid-template-columns: repeat(4,1fr);
}

@media(max-width:1280px){ .cv-grid{ grid-template-columns: repeat(3,1fr); } }
@media(max-width:900px){  .cv-grid{ grid-template-columns: repeat(2,1fr); } }
@media(max-width:639px){  .cv-grid{ grid-template-columns: 1fr; gap:12px; } }

.cv-empty{
  grid-column:1/-1;
  padding: 60px 20px;
  text-align:center;
  font-family:'Cormorant Garamond',serif;
  font-style:italic;
  font-size:1.05rem;
  color:rgba(24,8,9,.38);
  letter-spacing:.06em;
}
`;

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════ */
const FILTERS = [
  { label:"All",     value:"all"    },
  { label:"For Her", value:"female" },
  { label:"For Him", value:"male"   },
  { label:"Unisex",  value:"unisex" },
];

export default function Collection() {
  const [filter, setFilter] = useState("all");
  const bp = useBreakpoint();

  const filtered = perfumes.filter(p =>
    filter === "all" ? true : p.gender === filter
  );

  const scrollToContact = () =>
    document.querySelector("#contact")?.scrollIntoView({ behavior:"smooth" });

  return (
    <section className="cv-section" id="collection">
      <style>{CSS}</style>

      {/* Background orbs */}
      <div style={{
        position:"absolute",top:"-8%",right:"-6%",
        width:"36vw",height:"36vw",borderRadius:"50%",
        background:`radial-gradient(circle,${GOLD}10 0%,transparent 68%)`,
        filter:"blur(60px)",pointerEvents:"none",zIndex:0,
      }}/>
      <div style={{
        position:"absolute",bottom:"-10%",left:"-4%",
        width:"28vw",height:"28vw",borderRadius:"50%",
        background:`radial-gradient(circle,${GOLD_L}18 0%,transparent 68%)`,
        filter:"blur(60px)",pointerEvents:"none",zIndex:0,
      }}/>
      <Grain/>

      <div style={{position:"relative",zIndex:1,maxWidth:1400,margin:"0 auto"}}>

        <SectionHeader bp={bp}/>

        <FilterBar filter={filter} setFilter={setFilter} bp={bp}/>

        <div className="cv-grid">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? filtered.map((perfume, i) => (
              <PerfumeCard
                key={perfume.id}
                perfume={perfume}
                index={i}
                onOrder={scrollToContact}
                bp={bp}/>
            )) : (
              <motion.div
                key="empty"
                className="cv-empty"
                initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                No fragrances found in this collection.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}