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

  const handelForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;
    console.log(password, email);
    try {
      const result = await loginUser({ email, password }).unwrap();
      if (result?.success) {
        const user = verifyToken(result.data.accessToken) as TUser;
        dispatch(setUser({ user: user, token: result.data.accessToken }));
      }
      if (result?.error) {
        setLoginError(result?.error?.data?.message);
      }
      form.reset();
      window.location.href = "/";
      toast("Login Successfully");
    } catch (error) {
      setLoginError((error as any).data.message);
    }
  };

  const demoAdmin = async () => {
    try {
      const data = {
        email: "mdekramulhassan168@gmail.com",
        password: "Ekramul28",
      };
      const result = await loginUser(data).unwrap();
      if (result?.success) {
        const user = verifyToken(result.data.accessToken) as TUser;
        dispatch(setUser({ user: user, token: result.data.accessToken }));
      }
      if (result?.error) {
        console.log(result?.error?.data?.message);
        setLoginError(result?.error?.data?.message);
      }
      window.location.href = "/";
      toast("Login Successfully");
    } catch (error) {
      setLoginError((error as any).data.message);
    }
  };
  const demoUser = async () => {
    try {
      const data = {
        email: "mdekramulhassan16@gmail.com",
        password: "Ekramul28",
      };
      const result = await loginUser(data).unwrap();
      if (result?.success) {
        const user = verifyToken(result.data.accessToken) as TUser;
        dispatch(setUser({ user: user, token: result.data.accessToken }));
      }
      if (result?.error) {
        console.log(result?.error?.data?.message);
        setLoginError(result?.error?.data?.message);
      }
      window.location.href = "/";
      toast("Login Successfully");
    } catch (error) {
      setLoginError((error as any).data.message);
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
      <div className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8 ">
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
            onSubmit={handelForm}
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

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative  border rounded">
                <input
                  type="password"
                  name="password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
              Sign in
            </button>

            <p className="text-center text-sm text-gray-500">
              No account?
              <Link className="underline" href="/register">
                Sign up
              </Link>
            </p>
            <div className="flex justify-evenly">
              <div>
                <button
                  onClick={demoAdmin}
                  type="button"
                  className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                >
                  Demo Admin
                </button>
              </div>
              <div>
                <button
                  onClick={demoUser}
                  type="button"
                  className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                >
                  Demo User
                </button>
              </div>
            </div>

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
