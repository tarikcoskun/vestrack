"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// Data
import { navbarLinks } from "@/data/layout";

// Components
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/Button";
import { Input } from "@/components/forms/Input";

// Styles
import style from "./Navbar.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    router.push(`/search?q=${query}`);
  };

  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = "hidden";
    }
    else {
      document.body.removeAttribute("style");
    }
  }, [mobileMenu]);

  useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  return (
    <header role="banner" className={`${cx("navbar")} contentPadding`}>
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
                  <Icon icon={link.icon} variant={pathname === link.href ? "fill" : "line"} size={24} className={cx("linkIcon")} />
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <form onSubmit={handleSubmit} className={cx("searchBar")}>
          <Input
            type="search"
            placeholder="Search for movies, tv series, people..."
            containerClassName={cx("searchBar")}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            trailing={(
              <Button
                type="submit"
                padding={false}
                aria-label="Search"
                className={cx("searchButton")}
                style={{ color: "var(--theme-text-body)" }}
              >
                <Icon icon="search" size={20} />
              </Button>
            )}
          />
        </form>

        <div className={cx("menus")}>
          <Button
            color="gray"
            variant="ghost"
            className={cx("userMenu")}
            style={{ color: "var(--theme-text-button)" }}
          >
            Login
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
