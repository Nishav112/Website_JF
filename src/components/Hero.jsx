import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, TrendingDown, ExternalLink } from "lucide-react";
import { GAINERS, LOSERS } from "../data/websiteData";
import { useLang } from "../i18n/useLang";

function Hero({ chartPath, heroReady, chartData = [] }) {
  const { t } = useLang();
  const [activeTab, setActiveTab] = useState("index");

  const currentVal = chartData.length ? chartData[chartData.length - 1] : 2814.62;
  const openVal = chartData.length ? chartData[0] : 2798.1;
  const change = currentVal - openVal;
  const pct = (change / (openVal || 1)) * 100;
  const isUp = change >= 0;

  return (
    <section className="relative bg-[#F9FBF9] border-b border-slate-200/80 overflow-hidden">
      {/* Subtle architectural background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(#CBD5E1 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-7 pb-10 sm:pt-12 sm:pb-16 md:pt-20 md:pb-24 relative z-10">
        <div className="grid lg:grid-cols-12 gap-7 sm:gap-10 lg:gap-12 items-center">
          {/* Left Column: Proposition & Primary Action */}
          <div className="lg:col-span-7">
            <div
              className="hero-rise text-xs sm:text-sm font-semibold text-[#059669] mb-3 sm:mb-4 flex flex-wrap items-center gap-2"
              style={{ animationDelay: "0.04s" }}
            >
              <span>{t("Your trusted partner in the capital market")}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-500 font-medium">NEPSE Member #7</span>
            </div>

            <h1
              className="disp hero-rise text-2xl xs:text-3xl sm:text-4xl lg:text-[3.25rem] leading-[1.12] text-[#091E16] mb-3 sm:mb-5 max-w-2xl"
              style={{ animationDelay: "0.12s" }}
            >
              {t("Trade with confidence.")}{" "}
              <span className="text-[#059669]">{t("Grow with us.")}</span>
            </h1>

            <p
              className="hero-rise text-sm sm:text-base md:text-[17px] text-slate-600 leading-relaxed max-w-xl mb-6 sm:mb-8"
              style={{ animationDelay: "0.2s" }}
            >
              <div>
                 {t("Member of the Nepal Stock Exchange.")}
                  </div>
              <div>
                 {t("Licensed by the Securities Board of Nepal.")}
              </div>
            </p>

            {/* Primary CTA and Secondary Actions */}
            <div
              className="hero-rise flex flex-wrap items-center gap-2.5 sm:gap-3.5"
              style={{ animationDelay: "0.28s" }}
            >
              <a
                href="https://tms07.nepsetms.com.np/client-registration"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-smooth inline-flex items-center gap-1.5 sm:gap-2 px-4.5 sm:px-6 py-2.5 sm:py-3.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-semibold text-xs sm:text-[15px] shadow-sm whitespace-nowrap"
              >
                <span>{t("Open trading account")}</span>
                <ArrowRight size={15} />
              </a>

              <a
                href="https://ckyc.cdsc.com.np/registration"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-smooth inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3.5 rounded-xl border border-slate-200 bg-white hover:border-[#059669] hover:text-[#059669] text-[#091E16] font-semibold text-xs sm:text-[15px] whitespace-nowrap shadow-xs"
              >
                <span>{t("Open Demat account")}</span>
                <ExternalLink size={14} className="opacity-70" />
              </a>

              <Link
                to="/services"
                className="btn-smooth inline-flex items-center px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-xl text-slate-600 hover:text-[#091E16] font-semibold text-xs sm:text-[15px] whitespace-nowrap"
              >
                {t("Learn more")}
              </Link>
            </div>

            {/* Clean unboxed regulatory metadata strip */}
            <div
              className="hero-rise mt-6 sm:mt-10 pt-4 sm:pt-6 border-t border-slate-200 grid grid-cols-3 gap-2 sm:gap-4 max-w-lg"
              style={{ animationDelay: "0.36s" }}
            >
              <div>
                <div className="text-[11px] sm:text-xs text-slate-500">{t("Broker License")}</div>
                <div className="text-xs sm:text-base font-bold text-[#091E16] mono-num mt-0.5">
                  NEPSE #07
                </div>
              </div>
              <div>
                <div className="text-[11px] sm:text-xs text-slate-500">{t("DP ID")}</div>
                <div className="text-xs sm:text-base font-bold text-[#091E16] mono-num mt-0.5">
                  13023300
                </div>
              </div>
              <div>
                <div className="text-[11px] sm:text-xs text-slate-500">{t("Regulator")}</div>
                <div className="text-xs sm:text-base font-bold text-[#091E16] mt-0.5">
                  SEBON & CDSCL
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive NEPSE Market Terminal */}
          <div
            className="lg:col-span-5 hero-rise"
            style={{ animationDelay: "0.22s" }}
          >
            <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 p-3.5 sm:p-6 shadow-md shadow-slate-900/5">
              {/* Terminal Top Header & Interactive Segmented Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 sm:pb-4 border-b border-slate-100">
                <div>
                  <div className="text-[11px] sm:text-xs text-slate-500 font-medium">
                    NEPSE Market Pulse
                  </div>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="disp text-xl sm:text-3xl font-bold text-[#091E16] mono-num">
                      {currentVal.toFixed(2)}
                    </span>
                    <span
                      className={`inline-flex items-center gap-0.5 text-xs font-semibold mono-num ${
                        isUp ? "text-[#059669]" : "text-rose-600"
                      }`}
                    >
                      {isUp ? (
                        <TrendingUp size={12} />
                      ) : (
                        <TrendingDown size={12} />
                      )}
                      {isUp ? "+" : ""}
                      {change.toFixed(2)} ({pct.toFixed(2)}%)
                    </span>
                  </div>
                </div>

                {/* Segmented Interactive Filter Control */}
                <div
                  role="tablist"
                  aria-label="Market view selector"
                  className="flex items-center gap-1 p-0.5 sm:p-1 bg-slate-100 rounded-lg"
                >
                  {[
                    { id: "index", label: "Chart" },
                    { id: "gainers", label: "Gainers" },
                    { id: "losers", label: "Losers" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={activeTab === tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-2 sm:px-2.5 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold rounded-md transition-all duration-150 whitespace-nowrap cursor-pointer ${
                        activeTab === tab.id
                          ? "bg-white text-[#091E16] shadow-xs"
                          : "text-slate-600 hover:text-[#091E16]"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Tab Content */}
              <div className="mt-3 sm:mt-4 min-h-[160px] sm:min-h-[210px] flex flex-col justify-between">
                {activeTab === "index" && (
                  <div>
                    <div className="relative h-[115px] sm:h-[165px] w-full pt-1 sm:pt-2">
                      <svg
                        viewBox="0 0 640 220"
                        preserveAspectRatio="none"
                        className="w-full h-full overflow-visible"
                        aria-label="NEPSE simulated index trend"
                      >
                        <defs>
                          <linearGradient id="emeraldArea" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#059669" stopOpacity="0.22" />
                            <stop offset="100%" stopColor="#059669" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>

                        {heroReady && chartPath && (
                          <>
                            <path
                              d={`${chartPath} L 640,220 L 0,220 Z`}
                              fill="url(#emeraldArea)"
                            />
                            <path
                              d={chartPath}
                              fill="none"
                              stroke="#059669"
                              strokeWidth="2.5"
                              vectorEffect="non-scaling-stroke"
                              className="draw-in"
                              style={{ "--len": 3200 }}
                            />
                          </>
                        )}
                      </svg>
                    </div>

                    <div className="grid grid-cols-3 gap-1 sm:gap-2 pt-2.5 sm:pt-3 border-t border-slate-100 text-[11px] sm:text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px] sm:text-xs">Session Open</span>
                        <span className="font-semibold text-[#091E16] mono-num">
                          {openVal.toFixed(2)}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] sm:text-xs">Trading Hours</span>
                        <span className="font-semibold text-[#091E16] mono-num">
                          11:00–15:00
                        </span>
                      </div>
                      <div className="text-right">
                        <a
                          href="https://www.nepalstock.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#059669] hover:text-[#047857] font-semibold mt-0.5 sm:mt-1"
                        >
                          <span>NEPSE Live</span>
                          <ExternalLink size={11} />
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "gainers" && (
                  <div className="divide-y divide-slate-100">
                    {GAINERS.map((row, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between py-2 sm:py-2.5 text-xs sm:text-sm"
                      >
                        <div className="flex items-center gap-2 sm:gap-2.5">
                          <span className="text-[11px] text-slate-400 mono-num w-3.5 sm:w-4">
                            0{idx + 1}
                          </span>
                          <span className="font-medium text-[#091E16]">
                            {row.name}
                          </span>
                        </div>
                        <span className="font-semibold text-[#059669] mono-num flex items-center gap-1 text-xs">
                          <TrendingUp size={12} />
                          {row.chg}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "losers" && (
                  <div className="divide-y divide-slate-100">
                    {LOSERS.map((row, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between py-2 sm:py-2.5 text-xs sm:text-sm"
                      >
                        <div className="flex items-center gap-2 sm:gap-2.5">
                          <span className="text-[11px] text-slate-400 mono-num w-3.5 sm:w-4">
                            0{idx + 1}
                          </span>
                          <span className="font-medium text-[#091E16]">
                            {row.name}
                          </span>
                        </div>
                        <span className="font-semibold text-rose-600 mono-num flex items-center gap-1 text-xs">
                          <TrendingDown size={12} />
                          {row.chg}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
