import { ImageResponse } from "next/og";

export const alt = "Jupiter Elevators — Elevator Parts and Components";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isArabic = lang === "ar";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 76px",
          background: "linear-gradient(125deg, #071228 0%, #0B1B3D 62%, #172B4D 100%)",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 99,
              background: "#C59341",
            }}
          />
          <div style={{ fontSize: 25, letterSpacing: 5, fontWeight: 700 }}>
            JUPITER ELEVATORS
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 62,
              lineHeight: 1.1,
              fontWeight: 700,
              maxWidth: 1000,
            }}
          >
            {isArabic
              ? "قطع ومكونات المصاعد المعتمدة في المملكة"
              : "Elevator Parts. Ready for the Next Move."}
          </div>
          <div style={{ color: "#D8B36A", fontSize: 24, letterSpacing: 2 }}>
            {isArabic ? "الدمام · المملكة العربية السعودية" : "DAMMAM · SAUDI ARABIA"}
          </div>
        </div>
        <div style={{ height: 2, width: "100%", background: "#C59341" }} />
      </div>
    ),
    size
  );
}
