"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useLoginUserMutation } from "@/redux/fetures/Auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { verifyToken } from "@/api/imageUp/verifyToken";
import { setUser, TUser } from "@/redux/fetures/Auth/authSlice";

const LoginPage = () => {
  const [loginUser] = useLoginUserMutation();
  const dispatch = useAppDispatch();

  const [loginError, setLoginError] = useState("");

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;
    try {
      const result = await loginUser({ email, password }).unwrap();
      if (result?.success) {
        const user = verifyToken(result.data.accessToken) as TUser;
        dispatch(setUser({ user: user, token: result.data.accessToken }));
        form.reset();
        window.location.href = "/";
        toast("Login Successfully");
      }
      if (result?.error) {
        setLoginError(result?.error?.data?.message);
      }
    } catch (error) {
      setLoginError((error as any)?.data?.message);
    }
  };

  const handleDemoLogin = async (role: string) => {
    let demoEmail = "";
    let demoPassword = "123456";

    if (role === "admin") demoEmail = "mdekramulhassan168@gmail.com";
    if (role === "customer") demoEmail = "mdekramulhassan1@gmail.com";
    if (role === "vendor") demoEmail = "mdekramulhassan16@gmail.com";

    try {
      const result = await loginUser({
        email: demoEmail,
        password: demoPassword,
      }).unwrap();
      if (result?.success) {
        const user = verifyToken(result.data.accessToken) as TUser;
        dispatch(setUser({ user: user, token: result.data.accessToken }));
        window.location.href = "/";
        toast(`${role} logged in successfully`);
      } else {
        setLoginError(result?.error?.data?.message);
      }
    } catch (error) {
      setLoginError((error as any)?.data?.message);
    }
  };

  return (
    <div className="mt-4 min-h-screen">
      <div>
        <div className="w-60 h-full">
          <Link href={"/"}>
            <Image
              src="https://i.ibb.co/xzg7M5N/Thyrocare.webp"
              alt="Thyrocare Image"
              layout="responsive"
              width={500}
              height={300}
            />
          </Link>
        </div>
      </div>
      <div className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
            Welcome Back!
          </h1>

          <p className="mx-auto mt-4 w-full text-center text-gray-500">
            Sign in to your account to access your personalized medicine orders,
            manage prescriptions, and enjoy fast, secure shopping for all your
            healthcare needs. Your health is our priority.
          </p>

          <form
            onSubmit={handleForm}
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 border-t-2"
          >
            <p className="text-center text-lg font-medium">
              Sign in to your account
            </p>

            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <div className="relative border rounded">
                <input
                  type="email"
                  name="email"
                  className="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative border rounded">
                <input
                  type="password"
                  name="password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
              Sign in
            </button>

            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={() => handleDemoLogin("admin")}
              >
                Demo Admin
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
                onClick={() => handleDemoLogin("customer")}
              >
                Demo Customer
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-orange-500 text-white rounded-lg"
                onClick={() => handleDemoLogin("vendor")}
              >
                Demo Vendor
              </button>
            </div>

            <p className="text-center text-sm text-gray-500">
              No account?{" "}
              <Link className="underline" href="/register">
                Sign up
              </Link>
            </p>

            <div className="text-red-400 text-center my-4 text-sm font-medium">
              {loginError}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
