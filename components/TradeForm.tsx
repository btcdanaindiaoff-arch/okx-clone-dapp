'use client';

import { useState } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { formatEther } from 'viem';
import { Wallet } from 'lucide-react';

interface TradeFormProps {
  pair: string;
}

export function TradeForm({ pair }: TradeFormProps) {
  const [orderType, setOrderType] = useState<'limit' | 'market'>('limit');
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [price, setPrice] = useState('45000');
  const [amount, setAmount] = useState('');
  const [total, setTotal] = useState('0');

  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });

  const handleAmountChange = (value: string) => {
    setAmount(value);
    if (value && price) {
      setTotal((parseFloat(value) * parseFloat(price)).toFixed(2));
    } else {
      setTotal('0');
    }
  };

  const handlePriceChange = (value: string) => {
    setPrice(value);
    if (value && amount) {
      setTotal((parseFloat(amount) * parseFloat(value)).toFixed(2));
    } else {
      setTotal('0');
    }
  };

  const handlePercentage = (percent: number) => {
    if (balance) {
      const availableBalance = parseFloat(formatEther(balance.value));
      const calculatedAmount = (availableBalance * percent) / 100;
      handleAmountChange(calculatedAmount.toFixed(6));
    }
  };

  const handleSubmit = () => {
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }
    alert(`${side.toUpperCase()} ${amount} at ${orderType === 'limit' ? `$${price}` : 'market price'}`);
  };

  return (
    <div className="bg-[#1a1d24] rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Trade</h3>

      {/* Order Type Selector */}
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setOrderType('limit')}
          className={`flex-1 py-2 rounded text-sm font-medium transition-colors ${
            orderType === 'limit'
              ? 'bg-[#00a6ff] text-white'
              : 'bg-[#0b0e11] text-gray-400 hover:text-white'
          }`}
        >
          Limit
        </button>
        <button
          onClick={() => setOrderType('market')}
          className={`flex-1 py-2 rounded text-sm font-medium transition-colors ${
            orderType === 'market'
              ? 'bg-[#00a6ff] text-white'
              : 'bg-[#0b0e11] text-gray-400 hover:text-white'
          }`}
        >
          Market
        </button>
      </div>

      {/* Buy/Sell Tabs */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          onClick={() => setSide('buy')}
          className={`py-2 rounded font-medium transition-colors ${
            side === 'buy'
              ? 'bg-green-500 text-white'
              : 'bg-[#0b0e11] text-gray-400 hover:text-white'
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setSide('sell')}
          className={`py-2 rounded font-medium transition-colors ${
            side === 'sell'
              ? 'bg-red-500 text-white'
              : 'bg-[#0b0e11] text-gray-400 hover:text-white'
          }`}
        >
          Sell
        </button>
      </div>

      {/* Available Balance */}
      {isConnected && balance && (
        <div className="mb-4 p-3 bg-[#0b0e11] rounded">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Available</span>
            <span className="text-white font-medium">
              {parseFloat(formatEther(balance.value)).toFixed(4)} {balance.symbol}
            </span>
          </div>
        </div>
      )}

      {/* Price Input (Limit Order) */}
      {orderType === 'limit' && (
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">Price</label>
          <div className="relative">
            <input
              type="number"
              value={price}
              onChange={(e) => handlePriceChange(e.target.value)}
              className="w-full bg-[#0b0e11] border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-[#00a6ff]"
              placeholder="0.00"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              USD
            </span>
          </div>
        </div>
      )}

      {/* Amount Input */}
      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-2">Amount</label>
        <div className="relative">
          <input
            type="number"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            className="w-full bg-[#0b0e11] border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-[#00a6ff]"
            placeholder="0.00"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            {pair.split('/')[0]}
          </span>
        </div>
      </div>

      {/* Percentage Buttons */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {[25, 50, 75, 100].map((percent) => (
          <button
            key={percent}
            onClick={() => handlePercentage(percent)}
            className="py-1 bg-[#0b0e11] hover:bg-[#2a2e36] rounded text-sm text-gray-400 hover:text-white transition-colors"
          >
            {percent}%
          </button>
        ))}
      </div>

      {/* Total */}
      <div className="mb-4 p-3 bg-[#0b0e11] rounded">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Total</span>
          <span className="text-white font-medium">${total}</span>
        </div>
      </div>

      {/* Submit Button */}
      {isConnected ? (
        <button
          onClick={handleSubmit}
          className={`w-full py-3 rounded-lg font-medium transition-colors ${
            side === 'buy'
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-red-500 hover:bg-red-600 text-white'
          }`}
        >
          {side === 'buy' ? 'Buy' : 'Sell'} {pair.split('/')[0]}
        </button>
      ) : (
        <button
          disabled
          className="w-full py-3 rounded-lg font-medium bg-gray-700 text-gray-400 cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <Wallet className="w-4 h-4" />
          <span>Connect Wallet to Trade</span>
        </button>
      )}
    </div>
  );
}
