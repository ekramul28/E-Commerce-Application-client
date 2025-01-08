import Image from "next/image";
import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

type Testimonial = {
  name: string;
  review: string;
  rating: number;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    name: "John Doe",
    review: "Amazing products! The quality exceeded my expectations.",
    rating: 4.5,
    image:
      "https://res.cloudinary.com/dvtdneocc/image/upload/v1736318888/download_7_wvqp9v.jpg", // Replace with real customer image
  },
  {
    name: "Jane Smith",
    review: "Fast delivery and great customer service. Highly recommend!",
    rating: 5,
    image:
      "https://res.cloudinary.com/dvtdneocc/image/upload/v1736318889/download_5_il17ys.jpg",
  },
  {
    name: "Mark Johnson",
    review: "Good value for money. I will shop again.",
    rating: 4,
    image:
      "https://res.cloudinary.com/dvtdneocc/image/upload/v1736318889/download_6_g3urfk.jpg",
  },
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (rating >= i + 1) return <FaStar key={i} className="text-yellow-500" />;
    if (rating >= i + 0.5)
      return <FaStarHalfAlt key={i} className="text-yellow-500" />;
    return <FaRegStar key={i} className="text-yellow-500" />;
  });
  return <div className="flex">{stars}</div>;
};

const CustomerTestimonials: React.FC = () => {
  return (
    <section className=" py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">
          What Our Customers Say
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
            >
              <Image
                height={400}
                width={400}
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">{testimonial.name}</h3>
              <StarRating rating={testimonial.rating} />
              <p className="text-gray-600 mt-4">{testimonial.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerTestimonials;
