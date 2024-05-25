"use client";

import { useRef } from "react";

// Components
import { MovieCard } from "@/components/cards/Movie";
import { Scroller } from "@/components/Scroller";
import { Icon } from "@/components/Icon";
import { Skeleton } from "@/components/Skeleton";

// Styles
import style from "./Recommendations.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export function TitleInfoRecommendations({ data }: { data: MovieInfo }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="recommendations" className={cx("recommendations")}>
      <header>
        <h1>Recommendations</h1>
        <div className="scrollerControls">
          <Scroller.Trigger trackRef={scrollerRef} direction="left">
            <Icon icon="caret-left" />
          </Scroller.Trigger>
          <Scroller.Trigger trackRef={scrollerRef} direction="right">
            <Icon icon="caret-right" />
          </Scroller.Trigger>
        </div>
      </header>

      <Scroller className={cx("recommendationList")} ref={scrollerRef}>
        {data.recommendations.results.map((recommendedMovie) => (
          <MovieCard
            key={recommendedMovie.id}
            movie={recommendedMovie}
            type="movie"
            className={cx("recommendationCard")}
          />
        ))}
      </Scroller>
    </section>
  );
}

export function TitleInfoRecommendationsSkeleton() {
  return (
    <section
      id="recommendations"
      className={cx("recommendationsSkeleton")}
    >
      <header style={{ height: "32px" }}>
        <Skeleton width={160} height={28.17} />
      </header>
      <div className={cx("recommendationList")}>
        {Array(5)
          .fill(0)
          .map((_, idx) => (
            <div key={idx} className={cx("movieCard")}>
              <Skeleton
                width={200}
                height={303.09}
                style={{ marginBottom: "0.5rem" }}
              />
              <Skeleton width={140} height={18.11} type="text" />
              <Skeleton width={100} height={16.09} type="text" />
            </div>
          ))}
      </div>
    </section>
  );
}
