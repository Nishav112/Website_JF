import { useState } from "react";
import { Link } from "react-router-dom";
import { X, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import {
  NAV_ROUTES,
  IMPORTANT_INFORMATION,
} from "../data/websiteData";
import { useLang } from "../i18n/useLang";

function FooterCol({ title, items, fallbackRoute }) {
  const { t } = useLang();

  return (
    <div>
      <div className="text-xs font-semibold text-white tracking-wide mb-4">
        {t(title)}
      </div>

      <div className="flex flex-col gap-2.5">
        {items.map((it, i) => {
          const to = NAV_ROUTES[it] || fallbackRoute;
          return to ? (
            <Link
              key={i}
              to={to}
              className="text-[13.5px] text-slate-300 hover:text-emerald-400 transition-colors"
            >
              {t(it)}
            </Link>
          ) : (
            <Link
              key={i}
              to="/services"
              className="text-[13.5px] text-slate-300 hover:text-emerald-400 transition-colors"
            >
              {t(it)}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function Footer() {
  const { t } = useLang();
  const [selectedOfficer, setSelectedOfficer] = useState(null);

  return (
    <footer className="bg-[#091E16] text-slate-300 border-t border-white/10">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 pt-16 pb-10">
        <div className="footer-grid grid gap-10 mb-12">
          {/* Company Regulatory Info */}
          <div className="pr-0 lg:pr-6">
            <img
              src="/jf-logo-white.png"
              alt="JF Securities"
              referrerPolicy="no-referrer"
              className="h-9 w-auto block mb-5"
            />

            <div className="flex flex-col gap-2 text-xs leading-relaxed text-slate-300/90">
              <p>
                {t("Stock Brokerage Services License No 20 by Securities Board of Nepal (SEBON).")}
              </p>
              <p>
                {t("Member Broker No. 7 of Nepal Stock Exchange Ltd (NEPSE).")}
              </p>
              <p>
                {t("Depository Participant (DP) Services License No 134 by Securities Board of Nepal (SEBON). CDS & Clearing Ltd. (CDSCL) DPID 13023300.")}
              </p>
              <p>
                {t("Clearing Member (CM) Services Licensed by CDS & Clearing Ltd. (CDSCL) 7.")}
              </p>
              <p>{t("Margin Trading Licensed by SEBON 7")}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-xs font-semibold text-white tracking-wide mb-4">
              {t("Quick links")}
            </div>

            <div className="flex flex-col gap-2.5 text-[13.5px]">
              <Link to="/" className="text-slate-300 hover:text-emerald-400 transition-colors">
                {t("Home")}
              </Link>
              <Link to="/about" className="text-slate-300 hover:text-emerald-400 transition-colors">
                {t("About Us")}
              </Link>
              <Link to="/services" className="text-slate-300 hover:text-emerald-400 transition-colors">
                {t("Services")}
              </Link>
              <Link to="/service-rates" className="text-slate-300 hover:text-emerald-400 transition-colors">
                {t("Brokerage & Charges")}
              </Link>
              <Link to="/news" className="text-slate-300 hover:text-emerald-400 transition-colors">
                {t("News & Notices")}
              </Link>
              <Link to="/downloads" className="text-slate-300 hover:text-emerald-400 transition-colors">
                {t("Download")}
              </Link>
              <Link to="/contact" className="text-slate-300 hover:text-emerald-400 transition-colors">
                {t("Contact Us")}
              </Link>
            </div>
          </div>

          {/* Services */}
          <FooterCol
            title="Services"
            items={["Brokerage", "DEMAT", "Margin Trading"]}
            fallbackRoute="/services"
          />

          {/* Important Information */}
          <div>
            <div className="text-xs font-semibold text-white tracking-wide mb-4">
              {t("Important Information")}
            </div>

            <div className="flex flex-col gap-2.5">
              {IMPORTANT_INFORMATION.map((item, i) => {
                if (item.type === "officer") {
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedOfficer(item)}
                      className="text-[13.5px] text-slate-300 hover:text-emerald-400 transition-colors text-left cursor-pointer"
                    >
                      {t(item.title)}
                    </button>
                  );
                }

                return (
                  <a
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[13.5px] text-slate-300 hover:text-emerald-400 transition-colors"
                  >
                    <span>{t(item.title)}</span>
                    <ArrowUpRight size={13} className="opacity-75" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="text-xs font-semibold text-white tracking-wide mb-4">
              {t("Contact")}
            </div>

            <div className="flex flex-col gap-3 text-[13.5px] text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>{t("Dharma Path, New Road, Kathmandu")}</span>
              </div>

              <a
                href="tel:01-5356099"
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors mono-num"
              >
                <Phone size={15} className="text-emerald-400 shrink-0" />
                <span>01-5356099</span>
              </a>

              <a
                href="mailto:info@jfsecurities.com"
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors break-all"
              >
                <Mail size={15} className="text-emerald-400 shrink-0" />
                <span>info@jfsecurities.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <span>{t("© 2026 JF Securities. All rights reserved.")}</span>

          <div className="flex items-center gap-6">
            <Link
              to="/privacy-policy"
              className="hover:text-emerald-400 transition-colors"
            >
              {t("Privacy Policy")}
            </Link>

            <Link
              to="/terms-and-conditions"
              className="hover:text-emerald-400 transition-colors"
            >
              {t("Terms & Conditions")}
            </Link>
          </div>
        </div>
      </div>

      {/* Officer Information Modal */}
      {selectedOfficer && (
        <div
          onClick={() => setSelectedOfficer(null)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-5 z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white rounded-2xl p-6 sm:p-8 shadow-2xl relative text-[#091E16] border border-slate-200"
          >
            <button
              type="button"
              onClick={() => setSelectedOfficer(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer transition-colors"
              aria-label={t("Close")}
            >
              <X size={18} />
            </button>

            <div className="mb-5">
              <div className="text-xs font-semibold text-[#059669] mb-1">
                {t(selectedOfficer.role)}
              </div>

              <h2 className="disp text-2xl sm:text-3xl text-[#091E16]">
                {t(selectedOfficer.name)}
              </h2>
            </div>

            <div className="bg-[#F9FBF9] border border-slate-200/80 rounded-xl p-4 mb-5 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">{t("Contact Number:")}</span>
                <a
                  href={`tel:${selectedOfficer.phone}`}
                  className="font-semibold text-[#059669] hover:underline mono-num"
                >
                  {selectedOfficer.phone}
                </a>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500">{t("Email:")}</span>
                <a
                  href={`mailto:${selectedOfficer.email}`}
                  className="font-semibold text-[#059669] hover:underline"
                >
                  {selectedOfficer.email}
                </a>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-slate-600">
              {t(selectedOfficer.message)}
            </p>
          </div>
        </div>
      )}
    </footer>
  );
}

export default Footer;
