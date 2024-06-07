"use client";

import { useState } from "react";
import { getRuntime } from "@/util/getRuntime";
import { TMDB_IMAGE_BASE_BACKDROP, TMDB_IMAGE_BASE_POSTER } from "@/constants/image";

// Components
import Image from "next/image";
import { Icon } from "@/components/Icon";
import { Skeleton } from "@/components/Skeleton";

// Styles
import style from "./Header.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export function MediaInfoHeader({ data }: { data: MediaInfo & SeriesInfo | null }) {
  const [backdropLoaded, setBackdropLoaded] = useState(false);

  const backdropUrl = TMDB_IMAGE_BASE_BACKDROP + data?.backdrop_path;
  const posterUrl = TMDB_IMAGE_BASE_POSTER + data?.poster_path;

  return (
    <header id="header" className={cx("header")} data-backdrop={Boolean(data?.backdrop_path && backdropLoaded)}>
      {data?.backdrop_path
        ? (
          <div className={cx("mediaBackdrop")}>
            <Image
              src={backdropUrl}
              alt={data.title}
              fill
              priority
              style={{ objectFit: "cover" }}
              onLoad={() => {
                setBackdropLoaded(true);
              }}
            />
          </div>
          )
        : (
          <div className={cx("mediaBackdropFallback")} />
          )}
      {data
        ? data.poster_path
          ? (
            <Image
              src={posterUrl}
              alt={data.title}
              width={300}
              height={450}
              draggable="false"
              className={cx("mediaPoster")}
            />
            )
          : (
            <div className={cx("mediaPosterFallback")}>
              <Icon icon="image" size={64} />
            </div>
            )
        : (
          <Skeleton className={cx("mediaPosterSkeleton")} />
          )}
      <section className={cx("mediaHeader")}>
        {data
          ? <h1 className={cx("mediaTitle")}>{data.title || data.name}</h1>
          : (
            <Skeleton
              height={28.17}
              type="text"
              style={{
                maxWidth: "300px",
                width: "100%",
              }}
            />
            )}
        {data
          ? (
            <div className={cx("mediaDetails")}>
              <div className={cx("detailList")}>
                {(data.release_date || data.first_air_date) ? (<span>{data.release_date ? new Date(data.release_date).getFullYear() : `${new Date(data.first_air_date).getFullYear()}–${!data.in_production ? new Date(data.last_air_date).getFullYear() : ""}`}</span>) : null}
                {(data.runtime || data.episode_run_time.length) ? (<span>{getRuntime(data.runtime || data.episode_run_time[0])}</span>) : null}
              </div>
              <span className={cx("rating")}>
                <Icon icon="star" variant="fill" style={{ color: "var(--color-yellow)" }} />
                <span>
                  <span className={cx("ratingAmount")}>{data.vote_average.toFixed(1).replace(".0", "")}</span>/10
                </span>
                <span>({new Intl.NumberFormat("en-US", { notation: "compact" }).format(data.vote_count)} votes)</span>
              </span>
            </div>
            )
          : (
            <div className={cx("mediaDetails")}>
              <Skeleton width={100} height={16.09} type="text" />
              <Skeleton width={150} height={16.09} type="text" />
            </div>
            )}
      </section>
    </header>
  );
}
