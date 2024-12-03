import { HealthData } from "@/assets/HealthData";
import Image from "next/image";

const HealthConcern = () => {
  return (
    <div className="my-4">
      <h1 className="text-[26px] font-semibold ">
        Lab Tests by Health Concern
      </h1>
      <p className="flex items-center font-normal text-base mb-2">
        Powered by{" "}
        <span className="my-2 w-20 ">
          {" "}
          <Image
            src="https://i.ibb.co/xzg7M5N/Thyrocare.webp"
            alt="Thyrocare Image"
            layout="responsive"
            width={40}
            height={40}
          />
        </span>
      </p>
      <div className="flex justify-center items-center gap-4 overflow-x-auto scrollbar-hide whitespace-nowrap">
        {HealthData.map((health, index) => (
          <div key={index}>
            <div className="w-full h-full">
              <Image
                src={health?.image}
                alt={health?.title}
                layout="responsive"
                width={300}
                height={300}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthConcern;
