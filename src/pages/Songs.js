import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

// styles
import styles from "./Popular.module.css";
import SongList from "../components/songs/SongList";
import Spinner from "../components/ui/Spinner";
import stylesHome from "./Home.module.css";
import { BiSearch } from "react-icons/bi";
import Layout from "../components/layout/Layout";

const Songs = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [allAnime, setAllAnime] = useState([]);
  let url = `${process.env.REACT_APP_API_URL_ANIME}/v1/random/song/50`;
  // setAllAnime(
  //   useFetch(`${process.env.REACT_APP_API_URL_ANIME}/v1/random/song/50`)
  // );

  // if (selectedCategory) {
  //   url = `${process.env.REACT_APP_API_URL_ANIME}/v1/song?sort-by=popularity&category=${selectedCategory}`;
  // }

  const { data, isPending, error } = useFetch(url);

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
    <Layout>
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
              placeholder="Search for title or artist"
              className={stylesHome.input}
            />
          </label>
        </form>

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
        {data && <SongList items={data} />}
      </section>
    </Layout>
  );
};

export default Songs;
