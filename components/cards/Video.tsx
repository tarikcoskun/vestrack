"use state";

import { useState } from "react";
import { DATE_FORMAT } from "@/constants/misc";

// Components
import Image from "next/image";
import { Skeleton } from "../Skeleton";

// Styles
import style from "./Video.module.scss";
import classNames from "classnames/bind";
import { YOUTUBE_THUMBNAIL_BASE, YOUTUBE_THUMBNAIL_QUALITY } from "@/constants/image";

interface VideoCardProps extends React.HTMLAttributes<HTMLElement> {
  video: Video;
}

const cx = classNames.bind(style);

export function VideoCard(props: VideoCardProps) {
  const { className, video, ...cardProps } = props;
  const [isHidden, setHidden] = useState(false);

  const videoUrl = `https://youtu.be/${video.key}`;

  return !isHidden
    ? (
      <div {...cardProps} className={cx("videoCard", className)}>
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cx("thumbnailLink")}
        >
          <Image
            src={YOUTUBE_THUMBNAIL_BASE + video.key + YOUTUBE_THUMBNAIL_QUALITY}
            alt={video.name}
            width={480}
            height={360}
            className={cx("videoThumbnail")}
            onError={() => {
              setHidden(true);
            }}
          />
        </a>
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cx("videoName")}
          title={video.name}
        >
          <span>{video.name}</span>
        </a>
        <div className={cx("publishedAt")}>
          {new Date(video.published_at).toLocaleDateString("en-US", DATE_FORMAT)}
        </div>
      </div>
      )
    : null;
}

export function VideoCardSkeleton() {
  return (
    <div>
      <Skeleton style={{ width: "100%", aspectRatio: "16/8.9" }} />
      <Skeleton width={220} height={18.11} type="text" style={{ marginTop: "1rem" }} />
      <Skeleton width={100} height={16.09} type="text" style={{ marginTop: "0.5rem" }} />
    </div>
  );
}
