import React from "react";
import { isValidURL } from "../../lib/Lib";
import styles from "../anime/trending/TrendingItem.module.css";
import Spinner from "../ui/Spinner";
import { useFetch } from "../../hooks/useFetch";

export default function Genres({ genres }) {
  let url;
  if (isValidURL(genres)) {
    url = `${genres}`;
  } else {
    url = `${process.env.REACT_APP_API_URL_ANIME}${genres}`;
  }
  const {
    res: genreAnime,
    isPending: genreAnimePending,
    error: genreAnimeErr,
  } = useFetch(url);

  return (
    <div className={styles.genres}>
      {genreAnimePending && <Spinner />}
      {genreAnimeErr && <p>{genreAnimeErr}</p>}
      {genreAnime &&
        genreAnime.data.map((genre) => (
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
