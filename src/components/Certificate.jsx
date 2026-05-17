import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CERTIFICATES, ISSUER_COLOR } from "./Educationcostants";

gsap.registerPlugin(ScrollTrigger);

// ── CERT CARD ──────────────────────────────────────────────────────
function CertCard({ cert }) {
    const color = ISSUER_COLOR[cert.issuer] || "#0a0a0a";

    return (
        <div className="cert-card" style={{
            background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: "4px",
            padding: "24px 20px 20px", position: "relative", overflow: "hidden",
            boxShadow: "0 2px 20px rgba(0,0,0,0.04)", cursor: "default",
            willChange: "transform, box-shadow",
        }}
            onMouseEnter={(e) => gsap.to(e.currentTarget, { y: -6, boxShadow: "0 16px 40px rgba(0,0,0,0.1)", duration: 0.3, overwrite: "auto" })}
            onMouseLeave={(e) => gsap.to(e.currentTarget, { y: 0, boxShadow: "0 2px 20px rgba(0,0,0,0.04)", duration: 0.3, overwrite: "auto" })}
        >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: color }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                <span style={{ fontSize: "8px", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color, fontFamily: "'Courier New',monospace" }}>{cert.issuer}</span>
                <span style={{ fontSize: "8px", color: "#ccc", fontFamily: "'Courier New',monospace", letterSpacing: "0.12em" }}>{cert.year}</span>
            </div>
            <p style={{ fontSize: "clamp(0.8rem,1vw,0.9rem)", fontWeight: 700, color: "#0a0a0a", lineHeight: 1.4, letterSpacing: "-0.01em", marginBottom: "16px" }}>{cert.name}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "7px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#999", border: "1px solid #eee", padding: "3px 8px", borderRadius: "2px" }}>{cert.category}</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ opacity: 0.18 }}>
                    <circle cx="7" cy="6" r="4" stroke="#0a0a0a" strokeWidth="1.2" />
                    <path d="M4.5 10.5L5.5 13L7 11.5L8.5 13L9.5 10.5" stroke="#0a0a0a" strokeWidth="1.2" strokeLinejoin="round" />
                </svg>
            </div>
            <div style={{ position: "absolute", bottom: "-8px", right: "12px", fontFamily: "'Courier New',monospace", fontSize: "52px", fontWeight: 900, color: "transparent", WebkitTextStroke: `1px ${color}22`, lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>
                {cert.id.replace("c", "")}
            </div>
        </div>
    );
}

// ── CERTIFICATE SECTION ────────────────────────────────────────────
export default function Certificate() {
    const wrapRef = useRef(null);
    const stickyRef = useRef(null);
    const gridRef = useRef(null);
    const countRef = useRef(null);

    useEffect(() => {
        const wrap = wrapRef.current;
        const sticky = stickyRef.current;
        if (!wrap || !sticky) return;

        const ctx = gsap.context(() => {
            gsap.set(".cert-label-inner", { y: "110%" });
            gsap.set(".cert-line-1, .cert-line-2", { y: "105%" });
            gsap.set(".cert-bg", { scale: 0.8, opacity: 0 });
            gsap.set(".cert-divider", { scaleX: 0, transformOrigin: "left center" });
            gsap.set(".cert-count", { opacity: 0, y: 20 });

            const cards = gsap.utils.toArray(".cert-card");
            gsap.set(cards, { opacity: 0, y: 60, scale: 0.95 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrap,
                    start: "top 80%",
                    end: "+=150%",
                    scrub: 0.5,
                }
            });

            ScrollTrigger.create({
                trigger: wrap,
                start: "top top",
                end: "+=150%",
                pin: sticky,
                anticipatePin: 1,
            });

            tl.to(".cert-bg", { scale: 1, opacity: 1, duration: 2, ease: "power3.out" }, 0);
            tl.to(".cert-label-inner", { y: "0%", duration: 0.8, ease: "power3.out" }, 0.2);
            tl.to(".cert-line-1", { y: "0%", duration: 1, ease: "expo.out" }, 0.4);
            tl.to(".cert-line-2", { y: "0%", duration: 1, ease: "expo.out" }, 0.6);

            const counter = { val: 0 };
            tl.to(counter, {
                val: CERTIFICATES.length,
                duration: 1.5,
                ease: "power2.out",
                onUpdate() {
                    if (countRef.current) countRef.current.textContent = String(Math.round(counter.val)).padStart(2, "0");
                }
            }, 0.8);
            tl.to(".cert-count", { opacity: 1, y: 0, duration: 1, ease: "expo.out" }, 0.8);
            tl.to(".cert-divider", { scaleX: 1, duration: 1.5, ease: "expo.out" }, 1.0);
            tl.to(cards, { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "back.out(1.2)", stagger: 0.15 }, 1.2);

            const grid = gridRef.current;
            tl.to(grid, { y: -30, duration: 3, ease: "none" }, 2.5);
        }, wrap);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={wrapRef} style={{ height: "150svh", background: "#f9f9f7" }}>
            <div ref={stickyRef} className="relative overflow-hidden flex flex-col" style={{ height: "100svh", background: "#f9f9f7", paddingTop: "10vh" }}>

                {/* Noise overlay */}
                <div className="absolute inset-0 z-0 opacity-[0.04] mix-blend-darken pointer-events-none" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />

                {/* Giant Background Number */}
                <div className="cert-bg absolute pointer-events-none select-none" style={{ bottom: "-4%", right: "-2vw", zIndex: 0, fontSize: "clamp(160px,28vw,380px)", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.06em", color: "transparent", WebkitTextStroke: "1.5px rgba(0,0,0,0.04)" }}>04</div>

                {/* Header Block */}
                <div style={{ padding: "0 clamp(32px,8vw,120px)", position: "relative", zIndex: 2, flexShrink: 0 }}>
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-[32px] gap-6 md:gap-0">
                        <div>
                            <div style={{ overflow: "hidden", marginBottom: "16px", display: "inline-flex", alignItems: "center", gap: "12px" }}>
                                <div style={{ width: "28px", height: "1px", background: "#bbb", flexShrink: 0 }} />
                                <div className="cert-label-inner" style={{ fontFamily: "'Courier New',monospace", fontSize: "9px", letterSpacing: "0.32em", textTransform: "uppercase", color: "#aaa" }}>04 — Certificates</div>
                            </div>
                            <h2 style={{ fontSize: "clamp(2.2rem,5.5vw,5rem)", fontWeight: 900, letterSpacing: "-0.04em", textTransform: "uppercase", color: "#0a0a0a", lineHeight: 1.05, margin: 0 }}>
                                <div style={{ overflow: "hidden" }}><div className="cert-line-1">WHAT I'VE</div></div>
                                <div style={{ overflow: "hidden" }}><div className="cert-line-2" style={{ color: "transparent", WebkitTextStroke: "2px #0a0a0a" }}>EARNED.</div></div>
                            </h2>
                        </div>
                        {/* Counter */}
                        <div className="cert-count" style={{ textAlign: "right", flexShrink: 0 }}>
                            <div ref={countRef} style={{ fontSize: "clamp(3rem,6vw,6rem)", fontWeight: 900, letterSpacing: "-0.05em", color: "#0a0a0a", lineHeight: 1 }}>00</div>
                            <div style={{ fontFamily: "'Courier New',monospace", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#bbb", marginTop: "4px" }}>Total Certs</div>
                        </div>
                    </div>
                    <div className="cert-divider" style={{ height: "1px", background: "linear-gradient(90deg, #0a0a0a 0%, rgba(0,0,0,0.06) 100%)", marginBottom: "40px" }} />
                </div>

                {/* Grid Container */}
                <div style={{ flex: 1, padding: "0 clamp(32px,8vw,120px) 10vh", position: "relative", zIndex: 2, overflow: "visible" }}>
                    <div ref={gridRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
                        {CERTIFICATES.map((cert) => <CertCard key={cert.id} cert={cert} />)}
                    </div>
                </div>

            </div>
        </div>
    );
}