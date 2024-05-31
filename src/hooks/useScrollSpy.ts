import { useEffect, useState } from "react";

const clamp = (value: number) => Math.max(0, value);
const isBetween = (value: number, floor: number, ceil: number) => value >= floor && value <= ceil;

export function useScrollSpy(ids: string[], offset: number, defaultValue?: string) {
  const [activeId, setActiveId] = useState(defaultValue || "");

  useEffect(() => {
    const listener = () => {
      const scroll = window.scrollY;

      const position = ids
        .map((id) => {
          const element = document.getElementById(id);

          if (!element)
            return { id, top: -1, bottom: -1 };

          const rect = element.getBoundingClientRect();
          const top = clamp(rect.top + scroll - offset);
          const bottom = clamp(rect.bottom + scroll - offset + 28);

          return { id, top, bottom };
        })
        .find(({ top, bottom }) => isBetween(scroll, top, bottom));

      setActiveId(position?.id || "");
    };

    window.addEventListener("scroll", listener);
    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("scroll", listener);
      window.removeEventListener("resize", listener);
    };
  }, [ids, offset]);

  return activeId;
}
