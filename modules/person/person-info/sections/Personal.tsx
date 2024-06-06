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
          <Skeleton className={cx("personPhotoSkeleton")} />
          )}

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

        <div className={cx("factGroup")}>
          <div className={cx("title")}>Known For</div>
          {data ? data.known_for_department : <Skeleton width={100} height={16.09} type="text" />}
        </div>
        <div className={cx("factGroup")}>
          <div className={cx("title")}>Birth</div>
          {data
            ? (
              <>
                {new Date(data?.birthday).toLocaleDateString("en-US", DATE_FORMAT)}
                <br />{calculateAge(new Date(data?.birthday))} years old
                <br />{data.place_of_birth}
              </>
              )
            : (
              <Skeleton.Paragraph height={48.28} lines={3} containerStyle={{ width: "100px", gap: "3px" }} />
              )}
        </div>
      </div>
    </div>
  );
}
