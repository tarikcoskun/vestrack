import { slugify } from "@/util/slugify";
import { getGenreEmoji } from "@/util/getGenreEmoji";
import { TMDB_IMAGE_BASE_POSTER, TMDB_IMAGE_BASE_POSTER_BLUR } from "@/constants/image";

// Components
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/Button";
import { Skeleton } from "@/components/Skeleton";

// Styles
import style from "./Overview.module.scss";
import classNames from "classnames/bind";
import { getGenreEmojiName } from "@/util/getGenreEmojiName";

const cx = classNames.bind(style);

export function MediaInfoOverview({ data }: { data: MovieInfo & SeriesInfo | null }) {
  const posterUrl = TMDB_IMAGE_BASE_POSTER + data?.poster_path;
  const posterBlurUrl = TMDB_IMAGE_BASE_POSTER_BLUR + data?.poster_path;
  const trailerUrl = `https://youtu.be/${data?.videos.results.find((video) => video.type === "Trailer")?.key}`;

  return (
    <section id="overview" className={cx("overview")}>
      <div className={cx("columnLeft")}>
        {data
          ? data.poster_path
            ? (
              <img
                src={posterUrl}
                alt={data.title}
                draggable="false"
                className={cx("mediaPoster")}
              />
              )
            : (
              <div className={cx("mediaPosterFallback")}>
                <Icon icon="image" size={96} />
              </div>
              )
          : (
            <Skeleton style={{ width: "100%", height: "100%", backgroundColor: "var(--color-gray-200)" }} />
            )}
        {!trailerUrl.includes("undefined") && (
          <div className={cx("mediaTrailer")} style={{ backgroundImage: `url(${posterBlurUrl})` }}>
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
        )}
      </div>
      <div className={cx("columnRight")}>
        <section className={cx("overviewInfo")}>
          {data
            ? (
              <div className={cx("metadataList")}>
                {data.created_by?.length
                  ? (
                    <CrewGroup
                      title="Creator"
                      people={data?.created_by}
                    />
                    )
                  : (
                    <CrewGroup
                      title="Director"
                      people={data?.credits.crew.filter((person) => person.job === "Director")}
                    />
                    )}
                <CrewGroup
                  title="Writer"
                  people={data.credits.crew.filter((person) => person.department === "Writing")}
                />
                {data.genres.length > 0
                  ? (
                    <div className={cx("metadataItem", "genres")}>
                      <span className={cx("title")}>
                        {`Genre${data.genres.length > 1 ? "s" : ""}`}
                      </span>
                      <ul className={cx("dataGroup")}>
                        {data.genres
                          .sort((a, b) => (a.name > b.name ? 1 : -1)).map((genre) => (
                            <li key={genre.id} className={cx("person")}>
                              <Button key={genre.name} as={Link} href={`/genre/${slugify(genre.name)}`} color="gray" variant="soft" size="sm" rounded="full" className={cx("mediaGenre")}>
                                <img src={`/emojis/${getGenreEmojiName(slugify(genre.name))}.svg`} width={16} height={16} draggable="false" /> {genre.name}
                              </Button>
                            </li>
                          ))}
                      </ul>
                    </div>
                    )
                  : null}
              </div>
              )
            : (
              <div className={cx("metadataList")}>
                <Skeleton width={180} height={21} />
                <Skeleton width={320} height={21} />
                <Skeleton width={280} height={30.08} />
              </div>
              )}
          {data
            ? <p>{data?.overview}</p>
            : <Skeleton.Paragraph height={94.5} lines={4} />}
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

  const filteredPeople = (people || []).reduce((arr: Cast[], curr) => {
    if (!arr.map((person) => person.name).includes(curr.name))
      arr.push(curr);
    return arr;
  }, []);

  if (!filteredPeople.length)
    return null;

  return (
    <div className={cx("metadataItem")}>
      <span className={cx("title")}>
        {title + (people.length > 1 ? "s" : "")}
      </span>
      <ul className={cx("personGroup")}>
        {filteredPeople.map((person, idx) => (
          <li key={person.name} className={cx("person")}>
            <Link href={`/person/${person.id}`}>{person.name}</Link>
            {idx !== filteredPeople.length - 1 && ", "}
          </li>
        ))}
      </ul>
    </div>
  );
}
