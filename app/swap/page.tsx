'use client';

import { Navbar } from '@/components/Navbar';
import { TokenSwap } from '@/components/TokenSwap';
import { useAccount } from 'wagmi';
import { ArrowDownUp, Settings, Clock } from 'lucide-react';

export default function SwapPage() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-[#0b0e11] text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Swap Tokens</h1>
            <p className="text-gray-400">Trade tokens instantly with the best rates</p>
          </div>

          {/* Swap Interface */}
          <div className="bg-[#1a1d24] rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Swap</h2>
              <div className="flex space-x-2">
                <button className="p-2 hover:bg-[#2a2e36] rounded-lg transition-colors">
                  <Clock className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-[#2a2e36] rounded-lg transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>

            {isConnected ? (
              <TokenSwap />
            ) : (
              <div className="text-center py-12">
                <ArrowDownUp className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
                <p className="text-gray-400 mb-6">
                  Connect your wallet to start swapping tokens
                </p>
              </div>
            )}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#1a1d24] rounded-lg p-4">
              <div className="text-[#00a6ff] mb-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Instant Swaps</h3>
              <p className="text-sm text-gray-400">Execute trades in seconds with low slippage</p>
            </div>

            <div className="bg-[#1a1d24] rounded-lg p-4">
              <div className="text-[#00a6ff] mb-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Best Rates</h3>
              <p className="text-sm text-gray-400">Automatically find the best exchange rates</p>
            </div>

            <div className="bg-[#1a1d24] rounded-lg p-4">
              <div className="text-[#00a6ff] mb-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Secure</h3>
              <p className="text-sm text-gray-400">Non-custodial swaps, you control your funds</p>
            </div>
          </div>

          {/* Recent Transactions */}
          {isConnected && (
            <div className="mt-6 bg-[#1a1d24] rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Swaps</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-[#0b0e11] rounded-lg">
                    <div className="flex items-center space-x-3">
                      <ArrowDownUp className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium">ETH → USDT</p>
                        <p className="text-sm text-gray-400">1.5 ETH for 3,750 USDT</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-green-500">Completed</p>
                      <p className="text-xs text-gray-400">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
