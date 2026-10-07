import { useState } from "react";
import { Copy, Check, ArrowUpRight, QrCode, Building2 } from "lucide-react";
import { BANK_DETAILS } from "../data/websiteData";
import { useLang } from "../i18n/useLang";

export default function PaymentPage() {
  const { t, tb } = useLang();
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (value, key) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(value);
      setCopiedField(key);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  return (
    <section className="max-w-[1200px] mx-auto px-5 sm:px-6 py-16 md:py-24">
      {/* Page Heading */}
      <div className="max-w-2xl mb-12">
        <div className="text-xs sm:text-sm font-semibold text-[#059669] mb-2">
          {t("Payment information")}
        </div>

        <h1 className="disp text-3xl sm:text-4xl md:text-5xl text-[#091E16] mb-4">
          {t("Fund your account")}
        </h1>

        <p className="text-sm sm:text-[15.5px] text-slate-600 leading-relaxed">
          {t("Choose any of the payment options below to deposit funds into your trading account. Please mention your Client Code in the remarks so we can credit your account quickly.")}
        </p>
      </div>

      {/* Bank Details + QR Code Primary Action Row */}
      <div className="grid lg:grid-cols-12 gap-6 mb-14">
        {/* Global IME Bank Interactive Copy Card */}
        <div className="lg:col-span-7 card-hover bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <img
                src="/payment-logos/global-ime-bank.png"
                alt="Global IME Bank"
                referrerPolicy="no-referrer"
                className="h-10 sm:h-11 w-auto object-contain"
              />
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#059669]">
                <Building2 size={15} />
                <span>{t("Official Settlement Bank")}</span>
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {/* Account Name */}
              <div className="p-4 rounded-xl bg-[#F9FBF9] border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="text-xs text-slate-500">{t("Account Name")}</div>
                  <div className="text-sm sm:text-base font-bold text-[#091E16] mt-0.5">
                    {BANK_DETAILS.accountName}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(BANK_DETAILS.accountName, "name")}
                  className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:border-[#059669] text-xs font-semibold text-slate-700 hover:text-[#059669] transition-colors cursor-pointer shrink-0"
                >
                  {copiedField === "name" ? (
                    <>
                      <Check size={14} className="text-[#059669]" />
                      <span className="text-[#059669]">{t("Copied")}</span>
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
              <div className="p-4 rounded-xl bg-[#F9FBF9] border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="text-xs text-slate-500">{t("Account Number")}</div>
                  <div className="text-base sm:text-lg font-bold text-[#059669] mono-num mt-0.5">
                    {BANK_DETAILS.accountNumber}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(BANK_DETAILS.accountNumber, "number")}
                  className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:border-[#059669] text-xs font-semibold text-slate-700 hover:text-[#059669] transition-colors cursor-pointer shrink-0"
                >
                  {copiedField === "number" ? (
                    <>
                      <Check size={14} className="text-[#059669]" />
                      <span className="text-[#059669]">{t("Copied")}</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>{t("Copy Number")}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Branch */}
              <div className="grid sm:grid-cols-2 gap-4 pt-2 text-sm">
                <div>
                  <span className="text-xs text-slate-500 block">{t("Branch")}</span>
                  <span className="font-semibold text-[#091E16]">{t(BANK_DETAILS.branch)}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">{t("Receipt Verification")}</span>
                  <a
                    href={`mailto:${BANK_DETAILS.email}`}
                    className="font-semibold text-[#059669] hover:underline"
                  >
                    {BANK_DETAILS.email}
                  </a>
                  <span className="text-xs text-slate-500 block mono-num mt-0.5">
                    {t("Viber:")} {BANK_DETAILS.viber}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FonePay QR Card */}
        <div className="lg:col-span-5 card-hover bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 flex flex-col items-center justify-center text-center">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#059669] mb-2">
            <QrCode size={15} />
            <span>{t("Instant QR Deposit")}</span>
          </div>
          <h2 className="disp text-xl text-[#091E16] mb-4">
            {t("Scan & Pay")}
          </h2>

          <div className="p-3 rounded-2xl bg-[#F9FBF9] border border-slate-200/80 mb-4">
            <img
              src="/payment-logos/bank-qr.png"
              alt="FonePay QR"
              referrerPolicy="no-referrer"
              className="w-48 h-48 object-contain mx-auto block"
            />
          </div>

          <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
            {t("Scan this QR code to make payment. Verify the recipient details before confirming the transaction.")}
          </p>
        </div>
      </div>

      {/* Digital Wallets & Payment Instructions */}
      <div>
        <div className="text-xs sm:text-sm font-semibold text-[#059669] mb-2">
          {t("Payment Instructions")}
        </div>

        <h2 className="disp text-2xl sm:text-3xl text-[#091E16] mb-8">
          {t("How to make your payment")}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* eSewa */}
          <div className="card-hover bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-col justify-between">
            <div>
              <div className="h-12 flex items-center mb-5">
                <img
                  src="/payment-logos/esewa.png"
                  alt="eSewa"
                  referrerPolicy="no-referrer"
                  className="h-10 w-auto object-contain"
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
              className="mt-6 pt-4 border-t border-slate-100 inline-flex items-center justify-between text-xs font-semibold text-[#059669] hover:text-[#047857]"
            >
              <span>{t("Visit eSewa →").replace(" →", "")}</span>
              <ArrowUpRight size={15} />
            </a>
          </div>

          {/* Khalti */}
          <div className="card-hover bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-col justify-between">
            <div>
              <div className="h-12 flex items-center mb-5">
                <img
                  src="/payment-logos/khalti.png"
                  alt="Khalti"
                  referrerPolicy="no-referrer"
                  className="h-10 w-auto object-contain"
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
              className="mt-6 pt-4 border-t border-slate-100 inline-flex items-center justify-between text-xs font-semibold text-[#059669] hover:text-[#047857]"
            >
              <span>{t("Visit Khalti →").replace(" →", "")}</span>
              <ArrowUpRight size={15} />
            </a>
          </div>

          {/* connectIPS */}
          <div className="card-hover bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-col justify-between">
            <div>
              <div className="h-12 flex items-center mb-5">
                <img
                  src="/payment-logos/connectips.png"
                  alt="connectIPS"
                  referrerPolicy="no-referrer"
                  className="h-10 w-auto object-contain"
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
              className="mt-6 pt-4 border-t border-slate-100 inline-flex items-center justify-between text-xs font-semibold text-[#059669] hover:text-[#047857]"
            >
              <span>{t("Visit connectIPS →").replace(" →", "")}</span>
              <ArrowUpRight size={15} />
            </a>
          </div>

          {/* TMS Direct Payment */}
          <div className="card-hover bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-col justify-between">
            <div>
              <div className="h-12 flex flex-col justify-center mb-5">
                <span className="text-xs font-semibold text-[#059669]">
                  {t("TMS Payment")}
                </span>
                <h3 className="disp text-lg text-[#091E16]">
                  {t("Pay through TMS")}
                </h3>
              </div>

              <ul className="space-y-2 text-xs sm:text-[13.5px] text-slate-600 leading-relaxed list-none p-0 m-0">
                <li>{tb("• Log in to your **JF Securities TMS account**.")}</li>
                <li>{tb("• Go to **Fund Management → Fund Settlement**.")}</li>
                <li>{tb("• Open **Buy Information** and check your payment due.")}</li>
                <li>{tb("• Select the outstanding transaction and click **Make Settlement**.")}</li>
                <li>{tb("• Click **Proceed with Payment** and select the available payment method.")}</li>
              </ul>
            </div>

            <a
              href="https://tms07.nepsetms.com.np/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 pt-4 border-t border-slate-100 inline-flex items-center justify-between text-xs font-semibold text-[#059669] hover:text-[#047857]"
            >
              <span>{t("TMS Login ↗").replace(" ↗", "")}</span>
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
