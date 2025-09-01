"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useMemo } from "react";

export default function Navbar() {
  const today = useMemo(() => {
    return new Date().toLocaleDateString(undefined, { day: "2-digit", month: "long", year: "numeric" });
  }, []);

  return (
    <div className="h-20 w-full rounded-full bg-white/[0.03] ring-1 ring-white/10 backdrop-blur flex items-center px-6 md:px-8 justify-between">
      <div className="flex items-center gap-3">
        <div className="text-white/90 font-semibold text-xl flex items-center">Dashboard</div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 rounded-full bg-white/[0.04] ring-1 ring-white/10 px-3 py-1.5 text-sm text-white/70">
          <span>{today}</span>
        </div>
        <WalletMultiButton />
      </div>
    </div>
  );
}