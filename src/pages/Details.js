import { useContext, useState } from "react";
import { useParams } from "react-router";
import { AiFillHeart, AiFillWindows } from "react-icons/ai";
import { GoBrowser } from "react-icons/go";
import { useFetch } from "../hooks/useFetch";
import { FavoritesContext } from "../context/FavoritesContext";
import parse from "html-react-parser";

// styles
import styles from "./Details.module.css";
import Spinner from "../components/ui/Spinner";
// import Layout from "../components/layout/Layout";
import { Year } from "../lib/Lib";

const Details = () => {
  const { slug } = useParams();
  const [genres, setGenres] = useState([]);
  // const [pendingGenres, setPendingGenres] = useState(false);
  // const [err, setErr] = useState("");
  console.log(genres);
  // console.log(pendingGenres);

  const {
    res: anime,
    isPending: animePending,
    error: animeErr,
  } = useFetch(
    `${process.env.REACT_APP_API_URL_ANIME}/anime?filter[slug]=${slug}`
  );

  try {
    fetch(`${anime.data[0].relationships.categories.links.related}`)
      .then((resJson) => resJson.json())
      .then((res) => genres.length === 0 && setGenres(res.data));
  } catch (error) {
    // // setPendingGenres(!pendingGenres);
    // console.log(error)
    return <p>ok</p>;
    // setErr(error);
  }

  // const cek = async () => {
  //   try {
  //     if (animePending === false) return console.log(genreAnime);
  //   } catch (error) {
  //     return alert(animePending);
  //   }
  // };

  // cek();

  // const {
  //   res: genreAnime,
  //   isPending: genreAnimePending,
  //   error: genreAnimeErr,
  // } = useFetch(`${anime.data[0].relationships.categories.links.related}`);
  // console.log(genreAnime);
  // console.log(genreAnimeErr);
  // console.log(genreAnimePending);

  // const { anime } = data.data;
  // console.log(anime);
  // console.log(anime.data[0].attributes.coverImage.meta.dimensions.height);
  // const anime = data;
  // console.log(anime.data[0]);

  // const { gameIsFavorite, addToFavorite } = useContext(FavoritesContext);

  return (
    <section className={styles.detail}>
      {animePending && <Spinner />}
      {animeErr && <p>{animeErr}</p>}
      {anime && (
        <>
          <div className={styles.wrapper_thumb}>
            <img
              className={styles.thumbnail}
              src={anime.data[0].attributes.coverImage.original}
              alt={anime.data[0].attributes.titles.en}
              style={{
                height: `${anime.data[0].attributes.coverImage.meta.dimensions.small.height}px`,
              }}
            />
          </div>
          <div className={styles.content}>
            <div className={styles.data}>
              <h1 className={styles.title}>
                {anime.data[0].attributes.titles.en ||
                  (anime.data[0].attributes.titles.en_jp &&
                    anime.data[0].attributes.titles.en_jp)}
              </h1>
              <span>
                {anime.data[0].attributes.subtype} |{" "}
                {anime.data[0].attributes.ageRatingGuide} |{" "}
                {Year(anime.data[0].attributes.startDate)}
              </span>
              {/* {pendingGenres && <Spinner />} */}
              {/* {genreAnimeErr && <p>{genreAnimeErr}</p>} */}
              <div className={styles.genres}>
                {genres &&
                  genres.map((genre) => (
                    <a
                      key={genre.id}
                      href={`/anime/genre/${genre.attributes.slug}`}
                      className={styles.genre}
                    >
                      {genre.attributes.title}
                    </a>
                  ))}
              </div>
              {/* <span>
                {" "}
                {anime.data[0].relationships.categories.links.related}{" "}
              </span> */}
              {/* <span>Start Date{anime.data[0].attributes.startDate}</span> */}
              <article>{anime.data[0].attributes.description}</article>
            </div>
          </div>
        </>
        //  {parse(anime.data[0].attributes.) ||
        //   (anime.data.descriptions.it && parse(anime.data.descriptions.it))}

        // {/* {parse(anime.data.descriptions.en)} */}

        // {/* <h3>Additional Information</h3>
        // <ul className={styles.info_list}>
        //   <li>
        //     <span className="text-muted">Title</span>
        //     <p>{anime.title}</p>
        //   </li>
        //   <li>
        //     <span className="text-muted">Developer</span>
        //     <p>{anime.developer}</p>
        //   </li>
        //   <li>
        //     <span className="text-muted">Publisher</span>
        //     <p>{anime.publisher}</p>
        //   </li>
        //   <li>
        //     <span className="text-muted">Release Date</span>
        //     <p>{anime.release_date}</p>
        //   </li>
        //   <li>
        //     <span className="text-muted">Genre</span>
        //     <p>{anime.genre}</p>
        //   </li>
        //   <li>
        //     <span className="text-muted">Platform</span>
        //     <div className={styles.platform}>
        //       {anime.platform === "Windows" ? (
        //         <AiFillWindows className={styles.platform_icon} />
        //       ) : (
        //         <GoBrowser className={styles.platform_icon} />
        //       )}
        //       <p>{anime.platform}</p>
        //     </div>
        //   </li>
        // </ul> */}
        // {/*
        // {anime?.screenshots && <h3>{anime.title} Screenshots</h3>}
        // {anime?.screenshots && (
        //   <div className={styles.screenshot_grid}>
        //     {anime?.screenshots?.map(({ image }) => (
        //       <div key={image}>
        //         <img src={image} alt="" />
        //       </div>
        //     ))}
        //   </div>
        // )} */}

        // {/* {anime?.minimum_system_requirements && (
        //   <h3>Minimum System Requirements (Windows)</h3>
        // )}
        // {anime?.minimum_system_requirements && (
        //   <ul className={styles.info_list}>
        //     <li>
        //       <span className="text-muted">OS</span>
        //       <p>{anime.minimum_system_requirements.os}</p>
        //     </li>
        //     <li>
        //       <span className="text-muted">Processor</span>
        //       <p>{anime.minimum_system_requirements.processor}</p>
        //     </li>
        //     <li>
        //       <span className="text-muted">Memory</span>
        //       <p>{anime.minimum_system_requirements.memory}</p>
        //     </li>
        //     <li>
        //       <span className="text-muted">Graphics</span>
        //       <p>{anime.minimum_system_requirements.graphics}</p>
        //     </li>
        //     <li>
        //       <span className="text-muted">Storage</span>
        //       <p>{anime.minimum_system_requirements.storage}</p>
        //     </li>
        //   </ul>
        // )} */}

        // {/* <button
        //   onClick={() => addToFavorite(anime)}
        //   className={`btn ${styles.btn_favorite}`}
        //   title={
        //     gameIsFavorite(anime.id)
        //       ? "Remove from favorites"
        //       : "Add to favorites"
        //   }
        // >
        //   <AiFillHeart
        //     className={styles.heart_icon}
        //     color={gameIsFavorite(anime.id) ? "#ff0000" : "#fff"}
        //   />
        // </button> */}
      )}
    </section>
  );
};

export default Details;
