'use client';

import { Navbar } from '@/components/Navbar';
import { PriceTicker } from '@/components/PriceTicker';
import { TradingChart } from '@/components/TradingChart';
import { OrderBook } from '@/components/OrderBook';
import { TradeForm } from '@/components/TradeForm';
import { useStore } from '@/store/useStore';
import { useState } from 'react';

export default function TradePage() {
  const { selectedPair } = useStore();
  const [activeTab, setActiveTab] = useState<'spot' | 'margin' | 'futures'>('spot');

  return (
    <div className="min-h-screen bg-[#0b0e11] text-white">
      <Navbar />
      <PriceTicker />
      
      <div className="container mx-auto px-4 py-6">
        {/* Trading Type Tabs */}
        <div className="flex space-x-4 mb-6">
          {['spot', 'margin', 'futures'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-[#00a6ff] text-white'
                  : 'bg-[#1a1d24] text-gray-400 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Main Trading Area */}
          <div className="lg:col-span-9">
            <div className="grid grid-cols-12 gap-4">
              {/* Chart Section */}
              <div className="col-span-12">
                <TradingChart pair={selectedPair} />
              </div>

              {/* Order Book */}
              <div className="col-span-12 md:col-span-6">
                <OrderBook pair={selectedPair} />
              </div>

              {/* Recent Trades */}
              <div className="col-span-12 md:col-span-6">
                <div className="bg-[#1a1d24] rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4">Recent Trades</h3>
                  <div className="space-y-2">
                    {Array.from({ length: 15 }).map((_, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className={i % 2 === 0 ? 'text-green-500' : 'text-red-500'}>
                          ${(45000 + Math.random() * 100).toFixed(2)}
                        </span>
                        <span className="text-gray-400">
                          {(Math.random() * 0.5).toFixed(4)}
                        </span>
                        <span className="text-gray-500">
                          {new Date().toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trading Form */}
          <div className="lg:col-span-3">
            <TradeForm pair={selectedPair} />
          </div>
        </div>
      </div>
    </div>
  );
}
