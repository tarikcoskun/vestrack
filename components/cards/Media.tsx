import { slugify } from "@/util/slugify";
import { TMDB_IMAGE_BASE_POSTER } from "@/constants/image";

// Components
import Link from "next/link";
import Image from "next/image";
import { Icon } from "../Icon";
import { Skeleton } from "../Skeleton";

// Styles
import style from "./Media.module.scss";
import classNames from "classnames/bind";

interface MediaCardProps extends React.HTMLAttributes<HTMLElement> {
  type: "movie" | "tv";
  media: Result;
  withRating?: boolean;
}

const cx = classNames.bind(style);

export function MediaCard(props: MediaCardProps) {
  const { media, type, withRating = true, className, ...cardProps } = props;

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
            <Image
              src={posterUrl}
              alt={media.title! || media.name!}
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
            )}
      </Link>
      <div className={cx("mediaInfo")}>
        <Link href={infoPageUrl}>
          <span className={cx("mediaTitle")} title={media.title || media.name}>{media.title || media.name}</span>
        </Link>
        <div className={cx("mediaDetails")}>
          {withRating && (
            <span className={cx("rating")}>
              <Icon icon="star" variant="fill" style={{ color: "var(--color-yellow)" }} />
              <span>{media.vote_average.toFixed(1).replace(".0", "")}</span>
            </span>
          )}
          <span>{new Date(media.release_date! || media.first_air_date!).getFullYear()}</span>
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
