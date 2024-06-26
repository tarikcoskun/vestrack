"use client";

import { useState } from "react";

// Components
import { Icon } from "@/components/Icon";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { ReviewCard } from "@/components/cards/Review";
import { MediaInfoModal } from "../components/Modal";
import { Skeleton } from "@/components/Skeleton";

// Styles
import style from "./Reviews.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export function MediaInfoReviews({ data }: { data: MediaInfo & SeriesInfo | null }) {
  const [modalOpen, setModalOpen] = useState(false);

  return data === null || data?.reviews.total_results > 0
    ? (
      <Section id="reviews">
        <Section.Header>
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
        </Section.Header>

        <div className={cx("reviewList")}>
          {data
            ? data?.reviews.results.slice(0, 1).map((review) => (
              <ReviewCard key={review.id} review={review} lineClamp />
            ))
            : (
              <div className={cx("review")}>
                <Skeleton height={196.69} />
              </div>
              )}
        </div>

        <FullReviewsModal />
      </Section>
      )
    : null;

  function FullReviewsModal() {
    return (
      <MediaInfoModal
        media={data}
        open={modalOpen}
        onOpenChange={setModalOpen}
        description="User Reviews"
      >
        <div className={cx("fullReviewList")}>
          {data?.reviews.results.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              className={cx("reviewCard")}
            />
          ))}
        </div>
      </MediaInfoModal>
    );
  }
}
