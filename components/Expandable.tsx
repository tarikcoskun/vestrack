"use client";

import { useEffect, useRef, useState } from "react";

// Style
import style from "./Expandable.module.scss";
import classNames from "classnames/bind";
import { Button } from "./Button";
import { Icon } from "./Icon";

interface ExpandableProps extends React.HTMLAttributes<HTMLParagraphElement> {
  lineClamp?: number;
  textClassName?: string;
}

const cx = classNames.bind(style);

export function Expandable(props: ExpandableProps) {
  const { lineClamp = 3, className, textClassName, children, ...expandableProps } = props;
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isExpanded, setExpanded] = useState(false);
  const [isOverflowing, setOverflowing] = useState(false);

  const lineHeight = 24;

  useEffect(() => {
    if (!textRef.current) return;

    const isLonger = Number(textRef.current.offsetHeight) / lineHeight >= lineClamp;

    setOverflowing(isLonger);
  }, []);

  return (
    <div {...expandableProps} className={cx("expandable", className)}>
      <p
        className={textClassName}
        data-state={isExpanded ? "expanded" : "initial"}
        style={{ ["-webkit-line-clamp" as string]: lineClamp.toString() }}
        ref={textRef}
      >
        {children}
      </p>

      {isOverflowing && (
        <div>
          <Button
            type="button"
            color="blue"
            variant="link"
            padding={false}
            rounded={false}
            trailing={<Icon icon={isExpanded ? "caret-up" : "caret-down"} />}
            onClick={() => setExpanded((val) => !val)}
          >
            {isExpanded ? "Less" : "More"}
          </Button>
        </div>
      )}
    </div>
  );
}
