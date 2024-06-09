"use client";

import { usePersonInfoData } from "./usePersonInfoData";

// Components
import { PersonInfoPersonal } from "./sections/Personal";
import { PersonInfoIndustry } from "./sections/Industry";

// Styles
import style from "./PersonInfoPage.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export function PersonInfoPage({ params: { id } }: { params: { id: string } }) {
  const { data } = usePersonInfoData(id);

  return (
    <main className={cx("personInfoPage")}>
      <div className={cx("layout")}>
        <PersonInfoPersonal data={data} />
        <PersonInfoIndustry data={data} />
      </div>
    </main>
  );
}
