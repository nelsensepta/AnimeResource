import { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { useDebounce } from "../hooks/useDebounce";
import { useSearchParams } from "react-router-dom";
// styles
import styles from "./Quotes.module.css";
import QuoteList from "../components/quotes/QuoteList";
import QuoteSingle from "../components/quotes/QuoteSingle";
import Spinner from "../components/ui/Spinner";
import { BiSearch } from "react-icons/bi";
import stylesHome from "./Home.module.css";
import AnimeService from "../services/AnimeService";

const Quotes = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState("character");
  const [filteredQuotes, setFilteredQuotes] = useState();
  // const [allAnime, setAllAnime] = useState([]);
  const [loading, setLoading] = useState();
  const [err, setErr] = useState("");

  let [searchParams, setSearchParams] = useSearchParams();
  let param = searchParams.get(`${search}`);
  const debouncedSearchTerm = useDebounce(param, 500);

  const handleSearch = (e) => {
    e.preventDefault();
    const v = e.target.value;
    if (v && search === "character") {
      setSearchParams({ character: v });
    } else if (v && search === "anime") {
      setSearchParams({ anime: v });
    } else {
      setSearchParams({});
    }
  };

  useEffect(() => {
    let abortController = new AbortController();
    if (debouncedSearchTerm) {
      setLoading(true);
      if (!abortController.signal.aborted) {
        setTimeout(() => {
          AnimeService.getQuotes(debouncedSearchTerm, `${search}`)
            .then((data) => setFilteredQuotes(data))
            .catch((error) => setErr(`${error}`))
            .finally(() => {
              setLoading(false);
            });
        }, 500);
      }
    } else {
      setLoading(false);
    }
    return () => {
      abortController.abort();
    };
  }, [debouncedSearchTerm]);

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

  // const debouncedSearchTerm = useDebounce(searchTerm, 500);
  // console.log(debouncedSearchTerm);

  // const currentYear = new Date().getFullYear();
  // useEffect(() => {
  //   if (debouncedSearchTerm && res) {
  //     setFilteredQuotes();
  //     // randomAnime.filter((anime) =>
  //     //   anime.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  //     // )
  //   }
  // }, [debouncedSearchTerm, filteredQuotes]);

  // if (selectedCategory) {
  //   url = `${process.env.REACT_APP_API_URL_ANIME}/v1/song?sort-by=popularity&category=${selectedCategory}`;
  // }

  const {
    res: single,
    isPending: singlePending,
    error: singleErr,
  } = useFetch(`${process.env.REACT_APP_API_URL_QUETOS}/random`);
  console.log(single);
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
  // if (allAnime.length === 0) {
  //   setAllAnime([1, 2, 3]);
  // }
  // console.log(allAnime);

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

  // console.log(Array.isArray(filteredQuotes));
  return (
    <section className={styles.content}>
      <div className={styles.card_title}>
        <h1 className={styles.title}>Single Anime Quotes</h1>
      </div>
      <div className={stylesHome.card_input}>
        <form className={stylesHome.form}>
          <label>
            <BiSearch className={stylesHome.search_icon} />
            <input
              value={param || ""}
              onChange={handleSearch}
              type="search"
              placeholder={`Search for ${search}`}
              className={stylesHome.input}
            />
          </label>
        </form>
        <div className={styles.filter}>
          <select
            id="category"
            onChange={(e) => setSearch(e.target.value)}
            defaultValue={`${search}`}
          >
            <option value="character">Character</option>
            <option value="anime">Anime</option>
          </select>
        </div>
      </div>
      {/* {filteredQuotes ? (
        <QuoteList items={filteredQuotes} />
      ) : (
        <QuoteSingle item={single} />
      )} */}
      {err && <p>{err}</p>}
      {single && <QuoteSingle item={single} />}
      {singlePending && <Spinner />}
      {singleErr && <p>{singleErr}</p>}

      {/* {loading &&
        Array(9)
          .fill()
          .map((item, index) => <Card key={index} />)} */}

      {/* {!err && filteredQuotes && <QuoteList items={filteredQuotes} />} */}
      {/* <p>{allAnime.error}</p> */}
      {/* {loading && <Spinner />} */}
      {/* {err && <p>{err}</p>} */}
      {/* {allAnime.length !== 0 && <QuoteList items={allAnime} />} */}
    </section>
  );
};

export default Quotes;
