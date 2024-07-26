import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { type Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { extractRouterConfig } from "uploadthing/server";
import { ThemeProvider } from "~/components/theme-provider";
import { Toaster } from "~/components/ui/sonner";
import { TooltipProvider } from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";
import { TRPCReactProvider } from "~/trpc/react";
import { TopNav } from "./_components/nav/top-nav";

import { ourFileRouter } from "~/app/api/uploadthing/core";
export const metadata: Metadata = {
  title: "Coworking Space Booking App",
  description: "Book coworking spaces and meeting rooms easily.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const Footer = () => {
  return (
    <footer className="flex w-full flex-col items-center justify-center p-12">
      Copyright © 2024 Abderrahmen MHEMED. All rights reserved.
    </footer>
  );
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "dots-bg flex h-full min-h-screen w-full flex-col items-center bg-background font-sans antialiased",
            fontSans.variable,
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              <TRPCReactProvider>
                <div className="h-full w-full max-w-screen-xl">
                  <TopNav />
                  <NextSSRPlugin
                    routerConfig={extractRouterConfig(ourFileRouter)}
                  />

                  {children}
                  {/* <Footer /> */}
                </div>
                <Toaster />
              </TRPCReactProvider>
            </TooltipProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
