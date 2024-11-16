/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { useState, useEffect } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { ethers } from "ethers";
import { PushAPI } from "@pushprotocol/restapi";

export default function Chat() {
  const { address, isConnected } = useAccount();
  const [currentMessage, setCurrentMessage] = useState("");
  const [userChat, setUserChat] = useState<any>(null);
  const [chatData, setChatData] = useState<any>([]);
  const [conversations, setConversations] = useState<any[]>([]);

  const { data: walletClient } = useWalletClient();
  const bobAddress = "0x622bd780C77c4d570E35aB47B829db601e606E40"; // Replace with the actual address

  useEffect(() => {
    if (walletClient && address) {
      // Initialize Push Protocol client
      const initPushClient = async () => {
        const provider = new ethers.BrowserProvider(walletClient);
        const signer = await provider.getSigner();
        const user = await PushAPI.initialize(signer);
        setUserChat(user);
        const chatHistory = await user.chat.history(bobAddress);
        console.log(chatHistory);
        setChatData(chatHistory);

        const chatList = await user.chat.list("CHATS");
        console.log(chatList);
        if (chatList && chatList.length > 0) {
          setConversations(chatList);
        } else {
          setConversations([
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
          ]);
        }
      };

      initPushClient();
    }
  }, [walletClient]);

  const handleSendMessage = async (e: any) => {
    e.preventDefault();
    if (userChat && currentMessage) {
      console.log("start message");
      // Send message using Push Protocol
      await userChat.chat.send(bobAddress, {
        type: "Text",
        content: currentMessage,
      });
      console.log("message sent");
      setCurrentMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-white md:pt-16 md:pb-8">
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
              {conversations?.length !== 0 &&
                conversations.map((conversation) => (
                  <button
                    key={conversation.chatId}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <Avatar className="h-10 w-10 border">
                      <AvatarImage
                        src={conversation.profilePicture}
                        alt={conversation.did}
                      />
                      <AvatarFallback>{conversation.did?.[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">
                          {conversation.did?.replace("eip155:", "")}
                        </span>
                        <span className="text-xs text-gray-500">
                          {conversation.intentTimestamp &&
                            new Date(
                              conversation.intentTimestamp
                            ).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">
                        {conversation.msg?.messageContent}
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
            {chatData?.length !== 0 &&
              chatData.map((chat: any, index: number) => (
                <div
                  key={index}
                  className={`flex gap-3 ${
                    chat.fromDID?.replace("eip155:", "") === address
                      ? "flex-row-reverse"
                      : ""
                  }`}
                >
                  <Avatar className="h-8 w-8 border">
                    <AvatarImage src={chat.avatar} alt={chat.fromDID} />
                    <AvatarFallback>{chat.fromDID[0]}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`group relative max-w-[80%] rounded-2xl px-4 py-2 ${
                      chat.fromDID?.replace("eip155:", "") === address
                        ? "bg-[#4F46E5] text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    <p className="text-sm">
                      <strong>From:</strong> {chat.fromDID}
                    </p>
                    <p className="text-sm">{chat.messageContent}</p>
                    <p className="text-sm">
                      <strong>Timestamp:</strong>{" "}
                      {new Date(chat.timestamp).toLocaleString()}
                    </p>
                    <span className="absolute bottom-0 text-[10px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      {new Date(chat.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
          </div>
          <div className="border-t pt-4 mt-auto">
            <form onSubmit={handleSendMessage} className="flex gap-4">
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
