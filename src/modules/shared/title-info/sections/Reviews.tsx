"use client";

import { useState } from "react";

// Components
import { Icon } from "@/components/Icon";
import { Button } from "@/components/Button";
import { TitleInfoModal } from "../components/Modal";
import { Skeleton } from "@/components/Skeleton";

// Styles
import style from "./Reviews.module.scss";
import classNames from "classnames/bind";
import { ReviewCard } from "@/components/cards/Review";

const cx = classNames.bind(style);

export function TitleInfoReviews({ data }: { data: MovieInfo & SeriesInfo }) {
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
        {data.reviews.results.slice(0, 1).map((review) => (
          <ReviewCard key={review.id} review={review} lineClamp />
        ))}
      </div>

      <FullReviewsModal />
    </section>
  );

  function FullReviewsModal() {
    return (
      <TitleInfoModal
        movie={data}
        open={modalOpen}
        onOpenChange={setModalOpen}
        description="User Reviews"
      >
        <div className={cx("fullReviewList")}>
          {data.reviews.results.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              className={cx("reviewCard")}
            />
          ))}
        </div>
      </TitleInfoModal>
    );
  }
}

export function TitleInfoReviewsSkeleton() {
  return (
    <section
      id="reviews"
      className={cx("reviewsSkeleton")}
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
