'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface CoinData {
  symbol: string;
  price: number;
  change: number;
}

export function PriceTicker() {
  const [coins, setCoins] = useState<CoinData[]>([
    { symbol: 'BTC/USDT', price: 45000, change: 2.5 },
    { symbol: 'ETH/USDT', price: 2500, change: 3.2 },
    { symbol: 'BNB/USDT', price: 320, change: -1.5 },
    { symbol: 'SOL/USDT', price: 98, change: 5.7 },
    { symbol: 'ADA/USDT', price: 0.45, change: -0.8 },
    { symbol: 'XRP/USDT', price: 0.52, change: 1.2 },
    { symbol: 'DOT/USDT', price: 7.8, change: 4.3 },
    { symbol: 'MATIC/USDT', price: 0.89, change: -2.1 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCoins(prev => prev.map(coin => ({
        ...coin,
        price: coin.price * (1 + (Math.random() - 0.5) * 0.01),
        change: coin.change + (Math.random() - 0.5) * 0.5,
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0b0e11] border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-8 overflow-x-auto py-3 scrollbar-hide">
          {coins.map((coin) => (
            <div
              key={coin.symbol}
              className="flex items-center space-x-3 min-w-fit cursor-pointer hover:opacity-80 transition-opacity"
            >
              <span className="text-sm font-medium text-gray-300">{coin.symbol}</span>
              <span className="text-sm font-semibold text-white">
                ${coin.price.toFixed(coin.price < 1 ? 4 : 2)}
              </span>
              <div className={`flex items-center text-xs ${coin.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {coin.change >= 0 ? (
                  <TrendingUp className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1" />
                )}
                <span>{coin.change >= 0 ? '+' : ''}{coin.change.toFixed(2)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
