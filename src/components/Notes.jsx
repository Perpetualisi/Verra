import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  motion, AnimatePresence,
  useMotionValue, useSpring, useTransform,
  useInView,
} from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════════════════════ */
const INK   = "#1a1208";

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
    return "lg";
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
   3D TILT HOOK
═══════════════════════════════════════════════════════════════ */
function useTilt(disabled = false) {
  const ref   = useRef(null);
  const rotX  = useSpring(useMotionValue(0), { stiffness:180, damping:26 });
  const rotY  = useSpring(useMotionValue(0), { stiffness:180, damping:26 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const onMove = useCallback((e) => {
    if (disabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left)  / r.width  - 0.5;
    const y = (e.clientY - r.top)   / r.height - 0.5;
    rotX.set(-y * 12); rotY.set( x * 12);
    glowX.set((x + 0.5) * 100); glowY.set((y + 0.5) * 100);
  }, [disabled, rotX, rotY, glowX, glowY]);

  const onLeave = useCallback(() => {
    rotX.set(0); rotY.set(0);
    glowX.set(50); glowY.set(50);
  }, [rotX, rotY, glowX, glowY]);

  return { ref, rotX, rotY, glowX, glowY, onMove, onLeave };
}

/* ═══════════════════════════════════════════════════════════════
   NOTES DATA
═══════════════════════════════════════════════════════════════ */
const NOTES_DATA = [
  {
    id: "top",
    title: "Top Notes",
    label: "01",
    tagline: "First Impression",
    pyramid: "top",
    description:
      "The opening breath of Verra — crystalline, effervescent, and alive. A fleeting veil of light that announces something extraordinary.",
    ingredients: ["Bergamot", "Rose", "Pear", "Citrus"],
    accent: "#c8a97e",
    accentDark: "#7a5c3a",
    bg1: "#fffcf7", bg2: "#f8ede0",
    duration: "0–15 min",
    intensity: 72,
  },
  {
    id: "heart",
    title: "Heart Notes",
    label: "02",
    tagline: "True Essence",
    pyramid: "heart",
    description:
      "Where Verra reveals her soul. A warm, sensuous bloom that unfolds slowly — the signature that defines and captivates.",
    ingredients: ["Jasmine", "White Musk", "Ylang-Ylang", "Lavender"],
    accent: "#9b7fa6",
    accentDark: "#5a3e70",
    bg1: "#fdfbff", bg2: "#ede5f5",
    duration: "15–60 min",
    intensity: 88,
  },
  {
    id: "base",
    title: "Base Notes",
    label: "03",
    tagline: "Lasting Memory",
    pyramid: "base",
    description:
      "The whisper that stays long after you leave a room. Rich, resinous, and profoundly warm — the foundation of Verra's legacy.",
    ingredients: ["Amber", "Vanilla", "Sandalwood", "Musk"],
    accent: "#8b6f47",
    accentDark: "#4a3018",
    bg1: "#fdfaf5", bg2: "#f0e4d2",
    duration: "6–12 hrs",
    intensity: 95,
  },
];

/* ═══════════════════════════════════════════════════════════════
   BOTTLE SVGs
═══════════════════════════════════════════════════════════════ */
function BottleTop({ accent }) {
  const A = accent;
  return (
    <svg viewBox="0 0 160 210" fill="none" style={{ width:"100%", height:"100%" }}>
      <defs>
        <radialGradient id="ntg1" cx="38%" cy="28%" r="68%">
          <stop offset="0%"   stopColor="#fff9f0" stopOpacity="1"/>
          <stop offset="100%" stopColor={A}        stopOpacity=".18"/>
        </radialGradient>
        <linearGradient id="ntglass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#ffffff"  stopOpacity=".85"/>
          <stop offset="55%"  stopColor="#f5ede0"  stopOpacity=".55"/>
          <stop offset="100%" stopColor={A}         stopOpacity=".45"/>
        </linearGradient>
        <linearGradient id="ntshine" x1="0" y1="0" x2=".28" y2="1">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity=".95"/>
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="ntneck" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#e8d5b8"/>
          <stop offset="50%"  stopColor="#fff9f0"/>
          <stop offset="100%" stopColor={A}/>
        </linearGradient>
        <filter id="ntdr">
          <feDropShadow dx="0" dy="10" stdDeviation="7" floodColor={A} floodOpacity=".22"/>
        </filter>
      </defs>
      <g filter="url(#ntdr)">
        <polygon points="80,62 118,82 118,158 80,172 42,158 42,82"
          fill="url(#ntglass)" stroke={`${A}55`} strokeWidth=".8"/>
        <polygon points="80,62 118,82 80,92 42,82" fill="url(#ntg1)" stroke={`${A}44`} strokeWidth=".5"/>
        <polygon points="118,82 118,158 80,172 80,92" fill="#e8d5b8" opacity=".45"/>
        <polygon points="42,82 80,92 80,172 42,158"  fill="#fff9f0" opacity=".55"/>
        <polygon points="80,97 114,113 114,150 80,162 46,150 46,113" fill={A} opacity=".10"/>
        <polygon points="54,87 67,84 71,148 56,153" fill="url(#ntshine)" opacity=".65"/>
        <rect x="66" y="40" width="28" height="24" rx="3" fill="url(#ntneck)" stroke={`${A}60`} strokeWidth=".7"/>
        <rect x="66" y="40" width="10" height="24" rx="2" fill="#ffffff" opacity=".38"/>
        <rect x="60" y="24" width="40" height="18" rx="5" fill={A}/>
        <rect x="60" y="24" width="14" height="18" rx="4" fill="#ffffff" opacity=".28"/>
        <rect x="62" y="26" width="36" height="3" rx="1.5" fill="#ffffff" opacity=".48"/>
        <text x="80" y="132" textAnchor="middle" fill={`${A}d0`}
          style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"7px",letterSpacing:"2.5px",fontWeight:600}}>VERRA</text>
        <text x="80" y="143" textAnchor="middle" fill={`${A}88`}
          style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"4.5px",letterSpacing:"2px"}}>TOP NOTE</text>
        <line x1="57" y1="137" x2="71" y2="137" stroke={`${A}55`} strokeWidth=".5"/>
        <line x1="89" y1="137" x2="103" y2="137" stroke={`${A}55`} strokeWidth=".5"/>
        <ellipse cx="80" cy="195" rx="36" ry="6" fill={A} opacity=".16"/>
      </g>
      {[[28,74],[134,96],[22,132],[136,70],[30,112]].map(([x,y],i) => (
        <motion.circle key={i} cx={x} cy={y} r={2.3 - i*.25} fill={A} opacity={.38 - i*.05}
          animate={{ cy:[y, y-10, y], opacity:[.38-i*.05, .08, .38-i*.05] }}
          transition={{ duration: 2.4+i*.4, repeat:Infinity, ease:"easeInOut" }}/>
      ))}
    </svg>
  );
}

function BottleHeart({ accent }) {
  const A = accent;
  return (
    <svg viewBox="0 0 160 210" fill="none" style={{ width:"100%", height:"100%" }}>
      <defs>
        <radialGradient id="nhg1" cx="38%" cy="30%" r="70%">
          <stop offset="0%"  stopColor="#faf5ff"/>
          <stop offset="100%" stopColor={A} stopOpacity=".22"/>
        </radialGradient>
        <linearGradient id="nhshine" x1="0" y1="0" x2=".3" y2="1">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity=".9"/>
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="nhneck" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"  stopColor="#d4c2e0"/>
          <stop offset="50%" stopColor="#faf5ff"/>
          <stop offset="100%" stopColor={A}/>
        </linearGradient>
        <filter id="nhdr">
          <feDropShadow dx="0" dy="12" stdDeviation="9" floodColor={A} floodOpacity=".20"/>
        </filter>
      </defs>
      <g filter="url(#nhdr)">
        <ellipse cx="80" cy="122" rx="42" ry="52" fill="url(#nhg1)" stroke={`${A}55`} strokeWidth=".9"/>
        <ellipse cx="80" cy="122" rx="42" ry="52" fill={A} opacity=".07"/>
        <ellipse cx="103" cy="128" rx="15" ry="40" fill={A} opacity=".10"/>
        <ellipse cx="80" cy="130" rx="33" ry="38" fill={`${A}22`}/>
        <ellipse cx="62" cy="100" rx="10" ry="16" fill="url(#nhshine)" opacity=".78"/>
        <ellipse cx="56" cy="96"  rx="4"  ry="6"  fill="#ffffff" opacity=".58"/>
        <rect x="68" y="42" width="24" height="26" rx="4" fill="url(#nhneck)" stroke={`${A}60`} strokeWidth=".7"/>
        <rect x="68" y="42" width="8" height="26" rx="3" fill="#ffffff" opacity=".38"/>
        <rect x="60" y="30" width="40" height="12" rx="3" fill={A}/>
        <ellipse cx="80" cy="30" rx="20" ry="8" fill={`${A}cc`}/>
        <ellipse cx="73" cy="28" rx="7" ry="3" fill="#ffffff" opacity=".32"/>
        <text x="80" y="126" textAnchor="middle" fill={`${A}d0`}
          style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"7px",letterSpacing:"2.5px",fontWeight:600}}>VERRA</text>
        <text x="80" y="137" textAnchor="middle" fill={`${A}88`}
          style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"4.5px",letterSpacing:"2px"}}>HEART NOTE</text>
        <line x1="54" y1="131" x2="68" y2="131" stroke={`${A}55`} strokeWidth=".5"/>
        <line x1="92" y1="131" x2="106" y2="131" stroke={`${A}55`} strokeWidth=".5"/>
        <ellipse cx="80" cy="195" rx="34" ry="6" fill={A} opacity=".14"/>
      </g>
      {[[26,90],[136,108],[22,148],[138,82],[32,164]].map(([x,y],i) => (
        <motion.circle key={i} cx={x} cy={y} r={2.8 - i*.28} fill={A} opacity={.34 - i*.04}
          animate={{ cy:[y, y-12, y], opacity:[.34-i*.04, .07, .34-i*.04] }}
          transition={{ duration: 3+i*.5, repeat:Infinity, ease:"easeInOut" }}/>
      ))}
    </svg>
  );
}

function BottleBase({ accent }) {
  const A = accent;
  return (
    <svg viewBox="0 0 160 210" fill="none" style={{ width:"100%", height:"100%" }}>
      <defs>
        <linearGradient id="nbglass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#ffffff"  stopOpacity=".82"/>
          <stop offset="55%"  stopColor="#f7f0e6"  stopOpacity=".58"/>
          <stop offset="100%" stopColor={A}         stopOpacity=".48"/>
        </linearGradient>
        <linearGradient id="nbshine" x1="0" y1="0" x2=".25" y2="1">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity=".9"/>
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="nbneck" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#c4a47a"/>
          <stop offset="50%"  stopColor="#fdf5e8"/>
          <stop offset="100%" stopColor={A}/>
        </linearGradient>
        <linearGradient id="nbface" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#fdf5e8" stopOpacity=".9"/>
          <stop offset="100%" stopColor={A}        stopOpacity=".7"/>
        </linearGradient>
        <filter id="nbdr">
          <feDropShadow dx="0" dy="12" stdDeviation="8" floodColor={A} floodOpacity=".22"/>
        </filter>
      </defs>
      <g filter="url(#nbdr)">
        <rect x="38" y="67" width="84" height="118" rx="2" fill={A} opacity=".28"/>
        <rect x="42" y="64" width="76" height="118" rx="3" fill="url(#nbglass)" stroke={`${A}70`} strokeWidth=".8"/>
        <polygon points="42,64 38,67 38,182 42,180" fill="url(#nbface)" opacity=".55"/>
        <polygon points="42,64 118,64 122,67 38,67" fill="#fdf5e8" opacity=".65"/>
        <rect x="106" y="64" width="12" height="118" rx="2" fill={A} opacity=".13"/>
        <rect x="50" y="112" width="60" height="62" rx="1" fill={A} opacity=".13"/>
        {[58,68,78,88,98,108].map((x,i) => (
          <line key={i} x1={x} y1="67" x2={x} y2="180" stroke={`${A}55`} strokeWidth=".4" opacity=".4"/>
        ))}
        <rect x="42" y="104" width="76" height="2" fill={A} opacity=".48"/>
        <rect x="42" y="108" width="76" height="1" fill={A} opacity=".22"/>
        <rect x="48" y="67" width="14" height="112" rx="2" fill="url(#nbshine)" opacity=".62"/>
        <rect x="50" y="70" width="5" height="50" rx="1" fill="#ffffff" opacity=".48"/>
        <rect x="64" y="42" width="32" height="24" rx="3" fill="url(#nbneck)" stroke={`${A}60`} strokeWidth=".7"/>
        <rect x="64" y="42" width="10" height="24" rx="2" fill="#ffffff" opacity=".32"/>
        <rect x="56" y="26" width="48" height="18" rx="4" fill={A}/>
        <rect x="56" y="26" width="16" height="18" rx="3" fill="#ffffff" opacity=".24"/>
        <rect x="58" y="28" width="44" height="3" rx="1.5" fill={`${A}99`}/>
        <rect x="58" y="38" width="44" height="2" rx="1"   fill={`${A}70`}/>
        <rect x="56" y="120" width="48" height="28" rx="1" fill="#ffffff" opacity=".14"/>
        <text x="80" y="133" textAnchor="middle" fill={`${A}d0`}
          style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"7px",letterSpacing:"2.5px",fontWeight:600}}>VERRA</text>
        <text x="80" y="143" textAnchor="middle" fill={`${A}88`}
          style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"4.5px",letterSpacing:"2px"}}>BASE NOTE</text>
        <line x1="58" y1="138" x2="70" y2="138" stroke={`${A}55`} strokeWidth=".5"/>
        <line x1="90" y1="138" x2="102" y2="138" stroke={`${A}55`} strokeWidth=".5"/>
        <ellipse cx="80" cy="198" rx="40" ry="6" fill={A} opacity=".18"/>
      </g>
      {[[28,77],[136,92],[22,140],[138,74],[28,160]].map(([x,y],i) => (
        <motion.circle key={i} cx={x} cy={y} r={2.0} fill={A} opacity={.28 - i*.03}
          animate={{ cy:[y, y-8, y], opacity:[.28-i*.03, .05, .28-i*.03] }}
          transition={{ duration: 3.5+i*.5, repeat:Infinity, ease:"easeInOut" }}/>
      ))}
    </svg>
  );
}

const BOTTLE_MAP = { top: BottleTop, heart: BottleHeart, base: BottleBase };

/* ═══════════════════════════════════════════════════════════════
   SCENT TRAIL — rising wisps from bottle top
═══════════════════════════════════════════════════════════════ */
function ScentTrail({ accent }) {
  return (
    <div style={{
      position:"absolute", top:-28, left:"50%", transform:"translateX(-50%)",
      width:80, height:56, pointerEvents:"none", zIndex:4,
    }}>
      <svg viewBox="0 0 80 56" fill="none" style={{width:"100%",height:"100%"}}>
        {[0,1,2,3].map(i => {
          const cx = 18 + i * 14;
          return (
            <motion.path
              key={i}
              d={`M${cx},52 Q${cx+(i%2?7:-7)},36 ${cx},20 Q${cx+(i%2?-5:5)},8 ${cx},0`}
              stroke={accent} strokeWidth="1.3" strokeLinecap="round" fill="none"
              initial={{ opacity:0, pathLength:0 }}
              animate={{ opacity:[0, 0.20, 0.12, 0], pathLength:[0,1], y:[0,-10] }}
              transition={{
                duration: 2.6 + i * 0.45,
                delay: i * 0.38,
                repeat: Infinity,
                repeatDelay: 1.0,
                ease: "easeOut",
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   INTENSITY BAR
═══════════════════════════════════════════════════════════════ */
function IntensityBar({ value, accent, inView }) {
  return (
    <div style={{ marginBottom:18 }}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:5}}>
        <span style={{fontFamily:"'Cinzel',serif",fontSize:".28rem",letterSpacing:".34em",
          textTransform:"uppercase",color:`${accent}80`}}>Intensity</span>
        <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:".78rem",fontWeight:600,color:accent}}>
          {value}%
        </span>
      </div>
      <div style={{height:3,borderRadius:99,background:`${accent}18`,overflow:"hidden"}}>
        <motion.div
          initial={{ scaleX:0 }}
          animate={{ scaleX: inView ? value/100 : 0 }}
          transition={{ duration:1.1, delay:.35, ease:[.16,1,.3,1] }}
          style={{
            height:"100%", borderRadius:99,
            background:`linear-gradient(to right,${accent}70,${accent})`,
            transformOrigin:"left",
          }}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   OLFACTORY PYRAMID INDICATOR
═══════════════════════════════════════════════════════════════ */
function OlfactoryPyramid({ active }) {
  const layers = [
    { id:"top",   label:"Top Notes",   color:"#c8a97e", w:72  },
    { id:"heart", label:"Heart Notes", color:"#9b7fa6", w:128 },
    { id:"base",  label:"Base Notes",  color:"#8b6f47", w:184 },
  ];
  return (
    <div style={{
      display:"flex", flexDirection:"column", alignItems:"center", gap:4,
      margin:"0 auto 52px", maxWidth:220,
    }}>
      {layers.map(l => (
        <motion.div
          key={l.id}
          animate={{ opacity: active === l.id ? 1 : active ? 0.34 : 0.62, scaleX: active === l.id ? 1.05 : 1 }}
          transition={{ duration:.38 }}
          style={{
            width:l.w, height:22, borderRadius:1,
            background:`linear-gradient(to right,transparent,${l.color}44,${l.color}66,${l.color}44,transparent)`,
            border:`1px solid ${l.color}${active===l.id?"70":"38"}`,
            display:"flex", alignItems:"center", justifyContent:"center",
          }}>
          <span style={{fontFamily:"'Cinzel',serif",fontSize:".26rem",letterSpacing:".36em",
            textTransform:"uppercase",color: active===l.id ? l.color : `${l.color}88`}}>
            {l.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NOTE CARD
═══════════════════════════════════════════════════════════════ */
function NoteCard({ note, index, bp, onActive }) {
  const isMob = bp === "xs" || bp === "sm";
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-72px" });
  const [hovered, setHovered] = useState(false);

  const tilt = useTilt(isMob);

  const glareStyle = useTransform(
    [tilt.glowX, tilt.glowY],
    ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.20) 0%, transparent 58%)`
  );

  const Bottle = BOTTLE_MAP[note.pyramid] || BottleTop;

  const setRef = useCallback((el) => {
    ref.current = el;
    tilt.ref.current = el;
  }, [tilt.ref]);

  useEffect(() => { if (hovered) onActive(note.id); }, [hovered, note.id, onActive]);

  return (
    <motion.article
      ref={setRef}
      initial={{ opacity:0, y:44 }}
      animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:.72, delay: index*.15, ease:[.16,1,.3,1] }}
      onMouseMove={tilt.onMove}
      onMouseLeave={() => { tilt.onLeave(); setHovered(false); }}
      onMouseEnter={() => setHovered(true)}
      style={{
        position:"relative", overflow:"hidden", borderRadius:3,
        background:`linear-gradient(150deg,${note.bg1},${note.bg2})`,
        border:`1px solid ${hovered ? note.accent+"55" : note.accent+"22"}`,
        boxShadow: hovered
          ? `0 26px 70px ${note.accent}26, 0 0 0 1px ${note.accent}18`
          : `0 6px 28px ${note.accent}12`,
        rotateX: isMob ? 0 : tilt.rotX,
        rotateY: isMob ? 0 : tilt.rotY,
        transformStyle:"preserve-3d",
        transformOrigin:"center center",
        willChange:"transform",
        transition:"border-color .32s, box-shadow .32s",
        cursor:"default",
      }}>

      {/* Top accent rule */}
      <motion.div animate={{ opacity: hovered ? 1 : 0.36 }}
        style={{height:2,background:`linear-gradient(to right,transparent,${note.accent},transparent)`}}/>

      {/* Holographic glare */}
      {!isMob && (
        <motion.div style={{position:"absolute",inset:0,zIndex:1,pointerEvents:"none",
          background:glareStyle,borderRadius:3}}/>
      )}

      {/* Dot grid */}
      <div style={{position:"absolute",inset:0,zIndex:0,pointerEvents:"none",
        backgroundImage:`radial-gradient(circle,${note.accent}12 1px,transparent 0)`,
        backgroundSize:"20px 20px"}}/>

      {/* Ambient glow orb */}
      <div style={{position:"absolute",top:"-14%",right:"-8%",width:"58%",height:"58%",
        borderRadius:"50%",background:`radial-gradient(circle,${note.accent}18,transparent 68%)`,
        filter:"blur(26px)",pointerEvents:"none",zIndex:0}}/>

      {/* Number badge */}
      <div style={{position:"absolute",top:18,right:18,zIndex:3,
        fontFamily:"'Cinzel',serif",fontSize:".52rem",letterSpacing:".22em",
        color:note.accent,opacity:.34}}>{note.label}</div>

      {/* Bottle stage */}
      <div style={{
        position:"relative",zIndex:2,
        height: isMob ? 162 : 204,
        display:"flex",alignItems:"center",justifyContent:"center",
        padding: isMob ? "0 32px" : "0 40px",
      }}>
        <motion.div animate={{rotate:360}} transition={{duration:28,repeat:Infinity,ease:"linear"}}
          style={{position:"absolute",width:"70%",height:"70%",borderRadius:"50%",
            border:`1px dashed ${note.accent}18`,pointerEvents:"none"}}/>
        <motion.div animate={{scale:[1,1.16,1],opacity:[.12,.30,.12]}}
          transition={{duration:5,repeat:Infinity,ease:"easeInOut"}}
          style={{position:"absolute",width:"52%",height:"52%",borderRadius:"50%",
            background:`radial-gradient(circle,${note.accent}28,transparent 70%)`,
            filter:"blur(14px)",pointerEvents:"none"}}/>
        <ScentTrail accent={note.accent}/>
        <motion.div animate={{y:[0,-7,0]}} transition={{duration:6,repeat:Infinity,ease:"easeInOut"}}
          style={{width: isMob ? 78 : 98, height: isMob ? 144 : 182, zIndex:2}}>
          <Bottle accent={note.accent}/>
        </motion.div>
        <motion.div animate={{scaleX:[1,1.10,1],opacity:[.10,.20,.10]}}
          transition={{duration:6,repeat:Infinity,ease:"easeInOut"}}
          style={{position:"absolute",bottom:"1%",left:"50%",transform:"translateX(-50%)",
            width:"34%",height:"8px",borderRadius:"50%",
            background:`radial-gradient(ellipse,${note.accent}44,transparent 70%)`,filter:"blur(6px)"}}/>
      </div>

      {/* Content */}
      <div style={{
        position:"relative",zIndex:2,
        padding: isMob ? "0 18px 22px" : "0 28px 30px",
      }}>
        {/* Rule */}
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
          <div style={{flex:1,height:1,background:`linear-gradient(to right,${note.accent}44,transparent)`}}/>
          <div style={{width:5,height:5,transform:"rotate(45deg)",background:note.accent,opacity:.56,flexShrink:0}}/>
          <div style={{flex:1,height:1,background:`linear-gradient(to left,${note.accent}44,transparent)`}}/>
        </div>

        {/* Tagline */}
        <div style={{fontFamily:"'Cinzel',serif",fontSize:".28rem",letterSpacing:".42em",
          textTransform:"uppercase",color:note.accent,opacity:.68,marginBottom:7}}>
          {note.tagline}
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily:"'Cormorant Garamond',serif",
          fontSize: isMob ? "1.32rem" : "clamp(1.28rem,2.4vw,1.6rem)",
          fontWeight:400, color:INK, letterSpacing:".03em",
          lineHeight:1.15, marginBottom:11,
        }}>{note.title}</h3>

        {/* Animated underline */}
        <motion.div animate={{ width: hovered ? 52 : 28 }} transition={{ duration:.4 }}
          style={{height:1,background:note.accent,marginBottom:16}}/>

        {/* Description */}
        <p style={{
          fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic",
          fontSize: isMob ? ".88rem" : "clamp(.88rem,1.5vw,.97rem)",
          lineHeight:1.82, color:`${note.accentDark}90`, marginBottom:18,
        }}>{note.description}</p>

        {/* Intensity */}
        <IntensityBar value={note.intensity} accent={note.accent} inView={inView}/>

        {/* Ingredient pills */}
        <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:18}}>
          {note.ingredients.map((item, idx) => (
            <motion.span key={idx}
              initial={{ opacity:0, scale:.88 }}
              animate={inView ? { opacity:1, scale:1 } : {}}
              transition={{ duration:.36, delay: index*.14 + idx*.07 + .2 }}
              style={{
                fontFamily:"'Cinzel',serif",
                fontSize: isMob ? ".28rem" : ".3rem",
                letterSpacing:".28em", textTransform:"uppercase",
                padding:"5px 11px", borderRadius:1,
                border:`1px solid ${note.accent}50`,
                background: hovered ? `${note.accent}12` : "transparent",
                color:note.accent,
                transition:"background .28s",
              }}>
              {item}
            </motion.span>
          ))}
        </div>

        {/* Duration row */}
        <div style={{display:"flex",alignItems:"center",gap:9,
          paddingTop:13,borderTop:`1px solid ${note.accent}18`}}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke={note.accent} strokeWidth="1.6" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          <span style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",
            fontSize:".76rem",color:`${note.accentDark}78`,letterSpacing:".04em"}}>
            Lasts {note.duration}
          </span>
          <div style={{flex:1}}/>
          <svg width="14" height="14" viewBox="0 0 14 14" style={{opacity:.14}}>
            <path d="M7 1L8.4 5.6L13 7L8.4 8.4L7 13L5.6 8.4L1 7L5.6 5.6Z" fill={note.accent}/>
          </svg>
        </div>
      </div>

      {/* Corner ornaments */}
      <svg style={{position:"absolute",top:8,left:8,opacity:.10,pointerEvents:"none"}}
        width="18" height="18" viewBox="0 0 18 18">
        <path d="M0 18 L0 0 L18 0" stroke={note.accent} strokeWidth="1" fill="none"/>
      </svg>
      <svg style={{position:"absolute",bottom:8,right:8,opacity:.10,pointerEvents:"none",transform:"rotate(180deg)"}}
        width="18" height="18" viewBox="0 0 18 18">
        <path d="M0 18 L0 0 L18 0" stroke={note.accent} strokeWidth="1" fill="none"/>
      </svg>
    </motion.article>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION HEADER
═══════════════════════════════════════════════════════════════ */
function Header({ bp }) {
  const isMob = bp === "xs" || bp === "sm";
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-60px" });

  return (
    <div ref={ref} style={{textAlign:"center",marginBottom: isMob ? 36 : 64}}>
      <motion.div
        initial={{opacity:0,y:10}} animate={inView ? {opacity:1,y:0} : {}}
        transition={{duration:.6}}
        style={{fontFamily:"'Cinzel',serif",
          fontSize: isMob ? ".36rem" : ".42rem",
          letterSpacing:".5em",textTransform:"uppercase",
          color:"#c8a97e",marginBottom: isMob ? 12 : 16}}>
        The Olfactory Pyramid
      </motion.div>

      <motion.h2
        initial={{opacity:0,y:28}} animate={inView ? {opacity:1,y:0} : {}}
        transition={{duration:.74,delay:.1,ease:[.16,1,.3,1]}}
        style={{fontFamily:"'Cormorant Garamond',serif",
          fontSize:"clamp(2.2rem,7vw,4.8rem)",fontWeight:300,
          letterSpacing:"-.01em",lineHeight:.95,color:INK,margin:"0 0 18px"}}>
        Fragrance Notes
      </motion.h2>

      <motion.div
        initial={{opacity:0,scale:.7}} animate={inView ? {opacity:1,scale:1} : {}}
        transition={{duration:.58,delay:.18}}
        style={{display:"flex",alignItems:"center",justifyContent:"center",gap:14,marginBottom:14}}>
        <div style={{width: isMob ? 36 : 58,height:1,background:"linear-gradient(to right,transparent,#c8a97e)"}}/>
        <svg width="14" height="14" viewBox="0 0 14 14">
          <path d="M7 1L8.4 5.6L13 7L8.4 8.4L7 13L5.6 8.4L1 7L5.6 5.6Z" fill="#c8a97e"/>
        </svg>
        <div style={{width: isMob ? 36 : 58,height:1,background:"linear-gradient(to left,transparent,#c8a97e)"}}/>
      </motion.div>

      <motion.p
        initial={{opacity:0,y:12}} animate={inView ? {opacity:1,y:0} : {}}
        transition={{duration:.6,delay:.24}}
        style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",
          fontSize: isMob ? ".88rem" : "clamp(.92rem,2vw,1.07rem)",
          color:"#7a6248",maxWidth:400,margin:"0 auto",lineHeight:1.8,padding:"0 16px"}}>
        Three acts of a single, unforgettable story
      </motion.p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CSS
═══════════════════════════════════════════════════════════════ */
const CSS = `
.notes-wrap {
  position:relative; width:100%; overflow:hidden;
  padding: clamp(52px,8vw,120px) clamp(14px,5vw,80px) clamp(60px,8vw,120px);
  background: linear-gradient(160deg, #fdfaf5 0%, #f7ece0 42%, #fdfaf5 100%);
}
.notes-grid {
  display:grid;
  gap:clamp(14px,2.5vw,28px);
  grid-template-columns:repeat(3,1fr);
  max-width:1180px;
  margin:0 auto;
}
@media(max-width:899px){ .notes-grid{ grid-template-columns:repeat(2,1fr); } }
@media(max-width:599px){ .notes-grid{ grid-template-columns:1fr; gap:14px; } }
.notes-footer {
  text-align:center;
  margin-top:clamp(36px,6vw,68px);
  font-family:'Cinzel',serif;
  font-size:.32rem;
  letter-spacing:.46em;
  color:#c8a97e;
  text-transform:uppercase;
  opacity:.58;
}
`;

/* ═══════════════════════════════════════════════════════════════
   MAIN
═══════════════════════════════════════════════════════════════ */
export default function Notes() {
  const bp = useBreakpoint();
  const [activeNote, setActiveNote] = useState(null);
  const isMob = bp === "xs" || bp === "sm";

  const handleActive = useCallback((id) => setActiveNote(id), []);

  return (
    <section className="notes-wrap">
      <style>{CSS}</style>

      {/* Line texture */}
      <svg aria-hidden="true" style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:.032,pointerEvents:"none"}}>
        {Array.from({length:22}).map((_,i) => (
          <line key={i} x1="0" y1={`${i*4.8}%`} x2="100%" y2={`${i*4.8}%`} stroke="#8b6f47" strokeWidth="1"/>
        ))}
      </svg>

      {/* Corner ornaments */}
      <svg style={{position:"absolute",top:36,left:36,opacity:.10,pointerEvents:"none"}}
        width="60" height="60" viewBox="0 0 60 60">
        <path d="M0 60 L0 0 L60 0" stroke="#8b6f47" strokeWidth="1" fill="none"/>
        <path d="M10 60 L10 10 L60 10" stroke="#8b6f47" strokeWidth=".5" fill="none" opacity=".5"/>
        <circle cx="0" cy="0" r="4" fill="#c8a97e"/>
      </svg>
      <svg style={{position:"absolute",bottom:36,right:36,opacity:.10,pointerEvents:"none",transform:"rotate(180deg)"}}
        width="60" height="60" viewBox="0 0 60 60">
        <path d="M0 60 L0 0 L60 0" stroke="#8b6f47" strokeWidth="1" fill="none"/>
        <path d="M10 60 L10 10 L60 10" stroke="#8b6f47" strokeWidth=".5" fill="none" opacity=".5"/>
        <circle cx="0" cy="0" r="4" fill="#c8a97e"/>
      </svg>

      {/* Ambient orbs */}
      <div style={{position:"absolute",top:"-6%",right:"-4%",
        width:"clamp(160px,26vw,360px)",height:"clamp(160px,26vw,360px)",borderRadius:"50%",
        background:"radial-gradient(circle,#c8a97e10,transparent 68%)",filter:"blur(50px)",
        pointerEvents:"none",zIndex:0}}/>
      <div style={{position:"absolute",bottom:"-8%",left:"-3%",
        width:"clamp(130px,20vw,280px)",height:"clamp(130px,20vw,280px)",borderRadius:"50%",
        background:"radial-gradient(circle,#9b7fa618,transparent 68%)",filter:"blur(50px)",
        pointerEvents:"none",zIndex:0}}/>

      <div style={{position:"relative",zIndex:1}}>
        <Header bp={bp}/>
        {!isMob && <OlfactoryPyramid active={activeNote}/>}
        <div className="notes-grid">
          {NOTES_DATA.map((note, i) => (
            <NoteCard key={note.id} note={note} index={i} bp={bp} onActive={handleActive}/>
          ))}
        </div>
        <div className="notes-footer">Maison Verra · Eau de Parfum · 50 ml</div>
      </div>
    </section>
  );
}