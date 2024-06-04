"use client";

// Components
import { MediaCard, MediaCardSkeleton } from "@/components/cards/Media";
import { Section } from "@/components/Section";
import { Scroller } from "@/components/Scroller";

export function MediaInfoRecommendations({ data }: { data: MovieInfo & SeriesInfo | null }) {
  return data === null || data?.recommendations.total_results > 0
    ? (
      <Section id="recommendations">
        <Scroller columns={5}>
          <Section.Header scrollerControls>
            <h1>Recommendations</h1>
          </Section.Header>

          <Scroller.Track maxWidth="withSidebar">
            {data
              ? data.recommendations.results.map((recommended) => (
                <MediaCard
                  key={recommended.id}
                  media={recommended}
                  type={recommended.media_type}
                />
              ))
              : Array(5)
                .fill(0)
                .map((_, idx) => (
                  <MediaCardSkeleton key={idx} />
                ))}
          </Scroller.Track>
        </Scroller>
      </Section>
      )
    : null;
}
