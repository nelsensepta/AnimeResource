import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaSpotify, FaHeart } from "react-icons/fa";
import { GoBrowser } from "react-icons/go";
import Genre from "../genres";
import { convertMinute } from "../../lib/convertMinute";
// styles
import styles from "./SongItem.module.css";

import { FavoritesContext } from "../../context/FavoritesContext";

const GameItem = ({ item: song }) => {
  const { addToFavorite, gameIsFavorite } = useContext(FavoritesContext);
  console.log(song.duration);
  console.log(convertMinute(6000));

  return (
    <div className={styles.card}>
      <div className={styles.card_body}>
        <Link to={`/song/${song.is}`} className={styles.title}>
          {song.title}
        </Link>
        <p>{convertMinute(song.duration)}</p>
        <p>{song.artist}</p>
        <p>{song.albun}</p>
        <div className={styles.card_footer}>
          <a
            href={`${song.local_spotify_url}`}
            target="_blank"
            className={styles.title}
          >
            <FaSpotify className={styles.heart_icon} />
          </a>
          <button
            onClick={() => addToFavorite(song)}
            className={styles.btn}
            title={
              gameIsFavorite(song.id)
                ? "Remove from favorites"
                : "Add to favorites"
            }
          >
            <FaHeart
              className={styles.heart_icon}
              style={{
                color: gameIsFavorite(song.id) ? "red" : "#aaaaaa",
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameItem;
