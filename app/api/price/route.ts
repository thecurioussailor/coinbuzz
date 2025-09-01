// app/api/price/route.ts
import { NextRequest, NextResponse } from "next/server";

const TOKENS: Record<string, string> = {
  SOL: "So11111111111111111111111111111111111111112",
  BONK: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const symbol = (searchParams.get("symbol") || "SOL").toUpperCase();
  const address = TOKENS[symbol];

  if (!address) {
    return NextResponse.json({ error: "Unsupported symbol" }, { status: 400 });
  }

  const apiKey = process.env.BIRDEYE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing BIRDEYE_API_KEY" }, { status: 500 });
  }

  try {
    const res = await fetch(`https://public-api.birdeye.so/defi/price?address=${address}`, {
      headers: {
        "X-API-KEY": apiKey,
        "accept": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: "Birdeye error", details: text }, { status: 502 });
    }

    const data = await res.json();
    const price = data?.data?.value ?? data?.data?.price ?? data?.price ?? null;
    const change24h = data?.data?.priceChange24h ?? data?.priceChange24h ?? null;

    return NextResponse.json({ 
      symbol, 
      address, 
      price, 
      change24h,
      source: "birdeye",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Birdeye API error:", error);
    return NextResponse.json({ 
      error: "Failed to fetch price data" 
    }, { status: 500 });
  }
}