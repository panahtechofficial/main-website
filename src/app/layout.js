import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
// import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PanahTech",
  description: "Turning Problem Into Solutions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo-panahtech.webp" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased overflow-x-hidden`}
      >
        {children}
        {/* <Navbar /> */}
        <Footer />
      </body>
    </html>
  );
}
