"use client";

// Components
import { MediaCard, MediaCardSkeleton } from "@/components/cards/Media";
import { Scroller } from "@/components/Scroller";
import { Icon } from "@/components/Icon";

// Styles
import style from "./Recommendations.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export function MediaInfoRecommendations({ data }: { data: MovieInfo & SeriesInfo | null }) {
  return data === null || data?.recommendations.total_results > 0
    ? (
      <section id="recommendations" className={cx("recommendations")}>
        <Scroller columns={5}>
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
            {data
              ? data.recommendations.results.map((recommended) => (
                <MediaCard
                  key={recommended.id}
                  media={recommended}
                  type={recommended.media_type}
                  className={cx("recommendationCard")}
                />
              ))
              : Array(5)
                .fill(0)
                .map((_, idx) => (
                  <MediaCardSkeleton key={idx} />
                ))}
          </Scroller.Track>
        </Scroller>
      </section>
      )
    : null;
}
