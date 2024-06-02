"use client";

import { useRef } from "react";

// Components
import { MediaCard } from "@/components/cards/Media";
import { Scroller } from "@/components/Scroller";
import { Icon } from "@/components/Icon";
import { Skeleton } from "@/components/Skeleton";

// Styles
import style from "./Recommendations.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export function MediaInfoRecommendations({ data }: { data: MovieInfo & SeriesInfo }) {
  return (
    <section id="recommendations" className={cx("recommendations")}>
      <Scroller itemsPerScroll={5}>
        <header>
          <h1>Recommendations</h1>
          <div className="scrollerControls">
            <Scroller.Trigger direction="left">
              <Icon icon="caret-left" />
            </Scroller.Trigger>
            <Scroller.Trigger direction="right">
              <Icon icon="caret-right" />
            </Scroller.Trigger>
          </div>
        </header>

        <Scroller.Track className={cx("recommendationList")}>
          {data.recommendations.results.map((recommended) => (
            <MediaCard
              key={recommended.id}
              media={recommended}
              type={recommended.media_type}
              className={cx("recommendationCard")}
            />
          ))}
        </Scroller.Track>
      </Scroller>
    </section>
  );
}

export function MediaInfoRecommendationsSkeleton() {
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
            <div key={idx} className={cx("mediaCard")}>
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
