"use client";

import { useRef } from "react";

// Components
import { MovieCard } from "@/components/Card/Movie";
import { Scroller } from "@/components/Scroller";
import { Icon } from "@/components/Icon";

// Styles
import style from "./Recommendations.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export function MovieInfoRecommendations({ movie }: { movie: MovieInfo }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="recommendations" className={cx("recommendations")}>
      <header>
        <h1>More like this</h1>
        <div className="scrollerControls">
          <Scroller.Trigger trackRef={scrollerRef} direction="left">
            <Icon icon="chevron-left" />
          </Scroller.Trigger>
          <Scroller.Trigger trackRef={scrollerRef} direction="right">
            <Icon icon="chevron-right" />
          </Scroller.Trigger>
        </div>
      </header>

      <Scroller className={cx("recommendationList")} ref={scrollerRef}>
        {movie.recommendations.results.map((recommendedMovie) => (
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
