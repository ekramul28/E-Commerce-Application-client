"use client";
import { useCreateCategoryMutation } from "@/redux/fetures/Category/categoryApi";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";

const CategoryForm = () => {
  const [images, setImages] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [createCategory] = useCreateCategoryMutation();

  const [offerDiscount, setOfferDiscount] = useState<
    number | string | undefined
  >();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const imageFiles = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages(imageFiles);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const oneImage = images[0];
    const upperName = name.toUpperCase();
    const formData = new FormData();
    const submitData = {
      name: upperName,
      offerDiscount,
    };

    formData.append("data", JSON.stringify(submitData));
    formData.append("file", oneImage);
    for (const [key, value] of formData.entries()) {
      console.log("from", key, value);
    }
    const result = await createCategory(formData).unwrap();
    if (result.success) {
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
          value={offerDiscount}
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
          onChange={handleImageChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        <div className="mt-2 grid grid-cols-3 gap-2">
          {images.map((image, index) => (
            <Image
              key={index}
              src={image}
              height={40}
              width={40}
              alt={`Product Image ${index + 1}`}
              className="w-full h-auto rounded-md"
            />
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="md:col-span-2">
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
