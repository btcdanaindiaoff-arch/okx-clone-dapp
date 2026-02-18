'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Wallet, ChevronDown, Copy, ExternalLink, LogOut } from 'lucide-react';

export function WalletButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="bg-[#00a6ff] hover:bg-[#0090e0] text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                  >
                    <Wallet className="w-4 h-4" />
                    <span>Connect Wallet</span>
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <div className="flex items-center space-x-2">
                  {/* Chain Selector */}
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="hidden sm:flex items-center space-x-2 bg-[#1f2329] hover:bg-[#2a2e36] px-3 py-2 rounded-lg transition-colors"
                  >
                    {chain.hasIcon && (
                      <div className="w-5 h-5">
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            className="w-5 h-5 rounded-full"
                          />
                        )}
                      </div>
                    )}
                    <span className="text-sm font-medium text-white">
                      {chain.name}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>

                  {/* Account Button */}
                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="flex items-center space-x-2 bg-[#1f2329] hover:bg-[#2a2e36] px-4 py-2 rounded-lg transition-colors"
                  >
                    <Wallet className="w-4 h-4 text-[#00a6ff]" />
                    <span className="text-sm font-medium text-white">
                      {account.displayName}
                    </span>
                    {account.displayBalance && (
                      <span className="text-sm text-gray-400 hidden sm:block">
                        {account.displayBalance}
                      </span>
                    )}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
