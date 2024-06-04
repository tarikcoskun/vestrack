import { Modal, type ModalProps } from "@/components/Modal";
import { forwardRef } from "react";

interface MediaInfoModalProps extends Omit<ModalProps, "header"> {
  media: MovieInfo & SeriesInfo | null;
  description: string;
  children?: React.ReactNode;
}

export const MediaInfoModal = forwardRef<HTMLDialogElement, MediaInfoModalProps>((props, forwardedRef) => {
  const { open, onOpenChange, scrollRef, media, description, children } = props;

  return media
    ? (
      <Modal
        open={open}
        onOpenChange={onOpenChange}
        ref={forwardedRef}
        scrollRef={scrollRef}
        header={(
          <>
            <h3>
              {media?.title || media?.name}{" "}
              <span style={{ color: "var(--theme-text-body)", fontSize: "1rem" }}>
                ({new Date(media?.release_date || media?.first_air_date).getFullYear()})
              </span>
            </h3>
            <div>{description}</div>
          </>
        )}
      >
        {children}
      </Modal>
      )
    : null;
});
