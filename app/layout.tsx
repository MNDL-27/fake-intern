import type { Metadata } from "next";
import Nav from "./components/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fake Internship Reporter — Is this internship real?",
  description: "Check reports from other students before you apply. Search any company to see if they charge fees, brand-jack, or run fake internships.",
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : null,
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Fake Internship Reporter",
              description: "Check reports from other students before you apply. Search any company to see if they charge fees, brand-jack, or run fake internships.",
              url: process.env.NEXT_PUBLIC_SITE_URL || "https://fake-internship-reporter.pages.dev",
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-paper text-ink antialiased selection:bg-ink5 selection:text-ink">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="border-t border-ink5/60 mt-24 py-8 bg-paper">
      <div className="max-w-3xl mx-auto px-6 text-[12px] text-ink3 flex flex-col sm:flex-row gap-2 justify-between items-start sm:items-center">
        <span>&copy; {new Date().getFullYear()} Fake Internship Reporter.</span>
        <span>Data is user-submitted and unaudited. Verify independently.</span>
      </div>
    </footer>
  );
}
