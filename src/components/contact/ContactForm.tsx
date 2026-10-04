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
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [deliveryStatus, setDeliveryStatus] = useState<"sent" | "fallback" | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const website = new FormData(e.currentTarget).get("website");

    if (!name.trim() || !phone.trim() || !message.trim()) {
      alert(
        isRtl
          ? "يرجى تعبئة الاسم، رقم الجوال، والرسالة."
          : "Please enter your name, phone number, and message."
      );
      return;
    }

    const formattedMessage = isRtl
      ? `*رسالة جديدة عبر الموقع - جوبيتر للمصاعد*\n• الاسم: ${name}\n• الشركة: ${company || "غير محدد"}\n• الجوال: ${phone}\n• الموضوع: ${subject || "استفسار عام"}\n• الرسالة: ${message}`
      : `*New Website Inquiry - Jupiter Elevators*\n• Name: ${name}\n• Company: ${company || "N/A"}\n• Phone: ${phone}\n• Subject: ${subject || "General Inquiry"}\n• Message: ${message}`;

    const whatsappWindow = window.open("about:blank", "_blank");
    let emailSent = false;
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "contact", locale: lang, name, company, phone, subject, message, website }),
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
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={isRtl ? "م. أحمد الغامدي" : "Eng. Ahmed Al-Ghamdi"}
            className="w-full h-11 px-3.5 rounded-md border border-slate-300 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#C59341] focus:border-[#C59341] text-slate-900 transition-colors placeholder:text-slate-400"
          />
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
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="05xxxxxxxx"
            className="w-full h-11 px-3.5 rounded-md border border-slate-300 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#C59341] focus:border-[#C59341] text-slate-900 font-mono transition-colors placeholder:text-slate-400"
            dir="ltr"
          />
        </div>

        <div>
          <label htmlFor="contact-subject" className="block text-sm font-medium text-slate-800 mb-1.5">
            {isRtl ? "الموضوع أو فئة القطعة" : "Subject / Category"}
          </label>
          <input
            type="text"
            id="contact-subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder={isRtl ? "استفسار عن لوحات تحكم" : "Inquiry about Control Boards"}
            className="w-full h-11 px-3.5 rounded-md border border-slate-300 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#C59341] focus:border-[#C59341] text-slate-900 transition-colors placeholder:text-slate-400"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-slate-800 mb-1.5">
          {isRtl ? "الرسالة أو متطلبات القطعة *" : "Message / Part Requirements *"}
        </label>
        <textarea
          rows={3}
          id="contact-message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            isRtl
              ? "اكتب تفاصيل طلبك، رقم القطعة، أو أي مواصفات فنية مطلوبة..."
              : "Detail your inquiry, part numbers, or specific technical requirements..."
          }
          className="w-full p-3 rounded-md border border-slate-300 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#C59341] focus:border-[#C59341] text-slate-900 transition-colors placeholder:text-slate-400"
        />
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

