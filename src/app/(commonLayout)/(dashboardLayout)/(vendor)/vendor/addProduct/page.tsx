"use client";
import { useGetCategoryQuery } from "@/redux/fetures/Category/categoryApi";
import { useCreateProductMutation } from "@/redux/fetures/Product/productApi";
import { useGetShopByVendorQuery } from "@/redux/fetures/Shop/shopApi";
import { useGetMyProfileQuery } from "@/redux/fetures/user/userApi";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ProductForm = () => {
  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [availableQuantity, setAvailableQuantity] = useState<number | string>(
    ""
  );
  const [price, setPrice] = useState<number | string>("");
  const [description, setDescription] = useState("");
  const [offer, setOffer] = useState("");
  const [discount, setDiscount] = useState<number | string | undefined>();
  const [offerDiscount, setOfferDiscount] = useState<
    number | string | undefined
  >();

  // createProduct

  const [createProduct, { isLoading }] = useCreateProductMutation();

  const { data: ProfileData } = useGetMyProfileQuery(undefined);
  const vendorId = ProfileData?.data?.id;
  // fetch CategoryData
  const { data } = useGetCategoryQuery(undefined);
  // shopId
  const { data: shopData } = useGetShopByVendorQuery(vendorId);
  console.log(shopData?.data?.id);

  // show image function
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const imageFiles = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages(imageFiles);
    }

    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImageFiles(files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const formData = new FormData();
    e.preventDefault();
    const Data = {
      name,
      categoryId: selectedCategory,
      shopId: shopData?.data?.id,
      Quantity: availableQuantity,
      price,
      offer,
      description,
      discount,
      offerDiscount,
    };
    console.log(Data);
    console.log("category", selectedCategory);

    formData.append("data", JSON.stringify(Data));

    imageFiles.forEach((file) => {
      formData.append("files", file);
    });

    const result = await createProduct(formData).unwrap();
    console.log(result);
    if (result.success) {
      toast.success("Product Create successful");
      setOfferDiscount("");
      setDiscount("");
      setDescription("");
      setPrice("");
      setSelectedCategory("");
      setName("");
      setOffer("");
      setImageFiles([]);
      setImages([]);
      setAvailableQuantity("");
      setOfferDiscount("");
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
          htmlFor="Name"
          className="block text-sm font-medium text-gray-700"
        >
          Name *
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
      {/* Category */}
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Category *
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          {data?.data?.map((category: { id: string; name: string }) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      {/* Category */}
      <div>
        <label
          htmlFor="offer"
          className="block text-sm font-medium text-gray-700"
        >
          Offer *
        </label>
        <select
          id="offer"
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        >
          <option value="" disabled>
            Select a offer
          </option>
          <option key="true" value="true">
            True
          </option>
          <option key="false" value="false">
            False
          </option>
        </select>
      </div>

      {/* Available Quantity */}
      <div>
        <label
          htmlFor="availableQuantity"
          className="block text-sm font-medium text-gray-700"
        >
          Available Quantity *
        </label>
        <input
          type="number"
          id="availableQuantity"
          value={availableQuantity}
          onChange={(e) => setAvailableQuantity(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      {/* Price */}
      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Price *
        </label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      {/* Description */}
      <div className="md:col-span-2">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description *
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          rows={4}
          required
        />
      </div>

      {/* Discount */}
      <div>
        <label
          htmlFor="discount"
          className="block text-sm font-medium text-gray-700"
        >
          Discount (%)
        </label>
        <input
          type="number"
          id="discount"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      {/* Offer Discount */}
      <div>
        <label
          htmlFor="offerDiscount"
          className="block text-sm font-medium text-gray-700"
        >
          Offer Discount (%)
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
          Product Images (multiple)*
        </label>
        <input
          type="file"
          id="images"
          multiple
          onChange={handleImageChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        <div className="mt-2 grid grid-cols-3 gap-2">
          {images?.map((image, index) => (
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
          {isLoading ? "Submitting...." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
