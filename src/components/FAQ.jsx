import { ChevronDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { FAQS } from "../data/websiteData";
import { useLang } from "../i18n/useLang";

function FAQ({ openFaq, setOpenFaq }) {
  const { t, n } = useLang();

  return (
    <section className="bg-[#F9FBF9]">
      <div className="max-w-[1000px] mx-auto px-5 sm:px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left Column Header */}
          <div className="lg:col-span-4">
            <div className="text-xs sm:text-sm font-semibold text-[#059669] mb-2">
              {t("FAQs")}
            </div>

            <h2 className="disp text-2xl sm:text-3xl text-[#091E16] mb-4">
              {t("Find quick answers")}
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {t("Have questions about DEMAT, trading hours, or fund settlement? Explore our frequently asked questions or reach out to our support desk.")}
            </p>

            <Link
              to="/contact"
              className="btn-smooth inline-flex items-center gap-1.5 text-sm font-semibold text-[#059669] hover:text-[#047857]"
            >
              <span>{t("Contact support desk")}</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Right Column Accordion List */}
          <div className="lg:col-span-8 flex flex-col gap-3">
            {FAQS.map((f, i) => {
              const open = openFaq === i;

              return (
                <div
                  key={i}
                  className={`rounded-2xl border transition-colors duration-200 ${
                    open
                      ? "bg-white border-[#059669]/40 shadow-sm"
                      : "bg-white border-slate-200/90 hover:border-slate-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    aria-expanded={open}
                    className="flex items-center justify-between gap-4 w-full p-5 sm:px-6 text-left cursor-pointer"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="text-xs font-semibold text-[#059669] mono-num shrink-0">
                        0{n(i + 1)}.
                      </span>
                      <span className="text-[15.5px] font-semibold text-[#091E16]">
                        {t(f.q)}
                      </span>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        open
                          ? "bg-emerald-50 text-[#059669]"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {open && (
                    <div className="px-5 sm:px-6 pb-5 pt-0 text-sm text-slate-600 leading-relaxed border-t border-slate-100/80 mt-1 pt-3.5">
                      {t(f.a)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
