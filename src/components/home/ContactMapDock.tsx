"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { companyData } from "@/data/company";
import { getEmergencyWhatsAppUrl } from "@/lib/whatsapp";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

export function ContactMapDock() {
  const { locale, isRtl } = useLanguage();
  const whatsappUrl = getEmergencyWhatsAppUrl(locale);

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [partOrModel, setPartOrModel] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contact) return;
    
    // Format inquiry for WhatsApp
    const text = locale === "ar"
      ? `طلب استفسار وتسعير قطع مصاعد:\n- الاسم: ${name}\n- جهة الاتصال: ${contact}\n- القطعة أو الموديل: ${partOrModel || "غير محدد"}\n(عبر موقع جوبيتر للمصاعد)`
      : `Elevator Parts Inquiry:\n- Name: ${name}\n- Contact: ${contact}\n- Part / Lift Model: ${partOrModel || "Not specified"}\n(Via Jupiter Elevators)`;
    
    const url = `https://wa.me/${companyData.contact.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(text)}`;
    setSubmitted(true);
    setTimeout(() => {
      window.open(url, "_blank");
    }, 400);
  };

  return (
    <section className="py-20 px-4 sm:px-8 bg-[#F8FAFC] text-slate-900 border-b border-slate-200 relative overflow-hidden">
      
      {/* ─────────────────────────────────────────────────────────────
          1. GEOGRAPHIC COORDINATES STAMP (Slide 7 & 8 inspiration)
      ───────────────────────────────────────────────────────────── */}
      <div className="max-w-[1440px] mx-auto pb-8 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-brand-gold uppercase tracking-widest block">
            {locale === "ar" ? "المقر والمستودعات المركزية" : "HEADQUARTERS & DISTRIBUTION LOGISTICS"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight font-sans mt-1">
            {locale === "ar" ? "هل لديك أي استفسار أو طلب تسعير؟" : "DO YOU HAVE ANY QUESTIONS?"}
          </h2>
        </div>

        {/* Geographic Coordinates Stamp */}
        <div className="font-mono text-xs sm:text-sm text-slate-700 bg-white px-4 py-2 rounded-xl border border-slate-200/90 shadow-sm flex items-center gap-2 shrink-0">
          <MapPin className="w-4 h-4 text-brand-gold" />
          <span className="font-bold tracking-wider">26.4207° N, 50.0888° E</span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-500">{locale === "ar" ? "الدمام، السعودية" : "Dammam, KSA"}</span>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* ─────────────────────────────────────────────────────────────
              LEFT: ARCHITECTURAL CONTACT CARD & CHANNELS (Slide 7)
          ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-6 bg-slate-950 text-white rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-xl relative overflow-hidden">
            {/* Subtle Architectural Blueprint Grid */}
            <div className="absolute inset-0 bg-blueprint-grid opacity-10 pointer-events-none" />
            <div className="absolute -end-20 -bottom-20 w-80 h-80 rounded-full bg-brand-gold/10 blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-brand-gold uppercase tracking-widest">
                  {locale === "ar" ? "تواصل مباشر" : "DIRECT COMM CHANNELS"}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight font-sans">
                  {locale === "ar" ? "فريق الدعم الفني والمبيعات" : "Technical Sales & Dispatch Hub"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md font-sans">
                  {locale === "ar"
                    ? "يسعدنا الرد على استفساراتكم الفنية وتقديم عروض أسعار تجارية معتمدة لمشاريع المصاعد وعقود الصيانة."
                    : "Reach our elevator engineering desk directly for urgent breakdown spares, component cross-referencing, or formal trade quotations."}
                </p>
              </div>

              {/* Direct Communication Channels Toggle Strip (Slide 7 exact buttons) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                
                {/* Channel 1: WhatsApp */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-900 hover:bg-emerald-950/60 p-3.5 rounded-xl border border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between group"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400 group-hover:text-emerald-400">
                    <span className="font-mono font-bold">WHATSAPP</span>
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-xs font-bold text-white mt-3 font-mono">
                    {companyData.contact.whatsappNumber}
                  </span>
                </a>

                {/* Channel 2: Phone */}
                <a
                  href={`tel:${companyData.contact.primaryPhone}`}
                  className="bg-slate-900 hover:bg-slate-800 p-3.5 rounded-xl border border-slate-800 hover:border-brand-gold/50 transition-all flex flex-col justify-between group"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400 group-hover:text-brand-gold">
                    <span className="font-mono font-bold">PHONE</span>
                    <Phone className="w-4 h-4 text-brand-gold" />
                  </div>
                  <span className="text-xs font-bold text-white mt-3 font-mono" dir="ltr">
                    {companyData.contact.displayPhone}
                  </span>
                </a>

                {/* Channel 3: Email */}
                <a
                  href={`mailto:${companyData.contact.emails.sales}`}
                  className="bg-slate-900 hover:bg-slate-800 p-3.5 rounded-xl border border-slate-800 hover:border-blue-500/50 transition-all flex flex-col justify-between group"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400 group-hover:text-blue-400">
                    <span className="font-mono font-bold">EMAIL</span>
                    <Mail className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-[11px] font-bold text-white mt-3 font-mono truncate">
                    {companyData.contact.emails.sales}
                  </span>
                </a>

              </div>

              {/* Working Hours & Registered Entity */}
              <div className="pt-4 border-t border-slate-800 space-y-2 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-gold" />
                  <span>
                    {companyData.businessHours.hours[locale]} ({companyData.businessHours.days[locale]})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>CR: {companyData.crNumber} · VAT: {companyData.vatNumber}</span>
                </div>
              </div>

            </div>

            {/* Bottom Entity Footer */}
            <div className="mt-8 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 font-sans">
              {companyData.legalName[locale]} · {companyData.address.city[locale]}, {companyData.address.country[locale]}
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              RIGHT: QUICK RFQ INQUIRY FORM (Slide 8 exact inputs)
          ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  {locale === "ar" ? "إرسال طلب تسعير فوري" : "FAST TRACK INQUIRY"}
                </span>
                <h3 className="text-2xl font-black text-slate-950 font-sans">
                  {locale === "ar" ? "طلب تسعير أو استفسار عن قطعة" : "Request a Component Quote"}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  {locale === "ar"
                    ? "أدخل بياناتك وسيتم توجيه طلبك فوراً للمهندس المختص للتسعير والرد خلال 45 دقيقة."
                    : "Fill out the fields below and our technical desk will prepare your trade quotation within 45 minutes."}
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                  <div className="text-sm font-bold text-emerald-900 font-sans">
                    {locale === "ar" ? "تم توجيه طلبك بنجاح!" : "Inquiry Prepared Successfully!"}
                  </div>
                  <p className="text-xs text-emerald-700">
                    {locale === "ar"
                      ? "جاري فتح محادثة واتساب المباشرة مع الفريق الهندسي..."
                      : "Opening direct WhatsApp chat with our technical sales engineers..."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Field 1: Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold uppercase text-slate-700 tracking-wider">
                      {locale === "ar" ? "الاسم / اسم الشركة" : "NAME / COMPANY"}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={locale === "ar" ? "مثال: م. فهد الشمري - شركة مصاعد..." : "e.g. Eng. Tariq Al-Ghamdi"}
                      className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-900 text-xs sm:text-sm font-medium rounded-xl border border-slate-200 focus:border-brand-gold focus:outline-none p-3.5 transition-all"
                    />
                  </div>

                  {/* Field 2: Contact Phone / WhatsApp */}
                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold uppercase text-slate-700 tracking-wider">
                      {locale === "ar" ? "رقم الجوال أو واتساب" : "PHONE OR WHATSAPP"}
                    </label>
                    <input
                      type="text"
                      required
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="+966 5X XXX XXXX"
                      dir="ltr"
                      className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-900 text-xs sm:text-sm font-medium rounded-xl border border-slate-200 focus:border-brand-gold focus:outline-none p-3.5 transition-all"
                    />
                  </div>

                  {/* Field 3: Part or Model */}
                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold uppercase text-slate-700 tracking-wider">
                      {locale === "ar" ? "رقم القطعة أو موديل المصعد" : "PART NUMBER OR ELEVATOR MODEL"}
                    </label>
                    <input
                      type="text"
                      value={partOrModel}
                      onChange={(e) => setPartOrModel(e.target.value)}
                      placeholder={locale === "ar" ? "مثال: لوحة NICE3000 أو مشغل درف فيرماتور..." : "e.g. NICE 3000+, Fermator VVVF Door..."}
                      className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-900 text-xs sm:text-sm font-medium rounded-xl border border-slate-200 focus:border-brand-gold focus:outline-none p-3.5 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm font-mono uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 group mt-2"
                  >
                    <span>{locale === "ar" ? "إرسال طلب التسعير عبر واتساب" : "DISPATCH INQUIRY VIA WHATSAPP"}</span>
                    <Send className="w-4 h-4 text-brand-gold group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>{locale === "ar" ? "أمان البيانات والسرية مضمونة" : "Privacy & Compliance Guaranteed"}</span>
              <Link href="/quote" className="text-brand-gold font-bold hover:underline">
                {locale === "ar" ? "أو استخدم سلة الـ RFQ الرسمية" : "Or use Multi-Item RFQ Cart →"}
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
