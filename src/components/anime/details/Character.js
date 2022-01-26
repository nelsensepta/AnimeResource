import React from "react";
import styles from "../../../pages/Details.module.css";

export default function Character({ url }) {
  const {
    res: genreAnime,
    isPending: genreAnimePending,
    error: genreAnimeErr,
  } = useFetch(url);
  return (
    <div className={styles.genres}>
      {anime.included.map((genre) => (
        <a
          key={genre.id}
          href={`/anime/genre/${genre.attributes.slug}`}
          className={styles.genre}
        >
          {genre.attributes.title}
        </a>
      ))}
    </div>
  );
}
