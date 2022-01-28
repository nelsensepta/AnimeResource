import { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";

// styles
import styles from "./Songs.module.css";
import SongList from "../components/songs/SongList";
import Spinner from "../components/ui/Spinner";
import stylesHome from "./Home.module.css";
import { BiSearch } from "react-icons/bi";
import { useDebounce } from "../hooks/useDebounce";
import { useTranslation } from "react-i18next";
// import i18next from "i18next";
import { useSearchParams } from "react-router-dom";
import AnimeService from "../services/AnimeService";
import CatalogMagic from "../components/ui/skeleton/CatalogMagic";
import Card from "../components/ui/skeleton/Card";

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
  let param = searchParams.get(`${search}`);

  const debouncedSearchTerm = useDebounce(param, 500);

  const handleSearch = (e) => {
    e.preventDefault();
    const v = e.target.value;
    if (v && search === "title") {
      setSearchParams({ title: v });
    } else if (v && search === "artist") {
      setSearchParams({ artist: v });
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
          AnimeService.getSongs(debouncedSearchTerm, `${search}`)
            .then((data) => setSearchSongs(data))
            .catch((error) => setErr(`Hasil tidak Ada Bro ${error}`))
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

  let url = `${process.env.REACT_APP_API_URL_SONGS}/random/song/20`;
  const { res, isPending, error } = useFetch(url);

  return (
    <section className={styles.content}>
      <div className={styles.card_title}>
        <h1 className={styles.title}>List Songs Anime 2022!</h1>
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
            value={`${search}`}
          >
            <option value="title">Title</option>
            <option value="artist">Artist</option>
          </select>
        </div>
      </div>
      {err && <p>{err}</p>}
      {loading &&
        Array(9)
          .fill()
          .map((item, index) => <Card key={index} />)}

      {searchSongs && <SongList items={searchSongs.data.documents} />}
      {/* {searchSongs ? (
        loading ? (
          <p>INi loading Seach</p>
        ) : (
          <SongList items={searchSongs.data.documents} />
        )
      ) : (
        res && <SongList items={res.data} />
      )} */}

      {!searchSongs && res && <SongList items={res.data} />}
      {isPending && <Spinner />}
      {error && <p>{error}</p>}
    </section>
  );
};

export default Songs;
