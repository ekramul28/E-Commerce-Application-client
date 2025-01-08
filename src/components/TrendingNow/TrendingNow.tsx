import Image from "next/image";
import React from "react";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  url: string;
}

const trendingProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    image:
      "https://res.cloudinary.com/dvtdneocc/image/upload/v1736318205/images_3_rjpukw.jpg", // Replace with your product image path
    price: 89.99,
    url: "/product/wireless-headphones",
  },
  {
    id: "2",
    name: "Smartwatch",
    image:
      "https://res.cloudinary.com/dvtdneocc/image/upload/v1736317345/tv-screen-wooden-table-front-lake-with-sunset_wxwifm.jpg", // Replace with your product image path
    price: 199.99,
    url: "/product/smartwatch",
  },

  {
    id: "4",
    name: "Bluetooth Speaker",
    image:
      "https://res.cloudinary.com/dvtdneocc/image/upload/v1736317577/still-life-tech-device_oha4wo.jpg", // Replace with your product image path
    price: 59.99,
    url: "/product/bluetooth-speaker",
  },
  {
    id: "3",
    name: "4K Ultra HD TV",
    image:
      "https://res.cloudinary.com/dvtdneocc/image/upload/v1736317812/c0f32290-4766-11ee-80cd-4a0290348580_urh9uf.webp", // Replace with your product image path
    price: 499.99,
    url: "/product/4k-ultra-hd-tv",
  },
];

const TrendingNow = () => {
  return (
    <div className="my-12">
      <h2 className="text-3xl font-semibold text-center mb-8">Trending Now</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {trendingProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <Image
              height={700}
              width={700}
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-500 text-sm mt-1">{product.price}</p>
              <a
                href={product.url}
                className="inline-block mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300"
              >
                View Product
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingNow;
