"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { getCartRfqWhatsAppUrl } from "@/lib/whatsapp";
import { companyData } from "@/data/company";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Send,
  MessageCircle,
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  FileText,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

export default function QuotePage() {
  const { t, locale, isRtl } = useLanguage();
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalQuantity,
  } = useCart();

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // Form State
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    phone: "",
    email: "",
    city: companyData.address.city.en,
    crNumber: "",
    projectRef: "",
    notes: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit via Web API
  const handleSubmitWeb = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.contactPerson || !formData.phone || !formData.city) {
      setErrorMessage(
        locale === "ar"
          ? "يرجى تعبئة الحقول الإلزامية (اسم الشركة، المسؤول، الجوال، المدينة)"
          : "Please complete all required fields (Company, Contact Person, Phone, City)"
      );
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          items,
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Failed to submit RFQ");
      }

      setSubmittedRef(result.referenceId);
      clearCart();
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to submit quote request. Please try WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  // Submit via WhatsApp
  const handleWhatsAppSubmit = () => {
    const waUrl = getCartRfqWhatsAppUrl(formData, items, locale);
    window.open(waUrl, "_blank");
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-10 space-y-8">
        {/* Page Title */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">
            {locale === "ar" ? "سلة طلبات الأسعار" : "Quotation Basket"}
          </span>
          <h1 className="text-2xl sm:text-4xl font-black font-serif text-slate-900 tracking-tight">
            {t.rfq.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
            {t.rfq.subtitle}
          </p>
        </div>

        {/* Success Modal / State */}
        {submittedRef ? (
          <div className="bg-white rounded-3xl border border-emerald-200 p-8 sm:p-12 text-center space-y-6 shadow-xl max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-900">{t.rfq.successTitle}</h2>
              <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                {t.rfq.successMessage}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-sm mx-auto space-y-1">
              <span className="text-xs text-slate-400 font-semibold">{t.rfq.referenceId}</span>
              <div className="font-mono text-xl font-black text-brand-navy tracking-wider">
                {submittedRef}
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/catalog"
                className="px-6 py-3 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-brand-navy font-bold text-xs transition-colors"
              >
                {t.rfq.browseCatalog}
              </Link>
              <Link
                href="/"
                className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
              >
                {t.nav.home}
              </Link>
            </div>
          </div>
        ) : items.length === 0 ? (
          /* Empty Basket State */
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <ShoppingCart className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">{t.rfq.emptyTitle}</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              {t.rfq.emptySubtitle}
            </p>
            <div className="pt-2">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-brand-navy font-bold text-xs transition-all shadow-md shadow-brand-gold/20"
              >
                <span>{t.rfq.browseCatalog}</span>
                <ArrowIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          /* Active RFQ Layout: Items Table (Left) + Contractor Details Form (Right) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Items in Quote Basket */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h2 className="text-sm font-bold text-slate-900">
                    {locale === "ar" ? "قائمة القطع المختارة" : "Selected Spare Parts"} (
                    {totalItems})
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-xs text-rose-500 hover:text-rose-700 font-semibold flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{locale === "ar" ? "مسح السلة" : "Clear All"}</span>
                  </button>
                </div>

                {/* Items list */}
                <div className="divide-y divide-slate-100">
                  {items.map((item) => (
                    <div key={item.partId} className="py-4 flex items-center justify-between gap-4">
                      {/* Thumbnail & Title */}
                      <div className="flex items-center gap-3.5 flex-1 min-w-0">
                        <div className="relative w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 p-1 shrink-0 flex items-center justify-center">
                          <Image
                            src="/brand/logo_brandmark.svg"
                            alt={item.name[locale]}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <div className="truncate">
                          <span className="text-[10px] font-mono text-slate-400 block font-semibold">
                            {item.sku}
                          </span>
                          <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                            {item.name[locale]}
                          </h3>
                          <span className="text-[11px] text-brand-gold">
                            {item.categoryName[locale]}
                          </span>
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50 shrink-0">
                        <button
                          onClick={() => updateQuantity(item.partId, item.quantity - 1)}
                          className="p-1.5 hover:bg-slate-200 text-slate-600 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-mono font-bold text-xs text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.partId, item.quantity + 1)}
                          className="p-1.5 hover:bg-slate-200 text-slate-600 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => removeFromCart(item.partId)}
                        className="p-2 text-slate-400 hover:text-rose-600 transition-colors shrink-0"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Subtotal metrics */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span>
                    {t.rfq.totalItems}: <strong className="text-slate-900">{totalItems}</strong>
                  </span>
                  <span>
                    {t.rfq.totalUnits}:{" "}
                    <strong className="text-brand-navy font-bold">{totalQuantity}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Contractor Information & Submission Form */}
            <div className="lg:col-span-5 space-y-4">
              <form
                onSubmit={handleSubmitWeb}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4"
              >
                <div className="space-y-1 border-b border-slate-100 pb-3">
                  <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-brand-gold" />
                    <span>{t.rfq.contractorDetails}</span>
                  </h2>
                  <p className="text-[11px] text-slate-400">
                    {locale === "ar"
                      ? "سنرسل عرض السعر الرسمي المعتمد لبيانات التواصل المسجلة هنا."
                      : "Official quotation will be addressed to the registered company details below."}
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Company Name */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>{t.rfq.companyName} *</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder={locale === "ar" ? "مثال: شركة المقاولات الهندسية" : "e.g. Apex Elevator Services Co."}
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                  />
                </div>

                {/* Contact Person */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>{t.rfq.contactPerson} *</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    placeholder={locale === "ar" ? "اسم المسؤول" : "e.g. Eng. Ahmed Al-Ghamdi"}
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                  />
                </div>

                {/* Mobile / WhatsApp & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{t.rfq.phone} *</span>
                    </label>
                    <input
                      type="tel"
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="05XXXXXXXX"
                      dir="ltr"
                      className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{t.rfq.email}</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="procurement@company.com"
                      dir="ltr"
                      className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    />
                  </div>
                </div>

                {/* Delivery City */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{t.rfq.city} *</span>
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                  >
                    {companyData.address.coverageCities.map((c) => (
                      <option key={c.en} value={c.en}>
                        {c[locale]}
                      </option>
                    ))}
                    <option value="Other">
                      {locale === "ar" ? "مدينة أخرى في المملكة" : "Other Saudi City"}
                    </option>
                  </select>
                </div>

                {/* CR & Project Reference */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                      <span>{t.rfq.crNumber}</span>
                    </label>
                    <input
                      type="text"
                      name="crNumber"
                      value={formData.crNumber}
                      onChange={handleInputChange}
                      placeholder="1010XXXXXX"
                      className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      <span>{t.rfq.projectRef}</span>
                    </label>
                    <input
                      type="text"
                      name="projectRef"
                      value={formData.projectRef}
                      onChange={handleInputChange}
                      placeholder={locale === "ar" ? "برج / عمارة / موديل" : "e.g. Tower B / Otis Gen2"}
                      className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    />
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    {t.rfq.notes}
                  </label>
                  <textarea
                    rows={2}
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder={locale === "ar" ? "أي متطلبات فنية أو موعد تسليم عاجل..." : "Urgent delivery timeline, freight notes..."}
                    className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                  />
                </div>

                {/* Submission Actions */}
                <div className="pt-2 space-y-2.5">
                  {/* Primary: Web RFQ Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 px-4 rounded-xl bg-brand-navy hover:bg-brand-navy-light disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <Send className="w-4 h-4 text-brand-gold" />
                    <span>{submitting ? t.rfq.submitting : t.rfq.submitRfqWeb}</span>
                  </button>

                  {/* Secondary: 1-Click WhatsApp Submit */}
                  <button
                    type="button"
                    onClick={handleWhatsAppSubmit}
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t.rfq.submitRfqWhatsApp}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
