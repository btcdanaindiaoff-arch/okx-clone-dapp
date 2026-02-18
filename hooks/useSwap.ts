import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'viem';

const UNISWAP_V2_ROUTER = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';

const ROUTER_ABI = [
  {
    inputs: [
      { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
      { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
      { internalType: 'address[]', name: 'path', type: 'address[]' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
    ],
    name: 'swapExactTokensForTokens',
    outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
      { internalType: 'address[]', name: 'path', type: 'address[]' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
    ],
    name: 'swapExactETHForTokens',
    outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }],
    stateMutability: 'payable',
    type: 'function',
  },
] as const;

const ERC20_ABI = [
  {
    constant: false,
    inputs: [
      { name: '_spender', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    type: 'function',
  },
] as const;

interface SwapParams {
  fromToken: string;
  toToken: string;
  amount: string;
  slippage: number;
  decimals: number;
}

export function useSwap() {
  const { address } = useAccount();
  const [isApproving, setIsApproving] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);

  const { writeContract: approveToken } = useWriteContract();
  const { writeContract: executeSwap } = useWriteContract();

  const approve = async (tokenAddress: string, amount: string, decimals: number) => {
    if (!address) throw new Error('Wallet not connected');

    setIsApproving(true);
    try {
      const amountInWei = parseUnits(amount, decimals);
      
      await approveToken({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [UNISWAP_V2_ROUTER as `0x${string}`, amountInWei],
      });

      setIsApproving(false);
      return true;
    } catch (error) {
      console.error('Approval failed:', error);
      setIsApproving(false);
      throw error;
    }
  };

  const swap = async (params: SwapParams) => {
    if (!address) throw new Error('Wallet not connected');

    setIsSwapping(true);
    try {
      const { fromToken, toToken, amount, slippage, decimals } = params;
      const amountIn = parseUnits(amount, decimals);
      const amountOutMin = BigInt(Math.floor(Number(amountIn) * (1 - slippage / 100)));
      const deadline = BigInt(Math.floor(Date.now() / 1000) + 60 * 20); // 20 minutes

      await executeSwap({
        address: UNISWAP_V2_ROUTER as `0x${string}`,
        abi: ROUTER_ABI,
        functionName: 'swapExactTokensForTokens',
        args: [
          amountIn,
          amountOutMin,
          [fromToken as `0x${string}`, toToken as `0x${string}`],
          address as `0x${string}`,
          deadline,
        ],
      });

      setIsSwapping(false);
      return true;
    } catch (error) {
      console.error('Swap failed:', error);
      setIsSwapping(false);
      throw error;
    }
  };

  const swapETHForTokens = async (
    toToken: string,
    ethAmount: string,
    slippage: number
  ) => {
    if (!address) throw new Error('Wallet not connected');

    setIsSwapping(true);
    try {
      const amountIn = parseUnits(ethAmount, 18);
      const amountOutMin = BigInt(Math.floor(Number(amountIn) * (1 - slippage / 100)));
      const deadline = BigInt(Math.floor(Date.now() / 1000) + 60 * 20);

      await executeSwap({
        address: UNISWAP_V2_ROUTER as `0x${string}`,
        abi: ROUTER_ABI,
        functionName: 'swapExactETHForTokens',
        args: [
          amountOutMin,
          ['0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' as `0x${string}`, toToken as `0x${string}`],
          address as `0x${string}`,
          deadline,
        ],
        value: amountIn,
      });

      setIsSwapping(false);
      return true;
    } catch (error) {
      console.error('Swap failed:', error);
      setIsSwapping(false);
      throw error;
    }
  };

  return {
    approve,
    swap,
    swapETHForTokens,
    isApproving,
    isSwapping,
    isLoading: isApproving || isSwapping,
  };
}

// Hook for estimating swap output
export function useSwapQuote(
  fromToken: string,
  toToken: string,
  amount: string,
  decimals: number
) {
  const [quote, setQuote] = useState<{
    outputAmount: string;
    priceImpact: number;
    minimumReceived: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getQuote = async () => {
    if (!amount || parseFloat(amount) === 0) {
      setQuote(null);
      return;
    }

    setIsLoading(true);
    try {
      // Mock quote calculation (replace with actual DEX quote in production)
      const inputAmount = parseFloat(amount);
      const outputAmount = inputAmount * 0.95; // Mock 5% slippage
      const priceImpact = 0.5;
      const minimumReceived = outputAmount * 0.99;

      setQuote({
        outputAmount: outputAmount.toFixed(6),
        priceImpact,
        minimumReceived: minimumReceived.toFixed(6),
      });
    } catch (error) {
      console.error('Failed to get quote:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { quote, isLoading, getQuote };
}
