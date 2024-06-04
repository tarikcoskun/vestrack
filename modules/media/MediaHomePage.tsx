"use client";

import { useEffect, useState } from "react";
import { notifyError } from "@/util/notifyError";
import { getHomeData } from "./getHomeData";

// Components
import { MediaCard, MediaCardSkeleton } from "@/components/cards/Media";
import { FeaturedCard, FeaturedCardSkeleton } from "@/components/cards/Featured";

// Styles
import style from "./MediaHomePage.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export function MediaHomePage({ type }: { type: "movie" | "tv" }) {
  const [data, setData] = useState<{ discovery: Result[]; trending: Result[] } | null>(null);

  useEffect(() => {
    const fetchData = async () => await getHomeData(type);

    fetchData()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        notifyError(err);
      });
  }, []);

  return (
    <main className={cx("mediaHomePage")}>
      <section className={cx("discoveryContainer")}>
        <h1>Watch Next</h1>
        <div className={cx("discoveryList")}>
          {data
            ? data.discovery.slice(0, 2).map((media) => (
              <FeaturedCard key={media.id} media={media} type={type} />
            ))
            : Array(2).fill(0).map((_, idx) => (
              <FeaturedCardSkeleton key={idx} />
            ))}
        </div>
      </section>
      <section className={cx("trendingContainer")}>
        <h1>Trending {type === "movie" ? "Movies" : "Series"}</h1>
        <div className={cx("trendingList")}>
          {data
            ? data.trending.map((media) => (
              <MediaCard key={media.id} media={media as Result} type={type} />
            ))
            : Array(12).fill(0).map((_, idx) => (
              <MediaCardSkeleton key={idx} />
            ))}
        </div>
      </section>
    </main>
  );
}