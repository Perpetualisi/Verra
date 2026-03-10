import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  motion, AnimatePresence,
  useMotionValue, useTransform, useSpring,
} from "framer-motion";

/* ═══════════════════════════════════════════════════════════════════
   COLLECTION DATA
═══════════════════════════════════════════════════════════════════ */
const SLIDES = [
  {
    id:0, name:"VERRA", heading:"Art in Scent", tagline:"Where gold meets smoke",
    sub:"An opulent fusion of Bergamot and wild Oud, anchored by raw Amber resin from the Arabian desert. Bold. Timeless. Yours.",
    cta:"Shop Now", badge:"Bestseller",
    accent:"#c9a84c", liquid:"#b05c10", cap:"#f0d080", bg1:"#fef9f0", bg2:"#f8e8c0",
    note:"Bergamot · Oud · Amber", family:"Oriental Woody", origin:"New York", year:"2019",
  },
  {
    id:1, name:"PURE SCENT", heading:"Luxury Drops", tagline:"Softness distilled to perfection",
    sub:"Rose absolute from Grasse, warm Musk and Sri Lankan Sandalwood layered into the most intimate fragrance we have ever crafted.",
    cta:"Discover", badge:"New Arrival",
    accent:"#b8896a", liquid:"#7a3b1e", cap:"#e8c4a0", bg1:"#fdf5ee", bg2:"#f0d8c0",
    note:"Rose · Musk · Sandalwood", family:"Floral Woody", origin:"Los Angeles", year:"2021",
  },
  {
    id:2, name:"NEW SCENT", heading:"Your Story", tagline:"Earth. Rain. Renewal.",
    sub:"Vetiver roots pulled from Haitian soil, Virginian Cedar and dewy Fern — a scent that smells like the first breath after a storm.",
    cta:"Explore", badge:"Limited Edition",
    accent:"#5a8a6a", liquid:"#1e3a28", cap:"#a0c8a8", bg1:"#f0f8f2", bg2:"#c8e0cc",
    note:"Vetiver · Cedar · Fern", family:"Aromatic Green", origin:"Portland", year:"2023",
  },
  {
    id:3, name:"BEAUTY", heading:"Nature's Touch", tagline:"Clarity in every note",
    sub:"Florentine Iris and wild Violet bloom over a bed of crystalline Aqua accords — an airy, luminous tribute to effortless elegance.",
    cta:"Buy Now", badge:"Award Winner",
    accent:"#5888b0", liquid:"#0e2848", cap:"#88b8d8", bg1:"#f0f4fc", bg2:"#c0d4e8",
    note:"Iris · Violet · Aqua", family:"Floral Aquatic", origin:"Chicago", year:"2020",
  },
  {
    id:4, name:"BE BOLD", heading:"Speak Scent", tagline:"Unapologetic. Unmistakable.",
    sub:"Jasmine Sambac from India, dark Patchouli aged in oak, and scorching Spice accord — a scent that commands every room it enters.",
    cta:"View All", badge:"Fan Favorite",
    accent:"#a85878", liquid:"#580828", cap:"#e0a0c0", bg1:"#fdf0f4", bg2:"#ecc8d4",
    note:"Jasmine · Patchouli · Spice", family:"Floral Oriental", origin:"Miami", year:"2022",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   SVG BOTTLES
═══════════════════════════════════════════════════════════════════ */

function Bottle1({ slide, mx, my }) {
  const { accent:A, liquid:L, cap:C } = slide;
  const rx = useTransform(my, [-1,1], [7,-7]);
  const ry = useTransform(mx, [-1,1], [-9,9]);
  return (
    <motion.svg viewBox="0 0 200 440" width="100%" height="100%" fill="none"
      style={{rotateX:rx,rotateY:ry,transformStyle:"preserve-3d"}}>
      <defs>
        <linearGradient id="v1g" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#fffaee" stopOpacity=".93"/>
          <stop offset="18%"  stopColor={C}       stopOpacity=".58"/>
          <stop offset="50%"  stopColor={L}       stopOpacity=".35"/>
          <stop offset="82%"  stopColor={C}       stopOpacity=".62"/>
          <stop offset="100%" stopColor="#fffaee" stopOpacity=".90"/>
        </linearGradient>
        <linearGradient id="v1liq" x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%"   stopColor={A} stopOpacity=".52"/>
          <stop offset="100%" stopColor={L} stopOpacity=".78"/>
        </linearGradient>
        <linearGradient id="v1cap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#fffbe8"/>
          <stop offset="35%"  stopColor={C}/>
          <stop offset="100%" stopColor={A}/>
        </linearGradient>
        <linearGradient id="v1gld" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#fffbe8"/>
          <stop offset="28%"  stopColor={C}/>
          <stop offset="58%"  stopColor="#ffe97a"/>
          <stop offset="100%" stopColor={C}/>
        </linearGradient>
        <filter id="v1dr" x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="0" dy="18" stdDeviation="14" floodColor={L} floodOpacity=".22"/>
          <feDropShadow dx="0" dy="4"  stdDeviation="4"  floodColor={A} floodOpacity=".18"/>
        </filter>
      </defs>
      <g filter="url(#v1dr)">
        <polygon points="57,200 42,210 40,348 42,378 100,388 158,378 160,348 158,210 143,200" fill="url(#v1liq)" opacity=".82"/>
        <polygon points="55,165 40,200 38,350 40,380 100,390 160,380 162,350 160,200 145,165" fill="url(#v1g)" stroke={`${C}66`} strokeWidth="1.1"/>
        <polygon points="55,165 75,168 60,200 60,370 40,380 38,350 40,200" fill="rgba(0,0,0,.065)"/>
        <polygon points="75,168 125,168 140,200 140,370 100,382 60,370 60,200" fill="rgba(255,255,255,.07)"/>
        <polygon points="125,168 145,165 162,200 160,350 160,380 140,370 140,200" fill="rgba(255,255,255,.13)"/>
        <line x1="75"  y1="168" x2="60"  y2="380" stroke="rgba(255,255,255,.20)" strokeWidth=".8"/>
        <line x1="125" y1="168" x2="140" y2="380" stroke="rgba(255,255,255,.11)" strokeWidth=".8"/>
        <polygon points="55,165 145,165 140,172 60,172"  fill="url(#v1gld)" opacity=".95"/>
        <polygon points="56,184 144,184 142,190 58,190"  fill="url(#v1gld)" opacity=".55"/>
        <polygon points="41,370 159,370 161,378 39,378"  fill="url(#v1gld)" opacity=".80"/>
        <rect x="62" y="208" width="76" height="132" rx="2" fill="rgba(255,248,225,.20)" stroke={`${C}55`} strokeWidth=".8"/>
        <rect x="66" y="212" width="68" height="124" rx="1.5" fill="none" stroke={`${C}28`} strokeWidth=".5"/>
        <polygon points="100,224 107,232 100,240 93,232" fill="none" stroke={`${C}80`} strokeWidth=".9"/>
        <polygon points="100,227 105,232 100,237 95,232" fill={`${C}38`}/>
        <text x="100" y="260" textAnchor="middle" fill={`${C}e0`} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"13px",fontWeight:700,letterSpacing:"5.5px"}}>VERRA</text>
        <line x1="68" y1="266" x2="132" y2="266" stroke={`${C}44`} strokeWidth=".7"/>
        <text x="100" y="280" textAnchor="middle" fill={`${C}80`} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"5.5px",letterSpacing:"3.5px"}}>EAU DE PARFUM</text>
        <text x="100" y="312" textAnchor="middle" fill={`${C}58`} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"5px",letterSpacing:"2.5px"}}>NEW YORK · USA</text>
        <text x="100" y="326" textAnchor="middle" fill={`${C}44`} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"5px",letterSpacing:"2px"}}>50 ML</text>
        <polygon points="76,120 124,120 130,128 130,166 70,166 70,128" fill="url(#v1cap)" stroke={`${C}50`} strokeWidth=".9"/>
        <polygon points="78,122 78,164 70,164 70,130" fill="rgba(255,255,255,.24)"/>
        <rect x="70" y="160" width="60" height="5"   fill="url(#v1gld)"/>
        <rect x="70" y="120" width="60" height="4"   fill="url(#v1gld)"/>
        <polygon points="70,65 130,65 136,72 136,122 64,122 64,72" fill="url(#v1cap)" stroke={`${C}68`} strokeWidth="1.1"/>
        <polygon points="70,65 130,65 128,72 72,72"   fill="rgba(255,255,255,.38)"/>
        <polygon points="64,72 70,65 70,120 64,120"   fill="rgba(255,255,255,.24)"/>
        <rect x="64" y="82"  width="72" height="2.5" fill="url(#v1gld)"/>
        <rect x="64" y="112" width="72" height="2.5" fill="url(#v1gld)"/>
        <polygon points="100,76 106,84 100,92 94,84" fill="none" stroke={`${C}95`} strokeWidth=".9"/>
        <text x="100" y="108" textAnchor="middle" fill={`${C}d8`} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"7px",letterSpacing:"3px"}}>V E R R A</text>
        <rect x="64" y="61" width="72" height="7" rx="1.5" fill="url(#v1gld)" opacity=".97"/>
        <rect x="68" y="62" width="64" height="3"  rx="1"  fill="rgba(255,255,255,.40)"/>
      </g>
      <motion.rect x="66" y="198" width="4.5" height="125" rx="2.5" fill="rgba(255,255,255,.38)"
        animate={{opacity:[.22,.62,.22],y:[0,12,0]}} transition={{duration:4.8,repeat:Infinity,ease:"easeInOut"}}/>
      <motion.circle cx="148" cy="210" r="2.5" fill="rgba(255,255,255,.50)"
        animate={{opacity:[0,.8,0],cx:[148,153,148]}} transition={{duration:3.2,repeat:Infinity,ease:"easeInOut",delay:1}}/>
    </motion.svg>
  );
}

function Bottle2({ slide, mx, my }) {
  const { accent:A, liquid:L, cap:C } = slide;
  const rx = useTransform(my, [-1,1], [7,-7]);
  const ry = useTransform(mx, [-1,1], [-9,9]);
  return (
    <motion.svg viewBox="0 0 200 440" width="100%" height="100%" fill="none"
      style={{rotateX:rx,rotateY:ry,transformStyle:"preserve-3d"}}>
      <defs>
        <radialGradient id="v2g" cx="34%" cy="32%" r="72%">
          <stop offset="0%"   stopColor="#fff8f0" stopOpacity=".96"/>
          <stop offset="28%"  stopColor={C}       stopOpacity=".62"/>
          <stop offset="62%"  stopColor={L}       stopOpacity=".38"/>
          <stop offset="100%" stopColor={A}       stopOpacity=".72"/>
        </radialGradient>
        <radialGradient id="v2liq" cx="38%" cy="38%" r="68%">
          <stop offset="0%"   stopColor={C} stopOpacity=".58"/>
          <stop offset="100%" stopColor={L} stopOpacity=".82"/>
        </radialGradient>
        <linearGradient id="v2cap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#fffbe8"/>
          <stop offset="48%"  stopColor={C}/>
          <stop offset="100%" stopColor={A}/>
        </linearGradient>
        <linearGradient id="v2gld" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor={C}/>
          <stop offset="38%"  stopColor={A}/>
          <stop offset="68%"  stopColor="#ffe48a"/>
          <stop offset="100%" stopColor={C}/>
        </linearGradient>
        <filter id="v2dr" x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="0" dy="20" stdDeviation="16" floodColor={L} floodOpacity=".20"/>
        </filter>
      </defs>
      <g filter="url(#v2dr)">
        <ellipse cx="100" cy="318" rx="63" ry="80"  fill="url(#v2liq)" opacity=".78"/>
        <ellipse cx="100" cy="308" rx="70" ry="86"  fill="url(#v2g)"   stroke={`${C}60`} strokeWidth="1.3"/>
        <ellipse cx="75"  cy="268" rx="19" ry="28"  fill="rgba(255,255,255,.34)"/>
        <ellipse cx="70"  cy="260" rx="7"  ry="11"  fill="rgba(255,255,255,.58)"/>
        <ellipse cx="156" cy="318" rx="15" ry="42"  fill="rgba(255,255,255,.15)"/>
        <path d="M31 308 Q100 322 169 308" stroke="url(#v2gld)" strokeWidth="2.8" fill="none" opacity=".92"/>
        <path d="M31 308 Q100 294 169 308" stroke={`${C}58`} strokeWidth="1.1" fill="none"/>
        <ellipse cx="100" cy="300" rx="52" ry="64" fill="rgba(255,248,230,.13)" stroke={`${C}48`} strokeWidth=".9"/>
        {[0,60,120,180,240,300].map((deg,i)=>(
          <ellipse key={i} cx={100+11*Math.cos(deg*Math.PI/180)} cy={250+9*Math.sin(deg*Math.PI/180)}
            rx="4.5" ry="2.8" fill={`${C}55`}
            transform={`rotate(${deg},${100+11*Math.cos(deg*Math.PI/180)},${250+9*Math.sin(deg*Math.PI/180)})`}/>
        ))}
        <circle cx="100" cy="250" r="3.5" fill={`${C}88`}/>
        <text x="100" y="276" textAnchor="middle" fill={`${C}e2`} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"11.5px",fontWeight:700,letterSpacing:"4.5px"}}>PURE</text>
        <text x="100" y="291" textAnchor="middle" fill={`${C}b8`} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"11.5px",fontWeight:700,letterSpacing:"4.5px"}}>SCENT</text>
        <line x1="64" y1="297" x2="136" y2="297" stroke={`${C}48`} strokeWidth=".7"/>
        <text x="100" y="310" textAnchor="middle" fill={`${C}78`} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"5.5px",letterSpacing:"3px"}}>EAU DE PARFUM</text>
        <text x="100" y="325" textAnchor="middle" fill={`${C}55`} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"5px",letterSpacing:"2px"}}>LOS ANGELES · 75 ML</text>
        <ellipse cx="100" cy="393" rx="42" ry="9"  fill="url(#v2gld)" opacity=".72"/>
        <ellipse cx="100" cy="391" rx="37" ry="5.5" fill="rgba(255,248,230,.28)"/>
        <rect x="84" y="156" width="32" height="52" rx="9" fill="url(#v2cap)" stroke={`${C}55`} strokeWidth="1"/>
        <rect x="84" y="156" width="10" height="52" rx="5" fill="rgba(255,255,255,.22)"/>
        <rect x="82" y="200" width="36" height="5.5" rx="2" fill="url(#v2gld)"/>
        <rect x="82" y="156" width="36" height="4.5" rx="2" fill="url(#v2gld)"/>
        <path d="M78 154 Q78 88 100 83 Q122 88 122 154 Z" fill="url(#v2cap)" stroke={`${C}70`} strokeWidth="1.1"/>
        <ellipse cx="100" cy="154" rx="22" ry="4.5" fill="url(#v2gld)" opacity=".94"/>
        <text x="100" y="130" textAnchor="middle" fill={`${C}d5`} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"17px",fontWeight:700,fontStyle:"italic"}}>P</text>
        <circle cx="100" cy="83" r="7"   fill={A} opacity=".88"/>
        <circle cx="100" cy="83" r="4.5" fill="rgba(255,255,255,.60)"/>
        <circle cx="100" cy="83" r="2"   fill="#fff" opacity=".9"/>
      </g>
      <motion.ellipse cx="72" cy="270" rx="3.5" ry="15" fill="rgba(255,255,255,.42)"
        animate={{opacity:[.28,.72,.28],cy:[263,282,263]}} transition={{duration:5.2,repeat:Infinity,ease:"easeInOut"}}/>
    </motion.svg>
  );
}

function Bottle3({ slide, mx, my }) {
  const { accent:A, liquid:L, cap:C } = slide;
  const rx = useTransform(my, [-1,1], [7,-7]);
  const ry = useTransform(mx, [-1,1], [-9,9]);
  return (
    <motion.svg viewBox="0 0 220 440" width="100%" height="100%" fill="none"
      style={{rotateX:rx,rotateY:ry,transformStyle:"preserve-3d"}}>
      <defs>
        <linearGradient id="v3g" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#f0fff4" stopOpacity=".92"/>
          <stop offset="14%"  stopColor={C}       stopOpacity=".52"/>
          <stop offset="50%"  stopColor={L}       stopOpacity=".34"/>
          <stop offset="86%"  stopColor={C}       stopOpacity=".58"/>
          <stop offset="100%" stopColor="#f0fff4" stopOpacity=".88"/>
        </linearGradient>
        <linearGradient id="v3liq" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor={C} stopOpacity=".48"/>
          <stop offset="100%" stopColor={L} stopOpacity=".72"/>
        </linearGradient>
        <linearGradient id="v3cap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#e8f5e9"/>
          <stop offset="52%"  stopColor={A}/>
          <stop offset="100%" stopColor="#122a1c"/>
        </linearGradient>
        <linearGradient id="v3gld" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor={C}/>
          <stop offset="50%"  stopColor={A}/>
          <stop offset="100%" stopColor={C}/>
        </linearGradient>
        <filter id="v3dr" x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="0" dy="18" stdDeviation="14" floodColor={L} floodOpacity=".20"/>
        </filter>
      </defs>
      <g filter="url(#v3dr)">
        <rect x="42"  y="200" width="136" height="190" rx="3" fill="url(#v3liq)" opacity=".78"/>
        <rect x="38"  y="176" width="144" height="214" rx="5" fill="url(#v3g)"   stroke={`${C}55`} strokeWidth="1.2"/>
        <rect x="38"  y="176" width="18"  height="214" rx="5" fill="rgba(255,255,255,.20)"/>
        <rect x="164" y="176" width="18"  height="214" rx="5" fill="rgba(255,255,255,.13)"/>
        <rect x="38"  y="382" width="144" height="8"   rx="2.5" fill="url(#v3gld)" opacity=".82"/>
        <rect x="38"  y="176" width="144" height="5.5" rx="2"   fill="url(#v3gld)" opacity=".88"/>
        <rect x="50"  y="200" width="120" height="152" rx="3.5" fill="rgba(240,255,244,.14)" stroke={`${A}44`} strokeWidth=".8"/>
        <text x="110" y="270" textAnchor="middle" fill={`${A}e0`} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"9px",fontWeight:300,letterSpacing:"7.5px"}}>NEW SCENT</text>
        <line x1="56" y1="275" x2="164" y2="275" stroke={`${A}38`} strokeWidth=".7"/>
        <text x="110" y="288" textAnchor="middle" fill={`${A}82`} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"5.5px",letterSpacing:"3.5px"}}>EAU DE PARFUM INTENSE</text>
        <text x="110" y="303" textAnchor="middle" fill={`${A}62`} style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:"6.5px",letterSpacing:"2px"}}>Vetiver · Cedar · Fern</text>
        <text x="110" y="326" textAnchor="middle" fill={`${A}48`} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"5px",letterSpacing:"3px"}}>MAISON VERRA · PORTLAND · 30 ML</text>
        <rect x="96"  y="138" width="28" height="17" rx="3.5" fill="url(#v3cap)" stroke={`${A}55`} strokeWidth=".9"/>
        <rect x="124" y="141" width="28" height="9"  rx="4.5" fill="url(#v3cap)"/>
        <circle cx="152" cy="145.5" r="3.5" fill="rgba(255,255,255,.58)"/>
        <rect x="88"  y="98"  width="44" height="44" rx="2.5" fill="url(#v3cap)" stroke={`${A}50`} strokeWidth=".9"/>
        <rect x="86"  y="136" width="48" height="4.5" fill="url(#v3gld)"/>
        <rect x="86"  y="98"  width="48" height="4.5" fill="url(#v3gld)"/>
        <rect x="80"  y="46"  width="60" height="56" rx="2.5" fill="url(#v3cap)" stroke={`${A}65`} strokeWidth="1.1"/>
        <rect x="80"  y="55"  width="60" height="2.8" fill="url(#v3gld)"/>
        <rect x="80"  y="92"  width="60" height="2.8" fill="url(#v3gld)"/>
        <rect x="80"  y="42"  width="60" height="7"   rx="1.5" fill="url(#v3gld)" opacity=".97"/>
      </g>
      <motion.rect x="40" y="193" width="5.5" height="105" rx="2.5" fill="rgba(255,255,255,.30)"
        animate={{opacity:[.18,.52,.18],y:[0,9,0]}} transition={{duration:5.2,repeat:Infinity,ease:"easeInOut"}}/>
    </motion.svg>
  );
}

function Bottle4({ slide, mx, my }) {
  const { accent:A, liquid:L, cap:C } = slide;
  const rx = useTransform(my, [-1,1], [7,-7]);
  const ry = useTransform(mx, [-1,1], [-9,9]);
  return (
    <motion.svg viewBox="0 0 200 460" width="100%" height="100%" fill="none"
      style={{rotateX:rx,rotateY:ry,transformStyle:"preserve-3d"}}>
      <defs>
        <linearGradient id="v4g" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#f0f6ff" stopOpacity=".93"/>
          <stop offset="20%"  stopColor={C}       stopOpacity=".56"/>
          <stop offset="54%"  stopColor={L}       stopOpacity=".34"/>
          <stop offset="80%"  stopColor={C}       stopOpacity=".62"/>
          <stop offset="100%" stopColor="#f0f6ff" stopOpacity=".90"/>
        </linearGradient>
        <linearGradient id="v4liq" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor={C} stopOpacity=".48"/>
          <stop offset="100%" stopColor={L} stopOpacity=".75"/>
        </linearGradient>
        <linearGradient id="v4cap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#e8f2ff"/>
          <stop offset="52%"  stopColor={A}/>
          <stop offset="100%" stopColor="#071c38"/>
        </linearGradient>
        <linearGradient id="v4gld" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor={C}/>
          <stop offset="40%"  stopColor={A}/>
          <stop offset="72%"  stopColor="#c4e2f8"/>
          <stop offset="100%" stopColor={C}/>
        </linearGradient>
        <filter id="v4dr" x="-25%" y="-10%" width="150%" height="130%">
          <feDropShadow dx="0" dy="22" stdDeviation="16" floodColor={L} floodOpacity=".20"/>
        </filter>
      </defs>
      <g filter="url(#v4dr)">
        <path d="M60 183 Q47 210 45 262 Q43 322 48 362 Q52 398 100 405 Q148 398 152 362 Q157 322 155 262 Q153 210 140 183 Z" fill="url(#v4liq)" opacity=".78"/>
        <path d="M68 162 Q46 194 43 252 Q39 318 45 360 Q49 398 100 406 Q151 398 155 360 Q161 318 157 252 Q154 194 132 162 Z" fill="url(#v4g)" stroke={`${C}58`} strokeWidth="1.2"/>
        <path d="M43 252 Q28 258 26 273 Q24 288 43 294" fill="none" stroke={`${A}78`} strokeWidth="4" strokeLinecap="round"/>
        <path d="M157 252 Q172 258 174 273 Q176 288 157 294" fill="none" stroke={`${A}78`} strokeWidth="4" strokeLinecap="round"/>
        <path d="M43 252 Q28 258 26 273 Q24 288 43 294" fill="none" stroke={`${C}55`} strokeWidth="2" strokeLinecap="round"/>
        <path d="M157 252 Q172 258 174 273 Q176 288 157 294" fill="none" stroke={`${C}55`} strokeWidth="2" strokeLinecap="round"/>
        <path d="M61 165 Q100 174 139 165" stroke="url(#v4gld)" strokeWidth="3.2" fill="none" opacity=".92"/>
        <path d="M43 297 Q100 308 157 297" stroke="url(#v4gld)" strokeWidth="2.2" fill="none" opacity=".72"/>
        <path d="M45 358 Q100 369 155 358" stroke="url(#v4gld)" strokeWidth="2.8" fill="none" opacity=".78"/>
        <text x="100" y="272" textAnchor="middle" fill={`${A}e2`} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"12.5px",fontWeight:600,letterSpacing:"5px"}}>BEAUTY</text>
        <line x1="61" y1="278" x2="139" y2="278" stroke={`${A}42`} strokeWidth=".7"/>
        <text x="100" y="291" textAnchor="middle" fill={`${A}82`} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"5.5px",letterSpacing:"3px"}}>EAU DE PARFUM</text>
        <text x="100" y="305" textAnchor="middle" fill={`${A}62`} style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:"6px",letterSpacing:"2px"}}>Iris · Violet · Aqua</text>
        <text x="100" y="320" textAnchor="middle" fill={`${A}44`} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"5px",letterSpacing:"2px"}}>CHICAGO · 100 ML</text>
        <ellipse cx="100" cy="404" rx="56" ry="9" fill="url(#v4gld)" opacity=".68"/>
        <path d="M84 123 Q80 128 80 144 L80 168 Q84 173 100 174 Q116 173 120 168 L120 144 Q120 128 116 123 Z" fill="url(#v4cap)" stroke={`${A}48`} strokeWidth="1"/>
        <ellipse cx="100" cy="170" rx="20" ry="4.5" fill="url(#v4gld)" opacity=".94"/>
        <path d="M86 68 Q84 74 84 124 L116 124 Q116 74 114 68 Z" fill="url(#v4cap)" stroke={`${A}65`} strokeWidth="1.1"/>
        <ellipse cx="100" cy="124" rx="16" ry="4"   fill="url(#v4gld)" opacity=".97"/>
        <ellipse cx="100" cy="68"  rx="15" ry="5.5" fill="url(#v4gld)" opacity=".97"/>
        <circle cx="100" cy="62" r="7"   fill={A} opacity=".88"/>
        <circle cx="100" cy="62" r="4.5" fill="rgba(255,255,255,.62)"/>
        <circle cx="100" cy="62" r="2"   fill="#fff" opacity=".90"/>
      </g>
      <motion.path d="M49 202 Q52 262 49 322" stroke="rgba(255,255,255,.38)" strokeWidth="4.5" strokeLinecap="round"
        animate={{opacity:[.18,.56,.18]}} transition={{duration:5.8,repeat:Infinity,ease:"easeInOut"}}/>
    </motion.svg>
  );
}

function Bottle5({ slide, mx, my }) {
  const { accent:A, liquid:L, cap:C } = slide;
  const rx = useTransform(my, [-1,1], [7,-7]);
  const ry = useTransform(mx, [-1,1], [-9,9]);
  return (
    <motion.svg viewBox="0 0 210 452" width="100%" height="100%" fill="none"
      style={{rotateX:rx,rotateY:ry,transformStyle:"preserve-3d"}}>
      <defs>
        <linearGradient id="v5g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#fff0f5" stopOpacity=".94"/>
          <stop offset="24%"  stopColor={C}       stopOpacity=".56"/>
          <stop offset="55%"  stopColor={L}       stopOpacity=".38"/>
          <stop offset="80%"  stopColor={C}       stopOpacity=".67"/>
          <stop offset="100%" stopColor="#fff0f5" stopOpacity=".92"/>
        </linearGradient>
        <linearGradient id="v5liq" x1="18%" y1="0%" x2="82%" y2="100%">
          <stop offset="0%"   stopColor={C} stopOpacity=".52"/>
          <stop offset="100%" stopColor={L} stopOpacity=".82"/>
        </linearGradient>
        <linearGradient id="v5cap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#ffd8ec"/>
          <stop offset="46%"  stopColor={A}/>
          <stop offset="100%" stopColor="#380818"/>
        </linearGradient>
        <linearGradient id="v5gld" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor={C}/>
          <stop offset="34%"  stopColor={A}/>
          <stop offset="66%"  stopColor="#ffb8d2"/>
          <stop offset="100%" stopColor={C}/>
        </linearGradient>
        <filter id="v5dr" x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="0" dy="20" stdDeviation="16" floodColor={L} floodOpacity=".22"/>
        </filter>
      </defs>
      <g filter="url(#v5dr)">
        <polygon points="65,185 50,215 45,290 50,360 70,392 105,400 140,392 160,360 165,290 160,215 145,185" fill="url(#v5liq)" opacity=".74"/>
        <polygon points="65,180 50,212 45,288 50,358 70,390 105,398 140,390 160,358 165,288 160,212 145,180" fill="url(#v5g)" stroke={`${C}58`} strokeWidth="1.2"/>
        <polygon points="65,180 86,180 70,212 50,212"   fill="rgba(255,255,255,.24)"/>
        <polygon points="86,180 124,180 160,212 140,212" fill="rgba(255,255,255,.08)"/>
        <polygon points="50,212 70,212 65,288 45,288"   fill="rgba(0,0,0,.065)"/>
        <polygon points="140,212 160,212 165,288 145,288" fill="rgba(255,255,255,.15)"/>
        <polygon points="70,212 140,212 145,288 135,360 105,392 75,360 65,288" fill="rgba(255,255,255,.06)"/>
        <polygon points="65,180 124,180 122,186 67,186"  fill="url(#v5gld)" opacity=".92"/>
        <line x1="50"  y1="212" x2="160" y2="212" stroke="url(#v5gld)" strokeWidth="1.6" opacity=".72"/>
        <line x1="50"  y1="358" x2="160" y2="358" stroke="url(#v5gld)" strokeWidth="2.2" opacity=".78"/>
        <text x="105" y="275" textAnchor="middle" fill={`${A}e0`} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"12.5px",fontWeight:700,letterSpacing:"4.5px"}}>BE BOLD</text>
        <line x1="72" y1="281" x2="138" y2="281" stroke={`${A}48`} strokeWidth=".7"/>
        <text x="105" y="294" textAnchor="middle" fill={`${A}82`} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"5.5px",letterSpacing:"3px"}}>EAU DE PARFUM</text>
        <text x="105" y="309" textAnchor="middle" fill={`${A}62`} style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:"6.2px",letterSpacing:"1.8px"}}>Jasmine · Patchouli · Spice</text>
        <text x="105" y="324" textAnchor="middle" fill={`${A}44`} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"5px",letterSpacing:"2px"}}>MIAMI · 60 ML</text>
        <polygon points="82,140 128,140 133,148 133,183 77,183 77,148" fill="url(#v5cap)" stroke={`${A}52`} strokeWidth=".9"/>
        <polygon points="82,140 128,140 126,146 84,146" fill="url(#v5gld)" opacity=".88"/>
        <line x1="77" y1="176" x2="133" y2="176" stroke="url(#v5gld)" strokeWidth="2.8"/>
        <polygon points="77,140 133,140 137,90 73,90"  fill="url(#v5cap)" stroke={`${A}65`} strokeWidth="1.1"/>
        <polygon points="77,140 105,119 73,90"          fill="rgba(255,255,255,.24)"/>
        <polygon points="133,140 105,119 137,90"        fill="rgba(255,255,255,.09)"/>
        <polygon points="73,90 137,90 135,96 75,96"     fill="url(#v5gld)" opacity=".92"/>
        <ellipse cx="105" cy="90" rx="33" ry="6.5"     fill="url(#v5gld)" opacity=".97"/>
        <polygon points="105,74 113,83 105,91 97,83"    fill={A} opacity=".92"/>
        <polygon points="105,77 111,83 105,89 99,83"    fill="rgba(255,255,255,.58)"/>
      </g>
      <motion.polygon points="51,215 58,215 63,287 56,287" fill="rgba(255,255,255,.32)"
        animate={{opacity:[.18,.62,.18]}} transition={{duration:4.2,repeat:Infinity,ease:"easeInOut"}}/>
      {[0,1,2].map(i=>(
        <motion.circle key={i} cx={105+(i-1)*9} cy={70} r="1.6" fill={C}
          initial={{cy:70,opacity:0}} animate={{cy:70-20-i*6,opacity:[0,.62,0]}}
          transition={{duration:2.2,delay:i*0.22,repeat:Infinity,repeatDelay:3.8}}/>
      ))}
    </motion.svg>
  );
}

const BOTTLES = [Bottle1, Bottle2, Bottle3, Bottle4, Bottle5];

/* ═══════════════════════════════════════════════════════════════════
   FILM-GRAIN OVERLAY
═══════════════════════════════════════════════════════════════════ */
function Grain() {
  return (
    <svg aria-hidden="true" style={{
      position:"absolute",inset:0,width:"100%",height:"100%",
      pointerEvents:"none",zIndex:6,opacity:.028,mixBlendMode:"multiply",
    }}>
      <filter id="grf">
        <feTurbulence type="fractalNoise" baseFrequency=".68" numOctaves="4" stitchTiles="stitch"/>
        <feColorMatrix type="saturate" values="0"/>
      </filter>
      <rect width="100%" height="100%" filter="url(#grf)"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FLOATING PARTICLES
═══════════════════════════════════════════════════════════════════ */
function Particles({ accent }) {
  const pts = useRef(
    Array.from({length:20},()=>({
      x:`${4+Math.random()*92}%`, y:`${4+Math.random()*92}%`,
      s:.5+Math.random()*1.6, d:9+Math.random()*14, dl:Math.random()*10,
      mx:(Math.random()-.5)*24, my:(Math.random()-.5)*24,
    }))
  ).current;
  return (
    <div style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden"}}>
      {pts.map((p,i)=>(
        <motion.div key={i}
          style={{
            position:"absolute",left:p.x,top:p.y,
            width:p.s,height:p.s,borderRadius:"50%",
            background:accent,boxShadow:`0 0 ${p.s*5}px ${accent}88`,
          }}
          animate={{y:[p.my,-p.my,p.my],x:[p.mx,-p.mx,p.mx],opacity:[0,.55,0]}}
          transition={{duration:p.d,repeat:Infinity,delay:p.dl,ease:"easeInOut"}}/>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CSS — complete responsive system
═══════════════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Jost:wght@200;300;400;500&family=Cinzel:wght@400;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap');
*,*::before,*::after{box-sizing:border-box;}

/* ── Grid shell ── */
.mv-outer{
  position:relative;z-index:3;
  width:100%;max-width:1320px;margin:0 auto;
  min-height:100svh;
  display:grid;
  grid-template-columns:1fr 1fr;
  grid-template-rows:1fr auto;
  align-items:center;
  padding:140px 64px 56px;
  gap:0 56px;
}
.mv-left{
  grid-column:1;grid-row:1;
  display:flex;flex-direction:column;align-items:flex-start;
  padding-right:20px;
}
.mv-right{
  grid-column:2;grid-row:1/span 2;
  display:flex;flex-direction:column;
  align-items:center;justify-content:center;
}
.mv-bar{
  grid-column:1;grid-row:2;
  display:flex;align-items:center;gap:22px;
  padding:14px 0;
}

/* ── Stage ── */
.mv-stage{
  position:relative;
  width:340px;height:540px;
  perspective:1200px;cursor:grab;
}
.mv-stage:active{cursor:grabbing;}

/* ── Nav row ── */
.mv-nav-row{
  display:flex;align-items:center;gap:16px;
  margin-top:28px;
}
.mv-nav{
  width:50px;height:50px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;padding:0;border:none;flex-shrink:0;
  transition:transform .38s cubic-bezier(.16,1,.3,1),
             box-shadow .38s cubic-bezier(.16,1,.3,1);
}
.mv-nav:hover{transform:translateY(-3px) scale(1.07);}

/* ── Type ── */
.mv-h1{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(3.4rem,5.4vw,6.8rem);
  font-weight:300;line-height:.87;
  letter-spacing:-.022em;color:#180809;
  margin-bottom:14px;
}
.mv-tagline{
  font-family:'Playfair Display',serif;font-style:italic;
  font-size:clamp(.95rem,1.7vw,1.22rem);
  font-weight:400;letter-spacing:.06em;
  color:rgba(80,44,8,.44);
  margin-bottom:22px;
}
.mv-desc{
  font-family:'Jost',sans-serif;font-weight:300;
  font-size:clamp(.78rem,1.05vw,.9rem);
  color:rgba(50,28,6,.5);line-height:1.95;
  max-width:40ch;margin-bottom:34px;
  letter-spacing:.04em;
}

/* ── Badge ── */
.mv-badge{
  display:inline-flex;align-items:center;gap:8px;
  font-family:'Cinzel',serif;font-size:.44rem;
  letter-spacing:.4em;text-transform:uppercase;
  padding:7px 16px;margin-bottom:26px;border-radius:2px;
}

/* ── Eyebrow ── */
.mv-eyebrow{
  display:flex;align-items:center;gap:14px;
  margin-bottom:22px;width:100%;
}

/* ── CTA row ── */
.mv-cta-row{
  display:flex;align-items:center;gap:18px;
  margin-bottom:42px;flex-wrap:wrap;
}
.mv-btn-primary{
  font-family:'Cinzel',serif;font-size:.58rem;
  letter-spacing:.4em;text-transform:uppercase;
  padding:16px 52px 16px 46px;
  position:relative;overflow:hidden;
  clip-path:polygon(14px 0%,100% 0%,calc(100% - 14px) 100%,0% 100%);
  border:none;cursor:pointer;
  transition:transform .38s cubic-bezier(.16,1,.3,1),
             box-shadow .38s cubic-bezier(.16,1,.3,1);
}
.mv-btn-primary::after{
  content:'';position:absolute;inset:0;
  background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,.32) 50%,transparent 65%);
  transform:translateX(-120%) skewX(-18deg);
  transition:transform .6s cubic-bezier(.16,1,.3,1);
}
.mv-btn-primary:hover{transform:translateY(-4px);}
.mv-btn-primary:hover::after{transform:translateX(130%) skewX(-18deg);}
.mv-btn-primary span{position:relative;z-index:1;}

.mv-btn-ghost{
  font-family:'Cinzel',serif;font-size:.56rem;
  letter-spacing:.36em;text-transform:uppercase;
  padding:15px 30px;background:transparent;cursor:pointer;
  transition:letter-spacing .34s ease,box-shadow .28s ease;
}
.mv-btn-ghost:hover{letter-spacing:.44em;}

/* ── Divider ── */
.mv-divider{
  display:flex;align-items:center;gap:10px;
  width:100%;max-width:430px;margin-bottom:22px;
}
.mv-divider-line{flex:1;height:1px;}
.mv-divider-gem{width:6px;height:6px;transform:rotate(45deg);flex-shrink:0;}

/* ── Specs ── */
.mv-specs{
  display:grid;grid-template-columns:repeat(3,1fr);
  border-top:1px solid rgba(0,0,0,.07);
  border-left:1px solid rgba(0,0,0,.07);
  width:100%;max-width:430px;
}
.mv-spec{
  padding:15px 18px;
  border-right:1px solid rgba(0,0,0,.07);
  border-bottom:1px solid rgba(0,0,0,.07);
  transition:background .26s ease;
}
.mv-spec:hover{background:rgba(255,255,255,.52);}
.mv-spec-lbl{
  font-family:'Cinzel',serif;font-size:.37rem;
  letter-spacing:.44em;text-transform:uppercase;margin-bottom:6px;
}
.mv-spec-val{
  font-family:'Cormorant Garamond',serif;
  font-size:.88rem;font-weight:600;letter-spacing:.03em;
}

/* ── Scent pill ── */
.mv-scent{
  padding:10px 22px;border-radius:3px;text-align:center;
  flex:1;min-width:0;transition:box-shadow .3s ease;
}
.mv-scent-lbl{
  font-family:'Cinzel',serif;font-size:.36rem;
  letter-spacing:.46em;text-transform:uppercase;margin-bottom:5px;
}
.mv-scent-val{
  font-family:'Cormorant Garamond',serif;font-style:italic;
  font-size:.85rem;letter-spacing:.07em;white-space:nowrap;
}

/* ── Dot nav ── */
.mv-dot{
  height:2px;border-radius:1px;cursor:pointer;flex-shrink:0;
  transition:all .42s cubic-bezier(.16,1,.3,1);
}
.mv-dot.on{width:34px;}
.mv-dot.off{width:9px;}

/* ── Progress ── */
.mv-progress{flex:1;height:1px;border-radius:2px;overflow:hidden;}

/* ── Counter ── */
.mv-num{
  font-family:'Cinzel',serif;font-size:.5rem;
  letter-spacing:.36em;white-space:nowrap;
}

/* ── Side ticks ── */
.mv-side{
  position:fixed;right:26px;top:50%;transform:translateY(-50%);
  display:flex;flex-direction:column;align-items:center;gap:10px;
  z-index:20;pointer-events:none;
}

/* ── Vertical stamp ── */
.mv-stamp{
  writing-mode:vertical-rl;text-orientation:mixed;
  font-family:'Cinzel',serif;font-size:.37rem;
  letter-spacing:.52em;text-transform:uppercase;
  opacity:.18;user-select:none;pointer-events:none;
  position:absolute;right:-32px;top:50%;
  transform:translateY(-50%) rotate(180deg);
}

/* ── Scroll hint ── */
.mv-scroll{
  position:absolute;bottom:30px;left:50%;transform:translateX(-50%);
  display:flex;flex-direction:column;align-items:center;gap:8px;
  cursor:pointer;z-index:5;user-select:none;
}
.mv-scroll-lbl{
  font-family:'Cinzel',serif;font-size:.35rem;
  letter-spacing:.46em;text-transform:uppercase;opacity:.35;
}
.mv-scroll-mouse{width:24px;height:42px;border-radius:12px;position:relative;}
.mv-scroll-pip{
  width:4px;height:4px;border-radius:50%;
  position:absolute;left:50%;top:7px;transform:translateX(-50%);
  animation:mvpip 2.4s infinite ease;
}
@keyframes mvpip{
  0%  {top:7px;opacity:1;}
  75% {top:24px;opacity:0;}
  100%{top:7px;opacity:0;}
}

/* ══ TABLET  ≤ 1100px ══ */
@media(max-width:1100px){
  .mv-outer{padding:116px 40px 48px;gap:0 28px;}
  .mv-stage{width:288px;height:470px;}
  .mv-side,.mv-stamp{display:none;}
}

/* ══ LANDSCAPE SHORT  ≤ 900px landscape ══ */
@media(max-width:900px) and (orientation:landscape){
  .mv-outer{
    grid-template-columns:1fr 1fr;
    padding:70px 28px 28px;gap:0 20px;
  }
  .mv-stage{width:196px;height:334px;}
  .mv-h1{font-size:clamp(2.4rem,7vw,3.4rem);}
  .mv-desc{display:none;}
  .mv-scroll,.mv-side{display:none;}
}

/* ══ MOBILE  ≤ 768px ══ */
@media(max-width:768px){
  .mv-outer{
    grid-template-columns:1fr;
    grid-template-rows:auto auto auto;
    padding:100px 24px 52px;
    gap:0;align-items:start;
  }
  .mv-right{grid-column:1;grid-row:1;padding-top:6px;}
  .mv-left{
    grid-column:1;grid-row:2;
    align-items:center;text-align:center;
    padding:0;padding-top:22px;
  }
  .mv-bar{grid-column:1;grid-row:3;justify-content:center;padding-top:12px;}
  .mv-stage{width:198px;height:344px;}
  .mv-nav-row{margin-top:18px;}
  .mv-nav{display:none;}
  .mv-scent{padding:10px 28px;}
  .mv-h1{font-size:clamp(3rem,12vw,4.4rem);}
  .mv-tagline{font-size:clamp(.9rem,3.5vw,1.1rem);}
  .mv-desc{font-size:.82rem;max-width:100%;}
  .mv-cta-row,.mv-eyebrow,.mv-divider{justify-content:center;}
  .mv-specs{margin:0 auto;}
  .mv-side,.mv-stamp{display:none;}
}

/* ══ SMALL  ≤ 480px ══ */
@media(max-width:480px){
  .mv-outer{padding:90px 18px 44px;}
  .mv-stage{width:162px;height:286px;}
  .mv-h1{font-size:clamp(2.6rem,13vw,3.6rem);}
  .mv-btn-primary{font-size:.54rem;padding:14px 36px;}
  .mv-btn-ghost{display:none;}
  .mv-scent{display:none;}
  .mv-scroll{display:none;}
}

/* ══ TINY  ≤ 360px ══ */
@media(max-width:360px){
  .mv-outer{padding:82px 14px 34px;}
  .mv-stage{width:140px;height:252px;}
  .mv-h1{font-size:2.2rem;}
  .mv-desc{display:none;}
  .mv-specs{grid-template-columns:1fr 1fr;}
  .mv-spec:last-child{display:none;}
  .mv-badge{font-size:.38rem;padding:5px 12px;}
}
`;

/* ═══════════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════════ */
export default function Hero() {
  const [cur,  setCur]  = useState(0);
  const [dir,  setDir]  = useState(1);
  const [hold, setHold] = useState(false);

  const timerRef = useRef(null);
  const stageRef = useRef(null);
  const mouseX   = useMotionValue(0);
  const mouseY   = useMotionValue(0);
  const smoothX  = useSpring(mouseX, {stiffness:60,damping:18});
  const smoothY  = useSpring(mouseY, {stiffness:60,damping:18});

  const go   = useCallback((i,d)=>{ setDir(d); setCur(i); },[]);
  const next = useCallback(()=>go((cur+1)%SLIDES.length,  1), [cur,go]);
  const prev = useCallback(()=>go((cur-1+SLIDES.length)%SLIDES.length,-1),[cur,go]);

  useEffect(()=>{
    if(hold){ clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(next,6000);
    return ()=>clearInterval(timerRef.current);
  },[cur,hold,next]);

  const onMove = e=>{
    if(!stageRef.current) return;
    const r = stageRef.current.getBoundingClientRect();
    mouseX.set(((e.clientX-r.left)/r.width  -.5)*2);
    mouseY.set(((e.clientY-r.top) /r.height -.5)*2);
  };
  const resetMouse = ()=>{ mouseX.set(0); mouseY.set(0); };
  const toCollection = ()=>document.querySelector("#collection")?.scrollIntoView({behavior:"smooth"});

  const s   = SLIDES[cur];
  const Btl = BOTTLES[cur];

  const btlV = {
    enter:  d=>({opacity:0, x:d>0?140:-140, rotateY:d>0?35:-35, scale:.8,  filter:"blur(12px)"}),
    center: {opacity:1, x:0, rotateY:0, scale:1, filter:"blur(0px)",
      transition:{duration:1.0,ease:[.16,1,.3,1]}},
    exit:   d=>({opacity:0, x:d>0?-90:90, rotateY:d>0?-26:26, scale:.87, filter:"blur(7px)",
      transition:{duration:.48}}),
  };
  const txtV = {
    enter:  {opacity:0, y:34, filter:"blur(6px)"},
    center: {opacity:1, y:0,  filter:"blur(0px)", transition:{duration:.72,ease:[.16,1,.3,1]}},
    exit:   {opacity:0, y:-20, filter:"blur(3px)", transition:{duration:.34}},
  };

  return (
    <section id="home" style={{
      position:"relative",width:"100%",minHeight:"100svh",
      fontFamily:"'Jost',sans-serif",
    }}>
      <style>{CSS}</style>

      {/* ══ ATMOSPHERE — overflow:clip isolated so it never traps position:fixed elements ══ */}
      <div style={{position:"absolute",inset:0,overflow:"clip",pointerEvents:"none",zIndex:0}}>

        <AnimatePresence mode="wait">
          <motion.div key={`bg${cur}`}
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            transition={{duration:1.8,ease:"easeInOut"}}
            style={{
              position:"absolute",inset:0,
              background:`radial-gradient(ellipse 110% 90% at 64% 44%,${s.bg2} 0%,${s.bg1} 56%,#fff 100%)`,
            }}/>
        </AnimatePresence>

        {/* Halftone grid */}
        <AnimatePresence mode="wait">
          <motion.div key={`dot${cur}`}
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            transition={{duration:1.2}}
            style={{
              position:"absolute",inset:0,zIndex:1,
              backgroundImage:`radial-gradient(circle,${s.accent}18 1px,transparent 0)`,
              backgroundSize:"28px 28px",
            }}/>
        </AnimatePresence>

        <div style={{position:"absolute",inset:0,zIndex:2}}>
          <Particles accent={s.accent}/>
        </div>

        {/* Bottle-side glow */}
        <AnimatePresence mode="wait">
          <motion.div key={`orb1${cur}`}
            initial={{opacity:0,scale:.8}} animate={{opacity:1,scale:1}} exit={{opacity:0}}
            transition={{duration:2.2}}
            style={{
              position:"absolute",right:"6%",top:"50%",transform:"translateY(-50%)",
              width:"46vw",height:"46vw",borderRadius:"50%",
              background:`radial-gradient(circle,${s.accent}22 0%,transparent 64%)`,
              filter:"blur(52px)",zIndex:1,
            }}/>
        </AnimatePresence>

        {/* Text-side glow */}
        <AnimatePresence mode="wait">
          <motion.div key={`orb2${cur}`}
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            transition={{duration:2.4}}
            style={{
              position:"absolute",left:"-6%",top:"26%",
              width:"34vw",height:"34vw",borderRadius:"50%",
              background:`radial-gradient(circle,${s.cap}2a 0%,transparent 66%)`,
              filter:"blur(56px)",zIndex:1,
            }}/>
        </AnimatePresence>

        {/* Watermark */}
        <AnimatePresence mode="wait">
          <motion.div key={`wm${cur}`}
            initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}} exit={{opacity:0}}
            transition={{duration:2.0}}
            style={{
              position:"absolute",zIndex:1,right:"-3%",bottom:"-12%",
              fontFamily:"'Cormorant Garamond',serif",fontWeight:700,
              fontSize:"clamp(220px,34vw,520px)",color:`${s.accent}07`,
              lineHeight:1,userSelect:"none",letterSpacing:"-.05em",
            }}>
            {s.name.charAt(0)}
          </motion.div>
        </AnimatePresence>

        {/* Top & bottom rules */}
        {[{top:"13%"},{bottom:"13%"}].map((pos,i)=>(
          <AnimatePresence key={i} mode="wait">
            <motion.div key={`rl${i}-${cur}`}
              initial={{scaleX:0}} animate={{scaleX:1}} exit={{opacity:0}}
              transition={{duration:1.1,ease:[.16,1,.3,1],delay:i*.08}}
              style={{
                position:"absolute",zIndex:2,...pos,left:0,right:0,height:"1px",
                background:`linear-gradient(to right,transparent,${s.accent}20 25%,${s.accent}20 75%,transparent)`,
                transformOrigin:"50% 0",
              }}/>
          </AnimatePresence>
        ))}

        <Grain/>
      </div>

      {/* ══════════════════════════════════════
          LAYOUT
      ══════════════════════════════════════ */}
      <div className="mv-outer">

        {/* ─── LEFT: TEXT ─── */}
        <div className="mv-left">

          {/* Badge */}
          <AnimatePresence mode="wait">
            <motion.div key={`bdg${cur}`}
              initial={{opacity:0,y:-10,scale:.94}}
              animate={{opacity:1,y:0,scale:1}}
              exit={{opacity:0,y:8,scale:.94}}
              transition={{duration:.48}}
              className="mv-badge"
              style={{background:`${s.accent}14`,border:`1px solid ${s.accent}44`,color:s.accent}}>
              <motion.span
                style={{width:5,height:5,borderRadius:"50%",background:s.accent,display:"inline-block",flexShrink:0}}
                animate={{opacity:[1,.2,1],scale:[1,.6,1]}}
                transition={{duration:2,repeat:Infinity}}/>
              {s.badge}
            </motion.div>
          </AnimatePresence>

          {/* Eyebrow */}
          <AnimatePresence mode="wait">
            <motion.div key={`ey${cur}`}
              initial={{opacity:0,x:-18}} animate={{opacity:1,x:0}} exit={{opacity:0}}
              transition={{duration:.5,delay:.05}}
              className="mv-eyebrow">
              <motion.div
                style={{width:36,height:1.5,
                  background:`linear-gradient(to right,${s.accent},${s.accent}00)`,
                  flexShrink:0,originX:0}}
                initial={{scaleX:0}} animate={{scaleX:1}}
                transition={{duration:.65,delay:.1}}/>
              <span style={{
                fontFamily:"'Cinzel',serif",fontSize:".48rem",
                letterSpacing:".48em",color:s.accent,
                textTransform:"uppercase",opacity:.85,whiteSpace:"nowrap",
              }}>
                Maison Verra · {s.origin}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Heading — per-character stagger */}
          <AnimatePresence mode="wait" custom={dir}>
            <motion.h1 key={`h${cur}`} className="mv-h1"
              custom={dir} variants={txtV} initial="enter" animate="center" exit="exit">
              {s.heading.split("").map((ch,i)=>(
                <motion.span key={i}
                  initial={{opacity:0,y:28,rotateX:"-32deg"}}
                  animate={{opacity:1,y:0,rotateX:"0deg"}}
                  transition={{delay:i*.034,duration:.54,ease:[.16,1,.3,1]}}
                  style={{display:"inline-block",transformOrigin:"bottom"}}>
                  {ch===" "?"\u00A0":ch}
                </motion.span>
              ))}
            </motion.h1>
          </AnimatePresence>

          {/* Tagline */}
          <AnimatePresence mode="wait">
            <motion.p key={`tag${cur}`} className="mv-tagline"
              variants={txtV} initial="enter" animate="center" exit="exit">
              {s.tagline}
            </motion.p>
          </AnimatePresence>

          {/* Ornamental divider */}
          <div className="mv-divider">
            <motion.div className="mv-divider-line"
              style={{background:`linear-gradient(to right,${s.accent}55,${s.accent}00)`}}
              initial={{scaleX:0,originX:0}} animate={{scaleX:1}}
              transition={{duration:.84,delay:.3}}/>
            <motion.div className="mv-divider-gem"
              style={{background:s.accent,opacity:.7}}
              animate={{rotate:[45,135,45],opacity:[.5,1,.5]}}
              transition={{duration:5,repeat:Infinity}}/>
            <motion.div className="mv-divider-line"
              style={{background:`linear-gradient(to left,${s.accent}55,${s.accent}00)`}}
              initial={{scaleX:0,originX:1}} animate={{scaleX:1}}
              transition={{duration:.84,delay:.38}}/>
          </div>

          {/* Description */}
          <AnimatePresence mode="wait">
            <motion.p key={`desc${cur}`} className="mv-desc"
              initial={{opacity:0,y:16,filter:"blur(4px)"}}
              animate={{opacity:1,y:0,filter:"blur(0px)"}}
              exit={{opacity:0,filter:"blur(3px)"}}
              transition={{duration:.68,delay:.08}}>
              {s.sub}
            </motion.p>
          </AnimatePresence>

          {/* CTA buttons */}
          <div className="mv-cta-row">
            <motion.button className="mv-btn-primary"
              style={{
                background:`linear-gradient(128deg,${s.cap} 0%,${s.accent} 48%,${s.liquid} 100%)`,
                color:"#17080a",
                boxShadow:`0 12px 46px ${s.accent}40,inset 0 1px 0 rgba(255,255,255,.24)`,
              }}
              onClick={toCollection} whileTap={{scale:.97}}>
              <span>{s.cta}</span>
            </motion.button>

            <motion.button className="mv-btn-ghost"
              style={{color:s.accent,border:`1px solid ${s.accent}42`}}
              onMouseEnter={e=>{
                e.currentTarget.style.borderColor=s.accent;
                e.currentTarget.style.boxShadow=`0 0 30px ${s.accent}20`;
              }}
              onMouseLeave={e=>{
                e.currentTarget.style.borderColor=`${s.accent}42`;
                e.currentTarget.style.boxShadow="none";
              }}
              whileTap={{scale:.97}}>
              View Collection
            </motion.button>
          </div>

          {/* Specs */}
          <motion.div className="mv-specs"
            initial={{opacity:0,y:18}} animate={{opacity:1,y:0}}
            transition={{duration:.65,delay:.24}}>
            {[
              {lbl:"Fragrance Family",val:s.family},
              {lbl:"Origin",          val:s.origin},
              {lbl:"Year",            val:s.year},
            ].map((sp,i)=>(
              <div key={i} className="mv-spec">
                <div className="mv-spec-lbl" style={{color:`${s.accent}70`}}>{sp.lbl}</div>
                <div className="mv-spec-val" style={{color:`${s.accent}cc`}}>{sp.val}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ─── RIGHT: BOTTLE ─── */}
        <div className="mv-right">

          <div ref={stageRef} className="mv-stage"
            onMouseMove={onMove}
            onMouseLeave={()=>{ resetMouse(); setHold(false); }}
            onMouseEnter={()=>setHold(true)}>

            {/* Name stamp */}
            <AnimatePresence mode="wait">
              <motion.div key={`stmp${cur}`}
                className="mv-stamp"
                initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                transition={{duration:.6}}
                style={{color:s.accent}}>
                {s.name}
              </motion.div>
            </AnimatePresence>

            {/* Orbit rings */}
            {[
              {d:30,rev:false,i:"-10%",dash:"dashed",op:"1e"},
              {d:50,rev:true, i:"-26%",dash:"solid",  op:"10"},
              {d:74,rev:false,i:"-42%",dash:"dashed",  op:"08"},
            ].map((o,i)=>(
              <motion.div key={i}
                animate={{rotate:o.rev?-360:360}}
                transition={{duration:o.d,repeat:Infinity,ease:"linear"}}
                style={{
                  position:"absolute",inset:o.i,borderRadius:"50%",pointerEvents:"none",
                  border:`1px ${o.dash} ${s.accent}${o.op}`,
                  transition:"border-color .8s ease",
                }}/>
            ))}

            {/* Ambient glow pulse */}
            <motion.div
              animate={{scale:[1,1.2,1],opacity:[.16,.46,.16]}}
              transition={{duration:6,repeat:Infinity,ease:"easeInOut"}}
              style={{
                position:"absolute",inset:"4%",borderRadius:"50%",
                background:`radial-gradient(circle,${s.accent}26 0%,transparent 70%)`,
                filter:"blur(14px)",pointerEvents:"none",
                transition:"background .8s ease",
              }}/>

            {/* Bottle with float + parallax */}
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div key={`btl${cur}`} custom={dir}
                variants={btlV} initial="enter" animate="center" exit="exit"
                style={{width:"100%",height:"100%",position:"absolute",inset:0}}>
                <motion.div
                  animate={{y:[0,-14,0],rotateZ:[0,.4,0]}}
                  transition={{duration:7.5,repeat:Infinity,ease:"easeInOut"}}
                  style={{width:"100%",height:"100%"}}>
                  <Btl slide={s} mx={smoothX} my={smoothY}/>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Ground shadow */}
            <motion.div
              animate={{scaleX:[1,1.1,1],opacity:[.13,.26,.13]}}
              transition={{duration:7.5,repeat:Infinity,ease:"easeInOut"}}
              style={{
                position:"absolute",bottom:"-3%",left:"50%",transform:"translateX(-50%)",
                width:"52%",height:"16px",borderRadius:"50%",
                background:`radial-gradient(ellipse,${s.accent}45 0%,transparent 72%)`,
                filter:"blur(10px)",pointerEvents:"none",
                transition:"background .8s ease",
              }}/>
          </div>

          {/* Prev / Scent pill / Next */}
          <div className="mv-nav-row"
            onMouseEnter={()=>setHold(true)}
            onMouseLeave={()=>setHold(false)}>

            <motion.button className="mv-nav"
              style={{
                background:"rgba(255,255,255,.66)",backdropFilter:"blur(20px)",
                border:`1px solid ${s.accent}44`,color:s.accent,
                boxShadow:`0 4px 24px ${s.accent}1e,inset 0 1px 0 rgba(255,255,255,.4)`,
              }}
              onClick={prev} aria-label="Previous"
              whileHover={{boxShadow:`0 8px 40px ${s.accent}38`,borderColor:`${s.accent}88`}}
              whileTap={{scale:.92}}>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M13 4L7 10L13 16" stroke="currentColor" strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>

            <motion.div className="mv-scent"
              style={{
                background:"rgba(255,255,255,.66)",backdropFilter:"blur(20px)",
                border:`1px solid ${s.accent}2e`,
                boxShadow:`0 2px 18px ${s.accent}14,inset 0 1px 0 rgba(255,255,255,.4)`,
              }}
              whileHover={{boxShadow:`0 4px 34px ${s.accent}2a`}}>
              <div className="mv-scent-lbl" style={{color:`${s.accent}70`}}>Scent Profile</div>
              <AnimatePresence mode="wait">
                <motion.div key={`note${cur}`}
                  initial={{opacity:0,y:5,filter:"blur(3px)"}}
                  animate={{opacity:1,y:0,filter:"blur(0px)"}}
                  exit={{opacity:0,y:-5,filter:"blur(3px)"}}
                  transition={{duration:.36}}
                  className="mv-scent-val"
                  style={{color:`${s.accent}cc`}}>
                  {s.note}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <motion.button className="mv-nav"
              style={{
                background:"rgba(255,255,255,.66)",backdropFilter:"blur(20px)",
                border:`1px solid ${s.accent}44`,color:s.accent,
                boxShadow:`0 4px 24px ${s.accent}1e,inset 0 1px 0 rgba(255,255,255,.4)`,
              }}
              onClick={next} aria-label="Next"
              whileHover={{boxShadow:`0 8px 40px ${s.accent}38`,borderColor:`${s.accent}88`}}
              whileTap={{scale:.92}}>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          </div>
        </div>

        {/* ─── BOTTOM BAR ─── */}
        <div className="mv-bar"
          onMouseEnter={()=>setHold(true)}
          onMouseLeave={()=>setHold(false)}>

          <div style={{display:"flex",alignItems:"center",gap:7}}>
            {SLIDES.map((_,i)=>(
              <motion.div key={i}
                className={`mv-dot ${i===cur?"on":"off"}`}
                style={{background:i===cur?s.accent:`${s.accent}2e`}}
                onClick={()=>go(i,i>cur?1:-1)}
                whileHover={{scaleY:2.4}}/>
            ))}
          </div>

          <div className="mv-progress" style={{background:`${s.accent}16`}}>
            <motion.div key={cur}
              initial={{width:"0%"}} animate={{width:"100%"}}
              transition={{duration:6,ease:"linear"}}
              style={{
                height:"100%",
                background:`linear-gradient(to right,${s.accent},${s.cap})`,
                borderRadius:2,
              }}/>
          </div>

          <span className="mv-num" style={{color:`${s.accent}70`}}>
            <AnimatePresence mode="wait">
              <motion.span key={cur}
                initial={{opacity:0,y:5}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-5}}
                transition={{duration:.28}}
                style={{display:"inline-block",color:s.accent,fontWeight:600}}>
                {String(cur+1).padStart(2,"0")}
              </motion.span>
            </AnimatePresence>
            <span style={{opacity:.22,margin:"0 5px"}}>/</span>
            <span style={{opacity:.30}}>{String(SLIDES.length).padStart(2,"0")}</span>
          </span>
        </div>
      </div>

      {/* Side ticks */}
      <div className="mv-side">
        {SLIDES.map((_,i)=>(
          <motion.div key={i}
            onClick={()=>go(i,i>cur?1:-1)}
            style={{
              width:i===cur?2.5:1.5, height:i===cur?34:13,
              background:i===cur?s.accent:`${s.accent}2e`,
              borderRadius:2,cursor:"pointer",
              transition:"all .38s ease",pointerEvents:"auto",
            }}
            whileHover={{scaleX:2.4}}/>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="mv-scroll" onClick={toCollection}>
        <span className="mv-scroll-lbl" style={{color:s.accent}}>Discover</span>
        <div className="mv-scroll-mouse" style={{border:`1px solid ${s.accent}44`}}>
          <div className="mv-scroll-pip" style={{background:s.accent}}/>
        </div>
      </div>

    </section>
  );
}












