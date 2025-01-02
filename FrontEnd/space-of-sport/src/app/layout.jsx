import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "../components/Navbar";
import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Space of Sport",
  description: "Encuentra los mejores productos deportivos en un solo lugar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* Navbar */}
        <Navbar />
        {/* Main Content */}
        <main>{children}</main>
        {/* Footer */}
        <footer>
          <p>© 2025 Space of Sport - Todos los derechos reservados.</p>
        </footer>
      </body>
    </html>
  );
}
