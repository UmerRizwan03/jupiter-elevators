import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 20_000;
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;
const requests = new Map<string, { count: number; resetAt: number }>();

type InquiryBody = {
  kind: "contact" | "rfq";
  locale: "en" | "ar";
  reference?: string;
  name?: string;
  company?: string;
  contactPerson?: string;
  phone: string;
  email?: string;
  subject?: string;
  message?: string;
  city?: string;
  projectRef?: string;
  notes?: string;
  items?: Array<{ sku: string; name: string; quantity: number }>;
  website?: string;
};

function clean(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).host !== request.headers.get("host")) {
        return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
    }
  }

  const length = Number(request.headers.get("content-length") || 0);
  if (length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Request is too large." }, { status: 413 });
  }

  const address = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const record = requests.get(address);
  if (record && record.resetAt > now && record.count >= MAX_REQUESTS_PER_WINDOW) {
    return NextResponse.json({ error: "Please wait before sending another inquiry." }, { status: 429 });
  }
  requests.set(address, !record || record.resetAt <= now ? { count: 1, resetAt: now + WINDOW_MS } : { ...record, count: record.count + 1 });
  if (requests.size > 2_000) {
    for (const [key, value] of requests) if (value.resetAt <= now) requests.delete(key);
  }

  let body: InquiryBody;
  try {
    const reader = request.body?.getReader();
    if (!reader) return NextResponse.json({ error: "Request body is required." }, { status: 400 });
    const chunks: Uint8Array[] = [];
    let totalBytes = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > MAX_BODY_BYTES) {
        await reader.cancel();
        return NextResponse.json({ error: "Request is too large." }, { status: 413 });
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(totalBytes);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    const parsed: unknown = JSON.parse(new TextDecoder().decode(bytes));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }
    body = parsed as InquiryBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Silently accept honeypot submissions so bots do not learn the field name.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });
  if (body.kind !== "contact" && body.kind !== "rfq") {
    return NextResponse.json({ error: "Invalid inquiry type." }, { status: 400 });
  }
  if (body.locale !== "en" && body.locale !== "ar") {
    return NextResponse.json({ error: "Invalid locale." }, { status: 400 });
  }

  const phone = clean(body.phone, 40);
  const name = clean(body.name, 120);
  const contactPerson = clean(body.contactPerson, 120);
  const message = clean(body.message, 4_000);
  if (!phone || (body.kind === "contact" && (!name || !message)) || (body.kind === "rfq" && !contactPerson)) {
    return NextResponse.json({ error: "Please complete the required fields." }, { status: 400 });
  }

  const items = Array.isArray(body.items) ? body.items.slice(0, 100).map((item) => ({
    sku: clean(item?.sku, 80),
    name: clean(item?.name, 160),
    quantity: Math.max(1, Math.min(10_000, Number(item?.quantity) || 1)),
  })) : [];
  const fields = [
    ["Reference", clean(body.reference, 50)],
    ["Name", name],
    ["Company", clean(body.company, 160)],
    ["Contact person", contactPerson],
    ["Phone", phone],
    ["Email", clean(body.email, 254)],
    ["City", clean(body.city, 100)],
    ["Project reference", clean(body.projectRef, 160)],
    ["Subject", clean(body.subject, 200)],
    ["Notes / message", message || clean(body.notes, 4_000)],
  ].filter(([, value]) => value);
  const lines = fields.map(([label, value]) => `${label}: ${value}`);
  if (items.length) {
    lines.push("", "Requested items:", ...items.map((item) => `- ${item.sku} | ${item.name} | Qty ${item.quantity}`));
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RFQ_FROM_EMAIL;
  const to = process.env.RFQ_TO_EMAIL || "elevatorsjupiter@gmail.com";
  if (!apiKey || !from) {
    return NextResponse.json({ error: "Email delivery is not configured." }, { status: 503 });
  }

  const subject = `${body.kind === "rfq" ? "RFQ" : "Website inquiry"}${body.reference ? ` ${clean(body.reference, 50)}` : ""}`;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], subject, text: lines.join("\n") }),
    cache: "no-store",
    signal: AbortSignal.timeout(8_000),
  }).catch(() => null);

  if (!response?.ok) {
    return NextResponse.json({ error: "Email delivery failed." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
