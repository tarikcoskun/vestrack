import { createContext, forwardRef, useContext, useEffect, useRef, useState } from "react";
import { composeRefs } from "@/util/composeRefs";

// Components
import { Button } from "./Button";

// Styles
import style from "./Scroller.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

type ScrollPosition = "start" | "middle" | "end" | "no-scroll";

interface ScrollerValue {
  trackRef: React.RefObject<HTMLElement>;
  columns: number;
  autoscroll: boolean;
  scrollPosition: ScrollPosition;
  setScrollPosition: React.Dispatch<React.SetStateAction<ScrollPosition>>;
}

const ScrollerContext = createContext({} as ScrollerValue);

function ScrollerProvider({ columns, autoscroll, children }: React.PropsWithChildren<{ columns: number; autoscroll: boolean }>) {
  const trackRef = useRef<HTMLElement>(null);
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>("no-scroll");
  const initialState = { trackRef, columns, autoscroll, scrollPosition, setScrollPosition };

  return (
    <ScrollerContext.Provider value={initialState}>{children}</ScrollerContext.Provider>
  );
}

/* ---------------
 * ScrollerRoot
 * --------------- */

interface ScrollerProps extends React.PropsWithChildren {
  columns?: number;
  autoscroll?: boolean;
}

function ScrollerRoot(props: ScrollerProps) {
  const { columns = 6, autoscroll = false, children } = props;

  return (
    <ScrollerProvider columns={columns} autoscroll={autoscroll}>{children}</ScrollerProvider>
  );
}

/* ---------------
 * ScrollerTrack
 * --------------- */

interface ScrollerTrackProps extends React.HTMLAttributes<HTMLElement> {
  containerClassName?: string;
  maxWidth?: "default" | "withSidebar";
}

const ScrollerTrack = forwardRef<HTMLElement, ScrollerTrackProps>((props, forwardedRef) => {
  const { className, containerClassName, maxWidth, children, ...trackProps } = props;
  const { trackRef, columns, scrollPosition, setScrollPosition } = useContext(ScrollerContext);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const listener = () => {
      let position = "middle";
      if (track.scrollLeft === 0 && track.clientWidth === track.scrollWidth) position = "no-scroll";
      else if (track.scrollLeft === 0) position = "start";
      else if (track.scrollLeft + track.clientWidth === track.scrollWidth) position = "end";
      else position = "middle";

      setScrollPosition(position as ScrollPosition);
    };

    listener();
    window.addEventListener("resize", listener);
    track.addEventListener("scroll", listener);

    const observer = new MutationObserver(() => listener());
    observer.observe(track, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("resize", listener);
      track.removeEventListener("scroll", listener);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      {...trackProps}
      className={cx("scrollerContainer", containerClassName)}
      style={{ ["--scroller-columns" as string]: columns }}
      data-scroll-position={scrollPosition}
    >
      <div
        className={cx("scrollerTrack", className)}
        ref={composeRefs(forwardedRef, trackRef)}
        data-max-width={maxWidth}
      >
        {children}
      </div>
    </div>
  );
});

/* ---------------
 * ScrollerTrigger
 * --------------- */

interface ScrollerTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  direction: "left" | "right";
}

const ScrollerTrigger = forwardRef<HTMLButtonElement, ScrollerTriggerProps>((props, forwardedRef) => {
  const { className, direction, children, ...triggerProps } = props;
  const { trackRef, columns, scrollPosition } = useContext(ScrollerContext);

  const scroll = () => {
    const track = trackRef.current;
    if (!track) return;

    const scrollAmount = (Number.parseFloat(getComputedStyle(track.children[0]).width) + Number.parseFloat(getComputedStyle(track).gap)) * columns;

    if (direction === "left") {
      track.scrollBy({
        left: -Math.ceil(scrollAmount),
      });
    }
    else {
      track.scrollBy({
        left: Math.ceil(scrollAmount),
      });
    }
  };

  const isDisabled = (scrollPosition === "start" && direction === "left") || (scrollPosition === "end" && direction === "right");

  return scrollPosition === "no-scroll"
    ? null
    : (
      <Button
        {...triggerProps}
        color="gray"
        variant="soft"
        padding="square"
        rounded="full"
        aria-label={`Scroll ${direction}`}
        disabled={isDisabled}
        className={cx("scrollerTrigger", className)}
        ref={forwardedRef}
        onClick={scroll}
      >
        {children}
      </Button>
      )
  ;
},
);

export const Scroller = Object.assign(ScrollerRoot, {
  Track: ScrollerTrack,
  Trigger: ScrollerTrigger,
});
