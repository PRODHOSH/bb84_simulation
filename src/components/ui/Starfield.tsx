import React, { useMemo } from "react";

const Starfield: React.FC = () => {
  // generate star descriptors once
  const stars = useMemo(() => {
    const palette = [
      getComputedStyle(document.documentElement).getPropertyValue("--polar-vertical").trim() || "#00f0ff",
      getComputedStyle(document.documentElement).getPropertyValue("--polar-horizontal").trim() || "#60a5fa",
      getComputedStyle(document.documentElement).getPropertyValue("--polar-diagonal").trim() || "#a855f7",
      getComputedStyle(document.documentElement).getPropertyValue("--polar-antidiagonal").trim() || "#ff6ec7",
      "#ffffff",
    ];

    const arr = Array.from({ length: 120 }).map(() => {
      const size = Math.random() * 2 + 1; // 1-3px
      return {
        left: Math.random() * 100,
        top: Math.random() * 100,
        color: palette[Math.floor(Math.random() * palette.length)],
        size,
        delay: Math.random() * 4,
        opacity: 0.6 + Math.random() * 0.6,
      };
    });

    return arr;
  }, []);

  return (
    <div className="spa-star-overlay" aria-hidden>
      {stars.map((s, i) => (
        <div
          key={i}
          className="spa-star"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: s.color,
            boxShadow: `0 0 ${Math.max(6, s.size * 3)}px ${s.color}`,
            opacity: s.opacity,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Starfield;
