import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
    {
        id: "01",
        title: "CeritaKita",
        description: "Website fullstack menggunakan Laravel dan Bootstrap yang bertema blogger.",
        tags: ["Laravel", "Bootstrap", "PHP"],
        year: "2025",
        github: "https://github.com/codingpertama/CeritaKita",
        live: null,
        image: "/CeritaKita.png",
    },
    {
        id: "02",
        title: "Local AI Chat",
        description: "Aplikasi chat AI lokal berbasis React dan TypeScript menggunakan Ollama, berjalan sepenuhnya secara lokal.",
        tags: ["React", "TypeScript", "Vite", "Tailwind", "Ollama"],
        year: "2026",
        github: "https://github.com/codingpertama/local-ai-chat",
        live: null,
        image: "/local-ai-chat.png",
    },
    {
        id: "03",
        title: "Platzi Fake Store",
        description: "Website replika e-commerce fake store yang dibuat menggunakan React dan Tailwind CSS.",
        tags: ["React", "Tailwind CSS", "JavaScript"],
        year: "2026",
        github: "https://github.com/codingpertama/platzi",
        live: "https://platzi-rho.vercel.app/",
        image: "/platzi.png",
    },
    {
        id: "04",
        title: "Tixid",
        description: "Aplikasi pemesanan tiket bioskop berbasis web yang dibangun dengan framework Laravel.",
        tags: ["Laravel", "PHP", "Blade"],
        year: "2025",
        github: "https://github.com/codingpertama/tixid",
        live: null,
        image: "/tixid.png",
    },
    {
        id: "05",
        title: "Wordpedia",
        description: "Sebuah aplikasi web React sederhana yang memanfaatkan Dictionary API untuk mencari makna dan penjelasan kata.",
        tags: ["React", "Tailwind CSS", "Dictionary API"],
        year: "2026",
        github: "https://github.com/codingpertama/Wordpedia",
        live: "https://wordpedia-two.vercel.app",
        image: "/wordpedia.png",
    },
    {
        id: "06",
        title: "Ferrari Laravel",
        description: "Projek web otomotif PSAT menggunakan Laravel dengan fokus pada showcase mobil Ferrari.",
        tags: ["Laravel", "PHP", "Bootstrap"],
        year: "2025",
        github: "https://github.com/codingpertama/ferrari_laravel",
        live: null,
        image: "/ferrari.png",
    },
];

// ── ICON: GitHub ───────────────────────────────────────────────────
function IconGithub() {
    return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
    );
}

// ── ICON: Arrow ────────────────────────────────────────────────────
function IconArrow() {
    return (
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M1 10L10 1M10 1H3M10 1V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

// ── PROJECT ROW ────────────────────────────────────────────────────
function ProjectRow({ project, index }) {
    const rowRef = useRef(null);
    const imgRef = useRef(null);

    // Hover: reveal image near cursor
    useEffect(() => {
        const row = rowRef.current;
        const img = imgRef.current;
        if (!row || !img) return;

        let suppressImg = false;

        const showImg = () => { if (!suppressImg) gsap.to(img, { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }); };
        const hideImg = () => gsap.to(img, { opacity: 0, scale: 0.94, duration: 0.35, ease: "power3.in" });

        const onEnter = () => showImg();
        const onLeave = () => { suppressImg = false; hideImg(); };
        const onMove = (e) => {
            const rect = row.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            gsap.to(img, { x: x - 80, y: y - 70, duration: 0.55, ease: "power2.out" });
        };

        const links = row.querySelectorAll("a");
        const onLinkEnter = () => { suppressImg = true; hideImg(); };
        const onLinkLeave = () => { suppressImg = false; showImg(); };

        row.addEventListener("mouseenter", onEnter);
        row.addEventListener("mouseleave", onLeave);
        row.addEventListener("mousemove", onMove);
        links.forEach(link => {
            link.addEventListener("mouseenter", onLinkEnter);
            link.addEventListener("mouseleave", onLinkLeave);
        });

        return () => {
            row.removeEventListener("mouseenter", onEnter);
            row.removeEventListener("mouseleave", onLeave);
            row.removeEventListener("mousemove", onMove);
            links.forEach(link => {
                link.removeEventListener("mouseenter", onLinkEnter);
                link.removeEventListener("mouseleave", onLinkLeave);
            });
        };
    }, []);

    const isEven = index % 2 === 0;

    return (
        <div
            ref={rowRef}
            className={`proj-row proj-row-${index}`}
            style={{
                position: "relative",
                borderTop: "1px solid rgba(0,0,0,0.09)",
                padding: "clamp(22px,3.5vw,40px) 0",
                cursor: "default",
                overflow: "visible",
            }}
            onMouseEnter={e => gsap.to(e.currentTarget.querySelector(".proj-index"), { x: 6, duration: 0.3, ease: "power2.out" })}
            onMouseLeave={e => gsap.to(e.currentTarget.querySelector(".proj-index"), { x: 0, duration: 0.3, ease: "power2.out" })}
        >
            {/* Hover line fill */}
            <div className="proj-hover-bg" style={{
                position: "absolute", inset: 0,
                background: "#0a0a0a",
                transformOrigin: isEven ? "left" : "right",
                transform: "scaleX(0)",
                zIndex: 0,
                transition: "transform 0.45s cubic-bezier(0.76,0,0.24,1)",
                pointerEvents: "none",
            }} />

            {/* Floating image */}
            <div
                ref={imgRef}
                style={{
                    position: "absolute",
                    top: 0, left: 0,
                    width: "160px", height: "110px",
                    opacity: 0, scale: 0.94,
                    zIndex: 20,
                    pointerEvents: "none",
                    borderRadius: "2px",
                    overflow: "hidden",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
                    border: "1px solid rgba(0,0,0,0.12)",
                }}
            >
                <img
                    src={project.image}
                    alt={project.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%) contrast(1.1)" }}
                    onError={e => {
                        // fallback placeholder when no image
                        e.currentTarget.style.display = "none";
                        e.currentTarget.parentElement.style.background = "#1a1a1a";
                        e.currentTarget.parentElement.innerHTML += `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.2em;color:#555;text-transform:uppercase">${project.id}</div>`;
                    }}
                />
            </div>

            {/* Row content */}
            <div className="proj-row-inner flex flex-col md:grid md:items-center items-start"
                style={{
                position: "relative", zIndex: 2,
                gridTemplateColumns: "clamp(28px,4vw,56px) 1fr auto",
                gap: "clamp(16px,3vw,40px)",
                transition: "color 0.45s cubic-bezier(0.76,0,0.24,1)",
            }}
            >
                {/* Index */}
                <span className="proj-index" style={{
                    fontFamily: "'Courier New',monospace",
                    fontSize: "9px", letterSpacing: "0.22em",
                    color: "#bbb", textTransform: "uppercase",
                    display: "inline-block",
                    transition: "color 0.4s",
                }}>{project.id}</span>

                {/* Middle */}
                <div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(10px,2vw,24px)", flexWrap: "wrap", marginBottom: "8px" }}>
                        <h3 style={{
                            fontSize: "clamp(1.1rem,2.2vw,1.9rem)",
                            fontWeight: 900,
                            letterSpacing: "-0.03em",
                            textTransform: "uppercase",
                            color: "#0a0a0a",
                            lineHeight: 1,
                            margin: 0,
                            transition: "color 0.4s",
                        }} className="proj-title">{project.title}</h3>
                        <span style={{
                            fontFamily: "'Courier New',monospace",
                            fontSize: "9px", letterSpacing: "0.18em",
                            color: "#ccc", textTransform: "uppercase",
                            transition: "color 0.4s",
                        }} className="proj-year">{project.year}</span>
                    </div>
                    <p style={{
                        fontSize: "clamp(0.73rem,0.9vw,0.82rem)",
                        color: "rgba(0,0,0,0.38)",
                        lineHeight: 1.85,
                        maxWidth: "520px",
                        margin: "0 0 12px",
                        transition: "color 0.4s",
                    }} className="proj-desc">{project.description}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                        {project.tags.map(tag => (
                            <span key={tag} className="proj-tag" style={{
                                fontSize: "7px", fontWeight: 700, letterSpacing: "0.16em",
                                textTransform: "uppercase", color: "#888",
                                border: "1px solid #e0e0de", padding: "3px 8px", borderRadius: "2px",
                                background: "#fff", transition: "all 0.4s",
                            }}>{tag}</span>
                        ))}
                    </div>
                </div>

                {/* Links */}
                <div className="md:items-end items-start" style={{ display: "flex", flexDirection: "column", gap: "8px", flexShrink: 0, paddingLeft: "clamp(12px,2vw,28px)", paddingRight: "clamp(8px,1.5vw,20px)" }}>
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="proj-link"
                        style={{
                            display: "inline-flex", alignItems: "center", gap: "6px",
                            fontFamily: "'Courier New',monospace", fontSize: "8px",
                            letterSpacing: "0.2em", textTransform: "uppercase",
                            color: "#888", textDecoration: "none",
                            border: "1px solid #e0e0de", padding: "5px 10px", borderRadius: "2px",
                            background: "#fff", transition: "all 0.25s ease",
                            whiteSpace: "nowrap",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = "#0a0a0a"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#0a0a0a"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#888"; e.currentTarget.style.borderColor = "#e0e0de"; }}
                    >
                        <IconGithub /> Source
                    </a>
                    {project.live ? (
                        <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="proj-link"
                            style={{
                                display: "inline-flex", alignItems: "center", gap: "6px",
                                fontFamily: "'Courier New',monospace", fontSize: "8px",
                                letterSpacing: "0.2em", textTransform: "uppercase",
                                color: "#fff", textDecoration: "none",
                                border: "1px solid #0a0a0a", padding: "5px 10px", borderRadius: "2px",
                                background: "#0a0a0a", transition: "all 0.25s ease",
                                whiteSpace: "nowrap",
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#0a0a0a"; }}
                            onMouseLeave={e => { e.currentTarget.style.background = "#0a0a0a"; e.currentTarget.style.color = "#fff"; }}
                        >
                            Live <IconArrow />
                        </a>
                    ) : (
                        <span style={{
                            fontFamily: "'Courier New',monospace", fontSize: "7px",
                            letterSpacing: "0.18em", textTransform: "uppercase",
                            color: "#ccc", padding: "5px 10px",
                        }}>No Demo</span>
                    )}
                </div>
            </div>

            {/* Hover row fill effect via JS */}
            <style>{`
        .proj-row:hover .proj-hover-bg { transform: scaleX(1) !important; }
        .proj-row:hover .proj-title,
        .proj-row:hover .proj-year,
        .proj-row:hover .proj-index { color: #f9f9f7 !important; }
        .proj-row:hover .proj-desc { color: rgba(255,255,255,0.45) !important; }
        .proj-row:hover .proj-tag { background: transparent !important; border-color: rgba(255,255,255,0.2) !important; color: rgba(255,255,255,0.5) !important; }
        .proj-row:hover .proj-link { background: rgba(255,255,255,0.08) !important; border-color: rgba(255,255,255,0.2) !important; color: #fff !important; }
      `}</style>
        </div>
    );
}

// ── PROJECT SECTION ────────────────────────────────────────────────
export default function Project() {
    const wrapRef = useRef(null);
    const stickyRef = useRef(null);

    useEffect(() => {
        const wrap = wrapRef.current;
        const sticky = stickyRef.current;
        if (!wrap || !sticky) return;

        const ctx = gsap.context(() => {
            // Initial states
            gsap.set(".proj-label-inner", { y: "110%" });
            gsap.set(".proj-line-1, .proj-line-2", { y: "105%" });
            gsap.set(".proj-bg", { scale: 0.8, opacity: 0 });
            gsap.set(".proj-count", { opacity: 0, y: 20 });
            gsap.set(".proj-divider", { scaleX: 0, transformOrigin: "left center" });
            gsap.set(".proj-row", { opacity: 0, y: 32 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrap,
                    start: "top top",
                    end: "+=420%",
                    pin: sticky,
                    scrub: 1.2,
                    anticipatePin: 1,
                }
            });

            // BG number
            tl.to(".proj-bg", { scale: 1, opacity: 1, duration: 2, ease: "power3.out" }, 0);

            // Header
            tl.to(".proj-label-inner", { y: "0%", duration: 0.8, ease: "power3.out" }, 0.2);
            tl.to(".proj-line-1", { y: "0%", duration: 1, ease: "expo.out" }, 0.4);
            tl.to(".proj-line-2", { y: "0%", duration: 1, ease: "expo.out" }, 0.6);

            // Count
            tl.to(".proj-count", { opacity: 1, y: 0, duration: 1, ease: "expo.out" }, 0.8);
            tl.to(".proj-divider", { scaleX: 1, duration: 1.5, ease: "expo.out" }, 1.0);

            // Rows stagger in
            const rows = gsap.utils.toArray(".proj-row");
            tl.to(rows, {
                opacity: 1, y: 0,
                duration: 1.2,
                ease: "power3.out",
                stagger: 0.12,
            }, 1.2);

            // Final parallax
            tl.to(".proj-list", { y: -24, duration: 3, ease: "none" }, 2.8);

        }, wrap);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={wrapRef} style={{ height: "520svh", background: "#f9f9f7" }}>
            <div
                ref={stickyRef}
                className="relative overflow-hidden flex flex-col"
                style={{ height: "100svh", background: "#f9f9f7", paddingTop: "10vh" }}
            >
                {/* Noise overlay */}
                <div
                    className="absolute inset-0 z-0 opacity-[0.04] mix-blend-darken pointer-events-none"
                    style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
                />

                {/* Giant Background Number */}
                <div
                    className="proj-bg absolute pointer-events-none select-none"
                    style={{
                        bottom: "-4%", left: "-2vw", zIndex: 0,
                        fontSize: "clamp(180px,30vw,400px)",
                        fontWeight: 900, lineHeight: 1, letterSpacing: "-0.06em",
                        color: "transparent", WebkitTextStroke: "1.5px rgba(0,0,0,0.04)",
                    }}
                >05</div>

                {/* Header Block */}
                <div style={{ padding: "0 clamp(32px,8vw,120px)", position: "relative", zIndex: 2, flexShrink: 0 }}>
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-[28px] gap-6 md:gap-0">
                        <div>
                            <div style={{ overflow: "hidden", marginBottom: "16px", display: "inline-flex", alignItems: "center", gap: "12px" }}>
                                <div style={{ width: "28px", height: "1px", background: "#bbb", flexShrink: 0 }} />
                                <div className="proj-label-inner" style={{ fontFamily: "'Courier New',monospace", fontSize: "9px", letterSpacing: "0.32em", textTransform: "uppercase", color: "#aaa" }}>05 — Projects</div>
                            </div>
                            <h2 style={{ fontSize: "clamp(2.2rem,5.5vw,5rem)", fontWeight: 900, letterSpacing: "-0.04em", textTransform: "uppercase", color: "#0a0a0a", lineHeight: 1.05, margin: 0 }}>
                                <div style={{ overflow: "hidden" }}><div className="proj-line-1">WHAT I'VE</div></div>
                                <div style={{ overflow: "hidden" }}><div className="proj-line-2" style={{ color: "transparent", WebkitTextStroke: "2px #0a0a0a" }}>BUILT.</div></div>
                            </h2>
                        </div>
                        {/* Project count */}
                        <div className="proj-count" style={{ textAlign: "right", flexShrink: 0 }}>
                            <div style={{ fontSize: "clamp(3rem,6vw,6rem)", fontWeight: 900, letterSpacing: "-0.05em", color: "#0a0a0a", lineHeight: 1 }}>
                                {String(PROJECTS.length).padStart(2, "0")}
                            </div>
                            <div style={{ fontFamily: "'Courier New',monospace", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#bbb", marginTop: "4px" }}>Projects</div>
                        </div>
                    </div>
                    <div className="proj-divider" style={{ height: "1px", background: "linear-gradient(90deg, #0a0a0a 0%, rgba(0,0,0,0.06) 100%)", marginBottom: "0" }} />
                </div>

                {/* Project List */}
                <div
                    className="proj-list"
                    style={{
                        flex: 1,
                        padding: "0 clamp(32px,8vw,120px) 6vh",
                        position: "relative", zIndex: 2,
                        overflowY: "auto",
                        scrollbarWidth: "none",
                    }}
                >
                    <style>{`.proj-list::-webkit-scrollbar { display: none; }`}</style>
                    {PROJECTS.map((project, i) => (
                        <ProjectRow key={project.id} project={project} index={i} />
                    ))}
                    {/* Bottom border */}
                    <div style={{ height: "1px", background: "rgba(0,0,0,0.09)" }} />
                </div>
            </div>
        </div>
    );
}