import { useState } from "react";
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";
import { BRANCHES, SUPPORT_TEAM } from "../data/websiteData";
import { useLang } from "../i18n/useLang";

const HEAD_OFFICE = BRANCHES[0];

function Contact() {
  const { t, n } = useLang();
  const [selectedDept, setSelectedDept] = useState("all");

  const infoRows = [
    {
      icon: MapPin,
      label: t("Head office"),
      val: t(HEAD_OFFICE.address),
      href: `https://maps.google.com/?q=${encodeURIComponent(
        HEAD_OFFICE.mapQuery
      )}`,
    },
    {
      icon: Phone,
      label: t("Phone"),
      val: HEAD_OFFICE.phones.join(" · "),
      href: `tel:${HEAD_OFFICE.phones[0]}`,
    },
    {
      icon: Mail,
      label: t("Email"),
      val: "info@jfsecurities.com",
      href: "mailto:info@jfsecurities.com",
    },
    {
      icon: Clock,
      label: t("Working hours"),
      val: t("Sunday – Friday, 9:00 AM – 5:00 PM"),
    },
    {
      icon: Clock,
      label: t("Trading hours"),
      val: t("Monday – Friday, 11:00 AM – 3:00 PM"),
    },
  ];

  const filteredSupport =
    selectedDept === "all"
      ? SUPPORT_TEAM
      : SUPPORT_TEAM.filter((d) => d.title === selectedDept);

  return (
    <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-16 md:py-24">
      {/* Top Section: Get in touch + Head Office Map */}
      <div className="grid lg:grid-cols-12 gap-6 sm:gap-10 mb-10 sm:mb-20 items-start">
        {/* Left - Get in touch */}
        <div className="lg:col-span-6">
          <div className="text-xs sm:text-sm font-semibold text-[#059669] mb-1 sm:mb-2">
            {t("Contact us")}
          </div>

          <h1 className="disp text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-[#091E16] mb-2 sm:mb-4">
            {t("Get in touch")}
          </h1>

          <p className="text-xs sm:text-[15.5px] text-slate-600 leading-relaxed mb-4 sm:mb-8 max-w-lg">
            {t("We're here to help. Reach out through the channels below and our team will be happy to assist you.")}
          </p>

          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 divide-y divide-slate-100 shadow-xs">
            {infoRows.map((c, i) => {
              const Icon = c.icon;
              const inner = (
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 sm:px-5">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-[#059669] flex items-center justify-center shrink-0">
                    <Icon size={16} />
                  </div>
                  <div>
                    <div className="text-[11px] sm:text-xs text-slate-500">{c.label}</div>
                    <div className="text-xs sm:text-sm font-semibold text-[#091E16] mt-0.5">
                      {c.val}
                    </div>
                  </div>
                </div>
              );

              return c.href ? (
                <a
                  key={i}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="block hover:bg-emerald-50/40 transition-colors"
                >
                  {inner}
                </a>
              ) : (
                <div key={i}>{inner}</div>
              );
            })}
          </div>
        </div>

        {/* Right - Map */}
        <div className="lg:col-span-6">
          <div className="text-xs sm:text-sm font-semibold text-[#059669] mb-1 sm:mb-2">
            {t("Find us")}
          </div>

          <h2 className="disp text-xl sm:text-2xl md:text-3xl text-[#091E16] mb-3 sm:mb-6">
            {t("Kathmandu head office")}
          </h2>

          <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200/90 bg-white p-2 shadow-xs h-[240px] sm:h-[400px]">
            <iframe
              title={t("JF Securities Kathmandu head office map")}
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                HEAD_OFFICE.mapQuery
              )}&output=embed`}
              width="100%"
              height="100%"
              className="rounded-lg sm:rounded-xl border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      {/* Support Team Directory with Interactive Filter */}
      <div className="mb-10 sm:mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-4 sm:mb-8">
          <div>
            <div className="text-xs sm:text-sm font-semibold text-[#059669] mb-1 sm:mb-2">
              {t("Support team")}
            </div>
            <h2 className="disp text-xl sm:text-2xl md:text-3xl text-[#091E16]">
              {t("Contact by department")}
            </h2>
          </div>

          {/* Interactive Department Filter */}
          <div className="flex flex-wrap gap-1 sm:gap-1.5 bg-slate-100 p-1 sm:p-1.5 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setSelectedDept("all")}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                selectedDept === "all"
                  ? "bg-white text-[#091E16] shadow-xs"
                  : "text-slate-600 hover:text-[#091E16]"
              }`}
            >
              {t("All")}
            </button>
            {SUPPORT_TEAM.map((dept) => (
              <button
                key={dept.title}
                type="button"
                onClick={() => setSelectedDept(dept.title)}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  selectedDept === dept.title
                    ? "bg-white text-[#091E16] shadow-xs"
                    : "text-slate-600 hover:text-[#091E16]"
                }`}
              >
                {t(dept.title)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
          {filteredSupport.map((dept) => (
            <div
              key={dept.title}
              className="card-hover bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 p-4 sm:p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-bold text-sm sm:text-base text-[#091E16]">
                  {t(dept.title)}
                </h3>

                {(dept.email || dept.emails) && (
                  <div className="flex flex-col gap-0.5 sm:gap-1 mt-1 sm:mt-1.5">
                    {(dept.emails || [dept.email]).map((email) => (
                      <a
                        key={email}
                        href={`mailto:${email}`}
                        className="text-[11px] sm:text-xs font-semibold text-[#059669] hover:underline break-all"
                      >
                        {email}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-3.5 sm:mt-5 pt-2.5 sm:pt-3 border-t border-slate-100 divide-y divide-slate-100">
                {dept.people.map((p, i) => (
                  <div
                    key={p.phone}
                    className="flex items-center justify-between gap-3 py-2 text-xs sm:text-sm"
                  >
                    <span className="text-slate-600 text-xs sm:text-[13.5px]">
                      {n(i + 1)}. {t(p.name)}
                    </span>

                    <a
                      href={`tel:${p.phone}`}
                      className="font-semibold text-[#091E16] hover:text-[#059669] mono-num text-[11px] sm:text-xs whitespace-nowrap transition-colors"
                    >
                      {p.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Branches Across Nepal */}
      <div>
        <div className="text-xs sm:text-sm font-semibold text-[#059669] mb-1 sm:mb-2">
          {t("Our branches")}
        </div>

        <h2 className="disp text-xl sm:text-2xl md:text-3xl text-[#091E16] mb-4 sm:mb-8">
          {t("Visit us across Nepal")}
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-5">
          {BRANCHES.map((b) => (
            <div
              key={b.name}
              className="card-hover bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 p-4 sm:p-6 flex flex-col justify-between"
            >
              <div>
                <div className="text-[11px] sm:text-xs font-semibold text-[#059669] mb-0.5 sm:mb-1">
                  {t(b.label)}
                </div>

                <h3 className="disp text-base sm:text-xl text-[#091E16] mb-1.5 sm:mb-2">
                  {t(b.name)}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 mb-3 sm:mb-4">
                  {t(b.address)}
                </p>

                <div className="flex flex-col gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                  {b.phones.map((p) => (
                    <a
                      key={p}
                      href={`tel:${p}`}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700 hover:text-[#059669] mono-num transition-colors"
                    >
                      <Phone size={13} className="text-[#059669]" />
                      <span>{p}</span>
                    </a>
                  ))}
                </div>
              </div>

              <a
                href={
                  b.mapQuery.startsWith("http")
                    ? b.mapQuery
                    : `https://maps.google.com/?q=${encodeURIComponent(
                        b.mapQuery
                      )}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="pt-3 sm:pt-4 border-t border-slate-100 inline-flex items-center justify-between text-xs font-semibold text-[#059669] hover:text-[#047857]"
              >
                <span>{t("View on map")}</span>
                <ExternalLink size={13} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Contact;
