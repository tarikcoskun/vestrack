import { slugify } from "@/util/slugify";

// Components
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/Button";

// Styles
import style from "./Featured.module.scss";
import classNames from "classnames/bind";

interface MovieCardProps {
  type: "movie" | "tv";
  movie: DiscoveryResult;
}

const cx = classNames.bind(style);

export function FeaturedCard(props: MovieCardProps) {
  const { movie, type } = props;

  const posterUrl = `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`;
  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  return (
    <article className={cx("featuredCard")} typeof="Movie">
      <div
        className={cx("backdrop")}
        style={{
          backgroundImage: `url(${backdropUrl})`,
        }}
      />
      <div className={cx("infoContainer")}>
        <Link href={`/${type}/${slugify(movie.title) + "-" + movie.id}`} className={cx("posterLink")}>
          <img
            src={posterUrl}
            alt={movie.title}
            draggable="false"
            className={cx("moviePoster")}
          />
        </Link>
        <div className={cx("movieInfo")}>
          <div className={cx("movieRating")}>
            <Icon icon="star" variant="fill" className={cx("ratingIcon")} />
            <span>{movie.vote_average.toFixed(1).replace(".0", "")}</span>
          </div>
          <Link href={`/movie/${movie.id}`}>
            <span className={cx("movieTitle")}>{movie.title}</span>
          </Link>
          <p className={cx("movieOverview")}>{movie.overview}</p>
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
