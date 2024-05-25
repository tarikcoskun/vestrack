"use client";

import axios from "axios";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { notifyError } from "@/util/notifyError";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useClipboard } from "@/hooks/useClipboard";

import movieinfo from "@/data/placeholder-movieinfo.json";

// Components
import { MovieInfoHeader } from "./sections/Header";
import { MovieInfoOverview } from "./sections/Overview";
import { MovieInfoCast } from "./sections/Cast";
import { MovieInfoVideos } from "./sections/Videos";
import { MovieInfoReviews } from "./sections/Reviews";
import { MovieInfoRecommendations } from "./sections/Recommendations";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";

// Styles
import style from "./page.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

const sections = [
  {
    label: "Cast & Crew",
    id: "cast",
  },
  {
    label: "Videos",
    id: "videos",
  },
  {
    label: "User Reviews",
    id: "reviews",
  },
  {
    label: "Recommendations",
    id: "recommendations",
  },
];

export default function Page({ params: { id } }: { params: { id: string } }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [movie, setMovie] = useState<MovieInfo | null>(null);
  const { copyToClipboard, isCopied } = useClipboard();

  useEffect(() => {
    fetchData()
      .then((data) => {
        setMovie(data);
      })
      .catch((err) => {
        notifyError(err);
      });

    async function fetchData() {
      const data = await getMovieInfo(id, "movie");
      return data;
    }
  });

  const activeId = useScrollSpy(sections.map((i) => i.id), 48);

  return (
    <main className={cx("movieInfoPage")}>
      <div className={cx("pageContent")} ref={contentRef}>
        {movie ? (
          <>
            <MovieInfoHeader movie={movie} />
            <div className={cx("layout")}>
              <div className={cx("content")}>
                <MovieInfoOverview movie={movie} />
                <MovieInfoCast movie={movie} />
                <MovieInfoVideos movie={movie} />
                <MovieInfoReviews movie={movie} />
                <MovieInfoRecommendations movie={movie} />
              </div>
              <div className={cx("sidebar")}>
                <ol className={cx("sidebarLinks")}>
                  {sections.map((section) => (
                    <li key={section.label}>
                      <button
                        role="button"
                        data-state={activeId === section.id ? "active" : "inactive"}
                        className={cx("sidebarLink")}
                        onClick={() => {
                          document.querySelector(`#${section.id}`)?.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        {section.label}
                      </button>
                    </li>
                  ))}
                </ol>
                <div className={cx("actions")}>
                  <Button.Group>
                    <Button
                      color="blue"
                      leading={<Icon icon="bookmark" variant="fill" size={18} />}
                    >
                      Add to Watchlist
                    </Button>
                    <Button color="blue" padding="square">
                      <Icon icon="caret-down" size={18} />
                    </Button>
                  </Button.Group>

                  <Button
                    color="gray"
                    variant="soft"
                    leading={<Icon icon={isCopied ? "check" : "share"} variant="fill" />}
                    onClick={() => {
                      copyToClipboard(location.href);
                      toast.info("Copied to clipboard");
                    }}
                  >
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <MovieInfoHeader.Skeleton />
            <MovieInfoOverview.Skeleton />
            <MovieInfoCast.Skeleton />
            <MovieInfoVideos.Skeleton />
            <MovieInfoReviews.Skeleton />
            <MovieInfoRecommendations.Skeleton />
          </>
        )}
      </div>
    </main>
  );
}

function getMovieInfo(id: string, type: "movie" | "tv" = "movie") {
  return new Promise<MovieInfo>((resolve) => {
    resolve(movieinfo as MovieInfo);
  });

  const data = axios
    .get<MovieInfo>("/getMovieInfo", {
      params: { type, id },
    })
    .then((res) => res.data);

  return data;
}
