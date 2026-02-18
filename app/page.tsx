'use client';

import { Navbar } from '@/components/Navbar';
import { PriceTicker } from '@/components/PriceTicker';
import { TradingChart } from '@/components/TradingChart';
import { OrderBook } from '@/components/OrderBook';
import { TradeForm } from '@/components/TradeForm';
import { Portfolio } from '@/components/Portfolio';
import { useStore } from '@/store/useStore';

export default function Home() {
  const { selectedPair } = useStore();

  return (
    <div className="min-h-screen bg-[#0b0e11] text-white">
      <Navbar />
      <PriceTicker />
      
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Section - Trading Chart and Order Book */}
          <div className="lg:col-span-9 space-y-4">
            <TradingChart pair={selectedPair} />
            <OrderBook pair={selectedPair} />
          </div>

          {/* Right Section - Trade Form and Portfolio */}
          <div className="lg:col-span-3 space-y-4">
            <TradeForm pair={selectedPair} />
            <Portfolio />
          </div>
        </div>
      </div>
    </div>
  );
}
