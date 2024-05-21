// Components
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/Button";

// Styles
import style from "./Overview.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export function MovieInfoOverview({ movie }: { movie: MovieInfo }) {
  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  const posterUrl = `https://image.tmdb.org/t/p/w342${movie.poster_path}`;
  const trailerUrl = `https://youtu.be/${
    movie.videos.results.find((video) => video.type === "Trailer")?.key
  }`;

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 60);
    const remainingMinutes = time % 60;
    let formattedTime = "";

    if (hours > 0) {
      formattedTime += hours + "h ";
    }

    if (remainingMinutes > 0 || formattedTime === "") {
      formattedTime += remainingMinutes + "m";
    }

    return formattedTime;
  };

  return (
    <section id="overview" className={cx("overview")}>
      <img src={posterUrl} alt={movie.title} className={cx("moviePoster")} />
      <div className={cx("overviewInfo")}>
        <h1 className={cx("movieTitle")}>{movie.title}</h1>
        <div className={cx("movieDetails")}>
          <span>{new Date(movie.release_date).getFullYear()}</span>
          <span>{formatTime(movie.runtime)}</span>
        </div>
        <div className={cx("movieGenres")}>
          {movie.genres
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((genre, idx) => (
              <>
                <Link key={genre.name} href={`/genre/${genre.id}`}>
                  {genre.name}
                </Link>
                {idx !== movie.genres.length - 1 && ", "}
              </>
            ))}
        </div>
        <div className={cx("movieRating")}>
          <Icon icon="star" className={cx("ratingIcon")} />
          <span>
            <span className={cx("voteAverage")}>
              {movie.vote_average.toFixed(1).replace(".0", "")}
            </span>
            /10
          </span>
          <span>
            (
            {new Intl.NumberFormat("en-US", {
              notation: "compact",
            }).format(movie.vote_count)}
            )
          </span>
        </div>
        <div className={cx("actions")}>
          <Button
            color="blue"
            size="lg"
            leading={<Icon icon="bookmark" size={18} />}
            trailing={<Icon icon="chevron-down" size={18} />}
          >
            Add to Watchlist
          </Button>
          <Button
            color="gray"
            variant="soft"
            size="lg"
            as="a"
            href={trailerUrl}
            target="_blank"
            rel="noopener noreferrer"
            leading={<Icon icon="play" size={18} />}
          >
            Play Trailer
          </Button>
        </div>
        <p className={cx("movieOverview")}>{movie.overview}</p>
        <div className={cx("crewOverview")}>
          <CrewGroup
            title="Director"
            people={movie.credits.crew.filter(
              (person) => person.job === "Director"
            )}
          />
          <CrewGroup
            title="Writer"
            people={movie.credits.crew.filter(
              (person) => person.department === "Writing"
            )}
          />
          <CrewGroup
            title="Star"
            people={movie.credits.cast
              .sort((a, b) => a.order! - b.order!)
              .slice(0, 3)}
          />
        </div>
      </div>
    </section>
  );
}

interface CrewGroupProps {
  title: string;
  people: Cast[];
}

function CrewGroup(props: CrewGroupProps) {
  const { title, people } = props;

  return (
    <div className={cx("crewGroup")}>
      <span className={cx("title")}>
        {title + (people.length > 1 ? "s" : "")}
      </span>
      <ul className={cx("personGroup")}>
        {people.slice(0, 3).map((person) => (
          <li key={person.name} className={cx("person")}>
            <Link href={`/person/${person.id}`}>{person.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
