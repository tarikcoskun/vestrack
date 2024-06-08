"use client";

import { useEffect, useState } from "react";
import { notifyError } from "@/util/notifyError";
import { getPersonHomeData } from "./getPersonHomeData";

// Components
import { Section } from "@/components/Section";
import { PersonCard, PersonCardSkeleton } from "@/components/cards/Person";

// Styles
import style from "./PersonHomePage.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export function PersonHomePage() {
  const [data, setData] = useState<{ popular: Person[] } | null>(null);

  useEffect(() => {
    const fetchData = async () => await getPersonHomeData();

    fetchData()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        notifyError(err);
      });
  }, []);

  return (
    <main className={cx("personHomePage")}>
      <Section>
        <h1>Popular People</h1>
        <div className={cx("gridList")}>
          {data
            ? data.popular.map((person) => (
              <PersonCard key={person.id} person={person as any} />
            ))
            : Array(12).fill(0).map((_, idx) => (
              <PersonCardSkeleton key={idx} details={false} />
            ))}
        </div>
      </Section>
    </main>
  );
}
