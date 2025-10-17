"use client";

import { useState, useCallback } from "react";
import type React from "react";
import Footer from "@/components/footer";

type Sex = "male" | "female";
type BMIResult = { bmi: string; category: string } | null;

export default function BMIPage() {
  const [sex, setSex] = useState<Sex>("male");
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [result, setResult] = useState<BMIResult>(null);

  const onChangeNumber =
    (setter: (v: string) => void, allowDot = false) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value.replace(allowDot ? /[^\d.]/g : /[^\d]/g, "");
      setter(v);
    };

  const calc = useCallback(() => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) {
      setResult(null);
      alert("กรุณาป้อนน้ำหนักและส่วนสูงให้ถูกต้อง");
      return;
    }

    const m = h / 100;
    const bmiVal = w / (m * m);
    let category = "ปกติ";

    if (bmiVal < 18.5) category = "น้ำหนักน้อย";
    else if (bmiVal < 23) category = "ปกติ";
    else if (bmiVal < 25) category = "ท้วม";
    else if (bmiVal < 30) category = "อ้วน";
    else category = "อ้วนมาก";

    setResult({ bmi: bmiVal.toFixed(2), category });
  }, [weight, height]);

  const reset = () => {
    setWeight("");
    setHeight("");
    setResult(null);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") calc();
  };

  return (
    <>
      <main className="min-h-[100dvh] bg-gradient-to-b from-white to-gray-50 text-gray-900">
        <section className="max-w-xl mx-auto px-4 pt-10 pb-8 md:pt-14 md:pb-10">
          <div className="rounded-2xl border border-gray-200 bg-white/95 shadow-sm p-6 md:p-8">
            <header className="text-center">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">BMI</h1>
              <p className="text-sm md:text-base text-gray-600 mt-1">
                ดัชนีมวลกาย (Body Mass Index)
              </p>
            </header>

            {/* เลือกเพศ */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <button
                onClick={() => setSex("male")}
                className={`rounded-xl border px-3 py-2.5 font-medium transition ${
                  sex === "male"
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-300 bg-white hover:bg-gray-50"
                }`}
              >
                ชาย
              </button>
              <button
                onClick={() => setSex("female")}
                className={`rounded-xl border px-3 py-2.5 font-medium transition ${
                  sex === "female"
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-300 bg-white hover:bg-gray-50"
                }`}
              >
                หญิง
              </button>
            </div>

            <div className="mt-6 md:mt-8 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-800">
                  น้ำหนัก (กก.)
                </label>
                <input
                  value={weight}
                  onChange={onChangeNumber(setWeight, true)}
                  onKeyDown={onKeyDown}
                  inputMode="decimal"
                  placeholder="เช่น 55.5"
                  className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-base placeholder:text-gray-400 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/70"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800">
                  ส่วนสูง (ซม.)
                </label>
                <input
                  value={height}
                  onChange={onChangeNumber(setHeight, true)}
                  onKeyDown={onKeyDown}
                  inputMode="decimal"
                  placeholder="เช่น 165"
                  className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-base placeholder:text-gray-400 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/70"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={calc}
                  className="flex-1 rounded-xl bg-gray-900 text-white font-semibold py-2.5 hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black/70 transition"
                >
                  คำนวณ
                </button>
                <button
                  onClick={reset}
                  className="flex-1 rounded-xl bg-orange-500 text-white font-semibold py-2.5 hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/70 transition"
                >
                  ยกเลิก
                </button>
              </div>

              {result && (
                <div className="mt-3 rounded-xl border border-gray-100 bg-white p-5 text-center">
                  <div className="text-sm text-gray-600">ผลลัพธ์</div>
                  <div className="mt-1 text-5xl font-bold tracking-tight">
                    {result.bmi}
                  </div>
                  <div className="mt-1 text-sm text-gray-700">
                    เกณฑ์: <b>{result.category}</b>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
