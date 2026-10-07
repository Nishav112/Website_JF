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
    <section
      style={{ maxWidth: 1200, margin: "0 auto" }}
      className="px-6 py-20 md:py-28"
    >
      <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
        <div>
          <div
            style={{
              fontSize: 13.5,
              color: "#263386",
              fontWeight: 600,
              marginBottom: 10,
            }}
          >
            Live market
          </div>

          <h2
            className="disp"
            style={{
              fontSize: "clamp(1.8rem,3.2vw,2.6rem)",
              fontWeight: 600,
            }}
          >
            NEPSE, in real time
          </h2>
        </div>

        <div className="flex gap-2">
          {["nepse", "gainers", "losers"].map((tab) => (
            <button
              key={tab}
              onClick={() => setMarketTab(tab)}
              style={{
                padding: "8px 16px",
                borderRadius: 3,
                fontSize: 13.5,
                border:
                  marketTab === tab
                    ? "none"
                    : "1px solid rgba(14,26,61,.15)",
                background:
                  marketTab === tab ? "#0E1A3D" : "transparent",
                color: marketTab === tab ? "#fff" : "#1C2A52",
                cursor: "pointer",
                textTransform: "capitalize",
                transition: "all .2s ease",
              }}
            >
              {tab === "nepse" ? "NEPSE" : `Top ${tab}`}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div
          style={{
            gridColumn: "span 2",
            background: "#0E1A3D",
            borderRadius: 3,
            padding: "28px",
            color: "#fff",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {marketTab === "nepse" && (
            <>
              <div className="flex items-baseline gap-3 mb-1">
                <span
                  className="disp"
                  style={{ fontSize: 34, fontWeight: 600 }}
                >
                  {displayedIndex}
                </span>

                <span
                  style={{
                    color: indexUp ? "#22B573" : "#FF5468",
                    fontSize: 15,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  {indexUp ? (
                    <TrendingUp size={15} />
                  ) : (
                    <TrendingDown size={15} />
                  )}

                  {indexChange.toFixed(2)} ({indexPct.toFixed(2)}%)
                </span>
              </div>

              <div
                style={{
                  fontSize: 12.5,
                  color: "#A9B4D0",
                  marginBottom: 20,
                }}
              >
                NEPSE Index · updates live
              </div>

              <svg
                viewBox="0 0 640 220"
                preserveAspectRatio="none"
                style={{ width: "100%", height: 200 }}
              >
                <defs>
                  <linearGradient
                    id="liveFade"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#5AB0F5"
                      stopOpacity="0.45"
                    />
                    <stop
                      offset="100%"
                      stopColor="#5AB0F5"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>

                <path
                  d={`${chartPath} L 640,220 L 0,220 Z`}
                  fill="url(#liveFade)"
                />

                <path
                  d={chartPath}
                  fill="none"
                  stroke="#5AB0F5"
                  strokeWidth="2.5"
                  style={{ transition: "d .6s ease" }}
                />

                <circle
                  cx={last[0]}
                  cy={last[1]}
                  r="4.5"
                  fill="#5AB0F5"
                />
              </svg>
            </>
          )}

          {marketTab === "gainers" && (
            <MarketList rows={GAINERS} up />
          )}

          {marketTab === "losers" && (
            <MarketList rows={LOSERS} up={false} />
          )}
        </div>

        <div
          style={{
            border: "1px solid rgba(14,26,61,.1)",
            borderRadius: 3,
            padding: "26px",
          }}
        >
          <div
            style={{
              fontWeight: 600,
              fontSize: 15,
              marginBottom: 18,
            }}
          >
            Session summary
          </div>

          {[
            ["Open", indexOpen.toFixed(2)],
            ["High", max.toFixed(2)],
            ["Low", min.toFixed(2)],
            ["Volume", "4,582,340"],
          ].map(([label, val], i) => (
            <div
              key={i}
              className="flex justify-between"
              style={{
                padding: "11px 0",
                borderTop:
                  i === 0
                    ? "none"
                    : "1px solid rgba(14,26,61,.07)",
                fontSize: 14,
              }}
            >
              <span style={{ color: "#4B5878" }}>{label}</span>
              <span style={{ fontWeight: 600 }}>{val}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MarketOverview;