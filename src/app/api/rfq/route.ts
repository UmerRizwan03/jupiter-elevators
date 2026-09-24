import { NextResponse } from "next/server";
import { RFQSubmission } from "@/types/catalog";

export async function POST(request: Request) {
  try {
    const data: RFQSubmission = await request.json();

    if (!data.companyName || !data.contactPerson || !data.phone || !data.city) {
      return NextResponse.json(
        { error: "Missing required contact fields (Company, Contact Person, Phone, City)" },
        { status: 400 }
      );
    }

    if (!data.items || data.items.length === 0) {
      return NextResponse.json(
        { error: "Cannot submit RFQ with empty parts list" },
        { status: 400 }
      );
    }

    // Generate RFQ Reference ID
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `JP-RFQ-${new Date().getFullYear()}-${randomSuffix}`;

    console.log("=== NEW JUPITER ELEVATORS RFQ RECEIVED ===");
    console.log("Reference ID:", referenceId);
    console.log("Contractor:", data.companyName, "-", data.contactPerson);
    console.log("Phone / WhatsApp:", data.phone);
    console.log("Email:", data.email);
    console.log("Delivery City:", data.city);
    console.log("CR Number:", data.crNumber || "N/A");
    console.log("Project Ref:", data.projectRef || "N/A");
    console.log("Line Items:", data.items.length);
    data.items.forEach((item, i) => {
      console.log(`  ${i + 1}. [${item.sku}] ${item.name.en} - Qty: ${item.quantity}`);
    });
    console.log("==========================================");

    // In production on Vercel, this can forward to SendGrid/Resend/Nodemailer to sales@jupiterelevators.com
    return NextResponse.json({
      success: true,
      referenceId,
      message: "Quotation request registered successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("RFQ processing error:", error);
    return NextResponse.json(
      { error: "Internal server error while processing quotation" },
      { status: 500 }
    );
  }
}
