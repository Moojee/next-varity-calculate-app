"use client";

import Image from "next/image";
import calculator from "./../assets/images/calculator.png";
import Footer from "@/components/footer";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type React from "react"; // เพื่อใช้ประเภทอีเวนต์ของ React

export default function HomePage() {
  const router = useRouter();
  const [ucode, setUcode] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = useCallback((): void => {
    if (!ucode.trim()) {
      alert("กรุณาป้อนโค้ดก่อนเข้าใช้งาน");
      return;
    }
    setSubmitting(true);
    const ok = ucode.trim().toLowerCase() === "sau";
    if (ok) {
      router.push("/menu");
    } else {
      alert("โค้ดไม่ถูกต้อง");
      setSubmitting(false);
    }
  }, [router, ucode]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <>
      <main className="min-h-[100dvh] bg-gradient-to-b from-white to-gray-50 text-gray-900">
        <section className="max-w-xl mx-auto px-4 pt-12 pb-8 md:pt-16 md:pb-10">
          <div className="rounded-2xl border border-gray-200 bg-white/95 shadow-sm p-6 md:p-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-2xl bg-gray-50 ring-1 ring-gray-200 flex items-center justify-center mb-4">
                <Image
                  src={calculator}
                  alt="Varity Calculator"
                  width={72}
                  height={72}
                  priority
                  className="opacity-90"
                />
              </div>

              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Varity Calculator <span className="font-normal">V.1.0</span>
              </h1>
              <p className="text-sm md:text-base text-gray-600 mt-1">โปรแกรมคำนวณ</p>
            </div>

            <div className="mt-6 md:mt-8">
              <label htmlFor="access-code" className="block text-sm font-medium text-gray-800">
                ป้อนรหัสเข้าใช้งาน{" "}
                <span className="font-normal text-gray-500">(ชื่อย่อ ม.เอเชีย)</span>
              </label>

              <input
                id="access-code"
                value={ucode}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUcode(e.target.value)}
                onKeyDown={handleKeyDown}
                type="text"
                inputMode="text"
                placeholder="เช่น SAU"
                className="
                  mt-2 w-full rounded-xl border border-gray-300 bg-white
                  px-3 py-2.5 text-base text-gray-900 placeholder:text-gray-400
                  outline-none ring-0
                  focus:border-gray-900 focus:ring-2 focus:ring-gray-900/70
                "
                aria-label="รหัสเข้าใช้งาน"
              />

              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="
                  mt-4 w-full rounded-xl
                  bg-gray-900 text-white font-semibold
                  py-2.5
                  hover:bg-black
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-black/70
                  disabled:opacity-60 disabled:cursor-not-allowed
                  transition
                "
              >
                เข้าใช้งาน
              </button>

              <p className="mt-3 text-xs text-gray-500">กด Enter เพื่อยืนยันได้เช่นกัน</p>
            </div>
          </div>

    
        </section>
      </main>

      <Footer />
    </>
  );
}
