"use client";

import React from "react";

type IconProps = { className?: string };

export const IconLogo = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="3" width="8" height="8" rx="2" className="fill-purple-500/30" />
    <rect x="13" y="3" width="8" height="8" rx="2" className="fill-purple-500/50" />
    <rect x="3" y="13" width="8" height="8" rx="2" className="fill-purple-500/50" />
    <rect x="13" y="13" width="8" height="8" rx="2" className="fill-purple-500/30" />
  </svg>
);

export const IconGrid = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" className="fill-current" />
  </svg>
);

export const IconChart = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4 19h16M6 16l4-4 3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconWallet = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
    <circle cx="16.5" cy="12" r="1.5" className="fill-current" />
  </svg>
);

export const IconUsers = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M16 11c1.657 0 3-1.79 3-4s-1.343-4-3-4-3 1.79-3 4 1.343 4 3 4zM8 13c2.761 0 5-2.239 5-5S10.761 3 8 3 3 5.239 3 8s2.239 5 5 5zM21 22v-2a4 4 0 0 0-4-4h-2M3 22v-2a6 6 0 0 1 6-6h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const IconSettings = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" stroke="currentColor" strokeWidth="2" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1 .6 1.65 1.65 0 0 0-.33 1.82l.02.05a2 2 0 1 1-3.38 0l.02-.05A1.65 1.65 0 0 0 10 19.4a1.65 1.65 0 0 0-1-.6 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-.6-1 1.65 1.65 0 0 0-1.82-.33l-.05.02a2 2 0 1 1 0-3.38l.05.02A1.65 1.65 0 0 0 4.6 10a1.65 1.65 0 0 0 .6-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6c.3-.05.63-.05.93 0a1.65 1.65 0 0 0 1-.6 1.65 1.65 0 0 0 .33-1.82l-.02-.05a2 2 0 1 1 3.38 0l-.02.05A1.65 1.65 0 0 0 15 4.6c.3.05.63.05.93 0a1.65 1.65 0 0 0 1-.6l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.05.3.05.63 0 .93.2.3.4.63.6.93z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const IconInfo = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M12 8h.01M11 12h2v6h-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const IconPower = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M6.3 5.3A8 8 0 1 0 17.7 5.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);