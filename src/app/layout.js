import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../providers/ThemeProvider";
import Header from "@/components/Header";
import CurrentDate from "@/components/CurrentDate";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "E-Findo App",
  description: "Entwickelt von Alkan Aziz",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-screen bg-e-background-200 text-black antialiased dark:bg-e-background-dark dark:text-white`}
      >
        <ThemeProvider>
          <Header />
          <div className="flex lg:h-[calc(100vh-8rem)] flex-col">
            <div className="m-2 flex flex-col gap-2">
              <CurrentDate />
              <div className="flex flex-col gap-2 md:flex-row">
                <Sidebar />

                {children}
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
