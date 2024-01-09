/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useTranslation } from "@/app/i18n/client";
import "../../globals.css";
import SocialLoginButton from "@/app/components/socialLoginButton";
import { redirect, useSearchParams } from "next/navigation";
import LocalePicker from "@/app/components/localePicker";
import { useSession } from "next-auth/react";

export default function SignIn({ params }: { params: any }) {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const { status } = useSession();

  const { t } = useTranslation(params.lng, "common");

  if (status == "authenticated") {
    return redirect("/" + params.lng);
  }
  const translateError = (error: string | null) => {
    if (!error) return "";

    return (
      <div
        className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
        role="alert"
      >
        <p className="font-bold">{t("signIn")}</p>
        <p>
          To confirm your identity, sign in with the same account you used
          orignally
        </p>
      </div>
    );
  };
  return (
    <div className="flex h-full items-center justify-center  md:bg-gradient-to-b from-indigo-200 via-red-200 to-yellow-100 text-black md:flex-row md:justify-end">
      <div className="hidden h-max justify-center p-10 text-white md:block md:w-1/2">
        <h1 className="mb-4 text-4xl font-semibold">{t("welcome")}</h1>
        <p className="text-lg">{t("welcomeDescription")}</p>
      </div>
      <div className="h-full flex items-center justify-center bg-white p-6 md:w-1/2">
        <div className="max-w-xs">
          {translateError(error)}
          <h2 className="mb-4 text-2xl font-semibold">{t("signInTitle")}</h2>
          <div className="mb-4 text-white">
            <SocialLoginButton
              t={t}
              logo="google"
              lng={params.lng}
              callbackUrl={params.callback}
              provider="Google"
              providerClass="bg-white"
            />

            <SocialLoginButton
              t={t}
              logo="twitter"
              lng={params.lng}
              callbackUrl={params.callback}
              provider="Twitter"
              providerClass="hover:brightness-70 bg-[#1DA1F2] text-white"
            />

            <SocialLoginButton
              t={t}
              logo="github"
              lng={params.lng}
              callbackUrl={params.callback}
              provider="GitHub"
              providerClass="hover:brightness-70 bg-[#171515] text-white"
            />

            <SocialLoginButton
              t={t}
              logo="line"
              lng={params.lng}
              callbackUrl={params.callback}
              provider="Line"
              providerClass="bg-[#01c300] text-white"
            />
          </div>
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-gray-600"></div>
          </div>
          <div>
            <input
              disabled
              type="email"
              placeholder={t("email")}
              className="mb-2 w-full rounded-lg border px-4 py-2"
            />
            <input
              disabled
              type="password"
              placeholder={t("password")}
              className="mb-4 w-full rounded-lg border px-4 py-2"
            />
            <button
              disabled
              className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
              {t("signIn")}
            </button>
          </div>
          <p className="mt-4 text-gray-600">
            {t("signUpDescription")}&nbsp;
            <a href="#" className="text-blue-500">
              {t("signUp")}
            </a>
          </p>
        </div>
      </div>
      <LocalePicker lng={params.lng} />
    </div>
  );
}
