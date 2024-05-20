import { Skeleton } from "@/components/Skeleton";

// Styles
import style from "./loading.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export default function Loading() {
  return (
    <>
      <section
        id="overview"
        className={cx("overviewSkeleton", "skeletonSection")}
      >
        <Skeleton id="moviePoster" width={300} height={450} rounded={false} />
        <div className={cx("overviewInfo")}>
          <Skeleton id="movieTitle" width={300} height={32.19} />
          <Skeleton id="movieDetails" width={100} height={16.09} type="text" />
          <Skeleton id="movieGenres" width={220} height={16.09} type="text" />
          <Skeleton id="movieRating" width={150} height={16.09} type="text" />
          <div className={cx("actions")}>
            <Skeleton id="actionButton" width={197.06} height={37} />
            <Skeleton id="actionButton" width={128.06} height={37} />
          </div>
          <Skeleton.Paragraph
            id="movieOverview"
            width={646}
            height={94.5}
            lines={4}
          />
          <div className={cx("crewOverview")}>
            <Skeleton
              id="crewOverview"
              width={180}
              height={16.09}
              type="text"
              lineHeight={1.25}
            />
            <Skeleton
              id="crewOverview"
              width={320}
              height={16.09}
              type="text"
              lineHeight={1.25}
            />
            <Skeleton
              id="crewOverview"
              width={400}
              height={16.09}
              type="text"
              lineHeight={1.25}
            />
          </div>
        </div>
      </section>
      <section id="cast" className={cx("castSkeleton", "skeletonSection")}>
        <header>
          <Skeleton width={120} height={28.17} />
        </header>
        <div className={cx("castList")}>
          {Array(6)
            .fill(0)
            .map((_, idx) => (
              <div key={idx} className={cx("person")}>
                <Skeleton
                  width={168}
                  height={210}
                  style={{ marginBottom: "0.5rem" }}
                />
                <Skeleton width={140} height={18.11} type="text" />
                <Skeleton width={100} height={16.09} type="text" />
              </div>
            ))}
        </div>
      </section>
      <section id="videos" className={cx("videosSkeleton", "skeletonSection")}>
        <header>
          <Skeleton width={100} height={28.17} />
        </header>
        <div className={cx("videoList")}>
          {Array(6)
            .fill(0)
            .map((_, idx) => (
              <div key={idx} className={cx("video")}>
                <Skeleton
                  width={350}
                  height={196.88}
                  style={{ marginBottom: "0.5rem" }}
                />
                <Skeleton width={200} height={18.11} type="text" />
                <Skeleton width={80} height={16.09} type="text" />
              </div>
            ))}
        </div>
      </section>
      <section
        id="reviews"
        className={cx("reviewsSkeleton", "skeletonSection")}
      >
        <header>
          <Skeleton width={160} height={28.17} />
        </header>
        <div className={cx("reviewList")}>
          <div className={cx("review")}>
            <Skeleton height={186.19} />
          </div>
        </div>
      </section>
      <section
        id="recommendations"
        className={cx("recommendationsSkeleton", "skeletonSection")}
      >
        <header>
          <Skeleton width={160} height={28.17} />
        </header>
        <div className={cx("recommendationList")}>
          {Array(5)
            .fill(0)
            .map((_, idx) => (
              <div key={idx} className={cx("movieCard")}>
                <Skeleton
                  width={200}
                  height={303.09}
                  style={{ marginBottom: "0.5rem" }}
                />
                <Skeleton width={140} height={18.11} type="text" />
                <Skeleton width={100} height={16.09} type="text" />
              </div>
            ))}
        </div>
      </section>
    </>
  );
}
