import { HealthData } from "@/assets/HealthData";
import Image from "next/image";

const HealthConcern = () => {
  return (
    <div className="my-4">
      <h1 className="text-2xl font-semibold mb-2">
        Lab Tests by Health Concern
      </h1>

      <p className="flex items-center font-normal text-base mb-4">
        Powered by{" "}
        <span className="mx-2 w-16">
          <Image
            src="https://i.ibb.co/xzg7M5N/Thyrocare.webp"
            alt="Thyrocare Logo"
            layout="intrinsic"
            width={40}
            height={40}
          />
        </span>
      </p>

      <div className="flex justify-center items-center gap-4 overflow-x-auto scrollbar-hide whitespace-nowrap">
        {HealthData.map((health, index) => (
          <div key={index} className="w-[300px] h-[300px] flex-shrink-0">
            <div className="w-full h-full rounded-lg overflow-hidden shadow-md">
              <Image
                src={health?.image || "/default-image.jpg"}
                alt={health?.title || "Health Concern Image"}
                layout="responsive"
                width={300}
                height={300}
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthConcern;
