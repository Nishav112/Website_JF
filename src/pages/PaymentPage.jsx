import { useState } from "react";
import {
  Copy,
  Check,
  ArrowUpRight,
  QrCode,
  Building2,
  CreditCard,
  ShieldCheck,
} from "lucide-react";
import { BANK_DETAILS } from "../data/websiteData";
import { useLang } from "../i18n/useLang";

export default function PaymentPage() {
  const { t, tb } = useLang();
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = async (value, key) => {
    try {
      if (!navigator.clipboard) return;

      await navigator.clipboard.writeText(String(value));
      setCopiedField(key);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (error) {
      console.error("Unable to copy to clipboard:", error);
    }
  };

  const tmsUrl = "https://tms07.nepsetms.com.np/";

  return (
    <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">

      {/* Page Heading */}
      <div className="max-w-2xl mb-7 sm:mb-10">
        <div className="text-xs sm:text-sm font-semibold text-[#059669] mb-1.5 sm:mb-2">
          {t("Payment information")}
        </div>

        <h1 className="disp text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-[#091E16] mb-2 sm:mb-4">
          {t("Fund your account")}
        </h1>

        <p className="text-sm sm:text-[15.5px] text-slate-600 leading-relaxed">
          {t(
            "Choose any of the payment options below to deposit funds into your trading account. Please mention your Client Code in the remarks so we can credit your account quickly."
          )}
        </p>
      </div>

      {/* FEATURED TMS PAYMENT */}
      <div className="mb-8 sm:mb-12">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#C9E9D8] bg-gradient-to-br from-[#F0FAF4] via-white to-[#E5F5EC] p-5 sm:p-8 md:p-10">

          {/* Decorative background */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-[#059669]/[0.07] sm:h-64 sm:w-64"
          />

          <div className="relative grid md:grid-cols-12 gap-6 md:gap-8 items-center">

            {/* TMS Information */}
            <div className="md:col-span-8 min-w-0">

              <div className="inline-flex items-center gap-2 rounded-full border border-[#B9E4CD] bg-white/80 px-3 py-1.5 mb-4">
                <span className="h-2 w-2 rounded-full bg-[#059669]" />
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wide text-[#047857]">
                  {t("Recommended Payment Method")}
                </span>
              </div>

              <div className="flex items-start gap-3 sm:gap-4 mb-3">
                <div className="shrink-0 flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl bg-[#047857] text-white shadow-sm">
                  <CreditCard size={25} strokeWidth={1.8} />
                </div>

                <div className="min-w-0">
                  <h2 className="disp text-xl sm:text-2xl md:text-3xl text-[#091E16] leading-tight">
                    {t("Pay Through TMS")}
                  </h2>

                  <p className="text-xs sm:text-sm font-medium text-[#047857] mt-1">
                    {t("Settle your trading payments directly through TMS")}
                  </p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mb-5">
                {t(
                  "Use your JF Securities TMS account to check outstanding payments and settle your trading transactions through the available payment options."
                )}
              </p>
              
{/* Compact TMS Payment Instructions */}
<div className="space-y-3">

  {/* Trading Payment */}
  <details className="group rounded-xl border border-[#D4EADF] bg-white/80">
    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-3 sm:p-4">
      <span className="text-sm font-bold text-[#091E16]">
        {t("Trading Payment")}
      </span>
      <span className="text-xs font-semibold text-[#047857] group-open:hidden">
        {t("View steps")} +
      </span>
      <span className="hidden text-xs font-semibold text-[#047857] group-open:inline">
        {t("Hide steps")} −
      </span>
    </summary>

    <div className="border-t border-[#E5F1E9] px-3 py-3 sm:px-4">
      <ol className="list-decimal space-y-2 pl-5 text-xs sm:text-sm leading-relaxed text-slate-600">
        {[
          "Log in to your JF Securities TMS account.",
          "Go to Fund Management → Fund Settlement.",
          "Open Buy Information and check your payment due.",
          "Select the outstanding transaction and click Make Settlement.",
          "Click Proceed with Payment and select an available payment method.",
        ].map((step) => (
          <li key={step}>{t(step)}</li>
        ))}
      </ol>
    </div>
  </details>

  {/* Collateral Deposit */}
  <details className="group rounded-xl border border-[#D4EADF] bg-white/80">
    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-3 sm:p-4">
      <span className="text-sm font-bold text-[#091E16]">
        {t("Collateral Deposit")}
      </span>
      <span className="text-xs font-semibold text-[#047857] group-open:hidden">
        {t("View steps")} +
      </span>
      <span className="hidden text-xs font-semibold text-[#047857] group-open:inline">
        {t("Hide steps")} −
      </span>
    </summary>

    <div className="border-t border-[#E5F1E9] px-3 py-3 sm:px-4">
      <ol className="list-decimal space-y-2 pl-5 text-xs sm:text-sm leading-relaxed text-slate-600">
        {[
          "Log in to your JF Securities TMS account.",
          "Go to Fund Management → Collateral Management.",
          "Click Load Collateral.",
          "Choose your bank or wallet, such as eSewa, Khalti, or CellPay.",
          "Select your preferred payment method.",
          "Enter the amount you want to deposit.",
          "Enter your name and Client Code in the Remarks field.",
          "Click Submit.",
          "Enter the OTP received to complete verification.",
        ].map((step) => (
          <li key={step}>{t(step)}</li>
        ))}
      </ol>
    </div>
  </details>

</div>
            </div>

            {/* TMS Call To Action */}
            <div className="md:col-span-4 min-w-0">
              <div className="rounded-xl sm:rounded-2xl border border-[#D4EADF] bg-white p-5 sm:p-6 shadow-sm">

                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-[#E5F5EC] text-[#047857] mb-4">
                  <ShieldCheck size={25} strokeWidth={1.8} />
                </div>

                <h3 className="disp text-lg sm:text-xl text-[#091E16] mb-2">
                  {t("Ready to make a payment?")}
                </h3>

                <p className="text-sm text-slate-500 leading-relaxed mb-5">
                  {t(
                    "Access your trading account to review and settle your outstanding payments."
                  )}
                </p>

                <a
                  href={tmsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-[#047857] hover:bg-[#065F46] active:bg-[#064E3B] px-4 py-3.5 text-sm font-bold text-white transition-colors shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#047857]"
                >
                  <span>{t("Pay Through TMS")}</span>
                  <ArrowUpRight size={18} />
                </a>

                <p className="mt-3 text-center text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                  {t("You will be redirected to the TMS login page.")}
                </p>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* BANK DETAILS + QR CODE */}
      <div className="mb-10 sm:mb-14">

        <div className="mb-5 sm:mb-7">
          <div className="text-xs sm:text-sm font-semibold text-[#059669] mb-1.5">
            {t("Alternative Payment Methods")}
          </div>

          <h2 className="disp text-xl sm:text-2xl md:text-3xl text-[#091E16]">
            {t("Bank Transfer & QR Payment")}
          </h2>

          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            {t(
              "You can also deposit funds using the bank details or QR code below."
            )}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-4 sm:gap-6">

          {/* Global IME Bank */}
          <div className="lg:col-span-7 card-hover bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 p-4 sm:p-6 md:p-8 flex flex-col justify-between">

            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 sm:pb-6 border-b border-slate-100">
                <img
                  src="/payment-logos/global-ime-bank.png"
                  alt="Global IME Bank"
                  className="h-8 sm:h-11 max-w-full w-auto object-contain"
                />

                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#059669]">
                  <Building2 size={15} />
                  <span>{t("Official Settlement Bank")}</span>
                </span>
              </div>

              <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">

                {/* Account Name */}
                <div className="p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-xs text-slate-500">
                      {t("Account Name")}
                    </div>
                    <div className="text-sm sm:text-base font-bold text-[#091E16] mt-1 break-words">
                      {BANK_DETAILS.accountName}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(BANK_DETAILS.accountName, "name")
                    }
                    className="self-start sm:self-center shrink-0 inline-flex items-center justify-center gap-1.5 min-h-9 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:border-[#059669] text-xs font-semibold text-slate-700 hover:text-[#059669] transition-colors cursor-pointer"
                  >
                    {copiedField === "name" ? (
                      <>
                        <Check size={14} className="text-[#059669]" />
                        <span className="text-[#059669]">
                          {t("Copied")}
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>{t("Copy")}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Account Number */}
                <div className="p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-xs text-slate-500">
                      {t("Account Number")}
                    </div>
                    <div className="text-base sm:text-lg font-bold text-[#059669] mono-num mt-1 break-all">
                      {BANK_DETAILS.accountNumber}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(BANK_DETAILS.accountNumber, "number")
                    }
                    className="self-start sm:self-center shrink-0 inline-flex items-center justify-center gap-1.5 min-h-9 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:border-[#059669] text-xs font-semibold text-slate-700 hover:text-[#059669] transition-colors cursor-pointer"
                  >
                    {copiedField === "number" ? (
                      <>
                        <Check size={14} className="text-[#059669]" />
                        <span className="text-[#059669]">
                          {t("Copied")}
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>{t("Copy Number")}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Branch and Verification */}
                <div className="grid sm:grid-cols-2 gap-4 pt-1 sm:pt-2 text-sm">
                  <div className="min-w-0">
                    <span className="text-xs text-slate-500 block mb-1">
                      {t("Branch")}
                    </span>
                    <span className="font-semibold text-[#091E16] break-words">
                      {t(BANK_DETAILS.branch)}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <span className="text-xs text-slate-500 block mb-1">
                      {t("Receipt Verification")}
                    </span>

                    <a
                      href={`mailto:${BANK_DETAILS.email}`}
                      className="font-semibold text-[#059669] hover:underline break-all"
                    >
                      {BANK_DETAILS.email}
                    </a>

                    <span className="text-xs text-slate-500 block mono-num mt-1">
                      {t("Viber:")} {BANK_DETAILS.viber}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* FonePay QR */}
          <div className="lg:col-span-5 card-hover bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center text-center">

            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#059669] mb-2">
              <QrCode size={15} />
              <span>{t("Instant QR Deposit")}</span>
            </div>

            <h3 className="disp text-lg sm:text-xl text-[#091E16] mb-4">
              {t("Scan & Pay")}
            </h3>

            <div className="w-full max-w-[240px] p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200/80 mb-4">
              <img
                src="/payment-logos/bank-qr.png"
                alt="FonePay QR"
                className="w-full aspect-square object-contain mx-auto block"
              />
            </div>

            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xs">
              {t(
                "Scan this QR code to make payment. Verify the recipient details before confirming the transaction."
              )}
            </p>
          </div>

        </div>
      </div>

      {/* OTHER PAYMENT METHODS */}
      <div>
        <div className="text-xs sm:text-sm font-semibold text-[#059669] mb-1.5 sm:mb-2">
          {t("Payment Instructions")}
        </div>

        <h2 className="disp text-xl sm:text-2xl md:text-3xl text-[#091E16] mb-5 sm:mb-8">
          {t("Other ways to make your payment")}
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">

          {/* eSewa */}
          <div className="card-hover bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 p-4 sm:p-6 flex flex-col justify-between min-w-0">
            <div>
              <div className="h-10 sm:h-12 flex items-center mb-3 sm:mb-5">
                <img
                  src="/payment-logos/esewa.png"
                  alt="eSewa"
                  className="h-8 sm:h-10 max-w-full w-auto object-contain"
                />
              </div>

              <ol className="space-y-2 text-xs sm:text-[13.5px] text-slate-600 leading-relaxed list-none p-0 m-0">
                <li>{t("• Open eSewa.")}</li>
                <li>{t("• Login to your eSewa account.")}</li>
                <li>{tb("• Search or scroll down to **Stock Broker Payment**.")}</li>
                <li>{tb("• Click on **J.F. Securities Company Pvt. Ltd.**")}</li>
                <li>{tb("• Enter your **Client Code and DOB**.")}</li>
                <li>{t("• Proceed with the payment.")}</li>
              </ol>
            </div>

            <a
              href="https://esewa.com.np/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 pt-4 border-t border-slate-100 inline-flex items-center justify-between gap-2 text-xs font-semibold text-[#059669] hover:text-[#047857]"
            >
              <span>{t("Visit eSewa")}</span>
              <ArrowUpRight size={15} />
            </a>
          </div>

          {/* Khalti */}
          <div className="card-hover bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 p-4 sm:p-6 flex flex-col justify-between min-w-0">
            <div>
              <div className="h-10 sm:h-12 flex items-center mb-3 sm:mb-5">
                <img
                  src="/payment-logos/khalti.png"
                  alt="Khalti"
                  className="h-8 sm:h-10 max-w-full w-auto object-contain"
                />
              </div>

              <ol className="space-y-2 text-xs sm:text-[13.5px] text-slate-600 leading-relaxed list-none p-0 m-0">
                <li>{t("• Open Khalti.")}</li>
                <li>{t("• Login to your Khalti account.")}</li>
                <li>{tb("• Search or scroll down to **Stock Broker Payment**.")}</li>
                <li>{tb("• Click on **J.F. Securities Company Pvt. Ltd.**")}</li>
                <li>{tb("• Enter your **Client Code and DOB**.")}</li>
                <li>{t("• Proceed with the payment.")}</li>
              </ol>
            </div>

            <a
              href="https://web.khalti.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 pt-4 border-t border-slate-100 inline-flex items-center justify-between gap-2 text-xs font-semibold text-[#059669] hover:text-[#047857]"
            >
              <span>{t("Visit Khalti")}</span>
              <ArrowUpRight size={15} />
            </a>
          </div>

          {/* connectIPS */}
          <div className="card-hover bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 p-4 sm:p-6 flex flex-col justify-between min-w-0">
            <div>
              <div className="h-10 sm:h-12 flex items-center mb-3 sm:mb-5">
                <img
                  src="/payment-logos/connectips.png"
                  alt="connectIPS"
                  className="h-8 sm:h-10 max-w-full w-auto object-contain"
                />
              </div>

              <ol className="space-y-2 text-xs sm:text-[13.5px] text-slate-600 leading-relaxed list-none p-0 m-0">
                <li>{t("• Open connectIPS.")}</li>
                <li>{tb("• Go to **Financial Institution**.")}</li>
                <li>{tb("• Select **Capital Market**.")}</li>
                <li>{tb("• Select **Broker Payment**.")}</li>
                <li>{t("• Fill in the transaction form.")}</li>
                <li>{tb("• Select Broker as **No. 7 — J.F. Securities Co. Pvt. Ltd.**")}</li>
                <li>{t("• Proceed with the payment.")}</li>
              </ol>
            </div>

            <a
              href="https://connectips.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 pt-4 border-t border-slate-100 inline-flex items-center justify-between gap-2 text-xs font-semibold text-[#059669] hover:text-[#047857]"
            >
              <span>{t("Visit connectIPS")}</span>
              <ArrowUpRight size={15} />
            </a>
          </div>

        </div>
      </div>

    </section>
  );
}
