"use client";

import { useRef } from "react";
import { useMediaInfoData } from "./useMediaInfoData";

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
  const { data } = useMediaInfoData(type, mediaId);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <main className={cx("mediaInfoPage")} ref={contentRef}>
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
    </main>
  );
}
