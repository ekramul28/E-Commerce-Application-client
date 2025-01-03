"use client";

import { useCreateShopMutation } from "@/redux/fetures/Shop/shopApi";
import { useGetMyProfileQuery } from "@/redux/fetures/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";

const CreateShop = () => {
  // Form state management
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [createShop, { isLoading }] = useCreateShopMutation();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data } = useGetMyProfileQuery(undefined);
  const vendorId = data?.data?.id;
  if (!vendorId) {
    toast.error("fist login");
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    const data = {
      name: title,
      description,
      vendorId,
    };
    formData.append("data", JSON.stringify(data));

    if (image) {
      formData.append("file", image);
    }

    try {
      const shop = await createShop(formData).unwrap();

      if (shop.success) {
        toast.success("Shop created successfully!");
        setTitle("");
        setDescription("");
        setImage(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    } catch (error: any) {
      console.error("Error creating shop:", error);
      const message = error.data?.message || "something went wrong";
      toast.error(message);
    }
  };

  return (
    <div className="border-2  mx-auto p-4 bg-white rounded-lg shadow-md mt-20">
      <h2 className="text-xl font-bold mb-6">Create Shop</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Title */}
        <div>
          <label
            htmlFor="Name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Image */}
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            accept="image/*"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isLoading ? "submitting" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateShop;
