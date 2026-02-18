'use client';

import { Navbar } from '@/components/Navbar';
import { Portfolio } from '@/components/Portfolio';
import { useAccount, useBalance } from 'wagmi';
import { formatEther } from 'viem';
import { SUPPORTED_TOKENS } from '@/lib/tokens';
import { useTokenBalance } from '@/hooks/useTokenBalance';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export default function WalletPage() {
  const { address, isConnected } = useAccount();
  const { data: ethBalance } = useBalance({ address });

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-[#0b0e11] text-white">
        <Navbar />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
            <p className="text-gray-400">Please connect your wallet to view your portfolio</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0e11] text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        {/* Wallet Overview */}
        <div className="bg-gradient-to-r from-[#00a6ff] to-[#0080cc] rounded-lg p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-blue-100 mb-2">Total Portfolio Value</p>
              <h1 className="text-4xl font-bold mb-4">
                ${ethBalance ? (parseFloat(formatEther(ethBalance.value)) * 2500).toFixed(2) : '0.00'}
              </h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-green-400">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm">+12.5%</span>
                </div>
                <span className="text-sm text-blue-100">24h</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <ArrowDownLeft className="w-4 h-4" />
                <span>Deposit</span>
              </button>
              <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <ArrowUpRight className="w-4 h-4" />
                <span>Withdraw</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Assets List */}
          <div className="lg:col-span-2">
            <div className="bg-[#1a1d24] rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Assets</h2>
              <div className="space-y-4">
                {/* ETH Balance */}
                <div className="flex items-center justify-between p-4 bg-[#0b0e11] rounded-lg hover:bg-[#1f2329] transition-colors cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">ETH</span>
                    </div>
                    <div>
                      <p className="font-semibold">Ethereum</p>
                      <p className="text-sm text-gray-400">ETH</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {ethBalance ? parseFloat(formatEther(ethBalance.value)).toFixed(4) : '0.0000'}
                    </p>
                    <p className="text-sm text-gray-400">
                      ${ethBalance ? (parseFloat(formatEther(ethBalance.value)) * 2500).toFixed(2) : '0.00'}
                    </p>
                  </div>
                </div>

                {/* Other Tokens */}
                {SUPPORTED_TOKENS.slice(0, 5).map((token) => (
                  <TokenBalanceItem key={token.address} token={token} userAddress={address!} />
                ))}
              </div>
            </div>
          </div>

          {/* Portfolio Stats */}
          <div className="space-y-6">
            <Portfolio />
            
            {/* Quick Actions */}
            <div className="bg-[#1a1d24] rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full bg-[#00a6ff] hover:bg-[#0090e0] py-3 rounded-lg font-medium transition-colors">
                  Buy Crypto
                </button>
                <button className="w-full bg-[#1f2329] hover:bg-[#2a2e36] py-3 rounded-lg font-medium transition-colors">
                  Swap Tokens
                </button>
                <button className="w-full bg-[#1f2329] hover:bg-[#2a2e36] py-3 rounded-lg font-medium transition-colors">
                  Earn Rewards
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TokenBalanceItem({ token, userAddress }: { token: any; userAddress: string }) {
  const { balance, formatted } = useTokenBalance(token.address, userAddress);
  
  return (
    <div className="flex items-center justify-between p-4 bg-[#0b0e11] rounded-lg hover:bg-[#1f2329] transition-colors cursor-pointer">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-xs">{token.symbol}</span>
        </div>
        <div>
          <p className="font-semibold">{token.name}</p>
          <p className="text-sm text-gray-400">{token.symbol}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold">{formatted}</p>
        <p className="text-sm text-gray-400">$0.00</p>
      </div>
    </div>
  );
}
