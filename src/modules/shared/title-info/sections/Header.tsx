import { getRuntime } from "@/util/getRuntime";

// Components
import { Icon } from "@/components/Icon";
import { Skeleton } from "@/components/Skeleton";

// Styles
import style from "./Header.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export function TitleInfoHeader({ data }: { data: MovieInfo & SeriesInfo }) {
  const backdropUrl = `https://image.tmdb.org/t/p/original${data.backdrop_path}`;
  const posterUrl = `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${data.poster_path}`;

  return (
    <header id="header" className={cx("header")}>
      <div className={cx("movieBackdrop")} style={{ backgroundImage: `url(${backdropUrl})` }} />
      <img src={posterUrl} alt={data.title} className={cx("moviePoster")} />
      <section className={cx("movieHeader")}>
        <h1 className={cx("movieTitle")}>{data.title || data.name}</h1>
        <div className={cx("movieDetailList")}>
          <span className={cx("movieDetailItem")}>
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
          <span className={cx("movieDetailItem")}>
            <span>
              <header className={cx("title")}>
                <h3>
                  {new Date(data.release_date || data.first_air_date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                </h3>
              </header>
              <div className={cx("subtext")}>{data.release_date ? "released" : "premiered"}</div>
            </span>
          </span>
          {data.runtime || data.episode_run_time.length && (
            <span className={cx("movieDetailItem")}>
              <span>
                <header className={cx("title")}>
                  <h3>
                    {getRuntime(data.runtime || data.episode_run_time[0])}
                  </h3>
                </header>
                <div className={cx("subtext")}>runtime</div>
              </span>
            </span>
          )}
        </div>
      </section>
    </header>
  );
}

export function TitleInfoHeaderSkeleton() {
  return (
    <header
      id="header"
      className={cx("headerSkeleton")}
    >
      <Skeleton id="movieBackdrop" style={{ position: "absolute", zIndex: "-1", top: "var(--content-nav-height)", right: "0", left: "0", height: "inherit" }} />
      <Skeleton id="moviePoster" className={cx("moviePoster", "posterSkeleton")} />
      <section className={cx("movieHeader")}>
        <Skeleton
          id="movieTitle"
          width={180}
          height={20}
          type="text"
        />
        <div className={cx("movieDetailList")}>
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
