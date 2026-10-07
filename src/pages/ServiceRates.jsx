import { useState } from "react";
import { ArrowLeft, Clock, FileText, ShieldCheck, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import { SERVICE_RATES } from "../data/websiteData";
import { useLang } from "../i18n/useLang";

function RateTable({ title, data }) {
  const { t, ta } = useLang();

  return (
    <div className="card-hover bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 overflow-hidden">
      <div className="px-4 sm:px-6 py-3.5 sm:py-5 border-b border-slate-100">
        <h2 className="disp text-base sm:text-xl text-[#091E16]">
          {t(title)}
        </h2>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200/80">
              <th className="text-left px-3.5 sm:px-6 py-2.5 sm:py-3.5 text-xs font-semibold text-slate-500">
                {t("Transaction Amount")}
              </th>
              <th className="text-right px-3.5 sm:px-6 py-2.5 sm:py-3.5 text-xs font-semibold text-slate-500 whitespace-nowrap">
                {t("Rate")}
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-emerald-50/30 transition-colors">
                <td className="px-3.5 sm:px-6 py-2.5 sm:py-4 text-xs sm:text-sm text-slate-700">
                  {ta(item.amount)}
                </td>
                <td className="px-3.5 sm:px-6 py-2.5 sm:py-4 text-right whitespace-nowrap text-xs sm:text-sm font-semibold text-[#059669] mono-num">
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

function getEquityRate(amount) {
  if (amount <= 50000) return 0.0036;
  if (amount <= 500000) return 0.0033;
  if (amount <= 2000000) return 0.0031;
  if (amount <= 10000000) return 0.0027;
  return 0.0024;
}

function ServiceRates() {
  const { t, ta } = useLang();
  const [tradeAmount, setTradeAmount] = useState(100000);

  const numericAmount = Math.max(0, Number(tradeAmount) || 0);
  const appliedRate = getEquityRate(numericAmount);
  const rawCommission = numericAmount * appliedRate;
  const brokerageFee = numericAmount > 0 ? Math.max(10, rawCommission) : 0;
  const sebonFee = numericAmount * 0.00015;
  const dpCharge = numericAmount > 0 ? 25 : 0;
  const totalEstimated = brokerageFee + sebonFee + dpCharge;

  return (
    <main className="max-w-[1120px] mx-auto px-4 sm:px-6 py-8 sm:py-14 md:py-20">
      {/* Header */}
      <div className="max-w-2xl mb-6 sm:mb-10">
        <Link
          to="/services"
          className="inline-flex items-center gap-1.5 text-[#059669] hover:text-[#047857] text-xs sm:text-sm font-semibold mb-3 sm:mb-5 transition-colors"
        >
          <ArrowLeft size={15} />
          <span>{t("Back to Services")}</span>
        </Link>

        <div className="text-xs sm:text-sm font-semibold text-[#059669] mb-1 sm:mb-2">
          {t("Service Rates")}
        </div>

        <h1 className="disp text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-[#091E16]">
          {t("Brokerage & Service Charges")}
        </h1>

        <p className="mt-2 sm:mt-4 text-xs sm:text-[15.5px] leading-relaxed text-slate-600">
          {t("View the applicable brokerage rates, service charges, capital gains tax information and office hours of JF Securities.")}
        </p>
      </div>

      {/* Interactive Fee Estimator */}
      <section className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 p-4 sm:p-8 mb-6 sm:mb-8 shadow-xs">
        <div className="flex items-center gap-2 text-[#059669] text-xs font-semibold mb-2">
          <Calculator size={15} />
          <span>{t("Interactive Fee Estimator (Equity)")}</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-4 sm:gap-6 items-center">
          <div className="lg:col-span-5">
            <label
              htmlFor="trade-amount-input"
              className="block text-xs sm:text-sm font-semibold text-[#091E16] mb-1.5"
            >
              {t("Enter Transaction Amount (NPR)")}
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs sm:text-sm font-semibold text-slate-400">
                Rs.
              </span>
              <input
                id="trade-amount-input"
                type="number"
                min="0"
                step="1000"
                value={tradeAmount}
                onChange={(e) => setTradeAmount(e.target.value)}
                className="w-full pl-10 pr-3 py-2 sm:py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-[#091E16] font-semibold mono-num text-sm sm:text-base focus:border-[#059669] focus:bg-white transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {[25000, 100000, 500000, 2500000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setTradeAmount(preset)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold mono-num transition-colors cursor-pointer ${
                    Number(tradeAmount) === preset
                      ? "bg-[#059669] text-white"
                      : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Rs. {preset.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 bg-slate-50 p-3 sm:p-5 rounded-xl border border-slate-200/80">
            <div>
              <div className="text-[11px] sm:text-xs text-slate-500">{t("Commission Rate")}</div>
              <div className="text-sm sm:text-base font-bold text-[#091E16] mono-num mt-0.5">
                {(appliedRate * 100).toFixed(2)}%
              </div>
            </div>
            <div>
              <div className="text-[11px] sm:text-xs text-slate-500">{t("Brokerage")}</div>
              <div className="text-sm sm:text-base font-bold text-[#091E16] mono-num mt-0.5">
                Rs. {brokerageFee.toFixed(2)}
              </div>
            </div>
            <div>
              <div className="text-[11px] sm:text-xs text-slate-500">{t("SEBON + DP")}</div>
              <div className="text-sm sm:text-base font-bold text-[#091E16] mono-num mt-0.5">
                Rs. {(sebonFee + dpCharge).toFixed(2)}
              </div>
            </div>
            <div>
              <div className="text-[11px] sm:text-xs text-[#059669] font-semibold">{t("Est. Total Fee")}</div>
              <div className="text-sm sm:text-base font-bold text-[#059669] mono-num mt-0.5">
                Rs. {totalEstimated.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Minimum Charge Banner */}
      <div className="flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-4 mb-4 sm:mb-6 rounded-xl bg-emerald-50/80 border border-emerald-200/80">
        <FileText size={18} className="text-[#059669] shrink-0" />
        <div className="flex flex-wrap items-baseline gap-2 text-xs sm:text-sm">
          <span className="text-slate-600">{t("Minimum Charge")}:</span>
          <span className="text-sm sm:text-base font-bold text-[#091E16] mono-num">
            {ta(SERVICE_RATES.minimumCharge)}
          </span>
        </div>
      </div>

      {/* Service Charges Grid */}
      <div className="rates-cols mb-6">
        <div className="rates-col">
          <RateTable
            title="Brokerage Charges"
            data={SERVICE_RATES.brokerage}
          />

          {/* Additional Charges */}
          <section className="card-hover bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 overflow-hidden">
            <div className="px-4 sm:px-6 py-3.5 sm:py-5 border-b border-slate-100">
              <h2 className="disp text-base sm:text-xl text-[#091E16]">
                {t("Additional Charges")}
              </h2>
            </div>

            <div className="px-4 sm:px-6 py-1 divide-y divide-slate-100">
              {SERVICE_RATES.additionalCharges.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center gap-3 py-2.5 sm:py-3.5"
                >
                  <span className="text-xs sm:text-sm text-slate-700">
                    {t(item.name)}
                  </span>

                  <strong className="text-xs sm:text-sm font-semibold text-[#059669] mono-num whitespace-nowrap">
                    {ta(item.amount)}
                  </strong>
                </div>
              ))}
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

      {/* Capital Gains & Hours Grid */}
      <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
        {/* Capital Gains */}
        <section className="card-hover bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-3.5 sm:mb-5">
            <ShieldCheck size={18} className="text-[#059669]" />
            <h2 className="disp text-base sm:text-xl text-[#091E16]">
              {t("Capital Gains Tax")}
            </h2>
          </div>

          <div className="space-y-3">
            <div className="p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="text-[11px] sm:text-xs text-slate-500 mb-0.5">
                {t("Institutional Customers")}
              </div>
              <div className="text-sm sm:text-base font-bold text-[#091E16] mono-num">
                {ta(t(SERVICE_RATES.capitalGains.institutional))}
              </div>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="text-[11px] sm:text-xs text-slate-500 mb-1.5 sm:mb-2.5">
                {t("Individual Customers")}
              </div>

              <div className="divide-y divide-slate-100">
                {SERVICE_RATES.capitalGains.individual.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center gap-3 py-1.5 sm:py-2 text-xs sm:text-sm"
                  >
                    <span className="text-slate-700">{t(item.period)}</span>
                    <strong className="text-[#059669] mono-num">
                      {ta(item.rate)}
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trading & Office Hours */}
        <section className="card-hover bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 p-4 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3.5 sm:mb-5">
              <Clock size={18} className="text-[#059669]" />
              <h2 className="disp text-base sm:text-xl text-[#091E16]">
                {t("Trading & Office Hours")}
              </h2>
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="text-[11px] sm:text-xs text-slate-500 mb-0.5">{t("Trading Hours:")}</div>
                <div className="font-semibold text-[#091E16]">
                  {t(SERVICE_RATES.tradingHours.trading)}
                </div>
              </div>

              <div className="p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="text-[11px] sm:text-xs text-slate-500 mb-0.5">{t("Office Hours:")}</div>
                <div className="font-semibold text-[#091E16]">
                  {t(SERVICE_RATES.tradingHours.office)}
                </div>
              </div>
            </div>
          </div>

          <p className="mt-3 text-[11px] sm:text-xs text-slate-500">
            {t(SERVICE_RATES.tradingHours.holiday)}
          </p>
        </section>
      </div>
    </main>
  );
}

export default ServiceRates;
