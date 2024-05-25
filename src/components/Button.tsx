import type {
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from "~/types/polymorphic";

import React, { forwardRef } from "react";

// Styles
import style from "./Button.module.scss";
import classNames from "classnames/bind";

interface Props {
  color?: "white" | "gray" | "red" | "blue";
  variant?: "solid" | "soft" | "ghost";
  size?: "sm" | "lg";
  padding?: boolean | "square";
  rounded?: boolean | "full";
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  children?: React.ReactNode;
}

type ButtonProps<C extends React.ElementType> =
  PolymorphicComponentPropsWithRef<C, Props>;

type ButtonComponent = <
  C extends React.ElementType = "button",
>({ }: ButtonProps<C>) => React.ReactNode;

const cx = classNames.bind(style);

const ButtonRoot: ButtonComponent = forwardRef(
  <C extends React.ElementType = "button">(
    props: ButtonProps<C>,
    ref: PolymorphicRef<C>
  ) => {
    const {
      as,
      color,
      type = "button",
      variant = "solid",
      size = "regular",
      padding = true,
      rounded = true,
      className,
      leading,
      trailing,
      children,
      ...buttonProps
    } = props;
    const Component = as || "button";

    return (
      <Component
        {...buttonProps}
        type={type}
        className={cx("button", `${variant}-${color}`, className, {
          [`size-${size}`]: size !== "regular",
          paddingBase: padding === true,
          paddingSquare: padding === "square",
          roundedBase: rounded === true,
          roundedFull: rounded === "full",
        })}
        ref={ref}
      >
        {!!leading && leading}
        {!!children && children}
        {!!trailing && trailing}
      </Component>
    );
  }
);

type ButtonGroupProps = React.HTMLAttributes<HTMLElement>;

function ButtonGroup(props: ButtonGroupProps) {
  const { className, children, ...groupProps } = props;

  return (
    <div {...groupProps} className={cx("buttonGroup", className)}>
      {children}
    </div>
  );
}

export const Button = Object.assign(ButtonRoot, {
  Group: ButtonGroup
});
