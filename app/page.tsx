"use client";
import Dashboard from "@/components/DashBoard/Dashboard";
import { useLoginContext } from "@/contexts/LoginContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";

export default function Home() {
  const router = useRouter();
  const { address } = useLoginContext();
  const isLg = useMediaQuery({ maxWidth: 1024 });

  useEffect(() => {
    if (isLg && address) router.push("/swidge");
  }, [isLg, address, router]);

  return <Dashboard />;
}
