"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  Menu,
  Search,
  SlidersHorizontal,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Listing() {
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
          <span className="font-bold text-xl">ChainRent</span>
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
      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-10 rounded-full border-2"
              placeholder="Search for items..."
              type="search"
            />
          </div>
          <Button variant="outline" className="rounded-full border-2 px-6">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden border-2 cursor-pointer"
            >
              <div className="relative aspect-square">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                {item.discount && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                    {item.discount}% OFF
                  </div>
                )}
                {item.seller && (
                  <div className="absolute top-2 left-2 bg-[#10B981] text-white px-2 py-1 rounded-full text-xs">
                    {item.seller}
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-medium text-sm mb-2">{item.name}</h3>
                <div className="flex justify-between items-center">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold">{item.price}</span>
                    <span className="text-sm text-gray-500">/day</span>
                  </div>
                  {item.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {item.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}

const items = [
  {
    id: 1,
    name: "Gaming PC Setup",
    price: "0.1 ETH",
    image: "https://images7.alphacoders.com/427/thumb-1920-427412.png",
    seller: "Verified",
    discount: 40,
    originalPrice: "0.15 ETH",
  },
  {
    id: 2,
    name: "Professional Camera Kit",
    price: "50 MATIC",
    image: "https://images7.alphacoders.com/427/thumb-1920-427412.png",
    seller: "Pro Seller",
  },
  {
    id: 3,
    name: "Mining Rig",
    price: "0.05 ETH",
    image: "https://images7.alphacoders.com/427/thumb-1920-427412.png",
    seller: "Verified",
    discount: 20,
    originalPrice: "0.06 ETH",
  },
  {
    id: 4,
    name: "VR Headset",
    price: "30 MATIC",
    image: "https://images7.alphacoders.com/427/thumb-1920-427412.png",
    seller: "Premium",
  },
  {
    id: 5,
    name: "Drone Kit",
    price: "0.08 ETH",
    image: "https://images7.alphacoders.com/427/thumb-1920-427412.png",
    seller: "Verified",
  },
  {
    id: 6,
    name: "Audio Equipment",
    price: "40 MATIC",
    image: "https://images7.alphacoders.com/427/thumb-1920-427412.png",
    seller: "Pro Seller",
    discount: 15,
    originalPrice: "45 MATIC",
  },
];
