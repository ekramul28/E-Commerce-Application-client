"use client";
import Image from "next/image";
import Input from "../input/input";
import NavLinkBar from "./NavLinkBar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProfileDropdown from "@/components/ProfileDropdown/ProfileDrop";
import Badge from "@/components/TotalCardCount/TotalCardCount";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useCartProductQuery } from "@/redux/fetures/cart/cartApi";
import { logout } from "@/redux/fetures/Auth/authSlice";

const Navbar = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const { data, isLoading } = useCartProductQuery(undefined);

  const cartProducts = data?.data?.items;
  const dispatch = useAppDispatch();
  const handelLogout = () => {
    dispatch(logout());
  };

  const route = useRouter();
  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchTerm = formData.get("search")?.toString() || "";
    console.log("Search Term:", searchTerm);

    route.push(`products?searchTerm=${searchTerm}`);
    // Add logic to handle search functionality
  };
  return (
    <div className={`fixed top-0 left-0 w-full z-50  bg-white shadow-lg `}>
      <div className=" h-12 md:h-20 flex justify-center items-center ">
        <div className="container mx-auto  py-2 flex justify-between items-center">
          <div className="text-2xl font-bold text-black flex items-center">
            <div className="">
              <Image
                src="https://i.ibb.co/xzg7M5N/Thyrocare.webp"
                alt="Thyrocare Image"
                layout="responsive"
                width={500}
                height={300}
              />
            </div>
            <div className="hidden lg:block  border-l-2 pl-3">
              <p className="font-normal text-sm flex items-center">
                <svg
                  className="text-[#FDC32E] font-bold"
                  width={24}
                  height={24}
                  data-slot="icon"
                  fill="none"
                  stroke-width="3.5"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181"
                  ></path>
                </svg>
                Express delivery to
              </p>
              <p className="font-medium text-base">40004 Bangladesh</p>
            </div>
          </div>
          <div className=" md:flex hidden lg:block">
            <div className="col-span-2 lg:col-span-3 lg:flex lg:items-end">
              <form onSubmit={(e) => handleSearchSubmit(e)} className="w-full">
                <label htmlFor="UserEmail" className="sr-only">
                  {" "}
                  Email{" "}
                </label>

                <div className="border bg-white md:h-14 rounded-full p-2  sm:flex sm:items-center sm:gap-4">
                  <div className="relative w-full">
                    <svg
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 z-50 text-gray-500"
                      fill="none"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      width="20"
                      height="20"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                      ></path>
                    </svg>
                    <Input
                      type="text"
                      name="search"
                      className="w-full ml-8 bg-white p-2 pl-10 border-none focus:border-transparent focus:ring-transparent sm:text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-1 w-full bg-black rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-none hover:bg-teal-600 sm:mt-0 sm:w-auto sm:shrink-0"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className=" flex gap-3 justify-end items-center ">
            <div>
              {user ? (
                <div className="flex justify-center items-center">
                  <ProfileDropdown
                    image={user?.imageUrl}
                    role={user?.role}
                    handelLogout={handelLogout}
                  />
                </div>
              ) : (
                <Link href={"/login"}>
                  <p className="md:font-medium md:text-sm font-normal text-xs flex items-center md:gap-2">
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
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      ></path>
                    </svg>
                    Hello,Log in
                  </p>
                </Link>
              )}
            </div>

            {user?.role == "CUSTOMER" && (
              <div className="flex gap-1">
                <div>
                  <Link href={"/yourOrders"}>
                    <p className="md:font-medium md:text-sm font-normal text-xs flex items-center md:gap-2">
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
                          d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                        ></path>
                      </svg>
                      Orders
                    </p>
                  </Link>
                </div>
                <div>
                  <Link href={"/cards"}>
                    <p className="md:font-medium md:text-sm font-normal text-xs flex items-center md:gap-2">
                      <Badge count={cartProducts?.length}>
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
                      </Badge>
                      Carts
                    </p>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <NavLinkBar />
    </div>
  );
};

export default Navbar;
