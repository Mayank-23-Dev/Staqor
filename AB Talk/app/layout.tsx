import type { Metadata } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { AmbientBackground } from "@/components/AmbientBackground";

export const metadata: Metadata = {
  title: "ABTalks — Build in Public. Grow Together.",
  description: "Join India's coding community for college students to learn, build, and accelerate their careers through visible proof of work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#0f0f0f] text-white">
      <body className="font-sans antialiased bg-[#0f0f0f] text-white selection:bg-[#e8602e]/30 selection:text-white overflow-x-hidden min-h-screen">
        <SmoothScrollProvider>
          <AmbientBackground />
          <div className="relative z-10 min-h-screen">
            {children}
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
