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

// import RandomList from "../components/anime/random/RandomList";
import Spinner from "../components/ui/Spinner";
// import TrendingList from "../components/anime/trending/TrendingList";
import TrendingItem from "../components/anime/trending/TrendingItem";
import Layout from "../components/layout/Layout";
SwiperCore.use([Autoplay, Navigation]);
const Home = () => {
  const [filteredGames, setFilteredGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: trendingAnime,
    isPending: trendingPending,
    error: trendingErr,
  } = useFetch(`${process.env.REACT_APP_API_URL_ANIME}/trending/anime`);
  console.log(trendingAnime);

  // const {
  //   data: randomAnime,
  //   isPending: randomPending,
  //   error: randomErr,
  // } = useFetch(`${process.env.REACT_APP_API_URL_ANIME}/anime`);
  // console.log(randomAnime);

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
      <section>
        <div className={styles.card_title}>
          <h1 className={styles.title}>Top 10 Trending Anime {currentYear}!</h1>
        </div>
        <form className={styles.form}>
          <label>
            {/* <BiSearch className={styles.search_icon} /> */}
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
      </section>
      <section className={styles.games_content}>
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
        <p>Problem Pada Container Layout Nanti Saya Update Besok</p>
      </section>

      {/* <section className={styles.games_content}>
        {isPending && <Spinner />}
        {error && <p>{error}</p>}
        {trending && (
          <AnimeList
            items={debouncedSearchTerm ? filteredGames : trending.data}
          />
        )}
      </section> */}
    </>
  );
};

export default Home;
