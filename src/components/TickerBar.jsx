import { useState, useEffect } from "react";
import { TICKER_SEED } from "../data/websiteData";
import LiveTicker from "./LiveTicker";

// Home-page ticker strip. Sits above the navbar (see App.jsx).
export default function TickerBar() {
  const [ticker, setTicker] = useState(TICKER_SEED);

  // simulate a "live" ticker
  useEffect(() => {
    const id = setInterval(() => {
      setTicker((prev) =>
        prev.map((s) => {
          const delta = (Math.random() - 0.5) * (s.price * 0.006);
          return { ...s, price: Math.max(1, s.price + delta), lastDelta: delta };
        })
      );
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return <LiveTicker ticker={ticker} />;
}
