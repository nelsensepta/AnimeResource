import { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSpotify, FaHeart, FaPlay, FaPause } from "react-icons/fa";
import { GoBrowser } from "react-icons/go";
import { convertMinute, RandomString } from "../../lib/Lib";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// styles
import styles from "./SongItem.module.css";

import { FavoritesContext } from "../../context/FavoritesContext";

const GameItem = (props) => {
  // console.log(props.item.id !== props.item.id);
  const { addToFavorite, gameIsFavorite } = useContext(FavoritesContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioElement = useRef(null);

  // console.log(props.audio);

  useEffect(() => {
    if (isPlaying) {
      audioElement.current.play();
    } else {
      audioElement.current.pause();
    }
  });
  // console.log(props.item.album);

  // const contohId = [1,2,3,4,5,6]
  // const contohPlay = false
  // console.log(contohId.map((id)))
  // console.log(song.duration);
  // console.log(convertMinute(6000));
  // const { t } = useTranslation();
  // console.log(props);

  return (
    <div className={styles.card}>
      <div className={styles.card_body}>
        <Link to={`/song/${props.item.duration}`} className={styles.title}>
          {props.item.title}
        </Link>
        {/* <Skeleton /> */}
        <p>{convertMinute(props.item.duration)}</p>
        <p>{props.item.artist}</p>
        <p>{props.item.album}</p>
        <div className={styles.card_audio}>
          <audio ref={audioElement} src={`${props.item.preview_url}`} />
          <button onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? (
              <FaPause className={styles.heart_icon} />
            ) : (
              <FaPlay className={styles.heart_icon} />
            )}
          </button>
        </div>
        <div className={styles.card_footer}>
          <a
            href={`${props.item.local_spotify_url}`}
            target="_blank"
            className={styles.title}
          >
            <FaSpotify className={styles.heart_icon} />
          </a>
          <button
            onClick={() => addToFavorite(props.item)}
            className={styles.btn}
            title={
              gameIsFavorite(props.item.id)
                ? "Remove from favorites"
                : "Add to favorites"
            }
          >
            <FaHeart
              className={styles.heart_icon}
              style={{
                color: gameIsFavorite(props.item.id) ? "red" : "#aaaaaa",
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameItem;
