import { useMemo, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import { buildPath, getExtent } from "../utils/chartHelpers";

import Hero from "../components/Hero";
import WhyChooseUs from "../components/WhyChooseUs";
import AccountOpening from "../components/AccountOpening";
import PlatformShowcase from "../components/PlatformShowcase";
import FAQ from "../components/FAQ";

const CHART_W = 640;
const CHART_H = 220;

export default function Home({ market }) {
  const location = useLocation();

  const [openFaq, setOpenFaq] = useState(0);
  const [heroReady, setHeroReady] = useState(false);

  const statsRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 120);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!location.hash) return;
    const el = document.querySelector(location.hash);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, [location.hash]);

  // Real daily closes from the live NEPSE feed, oldest to newest.
  const closes = useMemo(
    () => (market.series ?? []).map((point) => point.close),
    [market.series],
  );

  const { min, max } = useMemo(() => getExtent(closes), [closes]);

  const { d: chartPath, last: chartLast } = useMemo(
    () => buildPath(closes, CHART_W, CHART_H, min, max),
    [closes, min, max],
  );

  return (
    <main>
      <Hero
        market={market}
        chartPath={chartPath}
        chartLast={chartLast}
        heroReady={heroReady}
      />
      <AccountOpening />
      <PlatformShowcase />
      <WhyChooseUs statsRef={statsRef} />
      <FAQ openFaq={openFaq} setOpenFaq={setOpenFaq} />
    </main>
  );
}
