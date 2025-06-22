'use client';

import { Button } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/20 filter blur-3xl"></div>
        <div className="absolute top-1/2 right-1/2 w-64 h-64 rounded-full bg-secondary/20 filter blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className={cn("bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent")}>Decentralized Trading</span>
          <br />
          <span className={cn("drop-shadow-[0_0_20px_rgba(115,103,240,0.5)]")}>Reimagined</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-300">
          Trade, earn, and build on the most advanced decentralized exchange with 
          lightning-fast transactions and minimal fees.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="gradient" size="lg" className="px-8 py-4 text-lg">
            Launch App
          </Button>
          <Button variant="outline" size="lg" className={cn("px-8 py-4 text-lg text-white font-medium", "bg-black/20 backdrop-blur-xl border-white/20 hover:bg-white/10 transition-all")}>
            Learn More
          </Button>
        </div>
        
        <div className="mt-16 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="text-center">
            <div className={cn("text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent")}>$1.2B+</div>
            <div className="text-sm text-gray-400">Total Volume</div>
          </div>
          <div className="text-center">
            <div className={cn("text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent")}>230K+</div>
            <div className="text-sm text-gray-400">Active Users</div>
          </div>
          <div className="text-center">
            <div className={cn("text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent")}>50+</div>
            <div className="text-sm text-gray-400">Supported Chains</div>
          </div>
        </div>
      </div>
    </section>
  );
}