import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/componenetes/structure/navBar";
import Footer from "@/app/componenetes/structure/footer";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DEIA",
  description: "Diagnosticos Espirometricos por Inteligencia Artificial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        {children}
        <Footer/>
        </body>
    </html>
  );
}
