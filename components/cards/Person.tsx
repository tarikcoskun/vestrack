import { slugify } from "@/util/slugify";
import { TMDB_IMAGE_BASE_POSTER } from "@/constants/image";

// Components
import Link from "next/link";
import { Skeleton } from "../Skeleton";

// Styles
import style from "./Person.module.scss";
import classNames from "classnames/bind";

interface PersonCardProps extends React.HTMLAttributes<HTMLElement> {
  person: Person | Cast;
  details?: React.ReactNode;
}

const cx = classNames.bind(style);

export function PersonCard(props: PersonCardProps) {
  const { person, details, className, ...cardProps } = props;

  const infoPageUrl = `/person/${`${slugify(person.name)}-${person.id}`}`;
  const photoUrl = TMDB_IMAGE_BASE_POSTER + person.profile_path;

  return (
    <article {...cardProps} className={cx("personCard")}>
      <Link href={infoPageUrl} className={cx("photoLink")}>
        {person.profile_path
          ? (
            <img
              src={photoUrl}
              alt={person.name}
              width={138}
              height={175}
              className={cx("personPhoto")}
            />
            )
          : (
            <div className={cx("personInitials")}>
              {person.name
                ?.split(/\s/)
                .slice(0, 2)
                .map((word) => word.slice(0, 1))}
            </div>
            )}
      </Link>
      <div className={cx("personInfo")}>
        <Link href={infoPageUrl}>
          <span className={cx("personName")} title={person.name}>{person.name}</span>
        </Link>
        {!!details && (
          <div className={cx("personDetails")}>
            {details}
          </div>
        )}
      </div>
    </article>
  );
}

export function PersonCardSkeleton() {
  return (
    <div>
      <Skeleton style={{ width: "100%", aspectRatio: "4/5" }} />
      <Skeleton width={140} height={18.11} type="text" style={{ marginTop: "1rem" }} />
      <Skeleton width={100} height={16.09} type="text" style={{ marginTop: "0.5rem" }} />
    </div>
  );
}
