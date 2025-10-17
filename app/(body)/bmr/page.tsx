"use client";

import { useState, useCallback } from "react";
import type React from "react";
import Footer from "@/components/footer";

type Sex = "male" | "female";
type Activity =
  | "1.2"
  | "1.375"
  | "1.55"
  | "1.725"
  | "1.9";
type Result = { bmr: string; tdee: string } | null;

export default function BMRPage() {
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [activity, setActivity] = useState<Activity>("1.2");
  const [result, setResult] = useState<Result>(null);

  const onNum =
    (setter: (v: string) => void, allowDot = false) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value.replace(allowDot ? /[^\d.]/g : /[^\d]/g, "");
      setter(v);
    };

  const calc = useCallback(() => {
    const a = parseFloat(age);
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (![a, w, h].every((x) => Number.isFinite(x) && x > 0)) {
      setResult(null);
      alert("กรุณาป้อนอายุ น้ำหนัก และส่วนสูงให้ถูกต้อง");
      return;
    }

    // Mifflin–St Jeor
    const base = 10 * w + 6.25 * h - 5 * a + (sex === "male" ? 5 : -161);
    const bmr = base;
    const tdee = bmr * parseFloat(activity);

    setResult({
      bmr: Math.round(bmr).toLocaleString("th-TH"),
      tdee: Math.round(tdee).toLocaleString("th-TH"),
    });
  }, [age, weight, height, sex, activity]);

  const reset = () => {
    setSex("male");
    setAge("");
    setWeight("");
    setHeight("");
    setActivity("1.2");
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
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                BMR & TDEE
              </h1>
              <p className="text-sm md:text-base text-gray-600 mt-1">
                คำนวณอัตราการเผาผลาญพลังงานพื้นฐาน
              </p>
            </header>

            {/* เพศ */}
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

            {/* Form */}
            <div className="mt-6 md:mt-8 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-800">
                  อายุ (ปี)
                </label>
                <input
                  value={age}
                  onChange={onNum(setAge)}
                  onKeyDown={onKeyDown}
                  inputMode="numeric"
                  placeholder="เช่น 20"
                  className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-base placeholder:text-gray-400 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/70"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-800">
                    น้ำหนัก (กก.)
                  </label>
                  <input
                    value={weight}
                    onChange={onNum(setWeight, true)}
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
                    onChange={onNum(setHeight, true)}
                    onKeyDown={onKeyDown}
                    inputMode="decimal"
                    placeholder="เช่น 165"
                    className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-base placeholder:text-gray-400 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/70"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800">
                  ระดับกิจกรรม
                </label>
                <select
                  value={activity}
                  onChange={(e) =>
                    setActivity(e.target.value as Activity)
                  }
                  className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-base text-gray-900 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/70"
                >
                  <option value="1.2">นั่งทำงาน (x1.2)</option>
                  <option value="1.375">
                    ออกกำลังกายเบา 1–3 วัน/สัปดาห์ (x1.375)
                  </option>
                  <option value="1.55">
                    ปานกลาง 3–5 วัน/สัปดาห์ (x1.55)
                  </option>
                  <option value="1.725">
                    หนัก 6–7 วัน/สัปดาห์ (x1.725)
                  </option>
                  <option value="1.9">หนักมาก / แรงงาน (x1.9)</option>
                </select>
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
                  <div className="mt-1 text-4xl font-bold tracking-tight">
                    BMR: {result.bmr}
                  </div>
                  <div className="mt-1 text-lg">
                    TDEE โดยประมาณ: <b>{result.tdee}</b> kcal
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
