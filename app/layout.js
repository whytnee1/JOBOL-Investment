
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Provider from "@/components/Provider";

const arial = {
  className: "font-sans font-bold",
};

export const metadata = {
  title: "JOBOL | Investments",
  description: "Shopping Made Easy",
  // icons: {
  //   icon: "/mlogo.png",
  // },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${arial.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Provider>
          <Navbar />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}

