import { MediaInfoPage } from "@/modules/media/media-info/MediaInfoPage";

export default function MovieInfoPage({ params: { id } }: { params: { id: string } }) {
  return <MediaInfoPage mediaId={id} type="movie" />;
};
