import { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { useDebounce } from "../hooks/useDebounce";
// styles
import styles from "./Popular.module.css";
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
  console.log(allAnime);
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

  const { data, isPending, error } = useFetch(url);
  const currentYear = new Date().getFullYear();
  const currentMonth = Intl.DateTimeFormat("en-US", { month: "long" }).format(
    new Date()
  );

  const categories = [
    "MMO",
    "MMORPG",
    "Shooter",
    "Strategy",
    "Moba",
    "Card Games",
    "Racing",
    "Sports",
    "Social",
    "Fighting",
  ];

  return (
    <section className={styles.popular}>
      {/* <h1 className="title">
        Top 10 Free{" "}
        <span className={styles.lead}>
          {selectedCategory ? selectedCategory : "To Play"}
        </span>{" "}
        Games for PC and Browser in {currentMonth} {currentYear}
      </h1> */}
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

      {isPending && <Spinner />}
      {error && <p>{error}</p>}
      {data && <QuoteSingle item={data} />}
    </section>
  );
};

export default Quotes;
