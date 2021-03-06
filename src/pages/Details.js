import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import { AiFillHeart, AiFillWindows } from "react-icons/ai";
import { GoBrowser } from "react-icons/go";
import { useFetch } from "../hooks/useFetch";
import { FavoritesContext } from "../context/FavoritesContext";
import parse from "html-react-parser";
import AnimeService from "../services/AnimeService";

// styles
import styles from "./Details.module.css";
import Spinner from "../components/ui/Spinner";
// import Layout from "../components/layout/Layout";
import { Year } from "../lib/Lib";
import Genres from "../components/genres/Genres";
import Character from "../components/anime/details/Character";

const Details = () => {
  const { slug } = useParams();
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState();

  // Character
  const [char, setChar] = useState([]);
  const [page, setPage] = useState(0);
  const [noData, setNoData] = useState(false);
  const [loadingChar, setLoadingChar] = useState(false);
  const [visibleChar, setVisibleChar] = useState(false);
  const [charErr, setCharErr] = useState();

  useEffect(() => {
    loadCharList(page);
    let abortController = new AbortController();
    if (!details) {
      setLoading(true);
      if (!abortController.signal.aborted) {
        setTimeout(() => {
          AnimeService.getDetails(
            `${process.env.REACT_APP_API_URL_ANIME}/anime?filter[slug]=${slug}&include=categories`
          )
            .then((data) => setDetails(data))
            .catch((error) => setErr(`${error}`))
            .finally(() => {
              setLoading(false);
            });
        }, 500);
      }
    } else {
      setLoading(false);
    }
    return () => {
      abortController.abort();
    };
  }, [details]);

  const fillPeopleOrChar = (data) => {
    return data
      ? data.filter(
          (v, i, a) =>
            a.findIndex(
              (t) => t.attributes.name === v.attributes.name || t.id === v.id
            ) === i
        )
      : undefined;
  };

  const loadCharList = (page) => {
    if (details) {
      if (visibleChar) setLoadingChar(true);
      setTimeout(() => {
        AnimeService.getCharacter(details.data[0].id, page)
          .then((res) => {
            const newPage = page + 20;
            if (res.length === 0) setNoData(true);

            const newChar = char.concat(res);
            setChar(newChar);
            setPage(newPage);
          })
          .catch(() => {
            setCharErr("Maaf Karakter Tidak Ada");
          })
          .finally(() => {
            setLoadingChar(false);
          });
      }, 1500);
    }
  };

  const moreChar = () => {
    if (!noData) {
      loadCharList(page);
    }
  };
  // const { gameIsFavorite, addToFavorite } = useContext(FavoritesContext);

  // console.log(anime.data[0].attributes.youtubeVideoId);
  return (
    <section className={styles.detail}>
      {loading && <Spinner />}
      {err && <p>{err}</p>}
      {details && (
        <>
          <div className={styles.wrapper_thumb}>
            <img
              className={styles.thumbnail}
              src={
                details.data[0].attributes.coverImage &&
                details.data[0].attributes.coverImage.original
              }
              alt={details.data[0].attributes.titles.en}
              style={{
                height: details.data[0].attributes.coverImage
                  ? `${details.data[0].attributes.coverImage.meta.dimensions.small.height}px`
                  : "800px",
              }}
            />
          </div>
          <div className={styles.content}>
            <div className={styles.data}>
              <h1 className={styles.title}>
                {details.data[0].attributes.titles.en ||
                  (details.data[0].attributes.titles.en_jp &&
                    details.data[0].attributes.titles.en_jp)}
              </h1>
              <span>
                {details.data[0].attributes.subtype} |{" "}
                {details.data[0].attributes.ageRatingGuide} |{" "}
                {Year(details.data[0].attributes.startDate)}
              </span>
              <div className={styles.genres}>
                {details.included.map((genre) => (
                  <a
                    key={genre.id}
                    href={`/details/genre/${genre.attributes.slug}`}
                    className={styles.genre}
                  >
                    {genre.attributes.title}
                  </a>
                ))}
              </div>
              <article>{details.data[0].attributes.description}</article>
              <div className={styles.characters}>
                {visibleChar && <Character char={fillPeopleOrChar(char)} />}
                {charErr ? (
                  <p>{charErr}</p>
                ) : (
                  <div className={styles.btnWrapper}>
                    <button
                      className={styles.moreBtn}
                      onClick={
                        !visibleChar
                          ? () => setVisibleChar(true)
                          : () => moreChar()
                      }
                    >
                      Character
                    </button>
                    {loadingChar && <Spinner />}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
        //  {parse(details.data[0].attributes.) ||
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
