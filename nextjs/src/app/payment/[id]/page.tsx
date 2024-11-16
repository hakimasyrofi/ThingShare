/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useParams } from "next/navigation";
import abiThingShare from "@/lib/abiThingShare.json";
import { useReadContract, useWriteContract } from "wagmi";
import { parseEther } from "ethers";

export default function PaymentPage() {
  const { id } = useParams();
  const { writeContractAsync } = useWriteContract();
  const wagmiContractConfig = {
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: abiThingShare,
  };
  const { data: invoiceData } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getInvoice",
    args: [id],
  });

  const handlePayment = async () => {
    await writeContractAsync({
      ...wagmiContractConfig,
      functionName: "payInvoice",
      args: [id],
      value: (invoiceData as any)?.totalPrice,
    });
  };

  if (!invoiceData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white pt-12">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-8">Payment Details</h1>
          <div className="grid lg:grid-cols-[1fr,400px] gap-8">
            <Card className="border-2 p-6 space-y-6 order-2 lg:order-1">
              <div className="pt-6 border-t space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Number of Days</span>
                  <span>{(invoiceData as any)?.dayLongRent} days</span>
                </div>
                <div className="flex justify-between font-medium pt-4 border-t">
                  <span>Total</span>
                  <span>
                    {parseEther((invoiceData as any)?.totalPrice)} ETH
                  </span>
                </div>
              </div>
              <Button
                className="w-full rounded-full bg-black text-white hover:bg-black/90"
                onClick={handlePayment}
              >
                Confirm Payment
              </Button>
            </Card>
            <Card className="border-2 p-6 space-y-6 order-1 lg:order-2">
              <div className="space-y-4">
                <h2 className="font-medium">Order Summary</h2>
                <div className="aspect-square relative rounded-lg border-2 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt="Premium Laptop Backpack"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">
                    Premium Laptop Backpack - Black Edition
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Rental Period: {(invoiceData as any)?.dayLongRent} days
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    <div className="h-3 w-3 rounded-full bg-[#10B981]" />
                    <span className="text-sm text-[#10B981]">
                      Available for pickup
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
