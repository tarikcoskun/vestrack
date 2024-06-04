import { DATE_FORMAT } from "@/constants/misc";

// Components
import { Icon } from "../Icon";
import snarkdown from "snarkdown";

// Styles
import style from "./Review.module.scss";
import classNames from "classnames/bind";

interface ReviewCardProps extends React.HTMLAttributes<HTMLElement> {
  review: Review;
  lineClamp?: boolean;
}

const cx = classNames.bind(style);

export function ReviewCard(props: ReviewCardProps) {
  const { review, lineClamp, className } = props;

  return (
    <div
      key={review.id}
      className={cx("reviewCard", className)}
      data-line-clamp={lineClamp}
    >
      <header className={cx("reviewHeader")}>
        <div className={cx("reviewRating")}>
          <Icon icon="star" variant="fill" style={{ color: "var(--color-yellow)" }} />
          <span>
            <span className={cx("ratingAmount")}>
              {review.author_details.rating?.toFixed(1).replace(".0", "")}
            </span>
            /10
          </span>
        </div>
        <div className={cx("reviewDetails")}>
          <span className={cx("reviewAuthor")}>{review.author}</span>
          <span className={cx("reviewDate")}>
            {new Date(review.created_at).toLocaleDateString("en-US", DATE_FORMAT)}
          </span>
        </div>
      </header>
      <p
        className={cx("reviewContent")}
        data-line-clamp={lineClamp}
        dangerouslySetInnerHTML={{ __html: snarkdown(review.content.replace(/\r?\n|\r/g, "<br>")) }}
      />
    </div>
  );
}
