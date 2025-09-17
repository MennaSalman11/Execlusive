import type { Metadata } from "next";
import { Poppins } from "next/font/google";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import "./globals.css";
import { Navbar } from "@/components/Layout/Navbar";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/types/Providers";


const poppins = Poppins({
  weight: ['400' , '500' , '600' , '700'],
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Execlusive",
  description: "created by Menna salaman",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`} >

          {/* navbar */}
<Providers>
         <Navbar/>
        <main>
          {children}
        </main>
         <Toaster />
</Providers>
        {/* footer */}
      </body>
    </html>
  );
}
