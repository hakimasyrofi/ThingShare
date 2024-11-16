"use client";

import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
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
                <Button
                  className="rounded-full bg-black text-white hover:bg-black/90"
                  onClick={() => (window.location.href = "/listing")}
                >
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
                <div className="flex flex-col items-center space-y-2 rounded-xl bg-[#F3F4FF] p-4 min-w-[240px]">
                  <div className="text-xl font-bold">Web3 Messaging</div>
                  <p className="text-sm text-zinc-500">
                    Powered by Push Protocol
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 rounded-xl bg-[#F3F4FF] p-4 min-w-[240px]">
                  <div className="text-xl font-bold">Blockchain Indexing</div>
                  <p className="text-sm text-zinc-500">Powered by Subgraph</p>
                </div>
                <div className="flex flex-col items-center space-y-2 rounded-xl bg-[#F3F4FF] p-4 min-w-[240px]">
                  <div className="text-xl font-bold">Decentralized Storage</div>
                  <p className="text-sm text-zinc-500">
                    Powered by IPFS and Filecoin
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 rounded-xl bg-[#F3F4FF] p-4 min-w-[240px]">
                  <div className="text-xl font-bold">Blockchain Explorer</div>
                  <p className="text-sm text-zinc-500">
                    Powered by Blockscout API
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
