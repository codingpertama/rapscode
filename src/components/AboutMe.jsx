import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BlurReveal = ({ children, className = "" }) => {
  const ref = useRef(null);
  const words = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split(/(\s+)/).map((w, i) =>
      w.match(/^\s+$/) ? w
        : <span key={i} className="br-word" style={{ display: "inline-block" }}>{w}</span>
    );
  }, [children]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ws = el.querySelectorAll(".br-word");
    const st = ScrollTrigger.create({
      trigger: el, start: "top 92%", end: "bottom 38%", scrub: 3.5,
      onUpdate(self) {
        const p = self.progress;
        const perWord = 1 / ws.length;
        ws.forEach((w, i) => {
          const s = i * perWord * 0.6;
          const e = s + perWord * 1.4;
          const t = Math.min(Math.max((p - s) / (e - s), 0), 1);
          w.style.opacity = 0.03 + t * 0.97;
          w.style.filter = `blur(${(1 - t) * 10}px)`;
          w.style.transform = `translateY(${(1 - t) * 8}px)`;
        });
      },
    });
    return () => st.kill();
  }, []);

  return <p ref={ref} className={className}>{words}</p>;
};

const TECH_SKILLS = [
  "React", "Laravel", "Flutter", "Node.js",
  "Tailwind", "Figma", "MySQL", "MongoDB",
  "Git", "HTML/CSS", "Bootstrap", "JavaScript",
];

const SOFT_SKILLS = [
  "Teamwork", "Communication", "Critical Thinking",
  "Time Management", "Adaptability", "Fast Learner",
  "Creativity", "Problem Solving",
];

export default function AboutMe() {
  const wrapRef = useRef(null);
  const stickyRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const sticky = stickyRef.current;
    if (!wrap || !sticky) return;

    const ctx = gsap.context(() => {
      gsap.set(".photo-img", { scale: 1.28, filter: "grayscale(100%) brightness(0.65)", x: 40, opacity: 0 });
      gsap.set(".photo-clip", { clipPath: "inset(42% 6% 42% 6%)", opacity: 0 });
      gsap.set(".photo-frame", { opacity: 0, scale: 0.94 });
      gsap.set(".abt-label", { opacity: 0, x: -20 });
      gsap.set(".hl-1, .hl-2, .hl-3", { y: "105%" });
      gsap.set(".abt-bio", { opacity: 0, y: 16 });
      gsap.set(".skills-label, .soft-label", { opacity: 0 });
      gsap.set(".sk-tech, .sk-soft", { opacity: 0 });
      gsap.set(".st", { opacity: 0, y: 20, scale: 0.85 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap, start: "top top", end: "+=380%",
          pin: sticky, scrub: 1.2, anticipatePin: 1,
        },
      });

      // Foto
      tl.to(".photo-clip", { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, ease: "expo.inOut", duration: 2.2 }, 0);
      tl.to(".photo-img", { scale: 1.0, filter: "grayscale(0%) brightness(1.0)", x: 0, opacity: 1, ease: "power2.inOut", duration: 2.2 }, 0);
      tl.to(".photo-frame", { opacity: 1, scale: 1, ease: "expo.out", duration: 1.2 }, 0.5);

      // Label
      tl.to(".abt-label", { opacity: 1, x: 0, ease: "power3.out", duration: 0.6 }, 0.6);

      // Heading
      tl.to(".hl-1", { y: "0%", ease: "expo.out", duration: 0.9 }, 0.7);
      tl.to(".hl-2", { y: "0%", ease: "expo.out", duration: 0.9 }, 0.85);
      tl.to(".hl-3", { y: "0%", ease: "expo.out", duration: 0.9 }, 1.0);

      // Bio
      tl.to(".abt-bio", { opacity: 1, y: 0, ease: "power3.out", duration: 0.8 }, 1.6);

      // Tech skills
      tl.to(".skills-label", { opacity: 1, duration: 0.4 }, 2.1);
      tl.to(".sk-tech", { opacity: 1, stagger: 0.03, ease: "power3.out", duration: 0.45 }, 2.2);

      // Soft skills
      tl.to(".soft-label", { opacity: 1, duration: 0.4 }, 2.65);
      tl.to(".sk-soft", { opacity: 1, stagger: 0.04, ease: "back.out(1.8)", duration: 0.45 }, 2.75);

      // Stats
      tl.to(".st", { opacity: 1, y: 0, scale: 1, stagger: 0.1, ease: "back.out(2.2)", duration: 0.55 }, 3.2);

      // Parallax foto
      gsap.fromTo(".photo-img",
        { yPercent: 4 },
        {
          yPercent: -4, ease: "none",
          scrollTrigger: { trigger: wrap, start: "top top", end: "bottom bottom", scrub: true }
        }
      );
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} style={{ height: "480svh", background: "#f9f9f7" }}>
      <div ref={stickyRef} className="relative overflow-hidden"
        style={{ height: "100svh", background: "#f9f9f7" }}>

        {/* Noise */}
        <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.04] mix-blend-darken"
          style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />

        {/* Giant bg 02 */}
        <div className="absolute pointer-events-none select-none"
          style={{
            bottom: "-2%", right: "-1vw", zIndex: 1,
            fontSize: "clamp(150px,26vw,360px)", fontWeight: 900, lineHeight: 1,
            letterSpacing: "-0.06em", color: "transparent",
            WebkitTextStroke: "1px rgba(0,0,0,0.045)",
          }}>02</div>

        {/* FOTO */}
        <div className="photo-clip absolute z-[3] max-md:hidden"
          style={{
            right: "4vw", top: "50%", transform: "translateY(-50%)",
            width: "clamp(260px, 34vw, 480px)", aspectRatio: "3/4",
          }}>
          {/* Frame */}
          <div className="photo-frame absolute inset-0 z-[2] pointer-events-none"
            style={{
              border: "1px solid rgba(0,0,0,0.12)", borderRadius: "4px",
              boxShadow: "6px 6px 0px rgba(0,0,0,0.06), inset 0 0 0 6px #f9f9f7",
            }} />
          {/* Corner accents */}
          {[
            { top: -1, left: -1, borderTop: "2px solid #0a0a0a", borderLeft: "2px solid #0a0a0a" },
            { top: -1, right: -1, borderTop: "2px solid #0a0a0a", borderRight: "2px solid #0a0a0a" },
            { bottom: -1, left: -1, borderBottom: "2px solid #0a0a0a", borderLeft: "2px solid #0a0a0a" },
            { bottom: -1, right: -1, borderBottom: "2px solid #0a0a0a", borderRight: "2px solid #0a0a0a" },
          ].map((s, i) => (
            <div key={i} className="photo-frame absolute z-[3] pointer-events-none"
              style={{ ...s, width: "18px", height: "18px" }} />
          ))}
          <img className="photo-img" src="/rapsnobg.png" alt="Rafa Hafiz"
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              objectPosition: "center 8%", borderRadius: "3px", display: "block",
            }} />
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-[1]"
            style={{ height: "25%", background: "linear-gradient(to bottom, transparent, rgba(249,249,247,0.35))", borderRadius: "0 0 3px 3px" }} />
        </div>

        {/* LEFT TEXT — justify-center tapi konten dikompres biar stats gak kepotong */}
        <div className="absolute left-0 top-0 bottom-0 z-[10] flex flex-col justify-center px-8 md:px-20 w-full md:w-[52%] max-w-full md:max-w-[600px]">

          <div style={{ display: "flex", flexDirection: "column" }}>

            {/* Label */}
            <div className="abt-label flex items-center gap-3" style={{ marginBottom: "14px" }}>
              <div style={{ width: "22px", height: "1px", background: "#bbb" }} />
              <span style={{
                fontFamily: "'Courier New', monospace", fontSize: "9px",
                letterSpacing: "0.32em", textTransform: "uppercase", color: "#aaa",
              }}>02 — About Me</span>
            </div>

            {/* Heading — font lebih kecil biar semua muat */}
            <div style={{ marginBottom: "14px" }}>
              {[
                { cls: "hl-1", text: "I DESIGN.", outline: false },
                { cls: "hl-2", text: "I BUILD.", outline: true },
                { cls: "hl-3", text: "I SHIP.", outline: false },
              ].map(({ cls, text, outline }) => (
                <div key={cls} style={{ overflow: "hidden", lineHeight: 1 }}>
                  <div className={cls} style={{
                    display: "block",
                    fontSize: "clamp(1.9rem, 4.2vw, 4.8rem)",
                    fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.08,
                    color: outline ? "transparent" : "#0a0a0a",
                    WebkitTextStroke: outline ? "1.5px #0a0a0a" : "none",
                    willChange: "transform",
                  }}>{text}</div>
                </div>
              ))}
            </div>

            {/* Bio */}
            <div className="abt-bio" style={{ marginBottom: "12px", maxWidth: "380px" }}>
              <BlurReveal className="leading-[1.7]"
                style={{ fontSize: "clamp(0.75rem, 0.95vw, 0.88rem)", color: "rgba(0,0,0,0.38)" }}>
                I'm Rafa, a developer who turns ideas into modern digital experiences. From crafting sleek frontend interfaces to building powerful backend systems, I'm always exploring new technologies and pushing my skills further.
              </BlurReveal>
            </div>

            {/* Tech Stack */}
            <div style={{ marginBottom: "8px" }}>
              <p className="skills-label" style={{
                fontFamily: "'Courier New', monospace", fontSize: "8px",
                letterSpacing: "0.28em", textTransform: "uppercase",
                color: "#bbb", marginBottom: "5px",
              }}>Tech Stack</p>
              <div className="flex flex-wrap" style={{ gap: "3px" }}>
                {TECH_SKILLS.map((s) => (
                  <span key={s} className="sk-tech" style={{
                    fontSize: "7.5px", fontWeight: 700, letterSpacing: "0.14em",
                    textTransform: "uppercase", color: "#555",
                    border: "1px solid #e0e0e0", padding: "3px 8px",
                    borderRadius: "2px", background: "#fff",
                    transition: "all 0.15s ease", cursor: "default",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#0a0a0a"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#0a0a0a"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#555"; e.currentTarget.style.borderColor = "#e0e0e0"; }}
                  >{s}</span>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div style={{ marginBottom: "12px" }}>
              <p className="soft-label" style={{
                fontFamily: "'Courier New', monospace", fontSize: "8px",
                letterSpacing: "0.28em", textTransform: "uppercase",
                color: "#bbb", marginBottom: "5px",
              }}>Soft Skills</p>
              <div className="flex flex-wrap" style={{ gap: "3px" }}>
                {SOFT_SKILLS.map((s) => (
                  <span key={s} className="sk-soft" style={{
                    fontSize: "7.5px", fontWeight: 600, letterSpacing: "0.13em",
                    textTransform: "uppercase", color: "#888",
                    border: "1px dashed #ddd", padding: "3px 8px",
                    borderRadius: "10px", background: "transparent",
                    transition: "all 0.15s ease", cursor: "default",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderStyle = "solid"; e.currentTarget.style.borderColor = "#0a0a0a"; e.currentTarget.style.color = "#0a0a0a"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderStyle = "dashed"; e.currentTarget.style.borderColor = "#ddd"; e.currentTarget.style.color = "#888"; }}
                  >{s}</span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-4 md:gap-10 pt-4" style={{ borderTop: "2px solid #0a0a0a" }}>
              {[["17", "Years Old"], ["12+", "Tech Skills"], ["8", "Soft Skills"]].map(([n, l]) => (
                <div key={l} className="st">
                  <div style={{
                    fontSize: "clamp(2.4rem, 4vw, 3.8rem)", fontWeight: 900,
                    letterSpacing: "-0.05em", color: "#0a0a0a", lineHeight: 1,
                  }}>{n}</div>
                  <div style={{
                    fontSize: "8px", color: "#999", letterSpacing: "0.22em",
                    textTransform: "uppercase", marginTop: "5px",
                    fontFamily: "'Courier New', monospace",
                  }}>{l}</div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Vertical credit */}
        <div className="absolute right-5 bottom-8 z-[15] pointer-events-none"
          style={{
            writingMode: "vertical-rl", fontFamily: "'Courier New', monospace",
            fontSize: "8px", letterSpacing: "0.28em", textTransform: "uppercase", color: "#ccc",
          }}>RAFA HAFIZ — 2025</div>

      </div>
    </div>
  );
}