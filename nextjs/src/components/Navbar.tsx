import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu, Wallet } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Navbar = () => {
  return (
    <header className="fixed top-0 w-full px-4 lg:px-6 h-14 flex items-center border-b bg-white z-50">
      <Button variant="ghost" size="icon" className="lg:hidden">
        <Menu className="h-6 w-6" />
      </Button>
      <Link className="flex items-center justify-center ml-4 lg:ml-0" href="#">
        <Image
          src="/logo.png"
          alt="ThingShare"
          width={120}
          height={120}
          style={{ width: "auto", height: "auto" }}
        />
      </Link>
      {/* <nav className="hidden lg:flex gap-6 ml-10">
        <Link className="text-sm font-medium hover:text-black/70" href="#">
          Home
        </Link>
        <Link className="text-sm font-medium hover:text-black/70" href="#">
          About
        </Link>
        <Link className="text-sm font-medium hover:text-black/70" href="#">
          Blog
        </Link>
      </nav> */}
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
  );
};
