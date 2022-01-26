// styles
// import styles from "./GameList.module.css";
// import QuoteItem from "./QuoteItem";
// import "swiper/swiper-bundle.min.css";
// import "swiper/swiper.min.css";
import styles from "./QuotesSingle.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper";
import QuoteSingle from "./QuoteSingle";
import Spinner from "../ui/Spinner";
SwiperCore.use([Autoplay, Navigation, Pagination]);
const QuoteList = ({ items }) => {
  // console.log(items);
  return (
    // <div className="bg-gray-400">
    //   {items.data.map((quote) => (
    //     <QuoteItem key={quote.id} item={quote} />
    //   ))}
    // </div>
    <Swiper
      // navigation={true}
      effect={"coverflow"}
      // autoplay={{
      //   delay: 3000,
      // }}
      // grabCursor={true}
      slidesPerView={1}
      // spaceBetween={50}
      // breakpoints={{
      //   640: {
      //     slidesPerView: 1,
      //     spaceBetween: 5,
      //   },
      //   768: {
      //     slidesPerView: 2,
      //     spaceBetween: 15,
      //   },
      //   1024: {
      //     slidesPerView: 3,
      //     spaceBetween: 20,
      //   },
      // }}
      centeredSlides={true}
      // autoHeight={true}
      // slidesPerView={"auto"}
      // coverflowEffect={{
      //   rotate: 50,
      //   stretch: 0,
      //   depth: 100,
      //   modifier: 1,
      //   slideShadows: false,
      // }}

      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      className="mySwiper"
    >
      {items.map((item, i) => (
        <SwiperSlide key={i}>
          <div className={styles.content}>
            <QuoteSingle item={item} />
          </div>
        </SwiperSlide>
      ))}
      {/* <p>ok</p> */}
    </Swiper>
  );
};

export default QuoteList;
