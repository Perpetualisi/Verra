import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";

/* ══════════════════════════════════════════════════════════════
   SLIDE DATA — all original colors preserved
══════════════════════════════════════════════════════════════ */
const slides = [
  {
    id: 0, name: "VERRA", heading: "Art in Scent", tagline: "Where gold meets smoke",
    sub: "An opulent fusion of Bergamot and wild Oud, anchored by raw Amber resin from the Arabian desert. Bold. Timeless. Yours.",
    cta: "Shop Now", badge: "Bestseller",
    accent: "#c9a84c", liquid: "#b05c10", cap: "#f0d080", bg1: "#fef9f0", bg2: "#f8e8c0",
    ml: "50 ML", note: "Bergamot · Oud · Amber", family: "Oriental Woody", origin: "New York", year: "2019",
  },
  {
    id: 1, name: "PURE SCENT", heading: "Luxury Drops", tagline: "Softness distilled to perfection",
    sub: "Rose absolute from Grasse, warm Musk and Sri Lankan Sandalwood layered into the most intimate fragrance we have ever crafted.",
    cta: "Discover", badge: "New Arrival",
    accent: "#b8896a", liquid: "#7a3b1e", cap: "#e8c4a0", bg1: "#fdf5ee", bg2: "#f0d8c0",
    ml: "75 ML", note: "Rose · Musk · Sandalwood", family: "Floral Woody", origin: "Los Angeles", year: "2021",
  },
  {
    id: 2, name: "NEW SCENT", heading: "Your Story", tagline: "Earth. Rain. Renewal.",
    sub: "Vetiver roots pulled from Haitian soil, Virginian Cedar and dewy Fern — a scent that smells like the first breath after a storm.",
    cta: "Explore", badge: "Limited Edition",
    accent: "#5a8a6a", liquid: "#1e3a28", cap: "#a0c8a8", bg1: "#f0f8f2", bg2: "#c8e0cc",
    ml: "30 ML", note: "Vetiver · Cedar · Fern", family: "Aromatic Green", origin: "Portland", year: "2023",
  },
  {
    id: 3, name: "BEAUTY", heading: "Nature's Touch", tagline: "Clarity in every note",
    sub: "Florentine Iris and wild Violet bloom over a bed of crystalline Aqua accords — an airy, luminous tribute to effortless elegance.",
    cta: "Buy Now", badge: "Award Winner",
    accent: "#5888b0", liquid: "#0e2848", cap: "#88b8d8", bg1: "#f0f4fc", bg2: "#c0d4e8",
    ml: "100 ML", note: "Iris · Violet · Aqua", family: "Floral Aquatic", origin: "Chicago", year: "2020",
  },
  {
    id: 4, name: "BE BOLD", heading: "Speak Scent", tagline: "Unapologetic. Unmistakable.",
    sub: "Jasmine Sambac from India, dark Patchouli aged in oak, and scorching Spice accord — a scent that commands every room it enters.",
    cta: "View All", badge: "Fan Favorite",
    accent: "#a85878", liquid: "#580828", cap: "#e0a0c0", bg1: "#fdf0f4", bg2: "#ecc8d4",
    ml: "60 ML", note: "Jasmine · Patchouli · Spice", family: "Floral Oriental", origin: "Miami", year: "2022",
  },
];

/* ══════════════════════════════════════════════════════════════
   BOTTLE 1 — VERRA: Tall Art Deco Faceted Flacon
══════════════════════════════════════════════════════════════ */
function Bottle1({ slide, mouseX, mouseY }) {
  const { accent, liquid, cap } = slide;
  const rx = useTransform(mouseY, [-1, 1], [6, -6]);
  const ry = useTransform(mouseX, [-1, 1], [-8, 8]);
  return (
    <motion.svg viewBox="0 0 200 440" width="100%" height="100%" fill="none"
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}>
      <defs>
        <linearGradient id="b1g" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fffaee" stopOpacity="0.93"/>
          <stop offset="18%" stopColor={cap} stopOpacity="0.58"/>
          <stop offset="50%" stopColor={liquid} stopOpacity="0.35"/>
          <stop offset="82%" stopColor={cap} stopOpacity="0.62"/>
          <stop offset="100%" stopColor="#fffaee" stopOpacity="0.9"/>
        </linearGradient>
        <linearGradient id="b1liq" x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.52"/>
          <stop offset="100%" stopColor={liquid} stopOpacity="0.78"/>
        </linearGradient>
        <linearGradient id="b1cap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fffbe8"/>
          <stop offset="35%" stopColor={cap}/>
          <stop offset="100%" stopColor={accent}/>
        </linearGradient>
        <linearGradient id="b1gld" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fffbe8"/>
          <stop offset="28%" stopColor={cap}/>
          <stop offset="58%" stopColor="#ffe97a"/>
          <stop offset="100%" stopColor={cap}/>
        </linearGradient>
        <filter id="b1dr" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="18" stdDeviation="14" floodColor={liquid} floodOpacity="0.22"/>
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor={accent} floodOpacity="0.18"/>
        </filter>
      </defs>
      <g filter="url(#b1dr)">
        <polygon points="57,200 42,210 40,348 42,378 100,388 158,378 160,348 158,210 143,200" fill="url(#b1liq)" opacity="0.82"/>
        <polygon points="55,165 40,200 38,350 40,380 100,390 160,380 162,350 160,200 145,165" fill="url(#b1g)" stroke={`${cap}66`} strokeWidth="1.1"/>
        <polygon points="55,165 75,168 60,200 60,370 40,380 38,350 40,200" fill="rgba(0,0,0,0.065)"/>
        <polygon points="75,168 125,168 140,200 140,370 100,382 60,370 60,200" fill="rgba(255,255,255,0.07)"/>
        <polygon points="125,168 145,165 162,200 160,350 160,380 140,370 140,200" fill="rgba(255,255,255,0.13)"/>
        <line x1="75" y1="168" x2="60" y2="380" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8"/>
        <line x1="125" y1="168" x2="140" y2="380" stroke="rgba(255,255,255,0.11)" strokeWidth="0.8"/>
        <polygon points="55,165 145,165 140,172 60,172" fill="url(#b1gld)" opacity="0.95"/>
        <polygon points="56,184 144,184 142,190 58,190" fill="url(#b1gld)" opacity="0.55"/>
        <polygon points="41,370 159,370 161,378 39,378" fill="url(#b1gld)" opacity="0.8"/>
        <rect x="62" y="208" width="76" height="132" rx="2" fill="rgba(255,248,225,0.2)" stroke={`${cap}55`} strokeWidth="0.8"/>
        <rect x="66" y="212" width="68" height="124" rx="1.5" fill="none" stroke={`${cap}28`} strokeWidth="0.5"/>
        <polygon points="100,224 107,232 100,240 93,232" fill="none" stroke={`${cap}80`} strokeWidth="0.9"/>
        <polygon points="100,227 105,232 100,237 95,232" fill={`${cap}38`}/>
        <text x="100" y="260" textAnchor="middle" fill={`${cap}e0`} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"13px",fontWeight:700,letterSpacing:"5.5px"}}>VERRA</text>
        <line x1="68" y1="266" x2="132" y2="266" stroke={`${cap}44`} strokeWidth="0.7"/>
        <text x="100" y="280" textAnchor="middle" fill={`${cap}80`} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"5.5px",letterSpacing:"3.5px"}}>EAU DE PARFUM</text>
        <line x1="68" y1="294" x2="132" y2="294" stroke={`${cap}30`} strokeWidth="0.5"/>
        <text x="100" y="312" textAnchor="middle" fill={`${cap}58`} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"5px",letterSpacing:"2.5px"}}>PARIS · FRANCE</text>
        <text x="100" y="326" textAnchor="middle" fill={`${cap}44`} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"5px",letterSpacing:"2px"}}>50 ML</text>
        <polygon points="76,120 124,120 130,128 130,166 70,166 70,128" fill="url(#b1cap)" stroke={`${cap}50`} strokeWidth="0.9"/>
        <polygon points="78,122 78,164 70,164 70,130" fill="rgba(255,255,255,0.24)"/>
        <rect x="70" y="160" width="60" height="5" fill="url(#b1gld)"/>
        <rect x="70" y="120" width="60" height="4" fill="url(#b1gld)"/>
        <polygon points="70,65 130,65 136,72 136,122 64,122 64,72" fill="url(#b1cap)" stroke={`${cap}68`} strokeWidth="1.1"/>
        <polygon points="70,65 130,65 128,72 72,72" fill="rgba(255,255,255,0.38)"/>
        <polygon points="64,72 70,65 70,120 64,120" fill="rgba(255,255,255,0.24)"/>
        <rect x="64" y="82" width="72" height="2.5" fill="url(#b1gld)"/>
        <rect x="64" y="112" width="72" height="2.5" fill="url(#b1gld)"/>
        <polygon points="100,76 106,84 100,92 94,84" fill="none" stroke={`${cap}95`} strokeWidth="0.9"/>
        <text x="100" y="108" textAnchor="middle" fill={`${cap}d8`} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"7px",letterSpacing:"3px"}}>V E R R A</text>
        <rect x="64" y="61" width="72" height="7" rx="1.5" fill="url(#b1gld)" opacity="0.97"/>
        <rect x="68" y="62" width="64" height="3" rx="1" fill="rgba(255,255,255,0.4)"/>
      </g>
      <motion.rect x="66" y="198" width="4.5" height="125" rx="2.5" fill="rgba(255,255,255,0.38)"
        animate={{opacity:[0.22,0.62,0.22],y:[0,12,0]}} transition={{duration:4.8,repeat:Infinity,ease:"easeInOut"}}/>
      <motion.circle cx="148" cy="210" r="2.5" fill="rgba(255,255,255,0.5)"
        animate={{opacity:[0,0.8,0],cx:[148,152,148]}} transition={{duration:3.2,repeat:Infinity,ease:"easeInOut",delay:1}}/>
    </motion.svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   BOTTLE 2 — PURE SCENT: Bulbous Sphere Flacon
══════════════════════════════════════════════════════════════ */
function Bottle2({ slide, mouseX, mouseY }) {
  const { accent, liquid, cap } = slide;
  const rx = useTransform(mouseY, [-1, 1], [6, -6]);
  const ry = useTransform(mouseX, [-1, 1], [-8, 8]);
  return (
    <motion.svg viewBox="0 0 200 440" width="100%" height="100%" fill="none"
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}>
      <defs>
        <radialGradient id="b2g" cx="34%" cy="32%" r="72%">
          <stop offset="0%" stopColor="#fff8f0" stopOpacity="0.96"/>
          <stop offset="28%" stopColor={cap} stopOpacity="0.62"/>
          <stop offset="62%" stopColor={liquid} stopOpacity="0.38"/>
          <stop offset="100%" stopColor={accent} stopOpacity="0.72"/>
        </radialGradient>
        <radialGradient id="b2liq" cx="38%" cy="38%" r="68%">
          <stop offset="0%" stopColor={cap} stopOpacity="0.58"/>
          <stop offset="100%" stopColor={liquid} stopOpacity="0.82"/>
        </radialGradient>
        <linearGradient id="b2cap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fffbe8"/>
          <stop offset="48%" stopColor={cap}/>
          <stop offset="100%" stopColor={accent}/>
        </linearGradient>
        <linearGradient id="b2gld" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={cap}/>
          <stop offset="38%" stopColor={accent}/>
          <stop offset="68%" stopColor="#ffe48a"/>
          <stop offset="100%" stopColor={cap}/>
        </linearGradient>
        <filter id="b2dr" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="20" stdDeviation="16" floodColor={liquid} floodOpacity="0.2"/>
        </filter>
      </defs>
      <g filter="url(#b2dr)">
        <ellipse cx="100" cy="318" rx="63" ry="80" fill="url(#b2liq)" opacity="0.78"/>
        <ellipse cx="100" cy="308" rx="70" ry="86" fill="url(#b2g)" stroke={`${cap}60`} strokeWidth="1.3"/>
        <ellipse cx="75" cy="268" rx="19" ry="28" fill="rgba(255,255,255,0.34)"/>
        <ellipse cx="70" cy="260" rx="7" ry="11" fill="rgba(255,255,255,0.58)"/>
        <ellipse cx="156" cy="318" rx="15" ry="42" fill="rgba(255,255,255,0.15)"/>
        <path d="M31 308 Q100 322 169 308" stroke="url(#b2gld)" strokeWidth="2.8" fill="none" opacity="0.92"/>
        <path d="M31 308 Q100 294 169 308" stroke={`${cap}58`} strokeWidth="1.1" fill="none"/>
        <ellipse cx="100" cy="300" rx="52" ry="64" fill="rgba(255,248,230,0.13)" stroke={`${cap}48`} strokeWidth="0.9"/>
        {[0,60,120,180,240,300].map((deg,i)=>(
          <ellipse key={i} cx={100+11*Math.cos(deg*Math.PI/180)} cy={250+9*Math.sin(deg*Math.PI/180)}
            rx="4.5" ry="2.8" fill={`${cap}55`}
            transform={`rotate(${deg},${100+11*Math.cos(deg*Math.PI/180)},${250+9*Math.sin(deg*Math.PI/180)})`}/>
        ))}
        <circle cx="100" cy="250" r="3.5" fill={`${cap}88`}/>
        <text x="100" y="276" textAnchor="middle" fill={`${cap}e2`} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"11.5px",fontWeight:700,letterSpacing:"4.5px"}}>PURE</text>
        <text x="100" y="291" textAnchor="middle" fill={`${cap}b8`} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"11.5px",fontWeight:700,letterSpacing:"4.5px"}}>SCENT</text>
        <line x1="64" y1="297" x2="136" y2="297" stroke={`${cap}48`} strokeWidth="0.7"/>
        <text x="100" y="310" textAnchor="middle" fill={`${cap}78`} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"5.5px",letterSpacing:"3px"}}>EAU DE PARFUM</text>
        <text x="100" y="325" textAnchor="middle" fill={`${cap}55`} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"5px",letterSpacing:"2px"}}>PARIS · 75 ML</text>
        <ellipse cx="100" cy="393" rx="42" ry="9" fill="url(#b2gld)" opacity="0.72"/>
        <ellipse cx="100" cy="391" rx="37" ry="5.5" fill="rgba(255,248,230,0.28)"/>
        <rect x="84" y="156" width="32" height="52" rx="9" fill="url(#b2cap)" stroke={`${cap}55`} strokeWidth="1"/>
        <rect x="84" y="156" width="10" height="52" rx="5" fill="rgba(255,255,255,0.22)"/>
        <rect x="82" y="200" width="36" height="5.5" rx="2" fill="url(#b2gld)"/>
        <rect x="82" y="156" width="36" height="4.5" rx="2" fill="url(#b2gld)"/>
        <path d="M78 154 Q78 88 100 83 Q122 88 122 154 Z" fill="url(#b2cap)" stroke={`${cap}70`} strokeWidth="1.1"/>
        <ellipse cx="100" cy="154" rx="22" ry="4.5" fill="url(#b2gld)" opacity="0.94"/>
        <text x="100" y="130" textAnchor="middle" fill={`${cap}d5`} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"17px",fontWeight:700,fontStyle:"italic"}}>P</text>
        <circle cx="100" cy="83" r="7" fill={accent} opacity="0.88"/>
        <circle cx="100" cy="83" r="4.5" fill="rgba(255,255,255,0.6)"/>
        <circle cx="100" cy="83" r="2" fill="#fff" opacity="0.9"/>
      </g>
      <motion.ellipse cx="72" cy="270" rx="3.5" ry="15" fill="rgba(255,255,255,0.42)"
        animate={{opacity:[0.28,0.72,0.28],cy:[263,282,263]}} transition={{duration:5.2,repeat:Infinity,ease:"easeInOut"}}/>
    </motion.svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   BOTTLE 3 — NEW SCENT
══════════════════════════════════════════════════════════════ */
function Bottle3({ slide, mouseX, mouseY }) {
  const { accent, liquid, cap } = slide;
  const rx = useTransform(mouseY, [-1, 1], [6, -6]);
  const ry = useTransform(mouseX, [-1, 1], [-8, 8]);
  return (
    <motion.svg viewBox="0 0 220 440" width="100%" height="100%" fill="none"
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}>
      <defs>
        <linearGradient id="b3g" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f0fff4" stopOpacity="0.92"/>
          <stop offset="14%" stopColor={cap} stopOpacity="0.52"/>
          <stop offset="50%" stopColor={liquid} stopOpacity="0.34"/>
          <stop offset="86%" stopColor={cap} stopOpacity="0.58"/>
          <stop offset="100%" stopColor="#f0fff4" stopOpacity="0.88"/>
        </linearGradient>
        <linearGradient id="b3liq" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={cap} stopOpacity="0.48"/>
          <stop offset="100%" stopColor={liquid} stopOpacity="0.72"/>
        </linearGradient>
        <linearGradient id="b3cap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8f5e9"/>
          <stop offset="52%" stopColor={accent}/>
          <stop offset="100%" stopColor="#122a1c"/>
        </linearGradient>
        <linearGradient id="b3gld" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={cap}/>
          <stop offset="50%" stopColor={accent}/>
          <stop offset="100%" stopColor={cap}/>
        </linearGradient>
        <filter id="b3dr" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="18" stdDeviation="14" floodColor={liquid} floodOpacity="0.2"/>
        </filter>
      </defs>
      <g filter="url(#b3dr)">
        <rect x="42" y="200" width="136" height="190" rx="3" fill="url(#b3liq)" opacity="0.78"/>
        <rect x="38" y="176" width="144" height="214" rx="5" fill="url(#b3g)" stroke={`${cap}55`} strokeWidth="1.2"/>
        <rect x="38" y="176" width="18" height="214" rx="5" fill="rgba(255,255,255,0.2)"/>
        <rect x="164" y="176" width="18" height="214" rx="5" fill="rgba(255,255,255,0.13)"/>
        <rect x="38" y="382" width="144" height="8" rx="2.5" fill="url(#b3gld)" opacity="0.82"/>
        <rect x="38" y="176" width="144" height="5.5" rx="2" fill="url(#b3gld)" opacity="0.88"/>
        <rect x="50" y="200" width="120" height="152" rx="3.5" fill="rgba(240,255,244,0.14)" stroke={`${accent}44`} strokeWidth="0.8"/>
        <text x="110" y="270" textAnchor="middle" fill={`${accent}e0`} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"9px",fontWeight:300,letterSpacing:"7.5px"}}>NEW SCENT</text>
        <line x1="56" y1="275" x2="164" y2="275" stroke={`${accent}38`} strokeWidth="0.7"/>
        <text x="110" y="288" textAnchor="middle" fill={`${accent}82`} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"5.5px",letterSpacing:"3.5px"}}>EAU DE PARFUM INTENSE</text>
        <text x="110" y="303" textAnchor="middle" fill={`${accent}62`} style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:"6.5px",letterSpacing:"2px"}}>Vetiver · Cedar · Fern</text>
        <text x="110" y="326" textAnchor="middle" fill={`${accent}48`} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"5px",letterSpacing:"3px"}}>MAISON VERRA · PARIS · 30 ML</text>
        <rect x="96" y="138" width="28" height="17" rx="3.5" fill="url(#b3cap)" stroke={`${accent}55`} strokeWidth="0.9"/>
        <rect x="124" y="141" width="28" height="9" rx="4.5" fill="url(#b3cap)"/>
        <circle cx="152" cy="145.5" r="3.5" fill="rgba(255,255,255,0.58)"/>
        <rect x="88" y="98" width="44" height="44" rx="2.5" fill="url(#b3cap)" stroke={`${accent}50`} strokeWidth="0.9"/>
        <rect x="86" y="136" width="48" height="4.5" fill="url(#b3gld)"/>
        <rect x="86" y="98" width="48" height="4.5" fill="url(#b3gld)"/>
        <rect x="80" y="46" width="60" height="56" rx="2.5" fill="url(#b3cap)" stroke={`${accent}65`} strokeWidth="1.1"/>
        <rect x="80" y="55" width="60" height="2.8" fill="url(#b3gld)"/>
        <rect x="80" y="92" width="60" height="2.8" fill="url(#b3gld)"/>
        <rect x="80" y="42" width="60" height="7" rx="1.5" fill="url(#b3gld)" opacity="0.97"/>
      </g>
      <motion.rect x="40" y="193" width="5.5" height="105" rx="2.5" fill="rgba(255,255,255,0.3)"
        animate={{opacity:[0.18,0.52,0.18],y:[0,9,0]}} transition={{duration:5.2,repeat:Infinity,ease:"easeInOut"}}/>
    </motion.svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   BOTTLE 4 — BEAUTY: Tall Amphora with Handles
══════════════════════════════════════════════════════════════ */
function Bottle4({ slide, mouseX, mouseY }) {
  const { accent, liquid, cap } = slide;
  const rx = useTransform(mouseY, [-1, 1], [6, -6]);
  const ry = useTransform(mouseX, [-1, 1], [-8, 8]);
  return (
    <motion.svg viewBox="0 0 200 460" width="100%" height="100%" fill="none"
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}>
      <defs>
        <linearGradient id="b4g" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f0f6ff" stopOpacity="0.93"/>
          <stop offset="20%" stopColor={cap} stopOpacity="0.56"/>
          <stop offset="54%" stopColor={liquid} stopOpacity="0.34"/>
          <stop offset="80%" stopColor={cap} stopOpacity="0.62"/>
          <stop offset="100%" stopColor="#f0f6ff" stopOpacity="0.9"/>
        </linearGradient>
        <linearGradient id="b4liq" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={cap} stopOpacity="0.48"/>
          <stop offset="100%" stopColor={liquid} stopOpacity="0.75"/>
        </linearGradient>
        <linearGradient id="b4cap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8f2ff"/>
          <stop offset="52%" stopColor={accent}/>
          <stop offset="100%" stopColor="#071c38"/>
        </linearGradient>
        <linearGradient id="b4gld" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={cap}/>
          <stop offset="40%" stopColor={accent}/>
          <stop offset="72%" stopColor="#c4e2f8"/>
          <stop offset="100%" stopColor={cap}/>
        </linearGradient>
        <filter id="b4dr" x="-25%" y="-15%" width="150%" height="130%">
          <feDropShadow dx="0" dy="22" stdDeviation="16" floodColor={liquid} floodOpacity="0.2"/>
        </filter>
      </defs>
      <g filter="url(#b4dr)">
        <path d="M60 183 Q47 210 45 262 Q43 322 48 362 Q52 398 100 405 Q148 398 152 362 Q157 322 155 262 Q153 210 140 183 Z" fill="url(#b4liq)" opacity="0.78"/>
        <path d="M68 162 Q46 194 43 252 Q39 318 45 360 Q49 398 100 406 Q151 398 155 360 Q161 318 157 252 Q154 194 132 162 Z" fill="url(#b4g)" stroke={`${cap}58`} strokeWidth="1.2"/>
        <path d="M43 252 Q28 258 26 273 Q24 288 43 294" fill="none" stroke={`${accent}78`} strokeWidth="4" strokeLinecap="round"/>
        <path d="M157 252 Q172 258 174 273 Q176 288 157 294" fill="none" stroke={`${accent}78`} strokeWidth="4" strokeLinecap="round"/>
        <path d="M43 252 Q28 258 26 273 Q24 288 43 294" fill="none" stroke={`${cap}55`} strokeWidth="2" strokeLinecap="round"/>
        <path d="M157 252 Q172 258 174 273 Q176 288 157 294" fill="none" stroke={`${cap}55`} strokeWidth="2" strokeLinecap="round"/>
        <path d="M61 165 Q100 174 139 165" stroke="url(#b4gld)" strokeWidth="3.2" fill="none" opacity="0.92"/>
        <path d="M43 297 Q100 308 157 297" stroke="url(#b4gld)" strokeWidth="2.2" fill="none" opacity="0.72"/>
        <path d="M45 358 Q100 369 155 358" stroke="url(#b4gld)" strokeWidth="2.8" fill="none" opacity="0.78"/>
        <text x="100" y="272" textAnchor="middle" fill={`${accent}e2`} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"12.5px",fontWeight:600,letterSpacing:"5px"}}>BEAUTY</text>
        <line x1="61" y1="278" x2="139" y2="278" stroke={`${accent}42`} strokeWidth="0.7"/>
        <text x="100" y="291" textAnchor="middle" fill={`${accent}82`} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"5.5px",letterSpacing:"3px"}}>EAU DE PARFUM</text>
        <text x="100" y="305" textAnchor="middle" fill={`${accent}62`} style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:"6px",letterSpacing:"2px"}}>Iris · Violet · Aqua</text>
        <ellipse cx="100" cy="404" rx="56" ry="9" fill="url(#b4gld)" opacity="0.68"/>
        <path d="M84 123 Q80 128 80 144 L80 168 Q84 173 100 174 Q116 173 120 168 L120 144 Q120 128 116 123 Z" fill="url(#b4cap)" stroke={`${accent}48`} strokeWidth="1"/>
        <ellipse cx="100" cy="170" rx="20" ry="4.5" fill="url(#b4gld)" opacity="0.94"/>
        <path d="M86 68 Q84 74 84 124 L116 124 Q116 74 114 68 Z" fill="url(#b4cap)" stroke={`${accent}65`} strokeWidth="1.1"/>
        <ellipse cx="100" cy="124" rx="16" ry="4" fill="url(#b4gld)" opacity="0.97"/>
        <ellipse cx="100" cy="68" rx="15" ry="5.5" fill="url(#b4gld)" opacity="0.97"/>
        <circle cx="100" cy="62" r="7" fill={accent} opacity="0.88"/>
        <circle cx="100" cy="62" r="4.5" fill="rgba(255,255,255,0.62)"/>
        <circle cx="100" cy="62" r="2" fill="#fff" opacity="0.9"/>
      </g>
      <motion.path d="M49 202 Q52 262 49 322" stroke="rgba(255,255,255,0.38)" strokeWidth="4.5" strokeLinecap="round"
        animate={{opacity:[0.18,0.56,0.18]}} transition={{duration:5.8,repeat:Infinity,ease:"easeInOut"}}/>
    </motion.svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   BOTTLE 5 — BE BOLD: Gem-Cut Prism
══════════════════════════════════════════════════════════════ */
function Bottle5({ slide, mouseX, mouseY }) {
  const { accent, liquid, cap } = slide;
  const rx = useTransform(mouseY, [-1, 1], [6, -6]);
  const ry = useTransform(mouseX, [-1, 1], [-8, 8]);
  return (
    <motion.svg viewBox="0 0 210 452" width="100%" height="100%" fill="none"
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}>
      <defs>
        <linearGradient id="b5g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff0f5" stopOpacity="0.94"/>
          <stop offset="24%" stopColor={cap} stopOpacity="0.56"/>
          <stop offset="55%" stopColor={liquid} stopOpacity="0.38"/>
          <stop offset="80%" stopColor={cap} stopOpacity="0.67"/>
          <stop offset="100%" stopColor="#fff0f5" stopOpacity="0.92"/>
        </linearGradient>
        <linearGradient id="b5liq" x1="18%" y1="0%" x2="82%" y2="100%">
          <stop offset="0%" stopColor={cap} stopOpacity="0.52"/>
          <stop offset="100%" stopColor={liquid} stopOpacity="0.82"/>
        </linearGradient>
        <linearGradient id="b5cap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffd8ec"/>
          <stop offset="46%" stopColor={accent}/>
          <stop offset="100%" stopColor="#380818"/>
        </linearGradient>
        <linearGradient id="b5gld" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={cap}/>
          <stop offset="34%" stopColor={accent}/>
          <stop offset="66%" stopColor="#ffb8d2"/>
          <stop offset="100%" stopColor={cap}/>
        </linearGradient>
        <filter id="b5dr" x="-20%" y="-18%" width="140%" height="136%">
          <feDropShadow dx="0" dy="20" stdDeviation="16" floodColor={liquid} floodOpacity="0.22"/>
        </filter>
      </defs>
      <g filter="url(#b5dr)">
        <polygon points="65,185 50,215 45,290 50,360 70,392 105,400 140,392 160,360 165,290 160,215 145,185" fill="url(#b5liq)" opacity="0.74"/>
        <polygon points="65,180 50,212 45,288 50,358 70,390 105,398 140,390 160,358 165,288 160,212 145,180" fill="url(#b5g)" stroke={`${cap}58`} strokeWidth="1.2"/>
        <polygon points="65,180 86,180 70,212 50,212" fill="rgba(255,255,255,0.24)"/>
        <polygon points="86,180 124,180 160,212 140,212" fill="rgba(255,255,255,0.08)"/>
        <polygon points="50,212 70,212 65,288 45,288" fill="rgba(0,0,0,0.065)"/>
        <polygon points="140,212 160,212 165,288 145,288" fill="rgba(255,255,255,0.15)"/>
        <polygon points="70,212 140,212 145,288 135,360 105,392 75,360 65,288" fill="rgba(255,255,255,0.06)"/>
        <polygon points="65,180 124,180 122,186 67,186" fill="url(#b5gld)" opacity="0.92"/>
        <line x1="50" y1="212" x2="160" y2="212" stroke="url(#b5gld)" strokeWidth="1.6" opacity="0.72"/>
        <line x1="50" y1="358" x2="160" y2="358" stroke="url(#b5gld)" strokeWidth="2.2" opacity="0.78"/>
        <text x="105" y="275" textAnchor="middle" fill={`${accent}e0`} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"12.5px",fontWeight:700,letterSpacing:"4.5px"}}>BE BOLD</text>
        <line x1="72" y1="281" x2="138" y2="281" stroke={`${accent}48`} strokeWidth="0.7"/>
        <text x="105" y="294" textAnchor="middle" fill={`${accent}82`} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"5.5px",letterSpacing:"3px"}}>EAU DE PARFUM</text>
        <text x="105" y="309" textAnchor="middle" fill={`${accent}62`} style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:"6.2px",letterSpacing:"1.8px"}}>Jasmine · Patchouli · Spice</text>
        <polygon points="82,140 128,140 133,148 133,183 77,183 77,148" fill="url(#b5cap)" stroke={`${accent}52`} strokeWidth="0.9"/>
        <polygon points="82,140 128,140 126,146 84,146" fill="url(#b5gld)" opacity="0.88"/>
        <line x1="77" y1="176" x2="133" y2="176" stroke="url(#b5gld)" strokeWidth="2.8"/>
        <polygon points="77,140 133,140 137,90 73,90" fill="url(#b5cap)" stroke={`${accent}65`} strokeWidth="1.1"/>
        <polygon points="77,140 105,119 73,90" fill="rgba(255,255,255,0.24)"/>
        <polygon points="133,140 105,119 137,90" fill="rgba(255,255,255,0.09)"/>
        <polygon points="73,90 137,90 135,96 75,96" fill="url(#b5gld)" opacity="0.92"/>
        <ellipse cx="105" cy="90" rx="33" ry="6.5" fill="url(#b5gld)" opacity="0.97"/>
        <polygon points="105,74 113,83 105,91 97,83" fill={accent} opacity="0.92"/>
        <polygon points="105,77 111,83 105,89 99,83" fill="rgba(255,255,255,0.58)"/>
      </g>
      <motion.polygon points="51,215 58,215 63,287 56,287" fill="rgba(255,255,255,0.32)"
        animate={{opacity:[0.18,0.62,0.18]}} transition={{duration:4.2,repeat:Infinity,ease:"easeInOut"}}/>
      {[0,1,2].map(i=>(
        <motion.circle key={i} cx={105+(i-1)*9} cy={70} r="1.6" fill={cap}
          initial={{cy:70,opacity:0}} animate={{cy:70-20-i*6,opacity:[0,0.62,0]}}
          transition={{duration:2.2,delay:i*0.22,repeat:Infinity,repeatDelay:3.8}}/>
      ))}
    </motion.svg>
  );
}

const BOTTLES = [Bottle1, Bottle2, Bottle3, Bottle4, Bottle5];

/* ══════════════════════════════════════════════════════════════
   GRAIN SVG TEXTURE — film grain premium feel
══════════════════════════════════════════════════════════════ */
function GrainOverlay() {
  return (
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",
      pointerEvents:"none",zIndex:5,opacity:0.028,mixBlendMode:"multiply"}} aria-hidden="true">
      <filter id="grain-f">
        <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch"/>
        <feColorMatrix type="saturate" values="0"/>
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-f)"/>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   PARTICLE FIELD
══════════════════════════════════════════════════════════════ */
function ParticleField({ accent }) {
  const pts = useRef(
    Array.from({length:18},()=>({
      x:`${4+Math.random()*92}%`, y:`${4+Math.random()*92}%`,
      s:0.5+Math.random()*1.6, d:9+Math.random()*14, dl:Math.random()*10,
      mx:(Math.random()-0.5)*22, my:(Math.random()-0.5)*22,
    }))
  ).current;
  return (
    <div style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden"}}>
      {pts.map((p,i)=>(
        <motion.div key={i} style={{
          position:"absolute",left:p.x,top:p.y,
          width:p.s,height:p.s,borderRadius:"50%",background:accent,
          boxShadow:`0 0 ${p.s*5}px ${accent}88`,
        }}
          animate={{y:[p.my,-p.my,p.my],x:[p.mx,-p.mx,p.mx],opacity:[0,0.55,0]}}
          transition={{duration:p.d,repeat:Infinity,delay:p.dl,ease:"easeInOut"}}/>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   HERO COMPONENT
══════════════════════════════════════════════════════════════ */
export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir]         = useState(1);
  const [hovered, setHovered] = useState(false);
  const timer    = useRef(null);
  const stageRef = useRef(null);
  const mouseX   = useMotionValue(0);
  const mouseY   = useMotionValue(0);
  const smoothX  = useSpring(mouseX, {stiffness:60,damping:18});
  const smoothY  = useSpring(mouseY, {stiffness:60,damping:18});

  const go   = useCallback((idx,d)=>{setDir(d);setCurrent(idx);},[]);
  const next = useCallback(()=>go((current+1)%slides.length,1),[current,go]);
  const prev = useCallback(()=>go((current-1+slides.length)%slides.length,-1),[current,go]);

  useEffect(()=>{
    if(hovered){clearInterval(timer.current);return;}
    timer.current=setInterval(next,6000);
    return ()=>clearInterval(timer.current);
  },[current,hovered,next]);

  const handleMouseMove=(e)=>{
    if(!stageRef.current)return;
    const r=stageRef.current.getBoundingClientRect();
    mouseX.set(((e.clientX-r.left)/r.width-0.5)*2);
    mouseY.set(((e.clientY-r.top)/r.height-0.5)*2);
  };
  const handleMouseLeave=()=>{mouseX.set(0);mouseY.set(0);};
  const scrollDown=()=>document.querySelector("#collection")?.scrollIntoView({behavior:"smooth"});

  const slide      = slides[current];
  const BottleComp = BOTTLES[current];

  const btlVar={
    enter:  d=>({opacity:0,x:d>0?130:-130,rotateY:d>0?32:-32,scale:0.82,filter:"blur(10px)"}),
    center: {opacity:1,x:0,rotateY:0,scale:1,filter:"blur(0px)",transition:{duration:1.0,ease:[0.16,1,0.3,1]}},
    exit:   d=>({opacity:0,x:d>0?-90:90,rotateY:d>0?-24:24,scale:0.86,filter:"blur(6px)",transition:{duration:0.5}}),
  };
  const txtVar={
    enter:  {opacity:0,y:32,filter:"blur(5px)"},
    center: {opacity:1,y:0,filter:"blur(0px)",transition:{duration:0.72,ease:[0.16,1,0.3,1]}},
    exit:   {opacity:0,y:-20,filter:"blur(3px)",transition:{duration:0.36}},
  };

  return (
    <section id="home" style={{
      position:"relative",width:"100%",minHeight:"100svh",
      fontFamily:"'Jost',sans-serif",overflow:"visible",
    }}>

      {/* ══ ATMOSPHERIC BACKGROUND ══ */}
      <div style={{position:"absolute",inset:0,overflow:"clip",pointerEvents:"none",zIndex:0}}>

        {/* Base gradient */}
        <AnimatePresence mode="wait">
          <motion.div key={`bg-${current}`}
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            transition={{duration:1.6,ease:"easeInOut"}}
            style={{
              position:"absolute",inset:0,
              background:`radial-gradient(ellipse 110% 90% at 62% 44%, ${slide.bg2} 0%, ${slide.bg1} 58%, #fff 100%)`,
            }}/>
        </AnimatePresence>

        {/* Fine halftone dot grid */}
        <AnimatePresence mode="wait">
          <motion.div key={`dot-${current}`}
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            transition={{duration:1.0}}
            style={{
              position:"absolute",inset:0,zIndex:1,
              backgroundImage:`radial-gradient(circle,${slide.accent}18 1px,transparent 0)`,
              backgroundSize:"28px 28px",
            }}/>
        </AnimatePresence>

        {/* Particles */}
        <div style={{position:"absolute",inset:0,zIndex:2}}>
          <ParticleField accent={slide.accent}/>
        </div>

        {/* Ambient glow orb behind bottle area */}
        <AnimatePresence mode="wait">
          <motion.div key={`orb-${current}`}
            initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} exit={{opacity:0}}
            transition={{duration:2.0}}
            style={{
              position:"absolute",right:"8%",top:"50%",transform:"translateY(-50%)",
              width:"44vw",height:"44vw",borderRadius:"50%",
              background:`radial-gradient(circle,${slide.accent}22 0%,transparent 65%)`,
              filter:"blur(48px)",zIndex:1,
            }}/>
        </AnimatePresence>

        {/* Secondary glow — left side behind text */}
        <AnimatePresence mode="wait">
          <motion.div key={`orb2-${current}`}
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            transition={{duration:2.2}}
            style={{
              position:"absolute",left:"-6%",top:"30%",
              width:"32vw",height:"32vw",borderRadius:"50%",
              background:`radial-gradient(circle,${slide.cap}28 0%,transparent 68%)`,
              filter:"blur(52px)",zIndex:1,
            }}/>
        </AnimatePresence>

        {/* Watermark character — very large, ultra-light */}
        <AnimatePresence mode="wait">
          <motion.div key={`wm-${current}`}
            initial={{opacity:0,scale:0.94}} animate={{opacity:1,scale:1}} exit={{opacity:0}}
            transition={{duration:1.8}}
            style={{
              position:"absolute",zIndex:1,
              right:"-3%",bottom:"-12%",
              fontFamily:"'Cormorant Garamond',serif",fontWeight:700,
              fontSize:"clamp(220px,34vw,520px)",
              color:`${slide.accent}08`,
              lineHeight:1,userSelect:"none",letterSpacing:"-0.05em",
            }}>
            {slide.name.charAt(0)}
          </motion.div>
        </AnimatePresence>

        {/* Horizontal rule pair */}
        <AnimatePresence mode="wait">
          <motion.div key={`rl1-${current}`}
            initial={{scaleX:0,originX:"50%"}} animate={{scaleX:1}} exit={{opacity:0}}
            transition={{duration:1.0,ease:[0.16,1,0.3,1]}}
            style={{position:"absolute",zIndex:2,top:"13%",left:0,right:0,
              height:"1px",background:`linear-gradient(to right,transparent 0%,${slide.accent}20 25%,${slide.accent}20 75%,transparent 100%)`}}/>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.div key={`rl2-${current}`}
            initial={{scaleX:0,originX:"50%"}} animate={{scaleX:1}} exit={{opacity:0}}
            transition={{duration:1.0,ease:[0.16,1,0.3,1],delay:0.08}}
            style={{position:"absolute",zIndex:2,bottom:"13%",left:0,right:0,
              height:"1px",background:`linear-gradient(to right,transparent 0%,${slide.accent}20 25%,${slide.accent}20 75%,transparent 100%)`}}/>
        </AnimatePresence>

        {/* Film grain */}
        <GrainOverlay/>
      </div>

      {/* ══════════════════════════════════════════════
          MAIN LAYOUT
      ══════════════════════════════════════════════ */}
      <div className="vr-outer">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Jost:wght@200;300;400;500&family=Cinzel:wght@400;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap');

          *, *::before, *::after { box-sizing:border-box; }

          /* ─── Layout shell ─── */
          .vr-outer {
            position:relative; z-index:3;
            width:100%; max-width:1300px; margin:0 auto;
            min-height:100svh;
            display:grid;
            grid-template-columns:1fr 1fr;
            grid-template-rows:1fr auto;
            align-items:center;
            padding:112px 60px 52px;
            gap:0 52px;
            overflow:visible;
          }

          /* ─── Left: text column ─── */
          .vr-left {
            grid-column:1; grid-row:1;
            display:flex; flex-direction:column; align-items:flex-start;
            padding-right:24px;
          }

          /* ─── Right: bottle column ─── */
          .vr-right {
            grid-column:2; grid-row:1 / span 2;
            display:flex; flex-direction:column;
            align-items:center; justify-content:center;
          }

          /* ─── Bottom bar ─── */
          .vr-bottom-bar {
            grid-column:1; grid-row:2;
            display:flex; align-items:center; gap:20px;
            padding-top:14px; padding-bottom:14px;
          }

          /* ─── Bottle stage ─── */
          .vr-stage {
            position:relative;
            width:330px; height:530px;
            perspective:1200px;
            cursor:grab;
          }
          .vr-stage:active { cursor:grabbing; }

          /* ─── Nav pair below bottle ─── */
          .vr-nav-pair {
            display:flex; align-items:center; gap:16px;
            margin-top:26px;
          }

          /* ─── Circular nav buttons ─── */
          .vr-nav {
            width:50px; height:50px; border-radius:50%;
            display:flex; align-items:center; justify-content:center;
            cursor:pointer; flex-shrink:0; padding:0; line-height:1;
            position:relative; overflow:hidden; border:none;
            transition:transform 0.38s cubic-bezier(0.16,1,0.3,1),
                        box-shadow 0.38s cubic-bezier(0.16,1,0.3,1);
          }
          .vr-nav:hover { transform:translateY(-3px) scale(1.06); }
          .vr-nav svg { position:relative; z-index:1; }

          /* ─── Display heading ─── */
          .vr-h1 {
            font-family:'Cormorant Garamond',serif;
            font-size:clamp(3.5rem,5.6vw,6.6rem);
            font-weight:300; line-height:0.88;
            letter-spacing:-0.02em; color:#18080a;
            margin:0 0 14px 0;
          }

          /* ─── Italic tagline ─── */
          .vr-tagline {
            font-family:'Playfair Display',serif; font-style:italic;
            font-size:clamp(0.95rem,1.7vw,1.22rem);
            font-weight:400; letter-spacing:0.06em;
            color:rgba(80,44,8,0.44);
            margin:0 0 22px 0;
          }

          /* ─── Body copy ─── */
          .vr-desc {
            font-family:'Jost',sans-serif; font-weight:300;
            font-size:clamp(0.78rem,1.05vw,0.9rem);
            color:rgba(50,30,6,0.5); line-height:1.95;
            max-width:40ch; margin:0 0 34px 0;
            letter-spacing:0.04em;
          }

          /* ─── CTA row ─── */
          .vr-cta-row {
            display:flex; align-items:center; gap:18px;
            margin-bottom:42px; flex-wrap:wrap;
          }

          /* Primary CTA — parallelogram with shimmer */
          .vr-cta-primary {
            font-family:'Cinzel',serif; font-size:0.58rem;
            letter-spacing:0.4em; text-transform:uppercase;
            padding:16px 48px 16px 44px;
            position:relative; overflow:hidden;
            clip-path:polygon(14px 0%,100% 0%,calc(100% - 14px) 100%,0% 100%);
            border:none; cursor:pointer;
            transition:transform 0.38s cubic-bezier(0.16,1,0.3,1),
                        box-shadow 0.38s cubic-bezier(0.16,1,0.3,1);
          }
          .vr-cta-primary::after {
            content:''; position:absolute; inset:0;
            background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.32) 50%,transparent 65%);
            transform:translateX(-120%) skewX(-18deg);
            transition:transform 0.6s cubic-bezier(0.16,1,0.3,1);
          }
          .vr-cta-primary:hover { transform:translateY(-4px); }
          .vr-cta-primary:hover::after { transform:translateX(130%) skewX(-18deg); }
          .vr-cta-primary span { position:relative; z-index:1; }

          /* Ghost secondary */
          .vr-cta-ghost {
            font-family:'Cinzel',serif; font-size:0.56rem;
            letter-spacing:0.36em; text-transform:uppercase;
            padding:15px 30px; background:transparent; cursor:pointer;
            position:relative; overflow:hidden;
            transition:letter-spacing 0.34s ease;
          }
          .vr-cta-ghost::after {
            content:''; position:absolute; bottom:0; left:50%; right:50%;
            height:1px; transition:left 0.34s ease,right 0.34s ease;
          }
          .vr-cta-ghost:hover { letter-spacing:0.44em; }
          .vr-cta-ghost:hover::after { left:0; right:0; }

          /* ─── Ornamental divider ─── */
          .vr-divider {
            display:flex; align-items:center; gap:10px;
            width:100%; max-width:430px; margin-bottom:22px;
          }
          .vr-divider-line { flex:1; height:1px; }
          .vr-divider-gem {
            width:6px; height:6px; transform:rotate(45deg);
            flex-shrink:0;
          }

          /* ─── Specs grid ─── */
          .vr-specs {
            display:grid; grid-template-columns:repeat(3,1fr);
            border-top:1px solid rgba(0,0,0,0.07);
            border-left:1px solid rgba(0,0,0,0.07);
            width:100%; max-width:430px;
          }
          .vr-spec {
            padding:15px 18px;
            border-right:1px solid rgba(0,0,0,0.07);
            border-bottom:1px solid rgba(0,0,0,0.07);
            transition:background 0.26s ease;
          }
          .vr-spec:hover { background:rgba(255,255,255,0.5); }
          .vr-spec-label {
            font-family:'Cinzel',serif; font-size:0.38rem;
            letter-spacing:0.44em; text-transform:uppercase; margin-bottom:6px;
          }
          .vr-spec-val {
            font-family:'Cormorant Garamond',serif;
            font-size:0.88rem; font-weight:600; letter-spacing:0.03em;
          }

          /* ─── Badge pill ─── */
          .vr-badge {
            display:inline-flex; align-items:center; gap:8px;
            font-family:'Cinzel',serif; font-size:0.44rem;
            letter-spacing:0.4em; text-transform:uppercase;
            padding:7px 16px; margin-bottom:26px; border-radius:2px;
          }

          /* ─── Eyebrow ─── */
          .vr-eyebrow {
            display:flex; align-items:center; gap:14px;
            margin-bottom:22px; width:100%;
          }

          /* ─── Dot nav ─── */
          .vr-dot {
            height:2px; border-radius:1px; cursor:pointer; flex-shrink:0;
            transition:all 0.42s cubic-bezier(0.16,1,0.3,1);
          }
          .vr-dot.on  { width:34px; }
          .vr-dot.off { width:9px; }

          /* ─── Progress ─── */
          .vr-progress { flex:1; height:1px; border-radius:2px; overflow:hidden; }

          /* ─── Counter ─── */
          .vr-num {
            font-family:'Cinzel',serif; font-size:0.5rem;
            letter-spacing:0.36em; white-space:nowrap;
          }

          /* ─── Side index bar ─── */
          .vr-side-idx {
            position:fixed; right:26px; top:50%; transform:translateY(-50%);
            display:flex; flex-direction:column; align-items:center; gap:10px;
            z-index:10; pointer-events:none;
          }

          /* ─── Vertical name ticker ─── */
          .vr-ticker {
            writing-mode:vertical-rl; text-orientation:mixed;
            font-family:'Cinzel',serif; font-size:0.38rem;
            letter-spacing:0.5em; text-transform:uppercase;
            opacity:0.22; user-select:none;
            position:absolute; right:-30px; top:50%;
            transform:translateY(-50%) rotate(180deg);
          }

          /* ─── Scent pill ─── */
          .vr-scent-pill {
            padding:10px 22px; border-radius:3px; text-align:center;
            transition:box-shadow 0.3s ease;
          }
          .vr-scent-pill:hover { }

          /* ─── Scroll hint ─── */
          .vr-scroll {
            position:absolute; bottom:30px; left:50%; transform:translateX(-50%);
            cursor:pointer; z-index:5;
            display:flex; flex-direction:column; align-items:center; gap:8px;
          }
          .vr-scroll-label {
            font-family:'Cinzel',serif; font-size:0.36rem;
            letter-spacing:0.46em; text-transform:uppercase;
            opacity:0.35;
          }
          .vr-scroll-wrap { width:24px; height:42px; border-radius:12px; position:relative; }
          .vr-scroll-pip {
            width:4px; height:4px; border-radius:50%;
            position:absolute; left:50%; top:7px; transform:translateX(-50%);
            animation:vpip 2.4s infinite ease;
          }
          @keyframes vpip {
            0%   { top:7px;  opacity:1; }
            75%  { top:24px; opacity:0; }
            100% { top:7px;  opacity:0; }
          }

          /* ════ TABLET ════ */
          @media (max-width:1024px) {
            .vr-outer { padding:92px 36px 44px; gap:0 28px; }
            .vr-stage { width:280px; height:460px; }
            .vr-side-idx { display:none; }
            .vr-ticker { display:none; }
          }

          /* ════ MOBILE ════ */
          @media (max-width:768px) {
            .vr-outer {
              grid-template-columns:1fr;
              grid-template-rows:auto auto auto;
              padding:84px 22px 44px;
              gap:0; align-items:start;
              overflow:visible;
            }
            .vr-right      { grid-column:1; grid-row:1; padding-top:8px; }
            .vr-left       { grid-column:1; grid-row:2; align-items:center; text-align:center; padding:0; padding-top:22px; }
            .vr-bottom-bar { grid-column:1; grid-row:3; justify-content:center; }
            .vr-stage { width:190px; height:330px; }
            .vr-nav-pair { margin-top:16px; }
            .vr-nav { width:44px; height:44px; }
            .vr-h1 { font-size:clamp(3rem,12vw,4.4rem); }
            .vr-tagline { font-size:clamp(0.88rem,3.4vw,1.1rem); }
            .vr-desc { font-size:0.82rem; max-width:100%; }
            .vr-cta-row { justify-content:center; }
            .vr-side-idx { display:none; }
            .vr-ticker { display:none; }
            .vr-eyebrow { justify-content:center; }
            .vr-divider { justify-content:center; }
            .vr-specs { margin:0 auto; }
          }

          /* ════ SMALL MOBILE ════ */
          @media (max-width:480px) {
            .vr-outer { padding:72px 16px 34px; }
            .vr-stage { width:158px; height:278px; }
            .vr-h1 { font-size:clamp(2.6rem,13vw,3.6rem); }
            .vr-cta-primary { font-size:0.54rem; padding:14px 34px; }
            .vr-cta-ghost { display:none; }
            .vr-nav { width:40px; height:40px; }
          }

          /* ════ TINY ════ */
          @media (max-width:360px) {
            .vr-outer { padding:66px 14px 28px; }
            .vr-stage { width:138px; height:248px; }
            .vr-h1 { font-size:2.3rem; }
            .vr-desc { display:none; }
            .vr-specs { grid-template-columns:1fr 1fr; }
            .vr-spec:last-child { display:none; }
          }
        `}</style>

        {/* ══════════════ LEFT — TEXT ══════════════ */}
        <div className="vr-left">

          {/* ── Animated badge ── */}
          <AnimatePresence mode="wait">
            <motion.div key={`badge-${current}`}
              initial={{opacity:0,y:-10,scale:0.94}}
              animate={{opacity:1,y:0,scale:1}}
              exit={{opacity:0,y:8,scale:0.94}}
              transition={{duration:0.48}}
              className="vr-badge"
              style={{
                background:`${slide.accent}14`,
                border:`1px solid ${slide.accent}44`,
                color:slide.accent,
              }}>
              <motion.span
                style={{width:5,height:5,borderRadius:"50%",background:slide.accent,
                  display:"inline-block",flexShrink:0}}
                animate={{opacity:[1,0.2,1],scale:[1,0.6,1]}}
                transition={{duration:2.0,repeat:Infinity}}/>
              {slide.badge}
            </motion.div>
          </AnimatePresence>

          {/* ── Eyebrow with expanding line ── */}
          <AnimatePresence mode="wait">
            <motion.div key={`ey-${current}`}
              initial={{opacity:0,x:-18}} animate={{opacity:1,x:0}} exit={{opacity:0}}
              transition={{duration:0.5,delay:0.05}}
              className="vr-eyebrow">
              <motion.div
                style={{width:36,height:1.5,
                  background:`linear-gradient(to right,${slide.accent},${slide.accent}00)`,
                  flexShrink:0,originX:0}}
                initial={{scaleX:0}} animate={{scaleX:1}}
                transition={{duration:0.62,delay:0.1}}/>
              <span style={{
                fontFamily:"'Cinzel',serif",fontSize:"0.48rem",
                letterSpacing:"0.48em",color:slide.accent,
                textTransform:"uppercase",opacity:0.85,whiteSpace:"nowrap",
              }}>
                Maison Verra · {slide.origin}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* ── Heading — character-by-character stagger ── */}
          <AnimatePresence mode="wait" custom={dir}>
            <motion.h1 key={`h-${current}`} className="vr-h1"
              custom={dir} variants={txtVar} initial="enter" animate="center" exit="exit">
              {slide.heading.split("").map((ch,i)=>(
                <motion.span key={i}
                  initial={{opacity:0,y:28,rotateX:"-35deg"}}
                  animate={{opacity:1,y:0,rotateX:"0deg"}}
                  transition={{delay:i*0.032,duration:0.52,ease:[0.16,1,0.3,1]}}
                  style={{display:"inline-block",transformOrigin:"bottom"}}>
                  {ch===" "?"\u00A0":ch}
                </motion.span>
              ))}
            </motion.h1>
          </AnimatePresence>

          {/* ── Tagline ── */}
          <AnimatePresence mode="wait">
            <motion.p key={`tag-${current}`} className="vr-tagline"
              variants={txtVar} initial="enter" animate="center" exit="exit">
              {slide.tagline}
            </motion.p>
          </AnimatePresence>

          {/* ── Ornamental divider ── */}
          <div className="vr-divider">
            <motion.div className="vr-divider-line"
              style={{background:`linear-gradient(to right,${slide.accent}55,${slide.accent}00)`}}
              initial={{scaleX:0,originX:0}} animate={{scaleX:1}}
              transition={{duration:0.82,delay:0.3}}/>
            <motion.div className="vr-divider-gem"
              style={{background:slide.accent,opacity:0.7}}
              animate={{rotate:[45,135,45],opacity:[0.5,1,0.5]}}
              transition={{duration:5,repeat:Infinity}}/>
            <motion.div className="vr-divider-line"
              style={{background:`linear-gradient(to left,${slide.accent}55,${slide.accent}00)`}}
              initial={{scaleX:0,originX:1}} animate={{scaleX:1}}
              transition={{duration:0.82,delay:0.38}}/>
          </div>

          {/* ── Description ── */}
          <AnimatePresence mode="wait">
            <motion.p key={`desc-${current}`} className="vr-desc"
              initial={{opacity:0,y:16,filter:"blur(4px)"}}
              animate={{opacity:1,y:0,filter:"blur(0px)"}}
              exit={{opacity:0,filter:"blur(3px)"}}
              transition={{duration:0.68,delay:0.08}}>
              {slide.sub}
            </motion.p>
          </AnimatePresence>

          {/* ── CTA row ── */}
          <div className="vr-cta-row">
            <motion.button className="vr-cta-primary"
              style={{
                background:`linear-gradient(128deg,${slide.cap} 0%,${slide.accent} 48%,${slide.liquid} 100%)`,
                color:"#17080a",
                boxShadow:`0 12px 44px ${slide.accent}40,inset 0 1px 0 rgba(255,255,255,0.24)`,
              }}
              onClick={scrollDown} whileTap={{scale:0.97}}>
              <span>{slide.cta}</span>
            </motion.button>

            <motion.button className="vr-cta-ghost"
              style={{
                color:slide.accent,
                border:`1px solid ${slide.accent}42`,
              }}
              onMouseEnter={e=>{
                e.currentTarget.style.borderColor=slide.accent;
                e.currentTarget.style.boxShadow=`0 0 28px ${slide.accent}1e`;
              }}
              onMouseLeave={e=>{
                e.currentTarget.style.borderColor=`${slide.accent}42`;
                e.currentTarget.style.boxShadow="none";
              }}
              whileTap={{scale:0.97}}>
              View Collection
            </motion.button>
          </div>

          {/* ── Specs ── */}
          <motion.div className="vr-specs"
            initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}
            transition={{duration:0.65,delay:0.22}}>
            {[
              {label:"Fragrance Family", val:slide.family},
              {label:"Origin",           val:slide.origin},
              {label:"Year",             val:slide.year},
            ].map((s,i)=>(
              <div key={i} className="vr-spec">
                <div className="vr-spec-label" style={{color:`${slide.accent}70`}}>{s.label}</div>
                <div className="vr-spec-val"   style={{color:`${slide.accent}cc`}}>{s.val}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ══════════════ RIGHT — BOTTLE ══════════════ */}
        <div className="vr-right">
          <div ref={stageRef} className="vr-stage"
            onMouseMove={handleMouseMove}
            onMouseLeave={()=>{ handleMouseLeave(); setHovered(false); }}
            onMouseEnter={()=>setHovered(true)}>

            {/* Vertical name ticker */}
            <AnimatePresence mode="wait">
              <motion.div key={`tick-${current}`}
                initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                transition={{duration:0.5}}
                className="vr-ticker"
                style={{color:slide.accent}}>
                {slide.name}
              </motion.div>
            </AnimatePresence>

            {/* Orbit rings */}
            <motion.div animate={{rotate:360}} transition={{duration:30,repeat:Infinity,ease:"linear"}}
              style={{position:"absolute",inset:"-10%",borderRadius:"50%",
                border:`1px dashed ${slide.accent}1e`,pointerEvents:"none"}}/>
            <motion.div animate={{rotate:-360}} transition={{duration:48,repeat:Infinity,ease:"linear"}}
              style={{position:"absolute",inset:"-24%",borderRadius:"50%",
                border:`1px solid ${slide.accent}10`,pointerEvents:"none"}}/>
            <motion.div animate={{rotate:360}} transition={{duration:70,repeat:Infinity,ease:"linear"}}
              style={{position:"absolute",inset:"-40%",borderRadius:"50%",
                border:`1px dashed ${slide.accent}08`,pointerEvents:"none"}}/>

            {/* Pulsing ambient glow */}
            <motion.div
              animate={{scale:[1,1.18,1],opacity:[0.18,0.46,0.18]}}
              transition={{duration:6,repeat:Infinity,ease:"easeInOut"}}
              style={{
                position:"absolute",inset:"4%",borderRadius:"50%",
                background:`radial-gradient(circle,${slide.accent}26 0%,transparent 70%)`,
                filter:"blur(12px)",pointerEvents:"none",
              }}/>

            {/* Bottle */}
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div key={`btl-${current}`} custom={dir}
                variants={btlVar} initial="enter" animate="center" exit="exit"
                style={{width:"100%",height:"100%",position:"absolute",inset:0}}>
                <motion.div
                  animate={{y:[0,-13,0],rotateZ:[0,0.4,0]}}
                  transition={{duration:7,repeat:Infinity,ease:"easeInOut"}}
                  style={{width:"100%",height:"100%"}}>
                  <BottleComp slide={slide} mouseX={smoothX} mouseY={smoothY}/>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Ground shadow */}
            <motion.div
              animate={{scaleX:[1,1.1,1],opacity:[0.15,0.28,0.15]}}
              transition={{duration:7,repeat:Infinity,ease:"easeInOut"}}
              style={{
                position:"absolute",bottom:"-3%",left:"50%",transform:"translateX(-50%)",
                width:"52%",height:"16px",borderRadius:"50%",
                background:`radial-gradient(ellipse,${slide.accent}45 0%,transparent 72%)`,
                filter:"blur(10px)",pointerEvents:"none",
              }}/>
          </div>

          {/* ── Nav + scent pill row ── */}
          <div className="vr-nav-pair"
            onMouseEnter={()=>setHovered(true)}
            onMouseLeave={()=>setHovered(false)}>

            <motion.button className="vr-nav"
              style={{
                background:"rgba(255,255,255,0.65)",
                backdropFilter:"blur(18px)",
                border:`1px solid ${slide.accent}44`,
                color:slide.accent,
                boxShadow:`0 4px 22px ${slide.accent}1e,inset 0 1px 0 rgba(255,255,255,0.4)`,
              }}
              onClick={prev} aria-label="Previous"
              whileHover={{
                boxShadow:`0 8px 38px ${slide.accent}38,inset 0 1px 0 rgba(255,255,255,0.4)`,
                borderColor:`${slide.accent}88`,
              }}
              whileTap={{scale:0.92}}>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M13 4L7 10L13 16" stroke="currentColor" strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>

            {/* Scent profile pill */}
            <motion.div className="vr-scent-pill"
              style={{
                background:"rgba(255,255,255,0.65)",
                backdropFilter:"blur(18px)",
                border:`1px solid ${slide.accent}30`,
                boxShadow:`0 2px 18px ${slide.accent}14,inset 0 1px 0 rgba(255,255,255,0.4)`,
              }}
              whileHover={{boxShadow:`0 4px 32px ${slide.accent}28`}}>
              <div style={{
                fontFamily:"'Cinzel',serif",fontSize:"0.36rem",
                letterSpacing:"0.46em",color:`${slide.accent}70`,
                textTransform:"uppercase",marginBottom:5,
              }}>
                Scent Profile
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={`note-${current}`}
                  initial={{opacity:0,y:5,filter:"blur(3px)"}}
                  animate={{opacity:1,y:0,filter:"blur(0px)"}}
                  exit={{opacity:0,y:-5,filter:"blur(3px)"}}
                  transition={{duration:0.38}}
                  style={{
                    fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",
                    fontSize:"0.85rem",color:`${slide.accent}cc`,
                    letterSpacing:"0.07em",whiteSpace:"nowrap",
                  }}>
                  {slide.note}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <motion.button className="vr-nav"
              style={{
                background:"rgba(255,255,255,0.65)",
                backdropFilter:"blur(18px)",
                border:`1px solid ${slide.accent}44`,
                color:slide.accent,
                boxShadow:`0 4px 22px ${slide.accent}1e,inset 0 1px 0 rgba(255,255,255,0.4)`,
              }}
              onClick={next} aria-label="Next"
              whileHover={{
                boxShadow:`0 8px 38px ${slide.accent}38,inset 0 1px 0 rgba(255,255,255,0.4)`,
                borderColor:`${slide.accent}88`,
              }}
              whileTap={{scale:0.92}}>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          </div>
        </div>

        {/* ══════════════ BOTTOM BAR ══════════════ */}
        <div className="vr-bottom-bar"
          onMouseEnter={()=>setHovered(true)}
          onMouseLeave={()=>setHovered(false)}>

          {/* Pill dots */}
          <div style={{display:"flex",alignItems:"center",gap:7}}>
            {slides.map((_,i)=>(
              <motion.div key={i}
                className={`vr-dot ${i===current?"on":"off"}`}
                style={{background:i===current?slide.accent:`${slide.accent}2e`}}
                onClick={()=>go(i,i>current?1:-1)}
                whileHover={{scaleY:2.2}}/>
            ))}
          </div>

          {/* Progress bar */}
          <div className="vr-progress" style={{background:`${slide.accent}16`}}>
            <motion.div key={current}
              initial={{width:"0%"}} animate={{width:"100%"}}
              transition={{duration:6,ease:"linear"}}
              style={{
                height:"100%",
                background:`linear-gradient(to right,${slide.accent},${slide.cap})`,
                borderRadius:2,
              }}/>
          </div>

          {/* Counter */}
          <span className="vr-num" style={{color:`${slide.accent}70`}}>
            <AnimatePresence mode="wait">
              <motion.span key={current}
                initial={{opacity:0,y:5}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-5}}
                transition={{duration:0.28}}
                style={{display:"inline-block",color:slide.accent,fontWeight:600}}>
                {String(current+1).padStart(2,"0")}
              </motion.span>
            </AnimatePresence>
            <span style={{opacity:0.22,margin:"0 5px"}}>/</span>
            <span style={{opacity:0.3}}>{String(slides.length).padStart(2,"0")}</span>
          </span>
        </div>
      </div>

      {/* ── Side index ── */}
      <div className="vr-side-idx">
        {slides.map((_,i)=>(
          <motion.div key={i} onClick={()=>go(i,i>current?1:-1)}
            style={{
              width:i===current?2.5:1.5,
              height:i===current?34:13,
              background:i===current?slide.accent:`${slide.accent}2e`,
              borderRadius:2,cursor:"pointer",
              transition:"all 0.38s ease",
            }}
            whileHover={{scaleX:2.4,opacity:1}}/>
        ))}
      </div>

      {/* ── Scroll hint ── */}
      <div className="vr-scroll" onClick={scrollDown}>
        <span className="vr-scroll-label" style={{color:slide.accent}}>Discover</span>
        <div className="vr-scroll-wrap" style={{border:`1px solid ${slide.accent}44`}}>
          <div className="vr-scroll-pip" style={{background:slide.accent}}/>
        </div>
      </div>
    </section>
  );
}