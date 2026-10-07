import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import TickerBar from "./components/TickerBar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Services from "./components/Services";
import NewsNotices from "./components/NewsNotices";
import Contact from "./components/Contact";
import Home from "./pages/Home";
import DownloadPage from "./pages/DownloadPage";
import PaymentPage from "./pages/PaymentPage";
import ServiceRates from "./pages/ServiceRates";
import AboutPage from "./pages/AboutPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Schibsted+Grotesk:wght@600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap');`;

export default function App() {
  const isHome = useLocation().pathname === "/";

  return (
    <div
      className="app-root min-h-screen flex flex-col bg-[#F9FBF9] text-[#091E16] antialiased selection:bg-[#059669] selection:text-white"
      style={{ fontFamily: "'Plus Jakarta Sans', 'Noto Sans Devanagari', sans-serif", overflowX: "hidden" }}
    >
      <style>{`
        ${FONT_IMPORT}
        :root {
          --forest: #091E16;
          --emerald: #059669;
          --emerald-dark: #047857;
          --emerald-light: #ECFDF5;
          --canvas: #F9FBF9;
          --surface: #FFFFFF;
          --surface-alt: #F1F5F3;
          --line: #E2E8F0;
        }
        .disp {
          font-family: 'Schibsted Grotesk', 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          letter-spacing: -0.025em;
          text-wrap: balance;
        }
        h1.disp {
          font-weight: 800;
          letter-spacing: -0.035em;
        }
        .mono-num {
          font-family: 'JetBrains Mono', monospace;
          font-variant-numeric: tabular-nums;
        }
        * { box-sizing: border-box; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ticker-track { animation: marquee 38s linear infinite; will-change: transform; }
        .ticker-track:hover { animation-play-state: paused; }
        @keyframes drawLine { from { stroke-dashoffset: var(--len); } to { stroke-dashoffset: 0; } }
        .draw-in { stroke-dasharray: var(--len); stroke-dashoffset: var(--len); animation: drawLine 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes riseIn {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-rise { animation: riseIn 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .card-hover {
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .card-hover:hover {
          transform: translateY(-3px);
          border-color: rgba(5, 150, 105, 0.35);
          box-shadow: 0 12px 32px -8px rgba(9, 30, 22, 0.08);
        }
        .btn-smooth {
          transition: transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.18s ease, border-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease;
        }
        .btn-smooth:hover {
          transform: translateY(-1.5px);
        }
        .btn-smooth:active {
          transform: translateY(0);
        }
        .footer-grid { grid-template-columns: 1fr; }
        @media (min-width: 640px) { .footer-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .footer-grid { grid-template-columns: 1.8fr repeat(4, 1fr); } }
        .rates-cols { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; align-items: start; }
        .rates-col { display: flex; flex-direction: column; gap: 24px; min-width: 0; }
        @media (max-width: 768px) { .rates-cols { grid-template-columns: minmax(0, 1fr); } }
        a:focus-visible, button:focus-visible, input:focus-visible { outline: 2px solid #059669; outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) {
          .ticker-track, .draw-in, .hero-rise { animation: none !important; opacity: 1 !important; }
          .card-hover, .btn-smooth { transition: none !important; }
        }

        /* ---- Nepali language mode ---- */
        :lang(ne) * { font-family: 'Noto Sans Devanagari', 'Plus Jakarta Sans', sans-serif !important; }
        :lang(ne) h1.disp, :lang(ne) h2.disp, :lang(ne) h3.disp { letter-spacing: normal !important; line-height: 1.35 !important; }

        /* ---- Mobile fixes ---- */
        @media (max-width: 850px) { .app-root { overflow-x: clip !important; } }
      `}</style>

      {isHome && <TickerBar />}
      <Navbar />
      <ScrollToTop />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/service-rates" element={<ServiceRates />} />
          <Route path="/news" element={<NewsNotices />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/downloads" element={<DownloadPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}
