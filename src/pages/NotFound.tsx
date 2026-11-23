import { Link } from "react-router";
import { TbError404 } from "react-icons/tb";

const NotFound = () => {
  return (
    <main className="flex min-h-[calc(100vh-136px)] items-center justify-center bg-gray-50 px-6 py-16">
      <div className="w-full max-w-xl text-center">
        {/* Error Code */}
        <h1 className="text-8xl font-extrabold tracking-tight text-orange-600 sm:text-9xl text-center max-w-[128px] mx-auto">
          <TbError404 />
        </h1>

        {/* Heading */}
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-gray-600">
          Sorry, we couldn't find the page you're looking for. It may have been
          moved or the URL may be incorrect.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/"
            className="inline-flex w-full items-center justify-center rounded-lg bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 sm:w-auto"
          >
            Back to Home
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 sm:w-auto"
          >
            Go Back
          </button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
