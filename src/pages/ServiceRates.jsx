import { useState } from "react";
import {
  ArrowLeft,
  ShieldCheck,
  Calculator,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { SERVICE_RATES } from "../data/websiteData";
import { useLang } from "../i18n/useLang";

const SEBON_RATE = 0.00015;
const DP_CHARGE = 25;

function getEquityRate(amount) {
  if (amount <= 50000) return 0.0036;
  if (amount <= 500000) return 0.0033;
  if (amount <= 2000000) return 0.0031;
  if (amount <= 10000000) return 0.0027;
  return 0.0024;
}

function formatNPR(value) {
  return `Rs. ${Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function parsePercent(value) {
  const match = String(value ?? "").match(/[\d.]+/);
  return match ? Number(match[0]) / 100 : 0;
}

const inputClass =
  "w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-[#12241C] outline-none transition focus:border-[#059669] focus:bg-white focus:ring-2 focus:ring-emerald-500/10";

const labelClass =
  "mb-1.5 block text-sm font-semibold text-slate-700";

const buttonClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#059669] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#047857] focus:outline-none focus:ring-2 focus:ring-emerald-500/30";


const shareTradingRows = [
  ["Brokerage — up to Rs. 50,000", "0.36%", "Buy and sell"],
  ["Brokerage — Rs. 50,001–5,00,000", "0.33%", "Buy and sell"],
  ["Brokerage — Rs. 5,00,001–20,00,000", "0.31%", "Buy and sell"],
  ["Brokerage — Rs. 20,00,001–1,00,00,000", "0.27%", "Buy and sell"],
  ["Brokerage — above Rs. 1,00,00,000", "0.24%", "Buy and sell"],
];

const bondRows = [
  ["Up to Rs. 5,00,000", "0.10% or Rs. 10, whichever is higher", "Per transaction"],
  ["Rs. 5,00,001–50,00,000", "0.05%", "Per transaction"],
  ["Above Rs. 50,00,000", "0.02%", "Per transaction"],
  ["Corporate debentures — SEBON fee", "0.010%", "Per transaction"],
  ["Government / eligible bonds — SEBON fee", "0.005%", "Per transaction"],
];

const mutualFundRows = [
  ["Up to Rs. 5,00,000", "0.15% or Rs. 10, whichever is higher", "Per transaction"],
  ["Rs. 5,00,001–50,00,000", "0.12%", "Per transaction"],
  ["Above Rs. 50,00,000", "0.10%", "Per transaction"],
  ["SEBON transaction fee", "0.010%", "Per transaction"],
];

const governmentSecuritiesRows = [
  ["Up to Rs. 5,00,000", "0.10% or Rs. 10, whichever is higher", "Per transaction"],
  ["Rs. 5,00,001–50,00,000", "0.05%", "Per transaction"],
  ["Above Rs. 50,00,000", "0.02%", "Per transaction"],
];

const dematRows = [
  ["DEMAT account opening", "Rs. 50", "One time"],
  ["DEMAT account maintenance (AMC)", "Rs. 100", "Annual"],
  ["Mero Share registration", "Rs. 50", "One time"],
  ["Mero Share renewal", "Rs. 50", "Annual"],
  ["Share debit / transfer transaction", "Rs. 25 per stock", "Per transfer day"],
  ["Pledge charge", "Rs. 50", "Per stock"],
];

const otherChargesRows = [
  ["SEBON transaction fee on shares", "0.015%", "Per transaction"],
  ["SEBON fee on corporate debentures", "0.010%", "Per transaction"],
  ["SEBON fee on eligible other bonds", "0.005%", "Per transaction"],
  ["SEBON fee on mutual fund units", "0.010%", "Per transaction"],
];

const capitalGainsRows = [
  ["Resident individual", "365 days or less", "10%*"],
  ["Resident individual", "More than 365 days", "7.5%*"],
  ["Resident entity", "Listed shares", "Generally 10%"],
  ["Other / non-resident investor", "Listed shares", "Generally 25%"],
];

function RateCard({ number, title, description, columns, rows }) {
  const { t, ta } = useLang();

  function translateCell(cell) {
    const value = String(cell);
    const translated = t(value);

    if (translated !== value) return translated;

    if (/^Rs\.|^\d[\d,.]*%/.test(value)) {
      return ta(value);
    }

    return value;
  }
  return (
    <section className="card-hover min-w-0 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-4 py-5 sm:px-6 sm:py-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-sm font-bold text-[#059669]">
            {number}
          </div>

          <div className="min-w-0">
            <h2 className="disp text-lg leading-snug text-[#12241C] sm:text-xl">
              {t(title)}
            </h2>
            {description && (
              <p className="mt-1 text-sm leading-relaxed text-slate-500">
                {t(description)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Desktop and tablet table */}
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  {t(column)}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {rows.map((row, index) => (
              <tr
                key={row[0]}
                className={
                  index % 2 === 0
                    ? "transition-colors hover:bg-emerald-50/30"
                    : "bg-slate-50/40 transition-colors hover:bg-emerald-50/30"
                }
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={`${row[0]}-${cellIndex}`}
                    className={`px-5 py-4 text-sm leading-relaxed ${
                      cellIndex === 0
                        ? "font-medium text-[#12241C]"
                        : cellIndex === 1
                          ? "font-semibold text-[#059669]"
                          : "text-slate-600"
                    }`}
                  >
                    {translateCell(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile-friendly rows */}
      <div className="divide-y divide-slate-100 sm:hidden">
        {rows.map((row) => (
          <div key={row[0]} className="space-y-3 px-4 py-4">
            <h3 className="text-sm font-semibold leading-relaxed text-[#12241C]">
              {t(row[0])}
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {columns.slice(1).map((column, index) => (
                <div key={column} className="min-w-0">
                  <p className="mb-1 text-[11px] font-medium text-slate-500">
                    {t(column)}
                  </p>
                  <p
                    className={`break-words text-sm leading-relaxed ${
                      index === 0
                        ? "font-semibold text-[#059669]"
                        : "text-slate-600"
                    }`}
                  >
                    {translateCell(row[index + 1])}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ShareCalculator() {
  const { t, ta } = useLang();

  const [transactionType, setTransactionType] = useState("buy");
  const [quantity, setQuantity] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [investorType, setInvestorType] = useState("individual");
  const [holdingPeriod, setHoldingPeriod] = useState("0");
  const [waccPrice, setWaccPrice] = useState(false);
  const [calculated, setCalculated] = useState(false);
  const [error, setError] = useState("");

  const qty = Math.max(0, Number(quantity) || 0);
  const buyPrice = Math.max(0, Number(purchasePrice) || 0);
  const sellPrice = Math.max(0, Number(sellingPrice) || 0);

  const buyAmount = qty * buyPrice;
  const sellAmount = qty * sellPrice;

  const buyRate = getEquityRate(buyAmount);
  const sellRate = getEquityRate(sellAmount);

  const buyCommission =
    buyAmount > 0 ? Math.max(10, buyAmount * buyRate) : 0;
  const sellCommission =
    sellAmount > 0 ? Math.max(10, sellAmount * sellRate) : 0;

  const buySebon = buyAmount * SEBON_RATE;
  const sellSebon = sellAmount * SEBON_RATE;

  const buyDpCharge = 0;
  const sellDpCharge = sellAmount > 0 ? DP_CHARGE : 0;

  const totalBuyCost =
    transactionType === "sell" && waccPrice
      ? buyAmount
      : buyAmount + buyCommission + buySebon + buyDpCharge;

  const costPerShare = qty > 0 ? totalBuyCost / qty : 0;

  const receivableBeforeTax =
    sellAmount - sellCommission - sellSebon - sellDpCharge;

  const individualRates = SERVICE_RATES.capitalGains.individual || [];

  const selectedPeriod =
    individualRates[Number(holdingPeriod)] || individualRates[0];

  const taxRate =
    investorType === "institutional"
      ? parsePercent(SERVICE_RATES.capitalGains.institutional)
      : parsePercent(selectedPeriod?.rate);

  const profitBeforeTax = receivableBeforeTax - totalBuyCost;
  const capitalGainsTax =
    profitBeforeTax > 0 ? profitBeforeTax * taxRate : 0;

  const netProfit = profitBeforeTax - capitalGainsTax;
  const netReceivable = receivableBeforeTax - capitalGainsTax;

  function clearCalculator() {
    setTransactionType("buy");
    setQuantity("");
    setPurchasePrice("");
    setSellingPrice("");
    setInvestorType("individual");
    setHoldingPeriod("0");
    setWaccPrice(false);
    setCalculated(false);
    setError("");
  }

  function calculate() {
    if (!Number.isInteger(qty) || qty <= 0) {
      setError(t("Please enter a valid share quantity."));
      setCalculated(false);
      return;
    }

    if (buyPrice <= 0) {
      setError(t("Please enter a valid purchase price."));
      setCalculated(false);
      return;
    }

    if (transactionType === "sell" && sellPrice <= 0) {
      setError(t("Please enter a valid selling price."));
      setCalculated(false);
      return;
    }

    setError("");
    setCalculated(true);
  }

  const resultRows =
    transactionType === "buy"
      ? [
          [t("Total Amount"), buyAmount],
          [t("Commission"), buyCommission],
          [t("SEBON Fee"), buySebon],
          [t("DP Charge"), buyDpCharge],
          [t("Total Amount Payable"), totalBuyCost],
          [t("Cost Price Per Share"), costPerShare],
        ]
      : [
          [t("Total Amount"), sellAmount],
          [t("Commission"), sellCommission],
          [t("SEBON Fee"), sellSebon],
          [t("DP Charge"), sellDpCharge],
          [t("Total Amount Receivable Before Tax"), receivableBeforeTax],
          [t("Capital Gains Tax"), capitalGainsTax],
          [t("Net Amount Receivable"), netReceivable],
          [t("Profit / Loss"), netProfit],
        ];

  return (
    <section
      id="share-calculator"
      className="card-hover mb-8 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm"
    >
      <div className="border-b border-slate-100 px-4 py-5 sm:px-7 sm:py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#059669]">
            <Calculator size={21} />
          </div>

          <div className="min-w-0">
            <h2 className="disp text-lg text-[#12241C] sm:text-2xl">
              {t("Share Calculator")}
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">
              {t(
                "Estimate your transaction charges and receivable amount."
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-7">
        <div className="grid min-w-0 gap-7 lg:grid-cols-2 lg:gap-9">
          <div className="min-w-0 space-y-4">
            <div>
              <label htmlFor="transaction-type" className={labelClass}>
                {t("Transaction Type")}
              </label>
              <select
                id="transaction-type"
                value={transactionType}
                onChange={(e) => {
                  setTransactionType(e.target.value);
                  setCalculated(false);
                  setError("");
                }}
                className={inputClass}
              >
                <option value="buy">{t("Buy")}</option>
                <option value="sell">{t("Sell")}</option>
              </select>
            </div>

            <div>
              <label htmlFor="share-quantity" className={labelClass}>
                {t("Share Quantity")}
              </label>
              <input
                id="share-quantity"
                type="number"
                min="1"
                step="1"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                  setCalculated(false);
                  setError("");
                }}
                placeholder={t("Number Only")}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="purchase-price" className={labelClass}>
                {t("Purchase Price (Rs.)")}
              </label>
              <input
                id="purchase-price"
                type="number"
                min="0"
                step="0.01"
                value={purchasePrice}
                onChange={(e) => {
                  setPurchasePrice(e.target.value);
                  setCalculated(false);
                  setError("");
                }}
                placeholder={t("Number Only")}
                className={inputClass}
              />

              {transactionType === "sell" && (
                <label className="mt-3 flex cursor-pointer items-start gap-2 text-sm leading-relaxed text-slate-600">
                  <input
                    type="checkbox"
                    checked={waccPrice}
                    onChange={(e) => setWaccPrice(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-emerald-600"
                  />
                  {t("Is WACC Price?")}
                </label>
              )}
            </div>

            {transactionType === "sell" && (
              <>
                <div>
                 <label htmlFor="selling-price" className={labelClass}>
                         {t("Selling Price (Rs.)")}
                  </label>
                  <input
                    id="selling-price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={sellingPrice}
                    onChange={(e) => {
                      setSellingPrice(e.target.value);
                      setCalculated(false);
                      setError("");
                    }}
                    placeholder={t("Number Only")}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="investor-type" className={labelClass}>
                    {t("Investor Type")}
                  </label>
                  <select
                    id="investor-type"
                    value={investorType}
                    onChange={(e) => {
                      setInvestorType(e.target.value);
                      setCalculated(false);
                    }}
                    className={inputClass}
                  >
                    <option value="individual">{t("Individual")}</option>
                    <option value="institutional">{t("Institutional")}</option>
                  </select>
                </div>

                {investorType === "individual" && (
                  <div>
                    <label htmlFor="holding-period" className={labelClass}>
                      {t("Capital Gains Tax")}
                    </label>
                    <select
                      id="holding-period"
                      value={holdingPeriod}
                      onChange={(e) => {
                        setHoldingPeriod(e.target.value);
                        setCalculated(false);
                      }}
                      className={inputClass}
                    >
                      {individualRates.map((item, index) => (
                        <option key={index} value={String(index)}>
                          {t(item.period)} — {ta(item.rate)}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </>
            )}

            <div className="flex flex-col gap-3 pt-1 sm:flex-row">
              <button
                type="button"
                onClick={calculate}
                className={`${buttonClass} w-full sm:w-auto`}
              >
                {t("Calculate")}
              </button>

              <button
                type="button"
                onClick={clearCalculator}
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
              >
                {t("Clear")}
              </button>
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-700"
              >
                {error}
              </p>
            )}
          </div>

          <div className="min-w-0">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="disp text-lg text-[#12241C]">
                {t("Calculation Details")}
              </h3>
              <span className="shrink-0 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold text-[#059669]">
                {t("Estimated")}
              </span>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full table-fixed border-collapse text-xs sm:text-sm">
                <tbody className="divide-y divide-slate-100">
                  {transactionType === "sell" && (
                    <tr className="bg-slate-50">
                      <td className="break-words px-3 py-3 font-medium text-slate-600 sm:px-4">
                        {t("Investor Type")}
                      </td>
                      <td className="break-words px-3 py-3 text-right font-semibold text-slate-800 sm:px-4">
                        {calculated
  ? t(investorType === "individual" ? "Individual" : "Institutional")
  : "—"}
                      </td>
                    </tr>
                  )}

                  {resultRows.map(([label, value], index) => {
                    const isTotal =
                      label === t("Total Amount Payable") ||
                      label === t("Net Amount Receivable");

                    const isProfitLoss = label === t("Profit / Loss");

                    return (
                      <tr
                        key={label}
                        className={
                          isTotal
                            ? "bg-emerald-50/70"
                            : index % 2 === 0
                              ? "bg-white"
                              : "bg-slate-50/60"
                        }
                      >
                        <td
                          className={`w-[60%] break-words px-3 py-3 ${
                            isTotal
                              ? "font-bold text-[#12241C]"
                              : "font-medium text-slate-600"
                          }`}
                        >
                          {label}
                        </td>
                        <td
                          className={`break-words px-3 py-3 text-right font-semibold ${
                            isTotal
                              ? "text-[#059669]"
                              : isProfitLoss && calculated
                                ? netProfit < 0
                                  ? "text-red-600"
                                  : "text-[#059669]"
                                : "text-slate-800"
                          }`}
                        >
                          {calculated ? ta(formatNPR(value)) : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {calculated && transactionType === "sell" && (
              <div
                className={`mt-3 rounded-xl border p-4 ${
                  netProfit < 0
                    ? "border-red-100 bg-red-50"
                    : "border-emerald-100 bg-emerald-50"
                }`}
              >
                <p className="text-xs font-semibold text-slate-600">
                  {t("Estimated Profit / Loss")}
                </p>
                <p
                  className={`mt-1 break-words text-xl font-bold ${
                    netProfit < 0 ? "text-red-700" : "text-[#059669]"
                  }`}
                >
                  {ta(formatNPR(netProfit))}
                </p>
              </div>
            )}

            <p className="mt-3 rounded-lg bg-slate-50 px-3 py-3 text-xs leading-relaxed text-slate-500">
              {t(
                "Estimates only. Actual charges, WACC adjustments and taxes may differ according to applicable regulations and your broker's contract note."
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceRates() {
  const { t } = useLang();
  const [showCalculator, setShowCalculator] = useState(false);

  function toggleCalculator() {
    const willOpen = !showCalculator;
    setShowCalculator(willOpen);

    if (willOpen) {
      setTimeout(() => {
        document
          .getElementById("share-calculator")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  }

  return (
    <main className="mx-auto w-full max-w-[1120px] px-4 py-8 sm:px-6 sm:py-12 md:py-16">
      {/* Page heading */}
      <header className="mb-7 sm:mb-10">
        <Link
          to="/services"
          className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#059669] transition hover:text-[#047857]"
        >
          <ArrowLeft size={16} />
          <span>{t("Back to Services")}</span>
        </Link>

        <div className="mb-2 text-sm font-semibold text-[#059669]">
          {t("Service Rates")}
        </div>

        <h1 className="disp text-3xl leading-tight text-[#12241C] sm:text-4xl md:text-5xl">
          {t("Brokerage & Service Charges")}
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:mt-4 sm:text-base">
          {t(
            "View applicable share trading charges, DEMAT and Mero Share fees, and capital gains tax information."
          )}
        </p>

        <div className="mt-5">
          <button
            type="button"
            onClick={toggleCalculator}
            aria-expanded={showCalculator}
            aria-controls="share-calculator"
            className={buttonClass}
          >
            <Calculator size={18} />
            {showCalculator
              ? t("Hide Share Calculator")
              : t("Share Calculator")}
            {showCalculator ? (
              <ChevronUp size={17} />
            ) : (
              <ChevronDown size={17} />
            )}
          </button>
        </div>
      </header>

      {/* Calculator appears only when requested */}
      {showCalculator && <ShareCalculator />}

      {/* The three requested rate cards */}
      
<div className="space-y-6 sm:space-y-8">
  <RateCard
    number="A"
    title="Shares (Equity)"
    description="Brokerage rates applicable to equity share transactions."
    columns={["Transaction Amount / Charge", "Brokerage Rate", "When Charged"]}
    rows={shareTradingRows}
  />

  <RateCard
    number="B"
    title="Bonds & Debentures"
    description="Brokerage rates for bonds and debentures, including applicable SEBON fees."
    columns={["Transaction Amount / Charge", "Rate / Amount", "When Charged"]}
    rows={bondRows}
  />

  <RateCard
    number="C"
    title="Mutual Fund Units"
    description="Brokerage rates and transaction fees for mutual fund units."
    columns={["Transaction Amount / Charge", "Rate / Amount", "When Charged"]}
    rows={mutualFundRows}
  />

  <RateCard
    number="D"
    title="Government Securities"
    description="Reference brokerage rates for government bonds and eligible securities."
    columns={["Transaction Amount", "Reference Brokerage Rate", "When Charged"]}
    rows={governmentSecuritiesRows}
  />

  <RateCard
    number="E"
    title="DP Charges"
    description="Depository services, account maintenance and share transfer charges."
    columns={["DP Service", "Example Charge", "Frequency"]}
    rows={dematRows}
  />

  <RateCard
    number="F"
    title="Other Charges"
    description="SEBON transaction fees displayed separately by security type."
    columns={["Charge", "Reference Rate", "When Charged"]}
    rows={otherChargesRows}
  />

  <RateCard
    number="G"
    title="Capital Gains Tax"
    description="Capital gains tax rates by investor category and holding period."
    columns={["Investor Category", "Holding Period", "Tax on Taxable Profit"]}
    rows={capitalGainsRows}
  />
</div>

      {/* Tax note */}
      <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 sm:mt-8 sm:p-5">
        <ShieldCheck
          size={20}
          className="mt-0.5 shrink-0 text-[#059669]"
        />
        <div>
          <h2 className="text-sm font-semibold text-[#12241C]">
            {t("Important Information")}
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
           {t(
  "* Capital gains tax rates and other charges are presented as supplied. Please confirm the applicable rates with JF Securities and the relevant authorities before making a transaction."
)}
          </p>
        </div>
      </div>
    </main>
  );
}

export default ServiceRates;
