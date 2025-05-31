"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
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
          <nav className="hidden md:flex space-x-12">
            <Link
              href="/swap"
              className="text-gray-300 hover:text-white hover:glow-text px-3 py-2 text-base font-bold transition-all"
            >
              Swap
            </Link>
            <Link
              href="/liquidity"
              className="text-gray-300 hover:text-white hover:glow-text px-3 py-2 text-base font-bold transition-all"
            >
              Liquidity
            </Link>
            <Link
              href="/pools"
              className="text-gray-300 hover:text-white hover:glow-text px-3 py-2 text-base font-bold transition-all"
            >
              Pools
            </Link>
          </nav>

          {/* Connect Wallet Button */}
          <div className="hidden md:block">
            <button
              onClick={() => setIsWalletOpen(!isWalletOpen)}
              className="btn-primary flex items-center"
            >
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
            </button>

            {/* Wallet Connect Dropdown */}
            {isWalletOpen && (
              <div className="absolute right-0 mt-2 w-56 glass p-4 shadow-lg">
                <div className="text-sm text-white font-medium mb-3">
                  Connect with:
                </div>
                <div className="space-y-2">
                  <button className="w-full text-left px-4 py-2 hover:bg-white/10 text-sm transition-colors">
                    MetaMask
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-white/10 text-sm transition-colors">
                    WalletConnect
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-white/10 text-sm transition-colors">
                    Coinbase Wallet
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 text-white"
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
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/swap"
              className="text-gray-300 hover:text-white block px-3 py-2 text-base font-bold"
            >
              SWAP
            </Link>
            <Link
              href="/liquidity"
              className="text-gray-300 hover:text-white block px-3 py-2 text-base font-bold"
            >
              LIQUIDITY
            </Link>
            <Link
              href="/pools"
              className="text-gray-300 hover:text-white block px-3 py-2 text-base font-bold"
            >
              POOLS
            </Link>
            <button
              onClick={() => setIsWalletOpen(!isWalletOpen)}
              className="w-full text-left flex items-center text-gray-300 hover:text-white px-3 py-2 text-base font-medium"
            >
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
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
