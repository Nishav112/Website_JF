import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { STEPS } from "../data/websiteData";
import { useLang } from "../i18n/useLang";

function AccountOpening() {
  const { t, n } = useLang();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="bg-white border-b border-slate-200/80">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-16 md:py-24">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-12">
          <div>
            <div className="text-xs sm:text-sm font-semibold text-[#059669] mb-1 sm:mb-2">
              {t("Get started")}
            </div>

            <h2 className="disp text-xl xs:text-2xl sm:text-3xl md:text-4xl text-[#091E16] max-w-lg">
              {t("Open your trading account in five simple steps")}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <a
              href="https://tms07.nepsetms.com.np/client-registration"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-smooth inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-semibold text-xs sm:text-sm shadow-xs whitespace-nowrap"
            >
              <span>{t("Open account now")}</span>
              <ArrowRight size={15} />
            </a>
            <Link
              to="/downloads"
              className="btn-smooth inline-flex items-center px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm whitespace-nowrap shadow-xs"
            >
              {t("Download Account Opening forms")}
            </Link>
          </div>
        </div>

        {/* Responsive Stepper: Mobile Horizontal Snap Swipe / Tablet & Desktop Grid */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
          {STEPS.map((s, i) => {
            const isSelected = activeStep === i;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setActiveStep(i)}
                onMouseEnter={() => setActiveStep(i)}
                className={`text-left p-3.5 sm:p-5 sm:p-6 rounded-xl sm:rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between shrink-0 snap-center w-[78vw] max-w-[270px] sm:w-auto ${
                  isSelected
                    ? "bg-white border-[#059669] shadow-md shadow-slate-900/5 ring-1 ring-[#059669]/30"
                    : "bg-white border-slate-200/90 hover:border-slate-300"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-5">
                    <span
                      className={`disp text-xl sm:text-2xl font-bold mono-num transition-colors ${
                        isSelected ? "text-[#059669]" : "text-slate-300"
                      }`}
                    >
                      0{n(i + 1)}
                    </span>
                    <CheckCircle2
                      size={17}
                      className={`transition-opacity duration-200 ${
                        isSelected ? "text-[#059669] opacity-100" : "text-slate-300 opacity-40"
                      }`}
                    />
                  </div>

                  <h3 className="font-bold text-sm sm:text-[15.5px] text-[#091E16] mb-1.5 sm:mb-2 leading-snug">
                    {t(s.title)}
                  </h3>

                  <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed">
                    {t(s.desc)}
                  </p>
                </div>

                <div className="mt-3.5 sm:mt-5 pt-2.5 sm:pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] sm:text-xs font-medium">
                  <span className={isSelected ? "text-[#059669]" : "text-slate-400"}>
                    {t("Step")} {n(i + 1)} / {n(STEPS.length)}
                  </span>
                  <span
                    className={`h-1.5 w-6 sm:w-8 rounded-full transition-colors ${
                      isSelected ? "bg-[#059669]" : "bg-slate-200"
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AccountOpening;
