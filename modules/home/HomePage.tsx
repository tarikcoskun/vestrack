"use client";

import { useHomeData } from "./useHomeData";

// Components
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { Scroller } from "@/components/Scroller";
import { MediaCard, MediaCardSkeleton } from "@/components/cards/Media";
import { MediaCardHorizontalSkeleton, MediaHorizontalCard } from "@/components/cards/MediaHorizontal";

// Styles
import style from "./HomePage.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export function HomePage() {
  const { trendingData, popularMoviesData, popularSeriesData } = useHomeData();

  return (
    <main className={cx("homePage")}>
      <Section id="trending">
        <Scroller columns={3} autoscroll>
          <Section.Header scrollerControls>
            <h1><Icon icon="fire" variant="fill" size={28} style={{ color: "var(--color-gray-600)" }} /> Trending Today</h1>
          </Section.Header>

          <Scroller.Track>
            {trendingData
              ? trendingData.map((media) => (
                <MediaHorizontalCard
                  key={media.id}
                  media={media}
                  type={media.media_type as "movie" | "tv"}
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
      <Section id="popular-movies">
        <Scroller columns={6}>
          <Section.Header scrollerControls>
            <h1>
              <Icon icon="film" variant="fill" size={28} style={{ color: "var(--color-gray-600)" }} />
              Popular Movies
              <Button
                as={Link}
                href="/movie"
                color="gray"
                variant="ghost"
                padding="square"
                rounded="full"
                aria-label="See all"
              >
                <Icon icon="arrow-right" size={20} />
              </Button>
            </h1>
          </Section.Header>

          <Scroller.Track>
            {popularMoviesData
              ? popularMoviesData.map((media) => (
                <MediaCard
                  key={media.id}
                  media={media}
                  type="movie"
                />
              ))
              : Array(6)
                .fill(0)
                .map((_, idx) => (
                  <MediaCardSkeleton key={idx} />
                ))}
          </Scroller.Track>
        </Scroller>
      </Section>
      <Section id="popular-series">
        <Scroller columns={6}>
          <Section.Header scrollerControls>
            <h1>
              <Icon icon="film" variant="fill" size={28} style={{ color: "var(--color-gray-600)" }} />
              Popular Series
              <Button
                as={Link}
                href="/tv"
                color="gray"
                variant="ghost"
                padding="square"
                rounded="full"
                aria-label="See all"
              >
                <Icon icon="arrow-right" size={20} />
              </Button>
            </h1>
          </Section.Header>

          <Scroller.Track>
            {popularSeriesData
              ? popularSeriesData.map((media) => (
                <MediaCard
                  key={media.id}
                  media={media}
                  type="tv"
                />
              ))
              : Array(6)
                .fill(0)
                .map((_, idx) => (
                  <MediaCardSkeleton key={idx} />
                ))}
          </Scroller.Track>
        </Scroller>
      </Section>
    </main>
  );
}
