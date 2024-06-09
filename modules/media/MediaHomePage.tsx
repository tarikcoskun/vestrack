"use client";

import { useMediaHomeData } from "./useMediaHomeData";

// Components
import { Section } from "@/components/Section";
import { MediaCard, MediaCardSkeleton } from "@/components/cards/Media";

// Styles
import style from "./MediaHomePage.module.scss";
import classNames from "classnames/bind";
import { Scroller } from "@/components/Scroller";
import { Icon } from "@/components/Icon";
import { MediaCardHorizontalSkeleton, MediaHorizontalCard } from "@/components/cards/MediaHorizontal";

const cx = classNames.bind(style);

export function MediaHomePage({ type }: { type: "movie" | "tv" }) {
  const { discoverData, trendingData } = useMediaHomeData(type);

  return (
    <main className={cx("mediaHomePage")}>
      <Section id="trending">
        <Scroller columns={3} autoscroll>
          <Section.Header scrollerControls>
            <h1><Icon icon="compass" variant="fill" size={28} style={{ color: "var(--color-gray-600)" }} /> Discover {type === "movie" ? "Movies" : "Series"}</h1>
          </Section.Header>

          <Scroller.Track>
            {discoverData
              ? discoverData.map((media) => (
                <MediaHorizontalCard
                  key={media.id}
                  media={media}
                  type={type}
                />
              ))
              : Array(3)
                .fill(0)
                .map((_, idx) => (
                  <MediaCardHorizontalSkeleton key={idx} />
                ))}
          </Scroller.Track>
        </Scroller>
      </Section>
      <Section id="trending">
        <Section.Header>
          <h1><Icon icon="fire" variant="fill" size={28} style={{ color: "var(--color-gray-600)" }} /> Trending {type === "movie" ? "Movies" : "Series"}</h1>
        </Section.Header>

        <div className={cx("gridList")}>
          {trendingData
            ? trendingData.map((media) => (
              <MediaCard key={media.id} media={media} type={type} />
            ))
            : Array(12).fill(0).map((_, idx) => (
              <MediaCardSkeleton key={idx} />
            ))}
        </div>
      </Section>
    </main>
  );
}
