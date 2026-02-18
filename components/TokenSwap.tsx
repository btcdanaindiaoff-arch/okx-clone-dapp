'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { ArrowDownUp, Settings, Info } from 'lucide-react';
import { SUPPORTED_TOKENS } from '@/lib/tokens';

export function TokenSwap() {
  const [fromToken, setFromToken] = useState(SUPPORTED_TOKENS[0]);
  const [toToken, setToToken] = useState(SUPPORTED_TOKENS[1]);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState('0.5');
  const [showSettings, setShowSettings] = useState(false);

  const { isConnected } = useAccount();

  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    // Simple mock conversion (in production, use real exchange rates)
    if (value) {
      const converted = (parseFloat(value) * 0.95).toFixed(6);
      setToAmount(converted);
    } else {
      setToAmount('');
    }
  };

  const handleSwap = () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    alert(`Swapping ${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol}`);
  };

  return (
    <div className="space-y-4">
      {/* Settings Modal */}
      {showSettings && (
        <div className="mb-4 p-4 bg-[#0b0e11] rounded-lg">
          <h4 className="font-semibold mb-3">Transaction Settings</h4>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Slippage Tolerance</label>
            <div className="flex space-x-2">
              {['0.1', '0.5', '1.0'].map((value) => (
                <button
                  key={value}
                  onClick={() => setSlippage(value)}
                  className={`px-4 py-2 rounded text-sm ${
                    slippage === value
                      ? 'bg-[#00a6ff] text-white'
                      : 'bg-[#1f2329] text-gray-400 hover:text-white'
                  }`}
                >
                  {value}%
                </button>
              ))}
              <input
                type="number"
                value={slippage}
                onChange={(e) => setSlippage(e.target.value)}
                className="flex-1 bg-[#1f2329] border border-gray-700 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00a6ff]"
                placeholder="Custom"
              />
            </div>
          </div>
        </div>
      )}

      {/* From Token */}
      <div className="bg-[#0b0e11] rounded-lg p-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-400">From</span>
          <span className="text-sm text-gray-400">Balance: 0.00</span>
        </div>
        <div className="flex items-center space-x-3">
          <input
            type="number"
            value={fromAmount}
            onChange={(e) => handleFromAmountChange(e.target.value)}
            className="flex-1 bg-transparent text-2xl text-white focus:outline-none"
            placeholder="0.0"
          />
          <button className="flex items-center space-x-2 bg-[#1f2329] hover:bg-[#2a2e36] px-4 py-2 rounded-lg transition-colors">
            <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full" />
            <span className="font-medium">{fromToken.symbol}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Swap Button */}
      <div className="flex justify-center -my-2 relative z-10">
        <button
          onClick={handleSwapTokens}
          className="bg-[#1a1d24] hover:bg-[#2a2e36] p-2 rounded-lg border-4 border-[#0b0e11] transition-colors"
        >
          <ArrowDownUp className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* To Token */}
      <div className="bg-[#0b0e11] rounded-lg p-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-400">To</span>
          <span className="text-sm text-gray-400">Balance: 0.00</span>
        </div>
        <div className="flex items-center space-x-3">
          <input
            type="number"
            value={toAmount}
            readOnly
            className="flex-1 bg-transparent text-2xl text-white focus:outline-none"
            placeholder="0.0"
          />
          <button className="flex items-center space-x-2 bg-[#1f2329] hover:bg-[#2a2e36] px-4 py-2 rounded-lg transition-colors">
            <div className="w-6 h-6 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full" />
            <span className="font-medium">{toToken.symbol}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Swap Details */}
      {fromAmount && toAmount && (
        <div className="bg-[#0b0e11] rounded-lg p-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Rate</span>
            <span className="text-white">1 {fromToken.symbol} = {(parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(6)} {toToken.symbol}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Slippage Tolerance</span>
            <span className="text-white">{slippage}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Minimum Received</span>
            <span className="text-white">{(parseFloat(toAmount) * (1 - parseFloat(slippage) / 100)).toFixed(6)} {toToken.symbol}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Network Fee</span>
            <span className="text-white">~$2.50</span>
          </div>
        </div>
      )}

      {/* Swap Button */}
      <button
        onClick={handleSwap}
        disabled={!isConnected || !fromAmount}
        className={`w-full py-4 rounded-lg font-medium transition-colors ${
          isConnected && fromAmount
            ? 'bg-[#00a6ff] hover:bg-[#0090e0] text-white'
            : 'bg-gray-700 text-gray-400 cursor-not-allowed'
        }`}
      >
        {!isConnected ? 'Connect Wallet' : !fromAmount ? 'Enter Amount' : 'Swap'}
      </button>

      {/* Info Notice */}
      <div className="flex items-start space-x-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-200">
          Review the transaction details carefully. Once confirmed, the swap cannot be reversed.
        </p>
      </div>
    </div>
  );
}
