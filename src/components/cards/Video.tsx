import { DATE_FORMAT } from "@/lib/constants";

// Styles
import style from "./Video.module.scss";
import classNames from "classnames/bind";

interface VideoCardProps extends React.HTMLAttributes<HTMLElement> {
  video: Video;
}

const cx = classNames.bind(style);

export function VideoCard(props: VideoCardProps) {
  const { className, video, ...cardProps } = props;

  return (
    <div {...cardProps} className={cx("videoCard", className)}>
      <a
        href={`https://youtu.be/${video.key}`}
        target="_blank"
        rel="noopener noreferrer"
        className={cx("thumbnailLink")}
      >
        <img
          src={`https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`}
          alt={video.name}
          className={cx("videoThumbnail")}
        />
      </a>
      <a
        href={`https://youtu.be/${video.key}`}
        target="_blank"
        rel="noopener noreferrer"
        className={cx("videoName")}
      >
        {video.name}
      </a>
      <div className={cx("publishedAt")}>
        {new Date(video.published_at).toLocaleDateString("en-US", DATE_FORMAT)}
      </div>
    </div>
  );
}
