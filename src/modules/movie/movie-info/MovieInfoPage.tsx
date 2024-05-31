"use client";

import { notifyError } from "@/util/notifyError";
import { useEffect, useRef, useState } from "react";
import { getMediaInfo } from "@/modules/shared/media-info/getMediaInfo";

// Components
import { MediaInfoHeader, MediaInfoHeaderSkeleton } from "@/modules/shared/media-info/sections/Header";
import { MediaInfoOverview, MediaInfoOverviewSkeleton } from "@/modules/shared/media-info/sections/Overview";
import { MediaInfoCast, MediaInfoCastSkeleton } from "@/modules/shared/media-info/sections/Cast";
import { MediaInfoVideos, MediaInfoVideosSkeleton } from "@/modules/shared/media-info/sections/Videos";
import { MediaInfoReviews, MediaInfoReviewsSkeleton } from "@/modules/shared/media-info/sections/Reviews";
import { MediaInfoRecommendations, MediaInfoRecommendationsSkeleton } from "@/modules/shared/media-info/sections/Recommendations";
import { MediaInfoSidebar } from "@/modules/shared/media-info/components/Sidebar";

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
      return await getMediaInfo(id, "movie");
    }
  }, [id]);

  return (
    <main className={cx("movieInfoPage")}>
      <div className={cx("pageContent")} ref={contentRef}>
        {data
          ? (
            <>
              <MediaInfoHeader data={data} />
              <div className={cx("layout")}>
                <div className={cx("content")}>
                  <MediaInfoOverview data={data} />
                  <MediaInfoCast data={data} />
                  <MediaInfoVideos data={data} />
                  {data.reviews.total_results > 0 && <MediaInfoReviews data={data} />}
                  <MediaInfoRecommendations data={data} />
                </div>
                <MediaInfoSidebar />
              </div>
            </>
            )
          : (
            <>
              <MediaInfoHeaderSkeleton />
              <MediaInfoOverviewSkeleton />
              <MediaInfoCastSkeleton />
              <MediaInfoVideosSkeleton />
              <MediaInfoReviewsSkeleton />
              <MediaInfoRecommendationsSkeleton />
            </>
            )}
      </div>
    </main>
  );
}
