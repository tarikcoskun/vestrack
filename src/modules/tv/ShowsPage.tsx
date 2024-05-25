import homedata from "@/data/placeholder-homedata.json";

// Components
import { MovieCard } from "@/components/cards/Movie";
import { FeaturedCard } from "@/components/cards/Featured";

// Styles
import style from "./ShowsPage.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export function ShowsPage() {
  const data = getHomeData();

  return (
    <main className={cx("showsPage")}>
      <section className={cx("discoveryContainer")}>
        <h1>Watch Next</h1>
        <div className={cx("discoveryList")}>
          {data.discovery.slice(0, 2).map((movie) => (
            <FeaturedCard key={movie.id} movie={movie} type="tv" />
          ))}
        </div>
      </section>

      <section className={cx("trendingContainer")}>
        <h1>Trending Shows</h1>
        <div className={cx("trendingList")}>
          {data.trending.movie.slice(0, 6).map((movie) => (
            <MovieCard key={movie.id} movie={movie as Result} type="tv" />
          ))}
        </div>
      </section>
    </main>
  );
}

function getHomeData() {
  return homedata;
}
