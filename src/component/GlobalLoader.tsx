"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Audio } from "react-loader-spinner";

export default function GlobalLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800); 
    return () => clearTimeout(timer);
  }, [pathname]); // كل ما الروت يتغير

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
      <Audio height="100" width="100" color="#4ebb4cff" ariaLabel="loading" />
    </div>
  );
}

