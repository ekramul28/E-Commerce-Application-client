"use client";
import { useCreateCategoryMutation } from "@/redux/fetures/Category/categoryApi";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";

const CategoryForm = () => {
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  console.log("image", image);
  const [offer, setOfferDiscount] = useState<number | string | undefined>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const upperName = name.toUpperCase();
    const formData = new FormData();
    const submitData = {
      name: upperName,
      offer,
    };

    formData.append("data", JSON.stringify(submitData));
    if (image) {
      formData.append("file", image);
    }

    for (const [key, value] of formData.entries()) {
      console.log("from", key, value);
    }
    const result = await createCategory(formData).unwrap();
    if (result.success) {
      setName("");
      setImage(null);
      setOfferDiscount("");
      toast.success("Category created successfully");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
    >
      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      {/* Offer Discount */}
      <div>
        <label
          htmlFor="offerDiscount"
          className="block text-sm font-medium text-gray-700"
        >
          Offer (%)
        </label>
        <input
          type="number"
          id="offerDiscount"
          value={offer}
          onChange={(e) => setOfferDiscount(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      {/* Image Upload */}
      <div className="md:col-span-2">
        <label
          htmlFor="images"
          className="block text-sm font-medium text-gray-700"
        >
          Product Images
        </label>
        <input
          type="file"
          id="images"
          multiple
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      {/* Submit Button */}
      <div className="md:col-span-2">
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isLoading ? "Loading...." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
