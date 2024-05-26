import type { Metadata } from "next";

import classNames from "classnames";
import { Toaster } from "sonner";

// Components
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

// Styles
import "@/styles/globals.scss";
import { DM_Sans } from "next/font/google";

const font = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

interface BaseLayoutProps {
  maxWidth?: boolean;
  children?: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Vestrack",
  description: "Vestrack is a movie & tv series tracker",
};

export default function RootLayout(props: BaseLayoutProps) {
  const { maxWidth = true, children } = props;

  return (
    <html
      lang="en"
      style={{
        fontFamily: font.style.fontFamily,
      }}
    >
      <body>
        <Header />
        <div
          className="contentPadding"
          style={{
            minHeight: "calc(100vh - var(--content-nav-height))",
          }}
        >
          <Toaster position="bottom-right" richColors />
          <div
            style={{ minHeight: "inherit" }}
            className={classNames("inlineCenter", {
              contentWidth: maxWidth,
            })}
          >
            {children}
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
