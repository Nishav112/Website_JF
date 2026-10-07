import { useLang } from "../i18n/useLang";

function PrivacyPolicy() {
  const { t } = useLang();

  return (
    <main className="max-w-[900px] mx-auto px-5 sm:px-6 py-14 md:py-20">
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-12 shadow-xs">
        <div className="text-xs font-semibold text-[#059669] mb-2">
          {t("JF Securities")}
        </div>

        <h1 className="disp text-3xl sm:text-4xl text-[#091E16]">
          {t("Privacy Policy")}
        </h1>

        <p className="mt-2 text-xs text-slate-500">
          {t("Last Updated: 28 September 2026")}
        </p>

        <div className="mt-8 space-y-6 text-sm sm:text-[15px] leading-relaxed text-slate-600">
          <p>
            {t("J.F. Securities Company Pvt. Ltd. respects your privacy and is committed to protecting the information you provide through our website.")}
          </p>

          <div>
            <h2 className="disp text-lg text-[#091E16] mb-2">
              {t("Information We Collect")}
            </h2>
            <p>
              {t("We may collect information such as your name, phone number, email address, and other details submitted through our forms or enquiries.")}
            </p>
          </div>

          <div>
            <h2 className="disp text-lg text-[#091E16] mb-2">
              {t("How We Use Your Information")}
            </h2>
            <p className="mb-2">{t("Your information may be used to:")}</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>{t("Respond to your enquiries and requests.")}</li>
              <li>{t("Provide requested services.")}</li>
              <li>{t("Process applications and forms.")}</li>
              <li>{t("Communicate important company or service-related information.")}</li>
              <li>{t("Meet applicable legal and regulatory requirements.")}</li>
            </ul>
          </div>

          <div>
            <h2 className="disp text-lg text-[#091E16] mb-2">
              {t("Information Security")}
            </h2>
            <p>
              {t("We take reasonable measures to protect your information from unauthorized access, misuse, or disclosure.")}
            </p>
          </div>

          <div>
            <h2 className="disp text-lg text-[#091E16] mb-2">
              {t("Third-Party Links")}
            </h2>
            <p>
              {t("Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those websites.")}
            </p>
          </div>

          <div>
            <h2 className="disp text-lg text-[#091E16] mb-2">
              {t("Policy Updates")}
            </h2>
            <p>
              {t("This Privacy Policy may be updated from time to time. Any changes will be published on this page.")}
            </p>
          </div>

          <p className="pt-4 border-t border-slate-100 text-xs text-slate-500">
            {t("For privacy-related questions, please contact J.F. Securities Company Pvt. Ltd. through the contact details provided on this website.")}
          </p>
        </div>
      </div>
    </main>
  );
}

export default PrivacyPolicy;
