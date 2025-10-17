import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

import calculator from "./../../assets/images/calculator.png";
import money from "./../../assets/images/money.png";
import shape from "./../../assets/images/shapes.png";
import BMI from "./../../assets/images/bmi.png";
import BMR from "./../../assets/images/bmr.png";
import Footer from "@/components/footer";

type MenuCardProps = {
  href: string;
  imgSrc: StaticImageData; // เพราะรูป import แบบ static
  title: string;
};

function MenuCard({ href, imgSrc, title }: MenuCardProps) {
  return (
    <Link
      href={href}
      className="
        group block rounded-2xl border border-gray-200 bg-white
        p-4 shadow-sm hover:shadow-md transition
        hover:-translate-y-0.5
        focus:outline-none focus-visible:ring-2 focus-visible:ring-black/70
      "
      aria-label={title}
    >
      <div className="flex flex-col items-center gap-3">
        <div
          className="
            aspect-square w-24 rounded-xl bg-gray-50
            ring-1 ring-gray-200 flex items-center justify-center
            group-hover:bg-gray-100
          "
        >
          <Image src={imgSrc} alt={title} width={72} height={72} className="opacity-90" />
        </div>

        <div className="text-center">
          <p className="text-lg font-semibold text-gray-900 group-hover:text-black">
            {title}
          </p>
          <p className="text-xs text-gray-500">กดเพื่อเข้าใช้งาน</p>
        </div>
      </div>
    </Link>
  );
}

export default function Page() {
  return (
    <main
      className="
        min-h-[calc(100dvh-0px)] bg-gradient-to-b from-white to-gray-50
        text-gray-900
      "
    >
      {/* Header */}
      <header className="max-w-5xl mx-auto px-4 pt-10 pb-4 mt-15">
        <div className="flex items-center gap-3 justify-center ">
          <Image
            src={calculator}
            alt="Varity Calculator"
            width={56}
            height={56}
            className="opacity-90"
            priority
          />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Varity Calculator <span className="font-normal">V.1.0</span>
            </h1>
            <p className="text-sm text-gray-600">โปรแกรมคำนวณ</p>
          </div>
        </div>
      </header>

      {/* Content Card */}
      <section className="max-w-5xl mx-auto px-4 pb-10">
        <div className="rounded-2xl border border-gray-200 bg-white/90 shadow-sm">
          {/* Intro */}
          <div className="p-5 md:p-6 border-b border-gray-100">
            
          </div>

          {/* Grid Menu */}
          <div className="p-5 md:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              <MenuCard href="/moneyshare" imgSrc={money} title="แชร์เงินกันเถอะ" />
              <MenuCard href="/bmi" imgSrc={BMI} title="BMI" />
              <MenuCard href="/bmr" imgSrc={BMR} title="BMR" />
              <MenuCard href="/shape" imgSrc={shape} title="รูปทรง" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer/>
      </section>
    </main>
  );
}
