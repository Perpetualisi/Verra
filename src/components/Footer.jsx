import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════
   TOKENS
═══════════════════════════════════════════ */
const GOLD   = "#c9a84c";
const GOLD_L = "#f0d080";
const GOLD_D = "#8a6820";

/* ═══════════════════════════════════════════
   GRAIN
═══════════════════════════════════════════ */
function Grain() {
  return (
    <svg aria-hidden="true" style={{
      position:"absolute",inset:0,width:"100%",height:"100%",
      pointerEvents:"none",opacity:.025,mixBlendMode:"multiply",zIndex:0,
    }}>
      <filter id="ft_grain">
        <feTurbulence type="fractalNoise" baseFrequency=".72" numOctaves="4" stitchTiles="stitch"/>
        <feColorMatrix type="saturate" values="0"/>
      </filter>
      <rect width="100%" height="100%" filter="url(#ft_grain)"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════
   3D BOTTLE SVG
═══════════════════════════════════════════ */
function FooterBottle() {
  return (
    <svg viewBox="0 0 120 260" width="100%" height="100%" fill="none">
      <defs>
        <linearGradient id="ft_glass" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#fffaee" stopOpacity=".96"/>
          <stop offset="18%"  stopColor="#f0d080" stopOpacity=".58"/>
          <stop offset="50%"  stopColor="#b05c10" stopOpacity=".26"/>
          <stop offset="82%"  stopColor="#f0d080" stopOpacity=".60"/>
          <stop offset="100%" stopColor="#fffaee" stopOpacity=".94"/>
        </linearGradient>
        <linearGradient id="ft_liquid" x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%"   stopColor="#c9a84c" stopOpacity=".5"/>
          <stop offset="100%" stopColor="#b05c10" stopOpacity=".78"/>
        </linearGradient>
        <linearGradient id="ft_cap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#fffbe8"/>
          <stop offset="45%"  stopColor="#f0d080"/>
          <stop offset="100%" stopColor="#c9a84c"/>
        </linearGradient>
        <linearGradient id="ft_gold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#fffbe8"/>
          <stop offset="32%"  stopColor="#f0d080"/>
          <stop offset="64%"  stopColor="#ffe97a"/>
          <stop offset="100%" stopColor="#f0d080"/>
        </linearGradient>
        <linearGradient id="ft_shine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity=".85"/>
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
        </linearGradient>
        <radialGradient id="ft_glow" cx="50%" cy="80%" r="55%">
          <stop offset="0%"   stopColor="#f0d080" stopOpacity=".22"/>
          <stop offset="100%" stopColor="#f0d080" stopOpacity="0"/>
        </radialGradient>
        <filter id="ft_shadow">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#b05c10" floodOpacity=".20"/>
        </filter>
      </defs>
      <ellipse cx="60" cy="220" rx="44" ry="14" fill="url(#ft_glow)"/>
      <g filter="url(#ft_shadow)">
        <polygon points="34,112 26,118 24,192 26,208 60,215 94,208 96,192 94,118 86,112"
          fill="url(#ft_liquid)" opacity=".82"/>
        <polygon points="32,92 24,112 22,194 24,212 60,220 96,212 98,194 96,112 88,92"
          fill="url(#ft_glass)" stroke="#f0d08044" strokeWidth=".8"/>
        <polygon points="32,92 44,95 36,114 36,204 24,212 22,194 24,112" fill="rgba(0,0,0,.06)"/>
        <polygon points="88,92 84,95 84,204 96,212 98,194 96,112" fill="rgba(255,255,255,.12)"/>
        <polygon points="32,92 88,92 86,97 34,97" fill="url(#ft_gold)" opacity=".92"/>
        <polygon points="24,202 96,202 98,210 22,210" fill="url(#ft_gold)" opacity=".78"/>
        {[42,50,58,66,74,82].map((x,i)=>(
          <line key={i} x1={x} y1="95" x2={x} y2="203"
            stroke="#c9a84c" strokeWidth=".35" opacity=".28"/>
        ))}
        <rect x="38" y="116" width="44" height="72" rx="1.2"
          fill="rgba(255,248,220,.18)" stroke="#c9a84c40" strokeWidth=".6"/>
        <polygon points="60,126 65,131 60,136 55,131"
          fill="none" stroke="#c9a84c80" strokeWidth=".7"/>
        <polygon points="60,129 63,131 60,133 57,131" fill="#c9a84c25"/>
        <text x="60" y="152" textAnchor="middle" fill="#c9a84cdd"
          style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"7px",fontWeight:700,letterSpacing:"3px"}}>
          VERRA
        </text>
        <line x1="40" y1="157" x2="80" y2="157" stroke="#c9a84c35" strokeWidth=".5"/>
        <text x="60" y="165" textAnchor="middle" fill="#c9a84c70"
          style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"3.5px",letterSpacing:"2px"}}>
          EAU DE PARFUM
        </text>
        <polygon points="44,66 76,66 80,71 80,93 40,93 40,71"
          fill="url(#ft_cap)" stroke="#c9a84c48" strokeWidth=".7"/>
        <polygon points="44,66 76,66 74,71 46,71" fill="rgba(255,255,255,.32)"/>
        <rect x="40" y="88" width="40" height="3.5" fill="url(#ft_gold)"/>
        <rect x="40" y="66" width="40" height="2.5" fill="url(#ft_gold)"/>
        <polygon points="42,36 78,36 82,41 82,68 38,68 38,41"
          fill="url(#ft_cap)" stroke="#c9a84c58" strokeWidth=".8"/>
        <polygon points="42,36 78,36 76,41 44,41" fill="rgba(255,255,255,.36)"/>
        <rect x="38" y="48" width="44" height="1.8" fill="url(#ft_gold)"/>
        <rect x="38" y="62" width="44" height="1.8" fill="url(#ft_gold)"/>
        <rect x="38" y="32" width="44" height="5" rx="1" fill="url(#ft_gold)" opacity=".96"/>
        <polygon points="26,113 30,113 28,204 24,204" fill="url(#ft_shine)" opacity=".5"/>
      </g>
      <motion.rect x="25" y="110" width="2.8" height="70" rx="1.5"
        fill="rgba(255,255,255,.38)"
        animate={{opacity:[.15,.60,.15],y:[0,8,0]}}
        transition={{duration:5,repeat:Infinity,ease:"easeInOut"}}/>
      <motion.ellipse cx="60" cy="224" rx="28" ry="5"
        fill="#c9a84c" opacity=".12"
        animate={{scaleX:[1,1.1,1],opacity:[.08,.18,.08]}}
        style={{transformOrigin:"60px 224px"}}
        transition={{duration:5,repeat:Infinity,ease:"easeInOut"}}/>
    </svg>
  );
}

/* ═══════════════════════════════════════════
   SCENE
═══════════════════════════════════════════ */
function FooterScene() {
  return (
    <div style={{position:"relative",width:"100%",height:"100%"}}>
      <motion.div animate={{y:[0,-10,0]}}
        transition={{duration:6,repeat:Infinity,ease:"easeInOut"}}
        style={{width:"100%",height:"100%"}}>
        <FooterBottle/>
      </motion.div>
      <motion.div animate={{rotate:360}}
        transition={{duration:28,repeat:Infinity,ease:"linear"}}
        style={{position:"absolute",inset:"10%",borderRadius:"50%",
          border:`1px dashed ${GOLD}20`,pointerEvents:"none"}}/>
      <motion.div animate={{rotate:-360}}
        transition={{duration:18,repeat:Infinity,ease:"linear"}}
        style={{position:"absolute",inset:"22%",borderRadius:"50%",
          border:`1px dashed ${GOLD}14`,pointerEvents:"none"}}/>
      <motion.div animate={{scale:[1,1.2,1],opacity:[.08,.22,.08]}}
        transition={{duration:5,repeat:Infinity,ease:"easeInOut"}}
        style={{position:"absolute",inset:"20%",borderRadius:"50%",
          background:`radial-gradient(circle,${GOLD}30 0%,transparent 70%)`,
          filter:"blur(14px)",pointerEvents:"none"}}/>
      {[
        {top:"14%",left:"8%",dur:3.2,delay:0},
        {top:"28%",right:"6%",dur:4.1,delay:.5},
        {top:"62%",left:"4%",dur:3.8,delay:1.1},
        {top:"72%",right:"10%",dur:5.0,delay:.3},
        {top:"8%",right:"18%",dur:4.4,delay:.8},
        {top:"80%",left:"22%",dur:3.5,delay:1.5},
      ].map(({dur,delay,...pos},i)=>(
        <motion.div key={i}
          style={{position:"absolute",...pos,
            width:i%2===0?5:3.5,height:i%2===0?5:3.5,
            borderRadius:"50%",background:GOLD}}
          animate={{opacity:[0,.7,0],y:[0,-12,0]}}
          transition={{duration:dur,repeat:Infinity,ease:"easeInOut",delay}}/>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   SOCIAL ICONS
═══════════════════════════════════════════ */
const IconInsta = ()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none">
  <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="currentColor" strokeWidth="1.8"/>
  <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8"/>
  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>
</svg>;
const IconFB = ()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none">
  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
    stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
</svg>;
const IconX = ()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none">
  <path d="M20 4H15l-11 16h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M4 4l16 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
</svg>;

const SOCIAL = [
  {Icon:IconInsta, label:"Instagram", href:"#"},
  {Icon:IconFB,    label:"Facebook",  href:"#"},
  {Icon:IconX,     label:"Twitter",   href:"#"},
];

const NAV = [
  {label:"Home",       href:"#home"},
  {label:"Collection", href:"#collection"},
  {label:"Notes",      href:"#notes"},
  {label:"About",      href:"#about"},
  {label:"Contact",    href:"#contact"},
];

/* ═══════════════════════════════════════════
   NEWSLETTER
═══════════════════════════════════════════ */
function Newsletter() {
  const [email,setEmail]     = useState("");
  const [sent,setSent]       = useState(false);
  const [focused,setFocused] = useState(false);

  const submit = e => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setTimeout(()=>{setSent(false);setEmail("");},4000);
  };

  return (
    <form onSubmit={submit} style={{marginTop:10}}>
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div key="ok"
            initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0}}
            style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",
              fontSize:".88rem",color:GOLD,letterSpacing:".06em",
              padding:"12px 0",display:"flex",alignItems:"center",gap:8}}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke={GOLD} strokeWidth="1.2"/>
              <polyline points="4.5,8.5 7,11 11.5,5.5"
                stroke={GOLD} strokeWidth="1.4" fill="none" strokeLinecap="round"/>
            </svg>
            Thank you for subscribing.
          </motion.div>
        ) : (
          <motion.div key="inp"
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            style={{display:"flex",
              border:`1px solid ${focused?GOLD+"70":GOLD+"28"}`,
              borderRadius:2,overflow:"hidden",
              background:"rgba(255,252,240,.06)",
              transition:"border-color .25s",
              boxShadow:focused?`0 0 0 3px ${GOLD}12`:"none"}}>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
              onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
              placeholder="Your email" required
              style={{flex:1,minWidth:0,fontFamily:"'Cormorant Garamond',serif",
                fontSize:".88rem",letterSpacing:".04em",
                color:"rgba(255,248,220,.75)",background:"transparent",
                border:"none",outline:"none",padding:"11px 12px"}}/>
            <motion.button type="submit" whileTap={{scale:.94}}
              style={{fontFamily:"'Cinzel',serif",fontSize:".32rem",letterSpacing:".3em",
                textTransform:"uppercase",padding:"11px 13px",
                background:"transparent",border:"none",
                borderLeft:`1px solid ${GOLD}28`,
                color:GOLD_D,cursor:"pointer",whiteSpace:"nowrap",
                flexShrink:0,touchAction:"manipulation"}}>
              Join
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

/* ═══════════════════════════════════════════
   COLUMN HEADING
═══════════════════════════════════════════ */
const ColHead = ({children})=>(
  <div style={{fontFamily:"'Cinzel',serif",
    fontSize:"clamp(.28rem,.65vw,.38rem)",
    letterSpacing:".44em",color:GOLD,textTransform:"uppercase",marginBottom:16}}>
    {children}
  </div>
);

/* ═══════════════════════════════════════════
   CSS
═══════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;}

.ft-root{
  position:relative;overflow:hidden;width:100%;
  background:linear-gradient(148deg,#1a0d06 0%,#120a04 50%,#1e1008 100%);
  padding:clamp(48px,7vw,100px) clamp(16px,5vw,72px) 0;
  font-family:'Cormorant Garamond',serif;
}

/* BRAND STRIP — always a horizontal flex row */
.ft-brand{
  position:relative;z-index:2;
  max-width:1300px;margin:0 auto clamp(28px,5vw,56px);
  display:flex;align-items:center;
  gap:clamp(10px,3vw,36px);
}
.ft-bottle{
  width:clamp(68px,13vw,120px);
  height:clamp(140px,27vw,240px);
  flex-shrink:0;
}
.ft-brand-copy{flex:1;min-width:0;}

/* GRID: 4 col desktop → 2 col tablet → 2 col mobile (newsletter spans full) */
.ft-grid{
  position:relative;z-index:2;
  max-width:1300px;margin:0 auto;
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:clamp(18px,3vw,44px);
  align-items:start;
}
@media(max-width:860px){
  .ft-grid{grid-template-columns:repeat(2,1fr);gap:clamp(16px,4vw,32px);}
}
@media(max-width:480px){
  .ft-grid{grid-template-columns:1fr 1fr;gap:18px 12px;}
  .ft-span2{grid-column:1/-1;}
}

/* BOTTOM BAR */
.ft-bottom{
  position:relative;z-index:2;
  max-width:1300px;margin:clamp(32px,5vw,60px) auto 0;
  border-top:1px solid rgba(201,168,76,.14);
  padding:16px 0 24px;
  display:flex;align-items:center;justify-content:space-between;
  flex-wrap:wrap;gap:8px;
}
@media(max-width:560px){
  .ft-bottom{flex-direction:column;align-items:center;text-align:center;}
  .ft-orn{display:none;}
}

/* NAV LINKS */
.ft-lnk{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(.8rem,1.4vw,.9rem);
  letter-spacing:.06em;
  color:rgba(255,248,220,.42);
  text-decoration:none;
  display:block;padding:5px 0;
  transition:color .24s,padding-left .24s;
  position:relative;
}
.ft-lnk:hover{color:#c9a84c;padding-left:7px;}
.ft-lnk::before{
  content:'';position:absolute;left:0;top:50%;transform:translateY(-50%);
  width:0;height:1px;background:#c9a84c;transition:width .24s;
}
.ft-lnk:hover::before{width:4px;}
@media(max-width:640px){.ft-lnk{padding:7px 0;}}
`;

/* ═══════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════ */
export default function Footer() {
  return (
    <footer className="ft-root">
      <style>{CSS}</style>

      {/* Ambient glow */}
      <div style={{position:"absolute",top:"-20%",left:"50%",transform:"translateX(-50%)",
        width:"70vw",height:"70vw",borderRadius:"50%",
        background:`radial-gradient(circle,${GOLD}08 0%,transparent 65%)`,
        filter:"blur(80px)",pointerEvents:"none",zIndex:0}}/>

      {/* Horizontal shimmer lines */}
      {[0,1,2,3,4].map(i=>(
        <div key={i} style={{position:"absolute",left:0,right:0,top:`${18+i*18}%`,height:1,
          background:`linear-gradient(to right,transparent,${GOLD}0a ${30+i*8}%,${GOLD}10,transparent)`,
          pointerEvents:"none",zIndex:0}}/>
      ))}

      <Grain/>

      {/* ══ BRAND STRIP ══ */}
      <div className="ft-brand">
        <motion.div className="ft-bottle"
          initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}}
          viewport={{once:true}} transition={{duration:.8,ease:[.16,1,.3,1]}}>
          <FooterScene/>
        </motion.div>

        <motion.div className="ft-brand-copy"
          initial={{opacity:0,x:-14}} whileInView={{opacity:1,x:0}}
          viewport={{once:true}} transition={{duration:.7,delay:.12}}>
          <div style={{fontFamily:"'Cinzel',serif",
            fontSize:"clamp(.3rem,.7vw,.42rem)",
            letterSpacing:".52em",color:`${GOLD}88`,textTransform:"uppercase",marginBottom:4}}>
            Maison
          </div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",
            fontSize:"clamp(1.7rem,4.5vw,3.2rem)",fontWeight:300,
            letterSpacing:"-.01em",lineHeight:.9,color:"rgba(255,248,220,.92)"}}>
            Verra
          </div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",
            fontSize:"clamp(.7rem,1.4vw,.9rem)",color:`${GOLD}70`,
            letterSpacing:".1em",marginTop:7}}>
            Elegance in Every Drop
          </div>
          <div style={{width:40,height:1,
            background:`linear-gradient(to right,${GOLD}60,transparent)`,
            margin:"11px 0"}}/>
          <p style={{fontSize:"clamp(.76rem,1.2vw,.86rem)",lineHeight:1.8,
            color:"rgba(255,248,220,.3)",letterSpacing:".04em",maxWidth:340,margin:0}}>
            Born from a dream to bottle beauty. Each scent tells a story of refined luxury.
          </p>
        </motion.div>
      </div>

      {/* ══ 4-COL GRID ══ */}
      <div className="ft-grid">

        {/* Navigate */}
        <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}}
          viewport={{once:true}} transition={{duration:.6,delay:.08}}>
          <ColHead>Navigate</ColHead>
          <nav style={{display:"flex",flexDirection:"column"}}>
            {NAV.map(({label,href})=>(
              <a key={href} href={href} className="ft-lnk">{label}</a>
            ))}
          </nav>
        </motion.div>

        {/* Contact */}
        <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}}
          viewport={{once:true}} transition={{duration:.6,delay:.15}}>
          <ColHead>Contact</ColHead>
          {[
            {label:"Email",    value:"verra@luxuryperfume.com"},
            {label:"Phone",    value:"+1 (212) 555-9876"},
            {label:"Location", value:"New York, NY"},
            {label:"Hours",    value:"Mon–Sat · 10–7PM"},
          ].map(({label,value})=>(
            <div key={label} style={{marginBottom:12}}>
              <div style={{fontFamily:"'Cinzel',serif",
                fontSize:"clamp(.24rem,.52vw,.3rem)",
                letterSpacing:".28em",color:`${GOLD}55`,
                textTransform:"uppercase",marginBottom:2,
                display:"flex",alignItems:"center",gap:4}}>
                <span style={{fontSize:".4rem",color:GOLD,opacity:.4}}>✦</span>{label}
              </div>
              <div style={{fontSize:"clamp(.76rem,1.2vw,.84rem)",
                color:"rgba(255,248,220,.4)",letterSpacing:".04em",lineHeight:1.5}}>
                {value}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Social + Newsletter — spans 2 cols on small mobile */}
        <motion.div className="ft-span2"
          initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}}
          viewport={{once:true}} transition={{duration:.6,delay:.22}}>
          <ColHead>Follow Us</ColHead>
          <div style={{display:"flex",gap:9,flexWrap:"wrap",marginBottom:22}}>
            {SOCIAL.map(({Icon,label,href})=>(
              <motion.a key={label} href={href} aria-label={label}
                whileHover={{y:-3}} whileTap={{scale:.92}}
                style={{width:42,height:42,borderRadius:2,
                  border:`1px solid ${GOLD}28`,background:`${GOLD}08`,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  color:`${GOLD}90`,textDecoration:"none",
                  transition:"border-color .24s",flexShrink:0,
                  touchAction:"manipulation"}}>
                <Icon/>
              </motion.a>
            ))}
          </div>
          <ColHead>Newsletter</ColHead>
          <p style={{fontSize:"clamp(.76rem,1.2vw,.82rem)",fontStyle:"italic",
            color:"rgba(255,248,220,.28)",letterSpacing:".04em",lineHeight:1.6,marginBottom:8}}>
            New arrivals, exclusive offers, and the art of scent.
          </p>
          <Newsletter/>
        </motion.div>

        {/* Our Promise */}
        <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}}
          viewport={{once:true}} transition={{duration:.6,delay:.29}}>
          <ColHead>Our Promise</ColHead>
          {[
            {icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L12.4 7.6L18.5 8.5L14.2 12.7L15.3 18.8L10 16.1L4.7 18.8L5.8 12.7L1.5 8.5L7.6 7.6Z"
                stroke={GOLD} strokeWidth="1.2" fill={`${GOLD}18`} strokeLinejoin="round"/>
            </svg>, title:"Artisan Crafted", text:"Every bottle hand-inspected"},
            {icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="7.5" stroke={GOLD} strokeWidth="1.2" fill={`${GOLD}10`}/>
              <path d="M10 6v4l3 2" stroke={GOLD} strokeWidth="1.4" strokeLinecap="round"/>
            </svg>, title:"Ships in 48h", text:"Express worldwide delivery"},
            {icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M4 10l4 4 8-8" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="10" cy="10" r="8" stroke={GOLD} strokeWidth="1.2" fill={`${GOLD}08`}/>
            </svg>, title:"Authenticity Seal", text:"Certified genuine fragrance"},
          ].map(({icon,title,text},i)=>(
            <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:14}}>
              <div style={{width:32,height:32,borderRadius:2,
                border:`1px solid ${GOLD}22`,background:`${GOLD}0a`,
                display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                {icon}
              </div>
              <div>
                <div style={{fontFamily:"'Cinzel',serif",
                  fontSize:"clamp(.24rem,.52vw,.3rem)",
                  letterSpacing:".28em",color:`${GOLD}80`,
                  textTransform:"uppercase",marginBottom:2}}>
                  {title}
                </div>
                <div style={{fontSize:"clamp(.74rem,1.1vw,.8rem)",
                  color:"rgba(255,248,220,.32)",letterSpacing:".03em",lineHeight:1.5}}>
                  {text}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

      </div>

      {/* ══ BOTTOM BAR ══ */}
      <div className="ft-bottom">
        <span style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",
          fontSize:"clamp(.74rem,1.1vw,.82rem)",
          color:"rgba(255,248,220,.22)",letterSpacing:".06em"}}>
          © {new Date().getFullYear()} Maison Verra. All rights reserved.
        </span>

        <div className="ft-orn" style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:22,height:1,background:`linear-gradient(to right,transparent,${GOLD}38)`}}/>
          <svg width="10" height="10" viewBox="0 0 10 10">
            <path d="M5 0.5L6.2 3.8L9.5 5L6.2 6.2L5 9.5L3.8 6.2L0.5 5L3.8 3.8Z"
              fill={GOLD} opacity=".4"/>
          </svg>
          <div style={{width:22,height:1,background:`linear-gradient(to left,transparent,${GOLD}38)`}}/>
        </div>

        <span style={{fontFamily:"'Cinzel',serif",
          fontSize:"clamp(.24rem,.56vw,.3rem)",
          letterSpacing:".34em",color:"rgba(255,248,220,.16)",textTransform:"uppercase"}}>
          Crafted with love · New York
        </span>
      </div>

    </footer>
  );
}