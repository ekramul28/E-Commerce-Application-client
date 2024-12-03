import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center  mt-16">
      <div className="bg-white p-12 rounded-lg shadow-lg text-center">
        <div className="flex items-center justify-center w-52 h-52 bg-red-100 rounded-full mx-auto mb-6">
          <i className="text-red-500 text-8xl leading-none">🥲</i>
        </div>
        <h1 className="text-red-600 font-bold text-4xl mb-2">ERROR</h1>
        <p className="text-gray-700 text-xl">
          Something went wrong; please try again!
        </p>
        <Link href="/medicine">
          <div className="flex items-center justify-center mt-2">
            <button className="block rounded bg-black px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600">
              Try Again
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
