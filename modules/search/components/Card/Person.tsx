import { slugify } from "@/util/slugify";
import { TMDB_IMAGE_BASE_POSTER } from "@/constants/image";

// Components
import Link from "next/link";

// Styles
import style from "./Person.module.scss";
import classNames from "classnames/bind";

interface SearchPersonCardProps extends React.HTMLAttributes<HTMLElement> {
  person: Person;
}

const cx = classNames.bind(style);

export function SearchPersonCard(props: SearchPersonCardProps) {
  const { person, className, ...cardProps } = props;

  const infoPageUrl = `/person/${`${slugify(person.name!)}-${person.id}`}`;
  const photoUrl = TMDB_IMAGE_BASE_POSTER + person.profile_path;

  return (
    <article
      {...cardProps}
      className={cx("searchPersonCard", className)}
      typeof="Movie"
    >
      <Link href={infoPageUrl} className={cx("photoLink")}>
        {person.profile_path
          ? (
            <img
              src={photoUrl}
              alt={person.name}
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
          <span className={cx("personName")} title={person.name}>
            {person.name}
          </span>
        </Link>
        <div className={cx("personDetails")}>
          <span>{person.known_for_department}</span>
          {person.known_for.length ? (<span>{person.known_for[0].title || person.known_for[0].name} ({new Date(person.known_for[0].release_date! || person.known_for[0].first_air_date!).getFullYear()})</span>) : null}
        </div>
      </div>
    </article>
  );
}
