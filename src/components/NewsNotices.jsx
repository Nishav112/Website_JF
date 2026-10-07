import { FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { NOTICES } from "../data/websiteData";
import { useLang } from "../i18n/useLang";

function NewsNotices() {
  const { t } = useLang();

  return (
    <section className="max-w-[1120px] mx-auto px-4 sm:px-6 py-8 sm:py-16 md:py-24">
      <div className="max-w-2xl mb-6 sm:mb-10">
        <div className="text-xs sm:text-sm font-semibold text-[#059669] mb-1 sm:mb-2">
          {t("Latest notices")}
        </div>

        <h1 className="disp text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-[#091E16]">
          {t("News & notices")}
        </h1>
      </div>

      {NOTICES.length === 0 ? (
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 p-5 sm:p-10 max-w-2xl shadow-xs">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-50 border border-emerald-100 text-[#059669] flex items-center justify-center mb-3 sm:mb-4">
            <FileText size={19} />
          </div>

          <h2 className="disp text-base sm:text-xl text-[#091E16] mb-1.5 sm:mb-2">
            {t("No new notices at the moment.")}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 sm:mb-6">
            {t("Please check back later for updates and announcements.")}
          </p>

          <Link
            to="/downloads"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#059669] hover:text-[#047857]"
          >
            <span>{t("Browse KYC & Demat forms")}</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 divide-y divide-slate-100 max-w-3xl shadow-xs">
          {NOTICES.map((n, i) => (
            <a
              key={i}
              href={n.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 sm:gap-4 p-3.5 sm:p-5 hover:bg-emerald-50/30 transition-colors"
            >
              <div className="flex items-center gap-2.5 sm:gap-3.5">
                <FileText size={17} className="text-[#059669] shrink-0" />
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-[#091E16]">
                    {n.title}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                    <span>{n.tag}</span>
                    <span aria-hidden="true" className="mx-1.5">·</span>
                    <span>{n.date}</span>
                  </div>
                </div>
              </div>
              <ArrowRight size={15} className="text-slate-400" />
            </a>
          ))}
        </div>
      )}
    </section>
  );
}

export default NewsNotices;
