import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, CheckCircle2 } from "lucide-react";
import { SERVICES } from "../data/websiteData";
import { useLang } from "../i18n/useLang";

function Services() {
  const { t, n } = useLang();

  return (
    <section className="max-w-[1200px] mx-auto px-5 sm:px-6 py-16 md:py-24">
      {/* Heading */}
      <div className="grid lg:grid-cols-12 gap-8 items-end mb-14">
        <div className="lg:col-span-7">
          <div className="text-xs sm:text-sm font-semibold text-[#059669] mb-2">
            {t("Our services")}
          </div>

          <h1 className="disp text-3xl sm:text-4xl md:text-5xl text-[#091E16]">
            {t("Complete trade solutions")}
          </h1>
        </div>

        <div className="lg:col-span-5">
          <p className="text-sm sm:text-[15.5px] text-slate-600 leading-relaxed">
            {t("We provide reliable trading and investment support designed to make your market experience simple, transparent, and convenient.")}
          </p>
        </div>
      </div>

      {/* Service Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {SERVICES.map((service, index) => {
          const Icon = service.icon;

          return (
            <div
              key={index}
              className="card-hover bg-white rounded-2xl border border-slate-200/90 p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 text-[#059669] flex items-center justify-center">
                    <Icon size={23} strokeWidth={1.8} />
                  </div>
                  <span className="text-xs font-semibold text-slate-400 mono-num">
                    0{n(index + 1)}
                  </span>
                </div>

                <h2 className="disp text-xl text-[#091E16] mb-3">
                  {t(service.title)}
                </h2>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {t(service.desc)}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-medium text-slate-500">
                <CheckCircle2 size={14} className="text-[#059669]" />
                <span>SEBON & NEPSE Regulated</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Service Rates & Account CTA Banner */}
      <div className="mt-10 rounded-2xl bg-[#091E16] text-white p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="text-xs font-semibold text-emerald-400 mb-1">
            {t("Transparent Fee Structure")}
          </div>
          <h3 className="disp text-xl sm:text-2xl text-white mb-1.5">
            {t("Service Rates")}
          </h3>
          <p className="text-sm text-slate-300 max-w-xl">
            {t("View our brokerage charges, applicable fees and service rates.")}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            to="/service-rates"
            className="btn-smooth inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-sm font-semibold whitespace-nowrap"
          >
            <span>{t("View Service Rates")}</span>
            <ArrowRight size={16} />
          </Link>

          <a
            href="https://tms07.nepsetms.com.np/client-registration"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-smooth inline-flex items-center gap-1.5 px-5 py-3 rounded-xl border border-white/20 hover:bg-white/10 text-white text-sm font-semibold whitespace-nowrap"
          >
            <span>{t("Open trading account")}</span>
            <ExternalLink size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Services;
