'use client';

import { useState, useEffect } from 'react';

interface OrderBookProps {
  pair: string;
}

interface Order {
  price: number;
  amount: number;
  total: number;
}

export function OrderBook({ pair }: OrderBookProps) {
  const [bids, setBids] = useState<Order[]>([]);
  const [asks, setAsks] = useState<Order[]>([]);
  const [view, setView] = useState<'all' | 'bids' | 'asks'>('all');

  useEffect(() => {
    // Generate mock order book data
    const generateOrders = () => {
      const basePrice = 45000;
      const newBids: Order[] = [];
      const newAsks: Order[] = [];

      for (let i = 0; i < 15; i++) {
        const bidPrice = basePrice - (i + 1) * 10;
        const askPrice = basePrice + (i + 1) * 10;
        const amount = Math.random() * 5;

        newBids.push({
          price: bidPrice,
          amount: amount,
          total: bidPrice * amount,
        });

        newAsks.push({
          price: askPrice,
          amount: amount,
          total: askPrice * amount,
        });
      }

      setBids(newBids);
      setAsks(newAsks.reverse());
    };

    generateOrders();
    const interval = setInterval(generateOrders, 3000);

    return () => clearInterval(interval);
  }, [pair]);

  const maxBidTotal = Math.max(...bids.map(b => b.total));
  const maxAskTotal = Math.max(...asks.map(a => a.total));

  return (
    <div className="bg-[#1a1d24] rounded-lg p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Order Book</h3>
        <div className="flex space-x-1 bg-[#0b0e11] rounded p-1">
          <button
            onClick={() => setView('all')}
            className={`px-3 py-1 rounded text-xs ${
              view === 'all' ? 'bg-[#2a2e36] text-white' : 'text-gray-400'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setView('bids')}
            className={`px-3 py-1 rounded text-xs ${
              view === 'bids' ? 'bg-[#2a2e36] text-white' : 'text-gray-400'
            }`}
          >
            Bids
          </button>
          <button
            onClick={() => setView('asks')}
            className={`px-3 py-1 rounded text-xs ${
              view === 'asks' ? 'bg-[#2a2e36] text-white' : 'text-gray-400'
            }`}
          >
            Asks
          </button>
        </div>
      </div>

      {/* Column Headers */}
      <div className="grid grid-cols-3 text-xs text-gray-400 mb-2">
        <div>Price (USD)</div>
        <div className="text-right">Amount</div>
        <div className="text-right">Total</div>
      </div>

      {/* Order Book Entries */}
      <div className="space-y-0.5">
        {/* Asks (Sell Orders) */}
        {(view === 'all' || view === 'asks') && (
          <div className="space-y-0.5">
            {asks.slice(0, view === 'all' ? 8 : 15).map((ask, i) => (
              <div
                key={`ask-${i}`}
                className="grid grid-cols-3 text-sm relative hover:bg-[#2a2e36]/30 cursor-pointer py-1"
              >
                <div
                  className="absolute inset-0 bg-red-500/10"
                  style={{ width: `${(ask.total / maxAskTotal) * 100}%` }}
                />
                <div className="relative text-red-500">{ask.price.toFixed(2)}</div>
                <div className="relative text-right text-white">{ask.amount.toFixed(4)}</div>
                <div className="relative text-right text-gray-400">{ask.total.toFixed(2)}</div>
              </div>
            ))}
          </div>
        )}

        {/* Spread */}
        {view === 'all' && (
          <div className="flex justify-between items-center py-2 my-2 border-y border-gray-800">
            <span className="text-lg font-bold text-green-500">
              {bids.length > 0 ? bids[0].price.toFixed(2) : '0.00'}
            </span>
            <span className="text-xs text-gray-400">
              Spread: {asks.length > 0 && bids.length > 0 
                ? (asks[asks.length - 1].price - bids[0].price).toFixed(2) 
                : '0.00'}
            </span>
          </div>
        )}

        {/* Bids (Buy Orders) */}
        {(view === 'all' || view === 'bids') && (
          <div className="space-y-0.5">
            {bids.slice(0, view === 'all' ? 8 : 15).map((bid, i) => (
              <div
                key={`bid-${i}`}
                className="grid grid-cols-3 text-sm relative hover:bg-[#2a2e36]/30 cursor-pointer py-1"
              >
                <div
                  className="absolute inset-0 bg-green-500/10"
                  style={{ width: `${(bid.total / maxBidTotal) * 100}%` }}
                />
                <div className="relative text-green-500">{bid.price.toFixed(2)}</div>
                <div className="relative text-right text-white">{bid.amount.toFixed(4)}</div>
                <div className="relative text-right text-gray-400">{bid.total.toFixed(2)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
