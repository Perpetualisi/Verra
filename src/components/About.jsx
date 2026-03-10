import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════════
   DESIGN TOKENS — matches Hero / Collection
═══════════════════════════════════════════ */
const GOLD   = "#c9a84c";
const GOLD_L = "#f0d080";
const GOLD_D = "#8a6820";
const INK    = "#180809";

/* ═══════════════════════════════════════════
   HIGHLIGHTS DATA
═══════════════════════════════════════════ */
const highlights = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 2C11 2 7 6 7 10a4 4 0 008 0c0-4-4-8-4-8z" stroke={GOLD} strokeWidth="1.2" fill={`${GOLD}18`}/>
        <path d="M5 14c0 0-2 1.5-2 3.5S4.5 20 11 20s8-1 8-2.5S19 14 19 14" stroke={GOLD} strokeWidth="1.1" fill="none" strokeLinecap="round"/>
        <circle cx="11" cy="10" r="1.5" fill={GOLD} opacity=".7"/>
      </svg>
    ),
    title: "Artisanal Ingredients",
    text: "Crafted with rare botanicals and exquisite natural oils sourced from the world's most storied gardens.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="4" y="6" width="14" height="12" rx="1.5" stroke={GOLD} strokeWidth="1.2" fill={`${GOLD}12`}/>
        <rect x="7" y="3" width="8" height="5" rx="1" stroke={GOLD} strokeWidth="1" fill={`${GOLD}18`}/>
        <line x1="4" y1="10" x2="18" y2="10" stroke={GOLD} strokeWidth=".8" opacity=".6"/>
        <circle cx="11" cy="14" r="1.2" fill={GOLD} opacity=".7"/>
      </svg>
    ),
    title: "Timeless Design",
    text: "Every bottle is an heirloom — sculpted glass, gilded details, and silhouettes that outlast trends.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 3 L13.2 8.5 L19 9.3 L14.8 13.4 L16 19 L11 16.3 L6 19 L7.2 13.4 L3 9.3 L8.8 8.5 Z"
          stroke={GOLD} strokeWidth="1.2" fill={`${GOLD}18`} strokeLinejoin="round"/>
      </svg>
    ),
    title: "Effortless Elegance",
    text: "Verra captures the essence of refined femininity — a sillage that turns every room into a memory.",
  },
];

/* ═══════════════════════════════════════════
   3D SVG SCENE — Hero-quality perfume tableau
   Two bottles + floating orbs + light rays
═══════════════════════════════════════════ */
function PremiumScene() {
  return (
    <svg
      viewBox="0 0 480 560"
      width="100%"
      height="100%"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* ── Gradients ── */}
        <radialGradient id="ab_bg" cx="50%" cy="55%" r="55%">
          <stop offset="0%"  stopColor="#fff8ee" stopOpacity=".95"/>
          <stop offset="100%" stopColor="#f5e2c0" stopOpacity="0"/>
        </radialGradient>

        {/* Bottle A — tall faceted */}
        <linearGradient id="ab_a_glass" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#fffaee" stopOpacity=".96"/>
          <stop offset="18%"  stopColor="#f0d080" stopOpacity=".6"/>
          <stop offset="50%"  stopColor="#b05c10" stopOpacity=".28"/>
          <stop offset="82%"  stopColor="#f0d080" stopOpacity=".62"/>
          <stop offset="100%" stopColor="#fffaee" stopOpacity=".94"/>
        </linearGradient>
        <linearGradient id="ab_a_liquid" x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%"   stopColor="#c9a84c" stopOpacity=".5"/>
          <stop offset="100%" stopColor="#b05c10" stopOpacity=".78"/>
        </linearGradient>
        <linearGradient id="ab_a_cap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#fffbe8"/>
          <stop offset="45%"  stopColor="#f0d080"/>
          <stop offset="100%" stopColor="#c9a84c"/>
        </linearGradient>
        <linearGradient id="ab_a_gold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#fffbe8"/>
          <stop offset="30%"  stopColor="#f0d080"/>
          <stop offset="62%"  stopColor="#ffe97a"/>
          <stop offset="100%" stopColor="#f0d080"/>
        </linearGradient>
        <linearGradient id="ab_a_shine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity=".85"/>
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
        </linearGradient>

        {/* Bottle B — sphere */}
        <radialGradient id="ab_b_glass" cx="34%" cy="30%" r="72%">
          <stop offset="0%"   stopColor="#fff8f4" stopOpacity=".97"/>
          <stop offset="28%"  stopColor="#e8c4a0" stopOpacity=".6"/>
          <stop offset="65%"  stopColor="#7a3b1e" stopOpacity=".32"/>
          <stop offset="100%" stopColor="#b8896a" stopOpacity=".72"/>
        </radialGradient>
        <radialGradient id="ab_b_liquid" cx="40%" cy="40%" r="68%">
          <stop offset="0%"   stopColor="#e8c4a0" stopOpacity=".6"/>
          <stop offset="100%" stopColor="#7a3b1e" stopOpacity=".82"/>
        </radialGradient>
        <linearGradient id="ab_b_cap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#fdf5ee"/>
          <stop offset="50%"  stopColor="#e8c4a0"/>
          <stop offset="100%" stopColor="#b8896a"/>
        </linearGradient>
        <linearGradient id="ab_b_gold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#e8c4a0"/>
          <stop offset="45%"  stopColor="#b8896a"/>
          <stop offset="72%"  stopColor="#f0d8b8"/>
          <stop offset="100%" stopColor="#e8c4a0"/>
        </linearGradient>

        {/* Light ray */}
        <linearGradient id="ab_ray" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#fff8d0" stopOpacity=".55"/>
          <stop offset="100%" stopColor="#fff8d0" stopOpacity="0"/>
        </linearGradient>

        {/* Platform */}
        <linearGradient id="ab_plat" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#f0d080" stopOpacity=".28"/>
          <stop offset="100%" stopColor="#c9a84c" stopOpacity=".08"/>
        </linearGradient>
        <linearGradient id="ab_plat_edge" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="transparent"/>
          <stop offset="30%"  stopColor="#f0d080" stopOpacity=".7"/>
          <stop offset="70%"  stopColor="#ffe97a" stopOpacity=".9"/>
          <stop offset="100%" stopColor="transparent"/>
        </linearGradient>

        {/* Filters */}
        <filter id="ab_glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="18" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="ab_shadow_a" x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#b05c10" floodOpacity=".22"/>
        </filter>
        <filter id="ab_shadow_b" x="-25%" y="-15%" width="150%" height="140%">
          <feDropShadow dx="0" dy="14" stdDeviation="12" floodColor="#7a3b1e" floodOpacity=".18"/>
        </filter>
        <filter id="ab_blur_sm">
          <feGaussianBlur stdDeviation="4"/>
        </filter>
        <filter id="ab_blur_lg">
          <feGaussianBlur stdDeviation="22"/>
        </filter>
      </defs>

      {/* ── Background ambient glow ── */}
      <ellipse cx="240" cy="420" rx="200" ry="80"
        fill="#f0d080" opacity=".10" filter="url(#ab_blur_lg)"/>
      <ellipse cx="240" cy="300" rx="160" ry="200"
        fill="#fffbe8" opacity=".18" filter="url(#ab_blur_lg)"/>

      {/* ── Decorative light rays ── */}
      {[180, 220, 255, 290, 320].map((x, i) => (
        <polygon key={i}
          points={`${x},0 ${x + 24},0 ${x + 60},320 ${x + 36},320`}
          fill="url(#ab_ray)"
          opacity={[.10,.14,.18,.12,.08][i]}
        />
      ))}

      {/* ── Marble / grid floor lines ── */}
      {[440, 460, 480, 500].map((y, i) => (
        <line key={i} x1="40" y1={y} x2="440" y2={y}
          stroke="#c9a84c" strokeWidth=".6" opacity={.08 - i*.015}/>
      ))}
      {[100,160,220,280,340,400].map((x, i) => (
        <line key={i}
          x1={x} y1="400" x2={x + 40} y2="520"
          stroke="#c9a84c" strokeWidth=".5" opacity=".06"/>
      ))}

      {/* ══════════════════════════════
          BOTTLE A — tall Art Deco flacon
          Left side, slightly rotated perspective
      ══════════════════════════════ */}
      <g transform="translate(58, 40) scale(1.08)" filter="url(#ab_shadow_a)">
        {/* liquid fill */}
        <polygon
          points="44,148 34,155 32,252 34,274 80,282 126,274 128,252 126,155 116,148"
          fill="url(#ab_a_liquid)" opacity=".85"/>
        {/* glass body */}
        <polygon
          points="42,122 32,148 30,254 32,278 80,286 128,278 130,254 128,148 118,122"
          fill="url(#ab_a_glass)" stroke="#f0d08055" strokeWidth="1"/>
        {/* left dark face */}
        <polygon points="42,122 58,126 48,150 48,270 32,278 30,254 32,148"
          fill="rgba(0,0,0,.07)"/>
        {/* right bright face */}
        <polygon points="118,122 112,126 112,270 128,278 130,254 128,148"
          fill="rgba(255,255,255,.14)"/>
        {/* top gold band */}
        <polygon points="42,122 118,122 114,129 46,129"
          fill="url(#ab_a_gold)" opacity=".94"/>
        {/* bottom gold band */}
        <polygon points="32,268 128,268 130,277 30,277"
          fill="url(#ab_a_gold)" opacity=".80"/>
        {/* vertical grooves */}
        {[58,68,78,88,98,108].map((x,i)=>(
          <line key={i} x1={x} y1="125" x2={x} y2="270"
            stroke="#c9a84c" strokeWidth=".4" opacity=".3"/>
        ))}
        {/* label panel */}
        <rect x="50" y="152" width="60" height="98" rx="1.5"
          fill="rgba(255,248,220,.22)" stroke="#c9a84c44" strokeWidth=".7"/>
        {/* diamond ornament */}
        <polygon points="80,165 87,172 80,179 73,172"
          fill="none" stroke="#c9a84c88" strokeWidth=".9"/>
        <polygon points="80,168 85,172 80,176 75,172"
          fill="#c9a84c28"/>
        {/* bottle text */}
        <text x="80" y="200" textAnchor="middle" fill="#c9a84cdd"
          style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"9px",fontWeight:700,letterSpacing:"4px"}}>
          VERRA
        </text>
        <line x1="54" y1="206" x2="106" y2="206" stroke="#c9a84c38" strokeWidth=".6"/>
        <text x="80" y="216" textAnchor="middle" fill="#c9a84c72"
          style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"4px",letterSpacing:"2.5px"}}>
          EAU DE PARFUM
        </text>
        {/* lower cap */}
        <polygon points="60,88 100,88 106,95 106,124 54,124 54,95"
          fill="url(#ab_a_cap)" stroke="#c9a84c50" strokeWidth=".9"/>
        <polygon points="60,88 100,88 98,95 62,95"
          fill="rgba(255,255,255,.35)"/>
        <rect x="54" y="119" width="52" height="4"  fill="url(#ab_a_gold)"/>
        <rect x="54" y="88"  width="52" height="3.5" fill="url(#ab_a_gold)"/>
        {/* upper cap */}
        <polygon points="58,48 102,48 108,55 108,91 52,91 52,55"
          fill="url(#ab_a_cap)" stroke="#c9a84c60" strokeWidth="1"/>
        <polygon points="58,48 102,48 100,55 60,55"
          fill="rgba(255,255,255,.38)"/>
        <rect x="52" y="63" width="56" height="2.2" fill="url(#ab_a_gold)"/>
        <rect x="52" y="83" width="56" height="2.2" fill="url(#ab_a_gold)"/>
        <rect x="52" y="44" width="56" height="6.5" rx="1.5"
          fill="url(#ab_a_gold)" opacity=".98"/>
        {/* shine streak */}
        <polygon points="36,148 42,148 40,272 34,272"
          fill="url(#ab_a_shine)" opacity=".55"/>

        {/* animated shimmer */}
        <motion.rect x="34" y="145" width="3.5" height="90" rx="2"
          fill="rgba(255,255,255,.38)"
          animate={{opacity:[.18,.65,.18],y:[0,12,0]}}
          transition={{duration:5,repeat:Infinity,ease:"easeInOut"}}/>
      </g>

      {/* ══════════════════════════════
          BOTTLE B — sphere flacon
          Right side, slightly larger / closer
      ══════════════════════════════ */}
      <g transform="translate(196, 90) scale(1.22)" filter="url(#ab_shadow_b)">
        {/* liquid */}
        <ellipse cx="80" cy="224" rx="50" ry="62"
          fill="url(#ab_b_liquid)" opacity=".78"/>
        {/* glass */}
        <ellipse cx="80" cy="218" rx="56" ry="68"
          fill="url(#ab_b_glass)" stroke="#e8c4a055" strokeWidth="1.2"/>
        {/* main highlight */}
        <ellipse cx="57" cy="186" rx="16" ry="24"
          fill="rgba(255,255,255,.28)"/>
        <ellipse cx="52" cy="180" rx="5.5" ry="9"
          fill="rgba(255,255,255,.58)"/>
        {/* tiny specular */}
        <ellipse cx="48" cy="176" rx="2" ry="3"
          fill="rgba(255,255,255,.80)"/>
        {/* equator band */}
        <path d="M24 218 Q80 232 136 218"
          stroke="url(#ab_b_gold)" strokeWidth="2.4" fill="none" opacity=".90"/>
        {/* lower band */}
        <path d="M36 252 Q80 262 124 252"
          stroke="url(#ab_b_gold)" strokeWidth="1.4" fill="none" opacity=".60"/>
        {/* label */}
        <text x="80" y="202" textAnchor="middle" fill="#e8c4a0ee"
          style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"10px",fontWeight:700,letterSpacing:"3.5px"}}>
          PURE
        </text>
        <line x1="50" y1="208" x2="110" y2="208" stroke="#b8896a44" strokeWidth=".7"/>
        <text x="80" y="218" textAnchor="middle" fill="#b8896a80"
          style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"4px",letterSpacing:"2.5px"}}>
          EAU DE PARFUM
        </text>
        {/* base shadow */}
        <ellipse cx="80" cy="286" rx="36" ry="7"
          fill="url(#ab_b_gold)" opacity=".62"/>
        {/* stem */}
        <rect x="68" y="112" width="24" height="40" rx="8"
          fill="url(#ab_b_cap)" stroke="#e8c4a050" strokeWidth="1"/>
        <rect x="66" y="144" width="28" height="5" rx="2"
          fill="url(#ab_b_gold)"/>
        <rect x="66" y="112" width="28" height="4" rx="2"
          fill="url(#ab_b_gold)"/>
        {/* neck taper */}
        <path d="M62 110 Q62 62 80 58 Q98 62 98 110 Z"
          fill="url(#ab_b_cap)" stroke="#e8c4a062" strokeWidth="1"/>
        <ellipse cx="80" cy="110" rx="16" ry="3.8"
          fill="url(#ab_b_gold)" opacity=".94"/>
        {/* top jewel cap */}
        <circle cx="80" cy="58" r="6.5"  fill="#b8896a" opacity=".88"/>
        <circle cx="80" cy="58" r="3.8"  fill="rgba(255,255,255,.68)"/>
        <circle cx="80" cy="58" r="1.6"  fill="#fff" opacity=".94"/>
        <circle cx="77" cy="55" r=".9"   fill="rgba(255,255,255,.9)"/>

        {/* animated shimmer */}
        <motion.ellipse cx="57" cy="192" rx="3" ry="12"
          fill="rgba(255,255,255,.44)"
          animate={{opacity:[.22,.72,.22],cy:[186,204,186]}}
          transition={{duration:5.5,repeat:Infinity,ease:"easeInOut"}}/>
      </g>

      {/* ══════════════════════════════
          PLATFORM — marble slab
      ══════════════════════════════ */}
      {/* slab top face */}
      <ellipse cx="240" cy="462" rx="188" ry="28"
        fill="url(#ab_plat)" stroke="url(#ab_plat_edge)" strokeWidth="1.2"/>
      {/* slab front face */}
      <path d="M52 462 Q240 475 428 462 L428 480 Q240 492 52 480 Z"
        fill="#c9a84c" opacity=".07"/>
      {/* slab highlight line */}
      <path d="M80 460 Q240 450 400 460"
        stroke="#ffe97a" strokeWidth=".8" opacity=".35" fill="none"/>

      {/* ══════════════════════════════
          FLOATING ORBS + PARTICLES
      ══════════════════════════════ */}

      {/* Large ambient orbs */}
      {[
        {cx:88,  cy:180, r:28, c:"#c9a84c", dur:7,   dy:-18},
        {cx:400, cy:220, r:20, c:"#b8896a", dur:8.5, dy:-14},
        {cx:60,  cy:360, r:14, c:"#f0d080", dur:6,   dy:-10},
        {cx:420, cy:380, r:10, c:"#c9a84c", dur:9,   dy:-12},
      ].map(({cx,cy,r,c,dur,dy},i)=>(
        <motion.circle key={i} cx={cx} cy={cy} r={r}
          fill={c} opacity=".07"
          animate={{cy:[cy, cy+dy, cy]}}
          transition={{duration:dur,repeat:Infinity,ease:"easeInOut",delay:i*.8}}/>
      ))}

      {/* Small sparkle particles */}
      {[
        {cx:102, cy:130, r:2.2, dur:3.2},
        {cx:148, cy:78,  r:1.6, dur:4.1},
        {cx:340, cy:110, r:2.8, dur:3.7},
        {cx:400, cy:155, r:1.8, dur:5.0},
        {cx:68,  cy:310, r:1.5, dur:4.4},
        {cx:430, cy:310, r:2.0, dur:3.9},
        {cx:200, cy:60,  r:1.4, dur:5.2},
        {cx:310, cy:52,  r:1.8, dur:4.6},
        {cx:380, cy:420, r:1.6, dur:3.5},
        {cx:110, cy:430, r:1.4, dur:6.0},
      ].map(({cx,cy,r,dur},i)=>(
        <motion.circle key={i} cx={cx} cy={cy} r={r}
          fill={GOLD}
          animate={{
            opacity:[0, .65, 0],
            cy:[cy, cy-10, cy],
          }}
          transition={{
            duration:dur,
            repeat:Infinity,
            ease:"easeInOut",
            delay:i*.35,
          }}/>
      ))}

      {/* Gem-cut diamond ornaments */}
      {[
        {cx:48,  cy:100, s:.7},
        {cx:432, cy:140, s:.9},
        {cx:240, cy:30,  s:1.1},
        {cx:100, cy:500, s:.6},
        {cx:380, cy:490, s:.65},
      ].map(({cx,cy,s},i)=>(
        <motion.polygon key={i}
          points={`${cx},${cy-9*s} ${cx+6*s},${cy} ${cx},${cy+9*s} ${cx-6*s},${cy}`}
          fill="none" stroke={GOLD} strokeWidth=".8"
          opacity=".25"
          animate={{opacity:[.15,.45,.15], rotate:[0,45,0]}}
          style={{transformOrigin:`${cx}px ${cy}px`}}
          transition={{duration:4+i*.4,repeat:Infinity,ease:"easeInOut",delay:i*.5}}/>
      ))}

      {/* Concentric halo rings around scene */}
      {[160,200,240].map((r,i)=>(
        <motion.circle key={i}
          cx="240" cy="300" r={r}
          fill="none"
          stroke={GOLD}
          strokeWidth=".5"
          opacity=".05"
          animate={{opacity:[.03,.09,.03], scale:[.98,1.02,.98]}}
          style={{transformOrigin:"240px 300px"}}
          transition={{duration:6+i*1.2,repeat:Infinity,ease:"easeInOut",delay:i*.8}}/>
      ))}

      {/* Gold dust lines */}
      {[
        {x1:60,y1:80,x2:120,y2:60},
        {x1:360,y1:70,x2:420,y2:95},
        {x1:40,y1:420,x2:90,y2:410},
        {x1:390,y1:430,x2:440,y2:415},
      ].map(({x1,y1,x2,y2},i)=>(
        <motion.line key={i}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={GOLD} strokeWidth=".8"
          animate={{opacity:[0,.4,0]}}
          transition={{duration:3.5,repeat:Infinity,delay:i*.7,ease:"easeInOut"}}/>
      ))}

      {/* Platform ground reflection */}
      <motion.ellipse cx="165" cy="468" rx="55" ry="10"
        fill="#c9a84c" opacity=".08"
        animate={{opacity:[.05,.14,.05]}}
        transition={{duration:5,repeat:Infinity,ease:"easeInOut"}}/>
      <motion.ellipse cx="330" cy="472" rx="68" ry="12"
        fill="#b8896a" opacity=".08"
        animate={{opacity:[.04,.12,.04]}}
        transition={{duration:6,repeat:Infinity,ease:"easeInOut",delay:.8}}/>
    </svg>
  );
}

/* ═══════════════════════════════════════════
   ABOUT SECTION
═══════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;}

.ab-section{
  position:relative;
  overflow:hidden;
  width:100%;
  padding: clamp(72px,9vw,120px) clamp(16px,5vw,80px);
  background: linear-gradient(148deg,#fdf8ee 0%,#f5e8d0 45%,#fef6ea 80%,#f0e0c8 100%);
  font-family:'Cormorant Garamond',serif;
}

.ab-inner{
  position:relative;
  z-index:2;
  max-width:1200px;
  margin:0 auto;
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(40px,6vw,88px);
  align-items:center;
}

@media(max-width:860px){
  .ab-inner{
    grid-template-columns:1fr;
    gap:clamp(32px,6vw,56px);
  }
  .ab-svg-col{
    order:-1;
    max-width:420px;
    margin:0 auto;
  }
}

@media(max-width:480px){
  .ab-section{
    padding: 60px 16px 72px;
  }
}

/* grain */
.ab-grain{
  position:absolute;inset:0;
  pointer-events:none;opacity:.022;
  mix-blend-mode:multiply;
  z-index:1;
}
`;

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

export default function About() {
  const [sectionRef, sectionVisible] = useInView(0.1);
  const [textRef, textVisible]       = useInView(0.15);
  const [svgRef, svgVisible]         = useInView(0.1);

  return (
    <section className="ab-section" id="about" ref={sectionRef}>
      <style>{CSS}</style>

      {/* Grain */}
      <svg className="ab-grain" aria-hidden="true">
        <filter id="ab_grain_f">
          <feTurbulence type="fractalNoise" baseFrequency=".72" numOctaves="4" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#ab_grain_f)"/>
      </svg>

      {/* Background orbs */}
      <div style={{
        position:"absolute",top:"-12%",right:"-8%",
        width:"clamp(260px,40vw,520px)",height:"clamp(260px,40vw,520px)",
        borderRadius:"50%",
        background:`radial-gradient(circle,${GOLD}12 0%,transparent 68%)`,
        filter:"blur(64px)",pointerEvents:"none",zIndex:1,
      }}/>
      <div style={{
        position:"absolute",bottom:"-8%",left:"-6%",
        width:"clamp(180px,28vw,380px)",height:"clamp(180px,28vw,380px)",
        borderRadius:"50%",
        background:`radial-gradient(circle,${GOLD_L}1a 0%,transparent 70%)`,
        filter:"blur(56px)",pointerEvents:"none",zIndex:1,
      }}/>

      <div className="ab-inner">

        {/* ── TEXT COLUMN ── */}
        <div ref={textRef} className="ab-text-col">

          {/* Eyebrow */}
          <motion.div
            initial={{opacity:0,y:16}} animate={textVisible ? {opacity:1,y:0} : {}}
            transition={{duration:.7,ease:[.16,1,.3,1]}}
            style={{
              display:"flex",alignItems:"center",gap:14,
              marginBottom:20,
            }}>
            <motion.div
              initial={{scaleX:0}} animate={textVisible ? {scaleX:1} : {}}
              transition={{duration:.7,delay:.1}}
              style={{
                width:36,height:1.5,
                background:`linear-gradient(to right,transparent,${GOLD})`,
                transformOrigin:"right",
              }}/>
            <span style={{
              fontFamily:"'Cinzel',serif",
              fontSize:"clamp(.38rem,.9vw,.52rem)",
              letterSpacing:".52em",
              color:GOLD,
              textTransform:"uppercase",
            }}>
              Our Heritage
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{opacity:0,y:28}} animate={textVisible ? {opacity:1,y:0} : {}}
            transition={{duration:.8,delay:.12,ease:[.16,1,.3,1]}}
            style={{
              fontFamily:"'Cormorant Garamond',serif",
              fontSize:"clamp(2.2rem,5.5vw,4.2rem)",
              fontWeight:300,
              letterSpacing:"-.02em",
              lineHeight:.95,
              color:INK,
              marginBottom:24,
            }}>
            The Verra<br/>
            <em style={{fontStyle:"italic",color:GOLD_D,fontWeight:400}}>Story</em>
          </motion.h2>

          {/* Gold divider */}
          <motion.div
            initial={{scaleX:0}} animate={textVisible ? {scaleX:1} : {}}
            transition={{duration:.9,delay:.2}}
            style={{
              width:"clamp(48px,8vw,80px)",height:1.5,
              background:`linear-gradient(to right,${GOLD},${GOLD_L},transparent)`,
              marginBottom:24,
              transformOrigin:"left",
            }}/>

          {/* Body text */}
          <motion.p
            initial={{opacity:0,y:16}} animate={textVisible ? {opacity:1,y:0} : {}}
            transition={{duration:.7,delay:.25}}
            style={{
              fontSize:"clamp(.95rem,1.6vw,1.12rem)",
              fontStyle:"italic",
              lineHeight:1.85,
              color:`${INK}90`,
              marginBottom:40,
              letterSpacing:".02em",
            }}>
            Born from a dream to bottle beauty, Verra is where fragrance becomes art.
            Each scent tells a story — soft whispers of petals, golden sunlit woods,
            and timeless elegance. Designed for the modern muse, Verra perfumes linger
            with grace and leave a memory of magic.
          </motion.p>

          {/* Highlights */}
          <div style={{display:"flex",flexDirection:"column",gap:28}}>
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{opacity:0,x:-20}} animate={textVisible ? {opacity:1,x:0} : {}}
                transition={{duration:.6,delay:.3 + i*.12,ease:[.16,1,.3,1]}}
                style={{
                  display:"flex",gap:18,alignItems:"flex-start",
                  paddingLeft:20,
                  borderLeft:`1px solid ${GOLD}40`,
                  position:"relative",
                }}>
                {/* left accent dot */}
                <div style={{
                  position:"absolute",left:-4,top:4,
                  width:7,height:7,
                  background:GOLD,
                  borderRadius:"50%",
                  opacity:.7,
                  flexShrink:0,
                }}/>

                {/* icon */}
                <div style={{
                  width:36,height:36,
                  borderRadius:2,
                  background:`${GOLD}12`,
                  border:`1px solid ${GOLD}30`,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  flexShrink:0,
                }}>
                  {item.icon}
                </div>

                {/* text */}
                <div>
                  <h4 style={{
                    fontFamily:"'Cinzel',serif",
                    fontSize:"clamp(.44rem,.9vw,.58rem)",
                    letterSpacing:".3em",
                    textTransform:"uppercase",
                    color:GOLD_D,
                    marginBottom:6,
                    fontWeight:500,
                  }}>
                    {item.title}
                  </h4>
                  <p style={{
                    fontSize:"clamp(.88rem,1.4vw,.98rem)",
                    lineHeight:1.75,
                    color:`${INK}80`,
                    letterSpacing:".02em",
                  }}>
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom signature */}
          <motion.div
            initial={{opacity:0}} animate={textVisible ? {opacity:1} : {}}
            transition={{duration:.8,delay:.7}}
            style={{
              marginTop:44,
              display:"flex",alignItems:"center",gap:16,
            }}>
            <div style={{
              width:48,height:48,
              borderRadius:2,
              border:`1px solid ${GOLD}40`,
              display:"flex",alignItems:"center",justifyContent:"center",
              background:`${GOLD}0a`,
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 3 L14.5 9.5 L21 10.5 L16.5 15 L17.5 21.5 L12 18.5 L6.5 21.5 L7.5 15 L3 10.5 L9.5 9.5 Z"
                  stroke={GOLD} strokeWidth="1.2" fill={`${GOLD}18`} strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div style={{
                fontFamily:"'Cinzel',serif",
                fontSize:"clamp(.38rem,.8vw,.48rem)",
                letterSpacing:".4em",
                color:GOLD,
                textTransform:"uppercase",
                marginBottom:2,
              }}>
                Maison Verra
              </div>
              <div style={{
                fontFamily:"'Cormorant Garamond',serif",
                fontStyle:"italic",
                fontSize:"clamp(.78rem,1.2vw,.88rem)",
                color:`${INK}55`,
                letterSpacing:".04em",
              }}>
                Est. in pursuit of perfection
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── SVG COLUMN ── */}
        <motion.div
          ref={svgRef}
          className="ab-svg-col"
          initial={{opacity:0,x:40}} animate={svgVisible ? {opacity:1,x:0} : {}}
          transition={{duration:1,delay:.15,ease:[.16,1,.3,1]}}
          style={{
            position:"relative",
            width:"100%",
            aspectRatio:"480/560",
          }}>

          {/* Frame border */}
          <div style={{
            position:"absolute",
            inset:"-1px",
            border:`1px solid ${GOLD}22`,
            borderRadius:4,
            pointerEvents:"none",
            zIndex:3,
          }}/>

          {/* Corner ornaments */}
          {[
            {top:10,left:10, r:"0deg"},
            {top:10,right:10, r:"90deg"},
            {bottom:10,right:10, r:"180deg"},
            {bottom:10,left:10, r:"270deg"},
          ].map((pos,i)=>(
            <svg key={i} width="20" height="20" viewBox="0 0 20 20"
              style={{position:"absolute",...pos,opacity:.35,zIndex:4,
                transform:`rotate(${pos.r})`}}>
              <path d="M0 20 L0 0 L20 0" stroke={GOLD} strokeWidth="1.2" fill="none"/>
              <circle cx="0" cy="0" r="2.5" fill={GOLD}/>
            </svg>
          ))}

          {/* Background plate */}
          <div style={{
            position:"absolute",inset:0,
            background:`linear-gradient(148deg,#fffdf5 0%,#f5e8cc 60%,#fef5e4 100%)`,
            borderRadius:4,
          }}/>

          {/* SVG scene */}
          <div style={{position:"relative",zIndex:2,width:"100%",height:"100%"}}>
            <PremiumScene/>
          </div>

          {/* Bottom label strip */}
          <div style={{
            position:"absolute",bottom:0,left:0,right:0,
            padding:"14px 20px",
            background:`linear-gradient(to top,rgba(240,224,192,.7),transparent)`,
            display:"flex",alignItems:"center",justifyContent:"center",
            gap:12,zIndex:5,borderRadius:"0 0 4px 4px",
          }}>
            <div style={{flex:1,height:1,background:`linear-gradient(to right,transparent,${GOLD}50)`}}/>
            <span style={{
              fontFamily:"'Cinzel',serif",
              fontSize:".4rem",
              letterSpacing:".44em",
              color:GOLD_D,
              textTransform:"uppercase",
              whiteSpace:"nowrap",
            }}>
              Maison Verra · Eau de Parfum
            </span>
            <div style={{flex:1,height:1,background:`linear-gradient(to left,transparent,${GOLD}50)`}}/>
          </div>
        </motion.div>

      </div>
    </section>
  );
}