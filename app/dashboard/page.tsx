"use client";

import { useEffect, useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

type TokenData = {
  symbol: string;
  price: number | null;
  change24h: number | null;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
};

export default function DashboardPage() {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const [selectedToken, setSelectedToken] = useState<"SOL" | "BONK">("SOL");
  const [solData, setSolData] = useState<TokenData>({
    symbol: "SOL",
    price: null,
    change24h: null,
    loading: false,
    error: null,
    lastUpdated: null,
  });
  const [bonkData, setBonkData] = useState<TokenData>({
    symbol: "BONK",
    price: null,
    change24h: null,
    loading: false,
    error: null,
    lastUpdated: null,
  });
  const [solBalance, setSolBalance] = useState<number | null>(null);

  // Fetch token price from Birdeye API
  const fetchTokenPrice = async (symbol: "SOL" | "BONK") => {
    const setData = symbol === "SOL" ? setSolData : setBonkData;
    
    setData(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await fetch(`/api/price?symbol=${symbol}`, {
        cache: "no-store"
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setData({
        symbol,
        price: typeof data.price === "number" ? data.price : null,
        change24h: typeof data.change24h === "number" ? data.change24h : null,
        loading: false,
        error: null,
        lastUpdated: new Date(),
      });
    } catch (error) {
      console.error(`Failed to fetch ${symbol} price:`, error);
      setData(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : "Failed to fetch price"
      }));
    }
  };

  // Fetch both tokens
  const fetchAllPrices = async () => {
    await Promise.all([
      fetchTokenPrice("SOL"),
      fetchTokenPrice("BONK"),
    ]);
  };

  // Start polling for prices
  useEffect(() => {
    fetchAllPrices(); // Initial fetch
    const interval = setInterval(fetchAllPrices, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, []);

  // Fetch wallet SOL balance
  useEffect(() => {
    if (!publicKey || !connected) {
      setSolBalance(null);
      return;
    }

    const fetchBalance = async () => {
      try {
        const balance = await connection.getBalance(publicKey);
        setSolBalance(balance / LAMPORTS_PER_SOL);
      } catch (error) {
        console.error("Failed to fetch balance:", error);
        setSolBalance(null);
      }
    };

    fetchBalance();
    const interval = setInterval(fetchBalance, 10000); // Update every 10s
    return () => clearInterval(interval);
  }, [publicKey, connected, connection]);

  const currentToken = selectedToken === "SOL" ? solData : bonkData;
  const walletAddress = publicKey?.toBase58();
  const shortAddress = walletAddress 
    ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`
    : "";

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 md:gap-4">
      {/* Left Column - Main Stats */}
      <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        
        {/* Wallet Status Card */}
        <div className="rounded-2xl bg-white/[0.03] ring-1 ring-white/10 p-5">
          <div className="text-sm text-white/60">Wallet Status</div>
          <div className="mt-2 text-lg font-semibold">
            {connected ? (
              <span className="text-emerald-400">Connected</span>
            ) : (
              <span className="text-rose-400">Disconnected</span>
            )}
          </div>
          {connected && (
            <div className="mt-1 text-xs text-white/60 font-mono">
              {shortAddress}
            </div>
          )}
        </div>

        {/* SOL Balance Card */}
        <div className="rounded-2xl bg-white/[0.03] ring-1 ring-white/10 p-5">
          <div className="text-sm text-white/60">SOL Balance</div>
          <div className="mt-2 text-lg font-semibold">
            {connected ? (
              solBalance !== null ? (
                `${solBalance.toFixed(4)} SOL`
              ) : (
                <span className="text-white/40">Loading...</span>
              )
            ) : (
              <span className="text-white/40">Connect Wallet</span>
            )}
          </div>
          {connected && solBalance !== null && solData.price && (
            <div className="mt-1 text-xs text-white/60">
              ≈ ${(solBalance * solData.price).toFixed(2)} USD
            </div>
          )}
        </div>

        {/* Live Price Card */}
        <div className="rounded-2xl bg-white/[0.03] ring-1 ring-white/10 p-5">
          <div className="text-sm text-white/60">Current Price</div>
          <div className="mt-2 text-lg font-semibold text-white/80">
            {currentToken.loading ? (
              <span className="text-white/40">Loading...</span>
            ) : currentToken.error ? (
              <span className="text-rose-400">Error</span>
            ) : currentToken.price !== null ? (
              `$${currentToken.price.toLocaleString()}`
            ) : (
              <span className="text-white/40">No data</span>
            )}
          </div>
          <div className="mt-1 text-xs text-white/60">{selectedToken}</div>
        </div>

        {/* Price Chart Area */}
        <div className="md:col-span-3 rounded-2xl bg-white/[0.03] ring-1 ring-white/10 p-5 h-[390px]">
          <div className="flex items-center justify-between">
            <div className="text-white/80 font-medium">{selectedToken}/USD Live Feed</div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedToken("SOL")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedToken === "SOL"
                    ? "bg-orange-500/30 text-orange-300 ring-1 ring-orange-400/30"
                    : "bg-white/[0.05] text-white/70 hover:bg-white/[0.08] ring-1 ring-white/10"
                }`}
              >
                SOL
              </button>
              <button
                onClick={() => setSelectedToken("BONK")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedToken === "BONK"
                    ? "bg-orange-500/30 text-orange-300 ring-1 ring-orange-400/30"
                    : "bg-white/[0.05] text-white/70 hover:bg-white/[0.08] ring-1 ring-white/10"
                }`}
              >
                BONK
              </button>
            </div>
          </div>
          
          {/* Price Display */}
          <div className="mt-4 mb-6">
            <div className="text-3xl font-bold text-white">
              {currentToken.loading ? (
                "Loading..."
              ) : currentToken.error ? (
                <span className="text-rose-400">API Error</span>
              ) : currentToken.price !== null ? (
                selectedToken === "SOL" ? (
                  `$${currentToken.price.toFixed(4)}`
                ) : selectedToken === "BONK" ? (
                  `$${currentToken.price.toFixed(8)}`
                ) : "No Price Data"
              ) : (
                "No Price Data"
              )}
            </div>
            <div className="mt-1 text-sm">
              {currentToken.change24h !== null ? (
                <span className={currentToken.change24h >= 0 ? "text-emerald-400" : "text-rose-400"}>
                  {currentToken.change24h >= 0 ? "+" : ""}{currentToken.change24h.toFixed(2)}% (24h)
                </span>
              ) : (
                <span className="text-white/60">No 24h change data</span>
              )}
              <span className="text-white/60 ml-2">
                • Last updated: {currentToken.lastUpdated?.toLocaleTimeString() || "Never"}
              </span>
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="h-[200px] rounded-xl bg-gradient-to-b from-orange-400/20 to-purple-500/10 ring-1 ring-white/10 flex items-center justify-center">
            <div className="text-center text-white/60">
              <div className="text-lg font-medium">Live Chart</div>
              <div className="text-sm">Price visualization coming soon</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Token Info */}
      <div className="rounded-2xl bg-white/[0.03] ring-1 ring-white/10 p-5">
        <div className="flex items-center justify-between">
          <div className="text-white/80 font-medium">Token Information</div>
          <div className="text-sm text-white/60">Live Data</div>
        </div>
        
        <div className="mt-4 space-y-3">
          {/* SOL Info */}
          <div className="rounded-xl bg-white/[0.02] ring-1 ring-white/10 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 ring-1 ring-purple-400/30 flex items-center justify-center">
                <span className="text-sm font-bold">SOL</span>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white/60">Solana</div>
                <div className="text-xs text-white/60">SOL</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-white/80">
                  {solData.price ? `$${solData.price.toLocaleString()}` : "$--"}
                </div>
                <div className={`text-xs ${solData.change24h !== null && solData.change24h >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                  {solData.change24h !== null ? 
                    `${solData.change24h >= 0 ? "+" : ""}${solData.change24h.toFixed(2)}%` : 
                    "--"
                  }
                </div>
              </div>
            </div>
          </div>

          {/* BONK Info */}
          <div className="rounded-xl bg-white/[0.02] ring-1 ring-white/10 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500/30 to-yellow-500/30 ring-1 ring-orange-400/30 flex items-center justify-center">
                <span className="text-xs font-bold">BONK</span>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white/80">Bonk</div>
                <div className="text-xs text-white/60">BONK</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-white/80">
                  {bonkData.price ? (
                    selectedToken === "SOL" ?
                      `$${bonkData.price.toFixed(4)}`
                    : `$${bonkData.price.toFixed(8)}`
                  ) : "$--"}
                </div>
                <div className={`text-xs ${bonkData.change24h !== null && bonkData.change24h >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                  {bonkData.change24h !== null ? 
                    `${bonkData.change24h >= 0 ? "+" : ""}${bonkData.change24h.toFixed(2)}%` : 
                    "--"
                  }
                </div>
              </div>
            </div>
          </div>

          {/* API Status */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="text-xs text-white/60 mb-2">API Status</div>
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${
                currentToken.error ? "bg-rose-400" : currentToken.loading ? "bg-yellow-400" : "bg-emerald-400"
              }`} />
              <span className="text-xs text-white/70">
                {currentToken.error ? "Error" : currentToken.loading ? "Loading" : "Connected"}
              </span>
            </div>
            <div className="text-xs text-white/50 mt-1">
              Birdeye API • Updates every 5s
            </div>
          </div>

          {/* Wallet Info */}
          {connected && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="text-xs text-white/60 mb-2">Wallet Details</div>
              <div className="text-xs text-white/70 font-mono break-all">
                {walletAddress}
              </div>
              <div className="text-xs text-white/50 mt-1">
                Phantom Wallet Connected
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}