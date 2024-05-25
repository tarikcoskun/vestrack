"use client";

import { useState } from "react";

// Components
import { Icon } from "@/components/Icon";
import { Button } from "@/components/Button";
import { MovieInfoModal } from "../components/Modal";
import { Skeleton } from "@/components/Skeleton";

// Styles
import style from "./Reviews.module.scss";
import classNames from "classnames/bind";
import { ReviewCard } from "@/components/cards/Review";

const cx = classNames.bind(style);

function MovieInfoReviewsRoot({ movie }: { movie: MovieInfo }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="reviews" className={cx("reviews")}>
      <header>
        <h1>
          User Reviews
          <Button
            color="gray"
            variant="ghost"
            padding="square"
            rounded="full"
            aria-label="See all"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            <Icon icon="arrow-right" size={20} />
          </Button>
        </h1>
      </header>

      <div className={cx("reviewList")}>
        {movie.reviews.results.slice(0, 1).map((review) => (
          <ReviewCard key={review.id} review={review} lineClamp />
        ))}
      </div>

      <FullReviewsModal />
    </section>
  );

  function FullReviewsModal() {
    return (
      <MovieInfoModal
        movie={movie}
        open={modalOpen}
        onOpenChange={setModalOpen}
        description="User Reviews"
      >
        <div className={cx("fullReviewList")}>
          {movie.reviews.results.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              className={cx("reviewCard")}
            />
          ))}
        </div>
      </MovieInfoModal>
    );
  }
}

function MovieInfoReviewsSkeleton() {
  return (
    <section
      id="reviews"
      className={cx("reviewsSkeleton", "skeletonSection")}
    >
      <header style={{ height: "36px" }}>
        <Skeleton width={160} height={28.17} />
      </header>
      <div className={cx("reviewList")}>
        <div className={cx("review")}>
          <Skeleton height={196.69} />
        </div>
      </div>
    </section>
  );
}

export const MovieInfoReviews = Object.assign(MovieInfoReviewsRoot, {
  Skeleton: MovieInfoReviewsSkeleton
});
