import localFont from "next/font/local";
import "./globals.css";
import { GetAllNavigation } from "@/prisma/navigation/get";
import { GetSiteSettings } from "@/prisma/site-settings/get";
import { Header } from "./components/global/header/header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

let pageTitle = "Default";
export async function generateMetadata() {
  const siteSettings = await GetSiteSettings();
  if (siteSettings && siteSettings[0]) {
    pageTitle = siteSettings[0].title;
    return {
      title: siteSettings[0].title,
    };
  } else {
    return {
      title: "Default",
      description: "Default description",
    };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const siteSettings = await GetSiteSettings();
  const allNavigationItems = await GetAllNavigation();
  console.log('allNavigationItems', allNavigationItems);
  return (
    <html lang="en">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
        <Header navigationItems={allNavigationItems || []} title={pageTitle} />
        {children}
      </body>
    </html>
  );
}
