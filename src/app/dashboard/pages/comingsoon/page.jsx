import Link from "next/link";

export default function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8f7f4] dark:bg-gray-900 text-center p-6">
      <img
        src="/assets/commingsoon.svg"
        alt="Coming Soon"
        className="w-[650px] h-auto "
      />
      <h2 className="text-4xl mb-10 font-semibold dark:text-white text-gray-800 ">
        Coming Soon!
      </h2>
       <Link href="/dashboard" passHref>
        <button className="bg-[#10b981] font-semibold hover:bg-[#059669] text-white px-8 py-3 rounded-md transition-colors duration-300">
          Back to Home
        </button>
      </Link>
    </div>
  );
}
