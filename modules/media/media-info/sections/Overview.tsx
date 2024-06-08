import { slugify } from "@/util/slugify";
import { getGenreEmojiName } from "@/util/getGenreEmojiName";
import { TMDB_IMAGE_BASE_POSTER } from "@/constants/image";

// Components
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/Button";
import { Skeleton } from "@/components/Skeleton";

// Styles
import style from "./Overview.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export function MediaInfoOverview({ data }: { data: MediaInfo & SeriesInfo | null }) {
  const posterUrl = TMDB_IMAGE_BASE_POSTER + data?.poster_path;
  const trailerUrl = `https://youtu.be/${data?.videos.results.find((video) => video.type === "Trailer")?.key}`;

  return (
    <section id="overview" className={cx("overview")}>
      <div className={cx("columnLeft")}>
        {data
          ? data.poster_path
            ? (
              <Image
                src={posterUrl}
                alt={data.title}
                width={300}
                height={450}
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
            <Skeleton style={{ width: "100%", height: "100%", aspectRatio: "2/3", backgroundColor: "var(--color-gray-200)" }} />
            )}
        {!trailerUrl.includes("undefined") && (
          <div className={cx("mediaTrailer")}>
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
                    <MetadataItem
                      title="Creator"
                      people={data?.created_by}
                    />
                    )
                  : (
                    <MetadataItem
                      title="Director"
                      people={data?.credits.crew.filter((person) => person.job === "Director")}
                    />
                    )}
                <MetadataItem
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
                              <Button key={genre.name} color="gray" variant="soft" size="sm" rounded="full" className={cx("mediaGenre")}>
                                <Image
                                  src={`/emojis/${getGenreEmojiName(slugify(genre.name))}.svg`}
                                  alt=""
                                  width={16}
                                  height={16}
                                  draggable="false"
                                />
                                <span>{genre.name}</span>
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
                <div className={cx("metadataItem", "skeleton")}>
                  <Skeleton width={60} height={18} className={cx("title")} />
                  <Skeleton height={18} style={{ maxWidth: "180px", width: "100%" }} />
                </div>
                <div className={cx("metadataItem", "skeleton")}>
                  <Skeleton width={60} height={18} className={cx("title")} />
                  <Skeleton height={21} style={{ maxWidth: "300px", width: "100%" }} />
                </div>
                <div className={cx("metadataItem", "skeleton")}>
                  <Skeleton width={60} height={18} className={cx("title")} />
                  <Skeleton height={30.08} style={{ maxWidth: "280px", width: "100%" }} />
                </div>
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

interface MetadataItemProps {
  title: string;
  people: Cast[];
}

function MetadataItem(props: MetadataItemProps) {
  const { title, people } = props;

  const filteredPeople = (people || []).reduce((arr: Cast[], curr) => {
    if (!arr.map((item) => item.name).includes(curr.name)) arr.push(curr);
    return arr;
  }, []);

  if (!filteredPeople.length)
    return null;

  return (
    <div className={cx("metadataItem")}>
      <span className={cx("title")}>
        {title + (filteredPeople.length > 1 ? "s" : "")}
      </span>
      <ul className={cx("personGroup")}>
        {filteredPeople.map((person, idx) => (
          <li key={person.name} className={cx("person")}>
            <Link href={`/person/${slugify(person.name)}-${person.id}`}>{person.name}</Link>
            {idx !== filteredPeople.length - 1 && ", "}
          </li>
        ))}
      </ul>
    </div>
  );
}
