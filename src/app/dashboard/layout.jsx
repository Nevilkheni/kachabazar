"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MainHeader from "@/components/layout/Header/page";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem("isAuthenticated");
      if (!auth) {
        router.push("/auth/sign-in");
      } else {
        setIsAuthenticated(true);
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="p-10 dark:bg-gray-900  h-screen">
        <div className="text-xl dark:text-gray-200">Loading...</div>
      </div>
    );
  }

  return isAuthenticated ? <MainHeader>{children}</MainHeader> : null;
}