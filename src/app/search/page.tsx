"use client";

import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { notifyError } from "@/util/notifyError";

// Components
import { MovieCard } from "@/components/cards/Movie";

// Styles
import style from "./page.module.scss";
import classNames from "classnames/bind";
import { Tabs } from "@/components/Tabs";

interface SearchResponse {
  movies: Result[];
  shows: Result[];
  people: Person[];
}

const cx = classNames.bind(style);

export default function SearchPage() {
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
      <Tabs defaultValue="movies" orientation="vertical">
        <Tabs.List style={{ flexDirection: "column" }}>
          <Tabs.Trigger value="movies">Movies</Tabs.Trigger>
          <Tabs.Trigger value="shows">TV Shows</Tabs.Trigger>
          <Tabs.Trigger value="people">People</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="movies">
          <section className={cx("resultContainer")}>
            <h1>Movies</h1>
            <div className={cx("resultList")}>
              {data?.movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie as Result} type="movie" />
              ))}
            </div>
          </section>
        </Tabs.Content>
        <Tabs.Content value="shows">
          <section className={cx("resultContainer")}>
            <h1>TV Shows</h1>
            <div className={cx("resultList")}>
              {data?.shows.map((movie) => (
                <MovieCard key={movie.id} movie={movie as Result} type="tv" />
              ))}
            </div>
          </section>
        </Tabs.Content>
      </Tabs>
    </main>
  );
}

function getSearchData(query: string) {
  return axios
    .get<SearchResponse>("/search", { params: { query } })
    .then((res) => res.data);
}
