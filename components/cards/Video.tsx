import { DATE_FORMAT } from "@/constants/misc";
import { YOUTUBE_THUMBNAIL_BASE_URL, YOUTUBE_THUMBNAIL_QUALITY } from "@/constants/image";

// Components
import { Skeleton } from "../Skeleton";

// Styles
import style from "./Video.module.scss";
import classNames from "classnames/bind";

interface VideoCardProps extends React.HTMLAttributes<HTMLElement> {
  video: Video;
}

const cx = classNames.bind(style);

export function VideoCard(props: VideoCardProps) {
  const { className, video, ...cardProps } = props;

  const videoUrl = `https://youtu.be/${video.key}`;

  return (
    <div {...cardProps} className={cx("videoCard", className)}>
      <a
        href={videoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cx("thumbnailLink")}
      >
        <img
          src={YOUTUBE_THUMBNAIL_BASE_URL + video.key + YOUTUBE_THUMBNAIL_QUALITY}
          alt={video.name}
          width={480}
          height={360}
          className={cx("videoThumbnail")}
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
  );
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
