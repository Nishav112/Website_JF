import { ShieldCheck, Target, Compass } from "lucide-react";
import { useLang } from "../i18n/useLang";

function AboutPage() {
  const { t } = useLang();

  return (
    <main>
      {/* Company Overview */}
      <section
        id="company-overview"
        className="max-w-[1120px] mx-auto px-5 sm:px-6 pt-16 pb-16 md:pt-24 md:pb-20"
      >
        <div className="text-xs sm:text-sm font-semibold text-[#059669] mb-2">
          {t("Who We Are")}
        </div>

        <h1 className="disp text-3xl sm:text-4xl md:text-5xl text-[#091E16] max-w-2xl mb-8">
          {t("Company Overview")}
        </h1>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8 space-y-5 text-base sm:text-[16.5px] leading-relaxed text-slate-600">
            <p>
              {t("J.F. Securities Company Limited is a Nepal-based stock brokerage company providing securities trading and related capital-market services. We are committed to delivering reliable, transparent, and accessible services that enable our clients to participate confidently in Nepal's capital market.")}
            </p>

            <p>
              {t("With a focus on professional service, technology, and responsible market practices, we strive to make the investment and trading experience more convenient and accessible for our clients.")}
            </p>
          </div>

          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#059669]">
              <ShieldCheck size={16} />
              <span>Regulatory Credentials</span>
            </div>
            <div className="divide-y divide-slate-100 text-xs sm:text-sm">
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500">NEPSE Broker</span>
                <span className="font-bold text-[#091E16] mono-num">Member #07</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500">SEBON License</span>
                <span className="font-bold text-[#091E16] mono-num">No. 20</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500">CDSCL DP ID</span>
                <span className="font-bold text-[#091E16] mono-num">13023300</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-white border-y border-slate-200/80 py-16 md:py-24">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-6 grid md:grid-cols-2 gap-8">
          {/* Vision */}
          <div
            id="vision"
            className="card-hover bg-[#F9FBF9] rounded-2xl border border-slate-200/90 p-7 sm:p-8"
          >
            <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 text-[#059669] flex items-center justify-center mb-5">
              <Compass size={21} />
            </div>

            <div className="text-xs font-semibold text-[#059669] mb-1.5">
              {t("Our Direction")}
            </div>

            <h2 className="disp text-2xl sm:text-3xl text-[#091E16] mb-4">
              {t("Vision")}
            </h2>

            <p className="text-sm sm:text-[15.5px] leading-relaxed text-slate-600">
              {t("To be a trusted and technology-driven securities service provider, making Nepal's capital market more accessible, transparent, and convenient.")}
            </p>
          </div>

          {/* Mission */}
          <div
            id="mission"
            className="card-hover bg-[#F9FBF9] rounded-2xl border border-slate-200/90 p-7 sm:p-8"
          >
            <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 text-[#059669] flex items-center justify-center mb-5">
              <Target size={21} />
            </div>

            <div className="text-xs font-semibold text-[#059669] mb-1.5">
              {t("Our Purpose")}
            </div>

            <h2 className="disp text-2xl sm:text-3xl text-[#091E16] mb-4">
              {t("Mission")}
            </h2>

            <p className="text-sm sm:text-[15.5px] leading-relaxed text-slate-600">
              {t("To deliver reliable and efficient securities services through technology, professional expertise, regulatory compliance, and client-focused support.")}
            </p>
          </div>
        </div>
      </section>

      {/* Chairman's Message */}
      <section
        id="chairman-message"
        className="max-w-[1120px] mx-auto px-5 sm:px-6 py-16 md:py-24"
      >
        <div className="text-xs sm:text-sm font-semibold text-[#059669] mb-2">
          {t("Leadership")}
        </div>

        <h2 className="disp text-2xl sm:text-3xl md:text-4xl text-[#091E16] mb-8">
          {t("Chairman's Message")}
        </h2>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-10 shadow-xs space-y-5">
          <p className="disp text-lg sm:text-xl leading-relaxed text-[#091E16] border-l-4 border-[#059669] pl-4">
            {t("At J.F. Securities, we believe that trust, transparency, and responsible service are the foundation of a strong relationship with our clients.")}
          </p>

          <div className="space-y-4 text-sm sm:text-[15.5px] leading-relaxed text-slate-600">
            <p>
              {t("Nepal's capital market continues to evolve, creating new opportunities for investors and for the development of our financial ecosystem. As a securities service provider, we are committed to supporting our clients with reliable services, professional expertise, and technology-driven solutions.")}
            </p>

            <p>
              {t("Our focus is to make participation in the capital market more accessible, transparent, and convenient while maintaining a strong commitment to regulatory compliance and responsible business practices.")}
            </p>

            <p>
              {t("We sincerely value the trust placed in J.F. Securities by our clients, partners, and stakeholders. With their continued support, we look forward to strengthening our services and contributing to the sustainable growth of Nepal's capital market.")}
            </p>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <div className="font-bold text-[#091E16] text-base">
              {t("Chairman")}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {t("J.F. Securities Company Pvt. Ltd.")}
            </div>
          </div>
        </div>
      </section>

      {/* Closing Banner */}
      <section className="max-w-[1120px] mx-auto px-5 sm:px-6 pb-20">
        <div className="rounded-2xl bg-[#091E16] text-white p-8 sm:p-12 text-center">
          <h2 className="disp text-2xl sm:text-3xl md:text-4xl max-w-2xl mx-auto">
            {t("Your trusted connection to Nepal's capital market.")}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            {t("We remain committed to providing reliable and accessible securities services to our clients.")}
          </p>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;
