"use client";

import { useRef, useState } from "react";

// Components
import { Icon } from "@/components/Icon";
import { Button } from "@/components/Button";
import { VideoCard } from "@/components/Card/Video";
import { Scroller } from "@/components/Scroller";
import { MovieInfoModal } from "../components/Modal";

// Styles
import style from "./Videos.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export function MovieInfoVideos({ movie }: { movie: MovieInfo }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="videos" className={cx("videos")}>
      <header>
        <h1>
          Videos
          <Button
            size="lg"
            color="gray"
            variant="soft"
            trailing={<Icon icon="chevron-right" />}
            onClick={() => {
              setModalOpen(true);
            }}
          >
            See all
          </Button>
        </h1>
        <div className="scrollerControls">
          <Scroller.Trigger trackRef={scrollerRef} direction="left">
            <Icon icon="chevron-left" />
          </Scroller.Trigger>
          <Scroller.Trigger trackRef={scrollerRef} direction="right">
            <Icon icon="chevron-right" />
          </Scroller.Trigger>
        </div>
      </header>

      <Scroller className={cx("videoList")} ref={scrollerRef}>
        {movie.videos.results
          .sort(
            (a, b) =>
              new Date(b.published_at).getTime() -
              new Date(a.published_at).getTime()
          )
          .slice(0, 6)
          .map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
      </Scroller>

      <FullVideosModal />
    </section>
  );

  function FullVideosModal() {
    return (
      <MovieInfoModal
        movie={movie}
        open={modalOpen}
        onOpenChange={setModalOpen}
        description="Videos"
      >
        <div className={cx("fullVideoList")}>
          {movie.videos.results
            .sort(
              (a, b) =>
                new Date(b.published_at).getTime() -
                new Date(a.published_at).getTime()
            )
            .map((video) => (
              <VideoCard key={video.id} video={video} className={cx("video")} />
            ))}
        </div>
      </MovieInfoModal>
    );
  }
}
