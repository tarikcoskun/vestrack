import snarkdown from "snarkdown";

// Components
import { Skeleton } from "@/components/Skeleton";
import { Section } from "@/components/Section";
import { Scroller } from "@/components/Scroller";
import { MediaCard, MediaCardSkeleton } from "@/components/cards/Media";

// Styles
import style from "./Industry.module.scss";
import classNames from "classnames/bind";

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
      <Section padding="content">
        <Section.Header>
          <h2>Biography</h2>
        </Section.Header>

        {data
          ? (
            <p dangerouslySetInnerHTML={{ __html: snarkdown(data?.biography.replace(/\r?\n|\r/g, "<br>")) }} />
            )
          : (
            <Skeleton.Paragraph height={162.75} lines={7} />
            )}
      </Section>

      <Section padding="content">
        <Scroller columns={6}>
          <Section.Header scrollerControls>
            <h2>Known For</h2>
          </Section.Header>

          <Scroller.Track maxWidth="withSidebar">
            {data
              ? data.combined_credits.cast.sort((a, b) => b.popularity - a.popularity).map((media) => (
                <MediaCard
                  key={media.id}
                  media={media as Result}
                  type={media.media_type}
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
    </div>
  );
}
