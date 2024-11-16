"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import { getListing } from "@/lib/subgraph";
import { Item } from "@/interface/item.interface";

export default function Listing() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getListing();
        setItems(data.items);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="min-h-screen bg-white">
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
                  src={item.metadata.image.replace(
                    "ipfs://",
                    "https://ipfs.io/ipfs/"
                  )}
                  alt={item.metadata.name}
                  fill
                  className="object-cover"
                />
                {/* {item.discount && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                    {item.discount}% OFF
                  </div>
                )} */}
                {item.owner && (
                  <div className="absolute top-2 left-2 bg-[#10B981] text-white px-2 py-1 rounded-full text-xs">
                    {`${item.owner.slice(0, 6)}...${item.owner.slice(-4)}`}
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-medium text-sm mb-2">
                  {item.metadata.name}
                </h3>
                <div className="flex justify-between items-center">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold">{item.price}</span>
                    <span className="text-sm text-gray-500">/day</span>
                  </div>
                  {/* {item.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {item.originalPrice}
                    </span>
                  )} */}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
