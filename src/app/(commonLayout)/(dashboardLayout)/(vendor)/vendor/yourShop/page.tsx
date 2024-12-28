"use client";

import React, { useState } from "react";
import { useGetShopByVendorQuery } from "@/redux/fetures/Shop/shopApi";
import { useGetMyProfileQuery } from "@/redux/fetures/user/userApi";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/Dialog";
import { useRouter } from "next/navigation";

const MyShop = () => {
  const router = useRouter(); // Use Next.js router
  const { data: user } = useGetMyProfileQuery(undefined);
  const userId = user?.data?.id;
  console.log(userId);
  const { data: shop, isLoading, isError } = useGetShopByVendorQuery(userId);
  console.log(shop);
  const [editMode, setEditMode] = useState(false);
  const [shopDetails, setShopDetails] = useState({
    name: shop?.data?.name || "",
    description: shop?.data?.description || "",
    logo: shop?.data?.logo || "",
  });

  const handleEditShop = () => {
    console.log("Updated Shop Details:", shopDetails);
    setEditMode(false);
  };

  if (isLoading) return <p>Loading shop details...</p>;
  if (isError) return <p>Failed to load shop details. Please try again.</p>;

  return (
    <div className="container mx-auto p-4">
      {/* Shop Details Section */}
      <Card className="mb-4">
        <CardHeader>
          <h2 className="text-xl font-semibold">My Shop</h2>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Image
              height={100}
              width={100}
              src={shop?.data?.logo}
              alt="Shop Logo"
              className="w-24 h-24 rounded-md object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold">{shop?.data?.name}</h3>
              <p>{shop?.data?.description}</p>
              <Button className="mt-2" onClick={() => setEditMode(true)}>
                Edit Shop Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Section */}
      <div className="flex gap-4 mb-4">
        <Button onClick={() => router.push("/shop/products")}>
          Manage Products
        </Button>
        <Button onClick={() => router.push("/shop/orders")}>View Orders</Button>
        <Button onClick={() => router.push("/shop/reviews")}>
          See Reviews
        </Button>
      </div>

      {/* Products Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Products</h2>
        {shop?.data?.products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {shop?.data?.products.map((product: any) => (
              <Card key={product?.id}>
                <CardHeader>
                  <Image
                    height={100}
                    width={100}
                    src={product?.images[0]}
                    alt={product?.name}
                    className="w-full h-48 object-cover rounded-t-md"
                  />
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-semibold">{product?.name}</h3>
                  <p className="text-sm text-gray-600">
                    {product?.description}
                  </p>
                  <p className="font-bold">${product?.price}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="secondary"
                    onClick={() =>
                      router.push(`/shop/products/edit/${product?.id}`)
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => console.log(`Delete product ${product.id}`)}
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <p>No products found. Add your first product!</p>
        )}
      </div>

      {/* Edit Shop Dialog */}
      {editMode && (
        <Dialog open={editMode} onOpenChange={setEditMode}>
          <DialogContent>
            <DialogHeader>Edit Shop Details</DialogHeader>
            <div className="space-y-4">
              <Input
                label="Shop Name"
                value={shopDetails.name}
                onChange={(e) =>
                  setShopDetails((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <Input
                label="Description"
                value={shopDetails.description}
                onChange={(e) =>
                  setShopDetails((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
              <Input
                label="Logo URL"
                value={shopDetails.logo}
                onChange={(e) =>
                  setShopDetails((prev) => ({ ...prev, logo: e.target.value }))
                }
              />
              <Button className="w-full" onClick={handleEditShop}>
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default MyShop;
