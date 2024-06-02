"use client";

import { useEffect, useState } from "react";
import { notifyError } from "@/util/notifyError";
import { getHomeData } from "../shared/home/getHomeData";

// Components
import { MediaCard, MediaCardSkeleton } from "@/components/cards/Media";
import { FeaturedCard, FeaturedCardSkeleton } from "@/components/cards/Featured";

// Styles
import style from "./SeriesHomePage.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export function SeriesPage() {
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
      return await getHomeData("tv");
    }
  }, []);

  return (
    <main className={cx("seriesPage")}>
      <section className={cx("discoveryContainer")}>
        <h1>Watch Next</h1>
        <div className={cx("discoveryList")}>
          {data
            ? data.discovery.slice(0, 2).map((movie) => (
              <FeaturedCard key={movie.id} media={movie} type="movie" />
            ))
            : Array(2).fill(0).map((_, idx) => (
              <FeaturedCardSkeleton key={idx} />
            ))}
        </div>
      </section>
      <section className={cx("trendingContainer")}>
        <h1>Trending Series</h1>
        <div className={cx("trendingList")}>
          {data
            ? data.trending.map((movie) => (
              <MediaCard key={movie.id} media={movie as Result} type="movie" />
            ))
            : Array(12).fill(0).map((_, idx) => (
              <MediaCardSkeleton key={idx} />
            ))}
        </div>
      </section>
    </main>
  );
}
