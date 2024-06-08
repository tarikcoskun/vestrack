"use client";

import { useEffect, useRef, useState } from "react";
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
  const [mobileSearch, setMobileSearch] = useState(false);
  const mobileSearchRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    router.push(`/search?q=${query}`);
  };

  useEffect(() => {
    if (mobileMenu) document.body.style.overflow = "hidden";
    else document.body.removeAttribute("style");
  }, [mobileMenu]);

  useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  return (
    <header role="banner" className={cx("navbar", ["contentPadding"])}>
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
                  <Icon icon={link.icon} variant={pathname === link.href ? "fill" : "line"} size={24} />
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
            padding={false}
            aria-label="Search"
            className={cx("mobileSearch")}
            onClick={() => {
              setMobileSearch(true);
              setTimeout(() => mobileSearchRef.current?.focus());
            }}
            style={{ color: "var(--theme-text-button)" }}
          >
            <Icon icon="search" size={22} />
          </Button>

          <Button
            color="gray"
            variant="ghost"
            padding={false}
            aria-label="Mobile menu"
            className={cx("mobileMenu")}
            onClick={() => setMobileMenu((val) => !val)}
            style={{ color: "var(--theme-text-button)" }}
          >
            <Icon icon={mobileMenu ? "x" : "menu"} size={24} />
          </Button>
        </div>
      </div>

      {mobileSearch && (
        <div className={cx("mobileSearchOverlay")}>
          <form
            onSubmit={(event) => {
              handleSubmit(event);
              setMobileSearch(false);
            }}
            className={cx("searchBar")}
          >
            <Input
              type="search"
              placeholder="Search for movies, tv series, people..."
              containerClassName={cx("searchBar")}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className={cx("searchInput")}
              ref={mobileSearchRef}
              trailing={(
                <Button
                  type="button"
                  padding={false}
                  aria-label="Close search"
                  onClick={() => setMobileSearch(false)}
                  style={{ color: "var(--theme-text-body)" }}
                >
                  <Icon icon="x" size={20} />
                </Button>
              )}
            />
          </form>
        </div>
      )}
    </header>
  );
}
