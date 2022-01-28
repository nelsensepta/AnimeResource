import { useContext } from "react";
import { Link } from "react-router-dom";
// import { AiFillWindows, AiFillHeart } from "react-icons/ai";
// import { AiFillStar } from "react-icons/ai";
// import { Year } from "../../../lib/Lib";
// styles
import styles from "./CharacterItem.module.css";

import { FavoritesContext } from "../../../context/FavoritesContext";

const CharacterItem = ({ item }) => {
  // const { addToFavorite, gameIsFavorite } = useContext(FavoritesContext);
  return (
    <div className={styles.card}>
      <Link
        to={`/anime/${item.attributes.slug}`}
        className={styles.card_header}
      >
        <img
          className={styles.thumbnail}
          src={item.attributes.image && item.attributes.image.original}
          alt={item.attributes.name}
          // style={{
          //   height: item.attributes.image
          //     ? `${item.attributes.image.small.height}px`
          //     : "240px",
          //   width: item.attributes.image
          //     ? `${item.attributes.image.small.width}px`
          //     : "200px",
          // }}
        />
      </Link>
      <div className={styles.card_body}>
        <Link to={`/anime/${item.attributes.slug}`} className={styles.title}>
          {item.attributes.name
            ? item.attributes.name
            : item.attributes.names.ja_jp}
        </Link>
      </div>
    </div>
  );
};

export default CharacterItem;
