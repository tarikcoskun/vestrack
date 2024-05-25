import { Modal, type ModalProps } from "@/components/Modal";
import { forwardRef } from "react";

interface TitleInfoModalProps extends Omit<ModalProps, "header"> {
  movie: MovieInfo;
  description: string;
  children?: React.ReactNode;
}

export const TitleInfoModal = forwardRef<
  HTMLDialogElement,
  TitleInfoModalProps
>((props: TitleInfoModalProps, forwardedRef) => {
  const { open, onOpenChange, scrollRef, movie, description, children } = props;

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      ref={forwardedRef}
      scrollRef={scrollRef}
      header={
        <>
          <h3>
            {movie.title}{" "}
            <span style={{ color: "var(--theme-text-body)", fontSize: "1rem" }}>
              ({new Date(movie.release_date).getFullYear()})
            </span>
          </h3>
          <p>{description}</p>
        </>
      }
    >
      {children}
    </Modal>
  );
});
