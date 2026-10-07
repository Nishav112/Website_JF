import { useContext } from "react";
import { LanguageContext } from "./context";

// const { lang, setLang, t, tb, n, ta } = useLang();
//   t("English text")  -> Nepali text when the site is in Nepali, otherwise unchanged
//   tb("Text **bold**") -> same, but renders **...** as <strong>
//   n(25)              -> number with Devanagari digits in Nepali mode
//   ta("Up to Rs. 50,000") -> money / range text translated for Nepali mode
export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}
