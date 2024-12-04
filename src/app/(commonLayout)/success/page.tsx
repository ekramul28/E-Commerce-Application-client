import Link from "next/link";

const SuccessPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center  mt-16">
      <div className="bg-white p-12 rounded-lg shadow-lg text-center">
        <div className="flex items-center justify-center w-52 h-52 bg-green-100 rounded-full mx-auto mb-6">
          <i className="text-green-500 text-8xl leading-none">✓</i>
        </div>
        <h1 className="text-green-600 font-bold text-4xl mb-2">Success</h1>
        <p className="text-gray-700 text-xl">
          We receive your Payment Thanks for buying a product ;
          <br /> well be in touch shortly!
        </p>
        <Link href="/medicine">
          <div className="flex items-center justify-center mt-2">
            <button className="block rounded bg-black px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600">
              Continue Shopping
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
