"use client";

import { useEffect, useRef, useState } from "react";

// Components
import { Icon } from "@/components/Icon";
import { Button } from "@/components/Button";
import { Scroller } from "@/components/Scroller";
import { MovieInfoModal } from "../components/Modal";

// Styles
import style from "./Cast.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export function MovieInfoCast({ movie }: { movie: MovieInfo }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="cast" className={cx("cast")}>
      <header>
        <h1>
          Top cast
          <Button
            size="lg"
            color="gray"
            variant="soft"
            trailing={<Icon icon="chevron-right" />}
            onClick={() => {
              setModalOpen(true);
            }}
          >
            See all
          </Button>
        </h1>
        <div className="scrollerControls">
          <Scroller.Trigger trackRef={scrollRef} direction="left">
            <Icon icon="chevron-left" />
          </Scroller.Trigger>
          <Scroller.Trigger trackRef={scrollRef} direction="right">
            <Icon icon="chevron-right" />
          </Scroller.Trigger>
        </div>
      </header>

      <Scroller className={cx("castList")} ref={scrollRef}>
        {movie.credits.cast
          .sort((a, b) => a.order! - b.order!)
          .slice(0, 14)
          .map((person) => (
            <div key={person.id} className={cx("person")}>
              {person.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w342${person.profile_path}`}
                  alt={person.name}
                  className={cx("personPhoto")}
                />
              ) : (
                <div className={cx("personInitials")}>
                  {person.name
                    ?.split(/\s/)
                    .slice(0, 2)
                    .map((word) => word.slice(0, 1))}
                </div>
              )}
              <span title={person.name} className={cx("personName")}>
                {person.name}
              </span>
              <span className={cx("personCharacter")}>{person.character}</span>
            </div>
          ))}
      </Scroller>

      <FullCastModal />
    </section>
  );

  function FullCastModal() {
    const crewListRef = useRef<HTMLDivElement>(null);
    const modalScrollRef = useRef<HTMLDivElement>(null);
    const [activeId, setActiveId] = useState("Cast");

    const fullCastCrew = [...movie.credits.cast, ...movie.credits.crew];
    const groupedList = fullCastCrew.reduce(
      (obj: { [key: string]: (Cast & { titles: string[] })[] }, curr) => {
        const title = curr.job ? curr.known_for_department : "Cast";
        const personTitle = (curr.job ? curr.job : curr.character)!;
        if (
          Object.keys(obj).length &&
          obj[title] &&
          obj[title].find((person) => person.name === curr.name)
        )
          obj[title]
            .find((person) => person.name === curr.name)
            ?.titles.push(personTitle);
        else
          (obj[title] = obj[title] || []).push({
            ...curr,
            titles: [personTitle],
          });
        return obj;
      },
      {}
    );

    useEffect(() => {
      const offset = 246;
      const clamp = (value: number) => Math.max(0, value);
      const isBetween = (value: number, floor: number, ceil: number) =>
        value >= floor && value <= ceil;

      const el = modalScrollRef.current!;

      const listener = () => {
        const scroll = el.scrollTop;

        const position = Object.keys(groupedList)
          .map((id) => {
            const element = document.getElementById(id);

            if (!element) return { id, top: -1, bottom: -1 };

            const rect = element.getBoundingClientRect();
            const top = clamp(rect.top + scroll - offset);
            const bottom = clamp(rect.bottom + scroll - offset + 28);

            return { id, top, bottom };
          })
          .find(({ top, bottom }) => isBetween(scroll, top, bottom));

        setActiveId(position?.id || "");
      };

      el.addEventListener("scroll", listener);
      el.addEventListener("resize", listener);

      return () => {
        el.removeEventListener("scroll", listener);
        el.removeEventListener("resize", listener);
      };
    }, [groupedList]);

    return (
      <MovieInfoModal
        movie={movie}
        open={modalOpen}
        onOpenChange={setModalOpen}
        scrollRef={modalScrollRef}
        description="Full Cast & Crew"
      >
        <div className={cx("castModalLayout")}>
          <ul className={cx("departmentList")}>
            {Object.keys(groupedList).map((title) => (
              <li key={title}>
                <button
                  role="button"
                  data-state={activeId === title ? "active" : "inactive"}
                  className={cx("departmentTitle")}
                  onClick={() => {
                    Array.from(crewListRef.current?.children!)
                      .find((el) => el.id === title)!
                      .scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {title}
                </button>
              </li>
            ))}
          </ul>
          <div className={cx("fullCastCrewList")} ref={crewListRef}>
            {Object.entries(groupedList).map(([groupTitle, group]) => (
              <table
                key={groupTitle}
                id={groupTitle}
                className={cx("groupTable")}
              >
                <thead>
                  <tr>
                    <th className={cx("groupTitle")}>{groupTitle}</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {group.map((person) => (
                    <tr key={person.id} className={cx("person")}>
                      <td aria-label="Photo">
                        {person.profile_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w342${person.profile_path}`}
                            alt={person.name}
                            className={cx("personPhoto")}
                          />
                        ) : (
                          <div className={cx("personInitials")}>
                            {person.name
                              ?.split(/\s/)
                              .slice(0, 2)
                              .map((word) => word.slice(0, 1))}
                          </div>
                        )}
                      </td>
                      <td aria-label="Name">{person.name}</td>
                      <td aria-label="Character/job">
                        {person.titles.join(", ")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ))}
          </div>
        </div>
      </MovieInfoModal>
    );
  }
}
