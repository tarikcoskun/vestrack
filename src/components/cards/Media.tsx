import { slugify } from "@/util/slugify";

// Components
import Link from "next/link";

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
  const posterUrl = `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${media.poster_path}`;

  return (
    <article
      {...cardProps}
      className={cx("mediaCard", className)}
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
        <div className={cx("releaseYear")}>
          {new Date(media.release_date! || media.first_air_date!).getFullYear()}
        </div>
      </div>
    </article>
  );
}
