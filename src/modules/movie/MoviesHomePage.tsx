import homedata from "@/data/placeholder-homedata.json";

// Components
import { MediaCard } from "@/components/cards/Media";
import { FeaturedCard } from "@/components/cards/Featured";

// Styles
import style from "./MoviesHomePage.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export function MoviesPage() {
  // const data = getHomeData();
  const data = homedata;

  return (
    <main className={cx("moviesPage")}>
      <section className={cx("discoveryContainer")}>
        <h1>Watch Next</h1>
        <div className={cx("discoveryList")}>
          {data.discovery.slice(0, 2).map((movie) => (
            <FeaturedCard key={movie.id} media={movie} type="movie" />
          ))}
        </div>
      </section>

      <section className={cx("trendingContainer")}>
        <h1>Trending Movies</h1>
        <div className={cx("trendingList")}>
          {data.trending.movie.slice(0, 6).map((movie) => (
            <MediaCard key={movie.id} media={movie as Result} type="movie" />
          ))}
        </div>
      </section>
    </main>
  );
}
