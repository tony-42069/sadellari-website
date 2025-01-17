import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sadellari Enterprises",
  description: "A forward-thinking company creating innovative solutions in commercial real estate and artificial intelligence.",
  robots: {
    index: false,
    follow: false,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  openGraph: {
    title: "Sadellari Enterprises",
    description: "A forward-thinking company creating innovative solutions in real estate and artificial intelligence.",
    images: [
      {
        url: '/holdco-logo.png',
        width: 1200,
        height: 630,
        alt: 'Sadellari Enterprises Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sadellari Enterprises",
    description: "A forward-thinking company creating innovative solutions in real estate and artificial intelligence.",
    images: ['/holdco-logo.png'],
  },
  icons: {
    icon: '/s-logo-final-crop.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
