import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "@/globals.css";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Escape Quests",
  description: "Quests in Calgary",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} font-sans`}>
        <div className="min-h-dvh flex flex-col">
          <Header className="bg-[#1E1C1C]" />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
