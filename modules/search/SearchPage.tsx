"use client";

import { useSearchData } from "./useSearchData";

// Components
import { Skeleton } from "@/components/Skeleton";
import { SearchMediaCard } from "./components/cards/Media";
import { SearchPersonCard } from "./components/cards/Person";

// Styles
import style from "./SearchPage.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export function SearchPage() {
  const { data } = useSearchData();

  return (
    <main className={cx("searchPage")}>
      <section className={cx("resultContainer")}>
        <h1>Titles</h1>
        <div className={cx("resultList")}>
          {data
            ? data?.titles.length
              ? data?.titles.map((title) => (
                <SearchMediaCard key={title.id} media={title} type={title.media_type as "movie" | "tv"} />
              ))
              : (
                <h3>No results</h3>
                )
            : Array(6).fill(0).map((_, idx) => <SearchCardSkeleton key={idx} />)}
        </div>
      </section>
      <section className={cx("resultContainer")}>
        <h1>People</h1>
        <div className={cx("resultList")}>
          {data
            ? data?.people.length
              ? data?.people.map((person) => (
                <SearchPersonCard key={person.id} person={person} />
              ))
              : (
                <h3>No results</h3>
                )
            : Array(6).fill(0).map((_, idx) => <SearchCardSkeleton key={idx} />)}
        </div>
      </section>
    </main>
  );
}

function SearchCardSkeleton() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <Skeleton width={80} height={120} />
      <div>
        <Skeleton width={120} height={18.11} type="text" />
        <Skeleton width={180} height={16.09} type="text" style={{ marginTop: "0.5rem" }} />
      </div>
    </div>
  );
}
