import { useMemo } from "react";
import { selectTickerStocks } from "../services/yonepse";
import LiveTicker from "./LiveTicker";

// Home-page ticker strip. Sits above the navbar (see App.jsx).
// Prices come from the live NEPSE feed; nothing here is simulated.
export default function TickerBar({ market }) {
  const ticker = useMemo(
    () =>
      selectTickerStocks(market?.quotes).map((stock) => ({
        sym: stock.symbol,
        price: stock.ltp,
        lastDelta: stock.change ?? stock.percentChange ?? 0,
      })),
    [market?.quotes],
  );

  return (
    <LiveTicker
      ticker={ticker}
      loading={market?.loading}
      error={market?.error}
    />
  );
}
