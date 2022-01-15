import { useContext } from "react";
import { Link } from "react-router-dom";
import { AiFillWindows, AiFillHeart } from "react-icons/ai";
import { GoBrowser } from "react-icons/go";
import Genre from "../../genres";
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
          alt="test"
        />
      </Link>
      <div className={styles.card_body}>
        <Link to={`/anime/${anime.attributes.slug}`} className={styles.title}>
          {anime.attributes.titles.en}
        </Link>
        <p className={`${styles.description} text-muted`}>
          {anime.attributes.description}
        </p>
        <div className={styles.card_footer}>
          {/* <div>
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
          </div> */}
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
      </div>
    </div>
  );
};

export default RandomList;
