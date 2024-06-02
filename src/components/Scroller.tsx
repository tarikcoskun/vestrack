import { createContext, forwardRef, useContext, useEffect, useRef, useState } from "react";
import { composeRefs } from "@/util/composeRefs";

// Components
import { Button } from "./Button";

// Styles
import style from "./Scroller.module.scss";
import variables from "@/styles/global-variables.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

interface ScrollerValue {
  trackRef: React.RefObject<HTMLUListElement>;
  itemsPerScroll: number;
}

const ScrollerContext = createContext({} as ScrollerValue);

function ScrollerProvider({ itemsPerScroll, children }: React.PropsWithChildren<{ itemsPerScroll: number }>) {
  const trackRef = useRef<HTMLUListElement>(null);
  const initialState = { trackRef, itemsPerScroll };

  return (
    <ScrollerContext.Provider value={initialState}>{children}</ScrollerContext.Provider>
  );
}

/* ---------------
 * ScrollerRoot
 * --------------- */

interface ScrollerProps extends React.PropsWithChildren {
  itemsPerScroll?: number;
}

function ScrollerRoot(props: ScrollerProps) {
  const { itemsPerScroll = 6, children } = props;

  return (
    <ScrollerProvider itemsPerScroll={itemsPerScroll}>{children}</ScrollerProvider>
  );
}

/* ---------------
 * ScrollerTrack
 * --------------- */

interface ScrollerTrackProps extends React.HTMLAttributes<HTMLElement> {
  containerClassName?: string;
}

const ScrollerTrack = forwardRef<HTMLUListElement, ScrollerTrackProps>((props, forwardedRef) => {
  const { className, containerClassName, children, ...rest } = props;

  const { trackRef, itemsPerScroll } = useContext(ScrollerContext);
  const [scrollerPosition, setScrollerPosition] = useState("start");

  useEffect(() => {
    const scroller = trackRef.current;
    if (!scroller)
      return;

    const listener = () => {
      let position = "middle";
      if (scroller.scrollLeft === 0)
        position = "start";
      else if (scroller.scrollLeft + scroller.clientWidth === scroller.scrollWidth)
        position = "end";
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
      {...rest}
      className={cx("scrollerContainer", containerClassName)}
      style={{ ["--scroller-items-per-scroll" as string]: itemsPerScroll }}
      data-scroll-position={scrollerPosition}
    >
      <ul
        className={cx("scrollerTrack", className)}
        ref={composeRefs(forwardedRef, trackRef)}
      >
        {children}
      </ul>
    </div>
  );
});

/* ---------------
 * ScrollerTrigger
 * --------------- */

interface ScrollerTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  direction: "left" | "right";
}

const ScrollerTrigger = forwardRef<HTMLButtonElement, ScrollerTriggerProps>(
  (props, forwardedRef) => {
    const { className, direction, disabled, children, ...triggerProps } = props;

    const { trackRef, itemsPerScroll } = useContext(ScrollerContext);

    const scroll = () => {
      if (trackRef.current) {
        const scrollAmount = (Number.parseFloat(getComputedStyle(trackRef.current.children[0]).width) + Number.parseFloat(getComputedStyle(trackRef.current).gap)) * itemsPerScroll;

        if (direction === "left") {
          trackRef.current.scrollBy({
            left: -Math.ceil(scrollAmount),
            behavior: "smooth",
          });
        }
        else {
          trackRef.current.scrollBy({
            left: Math.ceil(scrollAmount),
            behavior: "smooth",
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
        aria-label={`Scroll ${direction}`}
        className={cx("scrollerTrigger", className)}
        ref={forwardedRef}
        onClick={scroll}
      >
        {children}
      </Button>
    );
  },
);

export const Scroller = Object.assign(ScrollerRoot, {
  Track: ScrollerTrack,
  Trigger: ScrollerTrigger,
});
