"use client";

import { useEffect, useRef, useState } from "react";
import { getMediaInfo } from "./getMediaInfo";
import { notifyError } from "@/util/notifyError";

// Components
import { MediaInfoHeader } from "./sections/Header";
import { MediaInfoOverview } from "./sections/Overview";
import { MediaInfoCast } from "./sections/Cast";
import { MediaInfoVideos } from "./sections/Videos";
import { MediaInfoReviews } from "./sections/Reviews";
import { MediaInfoRecommendations } from "./sections/Recommendations";
import { MediaInfoSidebar } from "./components/Sidebar";

// Styles
import style from "./MediaInfoPage.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export function MediaInfoPage({ mediaId, type }: { mediaId: string; type: "movie" | "tv" }) {
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
      return await getMediaInfo(type, mediaId);
    }
  }, [mediaId]);

  return (
    <main className={cx("mediaInfoPage")}>
      <div className={cx("pageContent")} ref={contentRef}>
        <MediaInfoHeader data={data} />
        <div className={cx("layout")}>
          <div className={cx("content")}>
            <MediaInfoOverview data={data} />
            <MediaInfoCast data={data} />
            <MediaInfoVideos data={data} />
            <MediaInfoReviews data={data} />
            <MediaInfoRecommendations data={data} />
          </div>
          <MediaInfoSidebar />
        </div>
      </div>
    </main>
  );
}
