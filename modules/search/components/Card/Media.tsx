import { slugify } from "@/util/slugify";
import { TMDB_IMAGE_BASE_POSTER } from "@/constants/image";

// Components
import Link from "next/link";

// Styles
import style from "./Media.module.scss";
import classNames from "classnames/bind";

interface SearchTitleCardProps extends React.HTMLAttributes<HTMLElement> {
  type: "movie" | "tv";
  media: Result;
}

const cx = classNames.bind(style);

export function SearchMediaCard(props: SearchTitleCardProps) {
  const { media, type, className, ...cardProps } = props;

  const infoPageUrl = `/${type}/${`${slugify(media.title! || media.name!)}-${media.id}`}`;
  const posterUrl = TMDB_IMAGE_BASE_POSTER + media.poster_path;

  return (
    <article
      {...cardProps}
      className={cx("searchTitleCard", className)}
      typeof="Movie"
    >
      <Link href={infoPageUrl} className={cx("posterLink")}>
        <img
          src={posterUrl}
          alt={media.title}
          draggable="false"
          className={cx("mediaPoster")}
        />
      </Link>
      <div className={cx("mediaInfo")}>
        <Link href={infoPageUrl}>
          <span className={cx("mediaTitle")} title={media.title || media.name}>
            {media.title || media.name}
          </span>
        </Link>
        <div className={cx("mediaDetails")}>
          {(media.release_date || media.first_air_date) ? (<span>{new Date(media.release_date! || media.first_air_date!).getFullYear()}</span>) : null}
          <span>{media.media_type === "movie" ? "Movie" : "TV Series"}</span>
        </div>
      </div>
    </article>
  );
}
