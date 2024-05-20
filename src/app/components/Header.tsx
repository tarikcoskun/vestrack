"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

// Data
import { navbarLinks } from "@/data/layout";

// Components
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/Button";
import { Input } from "@/components/Form/Input";

// Styles
import style from "./Header.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export function Header() {
  const pathname = usePathname();
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header role="banner" className={cx("navbar") + " contentPadding"}>
      <div className={cx("navbarContent")}>
        <Link href="/">
          <span className={cx("brandLogo")}>Vestrack</span>
        </Link>

        <nav
          className={cx("navigation")}
          data-menu-state={mobileMenu ? "active" : "inactive"}
        >
          <ul className={cx("links")}>
            {navbarLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={cx("link")}
                  data-state={pathname === link.href ? "active" : "inactive"}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Input
          type="search"
          placeholder="Search for movies, tv shows, people..."
          containerClassName={cx("searchBar")}
          trailing={
            <Button
              padding={false}
              aria-label="Search"
              className={cx("searchButton")}
              style={{ color: "var(--theme-text-body)" }}
            >
              <Icon icon="search" size={20} />
            </Button>
          }
        />

        <div className={cx("menus")}>
          <Button
            color="gray"
            variant="ghost"
            className={cx("userMenu")}
            leading={<Icon icon="user" size={20} />}
            style={{ color: "var(--theme-text-button)" }}
          >
            User
          </Button>

          <Button
            color="gray"
            variant="ghost"
            padding={false}
            aria-label="Mobile menu"
            className={cx("mobileMenu")}
            onClick={() => setMobileMenu((val) => !val)}
            leading={<Icon icon={mobileMenu ? "x" : "menu"} size={24} />}
            style={{ color: "var(--theme-text-button)" }}
          />
        </div>
      </div>
    </header>
  );
}
