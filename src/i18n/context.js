import { createContext } from "react";

// Shared language context. Values are provided by <LanguageProvider />.
export const LanguageContext = createContext(null);

const DEVANAGARI_DIGITS = "०१२३४५६७८९";

// Replace 0-9 with Devanagari digits (used only in Nepali mode).
export const toNepaliDigits = (value) =>
  String(value).replace(/\d/g, (d) => DEVANAGARI_DIGITS[d]);
