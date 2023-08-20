"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
export default function SocialLoginButton({
  t,
  lng,
  provider,
  providerClass,
  logo,
}: {
  t: any;
  lng: string;
  provider: string;
  providerClass: string;
  logo: string;
}) {
  return (
    <button
      onClick={() => signIn(provider.toLowerCase(), { callbackUrl: "/" + lng })}
      className={
        providerClass +
        " mb-2 shadow w-full flex rounded-lg items-center justify-center text-black px-4 py-2"
      }
    >
      <Image
        className="pr-2"
        src={"https://authjs.dev/img/providers/" + logo.toLowerCase() + ".svg"}
        alt={provider + " icon"}
        width={32}
        height={32}
      />
      <span className="w-full">{t("logIn" + provider)}</span>
    </button>
  );
}
