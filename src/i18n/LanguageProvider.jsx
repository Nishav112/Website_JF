import { useCallback, useEffect, useMemo, useState } from "react";
import { LanguageContext, toNepaliDigits } from "./context";
import { NE } from "./ne";

const STORAGE_KEY = "jf-lang";

function readInitialLang() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "np" || saved === "en") return saved;
  } catch {
    /* storage unavailable - fall back to English */
  }
  return "en";
}

// Turns "some **bold** text" into [text, <strong>bold</strong>, text]
function renderBold(str) {
  return str.split("**").map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}

export default function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readInitialLang);

  const setLang = useCallback((next) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  // keep <html lang> in sync (also drives the Nepali font rules in App.jsx)
  useEffect(() => {
    document.documentElement.lang = lang === "np" ? "ne" : "en";
  }, [lang]);

  const value = useMemo(() => {
    const isNp = lang === "np";

    const t = (s) => (isNp ? NE[s] ?? s : s);
    const tb = (s) => renderBold(t(s));
    const n = (x) => (isNp ? toNepaliDigits(x) : String(x));
    const ta = (s) => {
      if (!isNp) return s;
      const out = s
        .replace(/^Up to (.*)$/, "$1 सम्म")
        .replace(/^Above (.*)$/, "$1 भन्दा माथि")
        .replace(/Rs\./g, "रु.");
      return toNepaliDigits(out);
    };

    return { lang, setLang, t, tb, n, ta };
  }, [lang, setLang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
