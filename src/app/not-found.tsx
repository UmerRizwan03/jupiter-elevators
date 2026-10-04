import Link from "next/link";
import { Home, Package } from "lucide-react";

export default function RootNotFound() {
  return (
    <html lang="en">
      <head>
        <title>404 - Page Not Found | Jupiter Elevators</title>
        <meta name="robots" content="noindex, follow" />
      </head>
      <body className="min-h-screen bg-[#F6F7F9] text-slate-900 font-sans flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 shadow-xl text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#C59341]/10 border border-[#C59341]/30 flex items-center justify-center text-[#C59341]">
            <span className="font-mono text-2xl font-bold">404</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mb-2">
            Page Not Found / الصفحة غير موجودة
          </h1>
          <p className="text-sm text-slate-600 mb-6">
            The requested technical specification or page is not available. Please return to the catalog or homepage.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/en"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-mono font-bold transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Homepage</span>
            </Link>
            <Link
              href="/en/catalog"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#C59341] hover:bg-[#A8792F] text-white rounded-xl text-xs font-mono font-bold transition-colors"
            >
              <Package className="w-4 h-4" />
              <span>Parts Catalog</span>
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
