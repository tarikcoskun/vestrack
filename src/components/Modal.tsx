import { forwardRef, useEffect, useRef } from "react";

// Components
import { Button } from "./Button";
import { Icon } from "./Icon";

// Styles
import style from "./Modal.module.scss";
import classNames from "classnames/bind";
import { composeRefs } from "@/util/composeRefs";

const cx = classNames.bind(style);

export interface ModalProps extends React.HTMLAttributes<HTMLDialogElement> {
  open: boolean;
  header: React.ReactNode;
  children?: React.ReactNode;
  scrollRef?: React.Ref<HTMLElement>;
  onOpenChange: (value: boolean) => void;
}

const ModalRoot = forwardRef<HTMLDialogElement, ModalProps>(
  (props, forwardedRef) => {
    const { open, header, scrollRef, onOpenChange, children, ...dialogProps } =
      props;

    const localRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
      if (open) localRef.current?.showModal();
      else localRef.current?.close();
    }, [open]);

    return (
      <dialog
        {...dialogProps}
        className={cx("dialog")}
        ref={composeRefs(forwardedRef, localRef)}
        onClick={(event) => {
          if (event.target === localRef.current) {
            onOpenChange(false);
          }
        }}
      >
        <header className={cx("modalHeader")}>
          {header}
          <Button
            color="gray"
            variant="ghost"
            padding="square"
            rounded="full"
            aria-label="Close modal"
            className={cx("modalDismiss")}
            onClick={() => {
              onOpenChange(false);
            }}
          >
            <Icon icon="x" />
          </Button>
        </header>
        <main className={cx("modalContent")} ref={scrollRef}>
          {children}
        </main>
      </dialog>
    );
  }
);

interface ModalHeaderProps {
  children?: React.ReactNode;
}

const ModalHeader = (props: ModalHeaderProps) => {
  const { children } = props;

  return <header className={cx("modalHeader")}>{children}</header>;
};

export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
});
