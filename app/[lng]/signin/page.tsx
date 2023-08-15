"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import "../../globals.css";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function SignIn({ params, searchParams }) {
  const router = useRouter();
  const { t } = useTranslation(params.lng, "common");
  console.log(searchParams);
  return (
    <div className="flex h-full items-center justify-center  md:bg-gradient-to-b from-indigo-200 via-red-200 to-yellow-100 text-black md:flex-row md:justify-end">
      <div className="hidden h-max justify-center p-10 text-white md:block md:w-1/2">
        <h1 className="mb-4 text-4xl font-semibold">Hello again</h1>
        <p className="text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
      <div className="h-full flex items-center justify-center bg-white p-6 md:w-1/2">
        <div className="max-w-xs">
          <h2 className="mb-4 text-2xl font-semibold">{t("signInTitle")}</h2>
          <div className="mb-4 text-white">
            <button
              onClick={() => signIn("google")}
              className="mb-2 shadow w-full flex rounded-lg items-center justify-center text-black bg-white px-4 py-2"
            >
              <Image
                className="pr-2"
                src="https://authjs.dev/img/providers/google.svg"
                alt="google icon"
                width={32}
                height={32}
              />
              <span className="w-full">{t("logInGoogle")}</span>
            </button>
            <button
              onClick={() => signIn("line")}
              className="mb-2 shadow w-full flex rounded-lg items-center justify-center text-white hover:brightness-70 bg-[#006699] px-4 py-2"
            >
              <Image
                className="pr-1"
                src="https://authjs.dev/img/providers/linkedin.svg"
                alt="line icon"
                width={32}
                height={32}
              />
              <span className="w-full">{t("logInLinkedIn")}</span>
            </button>
            <button
              onClick={() => signIn("line")}
              className="mb-2 shadow w-full flex rounded-lg items-center justify-center text-white bg-[#01c300] px-4 py-2"
            >
              <Image
                className="pr-1"
                src="https://authjs.dev/img/providers/line.svg"
                alt="line icon"
                width={32}
                height={32}
              />
              <span className="w-full">{t("logInLine")}</span>
            </button>
          </div>
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-gray-600"></div>
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="mb-2 w-full rounded-lg border px-4 py-2"
            />
            <input
              type="password"
              placeholder="Password"
              className="mb-4 w-full rounded-lg border px-4 py-2"
            />
            <button className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white">
              {t("signIn")}
            </button>
          </div>
          <p className="mt-4 text-gray-600">
            Don't have an account ?&nbsp;
            <a href="#" className="text-blue-500">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
