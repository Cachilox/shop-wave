"use client";
import { useGlobalContext } from "@/context";

export default function Home() {
  const { isAuthUser } = useGlobalContext();

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Eccommerce website</h1>
    </div>
  );
}
