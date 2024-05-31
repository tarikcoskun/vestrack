// Data
import { footerLinks } from "@/data/layout";

// Components
import Link from "next/link";
import { Icon } from "@/components/Icon";

// Styles
import styles from "./Footer.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export function Footer() {
  return (
    <footer className={`${cx("footer")} contentPadding`}>
      <div className={cx("footerContent")}>
        <section className={cx("footerSection", "brand")}>
          <div className={cx("brandLogo")}>Vestrack</div>
          <div>Data provided by TMDB</div>
        </section>

        {Object.entries(footerLinks).map(([category, links]) => (
          <section key={category} className={cx("footerSection")}>
            <div className={cx("categoryTitle")}>{category}</div>
            <ul className={cx("categoryLinks")}>
              {links.map((link) => (
                <li key={link.label}>
                  {link.external
                    ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cx("link")}
                      >
                        <span>{link.label}</span>
                        <Icon icon="external-link" />
                      </a>
                      )
                    : (
                      <Link href={link.href} className={cx("link")}>
                        {link.label}
                      </Link>
                      )}
                </li>
              ))}
            </ul>
          </section>
        ))}

        <span className={cx("footerCopyright")}>
          &copy; {new Date().getFullYear()} Vestrack
        </span>
      </div>
    </footer>
  );
}
