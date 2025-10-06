import React, { useEffect, useRef, memo } from "react";

// Singleton container for particles
const getContainer = () => {
  const id = "_coolMode_effect";
  let existingContainer = document.getElementById(id);

  if (existingContainer) {
    return existingContainer;
  }

  const container = document.createElement("div");
  container.setAttribute("id", id);
  container.setAttribute(
    "style",
    "overflow:hidden; position:fixed; height:100%; top:0; left:0; right:0; bottom:0; pointer-events:none; z-index:2147483647"
  );

  document.body.appendChild(container);

  return container;
};

let instanceCounter = 0;

// Throttle function to limit execution frequency
const throttle = (callback, delay) => {
  let lastCall = 0;
  return function (...args) {
    const now = performance.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      callback(...args);
    }
  };
};

const applyParticleEffect = (element, options) => {
  instanceCounter++;

  const defaultParticle = "circle";
  const particleType = options?.particle || defaultParticle;
  // Reduced particle sizes for better performance
  const sizes = [10, 15, 20, 25];
  // Reduced particle limit for better performance
  const limit = options?.limit || 25;

  let particles = [];
  let autoAddParticle = false;
  let mouseX = 0;
  let mouseY = 0;

  const container = getContainer();

  // Pre-create SVG templates for better performance
  const svgTemplates = {};
  if (particleType === "circle") {
    sizes.forEach(size => {
      const svgNS = "http://www.w3.org/2000/svg";
      const circleSVG = document.createElementNS(svgNS, "svg");
      const circle = document.createElementNS(svgNS, "circle");
      circle.setAttributeNS(null, "cx", (size / 2).toString());
      circle.setAttributeNS(null, "cy", (size / 2).toString());
      circle.setAttributeNS(null, "r", (size / 2).toString());
      
      circleSVG.appendChild(circle);
      circleSVG.setAttribute("width", size.toString());
      circleSVG.setAttribute("height", size.toString());
      
      svgTemplates[size] = circleSVG;
    });
  }

  function generateParticle() {
    const size = options?.size || sizes[Math.floor(Math.random() * sizes.length)];
    // Reduced speed values for better performance
    const speedHorz = options?.speedHorz || Math.random() * 8;
    const speedUp = options?.speedUp || Math.random() * 20;
    const spinVal = Math.random() * 360;
    const spinSpeed = Math.random() * 25 * (Math.random() <= 0.5 ? -1 : 1);
    const top = mouseY - size / 2;
    const left = mouseX - size / 2;
    const direction = Math.random() <= 0.5 ? -1 : 1;

    const particle = document.createElement("div");

    if (particleType === "circle") {
      // Clone from template for better performance
      const template = svgTemplates[size].cloneNode(true);
      const circle = template.querySelector('circle');
      if (circle) {
        circle.setAttributeNS(null, "fill", `hsl(${Math.random() * 360}, 70%, 50%)`);
      }
      particle.appendChild(template);
    } else {
      particle.innerHTML = `<img src="${particleType}" width="${size}" height="${size}" style="border-radius: 50%">`;
    }

    particle.style.position = "absolute";
    particle.style.transform = `translate3d(${left}px, ${top}px, 0px) rotate(${spinVal}deg)`;

    container.appendChild(particle);

    particles.push({
      direction,
      element: particle,
      left,
      size,
      speedHorz,
      speedUp,
      spinSpeed,
      spinVal,
      top,
    });
  }

  // Use requestAnimationFrame timestamp for timing
  let lastFrameTime = 0;
  const FRAME_RATE = 1000 / 30; // Limit to 30fps for better performance

  function refreshParticles(timestamp) {
    // Skip frames to maintain target frame rate
    if (timestamp - lastFrameTime < FRAME_RATE) {
      return;
    }
    lastFrameTime = timestamp;

    // Process particles in batches for better performance
    const len = particles.length;
    for (let i = 0; i < len; i++) {
      const p = particles[i];
      p.left = p.left - p.speedHorz * p.direction;
      p.top = p.top - p.speedUp;
      p.speedUp = Math.min(p.size, p.speedUp - 1);
      p.spinVal = p.spinVal + p.spinSpeed;

      if (
        p.top >=
        Math.max(window.innerHeight, document.body.clientHeight) + p.size
      ) {
        // Mark for removal instead of removing immediately
        p.remove = true;
        p.element.remove();
      } else {
        // Use transform for better performance
        p.element.style.transform = `translate3d(${p.left}px, ${p.top}px, 0px) rotate(${p.spinVal}deg)`;
      }
    }

    // Remove marked particles in a single operation
    particles = particles.filter(p => !p.remove);
  }

  let animationFrame;
  let lastParticleTimestamp = 0;
  // Increased delay between particles for better performance
  const particleGenerationDelay = options?.particleDelay || 50;

  function loop(timestamp) {
    if (
      autoAddParticle &&
      particles.length < limit &&
      timestamp - lastParticleTimestamp > particleGenerationDelay
    ) {
      generateParticle();
      lastParticleTimestamp = timestamp;
    }

    refreshParticles(timestamp);
    animationFrame = requestAnimationFrame(loop);
  }

  // Start animation loop
  animationFrame = requestAnimationFrame(loop);

  const isTouchInteraction = "ontouchstart" in window;

  const tap = isTouchInteraction ? "touchstart" : "mousedown";
  const tapEnd = isTouchInteraction ? "touchend" : "mouseup";
  const move = isTouchInteraction ? "touchmove" : "mousemove";

  // Throttled mouse position updates for better performance
  const updateMousePosition = throttle((e) => {
    if ("touches" in e) {
      mouseX = e.touches?.[0].clientX;
      mouseY = e.touches?.[0].clientY;
    } else {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }
  }, 16); // ~60fps

  const tapHandler = (e) => {
    updateMousePosition(e);
    autoAddParticle = true;
  };

  const disableAutoAddParticle = () => {
    autoAddParticle = false;
  };

  element.addEventListener(move, updateMousePosition, { passive: true });
  element.addEventListener(tap, tapHandler, { passive: true });
  element.addEventListener(tapEnd, disableAutoAddParticle, { passive: true });
  element.addEventListener("mouseleave", disableAutoAddParticle, {
    passive: true,
  });

  return () => {
    element.removeEventListener(move, updateMousePosition);
    element.removeEventListener(tap, tapHandler);
    element.removeEventListener(tapEnd, disableAutoAddParticle);
    element.removeEventListener("mouseleave", disableAutoAddParticle);

    // Cancel animation immediately
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }

    // Clean up particles
    particles.forEach(p => p.element.remove());
    particles = [];

    // Clean up container if this is the last instance
    if (--instanceCounter === 0) {
      container.remove();
    }
  };
};

// Memoized component to prevent unnecessary re-renders
export const CoolMode = memo(({ children, options }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      return applyParticleEffect(ref.current, options);
    }
  }, [options]);

  return React.cloneElement(children, { ref });
});

CoolMode.displayName = "CoolMode";
