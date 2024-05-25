// Components
import Link from "next/link";
import { Button } from "@/components/Button";

// Styles
import style from "./not-found.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export default function NotFoundPage() {
  return (
    <main className={cx("notFoundPage")}>
      <h1>Error 404</h1>
      <div>The page you are looking for does not exist.</div>
      <Button color="blue" variant="ghost" as={Link} href="/">Back to Home</Button>
    </main>
  );
}
