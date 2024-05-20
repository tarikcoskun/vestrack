import style from "./Skeleton.module.scss";
import classNames from "classnames/bind";

interface SkeletonProps extends React.HTMLAttributes<HTMLElement> {
  width?: number;
  height?: number;
  rounded?: boolean | "full";
  type?: "text";
}

const cx = classNames.bind(style);

function SkeletonRoot(props: SkeletonProps) {
  const {
    width,
    height,
    rounded = true,
    type,
    style,
    className,
    ...skeletonProps
  } = props;

  return (
    <div
      {...skeletonProps}
      style={{
        width: width + "px",
        height: type === "text" ? Number(height) * 1.15 : height + "px",
        marginBlock:
          type === "text"
            ? Number(height) - Number(height) * 1.15 + 1 + "px"
            : "",
        ...style,
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
      style={{ height: height + "px" }}
    >
      {arr.map((_, idx) => (
        <SkeletonRoot
          key={idx}
          width={idx === Number(lines) - 1 ? (Number(width) * 2) / 3 : width}
        />
      ))}
    </div>
  );
}

export const Skeleton = Object.assign(SkeletonRoot, {
  Paragraph: SkeletonParagraph,
});
