import { companyData } from "@/data/company";
import { ElevatorPart, RFQItem, RFQSubmission, SupportedLocale } from "@/types/catalog";

const WHATSAPP_NUMBER = companyData.contact.whatsappNumber.replace("+", "");

export function getProductWhatsAppUrl(part: ElevatorPart, locale: SupportedLocale): string {
  const partName = locale === "ar" ? part.name.ar : part.name.en;
  const message =
    locale === "ar"
      ? `السلام عليكم ورحمة الله، جوبيتر للمصاعد.\nأود الاستفسار عن توفر وسعر قطعة الغيار:\n- *القطعة:* ${partName}\n- *كود الصنف (SKU):* ${part.sku}\n- *الماركات:* ${part.compatibleBrands.join(", ")}\nيرجى تزويدي بعرض السعر وموعد التوريد.`
      : `Hello Jupiter Elevators,\nI would like to inquire about availability and pricing for:\n- *Part:* ${partName}\n- *SKU:* ${part.sku}\n- *Compatible Brands:* ${part.compatibleBrands.join(", ")}\nPlease provide a quote and delivery timeline.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getPhotoIdWhatsAppUrl(locale: SupportedLocale): string {
  const message =
    locale === "ar"
      ? `السلام عليكم، جوبيتر للمصاعد.\nلدي قطعة مصعد بحاجة لتحديد هويتها ومطابقتها. مرفق لكم صورة القطعة ومواصفاتها، يرجى المساعدة في التعرف عليها وتزويدي بعرض سعر.`
      : `Hello Jupiter Elevators technical team,\nI need help identifying a worn/damaged elevator component. I am sending the photo and details; please assist in matching and quoting it.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getEmergencyWhatsAppUrl(locale: SupportedLocale): string {
  const message =
    locale === "ar"
      ? `⚠️ *طلب دعم طوارئ - عطل مصعد*\nالسلام عليكم، نحتاج توريد عاجل لقطع غيار لإصلاح عطل مصعد متوقف. أرجو التواصل الفوري معنا.`
      : `⚠️ *EMERGENCY BREAKDOWN SUPPORT*\nHello Jupiter Elevators, we have an elevator shutdown requiring urgent spare parts replacement. Please contact us immediately.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getCartRfqWhatsAppUrl(
  submission: Partial<RFQSubmission>,
  items: RFQItem[],
  locale: SupportedLocale
): string {
  let message = "";

  if (locale === "ar") {
    message += `📋 *طلب تسعيرة رسمي (RFQ) - جوبيتر للمصاعد*\n`;
    if (submission.companyName) message += `*الشركة/المؤسسة:* ${submission.companyName}\n`;
    if (submission.contactPerson) message += `*المسؤول:* ${submission.contactPerson}\n`;
    if (submission.phone) message += `*الهاتف:* ${submission.phone}\n`;
    if (submission.city) message += `*مدينة التوريد:* ${submission.city}\n`;
    if (submission.crNumber) message += `*السجل التجاري:* ${submission.crNumber}\n`;
    if (submission.projectRef) message += `*المشروع / المصعد:* ${submission.projectRef}\n`;

    message += `\n*قائمة قطع الغيار المطلوبة:*\n`;
    items.forEach((item, idx) => {
      const name = locale === "ar" ? item.name.ar : item.name.en;
      message += `${idx + 1}. ${name} (${item.sku}) - *الكمية: ${item.quantity}*\n`;
    });

    if (submission.notes) message += `\n*ملاحظات إضافية:* ${submission.notes}\n`;
    message += `\nيرجى تزويدنا بعرض سعر تجاري رسمي وفترة التوريد المتاحة. شكراً لكم.`;
  } else {
    message += `📋 *Official Request for Quotation (RFQ) - Jupiter Elevators*\n`;
    if (submission.companyName) message += `*Company:* ${submission.companyName}\n`;
    if (submission.contactPerson) message += `*Contact Person:* ${submission.contactPerson}\n`;
    if (submission.phone) message += `*Phone:* ${submission.phone}\n`;
    if (submission.city) message += `*Delivery City:* ${submission.city}\n`;
    if (submission.crNumber) message += `*CR Number:* ${submission.crNumber}\n`;
    if (submission.projectRef) message += `*Project / Elevator Model:* ${submission.projectRef}\n`;

    message += `\n*Bill of Materials / Requested Parts:*\n`;
    items.forEach((item, idx) => {
      const name = item.name.en;
      message += `${idx + 1}. ${name} (${item.sku}) - *Qty: ${item.quantity}*\n`;
    });

    if (submission.notes) message += `\n*Additional Notes:* ${submission.notes}\n`;
    message += `\nPlease provide an official quotation and availability schedule. Thank you.`;
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
