import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import PopularityItem from "./PopularityItem";
import styles from "./Popularity.module.css";
import Spinner from "../../ui/Spinner";
import { currentYear } from "../../../lib/Lib";
SwiperCore.use([Autoplay, Navigation]);
export default function Popularity({
  popularityPending,
  popularityErr,
  popularityAnime,
}) {
  return (
    <section className={styles.content}>
      <div className={styles.card_title}>
        <h1 className={styles.title}>
          Top 10 Popularity Anime {currentYear()}!
        </h1>
      </div>
      {popularityPending && <Spinner />}
      {popularityErr && <p>{popularityErr}</p>}
      <Swiper
        navigation={true}
        autoplay={{
          delay: 3000,
        }}
        grabCursor={true}
        loop={true}
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
        className="mySwiper"
      >
        {popularityAnime &&
          popularityAnime.data.map((popularity) => (
            <SwiperSlide key={popularity.id}>
              <PopularityItem anime={popularity} />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
}
