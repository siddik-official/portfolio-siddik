import React, { useMemo, memo } from "react";

const AnimatedGrid = memo(() => {
  // Pre-calculate animation styles for better performance
  const horizontalLines = useMemo(() => {
    return [...Array(20)].map((_, i) => ({
      key: `v-${i}`,
      animation: `gridPulse ${2 + Math.random() * 2}s ease-in-out infinite`,
      animationDelay: `${Math.random() * 2}s`,
    }));
  }, []);

  const verticalLines = useMemo(() => {
    return [...Array(20)].map((_, i) => ({
      key: `h-${i}`,
      animation: `gridPulse ${2 + Math.random() * 2}s ease-in-out infinite`,
      animationDelay: `${Math.random() * 2}s`,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="relative w-full h-full">
        {/* Grid Container - reduced mask intensity for better performance */}
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]">
          {/* Horizontal Lines - reduced from 40 to 20 */}
          <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] opacity-20">
            {horizontalLines.map((style) => (
              <div
                key={style.key}
                className="relative h-full w-full border-r border-blue-500/10"
                style={{
                  animation: style.animation,
                  animationDelay: style.animationDelay,
                }}
              />
            ))}
          </div>

          {/* Vertical Lines - reduced from 40 to 20 */}
          <div className="absolute inset-0 grid grid-rows-[repeat(20,1fr)] opacity-20">
            {verticalLines.map((style) => (
              <div
                key={style.key}
                className="relative w-full h-full border-b border-blue-500/10"
                style={{
                  animation: style.animation,
                  animationDelay: style.animationDelay,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

AnimatedGrid.displayName = "AnimatedGrid";

export default AnimatedGrid;
