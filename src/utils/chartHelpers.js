import { useEffect, useRef, useState } from "react";

/**
 * Animates towards `target` and returns the current number.
 *
 * The first run reveals from 0; later runs tween from whatever is already on
 * screen, so a background refresh animates the delta instead of replaying a
 * full count. Respects `prefers-reduced-motion` by snapping.
 *
 * Returns a number, not a string - format at the call site.
 */
export function useCountUp(target, duration = 900) {
  const [value, setValue] = useState(0);
  const current = useRef(null);

  useEffect(() => {
    if (typeof target !== "number" || !Number.isFinite(target)) return;

    const from = current.current ?? 0;
    if (from === target) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      // Snap on the next frame instead of animating.
      const id = requestAnimationFrame(() => {
        current.current = target;
        setValue(target);
      });
      return () => cancelAnimationFrame(id);
    }

    let raf;
    const start = performance.now();

    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - p) ** 3;
      const next = from + (target - from) * eased;

      current.current = next;
      setValue(next);

      if (p < 1) raf = requestAnimationFrame(tick);
      else current.current = target;
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
}

function finiteNumbers(values) {
  if (!Array.isArray(values)) return [];
  return values.filter((v) => typeof v === "number" && Number.isFinite(v));
}

/**
 * Vertical range for the chart, padded so the line never touches the edges.
 */
export function getExtent(values, padRatio = 0.06) {
  const nums = finiteNumbers(values);
  if (nums.length === 0) return { min: 0, max: 0 };

  const lo = Math.min(...nums);
  const hi = Math.max(...nums);
  const pad = (hi - lo || Math.abs(hi) || 1) * padRatio;

  return { min: lo - pad, max: hi + pad };
}

/**
 * Builds a smooth SVG path plus the trailing point, for use as a chart line or
 * as a filled area (`d + " L w,h L 0,h Z"`).
 *
 * Tolerates empty and single-point input: those render as a flat baseline
 * rather than throwing, so a not-yet-loaded chart cannot crash the page.
 * `min`/`max` fall back to the data's own range.
 */
export function buildPath(points, w, h, min, max) {
  const values = finiteNumbers(points);
  const baseline = { d: `M 0,${h} L ${w},${h}`, last: [w, h] };

  if (values.length === 0) return { d: "", last: [0, h] };
  if (values.length === 1) return baseline;

  const lo = Number.isFinite(min) ? min : Math.min(...values);
  const hi = Number.isFinite(max) ? max : Math.max(...values);
  const range = hi - lo || 1;
  const step = w / (values.length - 1);

  const coords = values.map((v, i) => [
    i * step,
    h - ((v - lo) / range) * h,
  ]);

  const n = (n2) => n2.toFixed(2);

  let d = `M ${n(coords[0][0])},${n(coords[0][1])}`;
  for (let i = 1; i < coords.length; i++) {
    const [x0, y0] = coords[i - 1];
    const [x1, y1] = coords[i];
    const mx = (x0 + x1) / 2;
    d += ` C ${n(mx)},${n(y0)} ${n(mx)},${n(y1)} ${n(x1)},${n(y1)}`;
  }

  return { d, last: coords[coords.length - 1] };
}
