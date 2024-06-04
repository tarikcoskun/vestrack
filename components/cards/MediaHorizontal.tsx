import { slugify } from "@/util/slugify";
import { TMDB_IMAGE_BASE_BACKDROP } from "@/constants/image";

// Components
import Link from "next/link";
import { Icon } from "../Icon";
import { Skeleton } from "../Skeleton";

// Styles
import style from "./MediaHorizontal.module.scss";
import classNames from "classnames/bind";

interface MediaHorizontalCardProps extends React.HTMLAttributes<HTMLElement> {
  type: "movie" | "tv";
  media: Result;
}

const cx = classNames.bind(style);

export function MediaHorizontalCard(props: MediaHorizontalCardProps) {
  const { media, type, className, ...cardProps } = props;

  const infoPageUrl = `/${type}/${`${slugify(media.title! || media.name!)}-${media.id}`}`;
  const backdropUrl = TMDB_IMAGE_BASE_BACKDROP + media.backdrop_path;

  return (
    <Link href={infoPageUrl} style={{ textDecoration: "none" }}>
      <article
        {...cardProps}
        className={cx("mediaHorizontalCard", className)}
        typeof="Movie"
        style={{ backgroundImage: backdropUrl }}
      >
        {media.backdrop_path
          ? (
            <img
              src={backdropUrl}
              alt={media.title || media.name}
              draggable="false"
              className={cx("mediaBackdrop")}
            />
            )
          : (
            <div className={cx("mediaBackdropFallback")}>
              <Icon icon="image" size={64} />
            </div>
            )}
        <div className={cx("mediaInfo")}>
          <div className={cx("mediaTitle")} title={media.title || media.name}>
            {media.title || media.name}
          </div>
          <div className={cx("mediaDetails")}>
            <span className={cx("rating")}>
              <Icon icon="star" variant="fill" style={{ color: "var(--color-yellow)" }} />
              <span>{media.vote_average.toFixed(1).replace(".0", "")}</span>
            </span>
            <span>{new Date(media.release_date! || media.first_air_date!).getFullYear()}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export function MediaCardHorizontalSkeleton() {
  return (
    <div>
      <Skeleton style={{ width: "100%", aspectRatio: "16/9" }} />
    </div>
  );
}
