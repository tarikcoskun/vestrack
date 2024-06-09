"use client";

import { usePersonHomeData } from "./usePersonHomeData";

// Components
import { Section } from "@/components/Section";
import { PersonCard, PersonCardSkeleton } from "@/components/cards/Person";

// Styles
import style from "./PersonHomePage.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export function PersonHomePage() {
  const { data } = usePersonHomeData();

  return (
    <main className={cx("personHomePage")}>
      <Section>
        <h1>Popular People</h1>
        <div className={cx("gridList")}>
          {data
            ? data.map((person) => (
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
