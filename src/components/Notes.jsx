import React, { useEffect, useRef, useState } from "react";

const notesData = [
  {
    title: "Top Notes",
    label: "01",
    tagline: "First Impression",
    description:
      "The opening breath of Verra — crystalline, effervescent, and alive. A fleeting veil of light that announces something extraordinary.",
    ingredients: ["Bergamot", "Rose", "Pear", "Citrus"],
    accent: "#c8a97e",
    accentLight: "#f5ede0",
    duration: "0–15 min",
    svg: (
      <svg viewBox="0 0 160 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <defs>
          <radialGradient id="tg1" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#fff9f0" stopOpacity="1" />
            <stop offset="100%" stopColor="#c8a97e" stopOpacity="0.15" />
          </radialGradient>
          <radialGradient id="tg2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f0e2cc" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#c8a97e" stopOpacity="0.3" />
          </radialGradient>
          <filter id="tblur">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          <linearGradient id="tglass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#f5ede0" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#c8a97e" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="tshine" x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="tneck" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#e8d5b8" />
            <stop offset="50%" stopColor="#fff9f0" />
            <stop offset="100%" stopColor="#c8a97e" />
          </linearGradient>
        </defs>

        {/* Shadow */}
        <ellipse cx="80" cy="190" rx="38" ry="7" fill="#c8a97e" opacity="0.18" filter="url(#tblur)" />

        {/* Body — hexagonal prism facets */}
        <polygon points="80,60 120,80 120,155 80,170 40,155 40,80" fill="url(#tglass)" stroke="#c8a97e" strokeWidth="0.8" />
        <polygon points="80,60 120,80 80,90 40,80" fill="url(#tg1)" stroke="#e8d5b8" strokeWidth="0.5" />
        {/* Right face darker */}
        <polygon points="120,80 120,155 80,170 80,90" fill="#e8d5b8" opacity="0.5" />
        {/* Left face lighter */}
        <polygon points="40,80 80,90 80,170 40,155" fill="#fff9f0" opacity="0.6" />

        {/* Inner liquid */}
        <polygon points="80,95 115,112 115,148 80,160 45,148 45,112" fill="#c8a97e" opacity="0.12" />

        {/* Shine streak */}
        <polygon points="55,85 68,82 72,145 58,150" fill="url(#tshine)" opacity="0.7" />

        {/* Neck */}
        <rect x="66" y="38" width="28" height="24" rx="3" fill="url(#tneck)" stroke="#c8a97e" strokeWidth="0.7" />
        <rect x="66" y="38" width="10" height="24" rx="2" fill="#ffffff" opacity="0.4" />

        {/* Cap */}
        <rect x="60" y="22" width="40" height="18" rx="5" fill="#c8a97e" />
        <rect x="60" y="22" width="14" height="18" rx="4" fill="#ffffff" opacity="0.3" />
        <rect x="62" y="24" width="36" height="3" rx="1.5" fill="#ffffff" opacity="0.5" />

        {/* Floating particles */}
        {[[28,72],[135,95],[22,130],[138,68],[30,110]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r={2.5 - i*0.3} fill="#c8a97e" opacity={0.4 - i*0.05}>
            <animate attributeName="cy" values={`${y};${y-10};${y}`} dur={`${2.5+i*0.4}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values={`${0.4-i*0.05};0.1;${0.4-i*0.05}`} dur={`${2.5+i*0.4}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* Label text on bottle */}
        <text x="80" y="128" textAnchor="middle" fontFamily="serif" fontSize="7" fill="#7a5c3a" letterSpacing="2" opacity="0.8">VERRA</text>
        <text x="80" y="139" textAnchor="middle" fontFamily="serif" fontSize="4.5" fill="#9a7a5a" letterSpacing="1.5" opacity="0.7">TOP NOTE</text>
        <line x1="58" y1="133" x2="74" y2="133" stroke="#c8a97e" strokeWidth="0.5" opacity="0.6" />
        <line x1="86" y1="133" x2="102" y2="133" stroke="#c8a97e" strokeWidth="0.5" opacity="0.6" />
      </svg>
    ),
  },
  {
    title: "Heart Notes",
    label: "02",
    tagline: "True Essence",
    description:
      "Where Verra reveals her soul. A warm, sensuous bloom that unfolds slowly — the signature that defines and captivates.",
    ingredients: ["Jasmine", "White Musk", "Ylang-Ylang", "Lavender"],
    accent: "#9b7fa6",
    accentLight: "#f3eef7",
    duration: "15–60 min",
    svg: (
      <svg viewBox="0 0 160 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <defs>
          <radialGradient id="hg1" cx="40%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#faf5ff" />
            <stop offset="100%" stopColor="#9b7fa6" stopOpacity="0.2" />
          </radialGradient>
          <radialGradient id="hg2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e8dff0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#9b7fa6" stopOpacity="0.3" />
          </radialGradient>
          <filter id="hblur">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          <linearGradient id="hglass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#f3eef7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#9b7fa6" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="hshine" x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="hneck" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#d4c2e0" />
            <stop offset="50%" stopColor="#faf5ff" />
            <stop offset="100%" stopColor="#9b7fa6" />
          </linearGradient>
        </defs>

        {/* Shadow */}
        <ellipse cx="80" cy="190" rx="36" ry="7" fill="#9b7fa6" opacity="0.15" filter="url(#hblur)" />

        {/* Body — sphere / round bottle */}
        <ellipse cx="80" cy="120" rx="42" ry="52" fill="url(#hglass)" stroke="#c4aad4" strokeWidth="0.8" />
        {/* Depth shading */}
        <ellipse cx="80" cy="120" rx="42" ry="52" fill="#9b7fa6" opacity="0.07" />
        {/* Right shadow */}
        <ellipse cx="104" cy="125" rx="16" ry="40" fill="#9b7fa6" opacity="0.12" />
        {/* Inner liquid */}
        <ellipse cx="80" cy="128" rx="34" ry="38" fill="#c4aad4" opacity="0.13" />

        {/* Shine */}
        <ellipse cx="62" cy="98" rx="10" ry="16" fill="url(#hshine)" opacity="0.8" />
        <ellipse cx="56" cy="94" rx="4" ry="6" fill="#ffffff" opacity="0.6" />

        {/* Neck */}
        <rect x="68" y="40" width="24" height="26" rx="4" fill="url(#hneck)" stroke="#c4aad4" strokeWidth="0.7" />
        <rect x="68" y="40" width="8" height="26" rx="3" fill="#ffffff" opacity="0.4" />

        {/* Cap — domed */}
        <ellipse cx="80" cy="34" rx="20" ry="10" fill="#9b7fa6" />
        <rect x="60" y="28" width="40" height="12" rx="3" fill="#9b7fa6" />
        <ellipse cx="80" cy="28" rx="20" ry="8" fill="#b89fc8" />
        <ellipse cx="73" cy="26" rx="7" ry="3" fill="#ffffff" opacity="0.35" />

        {/* Floating orbs */}
        {[[25,88],[138,105],[20,145],[140,80],[32,160]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r={3 - i*0.3} fill="#9b7fa6" opacity={0.35 - i*0.04}>
            <animate attributeName="cy" values={`${y};${y-12};${y}`} dur={`${3+i*0.5}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values={`${0.35-i*0.04};0.08;${0.35-i*0.04}`} dur={`${3+i*0.5}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* Label */}
        <text x="80" y="122" textAnchor="middle" fontFamily="serif" fontSize="7" fill="#5a3e70" letterSpacing="2" opacity="0.8">VERRA</text>
        <text x="80" y="133" textAnchor="middle" fontFamily="serif" fontSize="4.5" fill="#7a5a90" letterSpacing="1.5" opacity="0.7">HEART NOTE</text>
        <line x1="56" y1="127" x2="70" y2="127" stroke="#9b7fa6" strokeWidth="0.5" opacity="0.6" />
        <line x1="90" y1="127" x2="104" y2="127" stroke="#9b7fa6" strokeWidth="0.5" opacity="0.6" />
      </svg>
    ),
  },
  {
    title: "Base Notes",
    label: "03",
    tagline: "Lasting Memory",
    description:
      "The whisper that stays long after you leave a room. Rich, resinous, and profoundly warm — the foundation of Verra's legacy.",
    ingredients: ["Amber", "Vanilla", "Sandalwood", "Musk"],
    accent: "#8b6f47",
    accentLight: "#f7f0e6",
    duration: "6–12 hrs",
    svg: (
      <svg viewBox="0 0 160 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        <defs>
          <radialGradient id="bg1" cx="40%" cy="25%" r="70%">
            <stop offset="0%" stopColor="#fdf5e8" />
            <stop offset="100%" stopColor="#8b6f47" stopOpacity="0.2" />
          </radialGradient>
          <linearGradient id="bglass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#f7f0e6" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#8b6f47" stopOpacity="0.45" />
          </linearGradient>
          <linearGradient id="bshine" x1="0" y1="0" x2="0.25" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="bneck" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#c4a47a" />
            <stop offset="50%" stopColor="#fdf5e8" />
            <stop offset="100%" stopColor="#8b6f47" />
          </linearGradient>
          <filter id="bblur">
            <feGaussianBlur stdDeviation="3.5" />
          </filter>
          <linearGradient id="bface1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fdf5e8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#c4a47a" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="bface2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e8d4b4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8b6f47" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Shadow */}
        <ellipse cx="80" cy="190" rx="40" ry="7" fill="#8b6f47" opacity="0.2" filter="url(#bblur)" />

        {/* Body — tall rectangular Art Deco pillar */}
        {/* Back face */}
        <rect x="38" y="65" width="84" height="118" rx="2" fill="#c4a47a" opacity="0.3" />
        {/* Front face */}
        <rect x="42" y="62" width="76" height="118" rx="3" fill="url(#bglass)" stroke="#c4a47a" strokeWidth="0.8" />
        {/* Left bevel */}
        <polygon points="42,62 38,65 38,183 42,180" fill="url(#bface1)" opacity="0.6" />
        {/* Top bevel */}
        <polygon points="42,62 118,62 122,65 38,65" fill="#fdf5e8" opacity="0.7" />
        {/* Right shadow */}
        <rect x="106" y="62" width="12" height="118" rx="2" fill="#8b6f47" opacity="0.15" />

        {/* Inner liquid fill */}
        <rect x="50" y="110" width="60" height="62" rx="1" fill="#c4a47a" opacity="0.15" />

        {/* Art Deco vertical grooves */}
        {[58, 68, 78, 88, 98, 108].map((x, i) => (
          <line key={i} x1={x} y1="65" x2={x} y2="178" stroke="#c4a47a" strokeWidth="0.4" opacity="0.4" />
        ))}
        {/* Horizontal Art Deco band */}
        <rect x="42" y="102" width="76" height="2" fill="#c4a47a" opacity="0.5" />
        <rect x="42" y="106" width="76" height="1" fill="#c4a47a" opacity="0.25" />

        {/* Shine */}
        <rect x="48" y="65" width="14" height="112" rx="2" fill="url(#bshine)" opacity="0.65" />
        <rect x="50" y="68" width="5" height="50" rx="1" fill="#ffffff" opacity="0.5" />

        {/* Neck */}
        <rect x="64" y="40" width="32" height="24" rx="3" fill="url(#bneck)" stroke="#c4a47a" strokeWidth="0.7" />
        <rect x="64" y="40" width="10" height="24" rx="2" fill="#ffffff" opacity="0.35" />

        {/* Cap — flat rectangular luxury cap */}
        <rect x="56" y="24" width="48" height="18" rx="4" fill="#8b6f47" />
        <rect x="56" y="24" width="16" height="18" rx="3" fill="#ffffff" opacity="0.25" />
        <rect x="58" y="26" width="44" height="3" rx="1.5" fill="#c4a47a" opacity="0.6" />
        <rect x="58" y="36" width="44" height="2" rx="1" fill="#c4a47a" opacity="0.4" />

        {/* Floating particles */}
        {[[26,75],[138,90],[22,138],[140,72],[28,158]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r={2.2} fill="#8b6f47" opacity={0.3 - i*0.04}>
            <animate attributeName="cy" values={`${y};${y-8};${y}`} dur={`${3.5+i*0.5}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values={`${0.3-i*0.04};0.05;${0.3-i*0.04}`} dur={`${3.5+i*0.5}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* Label area */}
        <rect x="55" y="118" width="50" height="28" rx="1" fill="#ffffff" opacity="0.15" />
        <text x="80" y="131" textAnchor="middle" fontFamily="serif" fontSize="7" fill="#4a3018" letterSpacing="2" opacity="0.85">VERRA</text>
        <text x="80" y="141" textAnchor="middle" fontFamily="serif" fontSize="4" fill="#6a5030" letterSpacing="1.5" opacity="0.75">BASE NOTE</text>
        <line x1="58" y1="136" x2="69" y2="136" stroke="#8b6f47" strokeWidth="0.5" opacity="0.6" />
        <line x1="91" y1="136" x2="102" y2="136" stroke="#8b6f47" strokeWidth="0.5" opacity="0.6" />
      </svg>
    ),
  },
];

const NoteCard = ({ note, index }) => {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: hovered
          ? `linear-gradient(145deg, #ffffff, ${note.accentLight})`
          : "linear-gradient(145deg, #fffcf8, #fdf8f2)",
        border: `1px solid ${hovered ? note.accent : "#e8ddd0"}`,
        borderRadius: "2px",
        padding: "0",
        overflow: "hidden",
        cursor: "default",
        transition: "all 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
        transform: visible
          ? hovered
            ? "translateY(-8px)"
            : "translateY(0)"
          : "translateY(40px)",
        opacity: visible ? 1 : 0,
        transitionDelay: visible ? `${index * 0.15}s` : "0s",
        boxShadow: hovered
          ? `0 32px 64px rgba(0,0,0,0.12), 0 0 0 1px ${note.accent}40`
          : "0 8px 32px rgba(0,0,0,0.06)",
      }}
    >
      {/* Top accent line */}
      <div style={{
        height: "2px",
        background: `linear-gradient(90deg, transparent, ${note.accent}, transparent)`,
        opacity: hovered ? 1 : 0.4,
        transition: "opacity 0.4s",
      }} />

      {/* Number badge */}
      <div style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: "11px",
        letterSpacing: "3px",
        color: note.accent,
        opacity: 0.5,
      }}>
        {note.label}
      </div>

      {/* SVG bottle */}
      <div style={{
        height: "200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px 40px 0",
        transform: hovered ? "scale(1.04)" : "scale(1)",
        transition: "transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
      }}>
        {note.svg}
      </div>

      {/* Content */}
      <div style={{ padding: "24px 32px 32px" }}>
        {/* Tagline */}
        <div style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "10px",
          letterSpacing: "4px",
          color: note.accent,
          textTransform: "uppercase",
          marginBottom: "8px",
          opacity: 0.8,
        }}>
          {note.tagline}
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "22px",
          fontWeight: "400",
          color: "#1a1208",
          letterSpacing: "1px",
          marginBottom: "12px",
          lineHeight: 1.2,
        }}>
          {note.title}
        </h3>

        {/* Divider */}
        <div style={{
          width: hovered ? "48px" : "28px",
          height: "1px",
          background: note.accent,
          marginBottom: "16px",
          transition: "width 0.4s ease",
        }} />

        {/* Description */}
        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "15px",
          lineHeight: "1.8",
          color: "#5c4a32",
          marginBottom: "24px",
          fontStyle: "italic",
        }}>
          {note.description}
        </p>

        {/* Ingredients */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginBottom: "20px",
        }}>
          {note.ingredients.map((item, idx) => (
            <span key={idx} style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "11px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: note.accent,
              border: `1px solid ${note.accent}`,
              borderRadius: "1px",
              padding: "4px 10px",
              opacity: 0.85,
              transition: "all 0.3s",
              background: hovered ? `${note.accent}10` : "transparent",
            }}>
              {item}
            </span>
          ))}
        </div>

        {/* Duration */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}>
          <div style={{
            width: "20px",
            height: "1px",
            background: note.accent,
            opacity: 0.5,
          }} />
          <span style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "11px",
            letterSpacing: "2.5px",
            color: "#8a7060",
            textTransform: "uppercase",
          }}>
            Lasts {note.duration}
          </span>
        </div>
      </div>

      {/* Corner ornament */}
      <svg style={{ position: "absolute", bottom: "12px", right: "12px", opacity: 0.15 }}
        width="24" height="24" viewBox="0 0 24 24">
        <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z"
          fill={note.accent} />
      </svg>
    </div>
  );
};

const Notes = () => {
  const [titleVisible, setTitleVisible] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setTitleVisible(true); },
      { threshold: 0.3 }
    );
    if (titleRef.current) obs.observe(titleRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="notes"
      style={{
        background: "linear-gradient(160deg, #fdfaf5 0%, #f5ece0 50%, #fdfaf5 100%)",
        padding: "120px 48px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background texture lines */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04, pointerEvents: "none" }}
        xmlns="http://www.w3.org/2000/svg">
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={i} x1="0" y1={`${i * 5.5}%`} x2="100%" y2={`${i * 5.5}%`}
            stroke="#8b6f47" strokeWidth="1" />
        ))}
      </svg>

      {/* Decorative corner SVGs */}
      <svg style={{ position: "absolute", top: "40px", left: "40px", opacity: 0.12 }} width="60" height="60" viewBox="0 0 60 60">
        <path d="M0 60 L0 0 L60 0" stroke="#8b6f47" strokeWidth="1" fill="none" />
        <path d="M10 60 L10 10 L60 10" stroke="#8b6f47" strokeWidth="0.5" fill="none" opacity="0.5" />
        <circle cx="0" cy="0" r="4" fill="#c8a97e" />
      </svg>
      <svg style={{ position: "absolute", bottom: "40px", right: "40px", opacity: 0.12, transform: "rotate(180deg)" }} width="60" height="60" viewBox="0 0 60 60">
        <path d="M0 60 L0 0 L60 0" stroke="#8b6f47" strokeWidth="1" fill="none" />
        <path d="M10 60 L10 10 L60 10" stroke="#8b6f47" strokeWidth="0.5" fill="none" opacity="0.5" />
        <circle cx="0" cy="0" r="4" fill="#c8a97e" />
      </svg>

      {/* Header */}
      <div
        ref={titleRef}
        style={{
          textAlign: "center",
          marginBottom: "80px",
          transform: titleVisible ? "translateY(0)" : "translateY(30px)",
          opacity: titleVisible ? 1 : 0,
          transition: "all 0.8s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
      >
        <div style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "11px",
          letterSpacing: "6px",
          color: "#c8a97e",
          textTransform: "uppercase",
          marginBottom: "16px",
        }}>
          The Olfactory Pyramid
        </div>

        <h2 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(32px, 5vw, 56px)",
          fontWeight: "400",
          color: "#1a1208",
          letterSpacing: "2px",
          lineHeight: 1.1,
          marginBottom: "20px",
        }}>
          Fragrance Notes
        </h2>

        {/* Ornamental divider */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px" }}>
          <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, #c8a97e)" }} />
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path d="M8 1 L9.5 6.5 L15 8 L9.5 9.5 L8 15 L6.5 9.5 L1 8 L6.5 6.5 Z" fill="#c8a97e" />
          </svg>
          <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, #c8a97e, transparent)" }} />
        </div>

        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "17px",
          fontStyle: "italic",
          color: "#7a6248",
          marginTop: "20px",
          maxWidth: "480px",
          margin: "20px auto 0",
          lineHeight: 1.8,
        }}>
          Three acts of a single, unforgettable story
        </p>
      </div>

      {/* Cards grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "28px",
        maxWidth: "1100px",
        margin: "0 auto",
      }}>
        {notesData.map((note, i) => (
          <NoteCard key={i} note={note} index={i} />
        ))}
      </div>

      {/* Bottom tagline */}
      <div style={{
        textAlign: "center",
        marginTop: "72px",
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: "13px",
        letterSpacing: "4px",
        color: "#c8a97e",
        textTransform: "uppercase",
        opacity: 0.7,
      }}>
        Maison Verra · Eau de Parfum · 50ml
      </div>
    </section>
  );
};

export default Notes;