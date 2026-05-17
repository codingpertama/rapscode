import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

const EMAILJS_SERVICE_ID = "service_5dzc76m";
const EMAILJS_TEMPLATE_ID = "template_etuutbl";
const EMAILJS_PUBLIC_KEY = "KBGNlA3CSZ_E9rJGj";

function IconArrow() {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

// ── FIELD ─────────────────────────────────────
function Field({ label, id, type = "text", value, onChange, multiline = false, error }) {
    const [focused, setFocused] = useState(false);
    const filled = value.length > 0;

    const baseStyle = {
        width: "100%",
        background: "transparent",
        border: "none",
        borderBottom: `1px solid ${error ? "#c0392b" : focused ? "#0a0a0a" : "rgba(0,0,0,0.15)"}`,
        outline: "none",
        fontFamily: "'Courier New', monospace",
        fontSize: "clamp(0.85rem, 1.1vw, 1rem)",
        color: "#0a0a0a",
        padding: "14px 0 10px",
        resize: "none",
        transition: "border-color 0.3s ease",
        display: "block",
        letterSpacing: "0.01em",
    };

    return (
        <div style={{ position: "relative", paddingTop: "18px" }}>
            {/* Floating label */}
            <label
                htmlFor={id}
                style={{
                    position: "absolute",
                    top: focused || filled ? "0px" : "32px",
                    left: 0,
                    fontFamily: "'Courier New', monospace",
                    fontSize: focused || filled ? "8px" : "9px",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: error ? "#c0392b" : focused ? "#0a0a0a" : "#bbb",
                    transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
                    pointerEvents: "none",
                    userSelect: "none",
                }}
            >
                {error || label}
            </label>

            {multiline ? (
                <textarea
                    id={id}
                    rows={5}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    style={{ ...baseStyle, paddingTop: "16px", lineHeight: 1.8 }}
                />
            ) : (
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    style={baseStyle}
                />
            )}

            {/* Focus line */}
            <div style={{
                position: "absolute",
                bottom: 0, left: 0,
                height: "1px",
                width: focused ? "100%" : "0%",
                background: error ? "#c0392b" : "#0a0a0a",
                transition: "width 0.35s cubic-bezier(0.4,0,0.2,1)",
            }} />
        </div>
    );
}

// ── CONTACT SECTION ───────────────────────────
export default function Contact() {
    const wrapRef = useRef(null);
    const stickyRef = useRef(null);
    const formRef = useRef(null);

    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("idle"); // idle | sending | success | error

    // ── GSAP scroll animation
    useEffect(() => {
        const wrap = wrapRef.current;
        const sticky = stickyRef.current;
        if (!wrap || !sticky) return;

        const ctx = gsap.context(() => {
            gsap.set(".contact-label-inner", { y: "110%" });
            gsap.set(".contact-line-1, .contact-line-2", { y: "105%" });
            gsap.set(".contact-bg", { scale: 0.8, opacity: 0 });
            gsap.set(".contact-divider", { scaleX: 0, transformOrigin: "left center" });
            gsap.set(".contact-left, .contact-right", { opacity: 0, y: 40 });

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

            tl.to(".contact-bg", { scale: 1, opacity: 1, duration: 2, ease: "power3.out" }, 0);
            tl.to(".contact-label-inner", { y: "0%", duration: 0.8, ease: "power3.out" }, 0.2);
            tl.to(".contact-line-1", { y: "0%", duration: 1, ease: "expo.out" }, 0.4);
            tl.to(".contact-line-2", { y: "0%", duration: 1, ease: "expo.out" }, 0.6);
            tl.to(".contact-divider", { scaleX: 1, duration: 1.5, ease: "expo.out" }, 0.8);
            tl.to(".contact-left", { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, 1.0);
            tl.to(".contact-right", { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, 1.15);
        }, wrap);

        return () => ctx.revert();
    }, []);

    // ── Validate
    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = "Nama wajib diisi";
        if (!form.email.trim()) e.email = "Email wajib diisi";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Format email tidak valid";
        if (!form.message.trim()) e.message = "Pesan wajib diisi";
        return e;
    };

    // ── Submit
    const handleSubmit = async () => {
        const e = validate();
        if (Object.keys(e).length) { setErrors(e); return; }
        setErrors({});
        setStatus("sending");

        try {
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                { from_name: form.name, from_email: form.email, message: form.message },
                EMAILJS_PUBLIC_KEY,
            );
            setStatus("success");
            setForm({ name: "", email: "", message: "" });
        } catch {
            setStatus("error");
        }
    };

    const handleChange = (field) => (e) => {
        setForm(prev => ({ ...prev, [field]: e.target.value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
    };

    return (
        <div ref={wrapRef} style={{ height: "150svh", background: "#f9f9f7" }}>
            <div
                ref={stickyRef}
                className="relative overflow-hidden flex flex-col"
                style={{ height: "100svh", background: "#f9f9f7", paddingTop: "10vh" }}
            >
                {/* Noise */}
                <div className="absolute inset-0 z-0 opacity-[0.04] mix-blend-darken pointer-events-none"
                    style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />

                {/* BG number */}
                <div className="contact-bg absolute pointer-events-none select-none" style={{
                    bottom: "-4%", right: "-2vw", zIndex: 0,
                    fontSize: "clamp(160px,28vw,380px)",
                    fontWeight: 900, lineHeight: 1, letterSpacing: "-0.06em",
                    color: "transparent", WebkitTextStroke: "1.5px rgba(0,0,0,0.04)",
                }}>06</div>

                {/* Header */}
                <div style={{ padding: "0 clamp(32px,8vw,120px)", position: "relative", zIndex: 2, flexShrink: 0 }}>
                    <div style={{ marginBottom: "24px" }}>
                        <div style={{ overflow: "hidden", marginBottom: "16px", display: "inline-flex", alignItems: "center", gap: "12px" }}>
                            <div style={{ width: "28px", height: "1px", background: "#bbb", flexShrink: 0 }} />
                            <div className="contact-label-inner" style={{ fontFamily: "'Courier New',monospace", fontSize: "9px", letterSpacing: "0.32em", textTransform: "uppercase", color: "#aaa" }}>06 — Contact</div>
                        </div>
                        <h2 style={{ fontSize: "clamp(2.2rem,5.5vw,5rem)", fontWeight: 900, letterSpacing: "-0.04em", textTransform: "uppercase", color: "#0a0a0a", lineHeight: 1.05, margin: 0 }}>
                            <div style={{ overflow: "hidden" }}><div className="contact-line-1">LET'S</div></div>
                            <div style={{ overflow: "hidden" }}><div className="contact-line-2" style={{ color: "transparent", WebkitTextStroke: "2px #0a0a0a" }}>CONNECT.</div></div>
                        </h2>
                    </div>
                    <div className="contact-divider" style={{ height: "1px", background: "linear-gradient(90deg, #0a0a0a 0%, rgba(0,0,0,0.06) 100%)" }} />
                </div>

                {/* Body */}
                <div className="flex flex-col md:grid items-start md:items-center"
                    style={{
                        flex: 1,
                        gridTemplateColumns: "1fr 1.4fr",
                        gap: "clamp(20px,4vw,60px)",
                        padding: "clamp(16px,2.5vh,32px) clamp(32px,8vw,120px) clamp(16px,2.5vh,32px)",
                        position: "relative", zIndex: 2,
                        overflowY: "auto",
                        scrollbarWidth: "none",
                    }}>

                    {/* LEFT — info */}
                    <div className="contact-left">
                        <p style={{
                            fontSize: "clamp(0.8rem,1vw,0.92rem)",
                            color: "rgba(0,0,0,0.38)", lineHeight: 2,
                            maxWidth: "320px", marginBottom: "40px",
                        }}>
                            Open to Collaborate, Lets Make Something Cool!
                        </p>

                        {/* Metadata */}
                        {[
                            { label: "Email", value: "rafa.sugarda@gmail.com" },
                            { label: "Base", value: "Bogor, Jawa Barat" },
                            { label: "Status", value: "Open to work" },
                        ].map(({ label, value }) => (
                            <div key={label} style={{ marginBottom: "20px" }}>
                                <div style={{ fontFamily: "'Courier New',monospace", fontSize: "8px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#bbb", marginBottom: "4px" }}>{label}</div>
                                <div style={{ fontSize: "clamp(0.8rem,0.95vw,0.9rem)", fontWeight: 700, color: "#0a0a0a", letterSpacing: "-0.01em" }}>{value}</div>
                            </div>
                        ))}

                        {/* Social links */}
                        <div style={{ marginTop: "32px", display: "flex", gap: "12px" }}>
                            {[
                                { label: "GitHub", href: "https://github.com/codingpertama" },
                                { label: "LinkedIn", href: "https://www.linkedin.com/in/rafa-hafiz-iqbal-sugarda-04010a32b/" },
                            ].map(({ label, href }) => (
                                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                                    style={{
                                        display: "inline-flex", alignItems: "center", gap: "6px",
                                        fontFamily: "'Courier New',monospace", fontSize: "8px",
                                        letterSpacing: "0.18em", textTransform: "uppercase",
                                        color: "#888", textDecoration: "none",
                                        border: "1px solid #e0e0de", padding: "6px 12px", borderRadius: "2px",
                                        background: "#fff", transition: "all 0.2s ease",
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.background = "#0a0a0a"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#0a0a0a"; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#888"; e.currentTarget.style.borderColor = "#e0e0de"; }}
                                >
                                    {label} <IconArrow />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT — form */}
                    <div className="contact-right w-full" ref={formRef}>
                        {status === "success" ? (
                            <div style={{ paddingTop: "20px" }}>
                                <div style={{ fontSize: "clamp(1.4rem,2.5vw,2rem)", fontWeight: 900, letterSpacing: "-0.03em", color: "#0a0a0a", marginBottom: "12px", textTransform: "uppercase" }}>Pesan Terkirim.</div>
                                <p style={{ fontFamily: "'Courier New',monospace", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#bbb", lineHeight: 2 }}>Makasih udah reach out — gw bakal bales secepatnya.</p>
                                <button
                                    onClick={() => setStatus("idle")}
                                    style={{
                                        marginTop: "28px",
                                        fontFamily: "'Courier New',monospace", fontSize: "8px",
                                        letterSpacing: "0.22em", textTransform: "uppercase",
                                        color: "#888", background: "none", border: "1px solid #e0e0de",
                                        padding: "8px 16px", borderRadius: "2px", cursor: "pointer",
                                        transition: "all 0.2s",
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.background = "#0a0a0a"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#0a0a0a"; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#888"; e.currentTarget.style.borderColor = "#e0e0de"; }}
                                >
                                    Kirim lagi
                                </button>
                            </div>
                        ) : (
                            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(20px,3vh,32px)" }}>
                                <Field label="Nama" id="name" value={form.name} onChange={handleChange("name")} error={errors.name} />
                                <Field label="Email" id="email" type="email" value={form.email} onChange={handleChange("email")} error={errors.email} />
                                <Field label="Pesan" id="message" value={form.message} onChange={handleChange("message")} multiline error={errors.message} />

                                {status === "error" && (
                                    <p style={{ fontFamily: "'Courier New',monospace", fontSize: "8px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#c0392b" }}>
                                        Gagal kirim — coba lagi atau hubungi lewat email langsung.
                                    </p>
                                )}

                                {/* Submit */}
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <span style={{ fontFamily: "'Courier New',monospace", fontSize: "8px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#ccc" }}>
                                        {status === "sending" ? "Mengirim..." : "* semua field wajib diisi"}
                                    </span>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={status === "sending"}
                                        style={{
                                            display: "inline-flex", alignItems: "center", gap: "10px",
                                            fontFamily: "'Courier New',monospace", fontSize: "9px",
                                            letterSpacing: "0.22em", textTransform: "uppercase",
                                            color: "#f9f9f7", background: "#0a0a0a",
                                            border: "1px solid #0a0a0a", padding: "10px 20px",
                                            borderRadius: "2px", cursor: status === "sending" ? "not-allowed" : "pointer",
                                            opacity: status === "sending" ? 0.5 : 1,
                                            transition: "all 0.25s ease",
                                        }}
                                        onMouseEnter={e => { if (status !== "sending") { e.currentTarget.style.background = "#f9f9f7"; e.currentTarget.style.color = "#0a0a0a"; } }}
                                        onMouseLeave={e => { e.currentTarget.style.background = "#0a0a0a"; e.currentTarget.style.color = "#f9f9f7"; }}
                                    >
                                        {status === "sending" ? "Mengirim" : "Kirim Pesan"} <IconArrow />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}