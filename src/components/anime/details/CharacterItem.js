import { useContext } from "react";
import { Link } from "react-router-dom";
import { AiFillWindows, AiFillHeart } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { Year } from "../../../lib/Lib";
// styles
import styles from "./Character.module.css";

import { FavoritesContext } from "../../../context/FavoritesContext";

const RandomList = ({ char }) => {
  // const { addToFavorite, gameIsFavorite } = useContext(FavoritesContext);
  return (
    <div className={styles.card}>
      <Link
        to={`/anime/${char.attributes.slug}`}
        className={styles.card_header}
      >
        <img
          className={styles.thumbnail}
          src={char.attributes.posterImage.original}
          alt={char.attributes.titles.en}
        />
      </Link>
      <div className={styles.card_body}>
        <Link to={`/anime/${char.attributes.slug}`} className={styles.title}>
          {char.attributes.titles.en ||
            (char.attributes.titles.en_jp && char.attributes.titles.en_jp)}
        </Link>
      </div>
    </div>
  );
};

export default RandomList;
