import { slugify } from "@/util/slugify";
import { TMDB_IMAGE_BASE_BACKDROP, TMDB_IMAGE_BASE_POSTER } from "@/constants/image";

// Components
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/Button";
import { Skeleton } from "../Skeleton";

// Styles
import style from "./Featured.module.scss";
import classNames from "classnames/bind";

interface FeaturedCardProps {
  type: "movie" | "tv";
  media: Result;
}

const cx = classNames.bind(style);

export function FeaturedCard(props: FeaturedCardProps) {
  const { media, type } = props;

  const posterUrl = TMDB_IMAGE_BASE_POSTER + media.poster_path;
  const backdropUrl = TMDB_IMAGE_BASE_BACKDROP + media.backdrop_path;

  return (
    <article className={cx("featuredCard")} typeof="Movie">
      <Link href={`/${type}/${`${slugify(media.title! || media.name!)}-${media.id}`}`} className={cx("posterLink")}>
        {media.poster_path
          ? (
            <img
              src={posterUrl}
              alt={media.title}
              draggable="false"
              className={cx("mediaPoster")}
            />
            )
          : (
            <div className={cx("mediaPosterFallback")}>
              <Icon icon="image" size={64} />
            </div>
            )}
      </Link>
      <div className={cx("mediaInfo")}>
        <div
          className={cx("backdrop")}
          style={{
            backgroundImage: `url(${backdropUrl})`,
          }}
        />
        <div className={cx("mediaRating")}>
          <Icon icon="star" variant="fill" style={{ color: "var(--color-yellow)" }} />
          <span>{media.vote_average.toFixed(1).replace(".0", "")}</span>
        </div>
        <Link href={`/movie/${media.id}`}>
          <span className={cx("mediaTitle")}>{media.title || media.name}</span>
        </Link>
        <p className={cx("mediaOverview")}>{media.overview}</p>
        {/* <div className={cx("actions")}>
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
          </div> */}
      </div>
    </article>
  );
}

export function FeaturedCardSkeleton() {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Skeleton style={{ width: "25%", aspectRatio: "2/3", flexShrink: "0" }} />
      <div style={{
        width: "100%",
        height: "calc(100% - 1rem)",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        borderRadius: "0 var(--rounded-lg) var(--rounded-lg) 0",
      }}
      >
        <Skeleton height={25} width={250} type="text" style={{ marginBottom: "1rem" }} />
        <Skeleton.Paragraph height={70.88} lines={3} type="text" />
      </div>
    </div>
  );
}
