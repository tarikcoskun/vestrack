import homedata from "@/data/placeholder-homedata.json";

// Components
import { MediaCard } from "@/components/cards/Media";
import { FeaturedCard } from "@/components/cards/Featured";

// Styles
import style from "./SeriesHomePage.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export function SeriesPage() {
  const data = getHomeData();

  return (
    <main className={cx("seriesPage")}>
      <section className={cx("discoveryContainer")}>
        <h1>Watch Next</h1>
        <div className={cx("discoveryList")}>
          {data.discovery.slice(0, 2).map((media) => (
            <FeaturedCard key={media.id} media={media} type="tv" />
          ))}
        </div>
      </section>

      <section className={cx("trendingContainer")}>
        <h1>Trending Series</h1>
        <div className={cx("trendingList")}>
          {data.trending.movie.slice(0, 6).map((media) => (
            <MediaCard key={media.id} media={media as Result} type="tv" />
          ))}
        </div>
      </section>
    </main>
  );
}

function getHomeData() {
  return homedata;
}
