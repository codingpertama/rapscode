import {
  useMotionValue,
  useSpring,
  motion,
  useMotionTemplate,
  useTransform,
} from "framer-motion";

import ScrollVelocity from "./ScrollVelocity";
import Hyperspeed from "./Hyperspeed";

const HYPERSPEED_OPTIONS = {
  distortion: "turbulentDistortion",
  length: 400,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 4,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 20,
  lightPairsPerRoadWay: 40,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [60, 80],
  movingCloserSpeed: [-120, -160],
  carLightsLength: [400 * 0.03, 400 * 0.2],
  carLightsRadius: [0.05, 0.14],
  carWidthPercentage: [0.3, 0.5],
  carShiftX: [-0.8, 0.8],
  carFloorSeparation: [0, 5],
  colors: {
    roadColor: 0x080808,
    islandColor: 0x0a0a0a,
    background: 0xffffff,
    shoulderLines: 0x131318,
    brokenLines: 0x131318,
    leftCars: [0xff102a, 0xeb383e, 0xff102a],
    rightCars: [0xdadafa, 0xbebae3, 0x8f97e4],
    sticks: 0xdadafa,
  },
};

export default function HeroReveal() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth cursor untuk mask puddle
  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  // Smooth cursor untuk parallax (lebih lambat = lebih cinematic)
  const parallaxX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const parallaxY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  // Transform mouse position → parallax offset
  // Layer 2 (base): gerak dikit, lebih "jauh"
  const imgX = useTransform(parallaxX, [0, window.innerWidth], [-18, 18]);
  const imgY = useTransform(parallaxY, [0, window.innerHeight], [-12, 12]);

  // Layer 3 (reveal): gerak lebih, lebih "dekat"
  const revealX = useTransform(parallaxX, [0, window.innerWidth], [-28, 28]);
  const revealY = useTransform(parallaxY, [0, window.innerHeight], [-18, 18]);

  function handleMouseMove(e) {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }

  const maskImage = useMotionTemplate`
  radial-gradient(circle 110px at ${smoothX}px ${smoothY}px, black 99.5%, transparent 100%),
  radial-gradient(circle 70px at calc(${smoothX}px - 50px) calc(${smoothY}px + 30px), black 99.5%, transparent 100%),
  radial-gradient(circle 80px at calc(${smoothX}px + 50px) calc(${smoothY}px - 25px), black 99.5%, transparent 100%),
  radial-gradient(circle 60px at calc(${smoothX}px + 30px) calc(${smoothY}px + 60px), black 99.5%, transparent 100%),
  radial-gradient(circle 55px at calc(${smoothX}px - 40px) calc(${smoothY}px - 50px), black 99.5%, transparent 100%)
`;

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative h-screen overflow-hidden"
    >
      {/* LAYER 0: HYPERSPEED */}
      <div className="absolute inset-0 z-0">
        <Hyperspeed effectOptions={HYPERSPEED_OPTIONS} />
      </div>

      {/* WHITE OVERLAY */}
      <div className="absolute inset-0 z-[1] pointer-events-none" />

      {/* LAYER 1: SCROLLING TEXT */}
      <div
        className="absolute inset-0 z-[2] flex flex-col justify-center pointer-events-none"
        style={{ mixBlendMode: "difference" }}
      >
        <ScrollVelocity
          texts={["RAFA HAFIZ — 19", "COFFEE CODE REPEAT"]}
          velocity={120}
          className="text-[12vw] font-black uppercase text-white tracking-[-0.08em] leading-none"
        />
      </div>

      {/* LAYER 2: BASE IMAGE — parallax lambat */}
      <motion.img
        src="/rapsnobg.png"
        alt="Base"
        className="absolute inset-0 z-[3] h-full w-full object-contain pointer-events-none"
        style={{
          x: imgX,
          y: imgY,
          scale: 1.06, // sedikit scale up biar gak keliatan edge saat gerak
        }}
      />

      {/* LAYER 3: REVEAL IMAGE — parallax lebih cepat (depth effect) */}
      <motion.div
        className="absolute inset-0 z-[4] pointer-events-none"
        style={{
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
          x: revealX,
          y: revealY,
          scale: 1.08,
        }}
      >
        <motion.img
          src="/helmrafa.png"
          alt="Reveal"
          className="h-full w-full object-contain"
        />
      </motion.div>

      {/* SUBTLE GLOW */}
      <div className="absolute inset-0 bg-black/5 blur-3xl z-[2] pointer-events-none" />

      {/* LAYER 4: CONTENT */}
      <div
        className="absolute inset-0 z-[5] flex h-full flex-col justify-end pb-20 px-10 md:px-20 pointer-events-none"
        style={{ mixBlendMode: "difference" }}
      >
        <div className="max-w-xl">
          <p
            style={{
              color: "white",
              fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)",
              fontWeight: 300,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            UI/UX, Web Development & Mobile Application
          </p>
        </div>
      </div>

      {/* NOISE */}
      <div
        className="pointer-events-none absolute inset-0 z-[6] opacity-[0.05] mix-blend-darken"
        style={{
          backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />
    </section>
  );
}