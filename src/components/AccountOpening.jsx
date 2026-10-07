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
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 py-16 md:py-24">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs sm:text-sm font-semibold text-[#059669] mb-2">
              {t("Get started")}
            </div>

            <h2 className="disp text-2xl sm:text-3xl md:text-4xl text-[#091E16] max-w-lg">
              {t("Open your trading account in five simple steps")}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://tms07.nepsetms.com.np/client-registration"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-smooth inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-semibold text-sm shadow-xs whitespace-nowrap"
            >
              <span>{t("Open account now")}</span>
              <ArrowRight size={16} />
            </a>
            <Link
              to="/downloads"
              className="btn-smooth inline-flex items-center px-4 py-3 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-sm whitespace-nowrap"
            >
              {t("Download KYC & Demat forms")}
            </Link>
          </div>
        </div>

        {/* Interactive 5-Step Stepper Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {STEPS.map((s, i) => {
            const isSelected = activeStep === i;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setActiveStep(i)}
                onMouseEnter={() => setActiveStep(i)}
                className={`text-left p-5 sm:p-6 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#F9FBF9] border-[#059669] shadow-md shadow-emerald-950/5"
                    : "bg-white border-slate-200/90 hover:border-slate-300"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className={`disp text-2xl font-bold mono-num transition-colors ${
                        isSelected ? "text-[#059669]" : "text-slate-400"
                      }`}
                    >
                      0{n(i + 1)}
                    </span>
                    <CheckCircle2
                      size={18}
                      className={`transition-opacity duration-200 ${
                        isSelected ? "text-[#059669] opacity-100" : "text-slate-300 opacity-40"
                      }`}
                    />
                  </div>

                  <h3 className="font-bold text-[15.5px] text-[#091E16] mb-2 leading-snug">
                    {t(s.title)}
                  </h3>

                  <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed">
                    {t(s.desc)}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium">
                  <span className={isSelected ? "text-[#059669]" : "text-slate-400"}>
                    {t("Step")} {n(i + 1)} / {n(STEPS.length)}
                  </span>
                  <span
                    className={`h-1.5 w-8 rounded-full transition-colors ${
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
