"use client";

import { useEffect, useState } from "react";
import { notifyError } from "@/util/notifyError";
import { getHomeData } from "../shared/home/getHomeData";

// Components
import { MediaCard } from "@/components/cards/Media";
import { FeaturedCard } from "@/components/cards/Featured";

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
      {data
        ? (
          <>
            <section className={cx("discoveryContainer")}>
              <h1>Watch Next</h1>
              <div className={cx("discoveryList")}>
                {data.discovery.slice(0, 2).map((media) => (
                  <FeaturedCard key={media.id} media={media} type="tv" />
                ))}
              </div>
            </section>

            <section className={cx("trendingContainer")}>
              <h1>Trending Series</h1>
              <div className={cx("trendingList")}>
                {data.trending.map((media) => (
                  <MediaCard key={media.id} media={media as Result} type="tv" />
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
