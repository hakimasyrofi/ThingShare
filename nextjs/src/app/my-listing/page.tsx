"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import Image from "next/image";

export default function MyListings() {
  return (
    <div className="min-h-screen bg-white md:p-8">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">My Listings</h1>
              <p className="text-gray-500">You have 2 active listings</p>
            </div>
            <Button
              onClick={() => (window.location.href = "/create-listing")}
              className="rounded-full bg-black text-white hover:bg-black/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Listing
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-2 overflow-hidden group">
              <div className="relative aspect-video">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Digital Camera"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">Digital Camera</h3>
                    <p className="text-sm text-gray-500">
                      Professional DSLR with lens kit
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20"
                  >
                    Listed
                  </Badge>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-2xl font-bold">50 USD</span>
                  <span className="text-gray-500">/day</span>
                </div>
              </div>
            </Card>
            <Card className="border-2 border-dashed flex flex-col items-center justify-center p-8 text-center gap-4 hover:bg-gray-50 transition-colors">
              <div className="h-12 w-12 rounded-full bg-black/5 flex items-center justify-center">
                <Plus className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium">Add New Listing</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Share your items with the community
                </p>
              </div>
              <Button
                onClick={() => (window.location.href = "/create-listing")}
                className="rounded-full bg-black text-white hover:bg-black/90"
              >
                Create Listing
              </Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
