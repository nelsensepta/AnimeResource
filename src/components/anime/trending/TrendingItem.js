import styles from "./TrendingItem.module.css";
import { AiFillStar } from "react-icons/ai";
import { Year } from "../../../lib/Lib";
import Genres from "../../genres/Genres";

export default function TrendingItem({ anime }) {
  // const [genreAnime, setGenreAnime] = useState([]);
  // console.log(genreAnime);
  // const {
  //   res: genreAnime,
  //   isPending: genreAnimePending,
  //   error: genreAnimeErr,
  // } = useFetch(
  //   `${process.env.REACT_APP_API_URL_ANIME}${anime.relationships.categories.links.related}`
  // );
  // console.log(genreAnime);
  // fetch(
  //   `${process.env.REACT_APP_API_URL_ANIME}${anime.relationships.categories.links.related}`
  // )
  //   .then((resJson) => resJson.json())
  //   .then((res) => setGenreAnime(res));
  // console.log(genres);
  // console.log(anime.relationships.genres.links.related);
  // console.log(genres);
  // useEffect(() => {
  //   fetch(
  //     `${process.env.REACT_APP_API_URL_ANIME}${anime.relationships.genres.links.related}`
  //   )
  //     .then((res) => res.json())
  //     .then((resData) => setGenres(resData.data));
  // }, [genres]);

  // const fetchPost = async () => {
  //   const response = await fetch(
  //     `${process.env.REACT_APP_API_URL_ANIME}${anime.relationships.genres.links.related}`
  //   );
  //   const resData = await response.json();
  //   //update the state
  //   setPost(resData.data);
  // };
  return (
    <div className={styles.card}>
      <img
        src={anime.attributes.posterImage.original}
        alt={anime.attributes.titles.en}
        className={styles.coverImg}
      />
      <div className={styles.data}>
        <a href={`/anime/${anime.attributes.slug}`} className={styles.title}>
          {anime.attributes.titles.en ||
            (anime.attributes.titles.en_jp &&
              anime.attributes.titles.en_jp)}{" "}
          | {Year(anime.attributes.startDate)}
        </a>
        <div className={styles.wrapper_rating}>
          <span className={styles.icon}>
            <AiFillStar />
          </span>
          <span className={styles.rating}>
            {anime.attributes.averageRating} | {anime.attributes.showType}
          </span>
        </div>
        {/* <p>{anime.relationships.genres.links.related}</p> */}
        {/* <div className={styles.genres}>
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
        </div> */}

        <Genres genres={anime.relationships.categories.links.related} />
      </div>
    </div>
  );
}
