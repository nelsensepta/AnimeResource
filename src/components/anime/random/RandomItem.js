import { useContext } from "react";
import { Link } from "react-router-dom";
import { AiFillWindows, AiFillHeart } from "react-icons/ai";
import { GoBrowser } from "react-icons/go";
import { AiFillStar } from "react-icons/ai";
import Genre from "../../genres";
import { Year } from "../../../lib/Lib";
// styles
import styles from "./RandomItem.module.css";

import { FavoritesContext } from "../../../context/FavoritesContext";

const RandomList = ({ item: anime }) => {
  // console.log(false || (true && "ok"));
  const { addToFavorite, gameIsFavorite } = useContext(FavoritesContext);

  return (
    <div className={styles.card}>
      <Link
        to={`/anime/${anime.attributes.slug}`}
        className={styles.card_header}
      >
        <img
          className={styles.thumbnail}
          src={anime.attributes.posterImage.original}
          alt={anime.attributes.titles.en}
        />
      </Link>
      <div className={styles.card_body}>
        <Link to={`/anime/${anime.attributes.slug}`} className={styles.title}>
          {anime.attributes.titles.en ||
            (anime.attributes.titles.en_jp && anime.attributes.titles.en_jp)}
        </Link>
        <div className={styles.data}>
          <div className={styles.wrapper_rating}>
            <span className={styles.icon}>
              <AiFillStar />
            </span>
            <span className={styles.rating}>
              {anime.attributes.averageRating} | {anime.attributes.showType} |{" "}
              {Year(anime.attributes.startDate)}
            </span>
          </div>
          <button
            onClick={() => addToFavorite(anime)}
            className={styles.btn}
            title={
              gameIsFavorite(anime.id)
                ? "Remove from favorites"
                : "Add to favorites"
            }
          >
            <AiFillHeart
              className={styles.heart_icon}
              style={{
                color: gameIsFavorite(anime.mal_id) ? "red" : "#aaaaaa",
              }}
            />
          </button>
        </div>

        {/* <div className={styles.card_footer}>
          <div>
            {anime.genres.map((g) => (
              <Genre genre={g} />
            ))}
            {anime.platform.includes("PC (Windows)") ? (
              <AiFillWindows
                className={styles.platform_icon}
                title="Available on Windows"
              />
            ) : (
              <GoBrowser
                className={styles.platform_icon}
                title="Available on Browser"
              />
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default RandomList;
