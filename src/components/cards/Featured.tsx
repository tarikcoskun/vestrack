import { slugify } from "@/util/slugify";

// Components
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/Button";

// Styles
import style from "./Featured.module.scss";
import classNames from "classnames/bind";

interface FeaturedCardProps {
  type: "movie" | "tv";
  media: DiscoveryResult;
}

const cx = classNames.bind(style);

export function FeaturedCard(props: FeaturedCardProps) {
  const { media, type } = props;

  const posterUrl = `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${media.poster_path}`;
  const backdropUrl = `https://image.tmdb.org/t/p/original${media.backdrop_path}`;

  return (
    <article className={cx("featuredCard")} typeof="Movie">
      <div
        className={cx("backdrop")}
        style={{
          backgroundImage: `url(${backdropUrl})`,
        }}
      />
      <div className={cx("infoContainer")}>
        <Link href={`/${type}/${`${slugify(media.title)}-${media.id}`}`} className={cx("posterLink")}>
          <img
            src={posterUrl}
            alt={media.title}
            draggable="false"
            className={cx("mediaPoster")}
          />
        </Link>
        <div className={cx("mediaInfo")}>
          <div className={cx("mediaRating")}>
            <Icon icon="star" variant="fill" className={cx("ratingIcon")} />
            <span>{media.vote_average.toFixed(1).replace(".0", "")}</span>
          </div>
          <Link href={`/movie/${media.id}`}>
            <span className={cx("mediaTitle")}>{media.title}</span>
          </Link>
          <p className={cx("mediaOverview")}>{media.overview}</p>
          <div className={cx("actions")}>
            <Button color="gray" variant="ghost" leading={<Icon icon="play" variant="fill" />}>
              Play Trailer
            </Button>
            <Button
              color="gray"
              variant="ghost"
              leading={<Icon icon="bookmark" variant="fill" />}
            >
              Add to Watchlist
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
