import { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";

// styles
import styles from "./Songs.module.css";
import SongList from "../components/songs/SongList";
import Spinner from "../components/ui/Spinner";
import stylesHome from "./Home.module.css";
import { BiSearch } from "react-icons/bi";
import { useTranslation } from "react-i18next";
// import i18next from "i18next";
import { useSearchParams } from "react-router-dom";
import AnimeService from "../services/AnimeService";

const Songs = () => {
  // function handleClick(lang) {
  //   i18next.changeLanguage(lang);
  // }
  // const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState("title");
  // const [searchTerm, setSearchTerm] = useState("");
  const [searchSongs, setSearchSongs] = useState();
  const [loading, setLoading] = useState();
  const [err, setErr] = useState("");
  let [searchParams, setSearchParams] = useSearchParams();
  let param = searchParams.get("tes");

  console.log(search);
  const handleSearch = (e) => {
    const v = e.target.value;
    if (v) {
      setSearchParams({ tes });
    } else {
      setSearchParams({});
    }
  };

  useEffect(() => {
    let abortController = new AbortController();
    if (param) {
      setLoading(true);
      if (!abortController.signal.aborted) {
        AnimeService.getSongs(param, "title")
          .then((data) => setSearchSongs(data), setLoading(false))
          .catch(() => setErr(`Batas 100 Per Jam`), setLoading(false));
      }
    }
    return () => {
      abortController.abort();
    };
  }, [param]);

  // console.log(!allAnime.length);
  // console.log(allAnime);
  // console.log(param);
  // console.log(tes);
  let url = `${process.env.REACT_APP_API_URL_SONGS}/random/song/20`;
  const { res, isPending, error } = useFetch(url);
  console.log(res);
  console.log(searchSongs);

  // if (selectedCategory) {
  //   url = `${process.env.REACT_APP_API_URL_ANIME}/v1/song?sort-by=popularity&category=${selectedCategory}`;
  // }

  // const { data, isPending, error } = useFetch(url);

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
      <div className={styles.card_title}>
        <h1 className={styles.title}>List Songs Anime 2022</h1>
        {/* <button onClick={() => handleClick("en")}>English</button>
        <button onClick={() => handleClick("jp")}>Japan</button>
        <button onClick={() => handleClick("id")}>Indonesia</button> */}
      </div>
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
            value={param || ""}
            onChange={handleSearch}
            type="search"
            placeholder="Search for titles"
            className={stylesHome.input}
          />
        </label>
      </form>

      <div className={styles.filter}>
        <select id="category" onChange={(e) => setSearch(e.target.value)}>
          <option selected value="Title">
            Title
          </option>
          <option value="Artist">Artist</option>
        </select>
      </div>
      {loading && <Spinner />}
      {err && <p>{err}</p>}

      {isPending && <Spinner />}
      {error && <p>{error}</p>}
      {res && <SongList items={res.data} />}
    </section>
  );
};

export default Songs;
