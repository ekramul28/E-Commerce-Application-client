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
import { FaCartPlus } from "react-icons/fa";

interface MedicineCardProps {
  product: TProduct;
}

const MedicineCard: React.FC<MedicineCardProps> = ({ product }) => {
  console.log(product);

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
      <article className="overflow-hidden rounded-lg border-2 border-gray-100 bg-white shadow-sm w-full md:h-[560px] lg:h-[520px]">
        {/* Header */}
        <div className="flex gap-1 items-center justify-between p-4">
          <div className="flex gap-2 items-center">
            <Link href={`/shoppage/${product?.shop?.vendorId}`}>
              <Image
                alt={product?.shop?.name}
                height={40}
                width={40}
                src={product?.shop?.logo}
                className="w-[50px] h-[50px] rounded-full object-cover cursor-pointer"
              />
            </Link>
            <Link href={`/shoppage/${product?.shop?.vendorId}`}>
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
            height={500}
            width={500}
            src={product?.images[0]}
            className="w-full h-[200px] p-4"
          />
        </div>

        {/* Product Details */}
        <div className="p-2">
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
              ( Discount: {product?.discount}%)
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
          <div className="flex justify-center mt-2 items-center">
            <div className="flex-1">
              <Link href={`/product/${product.id}`}>
                <Button className="text-white bg-blue-500 flex p-2 gap-2 font-semibold justify-center">
                  Details
                  <span
                    aria-hidden="true"
                    className="block transition-all group-hover:ms-0.5 rtl:rotate-180 font-semibold"
                  >
                    &rarr;
                  </span>
                </Button>
              </Link>
            </div>
            <div className="flex-1 ">
              <Button
                onClick={() => handleAddToCart(product.id)}
                className="p-2 text-white bg-blue-500   flex gap-2 font-semibold justify-center"
              >
                Add Cart
              </Button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default MedicineCard;
