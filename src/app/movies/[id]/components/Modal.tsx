import { Modal, type ModalProps } from "@/components/Modal";
import { forwardRef } from "react";

interface MovieInfoModalProps extends Omit<ModalProps, "header"> {
  movie: MovieInfo;
  description: string;
  children?: React.ReactNode;
}

export const MovieInfoModal = forwardRef<
  HTMLDialogElement,
  MovieInfoModalProps
>((props: MovieInfoModalProps, forwardedRef) => {
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

