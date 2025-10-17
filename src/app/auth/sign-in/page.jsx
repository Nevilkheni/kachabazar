"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signin() {
  const router = useRouter();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validEmail = "admin@gmail.com";
  const validPassword = "112233";
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("112233");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === validEmail && password === validPassword) {
      setError("");
      localStorage.setItem("isAuthenticated", "true");
      router.push("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center p-6 lg:p-0 justify-center min-h-screen text-black dark:bg-gray-900 bg-[#f8f7f4]">
      <div className="md:flex  bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden max-w-[895px] w-full">
        <div className=" md:w-1/2 w-full h-[128px] md:h-full">
          <img
            src="/assets/login-img.jpeg"
            alt="Login img"
            className="object-cover h-full w-full"
          />
        </div>

        <div className="w-full md:w-1/2 p-6 sm:p-12 flex flex-col  justify-center">
          <h2 className="text-2xl text-gray-600 dark:text-white font-semibold md:mt-6 mb-6 ">
            Admin Login
          </h2>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm py-0.5 dark:text-white">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 dark:bg-gray-800 border-gray-200 dark:border-gray-500 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block font-medium pt-3 py-0.5 text-sm dark:text-white">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 dark:bg-gray-800 border-gray-200 dark:border-gray-500 dark:text-white"
                required
              />
            </div>

            {error && <p className="text-red-500 text-xs">{error}</p>}

            <button
              type="submit"
              className="w-full bg-[#10b77f] text-sm text-white dark:text-black py-2.5  rounded-lg hover:bg-[#1fb784] transition"
            >
              Login
            </button>
          </form>

          <div className="space-y-2 pt-6 md:mb-6 text-sm">
            <a href="#" className="text-[#34d399] hover:underline block">
              Forgot your password
            </a>
            <a href="#" className="text-[#34d399] hover:underline block mt-1">
              Create account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
