import { slugify } from "@/util/slugify";
import { TMDB_IMAGE_BASE_POSTER } from "@/constants/image";

// Components
import Link from "next/link";
import { Icon } from "../Icon";
import { Skeleton } from "../Skeleton";

// Styles
import style from "./Media.module.scss";
import classNames from "classnames/bind";

interface MediaCardProps extends React.HTMLAttributes<HTMLElement> {
  type: "movie" | "tv";
  media: Result;
}

const cx = classNames.bind(style);

export function MediaCard(props: MediaCardProps) {
  const { media, type, className, ...cardProps } = props;

  const infoPageUrl = `/${type}/${`${slugify(media.title! || media.name!)}-${media.id}`}`;
  const posterUrl = TMDB_IMAGE_BASE_POSTER + media.poster_path;

  return (
    <article
      {...cardProps}
      className={cx("mediaCard", className)}
      typeof="Movie"
    >
      <Link href={infoPageUrl} className={cx("posterLink")}>
        {media.poster_path
          ? (
            <img
              src={posterUrl}
              alt={media.title}
              draggable="false"
              className={cx("mediaPoster")}
            />
            )
          : (
            <div className={cx("mediaPosterFallback")}>
              <Icon icon="image" size={64} />
            </div>
            )}
      </Link>
      <div className={cx("mediaInfo")}>
        <Link href={infoPageUrl}>
          <span className={cx("mediaTitle")} title={media.title || media.name}>
            {media.title || media.name}
          </span>
        </Link>
        <div className={cx("releaseYear")}>
          {new Date(media.release_date! || media.first_air_date!).getFullYear()}
        </div>
      </div>
    </article>
  );
}

export function MediaCardSkeleton() {
  return (
    <div>
      <Skeleton style={{ width: "100%", aspectRatio: "2/3" }} />
      <Skeleton width={140} height={18.11} type="text" style={{ marginTop: "1rem" }} />
      <Skeleton width={100} height={16.09} type="text" style={{ marginTop: "0.5rem" }} />
    </div>
  );
}
