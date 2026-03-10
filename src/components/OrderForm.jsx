import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import perfumes from "../data/perfumes";

/* ═══════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════ */
const GOLD   = "#c9a84c";
const GOLD_L = "#f0d080";
const GOLD_D = "#8a6820";
const INK    = "#180809";

/* ═══════════════════════════════════════════
   GRAIN OVERLAY
═══════════════════════════════════════════ */
function Grain() {
  return (
    <svg aria-hidden="true" style={{
      position:"absolute",inset:0,width:"100%",height:"100%",
      pointerEvents:"none",opacity:.018,mixBlendMode:"multiply",zIndex:0,
    }}>
      <filter id="of_grain">
        <feTurbulence type="fractalNoise" baseFrequency=".72" numOctaves="4" stitchTiles="stitch"/>
        <feColorMatrix type="saturate" values="0"/>
      </filter>
      <rect width="100%" height="100%" filter="url(#of_grain)"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════
   FIELD WRAPPER — shared input styling
═══════════════════════════════════════════ */
function Field({ label, children, icon }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
      <label style={{
        fontFamily:"'Cinzel',serif",
        fontSize:".38rem",
        letterSpacing:".38em",
        textTransform:"uppercase",
        color:`${GOLD_D}cc`,
        display:"flex",
        alignItems:"center",
        gap:8,
      }}>
        {icon && <span style={{opacity:.7}}>{icon}</span>}
        {label}
      </label>
      {children}
    </div>
  );
}

/* shared input base style */
const inputStyle = {
  width:"100%",
  fontFamily:"'Cormorant Garamond',serif",
  fontSize:"1rem",
  letterSpacing:".04em",
  color:INK,
  background:"rgba(255,252,240,.82)",
  border:`1px solid ${GOLD}30`,
  borderRadius:2,
  padding:"13px 16px",
  outline:"none",
  transition:"border-color .25s, box-shadow .25s, background .25s",
  boxShadow:`inset 0 1px 3px rgba(0,0,0,.04), 0 1px 0 rgba(255,255,255,.7)`,
  appearance:"none",
  WebkitAppearance:"none",
};

const inputFocusStyle = {
  borderColor:`${GOLD}80`,
  background:"rgba(255,254,248,.96)",
  boxShadow:`inset 0 1px 3px rgba(0,0,0,.04), 0 0 0 3px ${GOLD}14, 0 1px 0 rgba(255,255,255,.7)`,
};

/* ═══════════════════════════════════════════
   FOCUSED INPUT COMPONENT
═══════════════════════════════════════════ */
function StyledInput({ as: As = "input", style: extraStyle, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <As
      {...props}
      onFocus={e => { setFocused(true); props.onFocus?.(e); }}
      onBlur={e => { setFocused(false); props.onBlur?.(e); }}
      style={{
        ...inputStyle,
        ...(focused ? inputFocusStyle : {}),
        ...extraStyle,
      }}
    />
  );
}

/* ═══════════════════════════════════════════
   QUANTITY STEPPER
═══════════════════════════════════════════ */
function QuantityStepper({ value, onChange }) {
  return (
    <div style={{
      display:"flex",
      alignItems:"stretch",
      border:`1px solid ${GOLD}30`,
      borderRadius:2,
      overflow:"hidden",
      background:"rgba(255,252,240,.82)",
      boxShadow:`inset 0 1px 3px rgba(0,0,0,.04), 0 1px 0 rgba(255,255,255,.7)`,
    }}>
      {/* minus */}
      <motion.button
        type="button"
        whileTap={{ scale:.9 }}
        onClick={() => onChange(Math.max(1, value - 1))}
        style={{
          width:44, flexShrink:0,
          background:"transparent",
          border:"none",
          borderRight:`1px solid ${GOLD}22`,
          color:GOLD_D,
          cursor:"pointer",
          fontFamily:"'Cormorant Garamond',serif",
          fontSize:"1.3rem",
          display:"flex",alignItems:"center",justifyContent:"center",
          transition:"background .2s",
        }}>
        −
      </motion.button>

      {/* display */}
      <div style={{
        flex:1,
        display:"flex",alignItems:"center",justifyContent:"center",
        fontFamily:"'Cormorant Garamond',serif",
        fontSize:"1.08rem",
        letterSpacing:".06em",
        color:INK,
        padding:"12px 8px",
        userSelect:"none",
      }}>
        {value}
      </div>

      {/* plus */}
      <motion.button
        type="button"
        whileTap={{ scale:.9 }}
        onClick={() => onChange(value + 1)}
        style={{
          width:44, flexShrink:0,
          background:"transparent",
          border:"none",
          borderLeft:`1px solid ${GOLD}22`,
          color:GOLD_D,
          cursor:"pointer",
          fontFamily:"'Cormorant Garamond',serif",
          fontSize:"1.3rem",
          display:"flex",alignItems:"center",justifyContent:"center",
          transition:"background .2s",
        }}>
        +
      </motion.button>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PERFUME SELECTOR CARDS
═══════════════════════════════════════════ */
const PALETTES = [
  "#c9a84c","#b8896a","#5a8a6a","#5888b0",
  "#a85878","#8a6ab0","#a0784a","#6a9898",
];

function PerfumeSelector({ value, onChange }) {
  const scrollRef = useRef(null);
  const [canScrollLeft,  setCanScrollLeft]  = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => { checkScroll(); }, []);

  return (
    <div style={{ position:"relative" }}>
      {/* Fade hints */}
      {canScrollLeft && (
        <div style={{
          position:"absolute",left:0,top:0,bottom:0,width:32,zIndex:2,
          background:`linear-gradient(to right,rgba(253,248,238,.95),transparent)`,
          pointerEvents:"none",borderRadius:"2px 0 0 2px",
        }}/>
      )}
      {canScrollRight && (
        <div style={{
          position:"absolute",right:0,top:0,bottom:0,width:32,zIndex:2,
          background:`linear-gradient(to left,rgba(253,248,238,.95),transparent)`,
          pointerEvents:"none",borderRadius:"0 2px 2px 0",
        }}/>
      )}

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        style={{
          display:"flex",
          gap:10,
          overflowX:"auto",
          scrollbarWidth:"none",
          msOverflowStyle:"none",
          paddingBottom:4,
          WebkitOverflowScrolling:"touch",
        }}>
        {perfumes.map((p, i) => {
          const accent = PALETTES[i % PALETTES.length];
          const selected = Number(value) === p.id;
          return (
            <motion.button
              key={p.id}
              type="button"
              onClick={() => onChange(p.id)}
              whileHover={{ y:-2 }}
              whileTap={{ scale:.97 }}
              style={{
                flexShrink:0,
                display:"flex",flexDirection:"column",alignItems:"center",
                gap:6,
                padding:"10px 14px 12px",
                borderRadius:2,
                border:`1px solid ${selected ? accent : `${accent}28`}`,
                background: selected
                  ? `linear-gradient(145deg,${accent}18,${accent}08)`
                  : "rgba(255,252,240,.7)",
                cursor:"pointer",
                transition:"border-color .25s,background .25s",
                minWidth:90,
                boxShadow: selected
                  ? `0 4px 18px ${accent}22, inset 0 1px 0 rgba(255,255,255,.6)`
                  : `inset 0 1px 0 rgba(255,255,255,.5)`,
                position:"relative",
                outline:"none",
              }}>

              {/* Mini bottle dot */}
              <div style={{
                width:10, height:10,
                borderRadius:"50%",
                background:accent,
                opacity: selected ? .9 : .4,
                transition:"opacity .25s",
              }}/>

              <span style={{
                fontFamily:"'Cormorant Garamond',serif",
                fontSize:".78rem",
                fontWeight: selected ? 600 : 400,
                color: selected ? accent : `${INK}88`,
                letterSpacing:".03em",
                textAlign:"center",
                lineHeight:1.2,
                whiteSpace:"nowrap",
              }}>
                {p.name}
              </span>

              <span style={{
                fontFamily:"'Cinzel',serif",
                fontSize:".34rem",
                letterSpacing:".28em",
                color: selected ? accent : `${INK}50`,
                transition:"color .25s",
              }}>
                {p.price}
              </span>

              {/* Selected checkmark */}
              {selected && (
                <motion.div
                  initial={{scale:0}} animate={{scale:1}}
                  style={{
                    position:"absolute",top:6,right:6,
                    width:14,height:14,
                    borderRadius:"50%",
                    background:accent,
                    display:"flex",alignItems:"center",justifyContent:"center",
                  }}>
                  <svg width="8" height="8" viewBox="0 0 8 8">
                    <polyline points="1.5,4 3,5.5 6.5,2.5"
                      stroke="#fff" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
                  </svg>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SUCCESS TOAST
═══════════════════════════════════════════ */
function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3600);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      initial={{opacity:0,y:24,scale:.95}}
      animate={{opacity:1,y:0,scale:1}}
      exit={{opacity:0,y:-16,scale:.95}}
      style={{
        position:"fixed",bottom:28,left:"50%",transform:"translateX(-50%)",
        zIndex:9999,
        background:`linear-gradient(135deg,${GOLD_L}18,rgba(255,252,240,.98))`,
        border:`1px solid ${GOLD}60`,
        borderRadius:2,
        padding:"14px 28px",
        boxShadow:`0 16px 48px rgba(0,0,0,.14),0 0 0 1px ${GOLD}22`,
        display:"flex",alignItems:"center",gap:14,
        backdropFilter:"blur(12px)",
        WebkitBackdropFilter:"blur(12px)",
        whiteSpace:"nowrap",
      }}>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="8" stroke={GOLD} strokeWidth="1.4"/>
        <polyline points="5,9.5 7.5,12 13,6.5"
          stroke={GOLD} strokeWidth="1.6" fill="none" strokeLinecap="round"/>
      </svg>
      <span style={{
        fontFamily:"'Cormorant Garamond',serif",
        fontSize:".95rem",
        fontStyle:"italic",
        color:GOLD_D,
        letterSpacing:".04em",
      }}>
        {message}
      </span>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   CSS
═══════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;}

.of-section{
  position:relative;
  width:100%;
  padding: clamp(72px,9vw,120px) clamp(16px,5vw,80px);
  background: linear-gradient(148deg,#fdf8ee 0%,#f5e8d0 45%,#fef6ea 80%,#f0e0c8 100%);
  overflow:hidden;
}

.of-card{
  position:relative;
  max-width:620px;
  margin:0 auto;
  background: linear-gradient(155deg,rgba(255,254,248,.92),rgba(253,246,230,.88));
  border:1px solid rgba(201,168,76,.22);
  border-radius:4px;
  padding: clamp(28px,5vw,52px) clamp(22px,5vw,48px);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  box-shadow:
    0 32px 80px rgba(0,0,0,.09),
    0 8px 24px rgba(201,168,76,.10),
    inset 0 1px 0 rgba(255,255,255,.85);
}

.of-form{ display:flex; flex-direction:column; gap:24px; }

/* hide scrollbar in selector */
.of-card ::-webkit-scrollbar{ display:none; }

/* select arrow */
.of-select-wrap{ position:relative; }
.of-select-wrap::after{
  content:'';
  position:absolute;
  right:14px; top:50%; transform:translateY(-50%);
  width:0; height:0;
  border-left:4px solid transparent;
  border-right:4px solid transparent;
  border-top:5px solid ${GOLD_D};
  opacity:.6;
  pointer-events:none;
}

@media(max-width:480px){
  .of-card{ padding:24px 16px 32px; }
  .of-form{ gap:18px; }
}
`;

/* ═══════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════ */
export default function OrderForm() {
  const [form, setForm] = useState({
    name:"", email:"", productId:1, quantity:1, message:"",
  });
  const [toast, setToast] = useState(false);

  const perfume = perfumes.find(p => p.id === Number(form.productId)) || perfumes[0];
  const price   = Number(String(perfume.price).replace(/[^0-9.]/g,""));
  const total   = price * form.quantity;
  const palette = PALETTES[(perfume.id - 1) % PALETTES.length];

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: name === "quantity" ? Number(value) : value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const msg =
`Hello Maison Verra, I'd like to place an order:

✦ Name: ${form.name}
✦ Email: ${form.email}
✦ Fragrance: ${perfume.name}
✦ Quantity: ${form.quantity}
✦ Total: $${total.toLocaleString()}
${form.message ? `✦ Note: ${form.message}` : ""}`;

    window.open(`https://wa.me/2348103558837?text=${encodeURIComponent(msg)}`, "_blank");
    setToast(true);
  };

  return (
    <section className="of-section" id="contact">
      <style>{CSS}</style>

      {/* Background orbs */}
      <div style={{
        position:"absolute",top:"-12%",right:"-6%",
        width:"clamp(240px,36vw,480px)",height:"clamp(240px,36vw,480px)",
        borderRadius:"50%",
        background:`radial-gradient(circle,${GOLD}0e 0%,transparent 68%)`,
        filter:"blur(60px)",pointerEvents:"none",zIndex:0,
      }}/>
      <div style={{
        position:"absolute",bottom:"-8%",left:"-4%",
        width:"clamp(180px,26vw,360px)",height:"clamp(180px,26vw,360px)",
        borderRadius:"50%",
        background:`radial-gradient(circle,${GOLD_L}14 0%,transparent 70%)`,
        filter:"blur(52px)",pointerEvents:"none",zIndex:0,
      }}/>

      <Grain/>

      <div style={{position:"relative",zIndex:2,maxWidth:1400,margin:"0 auto"}}>

        {/* ── Section header ── */}
        <motion.div
          initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
          viewport={{once:true,margin:"-60px"}}
          transition={{duration:.7,ease:[.16,1,.3,1]}}
          style={{textAlign:"center",marginBottom:"clamp(36px,5vw,64px)"}}>

          <div style={{
            display:"flex",alignItems:"center",justifyContent:"center",gap:14,
            marginBottom:16,
          }}>
            <div style={{width:32,height:1.5,background:`linear-gradient(to right,transparent,${GOLD})`}}/>
            <span style={{
              fontFamily:"'Cinzel',serif",
              fontSize:"clamp(.38rem,.85vw,.48rem)",
              letterSpacing:".52em",
              color:GOLD,
              textTransform:"uppercase",
            }}>
              Maison Verra
            </span>
            <div style={{width:32,height:1.5,background:`linear-gradient(to left,transparent,${GOLD})`}}/>
          </div>

          <h2 style={{
            fontFamily:"'Cormorant Garamond',serif",
            fontSize:"clamp(2rem,5.5vw,4rem)",
            fontWeight:300,
            letterSpacing:"-.02em",
            lineHeight:.95,
            color:INK,
            marginBottom:14,
          }}>
            Reserve Your<br/>
            <em style={{fontStyle:"italic",color:GOLD_D}}>Fragrance</em>
          </h2>

          <p style={{
            fontFamily:"'Cormorant Garamond',serif",
            fontStyle:"italic",
            fontSize:"clamp(.88rem,1.6vw,1.08rem)",
            color:`${INK}60`,
            letterSpacing:".05em",
            maxWidth:420,
            margin:"0 auto",
            lineHeight:1.7,
          }}>
            Complete your order below and we'll connect you directly via WhatsApp.
          </p>

          <div style={{
            width:"clamp(48px,10vw,100px)",height:1,
            background:`linear-gradient(to right,transparent,${GOLD}60,transparent)`,
            margin:"18px auto 0",
          }}/>
        </motion.div>

        {/* ── Form card ── */}
        <motion.div
          className="of-card"
          initial={{opacity:0,y:32}} whileInView={{opacity:1,y:0}}
          viewport={{once:true,margin:"-40px"}}
          transition={{duration:.8,delay:.1,ease:[.16,1,.3,1]}}>

          {/* Corner ornaments */}
          {[
            {top:12,left:12},
            {top:12,right:12,transform:"scaleX(-1)"},
            {bottom:12,left:12,transform:"scaleY(-1)"},
            {bottom:12,right:12,transform:"scale(-1,-1)"},
          ].map((pos,i)=>(
            <svg key={i} width="18" height="18" viewBox="0 0 18 18"
              style={{position:"absolute",...pos,opacity:.3,zIndex:2,pointerEvents:"none"}}>
              <path d="M0 18 L0 0 L18 0" stroke={GOLD} strokeWidth="1.2" fill="none"/>
              <circle cx="0" cy="0" r="2" fill={GOLD}/>
            </svg>
          ))}

          <Grain/>

          <form className="of-form" onSubmit={handleSubmit}>

            {/* ── Personal info row ── */}
            <div style={{
              display:"grid",
              gridTemplateColumns:"1fr 1fr",
              gap:16,
            }}
              className="of-name-email">
              <Field label="Full Name" icon={
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="4" r="2.5" stroke={GOLD} strokeWidth="1"/>
                  <path d="M1 11c0-2.5 2-4 5-4s5 1.5 5 4" stroke={GOLD} strokeWidth="1" strokeLinecap="round"/>
                </svg>
              }>
                <StyledInput
                  type="text" name="name"
                  placeholder="Your full name"
                  required
                  value={form.name}
                  onChange={handleChange}/>
              </Field>

              <Field label="Email" icon={
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <rect x="1" y="3" width="10" height="7" rx="1.2" stroke={GOLD} strokeWidth="1"/>
                  <path d="M1 4l5 3.5L11 4" stroke={GOLD} strokeWidth="1" strokeLinecap="round"/>
                </svg>
              }>
                <StyledInput
                  type="email" name="email"
                  placeholder="your@email.com"
                  required
                  value={form.email}
                  onChange={handleChange}/>
              </Field>
            </div>

            {/* ── Fragrance selector ── */}
            <Field label="Select Fragrance" icon={
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1v2M4 2c0 1.5 1 2.5 2 3.5S8 8 8 10H4c0-2 1-3 2-4S6 3.5 6 2z"
                  stroke={GOLD} strokeWidth="1" strokeLinecap="round"/>
                <ellipse cx="6" cy="10.5" rx="3" ry=".8" stroke={GOLD} strokeWidth=".8"/>
              </svg>
            }>
              <PerfumeSelector
                value={form.productId}
                onChange={id => setForm(f => ({...f, productId:id}))}/>
            </Field>

            {/* ── Quantity + price row ── */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
              <Field label="Quantity" icon={
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <rect x="1.5" y="1.5" width="9" height="9" rx="1" stroke={GOLD} strokeWidth="1"/>
                  <path d="M4 6h4M6 4v4" stroke={GOLD} strokeWidth="1" strokeLinecap="round"/>
                </svg>
              }>
                <QuantityStepper
                  value={form.quantity}
                  onChange={q => setForm(f => ({...f, quantity:q}))}/>
              </Field>

              {/* Selected fragrance info */}
              <div style={{
                display:"flex",flexDirection:"column",
                justifyContent:"flex-end",
                padding:"10px 14px",
                background:`linear-gradient(135deg,${palette}10,${palette}06)`,
                border:`1px solid ${palette}28`,
                borderRadius:2,
                gap:4,
              }}>
                <div style={{
                  fontFamily:"'Cinzel',serif",
                  fontSize:".34rem",
                  letterSpacing:".3em",
                  color:`${palette}99`,
                  textTransform:"uppercase",
                }}>
                  Selected
                </div>
                <div style={{
                  fontFamily:"'Cormorant Garamond',serif",
                  fontSize:".92rem",
                  fontWeight:600,
                  color:INK,
                  letterSpacing:".03em",
                  lineHeight:1.2,
                }}>
                  {perfume.name}
                </div>
                <div style={{
                  fontFamily:"'Cormorant Garamond',serif",
                  fontStyle:"italic",
                  fontSize:".78rem",
                  color:palette,
                }}>
                  {perfume.notes?.split(",")[0]}
                </div>
              </div>
            </div>

            {/* ── Message ── */}
            <Field label="Special Request" icon={
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <rect x="1" y="2" width="10" height="8" rx="1.2" stroke={GOLD} strokeWidth="1"/>
                <line x1="3" y1="5" x2="9" y2="5" stroke={GOLD} strokeWidth=".9" strokeLinecap="round"/>
                <line x1="3" y1="7.5" x2="7" y2="7.5" stroke={GOLD} strokeWidth=".9" strokeLinecap="round"/>
              </svg>
            }>
              <StyledInput
                as="textarea" name="message"
                placeholder="Gift wrapping, special instructions, or questions…"
                rows={3}
                value={form.message}
                onChange={handleChange}
                style={{resize:"vertical",minHeight:88,lineHeight:1.7}}/>
            </Field>

            {/* ── Total ── */}
            <div style={{
              display:"flex",alignItems:"center",
              justifyContent:"space-between",
              padding:"16px 20px",
              background:`linear-gradient(135deg,${GOLD}0c,${GOLD}06)`,
              border:`1px solid ${GOLD}28`,
              borderRadius:2,
            }}>
              <div>
                <div style={{
                  fontFamily:"'Cinzel',serif",
                  fontSize:".36rem",
                  letterSpacing:".4em",
                  color:`${GOLD_D}88`,
                  textTransform:"uppercase",
                  marginBottom:4,
                }}>
                  Order Total
                </div>
                <div style={{
                  fontFamily:"'Cormorant Garamond',serif",
                  fontSize:".84rem",
                  color:`${INK}60`,
                  fontStyle:"italic",
                }}>
                  {form.quantity} × {perfume.name}
                </div>
              </div>
              <div style={{
                fontFamily:"'Cormorant Garamond',serif",
                fontSize:"clamp(1.6rem,3.5vw,2.2rem)",
                fontWeight:600,
                color:GOLD_D,
                letterSpacing:"-.01em",
              }}>
                ${total.toLocaleString()}
              </div>
            </div>

            {/* ── Submit ── */}
            <motion.button
              type="submit"
              whileHover={{
                boxShadow:`0 12px 40px ${GOLD}40, 0 4px 16px rgba(0,0,0,.12)`,
                y:-2,
              }}
              whileTap={{ scale:.97 }}
              style={{
                width:"100%",
                fontFamily:"'Cinzel',serif",
                fontSize:"clamp(.44rem,.9vw,.56rem)",
                letterSpacing:".44em",
                textTransform:"uppercase",
                padding:"17px 32px",
                border:`1px solid ${GOLD}88`,
                borderRadius:2,
                background:`linear-gradient(135deg,${GOLD_L}38,${GOLD}28,${GOLD_D}18)`,
                color:GOLD_D,
                cursor:"pointer",
                transition:"border-color .25s",
                boxShadow:`0 4px 20px ${GOLD}1e, inset 0 1px 0 rgba(255,255,255,.6)`,
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                gap:14,
                touchAction:"manipulation",
              }}>
              {/* WhatsApp icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill={GOLD_D} opacity=".85">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.555 4.122 1.528 5.855L.057 23.572a.5.5 0 00.614.664l5.86-1.537A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.741 9.741 0 01-5.096-1.434l-.363-.217-3.765.988 1.006-3.659-.238-.379A9.714 9.714 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
              </svg>
              Place Order via WhatsApp
            </motion.button>

          </form>

          {/* ── Divider ── */}
          <div style={{
            display:"flex",alignItems:"center",gap:12,
            margin:"clamp(24px,4vw,40px) 0 clamp(20px,3.5vw,34px)",
          }}>
            <div style={{flex:1,height:1,background:`linear-gradient(to right,${GOLD}30,transparent)`}}/>
            <svg width="14" height="14" viewBox="0 0 14 14">
              <path d="M7 1 L8.5 5.5 L13 7 L8.5 8.5 L7 13 L5.5 8.5 L1 7 L5.5 5.5 Z"
                fill={GOLD} opacity=".5"/>
            </svg>
            <div style={{flex:1,height:1,background:`linear-gradient(to left,${GOLD}30,transparent)`}}/>
          </div>

          {/* ── Contact info ── */}
          <div style={{textAlign:"center"}}>
            <div style={{
              fontFamily:"'Cinzel',serif",
              fontSize:".42rem",
              letterSpacing:".44em",
              color:GOLD,
              textTransform:"uppercase",
              marginBottom:18,
            }}>
              Need Assistance?
            </div>

            <div style={{
              display:"grid",
              gridTemplateColumns:"1fr 1fr",
              gap:12,
              textAlign:"left",
            }}>
              {[
                { icon:"📞", label:"Phone", value:"+1 (212) 555-9876" },
                { icon:"📧", label:"Email", value:"support@verraperfume.com" },
                { icon:"📍", label:"Location", value:"New York, NY, USA" },
                { icon:"⏰", label:"Hours", value:"Mon – Sat, 10AM – 7PM" },
              ].map(({icon,label,value},i)=>(
                <div key={i} style={{
                  display:"flex",alignItems:"flex-start",gap:10,
                  padding:"10px 14px",
                  background:"rgba(255,252,240,.6)",
                  border:`1px solid ${GOLD}18`,
                  borderRadius:2,
                }}>
                  <span style={{fontSize:".9rem",flexShrink:0,marginTop:1}}>{icon}</span>
                  <div>
                    <div style={{
                      fontFamily:"'Cinzel',serif",
                      fontSize:".3rem",
                      letterSpacing:".3em",
                      color:`${GOLD_D}88`,
                      textTransform:"uppercase",
                      marginBottom:2,
                    }}>
                      {label}
                    </div>
                    <div style={{
                      fontFamily:"'Cormorant Garamond',serif",
                      fontSize:".8rem",
                      color:`${INK}80`,
                      letterSpacing:".02em",
                      lineHeight:1.4,
                    }}>
                      {value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </motion.div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <Toast
            message="Redirecting to WhatsApp — your order is ready ✦"
            onClose={() => setToast(false)}/>
        )}
      </AnimatePresence>
    </section>
  );
}