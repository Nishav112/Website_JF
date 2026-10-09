
import { useState } from "react";
import {
  ArrowLeft,
  ShieldCheck,
  Calculator,
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
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-[#091E16] outline-none transition-colors focus:border-[#059669] focus:bg-white focus:ring-2 focus:ring-emerald-500/10";

const labelClass =
  "mb-1.5 block text-xs sm:text-sm font-semibold text-slate-700";

const buttonClass =
  "inline-flex items-center justify-center rounded-xl bg-[#059669] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#047857] focus:outline-none focus:ring-2 focus:ring-emerald-500/30";

function RateTable({ title, data }) {
  const { t, ta } = useLang();

  return (
    <div className="card-hover overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white">
      <div className="border-b border-slate-100 px-4 py-3.5 sm:px-6 sm:py-5">
        <h2 className="disp text-base sm:text-xl text-[#091E16]">
          {t(title)}
        </h2>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50">
              <th className="px-3.5 py-2.5 text-left text-xs font-semibold text-slate-500 sm:px-6 sm:py-3.5">
                {t("Transaction Amount")}
              </th>
              <th className="whitespace-nowrap px-3.5 py-2.5 text-right text-xs font-semibold text-slate-500 sm:px-6 sm:py-3.5">
                {t("Rate")}
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {data.map((item, index) => (
              <tr
                key={index}
                className="transition-colors hover:bg-emerald-50/30"
              >
                <td className="px-3.5 py-2.5 text-xs text-slate-700 sm:px-6 sm:py-4 sm:text-sm">
                  {ta(item.amount)}
                </td>
                <td className="mono-num whitespace-nowrap px-3.5 py-2.5 text-right text-xs font-semibold text-[#059669] sm:px-6 sm:py-4 sm:text-sm">
                  {ta(item.rate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
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
    buyAmount + buyCommission + buySebon + buyDpCharge;

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
    <section className="card-hover mb-6 sm:mb-8 overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white">
      {/* Calculator heading */}
      <div className="border-b border-slate-100 px-4 py-4 sm:px-7 sm:py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#059669]">
            <Calculator size={20} />
          </div>

          <div>
            <h2 className="disp text-lg sm:text-2xl text-[#091E16]">
              {t("Share Calculator")}
            </h2>
            <p className="mt-0.5 text-xs sm:text-sm text-slate-500">
              {t("Estimate your transaction charges and receivable amount.")}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-7">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
          {/* Input form */}
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
                <label className="mt-2.5 flex cursor-pointer items-center gap-2 text-xs sm:text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={waccPrice}
                    onChange={(e) => setWaccPrice(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 accent-emerald-600"
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

            <div className="flex flex-wrap gap-3 pt-1">
              <button
                type="button"
                onClick={calculate}
                className={buttonClass}
              >
                {t("Calculate")}
              </button>

              <button
                type="button"
                onClick={clearCalculator}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200"
              >
                {t("Clear")}
              </button>
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-xl border border-red-100 bg-red-50 px-3.5 py-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}
          </div>

          {/* Calculation results */}
          <div className="min-w-0">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="disp text-base sm:text-lg text-[#091E16]">
                {t("Calculation Details")}
              </h3>

              <span className="rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[10px] sm:text-xs font-semibold text-[#059669]">
                {t("Estimated")}
              </span>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full border-collapse text-xs sm:text-sm">
                <tbody className="divide-y divide-slate-100">
                  {transactionType === "sell" && (
                    <tr className="bg-slate-50">
                      <td className="px-3 py-3 font-medium text-slate-600 sm:px-4">
                        {t("Investor Type")}
                      </td>
                      <td className="px-3 py-3 text-right font-semibold text-slate-800 sm:px-4">
                        {calculated ? t(investorType) : "—"}
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
                          className={`break-words px-3 py-3 sm:px-4 ${
                            isTotal
                              ? "font-bold text-[#091E16]"
                              : "font-medium text-slate-600"
                          }`}
                        >
                          {label}
                        </td>

                        <td
                          className={`whitespace-nowrap px-3 py-3 text-right font-semibold sm:px-4 ${
                            isTotal
                              ? "text-[#059669]"
                              : isProfitLoss && calculated
                                ? netProfit < 0
                                  ? "text-red-600"
                                  : "text-[#059669]"
                                : "text-slate-800"
                          }`}
                        >
                          {calculated ? formatNPR(value) : "—"}
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
                  className={`mono-num mt-1 text-lg sm:text-xl font-bold ${
                    netProfit < 0 ? "text-red-700" : "text-[#059669]"
                  }`}
                >
                  {formatNPR(netProfit)}
                </p>
              </div>
            )}

            <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2.5 text-[11px] leading-relaxed text-slate-500">
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
  const { t, ta } = useLang();
  const [tradeAmount, setTradeAmount] = useState(100000);

  const numericAmount = Math.max(0, Number(tradeAmount) || 0);
  const appliedRate = getEquityRate(numericAmount);
  const rawCommission = numericAmount * appliedRate;

  const brokerageFee =
    numericAmount > 0 ? Math.max(10, rawCommission) : 0;

  const sebonFee = numericAmount * SEBON_RATE;
  const dpCharge = numericAmount > 0 ? DP_CHARGE : 0;

  const totalEstimated = brokerageFee + sebonFee + dpCharge;

  return (
    <main className="mx-auto max-w-[1120px] px-4 py-8 sm:px-6 sm:py-14 md:py-20">
      {/* Page Header */}
      <div className="mb-6 max-w-2xl sm:mb-10">
        <Link
          to="/services"
          className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#059669] transition-colors hover:text-[#047857] sm:mb-5 sm:text-sm"
        >
          <ArrowLeft size={15} />
          <span>{t("Back to Services")}</span>
        </Link>

        <div className="mb-1 text-xs font-semibold text-[#059669] sm:mb-2 sm:text-sm">
          {t("Service Rates")}
        </div>

        <h1 className="disp text-2xl text-[#091E16] xs:text-3xl sm:text-4xl md:text-5xl">
          {t("Brokerage & Service Charges")}
        </h1>

        <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:mt-4 sm:text-[15.5px]">
          {t(
            "View applicable brokerage rates, service charges, capital gains tax information and other charges of JF Securities."
          )}
        </p>
      </div>

      {/* Share Calculator */}
      <ShareCalculator />

      {/* Interactive Fee Estimator */}
      <section className="card-hover mb-6 rounded-xl border border-slate-200/90 bg-white p-4 sm:mb-8 sm:rounded-2xl sm:p-8">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#059669]">
          <Calculator size={15} />
          <span>{t("Interactive Fee Estimator (Equity)")}</span>
        </div>

        <div className="grid items-center gap-4 sm:gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <label
              htmlFor="trade-amount-input"
              className="mb-1.5 block text-xs font-semibold text-[#091E16] sm:text-sm"
            >
              {t("Enter Transaction Amount (NPR)")}
            </label>

            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 sm:text-sm">
                Rs.
              </span>

              <input
                id="trade-amount-input"
                type="number"
                min="0"
                step="1000"
                value={tradeAmount}
                onChange={(e) => setTradeAmount(e.target.value)}
                className="mono-num w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-3 text-sm font-semibold text-[#091E16] transition-colors focus:border-[#059669] focus:bg-white sm:py-2.5 sm:text-base"
              />
            </div>

            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {[25000, 100000, 500000, 2500000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setTradeAmount(preset)}
                  className={`mono-num cursor-pointer rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                    numericAmount === preset
                      ? "bg-[#059669] text-white"
                      : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Rs. {preset.toLocaleString("en-IN")}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 rounded-xl border border-slate-200/80 bg-slate-50 p-3 sm:grid-cols-4 sm:gap-3 sm:p-5 lg:col-span-7">
            <div>
              <div className="text-[11px] text-slate-500 sm:text-xs">
                {t("Commission Rate")}
              </div>
              <div className="mono-num mt-0.5 text-sm font-bold text-[#091E16] sm:text-base">
                {(appliedRate * 100).toFixed(2)}%
              </div>
            </div>

            <div>
              <div className="text-[11px] text-slate-500 sm:text-xs">
                {t("Brokerage")}
              </div>
              <div className="mono-num mt-0.5 text-sm font-bold text-[#091E16] sm:text-base">
                {formatNPR(brokerageFee)}
              </div>
            </div>

            <div>
              <div className="text-[11px] text-slate-500 sm:text-xs">
                {t("SEBON + DP")}
              </div>
              <div className="mono-num mt-0.5 text-sm font-bold text-[#091E16] sm:text-base">
                {formatNPR(sebonFee + dpCharge)}
              </div>
            </div>

            <div>
              <div className="text-[11px] font-semibold text-[#059669] sm:text-xs">
                {t("Est. Total Fee")}
              </div>
              <div className="mono-num mt-0.5 text-sm font-bold text-[#059669] sm:text-base">
                {formatNPR(totalEstimated)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Charges */}
      <div className="rates-cols mb-6">
        <div className="rates-col">
          <RateTable
            title="Brokerage Charges"
            data={SERVICE_RATES.brokerage}
          />

          {/* Additional Charges */}
          <section className="card-hover overflow-hidden rounded-xl border border-slate-200/90 bg-white sm:rounded-2xl">
            <div className="border-b border-slate-100 px-4 py-3.5 sm:px-6 sm:py-5">
              <h2 className="disp text-base text-[#091E16] sm:text-xl">
                {t("Additional Charges")}
              </h2>
            </div>

            <div className="divide-y divide-slate-100 px-4 py-1 sm:px-6">
              {SERVICE_RATES.additionalCharges.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-3 py-2.5 sm:py-3.5"
                >
                  <span className="text-xs text-slate-700 sm:text-sm">
                    {t(item.name)}
                  </span>
                  <strong className="mono-num whitespace-nowrap text-xs font-semibold text-[#059669] sm:text-sm">
                    {ta(item.amount)}
                  </strong>
                </div>
              ))}

              <div className="flex items-center justify-between gap-3 py-2.5 sm:py-3.5">
                <span className="text-xs text-slate-700 sm:text-sm">
                  {t("Minimum Charge")}
                </span>
                <strong className="mono-num whitespace-nowrap text-xs font-semibold text-[#059669] sm:text-sm">
                  {ta(SERVICE_RATES.minimumCharge)}
                </strong>
              </div>

              <div className="flex items-center justify-between gap-3 py-2.5 sm:py-3.5">
                <span className="text-xs text-slate-700 sm:text-sm">
                  {t("DP Charge (Sell Transaction)")}
                </span>
                <strong className="mono-num whitespace-nowrap text-xs font-semibold text-[#059669] sm:text-sm">
                  Rs. 25
                </strong>
              </div>

            </div>
          </section>
        </div>

        <div className="rates-col">
          <RateTable
            title="Government / Semi-Government Bonds"
            data={SERVICE_RATES.governmentBonds}
          />

          <RateTable
            title="Mutual Funds and Others"
            data={SERVICE_RATES.mutualFunds}
          />
        </div>
      </div>

      {/* Capital Gains Tax */}
      <section className="card-hover rounded-xl border border-slate-200/90 bg-white p-4 sm:rounded-2xl sm:p-6">
        <div className="mb-3.5 flex items-center gap-2 sm:mb-5">
          <ShieldCheck size={18} className="text-[#059669]" />
          <h2 className="disp text-base text-[#091E16] sm:text-xl">
            {t("Capital Gains Tax")}
          </h2>
        </div>

        <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-3 sm:p-4">
            <div className="mb-1 text-[11px] text-slate-500 sm:text-xs">
              {t("Institutional Customers")}
            </div>
            <div className="mono-num text-sm font-bold text-[#091E16] sm:text-base">
              {ta(t(SERVICE_RATES.capitalGains.institutional))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-3 sm:p-4">
            <div className="mb-1.5 text-[11px] text-slate-500 sm:text-xs">
              {t("Individual Customers")}
            </div>

            <div className="divide-y divide-slate-100">
              {SERVICE_RATES.capitalGains.individual.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-3 py-2 text-xs sm:text-sm"
                >
                  <span className="text-slate-700">
                    {t(item.period)}
                  </span>
                  <strong className="mono-num text-[#059669]">
                    {ta(item.rate)}
                  </strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ServiceRates;