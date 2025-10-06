/**
 * Performance optimization utilities for the portfolio website
 */

/**
 * Creates a debounced function that delays invoking the provided function
 * until after the specified wait time has elapsed since the last time it was invoked.
 * 
 * @param {Function} func - The function to debounce
 * @param {number} wait - The number of milliseconds to delay
 * @returns {Function} - The debounced function
 */
export function debounce(func, wait = 100) {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Creates a throttled function that only invokes the provided function
 * at most once per every specified wait milliseconds.
 * 
 * @param {Function} func - The function to throttle
 * @param {number} wait - The number of milliseconds to throttle invocations to
 * @returns {Function} - The throttled function
 */
export function throttle(func, wait = 100) {
  let lastCall = 0;
  
  return function executedFunction(...args) {
    const now = Date.now();
    
    if (now - lastCall >= wait) {
      func(...args);
      lastCall = now;
    }
  };
}

/**
 * Memoizes a function to cache its results based on the arguments provided.
 * 
 * @param {Function} func - The function to memoize
 * @returns {Function} - The memoized function
 */
export function memoize(func) {
  const cache = new Map();
  
  return function executedFunction(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = func(...args);
    cache.set(key, result);
    return result;
  };
}

/**
 * Creates a function that will only execute once the browser is idle.
 * Uses requestIdleCallback with a fallback to setTimeout.
 * 
 * @param {Function} func - The function to execute during idle time
 * @param {Object} options - Options for requestIdleCallback
 * @returns {Function} - The idle-executed function
 */
export function idleCallback(func, options = { timeout: 1000 }) {
  return function executedFunction(...args) {
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(() => func(...args), options);
    } else {
      setTimeout(() => func(...args), 1);
    }
  };
}

/**
 * Optimizes animations by using requestAnimationFrame
 * 
 * @param {Function} callback - The animation frame callback
 * @param {number} fpsLimit - Optional FPS limit (e.g., 30 for 30fps)
 * @returns {Function} - Function to start the animation loop
 */
export function createAnimationLoop(callback, fpsLimit = 0) {
  let animationId = null;
  let lastFrameTime = 0;
  const interval = fpsLimit ? 1000 / fpsLimit : 0;
  
  const animate = (timestamp) => {
    animationId = requestAnimationFrame(animate);
    
    // If no FPS limit or enough time has passed since last frame
    if (!interval || timestamp - lastFrameTime >= interval) {
      lastFrameTime = timestamp;
      callback(timestamp);
    }
  };
  
  return {
    start: () => {
      if (!animationId) {
        animationId = requestAnimationFrame(animate);
      }
      return () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
      };
    },
    stop: () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    }
  };
}