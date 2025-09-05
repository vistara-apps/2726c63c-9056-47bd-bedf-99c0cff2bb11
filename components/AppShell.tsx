'use client';

import { useState, useEffect } from 'react';
import { Shield, Menu, X, Settings2, User, HelpCircle } from 'lucide-react';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name } from '@coinbase/onchainkit/identity';
import { useMiniKit } from '@coinbase/onchainkit/minikit';

interface AppShellProps {
  children: React.ReactNode;
  variant?: 'default' | 'minimal';
}

export function AppShell({ children, variant = 'default' }: AppShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setFrameReady } = useMiniKit();

  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  const navigation = [
    { name: 'Home', href: '#', current: true },
    { name: 'Resources', href: '#resources', current: false },
    { name: 'Card by', href: '#card-by', current: false },
    { name: 'Contacts', href: '#contacts', current: false },
    { name: 'Insights', href: '#insights', current: false },
    { name: 'Onboarding', href: '#onboarding', current: false },
  ];

  if (variant === 'minimal') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
        <div className="container mx-auto px-4 py-6">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Navigation Header */}
      <nav className="glass-card mx-4 mt-4 mb-6">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Shield className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-xl font-bold text-white">LexiGuard</span>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`nav-link ${item.current ? 'active' : ''}`}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Right side - Wallet and Menu */}
            <div className="flex items-center space-x-4">
              {/* Wallet Connection */}
              <div className="hidden sm:block">
                <Wallet>
                  <ConnectWallet className="btn-secondary">
                    <Name />
                  </ConnectWallet>
                </Wallet>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="btn-secondary p-2"
                >
                  {isMobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white border-opacity-20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`nav-link block ${item.current ? 'active' : ''}`}
                >
                  {item.name}
                </a>
              ))}
              
              {/* Mobile Wallet */}
              <div className="pt-4 border-t border-white border-opacity-20">
                <Wallet>
                  <ConnectWallet className="btn-secondary w-full justify-center">
                    <Name />
                  </ConnectWallet>
                </Wallet>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-8">
        {children}
      </main>

      {/* Quick Action Buttons - Mobile */}
      <div className="fixed bottom-4 right-4 flex flex-col space-y-2 md:hidden">
        <button className="btn-danger p-3 rounded-full shadow-lg">
          <Shield className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
