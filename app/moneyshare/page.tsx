"use client";

import Image from "next/image";
import Link from "next/link";
import calculator from "./../../assets/images/calculator.png";
import money from "./../../assets/images/money.png";
import { useState } from "react";
import Footer from "@/components/footer";

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

  return (
    <>
      <div
        className="w-1/2 border border-gray-500 mx-auto mt-20 mb-10 p-20
                    flex flex-col items-center rounded-2xl shadow-xl"
      >
        <Image src={calculator} alt="calculator" width={100} />

        <h1 className="text-lg text-blue-950 font-bold mt-3">
          Varity Calculator V.1.0
        </h1>

        <h1 className="text-3xl text-blue-950 mt-1 mb-5">โปรแกรมคำนวณ</h1>

        <div className="w-full border border-gray-300 flex flex-col items-center p-5 rounded-xl">
          <Image src={money} alt="money" width={50} />
          <h1 className="text-lg text-gray-600 mt-1 mb-5">แชร์เงินกันเถอะ</h1>

          <div className="w-full flex flex-col">
            <label>ป้อนเงิน (บาท)</label>
            <input
              type="text"
              value={moneyInput}
              onChange={handleMoneyChange}
              className="border border-gray-500 p-2 rounded"
              placeholder="เช่น 1200.50"
              inputMode="decimal"
            />
          </div>

          <div className="w-full flex flex-col mt-3">
            <label>ป้อนคน</label>
            <input
              type="text"
              value={person}
              onChange={handlePersonChange}
              className="border border-gray-500 p-2 rounded"
              placeholder="เช่น 3"
              inputMode="numeric"
            />
          </div>

          <div className="w-full flex gap-3 mt-5">
            <button
              onClick={handleCalClick}
              className="flex-1 text-lg text-white bg-gray-950 hover:bg-gray-500 
               px-5 py-2 rounded text-center cursor-pointer"
            >
              คำนวณ
            </button>

            <button
              onClick={handleCancelClick}
              className="flex-1 text-lg text-white bg-orange-500 hover:bg-orange-700 
               px-5 py-2 rounded text-center cursor-pointer"
            >
              ยกเลิก
            </button>
          </div>
          <div className="w-full flex justify-center mt-5 text-center items-end">
            <span>หารกันคนละ</span>
            <span className="font-bold text-5xl text-red-800 mx-10">
              {moneyShare}
            </span>
            <span>บาท</span>
          </div>
        </div>
        <div className="w-full flex justify-center mt-10">
          <Link
            href="/menu"
            className="text-blue-600 hover:underline cursor-pointer"
          >
            กลับไปหน้าเมนู
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
