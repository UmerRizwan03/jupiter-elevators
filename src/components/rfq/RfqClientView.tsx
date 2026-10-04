"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  Building,
  CheckCircle2,
  Printer,
  ArrowRight,
  ShieldCheck,
  Layers,
  Calculator,
} from "lucide-react";
import type { Locale, Dictionary } from "@/lib/i18n";
import { useCart } from "@/context/CartContext";
import { JupiterLogo } from "@/components/common/JupiterLogo";
import { CardTexture } from "@/components/ui/card-texture";
import { BorderBeam } from "@/components/ui/border-beam";

interface RfqClientViewProps {
  lang: Locale;
  dict: Dictionary;
}

export function RfqClientView({ lang, dict }: RfqClientViewProps) {
  const { items, updateQuantity, removeItem, clearCart, totalItemsCount } = useCart();
  const isRtl = lang === "ar";

  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("dammam");
  const [projectRef, setProjectRef] = useState("");
  const [notes, setNotes] = useState("");

  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ companyName?: string; contactPerson?: string; phone?: string }>({});
  const [emailDelivery, setEmailDelivery] = useState<"sent" | "fallback" | null>(null);

  const citiesList = [
    { id: "dammam", name: dict.cities.dammam },
    { id: "riyadh", name: dict.cities.riyadh },
    { id: "jeddah", name: dict.cities.jeddah },
    { id: "medina", name: dict.cities.medina },
    { id: "qassim", name: dict.cities.qassim },
    { id: "ahsa", name: dict.cities.ahsa },
    { id: "jubail", name: dict.cities.jubail },
    { id: "taif", name: dict.cities.taif },
    { id: "tabuk", name: dict.cities.tabuk },
    { id: "south", name: dict.cities.south },
    { id: "other", name: dict.cities.other },
  ];

  const generateReferenceCode = () => {
    const suffix = typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().slice(0, 8).toUpperCase()
      : Math.random().toString(36).slice(2, 10).toUpperCase();
    return `JP-RFQ-${new Date().getFullYear()}-${suffix}`;
  };

  const handleWhatsAppSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const website = new FormData(e.currentTarget).get("website");

    const newErrors: { companyName?: string; contactPerson?: string; phone?: string } = {};
    if (!companyName.trim()) {
      newErrors.companyName = isRtl ? "يرجى كتابة اسم الشركة أو المؤسسة" : "Company name is required";
    }
    if (!contactPerson.trim()) {
      newErrors.contactPerson = isRtl ? "يرجى كتابة اسم المسؤول أو المهندس" : "Contact person is required";
    }
    if (!phone.trim()) {
      newErrors.phone = isRtl ? "يرجى إدخال رقم الجوال" : "Phone number is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    const refCode = generateReferenceCode();

    const cityName = citiesList.find((c) => c.id === city)?.name || city;

    let message = "";
    if (isRtl) {
      message = `*طلب تسعير قطع غيار مصاعد - جوبيتر للمصاعد*\n`;
      message += `*المرجع:* ${refCode}\n\n`;
      message += `*بيانات العميل / المقاول:*\n`;
      message += `• الشركة: ${companyName}\n`;
      message += `• المسؤول: ${contactPerson}\n`;
      message += `• الجوال: ${phone}\n`;
      if (email) message += `• البريد: ${email}\n`;
      message += `• مدينة التوصيل: ${cityName}\n`;
      if (projectRef) message += `• مرجع المشروع: ${projectRef}\n`;
      if (notes) message += `• ملاحظات: ${notes}\n`;
      message += `\n*قائمة القطع المطلوبة (${totalItemsCount} قطعة):*\n`;
      items.forEach((item, index) => {
        message += `${index + 1}. [${item.part.sku}] ${item.part.name.ar} - الكمية: ${item.quantity}\n`;
      });
      message += `\nيرجى تزويدنا بعرض السعر الرسمي وموعد التوريد. شكراً لكم.`;
    } else {
      message = `*Elevator Spare Parts RFQ - Jupiter Elevators*\n`;
      message += `*Reference:* ${refCode}\n\n`;
      message += `*Client / Contractor Details:*\n`;
      message += `• Company: ${companyName}\n`;
      message += `• Contact Person: ${contactPerson}\n`;
      message += `• Phone: ${phone}\n`;
      if (email) message += `• Email: ${email}\n`;
      message += `• Delivery City: ${cityName}\n`;
      if (projectRef) message += `• Project Ref: ${projectRef}\n`;
      if (notes) message += `• Notes: ${notes}\n`;
      message += `\n*Bill of Materials (${totalItemsCount} items):*\n`;
      items.forEach((item, index) => {
        message += `${index + 1}. [${item.part.sku}] ${item.part.name.en} - Qty: ${item.quantity}\n`;
      });
      message += `\nPlease provide official commercial quotation and delivery timeframe. Thank you.`;
    }

    const whatsappWindow = window.open("about:blank", "_blank");
    let emailSent = false;
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "rfq", locale: lang, reference: refCode, company: companyName,
          contactPerson, phone, email, city: cityName, projectRef, notes, website,
          items: items.map(({ part, quantity }) => ({ sku: part.sku, name: part.name[lang], quantity })),
        }),
      });
      emailSent = response.ok;
    } catch {
      emailSent = false;
    }
    const whatsappUrl = `https://wa.me/966562614370?text=${encodeURIComponent(message)}`;
    if (whatsappWindow) whatsappWindow.location.href = whatsappUrl;
    setEmailDelivery(emailSent ? "sent" : "fallback");
    setSubmittedRef(refCode);
  };

  const handlePrint = () => {
    window.print();
  };

  // Case 1: Empty Basket
  if (items.length === 0 && !submittedRef) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center max-w-2xl mx-auto shadow-2xs my-8 relative overflow-hidden">
        <CardTexture variant="blueprint" watermark="BOM | EMPTY" />

        <div className="relative z-10 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 mx-auto">
            <Calculator className="w-8 h-8 text-[#C59341]" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            {dict.rfq.emptyTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            {dict.rfq.emptyDesc}
          </p>
          <div className="pt-4">
            <Link
              href={`/${lang}/catalog`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono font-bold text-xs shadow-xs transition-all"
            >
              <span>{dict.rfq.browseCatalog}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Case 2: Post-Submission Confirmation Screen
  if (submittedRef) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-12 max-w-3xl mx-auto shadow-2xs my-8 relative overflow-hidden">
        <CardTexture variant="process" watermark="BOM | SUCCESS" />

        <div className="relative z-10 space-y-6">
          <div className="text-center space-y-4 pb-8 border-b border-slate-200">
            <div className="flex justify-center mb-2">
              <JupiterLogo mode="stacked" size="md" />
            </div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {dict.rfq.successTitle}
            </h2>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 font-mono text-xs font-bold text-slate-900">
              <span>{dict.rfq.referenceNumber}</span>
              <span className="text-[#C59341] font-black">{submittedRef}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
              {emailDelivery === "sent"
                ? (isRtl ? "تم إرسال طلب التسعير إلى فريقنا. يمكنك أيضاً إرسال نسخة عبر واتساب." : "Your request was emailed to our team. You can also send a copy through WhatsApp.")
                : (isRtl ? "تعذر إرسال البريد الإلكتروني. أرسل مسودة الطلب المفتوحة في واتساب لإكمال طلبك." : "Email delivery is unavailable. Send the prepared WhatsApp message to complete your request.")}
            </p>
            <a href={`https://wa.me/966562614370?text=${encodeURIComponent(isRtl ? `طلب تسعير ${submittedRef}` : `RFQ ${submittedRef}`)}`} target="_blank" rel="noopener noreferrer" className="inline-block text-xs text-[#9A6B20] underline">{isRtl ? "إرسال نسخة عبر واتساب" : "Open WhatsApp message"}</a>
          </div>

          {/* Printable Summary */}
          <div className="py-4 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 font-mono block text-[10px]">{dict.rfq.companyName}</span>
                <span className="font-bold text-slate-800 mt-1 block truncate">{companyName || "N/A"}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 font-mono block text-[10px]">{dict.rfq.contactPerson}</span>
                <span className="font-bold text-slate-800 mt-1 block truncate">{contactPerson || "N/A"}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 font-mono block text-[10px]">{dict.rfq.phone}</span>
                <span className="font-bold text-slate-800 mt-1 block font-mono" dir="ltr">{phone || "N/A"}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 font-mono block text-[10px]">{dict.rfq.city}</span>
                <span className="font-bold text-slate-800 mt-1 block">
                  {citiesList.find((c) => c.id === city)?.name || city}
                </span>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-slate-100 px-4 py-2.5 text-xs font-mono font-bold text-slate-700 flex justify-between">
                <span>{dict.rfq.item}</span>
                <span>{dict.rfq.quantity}</span>
              </div>
              <div className="divide-y divide-slate-100 bg-white">
                {items.map((item) => (
                  <div key={item.part.id} className="p-4 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-mono font-bold text-slate-900 block">
                        [{item.part.sku}]
                      </span>
                      <span className="text-slate-800 font-medium mt-0.5 block">
                        {item.part.name[lang]}
                      </span>
                    </div>
                    <span className="font-mono font-black text-sm px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg">
                      {item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-mono font-bold text-slate-700 transition-colors"
            >
              <Printer className="w-4 h-4 text-[#C59341]" />
              <span>{dict.rfq.printSummary}</span>
            </button>

            <button
              onClick={() => {
                clearCart();
                setSubmittedRef(null);
                setEmailDelivery(null);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold transition-colors"
            >
              <span>{dict.rfq.startNewRfq}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Case 3: Interactive Basket & Form View
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-6 items-start">
      {/* Left Column: Itemized List */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs relative overflow-hidden group hover:border-[#C59341]/60 transition-all duration-300">
          <CardTexture variant="blueprint" watermark="BOM | SPECS" />

          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#C59341]" />
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                  {isRtl ? "القطع المحددة للتسعير" : "SELECTED BOM ITEMS"}
                </h2>
                <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  [{totalItemsCount}]
                </span>
              </div>
              <button
                type="button"
                onClick={clearCart}
                className="text-xs font-mono font-semibold text-rose-600 hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{dict.rfq.clearAll}</span>
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {items.map((item) => (
                <div
                  key={item.part.id}
                  className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                      <Layers className="w-6 h-6 text-slate-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-900 text-white">
                          {item.part.sku}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {"// "}{item.part.subcategory[lang]}
                        </span>
                      </div>
                      <Link
                        href={`/${lang}/catalog/${item.part.slug}`}
                        className="text-xs sm:text-sm font-bold text-slate-900 hover:text-[#C59341] transition-colors mt-0.5 block"
                      >
                        {item.part.name[lang]}
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                    {/* Stepper */}
                    <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50/90 h-9 px-1">
                      <button
                        type="button"
                        aria-label={isRtl ? `تقليل كمية ${item.part.name.ar}` : `Decrease quantity of ${item.part.name.en}`}
                        onClick={() => updateQuantity(item.part.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-mono font-bold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={isRtl ? `زيادة كمية ${item.part.name.ar}` : `Increase quantity of ${item.part.name.en}`}
                        onClick={() => updateQuantity(item.part.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      aria-label={isRtl ? `حذف ${item.part.name.ar}` : `Remove ${item.part.name.en}`}
                      onClick={() => removeItem(item.part.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notice Card */}
        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/90 flex items-start gap-3 text-xs text-slate-700 leading-relaxed">
          <ShieldCheck className="w-5 h-5 text-[#C59341] shrink-0 mt-0.5" />
          <span>
            {isRtl
              ? "تسعير مخصص للمقاولين وشركات الصيانة يشمل خصومات الكميات والشحن السريع لجميع مناطق المملكة."
              : "Commercial contractor pricing includes volume discounts and express delivery across all KSA regions."}
          </span>
        </div>
      </div>

      {/* Right Column: Contractor Form wrapped with BorderBeam */}
      <div className="lg:col-span-5 sticky top-24">
        <div className="relative p-[1.5px] rounded-2xl overflow-hidden shadow-2xs group">
          <BorderBeam duration={8} />

          <div className="relative bg-white rounded-2xl p-6 sm:p-8 z-10 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-[#C59341]" />
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                  {dict.rfq.contractorDetails}
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                B2B WHOLESALE
              </span>
            </div>

            <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
              <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
                <label htmlFor="rfq-website">Website</label>
                <input id="rfq-website" name="website" tabIndex={-1} autoComplete="off" />
              </div>
              {/* Company Name */}
              <div>
                <label htmlFor="rfq-company" className="block text-xs font-mono font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  {dict.rfq.companyName} *
                </label>
                <input
                  type="text"
                  id="rfq-company"
                  value={companyName}
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                    if (errors.companyName) setErrors((prev) => ({ ...prev, companyName: undefined }));
                  }}
                  placeholder={dict.rfq.companyNamePlaceholder}
                  className={`w-full h-11 px-3.5 rounded-xl border ${errors.companyName ? "border-red-500 ring-1 ring-red-500" : "border-slate-200 focus:border-[#C59341] focus:ring-[#C59341]"} text-xs sm:text-sm bg-slate-50/90 focus:bg-white focus:outline-none focus:ring-1 text-slate-900 transition-all placeholder:text-slate-400`}
                  aria-invalid={!!errors.companyName}
                />
                {errors.companyName && <p className="mt-1 text-xs text-red-600 font-medium">{errors.companyName}</p>}
              </div>

              {/* Contact Person */}
              <div>
                <label htmlFor="rfq-contact" className="block text-xs font-mono font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  {dict.rfq.contactPerson} *
                </label>
                <input
                  type="text"
                  id="rfq-contact"
                  value={contactPerson}
                  onChange={(e) => {
                    setContactPerson(e.target.value);
                    if (errors.contactPerson) setErrors((prev) => ({ ...prev, contactPerson: undefined }));
                  }}
                  placeholder={dict.rfq.contactPersonPlaceholder}
                  className={`w-full h-11 px-3.5 rounded-xl border ${errors.contactPerson ? "border-red-500 ring-1 ring-red-500" : "border-slate-200 focus:border-[#C59341] focus:ring-[#C59341]"} text-xs sm:text-sm bg-slate-50/90 focus:bg-white focus:outline-none focus:ring-1 text-slate-900 transition-all placeholder:text-slate-400`}
                  aria-invalid={!!errors.contactPerson}
                />
                {errors.contactPerson && <p className="mt-1 text-xs text-red-600 font-medium">{errors.contactPerson}</p>}
              </div>

              {/* Phone & City Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="rfq-phone" className="block text-xs font-mono font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    {dict.rfq.phone} *
                  </label>
                  <input
                    type="tel"
                    id="rfq-phone"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                    placeholder={dict.rfq.phonePlaceholder}
                    className={`w-full h-11 px-3.5 rounded-xl border ${errors.phone ? "border-red-500 ring-1 ring-red-500" : "border-slate-200 focus:border-[#C59341] focus:ring-[#C59341]"} text-xs sm:text-sm bg-slate-50/90 focus:bg-white focus:outline-none focus:ring-1 text-slate-900 font-mono transition-all placeholder:text-slate-400`}
                    dir="ltr"
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-600 font-medium">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="rfq-city" className="block text-xs font-mono font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    {dict.rfq.city} *
                  </label>
                  <select
                    id="rfq-city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50/90 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#C59341] focus:border-[#C59341] text-slate-800 cursor-pointer"
                  >
                    {citiesList.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="rfq-email" className="block text-xs font-mono font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  {dict.rfq.email}
                </label>
                <input
                  type="email"
                  id="rfq-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={dict.rfq.emailPlaceholder}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50/90 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#C59341] focus:border-[#C59341] text-slate-900 transition-all placeholder:text-slate-400"
                  dir="ltr"
                />
              </div>

              {/* Project Ref */}
              <div>
                <label htmlFor="rfq-project" className="block text-xs font-mono font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  {dict.rfq.projectRef}
                </label>
                <input
                  type="text"
                  id="rfq-project"
                  value={projectRef}
                  onChange={(e) => setProjectRef(e.target.value)}
                  placeholder={dict.rfq.projectRefPlaceholder}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50/90 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#C59341] focus:border-[#C59341] text-slate-900 transition-all placeholder:text-slate-400"
                />
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="rfq-notes" className="block text-xs font-mono font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  {dict.rfq.notes}
                </label>
                <textarea
                  id="rfq-notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={dict.rfq.notesPlaceholder}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50/90 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#C59341] focus:border-[#C59341] text-slate-900 transition-all placeholder:text-slate-400"
                />
              </div>

              {/* Submit via WhatsApp Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-transparent" />
                  <span>{dict.rfq.submitWhatsApp}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

