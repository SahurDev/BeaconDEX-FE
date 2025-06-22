"use client";

import { useState } from "react";
import Link from "next/link";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50", "bg-black/20 backdrop-blur-xl border-b border-white/10")}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="w-7 h-7 bg-gradient-to-r from-primary to-accent flex items-center justify-center mr-2">
                <span className="text-white font-bold text-m">B</span>
              </div>
              <span className="text-base font-bold gradient-text">
                Beacon DEX
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Button variant="ghost" asChild className="hover:bg-transparent transition-all duration-500">
              <Link href="/swap" className={cn("bg-gradient-to-r from-gray-300 to-gray-300 bg-clip-text text-transparent px-6 py-4 text-xl font-black tracking-wide transition-all duration-500", "hover:from-primary hover:to-secondary")}>
                Swap
              </Link>
            </Button>
            <Button variant="ghost" asChild className="hover:bg-transparent transition-all duration-500">
              <Link href="/liquidity" className={cn("bg-gradient-to-r from-gray-300 to-gray-300 bg-clip-text text-transparent px-6 py-4 text-xl font-black tracking-wide transition-all duration-500", "hover:from-primary hover:to-secondary")}>
                Liquidity
              </Link>
            </Button>
            <Button variant="ghost" asChild className="hover:bg-transparent transition-all duration-500">
              <Link href="/pools" className={cn("bg-gradient-to-r from-gray-300 to-gray-300 bg-clip-text text-transparent px-6 py-4 text-xl font-black tracking-wide transition-all duration-500", "hover:from-primary hover:to-secondary")}>
                Pools
              </Link>
            </Button>
          </nav>

          {/* Connect Wallet Button */}
          <div className="hidden md:block">
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                mounted,
              }) => {
                const ready = mounted;
                const connected = ready && account && chain;

                return (
                  <div
                    {...(!ready && {
                      'aria-hidden': true,
                      'style': {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <Button onClick={openConnectModal} variant="gradient" className="flex items-center font-semibold">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                              />
                            </svg>
                            Connect Wallet
                          </Button>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <Button onClick={openChainModal} variant="gradient">
                            Wrong network
                          </Button>
                        );
                      }

                      return (
                        <div className="flex items-center space-x-3">
                          <Button
                            onClick={openChainModal}
                            variant="outline"
                            className={cn("px-3 py-2 bg-black/20 backdrop-blur-xl border-white/20 hover:bg-white/20 transition-colors flex items-center space-x-2")}
                          >
                            {chain.hasIcon && (
                              <div
                                style={{
                                  background: chain.iconBackground,
                                  width: 20,
                                  height: 20,
                                  borderRadius: 999,
                                  overflow: 'hidden',
                                  marginRight: 4,
                                }}
                              >
                                {chain.iconUrl && (
                                  <img
                                    alt={chain.name ?? 'Chain icon'}
                                    src={chain.iconUrl}
                                    style={{ width: 20, height: 20 }}
                                  />
                                )}
                              </div>
                            )}
                            <span className="text-white text-sm">{chain.name}</span>
                          </Button>

                          <Button onClick={openAccountModal} variant="gradient">
                            {account.displayName}
                            {account.displayBalance
                              ? ` (${account.displayBalance})`
                              : ''}
                          </Button>
                        </div>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              variant="ghost"
              size="icon"
              className="text-white"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className={cn("md:hidden", "bg-black/20 backdrop-blur-xl border-t border-white/10")}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Button variant="ghost" asChild className="w-full justify-start hover:bg-transparent transition-all duration-500">
              <Link href="/swap" className={cn("bg-gradient-to-r from-gray-300 to-gray-300 bg-clip-text text-transparent block px-6 py-4 text-xl font-black tracking-wide transition-all duration-500", "hover:from-primary hover:to-secondary")}>
                Swap
              </Link>
            </Button>
            <Button variant="ghost" asChild className="w-full justify-start hover:bg-transparent transition-all duration-500">
              <Link href="/liquidity" className={cn("bg-gradient-to-r from-gray-300 to-gray-300 bg-clip-text text-transparent block px-6 py-4 text-xl font-black tracking-wide transition-all duration-500", "hover:from-primary hover:to-secondary")}>
                Liquidity
              </Link>
            </Button>
            <Button variant="ghost" asChild className="w-full justify-start hover:bg-transparent transition-all duration-500">
              <Link href="/pools" className={cn("bg-gradient-to-r from-gray-300 to-gray-300 bg-clip-text text-transparent block px-6 py-4 text-xl font-black tracking-wide transition-all duration-500", "hover:from-primary hover:to-secondary")}>
                Pools
              </Link>
            </Button>
            <div className="px-3 py-2">
              <ConnectButton />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
