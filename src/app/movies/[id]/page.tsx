"use client";

import axios from "axios";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { notifyError } from "@/util/notifyError";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useClipboard } from "@/util/copyToClipboard";

import movieinfo from "@/data/placeholder-movieinfo.json";

// Components
import { MovieInfoOverview } from "./sections/Overview";
import { MovieInfoCast } from "./sections/Cast";
import { MovieInfoVideos } from "./sections/Videos";
import { MovieInfoReviews } from "./sections/Reviews";
import { MovieInfoRecommendations } from "./sections/Recommendations";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import Loading from "./loading";

// Styles
import style from "./page.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

const sections = [
  {
    label: "Overview",
    id: "overview",
  },
  {
    label: "Top cast",
    id: "cast",
  },
  {
    label: "Videos",
    id: "videos",
  },
  {
    label: "User reviews",
    id: "reviews",
  },
  {
    label: "More like this",
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

  const activeId = useScrollSpy(
    sections.map((i) => i.id),
    64,
    "overview"
  );

  return (
    <main className={cx("movieInfoPage")}>
      <div className={cx("pageLayout")}>
        <div className={cx("pageContent")} ref={contentRef}>
          {movie ? (
            <>
              <MovieInfoOverview movie={movie} />
              <MovieInfoCast movie={movie} />
              <MovieInfoVideos movie={movie} />
              <MovieInfoReviews movie={movie} />
              <MovieInfoRecommendations movie={movie} />
            </>
          ) : (
            <Loading />
          )}
        </div>

        <div className={cx("pageSidebar")}>
          <ol className={cx("sidebarLinks")}>
            {sections.map((section) => (
              <li key={section.label}>
                <button
                  role="button"
                  data-state={activeId === section.id ? "active" : "inactive"}
                  className={cx("sidebarLink")}
                  onClick={() => {
                    Array.from(contentRef.current?.children as ArrayLike<Element>)
                      .find((el) => el.id === section.id)!
                      .scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ol>
          <div className={cx("buttons")}>
            <Button
              color="gray"
              variant="soft"
              leading={<Icon icon={isCopied ? "check" : "share"} />}
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
