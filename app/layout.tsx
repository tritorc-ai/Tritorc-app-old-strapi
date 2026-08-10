import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BottomNav } from "@/components/app/BottomNav";
import { ServiceWorkerRegister } from "@/components/app/ServiceWorkerRegister";

export const metadata: Metadata = {
  title: "Tritorc",
  description:
    "Turnkey industrial bolting, on-site machining & pipeline integrity solutions.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Tritorc",
  },
  icons: {
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#171717",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-brand-surface font-sans text-foreground">
        <div className="mx-auto flex min-h-dvh max-w-md flex-col bg-white shadow-[0_0_60px_rgba(0,0,0,0.06)] sm:max-w-none sm:shadow-none">
          <div className="flex-1">{children}</div>
          <BottomNav />
        </div>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
