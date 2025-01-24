import type { Metadata } from "next";
import "./globals.css";
import { Bebas_Neue, Poppins, Roboto, Odibee_Sans, Baumans, Public_Sans, Manrope } from 'next/font/google';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme-provider";

// Configure each font
const odibeeSans = Odibee_Sans({
  variable: "--font-odibee-sans",
  subsets: ['latin'],
  weight: ['400']
});


const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ['latin'],
  weight: ['400']
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ['latin'],
  weight: ['400']
});

const baumans = Baumans({
  variable: "--font-baumans",
  subsets: ['latin'],
  weight: ['400']
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ['latin'],
  weight: ['400']
});
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ['latin'],
  weight: ['100', '400', '700']
});
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ['latin'],
  weight: ['100', '400', '700']
});




export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body
        className={`${odibeeSans.variable} ${bebasNeue.variable} ${roboto.variable} ${poppins.variable} ${baumans.variable} ${publicSans.variable} ${manrope.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="sticky top-0 z-50">
            <Navbar />
          </div>
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
