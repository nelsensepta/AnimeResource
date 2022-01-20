import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

// styles
import styles from "./Songs.module.css";
import SongList from "../components/songs/SongList";
import Spinner from "../components/ui/Spinner";
import stylesHome from "./Home.module.css";
import { BiSearch } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const Songs = () => {
  // function handleClick(lang) {
  //   i18next.changeLanguage(lang);
  // }
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [allAnime, setAllAnime] = useState([]);
  let url = `${process.env.REACT_APP_API_URL_SONGS}/song`;
  const { res, isPending, error } = useFetch(url);
  console.log(res);

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
      {/* <form className={stylesHome.form}>
        <label>
          <BiSearch className={stylesHome.search_icon} />
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            type="search"
            placeholder="Search for title or artist"
            className={stylesHome.input}
          />
        </label>
      </form> */}

      {/* <div className={styles.filter}>
        <label htmlFor="category">More Top 10's:</label>
        <select
          defaultValue="Select Category"
          id="category"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option disabled>Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              Top {category}
            </option>
          ))}
        </select>
      </div> */}

      {isPending && <Spinner />}
      {error && <p>{error}</p>}
      {res && <SongList items={res.data} />}
    </section>
  );
};

export default Songs;
