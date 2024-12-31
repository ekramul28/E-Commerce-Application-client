"use client";
import { useState } from "react";
import {
  useGetMyProfileQuery,
  useUpdateUserMutation,
} from "@/redux/fetures/user/userApi";
import React from "react";
import { toast } from "react-toastify";
import Image from "next/image";

const AdminProfile = () => {
  const { data, isLoading, error } = useGetMyProfileQuery(undefined);
  const [UpdateUser] = useUpdateUserMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: "",
    contactNumber: "",
    profilePhoto: null as File | null,
  });

  const profile = data?.data;

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
    if (profile) {
      setProfileForm({
        name: profile.name,
        contactNumber: profile.contactNumber || "",
        profilePhoto: null,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "profilePhoto" && files) {
      setProfileForm((prev) => ({ ...prev, profilePhoto: files[0] }));
    } else {
      setProfileForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async () => {
    try {
      // Create a JSON object with the non-file data
      const jsonData = {
        name: profileForm.name,
        contactNumber: profileForm.contactNumber,
      };

      // Create FormData
      const formData = new FormData();

      // Append the JSON object as a string under the "data" key
      formData.append("data", JSON.stringify(jsonData));

      // Append the file under the "file" key if it exists
      if (profileForm.profilePhoto) {
        formData.append("file", profileForm.profilePhoto);
      }

      // Make API call
      await UpdateUser(formData).unwrap();
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update profile:", err);
      toast.error("Error updating profile. Please try again.");
    }
  };

  if (isLoading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-lg text-red-500">
        Failed to load profile
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center space-x-6">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
          {profile?.profilePhoto ? (
            <Image
              height={200}
              width={200}
              src={`${profile.profilePhoto}`}
              alt={`${profile.name}'s profile`}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No Image
            </div>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-semibold">
            {profile?.name || "Unknown User"}
          </h1>
          <p className="text-sm text-gray-500">{profile?.email}</p>
        </div>
      </div>

      {!isEditing ? (
        <div className="mt-6">
          <h2 className="text-xl font-medium mb-4">Profile Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Role:</p>
              <p className="text-lg font-medium">{profile?.role}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Contact Number:</p>
              <p className="text-lg font-medium">
                {profile?.contactNumber || "N/A"}
              </p>
            </div>
          </div>
          <button
            onClick={handleEditToggle}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <div className="mt-6">
          <h2 className="text-xl font-medium mb-4">Edit Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Name:</label>
              <input
                type="text"
                name="name"
                value={profileForm.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Contact Number:</label>
              <input
                type="text"
                name="contactNumber"
                value={profileForm.contactNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Profile Photo:</label>
              <input
                type="file"
                name="profilePhoto"
                accept="image/*"
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <div className="mt-4 flex space-x-4">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save Changes
            </button>
            <button
              onClick={handleEditToggle}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
