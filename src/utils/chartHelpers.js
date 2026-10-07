import { useState, useEffect } from "react";

export function useCountUp(target, duration = 1400, decimals = 2, trigger = true) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let raf;
    const start = performance.now();
    const from = 0;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(from + (target - from) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, trigger]);

  return value.toFixed(decimals);
}

export function buildPath(points, w, h, min, max) {
  const step = w / (points.length - 1);
  const range = max - min || 1;
  const coords = points.map((v, i) => {
    const x = i * step;
    const y = h - ((v - min) / range) * h;
    return [x, y];
  });
  let d = `M ${coords[0][0]},${coords[0][1]}`;
  for (let i = 1; i < coords.length; i++) {
    const [x0, y0] = coords[i - 1];
    const [x1, y1] = coords[i];
    const mx = (x0 + x1) / 2;
    d += ` C ${mx},${y0} ${mx},${y1} ${x1},${y1}`;
  }
  return { d, last: coords[coords.length - 1] };
}
