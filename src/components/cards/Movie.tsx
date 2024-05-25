import { slugify } from "@/util/slugify";

// Components
import Link from "next/link";

// Styles
import style from "./Movie.module.scss";
import classNames from "classnames/bind";

interface MovieCardProps extends React.HTMLAttributes<HTMLElement> {
  type: "movie" | "tv";
  movie: Result;
}

const cx = classNames.bind(style);

export function MovieCard(props: MovieCardProps) {
  const { movie, type, className, ...cardProps } = props;

  const infoPageUrl = `/${type}/${slugify(movie.title! || movie.name!) + "-" + movie.id}`;
  const posterUrl = `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`;

  return (
    <article
      {...cardProps}
      className={cx("movieCard", className)}
      typeof="Movie"
    >
      <Link href={infoPageUrl} className={cx("posterLink")}>
        <img
          src={posterUrl}
          alt={movie.title}
          draggable="false"
          className={cx("moviePoster")}
        />
      </Link>
      <div className={cx("movieInfo")}>
        <Link href={infoPageUrl}>
          <span className={cx("movieTitle")} title={movie.title || movie.name}>
            {movie.title || movie.name}
          </span>
        </Link>
        <div className={cx("releaseYear")}>
          {new Date(movie.release_date! || movie.first_air_date!).getFullYear()}
        </div>
      </div>
    </article>
  );
}
