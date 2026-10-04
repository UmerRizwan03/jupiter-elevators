import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone, Instagram, Facebook } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { defaultLocale, getDictionary, isValidLocale, type Locale } from "@/lib/i18n";
import { getLocalizedAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const validLocale: Locale = isValidLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(validLocale);

  return {
    alternates: getLocalizedAlternates(validLocale, "/contact"),
    title: dict.nav.contact,
    description: dict.brand.address,
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const validLocale: Locale = isValidLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(validLocale);
  const isRtl = validLocale === "ar";

  return (
    <div className="min-h-screen bg-transparent py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="border-b border-slate-300 pb-8 sm:pb-10">
          <p className="mb-3 text-xs font-mono font-semibold uppercase tracking-[0.16em] text-[#9A702D]">
            {isRtl ? "جوبتر للمصاعد · الدمام" : "Jupiter Elevators · Dammam"}
          </p>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              {dict.nav.contact}
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
              {isRtl
                ? "تواصل مع فريقنا للمساعدة في قطع الغيار أو الاستفسارات الفنية والطلبات العاجلة."
                : "Talk to our team about elevator parts, technical questions, or an urgent order."}
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-12 pt-10 lg:grid-cols-12 lg:gap-16 lg:pt-12">
          <aside className="space-y-9 lg:col-span-4" aria-label={isRtl ? "طرق التواصل" : "Contact details"}>
            <section>
              <h2 className="mb-5 text-lg font-semibold text-slate-950">
                {isRtl ? "تواصل مباشرة" : "Get in touch directly"}
              </h2>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#9A702D]" aria-hidden="true" />
                  <div>
                    <p className="text-sm text-slate-500">{isRtl ? "الهاتف" : "Phone"}</p>
                    <a href={`tel:${dict.brand.phone}`} dir="ltr" className="mt-0.5 inline-block font-semibold text-slate-950 underline decoration-slate-300 underline-offset-4 hover:decoration-[#9A702D]">
                      {dict.brand.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#9A702D]" aria-hidden="true" />
                  <div>
                    <p className="text-sm text-slate-500">{isRtl ? "البريد الإلكتروني" : "Email"}</p>
                    <a href={`mailto:${dict.brand.email}`} className="mt-0.5 inline-block font-medium text-slate-950 underline decoration-slate-300 underline-offset-4 hover:decoration-[#9A702D]">
                      {dict.brand.email}
                    </a>
                  </div>
                </div>
              </div>

              <a
                href="https://wa.me/966562614370"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
              >
                <MessageCircle className="h-4 w-4 text-[#D8B36A]" aria-hidden="true" />
                {isRtl ? "تواصل عبر واتساب" : "Message us on WhatsApp"}
              </a>
            </section>

            <section className="border-t border-slate-200 pt-6">
              <h2 className="mb-4 text-sm font-semibold text-slate-950">
                {isRtl ? "زيارة أو الاتصال بنا" : "Visit or call"}
              </h2>
              <div className="space-y-4 text-sm leading-relaxed text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                  <p>{dict.brand.address}</p>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                  <p>
                    {dict.brand.hours}
                    <span className="mt-1 block text-xs text-slate-500">
                      {isRtl ? "الجمعة: مغلق · للحالات العاجلة، راسلنا عبر واتساب." : "Friday: closed · For urgent issues, message us on WhatsApp."}
                    </span>
                  </p>
                </div>
              </div>
            </section>

            <section className="border-t border-slate-200 pt-6">
              <h2 className="mb-3 text-sm font-semibold text-slate-950">
                {isRtl ? "تابعنا على منصات التواصل" : "Follow Our Channels"}
              </h2>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/jupiterelevators?stkn=dGh2eTBvNmxwNnps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
                >
                  <Instagram className="h-4 w-4 text-[#C59341]" aria-hidden="true" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://www.facebook.com/share/1Q6pwuLyj8/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
                >
                  <Facebook className="h-4 w-4 text-[#C59341]" aria-hidden="true" />
                  <span>Facebook</span>
                </a>
              </div>
            </section>

            <section className="border-t border-slate-200 pt-6">
              <h2 className="mb-2 text-sm font-semibold text-slate-950">
                {isRtl ? "التوصيل في المملكة" : "Delivery across Saudi Arabia"}
              </h2>
              <p className="text-sm leading-relaxed text-slate-600">
                {isRtl
                  ? "التوصيل المحلي من الدمام، مع شحن يومي إلى الرياض وجدة ومناطق المملكة الأخرى. أرسل موقعك وموعدك المطلوب لنتحقق من التوفر."
                  : "Local dispatch from Dammam, with daily shipping to Riyadh, Jeddah, and other regions. Send us your location and required date to confirm availability."}
              </p>
            </section>
          </aside>

          <section className="border-t border-slate-300 pt-7 lg:col-span-8 lg:border-t-0 lg:border-s lg:pt-0 lg:ps-12">
            <div className="mb-6">
              <h2 className="text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
                {isRtl ? "أرسل استفسارك" : "Send an inquiry"}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {isRtl
                  ? "أخبرنا بالقطعة أو المساعدة التي تحتاجها. ستُفتح رسالتك في واتساب لتتمكن من مراجعتها وإرسالها."
                  : "Tell us what part or support you need. Your message will open in WhatsApp so you can review and send it."}
              </p>
            </div>
            <ContactForm lang={validLocale} dict={dict} />
          </section>
        </div>
      </div>
    </div>
  );
}
