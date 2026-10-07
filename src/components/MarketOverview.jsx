import { TrendingUp, TrendingDown } from "lucide-react";
import { GAINERS, LOSERS } from "../data/websiteData";

function MarketOverview({
  marketTab,
  setMarketTab,
  displayedIndex,
  indexUp,
  indexChange,
  indexPct,
  chartPath,
  last,
  indexOpen,
  max,
  min,
  MarketList,
}) {
  return (
    <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-16 md:py-24">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6 sm:mb-10">
        <div>
          <div className="text-xs sm:text-sm font-semibold text-[#059669] mb-1 sm:mb-2">
            Live market
          </div>

          <h2 className="disp text-2xl xs:text-3xl sm:text-4xl text-[#091E16]">
            NEPSE, in real time
          </h2>
        </div>

        <div className="flex gap-1.5 sm:gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
          {["nepse", "gainers", "losers"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setMarketTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold capitalize transition-all cursor-pointer ${
                marketTab === tab
                  ? "bg-[#091E16] text-white shadow-xs"
                  : "text-slate-600 hover:text-[#091E16]"
              }`}
            >
              {tab === "nepse" ? "NEPSE" : `Top ${tab}`}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 bg-[#091E16] rounded-xl sm:rounded-2xl p-4 sm:p-7 text-white relative overflow-hidden border border-white/10 shadow-sm">
          {marketTab === "nepse" && (
            <>
              <div className="flex items-baseline gap-3 mb-1">
                <span className="disp text-2xl sm:text-4xl font-bold mono-num">
                  {displayedIndex}
                </span>

                <span
                  className={`text-xs sm:text-sm font-semibold flex items-center gap-1 mono-num ${
                    indexUp ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {indexUp ? (
                    <TrendingUp size={14} />
                  ) : (
                    <TrendingDown size={14} />
                  )}

                  {indexChange?.toFixed(2)} ({indexPct?.toFixed(2)}%)
                </span>
              </div>

              <div className="text-[11px] sm:text-xs text-slate-300 mb-4 sm:mb-6">
                NEPSE Index · updates live
              </div>

              <svg
                viewBox="0 0 640 220"
                preserveAspectRatio="none"
                className="w-full h-36 sm:h-52"
              >
                <defs>
                  <linearGradient
                    id="liveFadeClean"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#10B981"
                      stopOpacity="0.35"
                    />
                    <stop
                      offset="100%"
                      stopColor="#10B981"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>

                <path
                  d={`${chartPath} L 640,220 L 0,220 Z`}
                  fill="url(#liveFadeClean)"
                />

                <path
                  d={chartPath}
                  fill="none"
                  stroke="#34D399"
                  strokeWidth="2.5"
                  className="transition-all duration-500 ease-out"
                />

                {last && (
                  <circle
                    cx={last[0]}
                    cy={last[1]}
                    r="4.5"
                    fill="#34D399"
                  />
                )}
              </svg>
            </>
          )}

          {marketTab === "gainers" && MarketList && (
            <MarketList rows={GAINERS} up />
          )}

          {marketTab === "losers" && MarketList && (
            <MarketList rows={LOSERS} up={false} />
          )}
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xs">
          <div className="font-bold text-sm sm:text-base text-[#091E16] mb-3 sm:mb-4">
            Session summary
          </div>

          {[
            ["Open", indexOpen ? indexOpen.toFixed(2) : "2,790.12"],
            ["High", max ? max.toFixed(2) : "2,820.50"],
            ["Low", min ? min.toFixed(2) : "2,785.40"],
            ["Volume", "4,582,340"],
          ].map(([label, val], i) => (
            <div
              key={i}
              className={`flex justify-between py-2 sm:py-2.5 text-xs sm:text-sm ${
                i === 0 ? "" : "border-t border-slate-100"
              }`}
            >
              <span className="text-slate-500">{label}</span>
              <span className="font-bold text-[#091E16] mono-num">{val}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MarketOverview;
