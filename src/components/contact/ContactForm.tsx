"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import type { Locale, Dictionary } from "@/lib/i18n";

interface ContactFormProps {
  lang: Locale;
  dict: Dictionary;
}

export function ContactForm({ lang }: ContactFormProps) {
  const isRtl = lang === "ar";
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState<"sales" | "info" | "tech" | "executive">("sales");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; message?: string }>({});
  const [deliveryStatus, setDeliveryStatus] = useState<"sent" | "fallback" | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const website = new FormData(e.currentTarget).get("website");

    const newErrors: { name?: string; phone?: string; message?: string } = {};
    if (!name.trim()) {
      newErrors.name = isRtl ? "يرجى كتابة الاسم الكريم" : "Name is required";
    }
    if (!phone.trim()) {
      newErrors.phone = isRtl ? "يرجى إدخال رقم الجوال للتواصل" : "Phone number is required";
    }
    if (!message.trim()) {
      newErrors.message = isRtl ? "يرجى كتابة نص الرسالة أو الاستفسار" : "Message cannot be empty";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    const departmentLabels = {
      sales: isRtl ? "المبيعات وتوريد القطع" : "Sales & Parts Desk",
      info: isRtl ? "استفسارات عامة ومعلومات" : "General & Corporate Info",
      tech: isRtl ? "الدعم الفني والاستشارات" : "Technical Support & Engineering",
      executive: isRtl ? "تصعيد للإدارة التنفيذية" : "Executive Escalation (Direct Management)",
    };

    const resolvedSubject = department === "executive"
      ? `Executive Escalation: ${subject.trim() || "Critical Inquiry"}`
      : department === "info"
      ? `General Inquiry: ${subject.trim() || "Corporate Information"}`
      : (subject.trim() || departmentLabels[department]);

    const formattedMessage = isRtl
      ? `*رسالة جديدة عبر الموقع - جوبيتر للمصاعد*\n• القسم: ${departmentLabels[department]}\n• الاسم: ${name}\n• الشركة: ${company || "غير محدد"}\n• الجوال: ${phone}\n• الموضوع: ${resolvedSubject}\n• الرسالة: ${message}`
      : `*New Website Inquiry - Jupiter Elevators*\n• Department: ${departmentLabels[department]}\n• Name: ${name}\n• Company: ${company || "N/A"}\n• Phone: ${phone}\n• Subject: ${resolvedSubject}\n• Message: ${message}`;

    const whatsappWindow = window.open("about:blank", "_blank");
    let emailSent = false;
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "contact", locale: lang, name, company, phone, subject: resolvedSubject, message, website }),
      });
      emailSent = response.ok;
    } catch {
      emailSent = false;
    }
    const whatsappUrl = `https://wa.me/966562614370?text=${encodeURIComponent(formattedMessage)}`;
    if (whatsappWindow) whatsappWindow.location.href = whatsappUrl;
    else setDeliveryStatus(emailSent ? "sent" : "fallback");
    setDeliveryStatus(emailSent ? "sent" : "fallback");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div role="status" className="border-y border-slate-200 py-8 text-center space-y-3">
        <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
        <h3 className="text-lg font-semibold text-slate-900">
          {deliveryStatus === "sent"
            ? isRtl ? "تم إرسال الاستفسار عبر البريد" : "Your inquiry was sent by email"
            : isRtl ? "الاستفسار غير جاهز للإرسال عبر البريد" : "Email delivery is unavailable"}
        </h3>
        <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
          {isRtl
            ? deliveryStatus === "sent" ? "تم إرسال الاستفسار إلى فريقنا. يمكنك أيضاً إرسال نسخة عبر واتساب." : "أرسل الرسالة من واتساب لإكمال استفسارك."
            : deliveryStatus === "sent" ? "Your inquiry reached our team. You can also send a copy through WhatsApp." : "Email is not configured right now. Send the prepared message in WhatsApp to complete your inquiry."}
        </p>
        <a href={`https://wa.me/966562614370?text=${encodeURIComponent(isRtl ? `رسالة جديدة - ${name} - ${phone} - ${message}` : `New inquiry - ${name} - ${phone} - ${message}`)}`} target="_blank" rel="noopener noreferrer" className="inline-block underline text-sm">{isRtl ? "إرسال نسخة عبر واتساب" : "Send a copy through WhatsApp"}</a>
        <button
          onClick={() => {
            setSubmitted(false);
            setName("");
            setCompany("");
            setPhone("");
            setSubject("");
            setMessage("");
            setDeliveryStatus(null);
          }}
          className="mt-4 px-5 py-2.5 bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
        >
          {isRtl ? "إرسال رسالة أخرى" : "SEND ANOTHER INQUIRY"}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-slate-800 mb-1.5">
            {isRtl ? "الاسم الكريم *" : "Your Name *"}
          </label>
          <input
            type="text"
            id="contact-name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            placeholder={isRtl ? "م. أحمد الغامدي" : "Eng. Ahmed Al-Ghamdi"}
            className={`w-full h-11 px-3.5 rounded-md border ${errors.name ? "border-red-500 ring-1 ring-red-500" : "border-slate-300 focus:border-[#C59341] focus:ring-[#C59341]"} text-sm bg-white focus:outline-none focus:ring-1 text-slate-900 transition-colors placeholder:text-slate-400`}
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className="mt-1 text-xs text-red-600 font-medium">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="contact-company" className="block text-sm font-medium text-slate-800 mb-1.5">
            {isRtl ? "الشركة / المؤسسة" : "Company / Firm"}
          </label>
          <input
            type="text"
            id="contact-company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder={isRtl ? "شركة مصاعد الخليج" : "Gulf Elevators Co."}
            className="w-full h-11 px-3.5 rounded-md border border-slate-300 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#C59341] focus:border-[#C59341] text-slate-900 transition-colors placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-phone" className="block text-sm font-medium text-slate-800 mb-1.5">
            {isRtl ? "رقم الجوال / واتساب *" : "Phone / WhatsApp *"}
          </label>
          <input
            type="tel"
            id="contact-phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
            }}
            placeholder="05xxxxxxxx"
            className={`w-full h-11 px-3.5 rounded-md border ${errors.phone ? "border-red-500 ring-1 ring-red-500" : "border-slate-300 focus:border-[#C59341] focus:ring-[#C59341]"} text-sm bg-white focus:outline-none focus:ring-1 text-slate-900 font-mono transition-colors placeholder:text-slate-400`}
            dir="ltr"
            aria-invalid={!!errors.phone}
          />
          {errors.phone && <p className="mt-1 text-xs text-red-600 font-medium">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="contact-department" className="block text-sm font-medium text-slate-800 mb-1.5">
            {isRtl ? "القسم المعني بالاستفسار" : "Direct To Department"}
          </label>
          <select
            id="contact-department"
            value={department}
            onChange={(e) => setDepartment(e.target.value as "sales" | "info" | "tech" | "executive")}
            className="w-full h-11 px-3 rounded-md border border-slate-300 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#C59341] focus:border-[#C59341] text-slate-900 transition-colors"
          >
            <option value="sales">{isRtl ? "المبيعات وتوريد قطع الغيار (sales@)" : "Sales & Parts Procurement (sales@)"}</option>
            <option value="info">{isRtl ? "استفسارات عامة ومعلومات تجارية (info@)" : "General Information & Corporate (info@)"}</option>
            <option value="tech">{isRtl ? "الدعم الفني والاستشارات الهندسية" : "Technical Support & Engineering"}</option>
            <option value="executive">{isRtl ? "⚡ تصعيد للإدارة التنفيذية (طوارئ ومناقصات)" : "⚡ Executive Escalation (Direct Management)"}</option>
          </select>
        </div>
      </div>

      {department === "executive" && (
        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs text-amber-900 flex items-start gap-2">
          <span className="font-bold shrink-0">{isRtl ? "ملاحظة:" : "Notice:"}</span>
          <span>
            {isRtl
              ? "يتم توجيه هذا الطلب بشكل مشفر ومباشر إلى إدارة الشركة وحالات الطوارئ والمناقصات الكبرى."
              : "This inquiry routes directly to the Managing Director for critical operational emergencies, major tenders, and strategic matters."}
          </span>
        </div>
      )}

      <div>
        <label htmlFor="contact-subject" className="block text-sm font-medium text-slate-800 mb-1.5">
          {isRtl ? "الموضوع أو فئة القطعة" : "Subject / Category"}
        </label>
        <input
          type="text"
          id="contact-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder={isRtl ? "استفسار عن لوحات تحكم، محركات، أبواب..." : "Inquiry about Control Boards, Motors, Doors..."}
          className="w-full h-11 px-3.5 rounded-md border border-slate-300 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#C59341] focus:border-[#C59341] text-slate-900 transition-colors placeholder:text-slate-400"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-slate-800 mb-1.5">
          {isRtl ? "الرسالة أو متطلبات القطعة *" : "Message / Part Requirements *"}
        </label>
        <textarea
          rows={3}
          id="contact-message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
          }}
          placeholder={
            isRtl
              ? "اكتب تفاصيل طلبك، رقم القطعة، أو أي مواصفات فنية مطلوبة..."
              : "Detail your inquiry, part numbers, or specific technical requirements..."
          }
          className={`w-full p-3 rounded-md border ${errors.message ? "border-red-500 ring-1 ring-red-500" : "border-slate-300 focus:border-[#C59341] focus:ring-[#C59341]"} text-sm bg-white focus:outline-none focus:ring-1 text-slate-900 transition-colors placeholder:text-slate-400`}
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="mt-1 text-xs text-red-600 font-medium">{errors.message}</p>}
      </div>

      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        className="w-full h-12 bg-slate-950 hover:bg-slate-800 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
      >
        <Send className="w-4 h-4 text-[#C59341]" />
        <span>{isRtl ? "إرسال الاستفسار الفني" : "Continue to WhatsApp"}</span>
      </button>
    </form>
  );
}

