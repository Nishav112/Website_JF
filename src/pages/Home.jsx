import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { buildPath } from "../utils/chartHelpers";

import Hero from "../components/Hero";
import WhyChooseUs from "../components/WhyChooseUs";
import AccountOpening from "../components/AccountOpening";
import PlatformShowcase from "../components/PlatformShowcase";
import FAQ from "../components/FAQ";

export default function Home() {
  const location = useLocation();

  const [chartData, setChartData] = useState(() => {
    const base = [];
    let v = 2801.5;
    for (let i = 0; i < 36; i++) {
      v += (Math.random() - 0.42) * 9;
      base.push(v);
    }
    return base;
  });
  const [openFaq, setOpenFaq] = useState(0);
  const [heroReady, setHeroReady] = useState(false);

  const statsRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 120);
    return () => clearTimeout(t);
  }, []);

  // simulate the live index chart shifting
  useEffect(() => {
    const id = setInterval(() => {
      setChartData((prev) => {
        const next = prev.slice(1);
        const last = prev[prev.length - 1];
        next.push(Math.max(1, last + (Math.random() - 0.4) * 9));
        return next;
      });
    }, 2400);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!location.hash) return;
    const el = document.querySelector(location.hash);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, [location.hash]);

  const min = Math.min(...chartData);
  const max = Math.max(...chartData);
  const { d: chartPath } = buildPath(chartData, 640, 220, min * 0.998, max * 1.002);

  return (
    <main>
      <Hero chartPath={chartPath} heroReady={heroReady} chartData={chartData} />
      <AccountOpening />
      <PlatformShowcase />
      <WhyChooseUs statsRef={statsRef} />
      <FAQ openFaq={openFaq} setOpenFaq={setOpenFaq} />
    </main>
  );
}
