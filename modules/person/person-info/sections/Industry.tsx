import snarkdown from "snarkdown";

// Components
import { Skeleton } from "@/components/Skeleton";
import { Section } from "@/components/Section";
import { Scroller } from "@/components/Scroller";
import { MediaCard, MediaCardSkeleton } from "@/components/cards/Media";

// Styles
import style from "./Industry.module.scss";
import classNames from "classnames/bind";
import { Expandable } from "@/components/Expandable";

const cx = classNames.bind(style);

export function PersonInfoIndustry({ data }: { data: PersonInfo | null }) {
  return (
    <div className={cx("columnRight")}>
      {data
        ? <h1 className={cx("personName")}>{data.name}</h1>
        : (
          <Skeleton
            height={28.17}
            type="text"
            className={cx("personName")}
            style={{
              maxWidth: "300px",
              width: "100%",
            }}
          />
          )}
      {(data === null || data.biography) && (
        <Section padding="content">
          <Section.Header>
            <h2>Biography</h2>
          </Section.Header>

          {data
            ? (
              <Expandable>
                <p dangerouslySetInnerHTML={{ __html: snarkdown(data?.biography.replace(/\r?\n|\r/g, "<br>")) }} />
              </Expandable>
              )
            : (
              <Skeleton.Paragraph height={72} lines={3} />
              )}
        </Section>
      )}

      {data?.combined_credits.cast.length
        ? (
          <Section padding="content">
            <Scroller columns={5}>
              <Section.Header scrollerControls>
                <h2>Known For</h2>
              </Section.Header>

              <Scroller.Track maxWidth="withSidebar">
                {data
                  ? data.combined_credits.cast.map((media) => (
                    <MediaCard
                      key={media.id}
                      media={media as Result}
                      type={media.media_type}
                      withRating={false}
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
        : null}
    </div>
  );
}
