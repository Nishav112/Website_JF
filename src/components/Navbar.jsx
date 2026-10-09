import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  ArrowUpRight,
  Home,
  Briefcase,
  Calculator,
  CreditCard,
  FileDown,
  Bell,
  Building2,
  PhoneCall,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { IMPORTANT_INFORMATION } from "../data/websiteData";
import { useLang } from "../i18n/useLang";
import LanguageToggle from "./LanguageToggle";

export default function Navbar() {
  const { t } = useLang();
  const location = useLocation();
  const [moreOpen, setMoreOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  // Close menus on page route changes during render
  const [prevPathname, setPrevPathname] = useState(location.pathname);
  if (prevPathname !== location.pathname) {
    setPrevPathname(location.pathname);
    setMobileOpen(false);
    setMoreOpen(false);
    setLoginOpen(false);
  }

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".navbar-dropdown")) {
        setMoreOpen(false);
        setLoginOpen(false);
      }
      if (navRef.current && !event.target.closest(".mobile-drawer-portal")) {
        const path = event.composedPath ? event.composedPath() : [];
        const inside =
          path.includes(navRef.current) ||
          navRef.current.contains(event.target);
        if (!inside && !mobileOpen) setMobileOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [mobileOpen]);

  const navItems = [
    { label: "Home", to: "/", icon: Home },
    { label: "Services", to: "/services", icon: Briefcase },
    { label: "Service Rates", to: "/service-rates", icon: Calculator },
    { label: "Payment", to: "/payment", icon: CreditCard },
    { label: "Support", to: "/contact", icon: PhoneCall },
  ];

  const secondaryItems = [
    { label: "About Us", to: "/about", icon: Building2 },
    { label: "Downloads", to: "/downloads", icon: FileDown },
    { label: "News & Notices", to: "/news", icon: Bell },
  ];

  const targetedSanction = IMPORTANT_INFORMATION.find(
    (item) => item.title === "Targeted Sanction List"
  );

  const terroristSanction = IMPORTANT_INFORMATION.find(
    (item) => item.title === "UN Terrorist Sanction List"
  );

  return (
    <>
      <header
        ref={navRef}
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-colors"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-15 sm:h-16 md:h-[72px] flex items-center justify-between gap-3">
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
              className="h-8 sm:h-9 md:h-10 w-auto block transition-transform duration-200 group-hover:scale-[1.02]"
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
                      : "text-slate-700 hover:text-[#059669]"
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
                  moreOpen ? "text-[#059669]" : "text-slate-700 hover:text-[#059669]"
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
                    className="block px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#059669] transition-colors"
                  >
                    {t("About Us")}
                  </NavLink>
                  <NavLink
                    to="/downloads"
                    onClick={() => setMoreOpen(false)}
                    className="block px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#059669] transition-colors"
                  >
                    {t("Downloads")}
                  </NavLink>
                  <NavLink
                    to="/news"
                    onClick={() => setMoreOpen(false)}
                    className="block px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#059669] transition-colors"
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
                      <span>{t("Un Terrorist Sanction List")}</span>
                      <ArrowUpRight size={13} className="text-slate-400" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </nav>

          {/* Zone 3: Primary Actions (Desktop & Mobile Controls) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageToggle />

            {/* Client Portal Login Dropdown (Desktop & Tablets) */}
            <div className="hidden sm:block relative navbar-dropdown">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLoginOpen(!loginOpen);
                  setMoreOpen(false);
                }}
                className="btn-smooth inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#059669] hover:bg-[#047857] shadow-xs whitespace-nowrap cursor-pointer"
              >
                <span>{t("Login")}</span>
                <ChevronDown
                  size={14}
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
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-semibold text-[#091E16] hover:bg-slate-50 hover:text-[#059669] transition-colors"
                  >
                    <span>{t("TMS Login ↗").replace(" ↗", "")}</span>
                    <ArrowUpRight size={15} className="text-[#059669]" />
                  </a>

                  <a
                    href="https://meroshare.cdsc.com.np/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-semibold text-[#091E16] hover:bg-slate-50 hover:text-[#059669] transition-colors"
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

            {/* Quick Mobile TMS Button (visible on small mobile screens) */}
            <a
              href="https://tms07.nepsetms.com.np/"
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold shadow-xs"
              title="Trade on TMS #07"
            >
              <span>TMS</span>
              <ArrowUpRight size={13} />
            </a>

            {/* Mobile Menu Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? t("Close menu") : t("Open mobile menu")}
              aria-expanded={mobileOpen}
              className="lg:hidden inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border border-slate-200 bg-white text-[#091E16] hover:bg-slate-50 transition-colors cursor-pointer shrink-0 shadow-xs text-xs font-semibold"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              <span className="hidden xs:inline">{mobileOpen ? "Close" : "Menu"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Comprehensive Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden mobile-drawer-portal">
          {/* Backdrop */}
          <div
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-200"
            aria-hidden="true"
          />

          {/* Drawer Sheet */}
          <div className="fixed inset-y-0 right-0 w-full max-w-[340px] bg-white border-l border-slate-200 shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-250">
            {/* Drawer Top Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white">
              <NavLink
                to="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center focus:outline-none"
              >
                <img
                  src="/jf-logo-green.png"
                  alt="JF Securities"
                  referrerPolicy="no-referrer"
                  className="h-8 w-auto block"
                />
              </NavLink>

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="w-9 h-9 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-[#091E16] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Drawer Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Trading Quick Portal Actions */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/90 space-y-2.5 shadow-xs">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-1">
                  {t("Client Portals")}
                </div>

                <a
                  href="https://tms07.nepsetms.com.np/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                    <span>{t("TMS Login ↗").replace(" ↗", "")} (Broker #07)</span>
                  </div>
                  <ArrowUpRight size={16} />
                </a>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="https://meroshare.cdsc.com.np/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-[#091E16] text-xs font-semibold transition-colors shadow-xs"
                  >
                    <span>Mero Share</span>
                    <ExternalLink size={12} className="opacity-70" />
                  </a>

                  <a
                    href="https://tms07.nepsetms.com.np/client-registration"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100 text-[#059669] text-xs font-semibold transition-colors"
                  >
                    <span>{t("Open Account")}</span>
                    <ArrowUpRight size={12} />
                  </a>
                </div>
              </div>

              {/* Main Nav Links */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-2 space-y-0.5 shadow-xs">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-2 py-1.5">
                  {t("Navigation")}
                </div>

                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.label}
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                          isActive
                            ? "bg-emerald-50 text-[#059669] border border-emerald-200/60"
                            : "text-slate-700 hover:bg-slate-50 hover:text-[#091E16]"
                        }`
                      }
                    >
                      <Icon size={16} className="shrink-0 opacity-80" />
                      <span>{t(item.label === "Service Rates" ? "Brokerage & Charges" : item.label)}</span>
                    </NavLink>
                  );
                })}

                <div className="my-1 border-t border-slate-100" />

                {secondaryItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.label}
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                          isActive
                            ? "bg-emerald-50 text-[#059669] border border-emerald-200/60"
                            : "text-slate-700 hover:bg-slate-50 hover:text-[#091E16]"
                        }`
                      }
                    >
                      <Icon size={16} className="shrink-0 opacity-80" />
                      <span>{t(item.label)}</span>
                    </NavLink>
                  );
                })}
              </div>

              {/* Regulatory & Quick Contact Footnote */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200/90 p-3 text-xs text-slate-600 space-y-2 shadow-xs">
                <div className="flex items-center gap-1.5 font-semibold text-[#059669]">
                  <ShieldCheck size={14} />
                  <span>SEBON License #20 · DP ID 13023300</span>
                </div>
                <div className="text-[11px] leading-relaxed text-slate-500">
                  Dharma Path, New Road, Kathmandu
                </div>
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                  <a
                    href="tel:01-5356099"
                    className="font-semibold text-[#091E16] hover:text-[#059669] mono-num"
                  >
                    01-5356099
                  </a>
                  <a
                    href="mailto:info@jfsecurities.com"
                    className="text-[#059669] hover:underline"
                  >
                    info@jfsecurities.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Quick-Dock Bar (For immediate thumb navigation on mobile screens) */}
      <nav
        aria-label="Mobile quick actions"
        className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-30 px-2 py-1.5 flex items-center justify-around shadow-lg"
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[10px] font-semibold transition-colors ${
              isActive ? "text-[#059669]" : "text-slate-600 hover:text-[#091E16]"
            }`
          }
        >
          <Home size={18} className="mb-0.5" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/services"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[10px] font-semibold transition-colors ${
              isActive ? "text-[#059669]" : "text-slate-600 hover:text-[#091E16]"
            }`
          }
        >
          <Briefcase size={18} className="mb-0.5" />
          <span>Services</span>
        </NavLink>

        <NavLink
          to="/service-rates"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[10px] font-semibold transition-colors ${
              isActive ? "text-[#059669]" : "text-slate-600 hover:text-[#091E16]"
            }`
          }
        >
          <Calculator size={18} className="mb-0.5" />
          <span>Rates</span>
        </NavLink>

        <a
          href="https://tms07.nepsetms.com.np/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-lg text-[10px] font-semibold text-white bg-[#059669] hover:bg-[#047857] shadow-xs"
        >
          <ArrowUpRight size={18} className="mb-0.5" />
          <span>Trade</span>
        </a>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[10px] font-semibold text-slate-600 hover:text-[#091E16] cursor-pointer"
        >
          <Menu size={18} className="mb-0.5" />
          <span>Menu</span>
        </button>
      </nav>
    </>
  );
}
