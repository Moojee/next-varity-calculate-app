"use client";

import Image from "next/image";
import calculator from "./../assets/images/calculator.png";
import Footer from "@/components/footer";
import { useState } from "react";

export default function HomePage() {

  //สร้างตัวแปร
  const [ucode, setUcode] = useState ("");

  const handleAccessWebClick =() => {
    if(ucode == "") {
      alert('กรุณาป้อนโค้ดก่อนเข้าใช้งาน')
      return;
    }

    if(ucode.toLowerCase() == "sau"){
      window.location.href = "/menu";   // ใช้ได้เหมือนเดิม
    }else{
      alert('โค้ดไม่ถูกต้อง')
    }
  }

  return (
    <>
      <div
        className="w-10/12 border border-gray-500 mx-auto mt-20 mb-10 p-20
                      flex flex-col items-center rounded-2xl shadow-xl"
      >
        <Image src={calculator} alt="calculator" width={200} />

        <h1 className="text-3xl text-blue-950 mt-5">Varity Calculator V.1.0</h1>
        <h1 className="text-3xl text-blue-900 mt-2">โปรมแกรมคำนวณ</h1>

        <div className="flex flex-col w-full">
          <label className="mb-2"> ป้อนรหัสเข้าใช้งาน <span className="text-green-600"> (ชื่อย่อ ม.เอเชีย) </span></label>
          <input value={ucode} onChange={(e) => {setUcode(e.target.value) }} className="border border-gray-700 rounded p-2" type="text" />
        </div>

        <button
          type="button" onClick={ handleAccessWebClick }
          className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 rounded mt-5 w-full"
        >
          เข้าใช้งาน
        </button>
      </div>
      <Footer/>
    </>
  );
}
