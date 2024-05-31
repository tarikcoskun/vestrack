"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { notifyError } from "@/util/notifyError";
import { type SearchResponse, getSearchData } from "./getSearchData";

// Components
import { SearchMediaCard } from "./components/Card/Title";

// Styles
import style from "./SearchPage.module.scss";
import classNames from "classnames/bind";
import { SearchPersonCard } from "./components/Card/Person";
import { Skeleton } from "@/components/Skeleton";

const cx = classNames.bind(style);

export function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")!;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<SearchResponse | null>(null);

  useEffect(() => {
    fetchData()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        notifyError(err);
      })
      .finally(() => {
        setLoading(false);
      });

    async function fetchData() {
      return await getSearchData(query);
    }
  }, [query]);

  return (
    <main className={cx("searchPage")}>
      <section className={cx("resultContainer")}>
        <h1>Titles</h1>
        <div className={cx("resultList")}>
          {isLoading
            ? Array(6).fill(0).map((_, idx) => <SearchCardSkeleton key={idx} />)
            : data?.titles.length
              ? data?.titles.map((title) => (
                <SearchMediaCard key={title.id} media={title} type={title.media_type as "movie" | "tv"} />
              ))
              : (
                <h3>No results</h3>
                )}
        </div>
      </section>
      <section className={cx("resultContainer")}>
        <h1>People</h1>
        <div className={cx("resultList")}>
          {isLoading
            ? Array(6).fill(0).map((_, idx) => <SearchCardSkeleton key={idx} />)
            : data?.people.length
              ? data?.people.map((person) => (
                <SearchPersonCard key={person.id} person={person} />
              ))
              : (
                <h3>No results</h3>
                )}
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
