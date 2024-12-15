"use client";

import { useCreateUserMutation } from "@/redux/fetures/Auth/authApi";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify"; // For better alerts, ensure this package is installed.

interface FormData {
  name: string;
  email: string;
  profilePhoto?: FileList;
  contactNumber?: string;
  password: string;
}

const InputForm: React.FC = () => {
  const [registerError, setRegisterError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [createUser, { isLoading }] = useCreateUserMutation();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const formData = new FormData();
    console.log("this is data", data);
    // Append form data

    const VendorData = {
      password: data.password,
      customer: {
        name: data.name,
        email: data.email,
        contactNumber: data.contactNumber,
      },
    };

    formData.append("data", JSON.stringify(VendorData));

    const profilePhotoFile = data.profilePhoto?.[0];
    if (profilePhotoFile) {
      formData.append("file", profilePhotoFile);
    }

    try {
      // Call the mutation
      const result = await createUser(formData).unwrap();
      console.log(result);
      reset();
      toast.success(" Created successful");
    } catch (err) {
      console.error("Error creating vendor:", err);
      toast.error("An error occurred while submitting the form.");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        Register as a Customer
      </h2>

      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          {...register("name", { required: "Name is required" })}
          className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
          className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register("password", { required: "Password is required" })}
          className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Contact Number Field */}
      <div>
        <label
          htmlFor="contactNumber"
          className="block text-sm font-medium text-gray-700"
        >
          Contact Number
        </label>
        <input
          id="contactNumber"
          type="text"
          {...register("contactNumber")}
          className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Phone number"
        />
      </div>

      {/* Profile Photo Field */}
      <div>
        <label
          htmlFor="profilePhoto"
          className="block text-sm font-medium text-gray-700"
        >
          Profile Photo
        </label>
        <input
          id="profilePhoto"
          type="file"
          accept="image/*"
          {...register("profilePhoto")}
          className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      {/* Error Message */}
      {registerError && (
        <p className="text-red-500 text-sm mt-2">{registerError}</p>
      )}

      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default InputForm;
