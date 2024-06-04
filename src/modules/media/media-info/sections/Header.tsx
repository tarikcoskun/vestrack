import { getRuntime } from "@/util/getRuntime";
import { TMDB_IMAGE_BASE_BACKDROP, TMDB_IMAGE_BASE_POSTER } from "@/constants/image";

// Components
import { Icon } from "@/components/Icon";
import { Skeleton } from "@/components/Skeleton";

// Styles
import style from "./Header.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export function MediaInfoHeader({ data }: { data: MovieInfo & SeriesInfo | null }) {
  const backdropUrl = TMDB_IMAGE_BASE_BACKDROP + data?.backdrop_path;
  const posterUrl = TMDB_IMAGE_BASE_POSTER + data?.poster_path;

  return (
    <header id="header" className={cx("header")} data-backdrop={Boolean(data?.backdrop_path)}>
      {data && <div className={cx("mediaBackdrop")} style={{ backgroundImage: `url(${backdropUrl})` }} />}
      {data
        ? data.poster_path
          ? (
            <img
              src={posterUrl}
              alt={data.title}
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
            <Skeleton width={300} height={28.17} type="text" />
            )}
        {data && (
          <div className={cx("mediaDetails")}>
            <div className={cx("detailList")}>
              <span>{new Date(data.release_date).getFullYear()}</span>
              <span>{getRuntime(data.runtime)}</span>
            </div>
            <span className={cx("rating")}>
              <Icon icon="star" variant="fill" style={{ color: "var(--color-yellow)" }} />
              <span>
                <span className={cx("ratingAmount")}>{data.vote_average.toFixed(1).replace(".0", "")}</span>/10
              </span>
              <span>({new Intl.NumberFormat("en-US", { notation: "compact" }).format(data.vote_count)} votes)</span>
            </span>
          </div>
        )}
      </section>
    </header>
  );
}
