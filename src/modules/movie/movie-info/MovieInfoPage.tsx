"use client";

import { notifyError } from "@/util/notifyError";
import { useEffect, useRef, useState } from "react";
import { getTitleInfo } from "@/modules/shared/title-info/getTitleInfo";

// Components
import { TitleInfoHeader, TitleInfoHeaderSkeleton } from "@/modules/shared/title-info/sections/Header";
import { TitleInfoOverview, TitleInfoOverviewSkeleton } from "@/modules/shared/title-info/sections/Overview";
import { TitleInfoCast, TitleInfoCastSkeleton } from "@/modules/shared/title-info/sections/Cast";
import { TitleInfoVideos, TitleInfoVideosSkeleton } from "@/modules/shared/title-info/sections/Videos";
import { TitleInfoReviews, TitleInfoReviewsSkeleton } from "@/modules/shared/title-info/sections/Reviews";
import { TitleInfoRecommendations, TitleInfoRecommendationsSkeleton } from "@/modules/shared/title-info/sections/Recommendations";
import { TitleInfoSidebar } from "@/modules/shared/title-info/components/Sidebar";

// Styles
import style from "./MovieInfoPage.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export function MovieInfoPage({ params: { id } }: { params: { id: string } }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<MovieInfo & SeriesInfo | null>(null);

  useEffect(() => {
    fetchData()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        notifyError(err);
      });

    async function fetchData() {
      return await getTitleInfo(id, "movie");
    }
  }, [id]);

  return (
    <main className={cx("movieInfoPage")}>
      <div className={cx("pageContent")} ref={contentRef}>
        {data ? (
          <>
            <TitleInfoHeader data={data} />
            <div className={cx("layout")}>
              <div className={cx("content")}>
                <TitleInfoOverview data={data} />
                <TitleInfoCast data={data} />
                <TitleInfoVideos data={data} />
                {data.reviews.total_results > 0 && <TitleInfoReviews data={data} />}
                <TitleInfoRecommendations data={data} />
              </div>
              <TitleInfoSidebar />
            </div>
          </>
        ) : (
          <>
            <TitleInfoHeaderSkeleton />
            <TitleInfoOverviewSkeleton />
            <TitleInfoCastSkeleton />
            <TitleInfoVideosSkeleton />
            <TitleInfoReviewsSkeleton />
            <TitleInfoRecommendationsSkeleton />
          </>
        )}
      </div>
    </main>
  );
}


