"use client";

import { useState } from "react";

// Components
import { Icon } from "@/components/Icon";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { Scroller } from "@/components/Scroller";
import { VideoCard, VideoCardSkeleton } from "@/components/cards/Video";
import { MediaInfoModal } from "../components/Modal";

// Styles
import style from "./Videos.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export function MediaInfoVideos({ data }: { data: MediaInfo & SeriesInfo | null }) {
  const [modalOpen, setModalOpen] = useState(false);

  return data === null || data?.videos.results.length > 0
    ? (
      <Section id="videos">
        <Scroller columns={3}>
          <Section.Header scrollerControls>
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
          </Section.Header>

          <Scroller.Track maxWidth="withSidebar">
            {data
              ? data.videos.results
                .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
                .slice(0, 8)
                .map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))
              : Array(3)
                .fill(0)
                .map((_, idx) => (
                  <VideoCardSkeleton key={idx} />
                ))}
          </Scroller.Track>
        </Scroller>

        <FullVideosModal />
      </Section>
      )
    : null;

  function FullVideosModal() {
    return (
      <MediaInfoModal
        media={data}
        open={modalOpen}
        onOpenChange={setModalOpen}
        description="Videos"
      >
        <div className={cx("fullVideoList")}>
          {data?.videos.results
            .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
            .map((video) => (
              <VideoCard key={video.id} video={video} className={cx("video")} />
            ))}
        </div>
      </MediaInfoModal>
    );
  }
}
