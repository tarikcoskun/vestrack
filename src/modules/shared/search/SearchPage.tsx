"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { notifyError } from "@/util/notifyError";
import { getSearchData, type SearchResponse } from "./getSearchData";

// Components
import { SearchTitleCard } from "./components/Card/Title";

// Styles
import style from "./SearchPage.module.scss";
import classNames from "classnames/bind";
import { SearchPersonCard } from "./components/Card/Person";

const cx = classNames.bind(style);

export function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")!;
  const [data, setData] = useState<SearchResponse | null>(null);

  useEffect(() => {
    fetchData()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        notifyError(err);
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
          {data?.titles.map((title) => (
            <SearchTitleCard key={title.id} movie={title} type={title.media_type as "movie" | "tv"} />
          ))}
        </div>
      </section>
      <section className={cx("resultContainer")}>
        <h1>People</h1>
        <div className={cx("resultList")}>
          {data?.people.map((person) => (
            <SearchPersonCard key={person.id} person={person} />
          ))}
        </div>
      </section>
    </main>
  );
}


