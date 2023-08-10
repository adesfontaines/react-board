"use client";
import NavigationBar from "../components/navigationBar";
import WhiteboardList from "../components/whiteboardList";
import { useTranslation } from "../i18n/client";
import { NextAuthProvider } from "../providers/nextAuthProvider";

export default function Home({
  params: { lng },
}: {
  params: any;
}): React.JSX.Element {
  const { t } = useTranslation(lng, "common");

  return (
    <NextAuthProvider>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <NavigationBar t={t} lng={lng}></NavigationBar>
        <WhiteboardList t={t} lng={lng}></WhiteboardList>
      </main>
    </NextAuthProvider>
  );
}
