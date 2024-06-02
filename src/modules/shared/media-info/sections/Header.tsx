import { getRuntime } from "@/util/getRuntime";
import { TMDB_IMAGE_BASE_BACKDROP, TMDB_IMAGE_BASE_POSTER } from "@/constants/image";

// Components
import { Icon } from "@/components/Icon";
import { Skeleton } from "@/components/Skeleton";

// Styles
import style from "./Header.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export function MediaInfoHeader({ data }: { data: MovieInfo & SeriesInfo }) {
  const backdropUrl = TMDB_IMAGE_BASE_BACKDROP + data.backdrop_path;
  const posterUrl = TMDB_IMAGE_BASE_POSTER + data.poster_path;

  return (
    <header id="header" className={cx("header")} data-backdrop={Boolean(data.backdrop_path)}>
      <div className={cx("mediaBackdrop")} style={{ backgroundImage: `url(${backdropUrl})` }} />
      <img src={posterUrl} alt={data.title} className={cx("mediaPoster")} />
      <section className={cx("mediaHeader")}>
        <h1 className={cx("mediaTitle")}>{data.title || data.name}</h1>
        <div className={cx("mediaDetailList")}>
          <span className={cx("mediaDetailItem")}>
            <Icon icon="star" variant="fill" size={32} className={cx("ratingStar")} style={{ color: "var(--dynamic-yellow-600)" }} />
            <span>
              <header className={cx("title")}>
                <h3>
                  {data.vote_average.toFixed(1).replace(".0", "")}
                </h3>/10
                <Icon icon="star" variant="fill" size={12} className={cx("ratingStarMb")} style={{ color: "var(--dynamic-yellow-600)" }} />
              </header>
              <div className={cx("subtext")}>{new Intl.NumberFormat("en-US", { notation: "compact" }).format(data.vote_count)} votes</div>
            </span>
          </span>
          <span className={cx("mediaDetailItem")}>
            <span>
              <header className={cx("title")}>
                <h3>
                  {new Date(data.release_date || data.first_air_date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                </h3>
              </header>
              <div className={cx("subtext")}>{data.release_date ? "released" : "premiered"}</div>
            </span>
          </span>
          {(data.runtime || data.episode_run_time.length)
            ? (
              <span className={cx("mediaDetailItem")}>
                <span>
                  <header className={cx("title")}>
                    <h3>
                      {getRuntime(data.runtime || data.episode_run_time[0])}
                    </h3>
                  </header>
                  <div className={cx("subtext")}>runtime</div>
                </span>
              </span>
              )
            : null}
        </div>
      </section>
    </header>
  );
}

export function MediaInfoHeaderSkeleton() {
  return (
    <header
      id="header"
      className={cx("headerSkeleton")}
    >
      <Skeleton id="mediaBackdrop" style={{ position: "absolute", zIndex: "-1", top: "var(--content-nav-height)", right: "0", left: "0", height: "inherit" }} />
      <Skeleton id="mediaPoster" className={cx("mediaPoster", "posterSkeleton")} />
      <section className={cx("mediaHeader")}>
        <Skeleton
          id="mediaTitle"
          width={180}
          height={20}
          type="text"
        />
        <div className={cx("mediaDetailList")}>
          <Skeleton
            id="metadataItem"
            width={140}
            height={32.19}
          />
          <Skeleton
            id="metadataItem"
            width={120}
            height={32.19}
          />
          <Skeleton
            id="metadataItem"
            width={100}
            height={32.19}
          />
        </div>
      </section>
    </header>
  );
}
