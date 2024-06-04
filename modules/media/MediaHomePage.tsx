"use client";

import { useEffect, useState } from "react";
import { notifyError } from "@/util/notifyError";
import { getMediaHomeData } from "./getMediaHomeData";

// Components
import { Section } from "@/components/Section";
import { MediaCard, MediaCardSkeleton } from "@/components/cards/Media";

// Styles
import style from "./MediaHomePage.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export function MediaHomePage({ type }: { type: "movie" | "tv" }) {
  const [data, setData] = useState<{ trending: Result[]; topRated: Result[] } | null>(null);

  useEffect(() => {
    const fetchData = async () => await getMediaHomeData(type);

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
      <Section>
        <h1>Trending {type === "movie" ? "Movies" : "Series"}</h1>
        <div className={cx("gridList")}>
          {data
            ? data.trending.map((media) => (
              <MediaCard key={media.id} media={media} type={type} />
            ))
            : Array(12).fill(0).map((_, idx) => (
              <MediaCardSkeleton key={idx} />
            ))}
        </div>
      </Section>
    </main>
  );
}
