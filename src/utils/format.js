/**
 * Display formatters for NEPSE market data.
 *
 * All of these are pure and null-safe: a missing value renders as an em dash
 * rather than "NaN", so a partial API failure stays visually honest.
 *
 * Nepal follows the lakh/crore (Indian) numbering system, so grouping uses
 * "en-IN" and large amounts are abbreviated the way a Nepali broker's
 * terminal would show them.
 */

const CRORE = 1e7;
const LAKH = 1e5;
const ARAB = 1e9;

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** Nepal Standard Time, UTC+05:45. */
const NPT_OFFSET_MIN = 345;

const DASH = "—";

function usable(n) {
  return typeof n === "number" && Number.isFinite(n);
}

/** Indian-grouped number, e.g. 17270449.5 -> "1,72,70,449.5". */
export function formatNumber(n, decimals = 2) {
  if (!usable(n)) return DASH;
  return n.toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

export function formatSigned(n, decimals = 2) {
  if (!usable(n)) return DASH;
  return (n > 0 ? "+" : "") + formatNumber(n, decimals);
}

export function formatPercent(n, decimals = 2) {
  if (!usable(n)) return DASH;
  return formatSigned(n, decimals) + "%";
}

/** Rupee amount, abbreviated to the largest sensible unit. */
export function formatMoney(n) {
  if (!usable(n)) return DASH;
  const abs = Math.abs(n);

  if (abs >= ARAB) return `Rs ${formatNumber(n / ARAB, 2)} Ar`;
  if (abs >= CRORE) return `Rs ${formatNumber(n / CRORE, 2)} Cr`;
  if (abs >= LAKH) return `Rs ${formatNumber(n / LAKH, 2)} L`;
  return `Rs ${formatNumber(n, 0)}`;
}

/** Share/volume count, abbreviated the same way. */
export function formatCompact(n) {
  if (!usable(n)) return DASH;
  const abs = Math.abs(n);

  if (abs >= CRORE) return `${formatNumber(n / CRORE, 2)} Cr`;
  if (abs >= LAKH) return `${formatNumber(n / LAKH, 2)} L`;
  return formatNumber(n, 0);
}

/**
 * Upstream timestamps are Nepal wall-clock with no timezone suffix
 * (e.g. "2026-09-24T14:59:59"). Parsing them with `new Date()` would silently
 * reinterpret them in the visitor's own timezone, so the clock is rendered
 * from the raw string instead.
 */
export function formatNepalTime(iso) {
  if (typeof iso !== "string") return null;
  const m = iso.match(/T(\d{2}):(\d{2})/);
  if (!m) return null;

  const h = Number(m[1]);
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m[2]} ${suffix}`;
}

export function formatNepalDate(iso) {
  if (typeof iso !== "string") return null;
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return null;

  const month = Number(m[2]) - 1;
  if (month < 0 || month > 11) return null;

  return `${Number(m[3])} ${MONTHS[month]} ${m[1]}`;
}

/** Wall-clock NPT string -> epoch ms, for age maths. */
function nepalWallClockToMs(iso) {
  if (typeof iso !== "string") return null;
  const m = iso.match(
    /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})(?::(\d{2}))?/,
  );
  if (!m) return null;

  return (
    Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +(m[6] ?? 0)) -
    NPT_OFFSET_MIN * 60000
  );
}

/**
 * How long ago the feed was written, so a stale page never looks live.
 * Deliberately rounds up to "just now" for sub-minute and future skew.
 */
export function formatAge(iso, now = Date.now()) {
  const t = nepalWallClockToMs(iso);
  if (t === null) return null;

  const mins = Math.floor((now - t) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;

  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hr${hours > 1 ? "s" : ""} ago`;

  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

/** True once the feed is old enough that "live" is a misleading word. */
export function isStale(iso, thresholdMin = 45, now = Date.now()) {
  const t = nepalWallClockToMs(iso);
  if (t === null) return false;
  return now - t > thresholdMin * 60000;
}
