import { useEffect } from "react";
import {
  Camera,
  IdCard,
  FileText,
  Plane,
  MapPin,
  Fingerprint,
  PenLine,
  Video,
  Phone,
  Mail,
  X,
  ArrowRight,
  Info,
} from "lucide-react";
import { useLang } from "../i18n/useLang";

// To change / add / remove a document, edit this list only.
const DOCUMENTS = [
  {
    icon: Camera,
    title: "PP Size Photo",
    desc: "Recently taken passport size photo with both ears clearly visible.",
  },
  {
    icon: IdCard,
    title: "Citizenship (Front & Back)",
    desc: "Clear photo of the front and back of your citizenship certificate.",
  },
  {
    icon: FileText,
    title: "National ID Card",
    desc: "Clear photo of your National ID Card (if you have one).",
  },
  {
    icon: Plane,
    title: "Passport & Visa",
    desc: "For foreign employees or students, passport and visa copy.",
  },
  {
    icon: MapPin,
    title: "Recent Location Map",
    desc: "Location map screenshot showing a nearby landmark of your current residence.",
  },
  {
    icon: Fingerprint,
    title: "Thumbprint",
    desc: "Left and right thumbprints on plain paper. Previously used prints are not accepted.",
  },
  {
    icon: PenLine,
    title: "Signature on Plain Paper",
    desc: "Your signature on plain white paper using a black or blue pen.",
  },
  {
    icon: Video,
    title: "Video Verification",
    desc: "Be ready to complete a short video verification at a convenient time.",
  },
];

export default function DocumentsChecklistModal({ open, onClose, continueHref }) {
  const { t } = useLang();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-[#091E16]/60 backdrop-blur-sm p-0 sm:p-6"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="docs-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-4xl max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-[#F9FBF9] shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t("Close")}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-[#091E16] hover:border-[#059669]"
        >
          <X size={18} />
        </button>

        <div className="p-4 sm:p-8">
          <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-3 mb-5 pr-12">
            <Info size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
              {t("The client needs to be ready with these documents beforehand.")}
            </p>
          </div>

          <div className="text-center mb-5 sm:mb-7">
            <h2
              id="docs-modal-title"
              className="disp text-xl sm:text-3xl text-[#059669]"
            >
              {t("Demat Account Opening Process")}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
              {t("Please keep the following documents ready before you continue.")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {DOCUMENTS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex items-center gap-3 bg-white rounded-xl border border-slate-200/90 border-l-4 border-l-[#059669] p-3.5 sm:p-4 shadow-sm"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm sm:text-[15px] text-[#091E16]">
                    {t(title)}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mt-1">
                    {t(desc)}
                  </p>
                </div>
                <div className="shrink-0 h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-[#ECF5EE] flex items-center justify-center">
                  <Icon size={24} className="text-[#059669]" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 sm:mt-7 rounded-2xl bg-gradient-to-r from-[#047857] to-[#059669] text-white text-center px-4 py-5">
            <div className="font-semibold text-sm sm:text-base mb-2">
              {t("Verification & Support")}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 text-xs sm:text-sm">
              <a href="tel:01-5356099" className="inline-flex items-center gap-1.5 hover:underline">
                <Phone size={14} /> 01-5356099
              </a>
              <a
                href="mailto:info@jfsecurities.com"
                className="inline-flex items-center gap-1.5 hover:underline"
              >
                <Mail size={14} /> info@jfsecurities.com
              </a>
            </div>
          </div>

          <div className="mt-5 sm:mt-6 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn-smooth px-5 py-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 text-slate-700 font-semibold text-sm"
            >
              {t("Cancel")}
            </button>
            <a
              href={continueHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="btn-smooth inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-semibold text-sm shadow-sm"
            >
              <span>{t("I'm ready, continue")}</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}