import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { IMPORTANT_INFORMATION } from "../data/websiteData";
import { useLang } from "../i18n/useLang";
import LanguageToggle from "./LanguageToggle";

export default function Navbar() {
  const { t } = useLang();
  const [moreOpen, setMoreOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".navbar-dropdown")) {
        setMoreOpen(false);
        setLoginOpen(false);
      }
      if (navRef.current) {
        const path = event.composedPath ? event.composedPath() : [];
        const inside =
          path.includes(navRef.current) ||
          navRef.current.contains(event.target);
        if (!inside) setMobileOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Services", to: "/services" },
    { label: "Service Rates", to: "/service-rates" },
    { label: "Payment", to: "/payment" },
    { label: "Support", to: "/contact" },
  ];

  const targetedSanction = IMPORTANT_INFORMATION.find(
    (item) => item.title === "Targeted Sanction List"
  );

  const terroristSanction = IMPORTANT_INFORMATION.find(
    (item) => item.title === "UN Terrorist Sanction List"
  );

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-colors"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 h-16 md:h-[72px] flex items-center justify-between gap-4">
        {/* Zone 1: Brand Title / Logo */}
        <NavLink
          to="/"
          className="flex items-center shrink-0 focus:outline-none group"
          aria-label="JF Securities Home"
        >
          <img
            src="/jf-logo-green.png"
            alt="JF Securities"
            referrerPolicy="no-referrer"
            className="h-9 md:h-10 w-auto block transition-transform duration-200 group-hover:scale-[1.02]"
          />
        </NavLink>

        {/* Zone 2: Desktop Primary Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `relative py-1.5 text-sm font-medium whitespace-nowrap transition-colors duration-150 ${
                  isActive
                    ? "text-[#059669] font-semibold"
                    : "text-slate-600 hover:text-[#091E16]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {t(item.label === "Service Rates" ? "Brokerage & Charges" : item.label)}
                  <span
                    className={`absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#059669] rounded-full transition-transform duration-200 origin-left ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}

          {/* More Dropdown for Secondary Pages */}
          <div className="relative navbar-dropdown">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setMoreOpen(!moreOpen);
                setLoginOpen(false);
              }}
              className={`flex items-center gap-1 py-1.5 text-sm font-medium whitespace-nowrap transition-colors duration-150 cursor-pointer ${
                moreOpen ? "text-[#059669]" : "text-slate-600 hover:text-[#091E16]"
              }`}
            >
              <span>{t("Resources")}</span>
              <ChevronDown
                size={15}
                className={`transition-transform duration-200 ${
                  moreOpen ? "rotate-180 text-[#059669]" : ""
                }`}
              />
            </button>

            {moreOpen && (
              <div className="absolute top-[calc(100%+12px)] left-0 w-60 bg-white rounded-xl p-2 shadow-xl shadow-slate-900/10 border border-slate-200/90 z-50">
                <NavLink
                  to="/about"
                  onClick={() => setMoreOpen(false)}
                  className="block px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-emerald-50/70 hover:text-[#059669] transition-colors"
                >
                  {t("About Us")}
                </NavLink>
                <NavLink
                  to="/downloads"
                  onClick={() => setMoreOpen(false)}
                  className="block px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-emerald-50/70 hover:text-[#059669] transition-colors"
                >
                  {t("Downloads")}
                </NavLink>
                <NavLink
                  to="/news"
                  onClick={() => setMoreOpen(false)}
                  className="block px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-emerald-50/70 hover:text-[#059669] transition-colors"
                >
                  {t("News & Notices")}
                </NavLink>

                <div className="my-1.5 border-t border-slate-100" />

                {targetedSanction?.href && (
                  <a
                    href={targetedSanction.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-[#091E16] transition-colors"
                  >
                    <span>{t("Targeted Sanction List")}</span>
                    <ArrowUpRight size={13} className="text-slate-400" />
                  </a>
                )}

                {terroristSanction?.href && (
                  <a
                    href={terroristSanction.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-[#091E16] transition-colors"
                  >
                    <span>{t("Terrorist Sanction List")}</span>
                    <ArrowUpRight size={13} className="text-slate-400" />
                  </a>
                )}
              </div>
            )}
          </div>
        </nav>

        {/* Zone 3: Primary Actions (Desktop & Mobile Controls) */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <LanguageToggle />

          {/* Client Portal Login Dropdown (Desktop) */}
          <div className="hidden sm:block relative navbar-dropdown">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLoginOpen(!loginOpen);
                setMoreOpen(false);
              }}
              className="btn-smooth inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#059669] hover:bg-[#047857] shadow-xs whitespace-nowrap cursor-pointer"
            >
              <span>{t("Login")}</span>
              <ChevronDown
                size={15}
                className={`transition-transform duration-200 ${
                  loginOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {loginOpen && (
              <div className="absolute top-[calc(100%+10px)] right-0 w-56 bg-white rounded-xl p-2 shadow-xl shadow-slate-900/10 border border-slate-200/90 z-50">
                <a
                  href="https://tms07.nepsetms.com.np/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-semibold text-[#091E16] hover:bg-emerald-50 hover:text-[#059669] transition-colors"
                >
                  <span>{t("TMS Login ↗").replace(" ↗", "")}</span>
                  <ArrowUpRight size={15} className="text-[#059669]" />
                </a>

                <a
                  href="https://meroshare.cdsc.com.np/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-semibold text-[#091E16] hover:bg-emerald-50 hover:text-[#059669] transition-colors"
                >
                  <span>{t("Mero Share ↗").replace(" ↗", "")}</span>
                  <ArrowUpRight size={15} className="text-[#059669]" />
                </a>

                <div className="my-1 border-t border-slate-100" />

                <a
                  href="https://www.nepalstock.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-[#091E16] transition-colors"
                >
                  <span>{t("Live Market")} (NEPSE)</span>
                  <ArrowUpRight size={14} className="text-slate-400" />
                </a>
              </div>
            )}
          </div>

          {/* Mobile Drawer Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={t("Open mobile menu")}
            aria-expanded={mobileOpen}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 bg-white text-[#091E16] hover:bg-slate-50 transition-colors cursor-pointer shrink-0"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-5 pt-3 pb-6 max-h-[calc(100vh-64px)] overflow-y-auto shadow-xl">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-emerald-50 text-[#059669]"
                      : "text-slate-700 hover:bg-slate-50"
                  }`
                }
              >
                {t(item.label === "Service Rates" ? "Brokerage & Charges" : item.label)}
              </NavLink>
            ))}

            <NavLink
              to="/downloads"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-emerald-50 text-[#059669]"
                    : "text-slate-700 hover:bg-slate-50"
                }`
              }
            >
              {t("Downloads")}
            </NavLink>

            <NavLink
              to="/news"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-emerald-50 text-[#059669]"
                    : "text-slate-700 hover:bg-slate-50"
                }`
              }
            >
              {t("News & Notices")}
            </NavLink>

            <NavLink
              to="/about"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-emerald-50 text-[#059669]"
                    : "text-slate-700 hover:bg-slate-50"
                }`
              }
            >
              {t("About Us")}
            </NavLink>
          </div>

          <div className="my-4 border-t border-slate-200" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <a
              href="https://tms07.nepsetms.com.np/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#059669] text-white text-sm font-semibold hover:bg-[#047857] transition-colors"
            >
              <span>{t("TMS Login ↗")}</span>
            </a>

            <a
              href="https://meroshare.cdsc.com.np/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-[#091E16] text-sm font-semibold hover:bg-slate-50 transition-colors"
            >
              <span>{t("Mero Share ↗")}</span>
            </a>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
            <a
              href="https://www.nepalstock.com/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="hover:text-[#059669] font-medium"
            >
              {t("Live Market ↗")}
            </a>
            {targetedSanction?.href && (
              <a
                href={targetedSanction.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="hover:text-[#059669]"
              >
                {t("Targeted Sanction List ↗")}
              </a>
            )}
            {terroristSanction?.href && (
              <a
                href={terroristSanction.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="hover:text-[#059669]"
              >
                {t("Terrorist Sanction List ↗")}
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
