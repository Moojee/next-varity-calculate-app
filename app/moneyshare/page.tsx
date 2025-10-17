"use client";

import Image from "next/image";
import Link from "next/link";
import calculator from "./../../assets/images/calculator.png";
import money from "./../../assets/images/money.png";
import { useState } from "react";
import Footer from "@/components/footer";
import type React from "react";

export default function Page() {
  const [moneyInput, setMoneyInput] = useState("");
  const [person, setPerson] = useState("");
  const [moneyShare, setMoneyShare] = useState("0.00");

  const handleCalClick = () => {
    const moneyNum = parseFloat(moneyInput);
    const personNum = parseInt(person, 10);

    if (isNaN(moneyNum) || isNaN(personNum) || personNum <= 0) {
      alert("กรุณาป้อนจำนวนเงินและจำนวนคนให้ถูกต้อง");
      return;
    }

    const result = moneyNum / personNum;
    setMoneyShare(result.toFixed(2));
  };

  const handleCancelClick = () => {
    setMoneyInput("");
    setPerson("");
    setMoneyShare("0.00");
  };

  // อนุญาตเฉพาะตัวเลขและจุดทศนิยม (สำหรับ "เงิน")
  const handleMoneyChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const v = e.target.value.replace(/[^0-9.]/g, "");
    setMoneyInput(v);
  };

  // อนุญาตเฉพาะตัวเลขจำนวนเต็ม (สำหรับ "คน")
  const handlePersonChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const v = e.target.value.replace(/[^0-9]/g, "");
    setPerson(v);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") handleCalClick();
  };

  const formattedShare = Number.isFinite(parseFloat(moneyShare))
    ? Number(moneyShare).toLocaleString("th-TH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "0.00";

  return (
    <>
      <main className="min-h-[100dvh] bg-gradient-to-b from-white to-gray-50 text-gray-900">
        <section className="max-w-xl mx-auto px-4 pt-10 pb-8 md:pt-14 md:pb-10">
          <div className="rounded-2xl border border-gray-200 bg-white/95 shadow-sm p-6 md:p-8">
            {/* หัวข้อ */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-2xl bg-gray-50 ring-1 ring-gray-200 flex items-center justify-center mb-4">
                <Image
                  src={calculator}
                  alt="Varity Calculator"
                  width={64}
                  height={64}
                  priority
                  className="opacity-90"
                />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Varity Calculator <span className="font-normal">V.1.0</span>
              </h1>
              <p className="text-sm md:text-base text-gray-600 mt-1">
                โปรแกรมคำนวณ
              </p>
            </div>

            {/* การ์ดคำนวณ */}
            <div className="mt-6 md:mt-8 rounded-xl border border-gray-100 bg-white p-5">
              <div className="flex flex-col items-center">
                <Image src={money} alt="Money" width={48} height={48} />
                <h2 className="text-lg font-semibold text-gray-800 mt-2 mb-4">
                  แชร์เงินกันเถอะ
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="money"
                    className="block text-sm font-medium text-gray-800"
                  >
                    ป้อนเงิน (บาท)
                  </label>
                  <input
                    id="money"
                    type="text"
                    value={moneyInput}
                    onChange={handleMoneyChange}
                    onKeyDown={handleKeyDown}
                    className="
                      mt-2 w-full rounded-xl border border-gray-300 bg-white
                      px-3 py-2.5 text-base text-gray-900 placeholder:text-gray-400
                      outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/70
                    "
                    placeholder="เช่น 1200.50"
                    inputMode="decimal"
                    aria-label="จำนวนเงิน"
                  />
                </div>

                <div>
                  <label
                    htmlFor="person"
                    className="block text-sm font-medium text-gray-800"
                  >
                    ป้อนคน
                  </label>
                  <input
                    id="person"
                    type="text"
                    value={person}
                    onChange={handlePersonChange}
                    onKeyDown={handleKeyDown}
                    className="
                      mt-2 w-full rounded-xl border border-gray-300 bg-white
                      px-3 py-2.5 text-base text-gray-900 placeholder:text-gray-400
                      outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/70
                    "
                    placeholder="เช่น 3"
                    inputMode="numeric"
                    aria-label="จำนวนคน"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleCalClick}
                    className="
                      flex-1 rounded-xl bg-gray-900 text-white font-semibold py-2.5
                      hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black/70
                      transition
                    "
                  >
                    คำนวณ
                  </button>
                  <button
                    onClick={handleCancelClick}
                    className="
                      flex-1 rounded-xl bg-orange-500 text-white font-semibold py-2.5
                      hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/70
                      transition
                    "
                  >
                    ยกเลิก
                  </button>
                </div>

                <div className="pt-3 text-center">
                  <span className="text-sm text-gray-600">หารกันคนละ</span>
                  <div className="mt-1 text-5xl font-bold text-gray-900 tracking-tight">
                    {formattedShare}
                  </div>
                  <span className="text-sm text-gray-600">บาท</span>
                </div>
              </div>
            </div>

            {/* ลิงก์กลับเมนู */}
            <div className="mt-6 text-center">
              <Link
                href="/menu"
                className="text-gray-900 underline hover:no-underline"
              >
                กลับไปหน้าเมนู
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
