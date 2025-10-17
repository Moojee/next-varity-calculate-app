"use client";

import { useState, useCallback } from "react";
import type React from "react";
import Footer from "@/components/footer";

type Shape = "rectangle" | "triangle" | "circle";

export default function ShapePage() {
  const [shape, setShape] = useState<Shape>("rectangle");
  const [a, setA] = useState<string>(""); // ความกว้าง / ฐาน / รัศมี
  const [b, setB] = useState<string>(""); // ความยาว / สูง (บางรูปทรงไม่ใช้)
  const [area, setArea] = useState<string>("");

  // จำกัดการป้อนเฉพาะตัวเลข
  const handleNum =
    (setter: (v: string) => void, allowDot = false) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value.replace(allowDot ? /[^\d.]/g : /[^\d]/g, "");
      setter(v);
    };

  const calc = useCallback(() => {
    const n1 = parseFloat(a);
    const n2 = parseFloat(b);

    if (shape === "rectangle") {
      if (!Number.isFinite(n1) || !Number.isFinite(n2) || n1 <= 0 || n2 <= 0) {
        alert("กรุณาป้อนค่ากว้างและยาวให้ถูกต้อง");
        return;
      }
      setArea((n1 * n2).toLocaleString("th-TH", { maximumFractionDigits: 4 }));
    } else if (shape === "triangle") {
      if (!Number.isFinite(n1) || !Number.isFinite(n2) || n1 <= 0 || n2 <= 0) {
        alert("กรุณาป้อนค่าฐานและสูงให้ถูกต้อง");
        return;
      }
      setArea((0.5 * n1 * n2).toLocaleString("th-TH", { maximumFractionDigits: 4 }));
    } else {
      if (!Number.isFinite(n1) || n1 <= 0) {
        alert("กรุณาป้อนค่ารัศมีให้ถูกต้อง");
        return;
      }
      setArea((Math.PI * n1 * n1).toLocaleString("th-TH", { maximumFractionDigits: 4 }));
    }
  }, [a, b, shape]);

  const reset = () => {
    setA("");
    setB("");
    setArea("");
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") calc();
  };

  return (
    <>
      <main className="min-h-[100dvh] bg-gradient-to-b from-white to-gray-50 text-gray-900">
        <section className="max-w-xl mx-auto px-4 pt-10 pb-8 md:pt-14 md:pb-10">
          <div className="rounded-2xl border border-gray-200 bg-white/95 shadow-sm p-6 md:p-8">
            {/* หัวข้อ */}
            <header className="text-center">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                คำนวณพื้นที่รูปทรง
              </h1>
              <p className="text-sm md:text-base text-gray-600 mt-1">
                เลือกรูปทรงและกรอกค่าที่เกี่ยวข้องเพื่อคำนวณพื้นที่
              </p>
            </header>

            {/* ตัวเลือกรูปทรง */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              {[
                { key: "rectangle", text: "สี่เหลี่ยม" },
                { key: "triangle", text: "สามเหลี่ยม" },
                { key: "circle", text: "วงกลม" },
              ].map((s) => (
                <button
                  key={s.key}
                  onClick={() => setShape(s.key as Shape)}
                  className={`rounded-xl border px-3 py-2.5 font-medium transition ${
                    shape === s.key
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-300 bg-white hover:bg-gray-50"
                  }`}
                >
                  {s.text}
                </button>
              ))}
            </div>

            {/* ฟอร์มอินพุต */}
            <div className="mt-6 space-y-4">
              {shape === "rectangle" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-800">
                      กว้าง
                    </label>
                    <input
                      value={a}
                      onChange={handleNum(setA, true)}
                      onKeyDown={handleKeyDown}
                      inputMode="decimal"
                      placeholder="เช่น 10"
                      className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-base placeholder:text-gray-400 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/70"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-800">
                      ยาว
                    </label>
                    <input
                      value={b}
                      onChange={handleNum(setB, true)}
                      onKeyDown={handleKeyDown}
                      inputMode="decimal"
                      placeholder="เช่น 20"
                      className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-base placeholder:text-gray-400 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/70"
                    />
                  </div>
                </div>
              )}

              {shape === "triangle" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-800">
                      ฐาน
                    </label>
                    <input
                      value={a}
                      onChange={handleNum(setA, true)}
                      onKeyDown={handleKeyDown}
                      inputMode="decimal"
                      placeholder="เช่น 10"
                      className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-base placeholder:text-gray-400 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/70"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-800">
                      สูง
                    </label>
                    <input
                      value={b}
                      onChange={handleNum(setB, true)}
                      onKeyDown={handleKeyDown}
                      inputMode="decimal"
                      placeholder="เช่น 15"
                      className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-base placeholder:text-gray-400 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/70"
                    />
                  </div>
                </div>
              )}

              {shape === "circle" && (
                <div>
                  <label className="block text-sm font-medium text-gray-800">
                    รัศมี
                  </label>
                  <input
                    value={a}
                    onChange={handleNum(setA, true)}
                    onKeyDown={handleKeyDown}
                    inputMode="decimal"
                    placeholder="เช่น 7"
                    className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-base placeholder:text-gray-400 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/70"
                  />
                </div>
              )}

              {/* ปุ่ม */}
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

              {/* ผลลัพธ์ */}
              {area && (
                <div className="mt-3 rounded-xl border border-gray-100 bg-white p-5 text-center">
                  <div className="text-sm text-gray-600">พื้นที่โดยประมาณ</div>
                  <div className="mt-1 text-5xl font-bold tracking-tight">{area}</div>
                  <div className="text-sm text-gray-600">หน่วย²</div>
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
