"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center relative overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-[#1A3555]/20 blur-3xl pointer-events-none" />
        <div className="text-center px-6 relative z-10">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
            Be the Insight Others Wait For.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Say goodbye to <span className="text-[#436ea2]">overhyped token launches</span>
          </p>
          <div className="mt-10">
            <Link
              href="/dashboard"
              className="inline-flex items-center rounded-full bg-[#1A3555] hover:bg-[#1A3555] transition-colors px-8 py-4 font-semibold text-lg"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/50 backdrop-blur">
        <div className="mx-auto max-w-4xl px-6 py-8">
          <div className="text-center">
              <p>© {new Date().getFullYear()} CoinBuzz. Built for Web3 Developer Trial.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}