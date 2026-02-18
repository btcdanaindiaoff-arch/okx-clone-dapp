import { useState, useEffect } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { formatUnits } from 'viem';

const ERC20_ABI = [
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    type: 'function',
  },
] as const;

export function useTokenBalance(tokenAddress: string, userAddress?: string) {
  const { address } = useAccount();
  const targetAddress = userAddress || address;

  const { data: balance, isError, isLoading, refetch } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: targetAddress ? [targetAddress as `0x${string}`] : undefined,
  });

  const { data: decimals } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: ERC20_ABI,
    functionName: 'decimals',
  });

  const formatted = balance && decimals 
    ? formatUnits(balance as bigint, decimals as number)
    : '0.00';

  return {
    balance: balance as bigint | undefined,
    formatted,
    decimals: decimals as number | undefined,
    isLoading,
    isError,
    refetch,
  };
}
