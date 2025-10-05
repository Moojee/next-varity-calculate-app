import Image from "next/image";
import calculator from "./../../assets/images/calculator.png";
import money from "./../../assets/images/money.png";
import shape from "./../../assets/images/shapes.png";
import BMI from "./../../assets/images/bmi.png";
import BMR from "./../../assets/images/bmi (1).png";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div
        className="w-1/2 border border-gray-500 mx-auto mt-20 mb-10 p-20
                      flex flex-col items-center rounded-2xl shadow-xl"
      >
        <Image src={calculator} alt="calculator" width={150} />
        <h1 className="text-xl text-blue-950 font-bold mt-5">
          Varity Calculator V.1.0
        </h1>
        <h1 className="text-3xl text-blue-950 mt-2 mb-5">โปรแกรมคำนวณ</h1>

        <div className="w-full flex justify-center">
          <Link
            href="/moneyshare"
            className="text-xl text-white bg-gray-400 px-5 py-2 rounded-xl text-center mx-2"
          >
            <Image
              src={money}
              alt="calculator"
              width={80}
              className="mx-auto"
            />
            แชร์เงินกันเถอะ
          </Link>

          <Link
            href="/bmi"
            className="text-xl text-white bg-gray-400 px-5 py-2 rounded-xl text-center mx-2"
          >
            <Image
              src={BMI}
              alt="calculator"
              width={80}
              className="mx-auto"
            />
            BMI
          </Link>

          <Link
            href="/bmr"
            className="text-xl text-white bg-gray-400 px-5 py-2 rounded-xl text-center mx-2"
          >
            <Image
              src={BMR}
              alt="calculator"
              width={80}
              className="mx-auto"
            />
            BMR
          </Link>

          <Link
            href="/shape"
            className="text-xl text-white bg-gray-400 px-5 py-2 rounded-xl text-center mx-2"
          >
            <Image
              src={shape}
              alt="calculator"
              width={80}
              className="mx-auto"
            />
            รูปทรง
          </Link>
        </div>
      </div>
    </>
  );
}
