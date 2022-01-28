import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import TrendingItem from "./TrendingItem";
import styles from "./Trending.module.css";
import Spinner from "../../ui/Spinner";
import { currentYear } from "../../../lib/Lib";
SwiperCore.use([Autoplay, Navigation]);
const Trending = ({ trendingPending, trendingErr, trendingAnime }) => {
  return (
    <div className={styles.content}>
      <div className={styles.card_title}>
        <h1 className={styles.title}>Top 10 Trending Anime {currentYear()}!</h1>
      </div>
      {trendingPending && <Spinner />}
      {trendingErr && <p>{trendingErr}</p>}
      <Swiper
        navigation={true}
        autoplay={{
          delay: 3000,
        }}
        grabCursor={true}
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
        loop={true}
        className="mySwiper"
      >
        {!trendingPending &&
          trendingAnime &&
          trendingAnime.data.map((anime) => (
            <SwiperSlide key={anime.id}>
              <TrendingItem anime={anime} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};
export default Trending;
