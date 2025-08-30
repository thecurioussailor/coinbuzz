"use client";

import { useEffect, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

export default function Home() {
  const { publicKey } = useWallet();
  const [symbol, setSymbol] = useState<"SOL" | "BONK">("SOL");
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  async function loadPrice(signal?: AbortSignal) {
    setLoading(true);
    try {
      const res = await fetch(`/api/price?symbol=${symbol}`, { signal, cache: "no-store" });
      const json = await res.json();
      setPrice(typeof json?.price === "number" ? json.price : null);
    } catch {}
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    loadPrice(controller.signal);
    const id = setInterval(() => loadPrice(controller.signal), 5000);
    return () => {
      controller.abort();
      clearInterval(id);
    };
  }, [symbol]);

  const address = publicKey?.toBase58();
  const short = address ? `${address.slice(0, 4)}...${address.slice(-4)}` : "";

  return (
    <main style={{ maxWidth: 720, margin: "48px auto", padding: "0 16px" }}>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>CoinBuzz</h1>

      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
        <WalletMultiButton />
        {address && <code style={{ opacity: 0.85 }}>{short}</code>}
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <label htmlFor="symbol">Token:</label>
        <select
          id="symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value as "SOL" | "BONK")}
        >
          <option value="SOL">SOL</option>
          <option value="BONK">BONK</option>
        </select>

        <div style={{ marginLeft: 8 }}>
          <strong>Price:</strong>{" "}
          {loading && price == null ? "Loading..." : price !== null ? `$${price.toLocaleString()}` : "—"}{" "}
          <span style={{ opacity: 0.6 }}>({symbol})</span>
        </div>
      </div>
    </main>
  );
}