import { useState, useEffect } from "react";
// import { BiSearch } from "react-icons/bi";

import { useFetch } from "../hooks/useFetch";
import { useDebounce } from "../hooks/useDebounce";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, EffectCoverflow, Navigation } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

// styles
import styles from "./Home.module.css";
import RandomList from "../components/anime/random/RandomList";
import Spinner from "../components/ui/Spinner";
import { RandomString } from "../lib/Lib";
// import TrendingList from "../components/anime/trending/TrendingList";
import TrendingItem from "../components/anime/trending/TrendingItem";
import PopularityItem from "../components/anime/popularity/PopularityItem";
SwiperCore.use([Autoplay, Navigation]);
const Home = () => {
  const [filteredGames, setFilteredGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [randomAnime, setRandomAnime] = useState({
    data: [],
    links: {},
    loading: null,
  });

  // const [pending, setPending] = useState(false);

  // const [err, setErr] = useState("");

  // const {
  //   res: trendingAnime,
  //   isPending: trendingPending,
  //   error: trendingErr,
  // } = useFetch(`${process.env.REACT_APP_API_URL_ANIME}/trending/anime`);

  // console.log(res);

  // setRandomAnime({ ok: "y", oi: 1 });
  const { res, isPending, error } = useFetch(
    `${process.env.REACT_APP_API_URL_ANIME}/anime?page[limit]=20&page[offset]=0`
  );

  // console.log(res);
  // console.log("Pending : ", isPending);
  // console.log(randomAnime !== (undefined || null));
  console.log(randomAnime.data[0] === undefined);

  try {
    if (randomAnime.data[0] === undefined && isPending === false) {
      setRandomAnime({
        data: res.data,
        links: res.links,
        loading: true,
      });
    }
  } catch (err) {
    console.log(err);
  }
  // try {
  //   if (isPending === false) {
  //   }
  // } catch (err) {
  //   console.log(err);
  // }
  // console.log(randomAnime.res);
  const moreAnime = () => {
    try {
      fetch(randomAnime.links.next)
        .then((resJson) => resJson.json())
        .then((res) =>
          setRandomAnime((randomAnime) => {
            return {
              data: randomAnime.data.concat(res.data),
              links: res.links,
              loading: false,
            };
          })
        );
    } catch (err) {
      console.log(err);
    }
  };

  console.log(randomAnime);

  // const {
  //   res: popularityAnime,
  //   isPending: popularityPending,
  //   error: popularityErr,
  // } = useFetch(
  //   `${process.env.REACT_APP_API_URL_ANIME}/anime?sort=popularityRank`
  // );
  // console.log(popularityAnime);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const currentYear = new Date().getFullYear();

  // useEffect(() => {
  //   if (debouncedSearchTerm && trending) {
  //     setFilteredGames(
  //       trending.filter((anime) =>
  //         anime.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  //       )
  //     );
  //   }
  // }, [debouncedSearchTerm, trending]);
  return (
    <>
      {/* <section>
        <div className={styles.card_title}>
          <h1 className={styles.title}>Top 10 Trending Anime {currentYear}!</h1>
        </div>
        <form className={styles.form}>
          <label>
            <BiSearch className={styles.search_icon} />
            <input
              onChange={(e) => setSearchTerm(e.target.value)}
              type="search"
              placeholder="Search for Title"
              className={styles.input}
            />
          </label>
        </form>
        {debouncedSearchTerm && filteredGames.length === 0 && (
          <p className="text-center">Sorry, no games found :(</p>
        )}
      </section> */}
      {/* <section className={styles.games_content}>
        <div className={styles.card_title}>
          <h1 className={styles.title}>Top 10 Trending Anime {currentYear}!</h1>
        </div>
        {trendingPending && <Spinner />}
        {trendingErr && <p>{trendingErr}</p>}
        <Swiper
          navigation={true}
          effect={"coverflow"}
          autoplay={{
            delay: 3000,
          }}
          // grabCursor={true}
          slidesPerView={1}
          spaceBetween={10}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 5,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          // centeredSlides={true}
          // slidesPerView={"auto"}
          // coverflowEffect={{
          //   rotate: 50,
          //   stretch: 0,
          //   depth: 100,
          //   modifier: 1,
          //   slideShadows: false,
          // }}
          // pagination={true}
          className="mySwiper"
        >
          {trendingAnime &&
            trendingAnime.data.map((anime) => (
              <SwiperSlide key={anime.id}>
                <TrendingItem anime={anime} />
              </SwiperSlide>
            ))}
        </Swiper>
      </section> */}
      {/* <section className={styles.games_content}>
        <div className={styles.card_title}>
          <h1 className={styles.title}>
            Top 10 Popularity Anime {currentYear}!
          </h1>
        </div>
        {popularityPending && <Spinner />}
        {popularityErr && <p>{popularityErr}</p>}
        <Swiper
          navigation={true}
          effect={"coverflow"}
          autoplay={{
            delay: 3000,
          }}
          // grabCursor={true}
          slidesPerView={1}
          spaceBetween={10}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 5,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          // centeredSlides={true}
          // slidesPerView={"auto"}
          // coverflowEffect={{
          //   rotate: 50,
          //   stretch: 0,
          //   depth: 100,
          //   modifier: 1,
          //   slideShadows: false,
          // }}
          // pagination={true}
          className="mySwiper"
        >
          {popularityAnime &&
            popularityAnime.data.map((popularity) => (
              <SwiperSlide key={popularity.id}>
                <PopularityItem anime={popularity} />
              </SwiperSlide>
            ))}
        </Swiper>
      </section> */}

      <section className={styles.games_content}>
        <div className={styles.card_title}>
          <h1 className={styles.title}>List Anime {currentYear}!</h1>
        </div>
        {isPending && <Spinner />}
        {error && <p>{error}</p>}
        {randomAnime.data && (
          <RandomList items={randomAnime.data} loading={randomAnime.loading} />
        )}
        <button onClick={() => moreAnime()}>Show more</button>
      </section>
    </>
  );
};

export default Home;
