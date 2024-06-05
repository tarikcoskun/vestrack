import type { Metadata } from "next";

import classNames from "classnames";
import { Toaster } from "sonner";

// Components
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

// Styles
import "@/styles/globals.scss";
import { DM_Sans } from "next/font/google";

const font = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Vestrack",
  description: "Vestrack is a movie & tv series tracker",
  themeColor: "#171717",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html
      lang="en"
      style={{
        fontFamily: font.style.fontFamily,
      }}
    >
      <body>
        <Navbar />
        <div
          className="contentPadding"
          style={{
            minHeight: "calc(100vh - var(--content-nav-height))",
          }}
        >
          <div
            style={{ minHeight: "inherit" }}
            className={classNames("inlineCenter", ["contentWidth"])}
          >
            {children}
          </div>
          <Toaster position="bottom-right" richColors />
        </div>
        <Footer />
      </body>
    </html>
  );
}
