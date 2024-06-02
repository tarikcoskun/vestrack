"use client";

import { useEffect, useState } from "react";
import { notifyError } from "@/util/notifyError";
import { getHomeData } from "../shared/home/getHomeData";

// Components
import { MediaCard } from "@/components/cards/Media";
import { FeaturedCard } from "@/components/cards/Featured";

// Styles
import style from "./MoviesHomePage.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export function MoviesPage() {
  const [data, setData] = useState<{ discovery: Result[]; trending: Result[] } | null>(null);

  useEffect(() => {
    fetchData()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        notifyError(err);
      });

    async function fetchData() {
      return await getHomeData("movie");
    }
  }, []);

  return (
    <main className={cx("moviesPage")}>
      {data
        ? (
          <>
            <section className={cx("discoveryContainer")}>
              <h1>Watch Next</h1>
              <div className={cx("discoveryList")}>
                {data.discovery.slice(0, 2).map((movie) => (
                  <FeaturedCard key={movie.id} media={movie} type="movie" />
                ))}
              </div>
            </section>

            <section className={cx("trendingContainer")}>
              <h1>Trending Movies</h1>
              <div className={cx("trendingList")}>
                {data.trending.map((movie) => (
                  <MediaCard key={movie.id} media={movie as Result} type="movie" />
                ))}
              </div>
            </section>
          </>
          )
        : (
          <div>Loading...</div>
          )}
    </main>
  );
}
