import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SCHOOLS } from "./Educationcostants";

gsap.registerPlugin(ScrollTrigger);

// ── SCHOOL CARD ────────────────────────────────────────────────────
function SchoolCard({ school }) {
  return (
    <div className="edu-card grid grid-cols-1 md:grid-cols-2" style={{
      width: "min(88vw, 820px)", flexShrink: 0,
      height: "72vh", maxHeight: "580px",
      border: "1px solid rgba(0,0,0,0.09)",
      background: "#fafafa", position: "relative", overflow: "hidden",
      boxShadow: "0 4px 40px rgba(0,0,0,0.07)",
    }}>
      {/* LEFT */}
      <div style={{
        padding: "clamp(28px,4vw,52px)", display: "flex",
        flexDirection: "column", justifyContent: "space-between",
        borderRight: "1px solid rgba(0,0,0,0.07)", zIndex: 2, background: "#f9f9f7",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "'Courier New',monospace", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#bbb" }}>{school.id}</span>
          <span style={{ fontFamily: "'Courier New',monospace", fontSize: "9px", letterSpacing: "0.16em", color: "#ccc", textTransform: "uppercase", background: "#f0f0ee", padding: "3px 10px", borderRadius: "2px" }}>{school.year}</span>
        </div>
        <div>
          <div style={{ fontSize: "clamp(60px,9vw,110px)", fontWeight: 900, color: "transparent", WebkitTextStroke: "1px rgba(0,0,0,0.06)", lineHeight: 1, letterSpacing: "-0.06em", marginBottom: "-0.15em", userSelect: "none" }}>{school.id}</div>
          <h2 style={{ fontSize: "clamp(1.1rem,2.1vw,1.75rem)", fontWeight: 900, letterSpacing: "-0.03em", color: "#0a0a0a", lineHeight: 1.1, marginBottom: "10px", textTransform: "uppercase" }}>{school.name}</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "18px" }}>
            <span style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", background: "#0a0a0a", color: "#f9f9f7", padding: "3px 10px", borderRadius: "2px" }}>{school.major}</span>
            <span style={{ fontFamily: "'Courier New',monospace", fontSize: "9px", color: "#aaa" }}>{school.majorFull}</span>
          </div>
          <p style={{ fontSize: "clamp(0.76rem,0.95vw,0.88rem)", color: "rgba(0,0,0,0.42)", lineHeight: 1.9, maxWidth: "320px" }}>{school.description}</p>
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="4" r="2" stroke="#bbb" strokeWidth="1.2" /><path d="M5 10C5 10 1 6.5 1 4a4 4 0 018 0C9 6.5 5 10 5 10z" stroke="#bbb" strokeWidth="1.2" fill="none" /></svg>
            <span style={{ fontFamily: "'Courier New',monospace", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#bbb" }}>{school.location}</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {school.tags.map(t => (
              <span key={t} style={{
                fontSize: "7.5px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
                color: "#888", border: "1px solid #e4e4e2", padding: "3px 8px", borderRadius: "2px", background: "#fff",
                transition: "all 0.15s ease", cursor: "default"
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "#0a0a0a"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#0a0a0a"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#888"; e.currentTarget.style.borderColor = "#e4e4e2"; }}
              >{t}</span>
            ))}
          </div>
        </div>
      </div>
      {/* RIGHT */}
      <div className="hidden md:block" style={{ position: "relative", overflow: "hidden", background: "#e8e8e6" }}>
        <img src={school.image} alt={school.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%", filter: "grayscale(10%) contrast(1.05)", transition: "transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94)", transform: "scale(1.05)" }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.0)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1.05)"}
        />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')", opacity: 0.1, mixBlendMode: "overlay", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "22px", right: "14px", fontFamily: "'Courier New',monospace", fontSize: "8px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", writingMode: "vertical-rl" }}>{school.name} — {school.year}</div>
      </div>
      <div style={{ position: "absolute", top: 0, left: 0, width: "28px", height: "28px", borderTop: "1.5px solid rgba(0,0,0,0.2)", borderLeft: "1.5px solid rgba(0,0,0,0.2)", zIndex: 10 }} />
      <div style={{ position: "absolute", bottom: 0, right: 0, width: "28px", height: "28px", borderBottom: "1.5px solid rgba(0,0,0,0.2)", borderRight: "1.5px solid rgba(0,0,0,0.2)", zIndex: 10 }} />
    </div>
  );
}

// ── EDUCATION SECTION ──────────────────────────────────────────────
export default function Education() {
  const wrapRef = useRef(null);
  const stickyRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const sticky = stickyRef.current;
    if (!wrap || !sticky) return;

    const ctx = gsap.context(() => {
      gsap.set(".edu-label-inner", { y: "110%" });
      gsap.set(".edu-line-1, .edu-line-2", { y: "105%" });
      gsap.set(".edu-card", { x: "40vw", opacity: 0, scale: 0.95 });
      gsap.set(".edu-bg", { scale: 0.8, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: "+=350%",
          pin: sticky,
          scrub: 1.2,
          anticipatePin: 1,
        }
      });

      tl.to(".edu-bg", { scale: 1, opacity: 1, duration: 2, ease: "power3.out" }, 0);
      tl.to(".edu-label-inner", { y: "0%", duration: 0.8, ease: "power3.out" }, 0.2);
      tl.to(".edu-line-1", { y: "0%", duration: 1, ease: "expo.out" }, 0.4);
      tl.to(".edu-line-2", { y: "0%", duration: 1, ease: "expo.out" }, 0.6);
      tl.to(".edu-card", { x: 0, opacity: 1, scale: 1, duration: 1.5, ease: "expo.out", stagger: 0.2 }, 1.2);
      tl.to(".edu-card", { y: -20, duration: 2, ease: "none" }, 2.7);
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} style={{ height: "450svh", background: "#f9f9f7" }}>
      <div ref={stickyRef} className="relative overflow-hidden flex flex-col justify-center" style={{ height: "100svh", background: "#f9f9f7", paddingLeft: "clamp(32px,8vw,120px)", paddingRight: "clamp(32px,4vw,60px)" }}>

        {/* Noise overlay */}
        <div className="absolute inset-0 z-0 opacity-[0.04] mix-blend-darken pointer-events-none" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />

        {/* Giant Background Number */}
        <div className="edu-bg absolute pointer-events-none select-none" style={{ bottom: "-4%", left: "-2vw", zIndex: 0, fontSize: "clamp(180px,32vw,420px)", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.06em", color: "transparent", WebkitTextStroke: "1.5px rgba(0,0,0,0.04)" }}>03</div>

        {/* Header */}
        <div style={{ position: "relative", zIndex: 2, marginBottom: "40px" }}>
          <div style={{ overflow: "hidden", marginBottom: "20px", display: "inline-flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "28px", height: "1px", background: "#bbb" }} />
            <div className="edu-label-inner" style={{ fontFamily: "'Courier New',monospace", fontSize: "9px", letterSpacing: "0.32em", textTransform: "uppercase", color: "#aaa" }}>03 — Education</div>
          </div>
          <h2 style={{ fontSize: "clamp(2.2rem,5.5vw,5rem)", fontWeight: 900, letterSpacing: "-0.04em", textTransform: "uppercase", color: "#0a0a0a", lineHeight: 1.05, margin: 0 }}>
            <div style={{ overflow: "hidden" }}><div className="edu-line-1">WHERE I</div></div>
            <div style={{ overflow: "hidden" }}><div className="edu-line-2" style={{ color: "transparent", WebkitTextStroke: "2px #0a0a0a" }}>LEARNED.</div></div>
          </h2>
        </div>

        {/* Horizontal Track */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <div ref={trackRef} style={{ display: "flex", gap: "24px", alignItems: "center", willChange: "transform" }}>
            {SCHOOLS.map(s => <SchoolCard key={s.id} school={s} />)}
          </div>
        </div>
      </div>
    </div>
  );
}