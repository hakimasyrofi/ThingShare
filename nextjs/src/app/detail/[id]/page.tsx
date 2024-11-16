"use client";

import { Button } from "@/components/ui/button";
import RangeCalendar from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays, differenceInDays } from "date-fns";

export default function Detail() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  });

  const rentalDays =
    dateRange?.from && dateRange?.to
      ? differenceInDays(dateRange.to, dateRange.from) + 1
      : 0;

  return (
    <div className="min-h-screen bg-white md:p-8">
      <div className="flex-1">
        <main className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-[1fr,400px] gap-8">
            <div className="space-y-6">
              <Card className="overflow-hidden border-2 p-2">
                <div className="relative aspect-square">
                  <Image
                    src="/placeholder.svg?height=600&width=600"
                    alt="Premium Laptop Backpack"
                    fill
                    className="object-contain"
                  />
                </div>
              </Card>
              <div className="space-y-4">
                <h1 className="text-2xl font-bold">
                  Premium Laptop Backpack - Black Edition
                </h1>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">0.01 ETH</span>
                  <span className="text-gray-500">/day</span>
                </div>
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                    <TabsTrigger
                      value="details"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent"
                    >
                      Details
                    </TabsTrigger>
                    <TabsTrigger
                      value="reviews"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent"
                    >
                      Reviews
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="details"
                    className="border rounded-lg mt-4 p-4"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Hosted by:</span>
                        <code className="text-sm">0x8237837182128921</code>
                      </div>
                      <div className="space-y-2">
                        <span className="font-medium">Description</span>
                        <p className="text-gray-600">
                          Premium laptop backpack with multiple compartments and
                          padded laptop sleeve. Perfect for daily use or travel.
                          Includes water bottle holders and front organizer
                          pocket.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent
                    value="reviews"
                    className="border rounded-lg mt-4 p-4"
                  >
                    <p className="text-gray-600">No reviews yet.</p>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            <Card className="border-2 p-6 h-fit space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Select Rental Dates</h3>
                <RangeCalendar
                  selected={dateRange}
                  onSelect={setDateRange}
                  className="rounded-lg border w-full"
                  numberOfMonths={1}
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Rental Period:</span>
                  <span>
                    {rentalDays} day{rentalDays !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Price:</span>
                  <span className="font-bold">
                    {(0.01 * rentalDays).toFixed(3)} ETH
                  </span>
                </div>
                <Button className="w-full rounded-full bg-black text-white hover:bg-black/90">
                  Rent Now
                </Button>
                <Button className="w-full rounded-full" variant="outline">
                  Make an Offer
                </Button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
