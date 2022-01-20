import { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { useDebounce } from "../hooks/useDebounce";
// styles
import styles from "./Quotes.module.css";
import QuoteList from "../components/quotes/QuoteList";
import QuoteSingle from "../components/quotes/QuoteSingle";
import Spinner from "../components/ui/Spinner";
import { BiSearch } from "react-icons/bi";
import stylesHome from "./Home.module.css";

const Quotes = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGames, setFilteredGames] = useState([]);
  const [allAnime, setAllAnime] = useState([]);
  let url = `${process.env.REACT_APP_API_URL_QUETOS}/random`;
  // setAllAnime(
  //   useFetch(`${process.env.REACT_APP_API_URL_QUETOS}/available/anime`)
  // );

  // console.log(allAnime);
  // const { availableAnime, isPending, error } = useFetch(
  //   `${process.env.REACT_APP_API_URL_QUETOS}/available/anime`
  // );
  // const { availableAnime, load, err } = useFetch(
  //   `${process.env.REACT_APP_API_URL_QUETOS}/available/anime`
  // );
  // console.log(`${process.env.REACT_APP_API_URL_QUETOS}/available/anime`);
  // setAllAnime(availableAnime);
  // console.log(allAnime);
  // console.log(availableAnime);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  // console.log(debouncedSearchTerm);

  // const currentYear = new Date().getFullYear();
  // useEffect(() => {
  //   if (debouncedSearchTerm && randomAnime) {
  //     setFilteredGames(
  //       randomAnime.filter((anime) =>
  //         anime.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  //       )
  //     );
  //   }
  // }, [debouncedSearchTerm, randomAnime]);

  // if (selectedCategory) {
  //   url = `${process.env.REACT_APP_API_URL_ANIME}/v1/song?sort-by=popularity&category=${selectedCategory}`;
  // }

  // const {
  //   res: single,
  //   isPending: singlePending,
  //   error: singleErr,
  // } = useFetch(`${process.env.REACT_APP_API_URL_QUETOS}/random`);
  // const {
  //   res: availableAnime,
  //   isPending: availableAnimePending,
  //   error: availableAnimeErr,
  // } = useFetch(`${process.env.REACT_APP_API_URL_QUETOS}/available/anime`);
  // console.log(availableAnime);
  // try {
  //   if (allAnime === undefined) {
  //   }
  // } catch (error) {
  //   console.log(error);
  // }
  // console.log(allAnime === undefined);
  if (allAnime.length === 0) {
    setAllAnime([1, 2, 3]);
  }
  console.log(allAnime);

  // const currentYear = new Date().getFullYear();
  // const currentMonth = Intl.DateTimeFormat("en-US", { month: "long" }).format(
  //   new Date()
  // );

  // const categories = [
  //   "MMO",
  //   "MMORPG",
  //   "Shooter",
  //   "Strategy",
  //   "Moba",
  //   "Card Games",
  //   "Racing",
  //   "Sports",
  //   "Social",
  //   "Fighting",
  // ];

  return (
    <section className={styles.content}>
      {/* <h1 className="title">
        Top 10 Free{" "}
        <span className={styles.lead}>
          {selectedCategory ? selectedCategory : "To Play"}
        </span>{" "}
        Games for PC and Browser in {currentMonth} {currentYear}
      </h1> */}
      {/* <div className={styles.card_title}>
        <h1 className={styles.title}>Single Anime Quotes</h1>
      </div>
      <form className={stylesHome.form}>
        <label>
          <BiSearch className={stylesHome.search_icon} />
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            type="search"
            placeholder="Search for Anime, Character"
            className={stylesHome.input}
          />
        </label>
      </form>

      {singlePending && <Spinner />}
      {singleErr && <p>{singleErr}</p>}
      {single && <QuoteSingle item={single} />} */}
    </section>
  );
};

export default Quotes;
