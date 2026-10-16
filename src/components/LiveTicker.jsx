import { TrendingUp, TrendingDown } from "lucide-react";
import { useLang } from "../i18n/useLang";

function LiveTicker({ ticker = [], loading = false, error = null }) {
  const { t } = useLang();
  const unavailable = error !== null || (!loading && ticker.length === 0);

  return (
    <div className="bg-[#091E16] border-b border-white/10 overflow-hidden py-1.5 sm:py-2 select-none">
      {unavailable ? (
        <div className="text-center text-[11px] sm:text-xs text-slate-400">
          {t("Live quotes unavailable")}
        </div>
      ) : (
        <div className="ticker-track flex w-max items-center">
          {[...ticker, ...ticker].map((s, i) => {
            const up = (s.lastDelta ?? 1) >= 0;

            return (
              <div
                key={i}
                className="flex items-center gap-2 sm:gap-2.5 px-4 sm:px-6 whitespace-nowrap text-[11px] sm:text-xs border-r border-white/10"
              >
                <span className="text-white font-semibold tracking-tight">
                  {s.sym}
                </span>

                <span className="text-slate-300 mono-num">
                  {Number(s.price).toFixed(1)}
                </span>

                <span
                  className={`flex items-center gap-1 mono-num font-medium ${
                    up ? "text-[#34D399]" : "text-[#F87171]"
                  }`}
                >
                  {up ? (
                    <TrendingUp size={11} aria-hidden="true" />
                  ) : (
                    <TrendingDown size={11} aria-hidden="true" />
                  )}
                  <span>{up ? "+" : "-"}{Math.abs(s.lastDelta ?? 0).toFixed(2)}</span>
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default LiveTicker;
