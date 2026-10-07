import { ShieldCheck, UserCheck, Rocket, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "../i18n/useLang";

function WhyChooseUs({ statsRef }) {
  const { t } = useLang();

  const pillars = [
    {
      index: "01",
      icon: ShieldCheck,
      title: "Trusted & regulated",
      text: "SEBON licensed brokerage services with a focus on transparent and responsible operations.",
    },
    {
      index: "02",
      icon: UserCheck,
      title: "Experienced team",
      text: "Professional support to help clients with their trading and securities-related needs.",
    },
    {
      index: "03",
      icon: Rocket,
      title: "Fast & reliable",
      text: "Efficient services designed to make your trading experience simple and convenient.",
    },
    {
      index: "04",
      icon: TrendingUp,
      title: "Long-term growth",
      text: "Supporting clients with accessible market services and tools for their investment journey.",
    },
  ];

  return (
    <section
      ref={statsRef}
      className="bg-white border-b border-slate-200/80 relative overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 py-16 md:py-24 relative z-10">
        <div className="text-xs sm:text-sm font-semibold text-[#059669] mb-2">
          {t("Why choose us")}
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <h2 className="disp text-2xl sm:text-3xl md:text-4xl text-[#091E16] max-w-xl">
              {t("Your trusted investment partner")}
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-sm sm:text-[15.5px] text-slate-600 leading-relaxed">
              {t("At JF Securities, we focus on providing reliable brokerage services, professional support, and convenient access to Nepal's capital market.")}
            </p>
          </div>
        </div>

        {/* 4 Pillar Bento Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((w, i) => {
            const Icon = w.icon;
            return (
              <div
                key={i}
                className="card-hover bg-[#F9FBF9] rounded-2xl border border-slate-200/90 p-6 flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#059669]">
                      <Icon size={21} strokeWidth={1.8} />
                    </div>
                    <span className="text-xs font-semibold text-slate-400 mono-num">
                      {w.index}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-[#091E16] mb-2.5">
                    {t(w.title)}
                  </h3>

                  <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed">
                    {t(w.text)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Deep Forest Summary Strip */}
        <div className="mt-8 rounded-2xl bg-[#091E16] text-white p-6 sm:p-8 grid sm:grid-cols-3 gap-6 items-center">
          <div className="border-b sm:border-b-0 sm:border-r border-white/10 pb-4 sm:pb-0 sm:pr-6">
            <div className="text-xs text-emerald-400 font-medium">
              {t("Market Access")}
            </div>
            <div className="text-base font-semibold mt-1">
              {t("NEPSE Trading Services")}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Kathmandu · Damak · Tulsipur
            </div>
          </div>

          <div className="border-b sm:border-b-0 sm:border-r border-white/10 pb-4 sm:pb-0 sm:pr-6">
            <div className="text-xs text-emerald-400 font-medium">
              {t("Client Support")}
            </div>
            <div className="text-base font-semibold mt-1">
              {t("Professional Assistance")}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Dedicated Settlement & DP Desks
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xs text-emerald-400 font-medium">
                {t("Services")}
              </div>
              <div className="text-base font-semibold mt-1">
                {t("Trading & Margin Services")}
              </div>
            </div>

            <Link
              to="/service-rates"
              className="btn-smooth inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold whitespace-nowrap shrink-0"
            >
              <span>{t("Service Rates")}</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
