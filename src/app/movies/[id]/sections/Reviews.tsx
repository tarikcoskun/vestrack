"use client";

import { useState } from "react";

// Components
import { Icon } from "@/components/Icon";
import { Button } from "@/components/Button";
import { MovieInfoModal } from "../components/Modal";

// Styles
import style from "./Reviews.module.scss";
import classNames from "classnames/bind";
import { ReviewCard } from "@/components/Card/Review";

const cx = classNames.bind(style);

export function MovieInfoReviews({ movie }: { movie: MovieInfo }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="reviews" className={cx("reviews")}>
      <header>
        <h1>
          User reviews
          <Button
            size="lg"
            color="gray"
            variant="soft"
            trailing={<Icon icon="chevron-right" />}
            onClick={() => {
              setModalOpen(true);
            }}
          >
            See all
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
