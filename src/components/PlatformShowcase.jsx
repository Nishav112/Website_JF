import { ArrowUpRight } from "lucide-react";
import { useLang } from "../i18n/useLang";

function PlatformShowcase() {
  const { t } = useLang();

  return (
    <section className="bg-[#F9FBF9] border-b border-slate-200/80">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs sm:text-sm font-semibold text-[#059669] mb-2">
              NEPSE Trade Management System (TMS #07)
            </div>
            <h2 className="disp text-2xl sm:text-3xl md:text-4xl text-[#091E16]">
              {t("Direct digital access to Nepal's stock exchange")}
            </h2>
          </div>

          <a
            href="https://tms07.nepsetms.com.np/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-smooth inline-flex items-center gap-1.5 text-sm font-semibold text-[#059669] hover:text-[#047857] whitespace-nowrap"
          >
            <span>{t("Launch TMS Portal")}</span>
            <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200/90 p-4 sm:p-8 shadow-sm overflow-hidden">
          <img
            src="/landing-collage.png"
            alt={t("NEPSE Trade Management System: live market, NEPSE index, client collateral summary and TMS login")}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="block w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}

export default PlatformShowcase;
