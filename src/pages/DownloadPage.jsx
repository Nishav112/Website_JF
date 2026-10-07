import { useState } from "react";
import { FileDown, AlertTriangle, Search } from "lucide-react";
import { KYC_DOWNLOADS } from "../data/websiteData";
import { useLang } from "../i18n/useLang";

export default function DownloadPage() {
  const { t } = useLang();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredGroups = KYC_DOWNLOADS.filter((group) =>
    activeCategory === "all" ? true : group.section === activeCategory
  )
    .map((group) => ({
      ...group,
      forms: group.forms.filter((form) =>
        t(form.label).toLowerCase().includes(searchQuery.toLowerCase()) ||
        form.label.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((group) => group.forms.length > 0);

  return (
    <section className="max-w-[1200px] mx-auto px-5 sm:px-6 py-16 md:py-24">
      <div className="max-w-2xl mb-10">
        <div className="text-xs sm:text-sm font-semibold text-[#059669] mb-2">
          {t("Forms & documents")}
        </div>
        <h1 className="disp text-3xl sm:text-4xl md:text-5xl text-[#091E16] mb-4">
          {t("Download KYC & Demat forms")}
        </h1>
        <p className="text-sm sm:text-[15.5px] text-slate-600 leading-relaxed">
          {t("Select the form you need below. Completed documents may be submitted at a JF Securities office or emailed to")}{" "}
          <a
            href="mailto:operations@jfsecurities.com"
            className="text-[#059669] font-semibold hover:underline"
          >
            operations@jfsecurities.com
          </a>
          {t(".")}
        </p>
      </div>

      {/* Interactive Search & Category Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10">
        <div className="relative w-full md:w-80">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("Search forms (e.g. TMS, DEMAT, WACC)...")}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-[#091E16] placeholder:text-slate-400 focus:border-[#059669] transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1.5 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              activeCategory === "all"
                ? "bg-white text-[#091E16] shadow-xs"
                : "text-slate-600 hover:text-[#091E16]"
            }`}
          >
            {t("All Forms")}
          </button>
          {KYC_DOWNLOADS.map((group) => (
            <button
              key={group.section}
              type="button"
              onClick={() => setActiveCategory(group.section)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                activeCategory === group.section
                  ? "bg-white text-[#091E16] shadow-xs"
                  : "text-slate-600 hover:text-[#091E16]"
              }`}
            >
              {t(group.section)}
            </button>
          ))}
        </div>
      </div>

      {/* Document Groups Grid */}
      {filteredGroups.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-10 text-center text-slate-500 text-sm">
          {t("No matching forms found. Try clearing your search filter.")}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {filteredGroups.map((group) => (
            <div
              key={group.section}
              className="bg-white rounded-2xl border border-slate-200/90 p-6"
            >
              <h2 className="disp text-lg text-[#091E16] mb-4 pb-3 border-b border-slate-100">
                {t(group.section)}
              </h2>
              <div className="flex flex-col gap-3">
                {group.forms.map((form) => {
                  const isValidHref = form.href && form.href !== "##";
                  return isValidHref ? (
                    <a
                      key={form.label}
                      href={form.href.trim()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-hover flex items-center justify-between gap-3 rounded-xl bg-[#F9FBF9] hover:bg-emerald-50/40 border border-slate-200/80 px-4 py-3.5 text-[#091E16] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#059669] flex items-center justify-center shrink-0">
                          <FileDown size={16} />
                        </div>
                        <span className="text-sm font-semibold">
                          {t(form.label)}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-[#059669] whitespace-nowrap">
                        PDF ↓
                      </span>
                    </a>
                  ) : (
                    <div
                      key={form.label}
                      className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 border border-dashed border-slate-200 px-4 py-3.5 text-slate-500"
                    >
                      <div className="flex items-center gap-3">
                        <AlertTriangle size={16} className="text-amber-600 shrink-0" />
                        <span className="text-sm font-medium">
                          {t(form.label)}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400">
                        {t("— link pending confirmation")}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
