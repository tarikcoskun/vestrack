"use client";

import snarkdown from "snarkdown";
import { DATE_FORMAT } from "@/constants/misc";
import { calculateAge } from "@/util/calculateAge";
import { usePersonInfoData } from "./usePersonInfoData";
import { TMDB_IMAGE_BASE_POSTER } from "@/constants/image";

// Components
import Image from "next/image";
import { Icon } from "@/components/Icon";
import { Section } from "@/components/Section";
import { Scroller } from "@/components/Scroller";
import { Skeleton } from "@/components/Skeleton";
import { Expandable } from "@/components/Expandable";
import { MediaCard, MediaCardSkeleton } from "@/components/cards/Media";
import { BrandIconFacebook } from "@/components/Icon/standalone/BrandIconFacebook";
import { BrandIconInstagram } from "@/components/Icon/standalone/BrandIconInstagram";
import { BrandIconTwitter } from "@/components/Icon/standalone/BrandIconTwitter";

// Styles
import style from "./PersonInfoPage.module.scss";
import classNames from "classnames/bind";
import { Button } from "@/components/Button";

const cx = classNames.bind(style);

export function PersonInfoPage({ params: { id } }: { params: { id: string } }) {
  const { data } = usePersonInfoData(id);
  const photoUrl = TMDB_IMAGE_BASE_POSTER + data?.profile_path;

  return (
    <main className={cx("personInfoPage")}>
      <div className={cx("layout")}>
        <div className={cx("columnLeft")}>
          {data
            ? data.profile_path
              ? (
                <Image
                  src={photoUrl}
                  alt={data.name}
                  width={300}
                  height={450}
                  draggable="false"
                  className={cx("personPhoto")}
                />
                )
              : (
                <div className={cx("personPhotoFallback")}>
                  <Icon icon="image" size={96} />
                </div>
                )
            : (
              <Skeleton className={cx("personPhotoSkeleton")} />
              )}
        </div>

        <div className={cx("columnRight")}>
          {data
            ? <h1 className={cx("personName")}>{data.name}</h1>
            : (
              <Skeleton
                height={28.17}
                className={cx("personName")}
                style={{
                  maxWidth: "300px",
                  width: "100%",
                }}
              />
              )}

          <div className={cx("facts")}>
            {data
              ? (
                <div className={cx("factItem")}>
                  <span className={cx("title")}>Born</span>
                  {data?.birthday && (
                    <span>
                      {new Date(data?.birthday).toLocaleDateString("en-US", { ...DATE_FORMAT, month: "long" })} ({calculateAge(new Date(data?.birthday))} years old)
                    </span>
                  )}
                </div>
                )
              : (
                <div className={cx("factItem", "skeleton")}>
                  <Skeleton width={30} height={16.09} />
                  <Skeleton height={16.09} style={{ maxWidth: "180px", width: "100%" }} />
                </div>
                )}
          </div>

          {(data === null || (data.external_ids.facebook_id || data.external_ids.instagram_id || data.external_ids.twitter_id))
          && (
            <div className={cx("socials")}>
              {data
                ? (
                  <>
                    {data.external_ids.facebook_id && (
                      <Button
                        as="a"
                        href={`https://www.facebook.com/${data.external_ids.facebook_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="gray"
                        variant="soft"
                      >
                        <BrandIconFacebook size={20} />
                      </Button>
                    )}
                    {data.external_ids.instagram_id && (
                      <Button
                        as="a"
                        href={`https://www.instagram.com/${data.external_ids.instagram_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="gray"
                        variant="soft"
                      >
                        <BrandIconInstagram size={20} />
                      </Button>
                    )}
                    {data.external_ids.twitter_id && (
                      <Button
                        as="a"
                        href={`https://twitter.com/${data.external_ids.twitter_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="gray"
                        variant="soft"
                      >
                        <BrandIconTwitter size={20} />
                      </Button>
                    )}
                  </>
                  )
                : (
                  <>
                    <Skeleton width={44} height={36} />
                    <Skeleton width={44} height={36} />
                    <Skeleton width={44} height={36} />
                  </>
                  )}
            </div>
          )}

          {(data === null || data.biography) && (
            <div className={cx("biography")}>
              {data
                ? (
                  <Expandable>
                    <p dangerouslySetInnerHTML={{ __html: snarkdown(data?.biography.replace(/\r?\n|\r/g, "<br>")) }} />
                  </Expandable>
                  )
                : (
                  <Skeleton.Paragraph height={96} lines={4} />
                  )}
            </div>
          )}
        </div>
      </div>

      <div className={cx("mbBiography")}>
        {data
          ? (
            <Expandable>
              <p dangerouslySetInnerHTML={{ __html: snarkdown(data?.biography.replace(/\r?\n|\r/g, "<br>")) }} />
            </Expandable>
            )
          : (
            <Skeleton.Paragraph height={96} lines={4} />
            )}
      </div>

      {(data === null || data?.combined_credits.cast.length)
        ? (
          <Section>
            <Scroller columns={6}>
              <Section.Header scrollerControls>
                <h1>Known For</h1>
              </Section.Header>

              <Scroller.Track>
                {data
                  ? data.combined_credits.cast.map((media) => (
                    <MediaCard
                      key={media.id}
                      media={media as Result}
                      type={media.media_type}
                      withRating={false}
                    />
                  ))
                  : Array(6)
                    .fill(0)
                    .map((_, idx) => (
                      <MediaCardSkeleton key={idx} />
                    ))}
              </Scroller.Track>
            </Scroller>
          </Section>
          )
        : null}
    </main>
  );
}
