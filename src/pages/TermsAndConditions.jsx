import { useLang } from "../i18n/useLang";

function TermsAndConditions() {
  const { t } = useLang();

  return (
    <main className="max-w-[900px] mx-auto px-4 sm:px-6 py-8 sm:py-14 md:py-20">
      <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 p-4 sm:p-12 shadow-xs">
        <div className="text-xs font-semibold text-[#059669] mb-1 sm:mb-2">
          {t("JF Securities")}
        </div>

        <h1 className="disp text-2xl sm:text-4xl text-[#091E16]">
          {t("Terms & Conditions")}
        </h1>

        <p className="mt-1 sm:mt-2 text-[11px] sm:text-xs text-slate-500">
          {t("Last Updated: 28 September 2026")}
        </p>

        <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5 text-xs sm:text-[15px] leading-relaxed text-slate-600">
          <p className="font-semibold text-[#091E16]">
            {t("By accessing and using the J.F. Securities Company Pvt. Ltd. website, you agree to the following terms:")}
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>
              {t("The information provided on this website is for general and informational purposes only and may be updated without prior notice.")}
            </li>
            <li>
              {t("Information available on this website does not constitute investment advice or a guarantee of returns.")}
            </li>
            <li>
              {t("Investment in securities involves risk, and investors are responsible for their own investment decisions.")}
            </li>
            <li>
              {t("Users must provide accurate information when submitting forms, applications, or enquiries through the website.")}
            </li>
            <li>
              {t("Users must not misuse the website, attempt unauthorized access, or interfere with its security or operation.")}
            </li>
            <li>
              {t("Website content, including logos, text, images, and documents, may not be reproduced or used without prior authorization.")}
            </li>
            <li>
              {t("Links to third-party websites are provided for convenience, and J.F. Securities is not responsible for their content or services.")}
            </li>
            <li>
              {t("J.F. Securities may modify these Terms & Conditions when necessary. Updated terms will be published on this website.")}
            </li>
            <li>
              {t("These Terms & Conditions are governed by the applicable laws and regulations of Nepal.")}
            </li>
          </ul>

          <p className="pt-4 border-t border-slate-100 text-[11px] sm:text-xs text-slate-500">
            {t("For any questions, please contact J.F. Securities Company Pvt. Ltd. through the contact details provided on this website.")}
          </p>
        </div>
      </div>
    </main>
  );
}

export default TermsAndConditions;
