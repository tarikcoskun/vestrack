import style from "./Skeleton.module.scss";
import classNames from "classnames/bind";

interface SkeletonProps extends React.HTMLAttributes<HTMLElement> {
  width?: number;
  height?: number;
  rounded?: boolean | "full";
  lineHeight?: number;
  type?: "text";
}

const cx = classNames.bind(style);

function SkeletonRoot(props: SkeletonProps) {
  const {
    width,
    height,
    rounded = true,
    lineHeight = 1.15,
    type,
    style: elementStyle,
    className,
    ...skeletonProps
  } = props;

  return (
    <div
      {...skeletonProps}
      style={{
        width: `${width}px`,
        height: type === "text" ? Number(height) * lineHeight : `${height}px`,
        marginBlock:
          type === "text"
            ? `${Number(height) - Number(height) * lineHeight + 1}px`
            : "",
        ...elementStyle,
      }}
      className={cx("skeleton", className, {
        roundedBase: rounded === true,
        roundedFull: rounded === "full",
      })}
    />
  );
}

interface SkeletonParagraphProps extends SkeletonProps {
  lines: number;
}

function SkeletonParagraph(props: SkeletonParagraphProps) {
  const { lines, width, height } = props;
  const arr = Array(Number(lines)).fill("");

  return (
    <div
      className={cx("skeletonParagraphContainer")}
      style={{ height: `${height}px` }}
    >
      {arr.map((_, idx) => (
        <SkeletonRoot
          key={idx}
          width={idx === Number(lines) - 1 ? (Number(width) * 2) / 3 : width}
          style={{ width: idx === Number(lines) - 1 ? "70%" : "" }}
        />
      ))}
    </div>
  );
}

export const Skeleton = Object.assign(SkeletonRoot, {
  Paragraph: SkeletonParagraph,
});
