import { slugify } from "@/util/slugify";
import getGenreEmoji from "@/util/getGenreEmoji";

// Components
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/Button";
import { Skeleton } from "@/components/Skeleton";

// Styles
import style from "./Overview.module.scss";
import classNames from "classnames/bind";
import { Noto_Color_Emoji } from "next/font/google";

const emojiFont = Noto_Color_Emoji({
  weight: "400",
  subsets: ["emoji"]
});

const cx = classNames.bind(style);

function MovieInfoOverviewRoot({ movie }: { movie: MovieInfo }) {
  const posterUrl = `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`;
  const posterBlurUrl = `https://image.tmdb.org/t/p/w300_and_h450_multi_faces_filter%28blur%29/${movie.poster_path}`;
  const trailerUrl = `https://youtu.be/${movie.videos.results.find((video) => video.type === "Trailer")?.key}`;

  return (
    <section id="overview" className={cx("overview")}>
      <div className={cx("columnLeft")}>
        <img src={posterUrl} alt={movie.title} className={cx("moviePoster")} />
        <div className={cx("movieTrailer")} style={{ backgroundImage: `url(${posterBlurUrl})` }}>
          <Button
            as="a"
            href={trailerUrl}
            target="_blank"
            rel="noopener noreferrer"
            color="white"
            size="lg"
            padding="square"
            rounded="full"
            title="Play trailer"
            className={cx("playTrailer")}
          >
            <Icon icon="play" variant="fill" size={24} />
          </Button>
        </div>
      </div>
      <div className={cx("columnRight")}>
        <section className={cx("overviewInfo")}>
          <div className={cx("metadataList")}>
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
            <div className={cx("metadataItem")}>
              <span className={cx("title")}>
                {"Genre" + (movie.genres.length > 1 ? "s" : "")}
              </span>
              <ul className={cx("dataGroup")}>
                {movie.genres
                  .sort((a, b) => (a.name > b.name ? 1 : -1)).map((genre) => (
                    <li key={genre.id} className={cx("person")}>
                      <Button key={genre.name} as={Link} href={`/genre/${slugify(genre.name)}`} color="gray" variant="soft" size="sm" rounded="full" className={cx("movieGenre")}>
                        <span style={{ fontFamily: emojiFont.style.fontFamily }}>{getGenreEmoji(slugify(genre.name))}</span> {genre.name}
                      </Button>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <p className={cx("movieOverview")}>{movie.overview}</p>
        </section>
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
    <div className={cx("metadataItem")}>
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

function MovieInfoOverviewSkeleton() {
  return (
    <section
      id="overview"
      className={cx("overviewSkeleton", "skeletonSection")}
    >
      <Skeleton id="moviePoster" className={cx("posterSkeleton")} style={{ width: "var(--poster-width)", height: "100%", marginTop: "calc(var(--poster-width) * -2/3)", aspectRatio: "2/3" }} />
      <div className={cx("columnRight")}>
        <div className={cx("overviewInfo")}>
          <div className={cx("metadataList")}>
            <Skeleton
              id="metadataItem"
              width={180}
              height={21}
            />
            <Skeleton
              id="metadataItem"
              width={320}
              height={21}
            />
            <Skeleton
              id="metadataItem"
              width={280}
              height={30.08}
            />
          </div>

          <Skeleton.Paragraph
            id="movieOverview"
            width={696}
            height={94.5}
            lines={4}
          />
        </div>
      </div>
    </section>
  );
}

export const MovieInfoOverview = Object.assign(MovieInfoOverviewRoot, {
  Skeleton: MovieInfoOverviewSkeleton
});
