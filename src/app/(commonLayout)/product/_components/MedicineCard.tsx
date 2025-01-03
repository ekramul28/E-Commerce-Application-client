import { TProduct } from "@/assets/AllType";
import Button from "@/components/Shared/Button";
import { useAddCartMutation } from "@/redux/fetures/cart/cartApi";
import {
  useFollowMutation,
  useGetIsFollowQuery,
  useUnFollowMutation,
} from "@/redux/fetures/follow&unFollow/followApi";
import { useGetMyProfileQuery } from "@/redux/fetures/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

interface MedicineCardProps {
  product: TProduct;
}

const MedicineCard: React.FC<MedicineCardProps> = ({ product }) => {
  const { data: profileData, isLoading: isProfileLoading } =
    useGetMyProfileQuery(undefined);
  const customerId = profileData?.data?.id;

  const followData = { shopId: product.shop.id, customerId };
  const { data: isFollowingData, isLoading: isFollowLoading } =
    useGetIsFollowQuery(followData);
  const follow = isFollowingData?.data?.isFollowing;

  const [addCart] = useAddCartMutation();
  const user = useAppSelector((state: RootState) => state.auth.user);

  const [followShop] = useFollowMutation();
  const [unFollowShop] = useUnFollowMutation();

  const handleAddToCart = async (id: string) => {
    const data = { productId: id, quantity: 1, email: user?.email };
    try {
      const result = await addCart(data).unwrap();
      if (result?.success) {
        toast.success("Product Added Successfully");
      }
    } catch (error) {
      toast.error("Error adding product to cart");
    }
  };

  const handleFollow = async () => {
    try {
      const result = await followShop(followData).unwrap();
      if (result.success) {
        toast.success("Shop followed successfully");
      }
    } catch (error) {
      toast.error("Error following shop");
    }
  };

  const handleUnFollow = async () => {
    try {
      const result = await unFollowShop(followData).unwrap();
      if (result.success) {
        toast.error("Shop unfollowed successfully");
      }
    } catch (error) {
      toast.error("Error unfollowing shop");
    }
  };

  if (isProfileLoading || isFollowLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-4">
      <article className="overflow-hidden rounded-lg border-2 border-gray-100 bg-white shadow-sm w-full h-[550px]">
        {/* Header */}
        <div className="flex gap-1 items-center justify-between p-4">
          <div className="flex gap-2 items-center">
            <Link href={`shoppage/${product?.shop?.vendorId}`}>
              <Image
                alt={product?.shop?.name}
                height={40}
                width={40}
                src={product?.shop?.logo}
                className="w-[50px] h-[50px] rounded-full object-cover cursor-pointer"
              />
            </Link>
            <Link href={`shoppage/${product?.shop?.vendorId}`}>
              <h1 className="font-bold text-sm cursor-pointer hover:underline">
                {product?.shop?.name}
              </h1>
            </Link>
          </div>

          {/* Follow/Unfollow Button */}
          <div>
            <Button
              onClick={follow ? handleUnFollow : handleFollow}
              className={`p-2 font-semibold ${
                follow ? "bg-red-500" : "bg-blue-500"
              } text-white`}
            >
              {follow ? "UnFollow" : "Follow"}
            </Button>
          </div>
        </div>

        {/* Product Image */}
        <div className="flex justify-center items-center">
          <Image
            alt={product?.name}
            height={100}
            width={100}
            src={product?.images[0]}
            className="w-full h-[200px]  p-4"
          />
        </div>

        {/* Product Details */}
        <div className="p-4 sm:p-6">
          <p className="text-lg font-bold text-gray-900">
            {product?.name?.length > 50
              ? `${product.name.slice(0, 30)}...`
              : product.name}
          </p>

          <p className="text-gray-400">
            ₹ Price <span>{product?.price}</span>
          </p>

          <p className="font-semibold flex">
            <span
              className={`${
                product.offer ? "line-through text-gray-500" : ""
              } text-red-500`}
            >
              ( Discount: {product?.discount})%
            </span>
          </p>

          <p className="mt-3 font-medium text-red-500">
            {product?.offerDiscount
              ? `OfferDiscount: ${product?.offerDiscount}%`
              : ""}
          </p>

          {/* Offer Price */}
          {product?.offer && (
            <div className="font-bold">
              <dt className="inline">Offer Price:</dt>
              <dd className="inline">
                {(Number(product?.offerDiscount) * Number(product?.price)) /
                  100 -
                  product?.price}
              </dd>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between mt-2">
            <div>
              <Link href={`/product/${product.id}`}>
                <Button className="text-white bg-blue-500 flex p-2 gap-2 font-semibold">
                  Details
                  <span
                    aria-hidden="true"
                    className="block transition-all group-hover:ms-0.5 rtl:rotate-180 font-semibold "
                  >
                    &rarr;
                  </span>
                </Button>
              </Link>
            </div>
            <div>
              <Button
                onClick={() => handleAddToCart(product.id)}
                className="p-2 text-white bg-blue-500 flex gap-2 font-semibold"
              >
                Add Cart
                <svg
                  className="md:h-6 md:w-6 h-4 w-4"
                  data-slot="icon"
                  fill="none"
                  stroke-width="1.5"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  ></path>
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default MedicineCard;
