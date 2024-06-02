"use client";

import { useRef, useState } from "react";

// Components
import { Icon } from "@/components/Icon";
import { Button } from "@/components/Button";
import { VideoCard } from "@/components/cards/Video";
import { Scroller } from "@/components/Scroller";
import { MediaInfoModal } from "../components/Modal";
import { Skeleton } from "@/components/Skeleton";

// Styles
import style from "./Videos.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export function MediaInfoVideos({ data }: { data: MovieInfo & SeriesInfo }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="videos" className={cx("videos")}>
      <Scroller itemsPerScroll={3}>
        <header>
          <h1>
            Videos
            <Button
              color="gray"
              variant="ghost"
              padding="square"
              rounded="full"
              aria-label="See all"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              <Icon icon="arrow-right" size={20} />
            </Button>
          </h1>
          <div className="scrollerControls">
            <Scroller.Trigger direction="left">
              <Icon icon="caret-left" />
            </Scroller.Trigger>
            <Scroller.Trigger direction="right">
              <Icon icon="caret-right" />
            </Scroller.Trigger>
          </div>
        </header>

        <Scroller.Track className={cx("videoList")}>
          {data.videos.results
            .sort(
              (a, b) =>
                new Date(b.published_at).getTime()
                  - new Date(a.published_at).getTime(),
            )
            .slice(0, 8)
            .map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
        </Scroller.Track>
      </Scroller>

      <FullVideosModal />
    </section>
  );

  function FullVideosModal() {
    return (
      <MediaInfoModal
        media={data}
        open={modalOpen}
        onOpenChange={setModalOpen}
        description="Videos"
      >
        <div className={cx("fullVideoList")}>
          {data.videos.results
            .sort(
              (a, b) =>
                new Date(b.published_at).getTime()
                  - new Date(a.published_at).getTime(),
            )
            .map((video) => (
              <VideoCard key={video.id} video={video} className={cx("video")} />
            ))}
        </div>
      </MediaInfoModal>
    );
  }
}

export function MediaInfoVideosSkeleton() {
  return (
    <section id="videos" className={cx("videosSkeleton")}>
      <header style={{ height: "36px" }}>
        <Skeleton width={100} height={28.17} />
      </header>
      <div className={cx("videoList")}>
        {Array(6)
          .fill(0)
          .map((_, idx) => (
            <div key={idx} className={cx("video")}>
              <Skeleton
                width={320}
                height={180}
                style={{ marginBottom: "0.5rem" }}
              />
              <Skeleton width={200} height={18.11} type="text" />
              <Skeleton width={80} height={16.09} type="text" />
            </div>
          ))}
      </div>
    </section>
  );
}
