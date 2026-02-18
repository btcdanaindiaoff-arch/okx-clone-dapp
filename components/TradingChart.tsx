'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TradingChartProps {
  pair: string;
}

export function TradingChart({ pair }: TradingChartProps) {
  const [timeframe, setTimeframe] = useState('1H');
  const [chartData, setChartData] = useState<any[]>([]);
  const [chartType, setChartType] = useState<'line' | 'area'>('area');

  useEffect(() => {
    // Generate mock chart data
    const generateData = () => {
      const data = [];
      const basePrice = 45000;
      for (let i = 0; i < 50; i++) {
        data.push({
          time: new Date(Date.now() - (50 - i) * 60000).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          price: basePrice + Math.random() * 1000 - 500,
          volume: Math.random() * 1000000,
        });
      }
      return data;
    };

    setChartData(generateData());
    const interval = setInterval(() => {
      setChartData(generateData());
    }, 5000);

    return () => clearInterval(interval);
  }, [pair, timeframe]);

  const timeframes = ['1m', '5m', '15m', '30m', '1H', '4H', '1D', '1W'];
  const currentPrice = chartData.length > 0 ? chartData[chartData.length - 1].price : 45000;
  const priceChange = chartData.length > 1 
    ? ((chartData[chartData.length - 1].price - chartData[0].price) / chartData[0].price) * 100 
    : 0;

  return (
    <div className="bg-[#1a1d24] rounded-lg p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold">{pair}</h2>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-semibold">
                ${currentPrice.toFixed(2)}
              </span>
              <div className={`flex items-center ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {priceChange >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span className="text-sm ml-1">
                  {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
            <span>24h High: ${(currentPrice * 1.02).toFixed(2)}</span>
            <span>24h Low: ${(currentPrice * 0.98).toFixed(2)}</span>
            <span>24h Vol: {(Math.random() * 1000).toFixed(2)}M</span>
          </div>
        </div>

        {/* Chart Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setChartType('line')}
            className={`px-3 py-1 rounded text-sm ${
              chartType === 'line' ? 'bg-[#00a6ff] text-white' : 'bg-[#2a2e36] text-gray-400'
            }`}
          >
            Line
          </button>
          <button
            onClick={() => setChartType('area')}
            className={`px-3 py-1 rounded text-sm ${
              chartType === 'area' ? 'bg-[#00a6ff] text-white' : 'bg-[#2a2e36] text-gray-400'
            }`}
          >
            Area
          </button>
        </div>
      </div>

      {/* Timeframe Selector */}
      <div className="flex space-x-2 mb-4">
        {timeframes.map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              timeframe === tf
                ? 'bg-[#00a6ff] text-white'
                : 'bg-[#0b0e11] text-gray-400 hover:text-white'
            }`}
          >
            {tf}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00a6ff" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00a6ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2e36" />
              <XAxis 
                dataKey="time" 
                stroke="#666" 
                tick={{ fill: '#888' }}
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#666" 
                tick={{ fill: '#888' }}
                domain={['dataMin - 100', 'dataMax + 100']}
                style={{ fontSize: '12px' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1d24',
                  border: '1px solid #2a2e36',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#00a6ff"
                strokeWidth={2}
                fill="url(#colorPrice)"
              />
            </AreaChart>
          ) : (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2e36" />
              <XAxis 
                dataKey="time" 
                stroke="#666" 
                tick={{ fill: '#888' }}
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#666" 
                tick={{ fill: '#888' }}
                domain={['dataMin - 100', 'dataMax + 100']}
                style={{ fontSize: '12px' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1d24',
                  border: '1px solid #2a2e36',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#00a6ff"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
