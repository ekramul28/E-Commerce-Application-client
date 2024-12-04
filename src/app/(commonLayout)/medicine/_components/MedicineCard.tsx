import { TProduct } from "@/assets/AllType";
import Image from "next/image";
import Link from "next/link";
interface MedicineCardProps {
  product: TProduct;
}
const MedicineCard: React.FC<MedicineCardProps> = ({ product }) => {
  return (
    <div>
      <article className="overflow-hidden rounded-lg border-2 border-gray-100 bg-white shadow-sm w-full h-[450px]">
        <div className="flex justify-center items-center">
          <Image
            alt=""
            height={100}
            width={100}
            src={product?.image[0]}
            className="w-[200px] h-[200px] object-cover p-4"
          />
        </div>

        <div className="p-4 sm:p-6 ">
          <p className="text-lg font-bold text-gray-900">
            {product?.title.length > 50
              ? `${product.title.slice(0, 50)}...`
              : product.title}
          </p>

          <p className="text-gray-400">
            ₹ MRP <span className="line-through">{product?.price}</span>
          </p>

          <p className="font-semibold flex">
            <span
              className={`${
                product.offer ? "line-through text-gray-500" : ""
              }text-red-500`}
            >
              ( Discount: {product?.discount})%
            </span>
          </p>
          <p className="mt-3 font-medium text-red-500">
            {product?.offerDiscount
              ? `OfferDiscount: ${product?.offerDiscount}%`
              : ""}
          </p>
          <Link
            href={`/medicine/${product._id}`}
            className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
          >
            See Details
            <span
              aria-hidden="true"
              className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
            >
              &rarr;
            </span>
          </Link>
        </div>
      </article>
    </div>
  );
};

export default MedicineCard;
