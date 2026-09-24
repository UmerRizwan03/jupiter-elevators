"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { companyData } from "@/data/company";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Send,
  MessageCircle,
  Building2,
  CheckCircle2,
  Truck,
} from "lucide-react";

export default function ContactPage() {
  const { t, locale } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate instant form submission
    setSubmitted(true);
  };

  const whatsappUrl = `https://wa.me/${companyData.contact.whatsappNumber.replace("+", "")}?text=${encodeURIComponent(
    locale === "ar"
      ? "السلام عليكم ورحمة الله، جوبيتر للمصاعد. أود الاستفسار عن توريد قطع غيار وخدمات المصاعد."
      : "Hello Jupiter Elevators, I would like to inquire about elevator spare parts and services."
  )}`;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <main className="flex-1">
        {/* Page Hero Header */}
        <section className="bg-brand-navy text-white py-16 px-4 sm:px-8 border-b border-brand-navy-light">
          <div className="max-w-7xl mx-auto space-y-4">
            <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">
              {locale === "ar" ? "قنوات التواصل المباشرة" : "Direct Channels"}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight">
              {t.contact.title}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              {t.contact.subtitle}
            </p>
          </div>
        </section>

        {/* Contact Content Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Contact Info Cards */}
            <div className="lg:col-span-5 space-y-6">
              {/* Card 1: Registered Head Office */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-navy text-brand-gold flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">{t.contact.addressTitle}</h2>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {companyData.legalName[locale]}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-600 space-y-1 ps-1 leading-relaxed">
                  <p className="font-semibold text-slate-900">
                    {companyData.address.city[locale]}, {companyData.address.country[locale]}
                  </p>
                  <p>{companyData.address.district[locale]}</p>
                  <p>
                    {companyData.address.poBox}, Postal Code:{" "}
                    <strong className="text-slate-800">{companyData.address.postalCode}</strong>
                  </p>
                </div>

                {/* CR & VAT Badges */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-50 text-slate-700 font-mono font-semibold border border-slate-200">
                    CR: {companyData.crNumber}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-50 text-slate-700 font-mono font-semibold border border-slate-200">
                    VAT: {companyData.vatNumber}
                  </span>
                </div>
              </div>

              {/* Card 2: Phone & WhatsApp */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-navy text-brand-gold flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">{t.contact.phoneTitle}</h2>
                    <span className="text-[11px] text-slate-400">
                      {locale === "ar" ? "اتصال ومحادثة واتساب مباشرة" : "Voice calls & WhatsApp messaging"}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 pt-1">
                  <a
                    href={`tel:${companyData.contact.primaryPhone}`}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-mono font-bold transition-colors border border-slate-100"
                    dir="ltr"
                  >
                    <span>{companyData.contact.displayPhone}</span>
                    <span className="text-[11px] text-brand-navy font-sans">
                      {locale === "ar" ? "اتصال" : "Call"}
                    </span>
                  </a>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{locale === "ar" ? "محادثة فورية عبر واتساب" : "Start WhatsApp Chat"}</span>
                  </a>
                </div>
              </div>

              {/* Card 3: Business Hours & Emails */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-navy text-brand-gold flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">{t.contact.hoursTitle}</h2>
                    <span className="text-[11px] text-slate-400">
                      {companyData.businessHours.days[locale]}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-slate-600 ps-1">
                  <div className="flex items-center justify-between">
                    <span>{companyData.businessHours.days[locale]}:</span>
                    <strong className="text-slate-800">{companyData.businessHours.hours[locale]}</strong>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-100 pt-1.5 text-rose-600">
                    <span>{locale === "ar" ? "يوم الجمعة:" : "Friday:"}</span>
                    <strong>{companyData.businessHours.friday[locale]}</strong>
                  </div>
                </div>

                {/* Emails */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">{locale === "ar" ? "المبيعات:" : "Sales:"}</span>
                    <a
                      href={`mailto:${companyData.contact.emails.sales}`}
                      className="font-mono text-brand-navy hover:text-brand-gold font-bold"
                    >
                      {companyData.contact.emails.sales}
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">{locale === "ar" ? "عام:" : "General:"}</span>
                    <a
                      href={`mailto:${companyData.contact.emails.info}`}
                      className="font-mono text-brand-navy hover:text-brand-gold font-bold"
                    >
                      {companyData.contact.emails.info}
                    </a>
                  </div>
                </div>
              </div>

              {/* Regional Coverage Notice */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 space-y-1">
                <div className="flex items-center gap-2 font-bold">
                  <Truck className="w-4 h-4 text-amber-700" />
                  <span>{t.contact.coverageTitle}</span>
                </div>
                <p className="text-amber-800 text-[11px] leading-relaxed">
                  {t.contact.coverageDesc}
                </p>
              </div>
            </div>

            {/* Right: Direct Inquiry Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-6">
              <div className="space-y-1 border-b border-slate-100 pb-4">
                <h2 className="text-xl font-black text-slate-900">{t.contact.sendMessage}</h2>
                <p className="text-xs text-slate-500">
                  {locale === "ar"
                    ? "أرسل لنا استفسارك أو طلبك، وسيقوم مهندسونا بالرد عليك خلال ساعات العمل الرسمية."
                    : "Send us your technical inquiry or spare parts request; our team responds within business hours."}
                </p>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {locale === "ar" ? "تم إرسال رسالتك بنجاح!" : "Message Sent Successfully!"}
                  </h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    {locale === "ar"
                      ? "شكراً لتواصلك مع جوبيتر للمصاعد. سيقوم فريق المبيعات بالتواصل معك في أقرب وقت."
                      : "Thank you for reaching out to Jupiter Elevators. Our sales engineering team will be in touch shortly."}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                  >
                    {locale === "ar" ? "إرسال رسالة أخرى" : "Send Another Message"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">
                        {locale === "ar" ? "الاسم الكامل *" : "Full Name *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">
                        {locale === "ar" ? "اسم الشركة / المؤسسة" : "Company Name"}
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">
                        {locale === "ar" ? "رقم الجوال / الواتساب *" : "Phone / WhatsApp *"}
                      </label>
                      <input
                        type="tel"
                        required
                        dir="ltr"
                        placeholder="05XXXXXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">
                        {locale === "ar" ? "البريد الإلكتروني *" : "Email Address *"}
                      </label>
                      <input
                        type="email"
                        required
                        dir="ltr"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">
                      {locale === "ar" ? "الموضوع أو نوع الخدمة المطلوبة" : "Subject / Service Type"}
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder={locale === "ar" ? "مثال: استفسار عن سكك توجيه T89 أو ماكينة جر" : "e.g. Inquiry on Traction Machine or T89 Guide Rails"}
                      className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">
                      {locale === "ar" ? "تفاصيل الرسالة أو القطع المطلوبة *" : "Message Details *"}
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={locale === "ar" ? "اكتب تفاصيل استفسارك أو أرقام الموديلات المطلوبة..." : "Describe the elevator parts, models, or service required..."}
                      className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl bg-brand-navy hover:bg-brand-navy-light text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <Send className="w-4 h-4 text-brand-gold" />
                    <span>{locale === "ar" ? "إرسال الرسالة الآن" : "Send Inquiry Now"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
