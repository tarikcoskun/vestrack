import { getGender } from "@/util/getGender";
import { calculateAge } from "@/util/calculateAge";
import { DATE_FORMAT } from "@/constants/misc";
import { TMDB_IMAGE_BASE_POSTER } from "@/constants/image";

// Components
import { Icon } from "@/components/Icon";
import { Skeleton } from "@/components/Skeleton";

// Styles
import style from "./Personal.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export function PersonInfoPersonal({ data }: { data: PersonInfo | null }) {
  const photoUrl = TMDB_IMAGE_BASE_POSTER + data?.profile_path;

  return (
    <div className={cx("columnLeft")}>
      {data
        ? data.profile_path
          ? (
            <img
              src={photoUrl}
              alt={data.name}
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
          <Skeleton style={{ width: "100%", height: "100%", aspectRatio: "2/3", backgroundColor: "var(--color-gray-200)" }} />
          )}

      {data && (
        <div className={cx("facts")}>
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

          <FactItem title="Known For" content={data.known_for_department} />
          <FactItem
            title="Birth"
            content={(
              <>
                {new Date(data?.birthday).toLocaleDateString("en-US", DATE_FORMAT)}
                <br />{calculateAge(new Date(data?.birthday))} years old
                <br />{data.place_of_birth}
              </>
            )}
          />
        </div>
      )}
    </div>
  );
}

interface FactItemProps {
  title: string;
  content?: React.ReactNode;
}

function FactItem(props: FactItemProps) {
  const { title, content } = props;

  return (
    <div className={cx("factGroup")}>
      <div className={cx("title")}>
        {title}
      </div>
      {content}
    </div>
  );
}
