import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    default: "Defined — Too Accurate to Be Legal",
    template: "%s | Defined",
  },
  description:
    "Turn your favorite humans and pets into iconic fake dictionary entries. Emotionally exposing people since 2026.",
  keywords: [
    "fake dictionary",
    "personalized gifts",
    "custom definition",
    "funny gifts",
    "AI generator",
    "personalized mug",
    "hoodie gift",
    "best friend gift",
    "pet definition",
    "urban dictionary style",
  ],
  authors: [{ name: "Defined" }],
  creator: "Defined",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "Defined",
    title: "Defined — Too Accurate to Be Legal",
    description:
      "Type a name. Get a dangerously accurate definition. Turn it into a gift.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Defined — The internet's favorite fake dictionary",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Defined — Too Accurate to Be Legal",
    description:
      "Type a name. Get a dangerously accurate definition. Turn it into a gift.",
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-white antialiased">
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#1a1a1a",
              color: "#fff",
              borderRadius: "12px",
              padding: "12px 20px",
              fontSize: "14px",
              fontWeight: 500,
            },
            success: {
              iconTheme: { primary: "#d946ef", secondary: "#fff" },
            },
          }}
        />
      </body>
    </html>
  );
}
