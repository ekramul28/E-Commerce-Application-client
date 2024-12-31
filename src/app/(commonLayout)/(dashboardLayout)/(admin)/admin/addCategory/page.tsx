"use client";
import { useCreateCategoryMutation } from "@/redux/fetures/Category/categoryApi";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";

const CategoryForm = () => {
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const [offer, setOfferDiscount] = useState<number | string | undefined>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      toast.error("Name is required");
      return;
    }

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

    try {
      const result = await createCategory(formData).unwrap();
      if (result.success) {
        setName("");
        setImage(null);
        setOfferDiscount("");
        setImagePreview(null);
        toast.success("Category created successfully");
      }
    } catch (error) {
      toast.error("Failed to create category. Please try again.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className=" mx-auto p-6   rounded-lg shadow-md  mt-20">
      {/* Heading */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Add a New Category
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Fill in the details below to create a new category.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            required
          />
        </div>

        {/* Offer Discount */}
        <div>
          <label
            htmlFor="offerDiscount"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Offer (%)
          </label>
          <input
            type="number"
            id="offerDiscount"
            value={offer}
            onChange={(e) => setOfferDiscount(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          />
        </div>

        {/* Image Upload */}
        <div className="md:col-span-2">
          <label
            htmlFor="images"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Category Image
          </label>
          <input
            type="file"
            id="images"
            onChange={handleImageChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          />
          {imagePreview && (
            <div className="mt-4">
              <Image
                src={imagePreview}
                alt="Preview"
                width={200}
                height={200}
                className="rounded-md shadow-md"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isLoading
                ? "bg-gray-400 text-gray-700"
                : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
            }`}
          >
            {isLoading ? "Creating Category..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
