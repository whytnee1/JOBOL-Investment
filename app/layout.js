import { Geist, Geist_Mono, Playfair } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Provider from "@/components/Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const arial = {
  className: "font-sans font-bold"
}
export const metadata = {
  title: "JOBOL|Investments",
  description: "Shopping Made Easy",
  // icons: {
    // icon: "/mlogo.png",
  // },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${arial.className}  h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Provider>
      <Navbar/> 
       {children}
      <Footer/>
       </Provider>
        </body>
    </html>
  );
}
