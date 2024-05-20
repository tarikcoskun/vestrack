import { forwardRef } from "react";

// Styles
import style from "./Input.module.scss";
import classNames from "classnames/bind";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  inputClassName?: string;
  containerClassName?: string;
};

const cx = classNames.bind(style);

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    type,
    label,
    leading,
    trailing,
    inputClassName,
    containerClassName,
    ...inputProps
  } = props;

  return (
    <label
      className={cx("inputContainer", containerClassName, {
        checkbox: type === "checkbox",
      })}
    >
      {label && <span className={cx("label")}>{label}</span>}
      <div className={cx("innerContainer")}>
        {!!leading && <span className={cx("leading")}>{leading}</span>}
        <input
          {...inputProps}
          type={type}
          ref={ref}
          className={cx("input", inputClassName)}
        />
        {!!trailing && <span className={cx("trailing")}>{trailing}</span>}
      </div>
    </label>
  );
});
