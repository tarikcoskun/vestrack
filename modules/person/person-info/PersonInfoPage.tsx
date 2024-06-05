"use client";

import { useEffect, useState } from "react";
import { getPersonInfo } from "./getPersonInfo";
import { notifyError } from "@/util/notifyError";

// Components
import { PersonInfoPersonal } from "./sections/Personal";
import { PersonInfoIndustry } from "./sections/Industry";

// Styles
import style from "./PersonInfoPage.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export function PersonInfoPage({ params: { id } }: { params: { id: string } }) {
  const [data, setData] = useState<PersonInfo | null>(null);

  useEffect(() => {
    const fetchData = async () => await getPersonInfo(id);

    fetchData()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        notifyError(err);
      });
  }, [id]);

  return (
    <main className={cx("personInfoPage")}>
      <div className={cx("layout")}>
        <PersonInfoPersonal data={data} />
        <PersonInfoIndustry data={data} />
      </div>
    </main>
  );
}
