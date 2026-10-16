import { useCallback, useEffect, useRef, useState } from "react";

import { loadMarket } from "../services/yonepse";

/**
 * The upstream feed is rewritten roughly every 30 minutes during trading
 * hours, so polling faster than this only burns the visitor's battery and
 * bandwidth without ever showing a newer number.
 */
const POLL_OPEN = 3 * 60 * 1000;
const POLL_CLOSED = 15 * 60 * 1000;

const EMPTY = {
  status: null,
  index: null,
  indices: null,
  summary: null,
  series: null,
  quotes: null,
  hasIndex: false,
  hasSeries: false,
};

/**
 * Loads real NEPSE market data and keeps it fresh.
 *
 * Set `active: false` to skip the network entirely - useful for routes that
 * do not render market data.
 *
 * Failure policy: a feed that errors yields `null` and the previous good
 * value is retained, so one flaky endpoint degrades a single field instead of
 * blanking the panel. Nothing is ever replaced with a simulated number.
 */
export default function useNepseMarket({ active = true, months = 2 } = {}) {
  const [data, setData] = useState(EMPTY);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [fetchedAt, setFetchedAt] = useState(null);

  const mounted = useRef(true);
  const activeRef = useRef(active);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const refresh = useCallback(
    async (force = false) => {
      if (!activeRef.current || !mounted.current) return;

      const result = await loadMarket({ force, months });
      if (!mounted.current) return;

      setData((prev) => ({
        ...result,
        index: result.index ?? prev.index,
        indices: result.indices ?? prev.indices,
        summary: result.summary ?? prev.summary,
        series:
          result.series && result.series.length > 1 ? result.series : prev.series,
        quotes: result.quotes ?? prev.quotes,
        hasIndex: result.hasIndex || prev.hasIndex,
        hasSeries: result.hasSeries || prev.hasSeries,
      }));

      setFetchedAt(Date.now());
      setLoaded(true);

      // Only surface an error when literally nothing came back.
      setError(
        result.hasIndex || result.hasSeries || result.quotes
          ? null
          : "Live market data is temporarily unavailable. Please try again shortly.",
      );
    },
    [months],
  );

  // Initial load. State updates happen after the awaited fetch, never
  // synchronously in the effect body.
  useEffect(() => {
    if (!active) return;
    refresh(false);
  }, [active, refresh]);

  const isOpen = data.status?.isOpen === true;

  // Background polling, skipped while the tab is in the background.
  useEffect(() => {
    if (!active) return undefined;

    const id = setInterval(() => {
      if (document.hidden) return;
      refresh(false);
    }, isOpen ? POLL_OPEN : POLL_CLOSED);

    return () => clearInterval(id);
  }, [active, isOpen, refresh]);

  // Catch up the moment the visitor comes back to the tab.
  useEffect(() => {
    if (!active) return undefined;

    const onReturn = () => {
      if (!document.hidden) refresh(false);
    };

    window.addEventListener("focus", onReturn);
    document.addEventListener("visibilitychange", onReturn);

    return () => {
      window.removeEventListener("focus", onReturn);
      document.removeEventListener("visibilitychange", onReturn);
    };
  }, [active, refresh]);

  return {
    ...data,
    loading: active && !loaded && error === null,
    error,
    fetchedAt,
    isOpen,
    refresh,
  };
}
