import { forwardRef, useEffect, useRef, useState } from "react";
import { composeRefs } from "@/util/composeRefs";

// Components
import { Button } from "./Button";

// Styles
import style from "./Scroller.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

/* ---------------
 * ScrollerRoot
 * --------------- */

interface ScrollerProps extends React.HTMLAttributes<HTMLElement> {
  containerClassName?: string;
}

const ScrollerRoot = forwardRef<HTMLDivElement, ScrollerProps>(
  (props, forwardedRef) => {
    const { className, containerClassName, children, ...scrollerProps } = props;

    const scrollerRef = useRef<HTMLDivElement>(null);
    const [scrollerPosition, setScrollerPosition] = useState("start");

    useEffect(() => {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      const listener = () => {
        let position = "middle";
        if (scroller.scrollLeft === 0) position = "start";
        else if (scroller.scrollLeft + scroller.clientWidth === scroller.scrollWidth) position = "end";
        else position = "middle";

        setScrollerPosition(position);
      };

      scroller.addEventListener("scroll", listener);

      return () => {
        scroller.removeEventListener("scroll", listener);
      };
    }, []);

    return (
      <div
        {...scrollerProps}
        className={cx("scrollerContainer", containerClassName)}
        data-scroll-position={scrollerPosition}
      >
        <div
          className={cx("scrollerTrack", className)}
          ref={composeRefs(forwardedRef, scrollerRef)}
        >
          {children}
        </div>
      </div>
    );
  }
);

/* ---------------
 * ScrollerTrigger
 * --------------- */

interface ScrollerTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  trackRef: React.RefObject<HTMLDivElement>;
  direction: "left" | "right";
  scrollAmount?: number;
}

const ScrollerTrigger = forwardRef<HTMLButtonElement, ScrollerTriggerProps>(
  (props, forwardedRef) => {
    const {
      trackRef,
      className,
      direction,
      disabled,
      children,
      ...triggerProps
    } = props;

    const scroll = () => {
      if (trackRef.current) {
        const scrollAmount =
          (trackRef.current.children[0].clientWidth +
            parseInt(getComputedStyle(trackRef.current).gap)) *
          3;

        if (direction === "left") {
          trackRef.current.scrollBy({
            left: -scrollAmount,
            behavior: "smooth"
          });
        } else {
          trackRef.current.scrollBy({
            left: scrollAmount,
            behavior: "smooth"
          });
        }
      }
    };

    return (
      <Button
        {...triggerProps}
        color="gray"
        variant="soft"
        padding="square"
        rounded="full"
        aria-label={"Scroll " + direction}
        className={cx("scrollerTrigger", className)}
        ref={forwardedRef}
        onClick={scroll}
      >
        {children}
      </Button>
    );
  }
);

export const Scroller = Object.assign(ScrollerRoot, {
  Trigger: ScrollerTrigger,
});
