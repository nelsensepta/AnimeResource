// styles
// import styles from "./GameList.module.css";
// import QuoteItem from "./QuoteItem";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, EffectCoverflow, Navigation } from "swiper";
import QuoteSingle from "./QuoteSingle";
import Spinner from "../ui/Spinner";
SwiperCore.use([Autoplay, Navigation]);
const QuoteList = ({ items }) => {
  console.log(items);
  return (
    // <div className="bg-gray-400">
    //   {items.data.map((quote) => (
    //     <QuoteItem key={quote.id} item={quote} />
    //   ))}
    // </div>
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
      {items &&
        items.map((item, i) => (
          <SwiperSlide key={i}>
            <QuoteSingle item={item} />
          </SwiperSlide>
        ))}
      {/* <p>ok</p> */}
    </Swiper>
  );
};

export default QuoteList;
