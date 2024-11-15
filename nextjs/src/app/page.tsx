"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu, Wallet } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b relative">
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
        </Button>
        <Link
          className="flex items-center justify-center ml-4 lg:ml-0"
          href="#"
        >
          <span className="font-bold text-xl">ThingShare</span>
        </Link>
        <nav className="hidden lg:flex gap-6 ml-10">
          <Link className="text-sm font-medium hover:text-black/70" href="#">
            Home
          </Link>
          <Link className="text-sm font-medium hover:text-black/70" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:text-black/70" href="#">
            Blog
          </Link>
        </nav>
        <div className="ml-auto flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 rounded-full border-2"
              >
                <Wallet className="h-4 w-4" />
                Select Network
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Ethereum</DropdownMenuItem>
              <DropdownMenuItem>Polygon</DropdownMenuItem>
              <DropdownMenuItem>Arbitrum</DropdownMenuItem>
              <DropdownMenuItem>Optimism</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="rounded-full bg-black text-white hover:bg-black/90">
            Connect Wallet
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#4F46E5] via-[#10B981] to-[#3B82F6]" />
      </header>
      <main className="flex-1">
        <section className="w-full py-8 md:py-12 lg:py-18 xl:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col justify-center gap-6 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Decentralized Rental
                  <br />
                  Marketplace.
                </h1>
                <p className="mx-auto max-w-[600px] text-zinc-500 md:text-xl">
                  Rent or lend assets seamlessly across multiple blockchains.
                  Smart contract-secured transactions with cross-chain
                  compatibility.
                </p>
              </div>
              <div className="mx-auto flex flex-col gap-4 min-[400px]:flex-row mb-8">
                <Button className="rounded-full bg-black text-white hover:bg-black/90">
                  Start Renting
                </Button>
                <Button variant="outline" className="rounded-full border-2">
                  List Your Items
                </Button>
              </div>
              <div className="mx-auto grid gap-8 md:grid-cols-3 [&>*]:mx-auto">
                <div className="flex flex-col items-center space-y-2 rounded-xl bg-[#F3F4FF] p-4 min-w-[240px]">
                  <div className="text-xl font-bold">Cross Chain</div>
                  <p className="text-sm text-zinc-500">Powered by LayerZero</p>
                </div>
                <div className="flex flex-col items-center space-y-2 rounded-xl bg-[#FDB022] p-4 min-w-[240px]">
                  <div className="text-xl font-bold">Zero Knowledge Proof</div>
                  <p className="text-sm text-zinc-500">
                    Powered by World ID, Polygon zkEVM, and zkSNARK technology
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 rounded-xl border-2 p-4 min-w-[240px]">
                  <div className="text-xl font-bold">Multichain Indexing</div>
                  <p className="text-sm text-zinc-500">Powered by The Graph</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
