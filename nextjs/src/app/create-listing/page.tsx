"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon, Upload, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

export default function CreateListing() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: null as File | null,
    preview: null as string | null,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    const newPreview = file ? URL.createObjectURL(file) : null;
    setFormData((prevData) => ({
      ...prevData,
      image: file,
      preview: newPreview,
    }));
  };

  const removeImage = () => {
    setFormData((prevData) => ({
      ...prevData,
      image: null,
      preview: null,
    }));
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">List Your Item</h1>
            <p className="text-gray-500">
              Fill in the details below to list your item for rent
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Card className="p-6 border-2">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Item Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter the name of your item"
                    className="rounded-lg border-2"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your item (condition, features, etc.)"
                    className="min-h-[100px] rounded-lg border-2"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Daily Price (ETH)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.001"
                    placeholder="0.01"
                    className="rounded-lg border-2"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Image</Label>
                  <div className="grid grid-cols-1 gap-4">
                    {formData.preview && (
                      <div className="relative aspect-square rounded-lg border-2 overflow-hidden group">
                        <Image
                          src={formData.preview}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                    {!formData.preview && (
                      <div
                        className="aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer relative"
                        onClick={handleClick}
                      >
                        <Input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          onChange={handleImageChange}
                          ref={fileInputRef}
                        />
                        <ImageIcon className="h-8 w-8 text-gray-400" />
                        <span className="text-sm text-gray-500">Add Image</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">Upload an image</p>
                </div>
              </div>
            </Card>
            <Button
              type="submit"
              className="w-full rounded-full bg-black text-white hover:bg-black/90"
            >
              <Upload className="h-4 w-4 mr-2" />
              List Item
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
