import React from "react";

export default function Loading() {
  return (
    <div className="py-16 sm:py-24 bg-[#F6F7F9] min-h-[70vh] flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center space-y-5">
        {/* Animated Laser Micro-Loader */}
        <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-2xl border-2 border-slate-200" />
          <div className="absolute inset-0 rounded-2xl border-2 border-[#C59341] border-t-transparent animate-spin" />
          <div className="w-6 h-6 rounded-lg bg-slate-900 flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-[#C59341] animate-ping" />
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-xs font-mono font-bold text-slate-800 tracking-wider">
            01 | RETRIEVING TECHNICAL SPECIFICATIONS
          </div>
          <p className="text-[11px] font-mono text-slate-400">
            CONNECTING TO DAMMAM CENTRAL INVENTORY...
          </p>
        </div>
      </div>
    </div>
  );
}

