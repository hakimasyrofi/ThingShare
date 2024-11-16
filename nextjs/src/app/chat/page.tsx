"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, Menu, Send, Wallet } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Chat() {
  const [currentMessage, setCurrentMessage] = useState("");

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
      <div className="container mx-auto px-4 py-8 flex gap-6">
        <div className="w-80 hidden lg:block border-r pr-6">
          <div className="space-y-4">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="host">From Host</TabsTrigger>
                <TabsTrigger value="renter">From Renter</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="space-y-2">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage
                      src={conversation.avatar}
                      alt={conversation.name}
                    />
                    <AvatarFallback>{conversation.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">
                        {conversation.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {conversation.lastMessageTime}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {conversation.lastMessage}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col h-[calc(100vh-theme(spacing.14)-theme(spacing.16))]">
          <div className="border-b pb-4 mb-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border">
                <AvatarImage src="/placeholder.svg" alt="Current chat" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-medium">Gaming PC Rental Discussion</h2>
                <p className="text-sm text-gray-500">with John Doe</p>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4 pb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  message.sender === "me" ? "flex-row-reverse" : ""
                }`}
              >
                <Avatar className="h-8 w-8 border">
                  <AvatarImage src={message.avatar} alt={message.sender} />
                  <AvatarFallback>{message.sender[0]}</AvatarFallback>
                </Avatar>
                <div
                  className={`group relative max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.sender === "me"
                      ? "bg-[#4F46E5] text-white"
                      : "bg-gray-100"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <span className="absolute bottom-0 text-[10px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    {message.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 mt-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // Handle message submission
                setCurrentMessage("");
              }}
              className="flex gap-4"
            >
              <Input
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Type your message here..."
                className="rounded-full border-2"
              />
              <Button
                type="submit"
                size="icon"
                className="rounded-full bg-black text-white hover:bg-black/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const conversations = [
  {
    id: 1,
    name: "John Doe",
    avatar: "/placeholder.svg",
    lastMessage: "That sounds great! When can I pick it up?",
    lastMessageTime: "2m ago",
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "/placeholder.svg",
    lastMessage: "Is the laptop still available?",
    lastMessageTime: "1h ago",
  },
  {
    id: 3,
    name: "Mike Johnson",
    avatar: "/placeholder.svg",
    lastMessage: "Thanks for the quick response!",
    lastMessageTime: "2h ago",
  },
];

const messages = [
  {
    sender: "other",
    content:
      "Hey, I'm interested in renting your gaming PC. Is it still available?",
    time: "10:30 AM",
    avatar: "/placeholder.svg",
  },
  {
    sender: "me",
    content: "Yes, it's available! When would you like to rent it?",
    time: "10:32 AM",
    avatar: "/placeholder.svg",
  },
  {
    sender: "other",
    content:
      "I'm thinking about next weekend, from Friday to Sunday. Would that work?",
    time: "10:33 AM",
    avatar: "/placeholder.svg",
  },
  {
    sender: "me",
    content:
      "That works perfectly! The total for 3 days would be 0.3 ETH. Would you like to proceed with the booking?",
    time: "10:35 AM",
    avatar: "/placeholder.svg",
  },
  {
    sender: "other",
    content: "Yes, that sounds great! How do we handle the payment?",
    time: "10:36 AM",
    avatar: "/placeholder.svg",
  },
];
