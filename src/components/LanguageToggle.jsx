import { useLang } from "../i18n/useLang";

// EN | नेपाली switch. Shown in the navbar, so it is available on every page.
export default function LanguageToggle() {
  const { lang, setLang, t } = useLang();

  const segment = (value, label, ariaLabel) => {
    const active = lang === value;
    return (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setLang(value);
        }}
        aria-pressed={active}
        aria-label={ariaLabel}
        className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all duration-150 whitespace-nowrap cursor-pointer ${
          active
            ? "bg-[#059669] text-white shadow-xs"
            : "text-slate-600 hover:text-[#091E16]"
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div
      role="group"
      aria-label={t("Language")}
      className="inline-flex items-center gap-0.5 p-0.5 rounded-lg border border-slate-200 bg-slate-100/80 shrink-0"
    >
      {segment("en", "EN", "English")}
      {segment("np", "नेपाली", "नेपाली")}
    </div>
  );
}
