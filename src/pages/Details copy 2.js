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
  // console.log(details.data[0].id);

  // Character
  const [char, setChar] = useState({});
  // const [people, setPeople] = useState([]);
  const [page, setPage] = useState(0);
  const [noData, setNoData] = useState(false);
  const [loadingChar, setLoadingChar] = useState(false);
  // details && console.log(details.data[0].id);

  // const {
  //   res: anime,
  //   isPending: animePending,
  //   error: animeErr,
  // } = useFetch(
  //   `${process.env.REACT_APP_API_URL_ANIME}/anime?filter[slug]=${slug}&include=categories,characters`
  // );

  // console.log(anime);
  // const ok =
  //   "https://kitsu.io/api/edge/castings?filter[media_type]=Anime&filter[media_id]=7442&filter[is_character]=true&filter[language]=Japanese&include=character,person&sort=-featured";

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

  console.log(char);

  const fillPeopleOrChar = (data, value) => {
    // return relasi.type === "people";
    return data.filter((relasi) => relasi.type === value);
  };

  const loadCharList = (page) => {
    if (details) {
      setLoadingChar(true);
      setTimeout(() => {
        AnimeService.getCharacter(details.data[0].id, page)
          .then((res) => {
            const newPage = page + 20;
            // console.log(res);
            const filChar = fillPeopleOrChar(res.included, "characters");
            const filPer = fillPeopleOrChar(res.included, "people");
            // console.log(filPer);
            // var newChar = res.data.map((e, i) => {
            //   let objNew = {
            //     ...e,
            //     relationships: {
            //       character: { data: {} },
            //       person: { data: {} },
            //     },
            //   };
            //   // objNew.relationships.person.data = 1;
            //   console.log(objNew);
            //   if (res.included[i].type === "characters") {
            //     for (var j = 0; j < filChar.length; j++) {
            //       // return filChar[i];
            //       // console.log(j, i);
            //       if (filChar[j].id === e.relationships.character.data.id) {
            //         return (objNew.relationships.character.data = filChar[j]);
            //       }
            //     }
            //   }

            //   if (res.included[i].type === "people") {
            //     for (var k = 0; k < filPer.length; k++) {
            //       if (filPer[k].id === e.relationships.person.data.id) {
            //         return (objNew.relationships.person.data = filPer[k]);
            //       }
            //     }
            //   }

            //   // break;
            //   // console.log(objNew);
            //   // console.log(objNew);

            //   // res.included.forEach((f) => {
            //   //   if (
            //   //     e.relationships.character.data.id === f.id &&
            //   //     e.relationships.character.data.type === f.type
            //   //   ) {
            //   //     return console.log({
            //   //       ...e,
            //   //       relationships: {
            //   //         // person: { data: f },
            //   //         character: { data: f },
            //   //       },
            //   //     });
            //   //   } else {
            //   //     return console.log({
            //   //       ...e,
            //   //       relationships: {
            //   //         person: { data: f },
            //   //         character: {
            //   //           data: { ...e.relationships.character.data },
            //   //         },
            //   //       },
            //   //     });
            //   //   }
            //   //   // return e;
            //   // });
            //   // const newObj = {};
            //   // for (let f of res.included) {
            //   //   console.log(f);
            //   //   if (e.relationships.character.data.id === f.id) {
            //   //     return {
            //   //       ...e,
            //   //     };
            //   //   } else {
            //   //     return {
            //   //       ...e,
            //   //       relationships: {
            //   //         person: { data: f },
            //   //         character: { data: f },
            //   //       },
            //   //     };
            //   //   }
            //   // }
            //   // console.log(e);
            //   return objNew;
            // });
            // console.log(newChar);
            // setChar(res.data);

            // setPeople(newPeople);
            var newChar = res.data.map((v, i) => {
              let objNew = {
                ...v,
                relationships: {
                  character: { data: {} },
                  person: { data: {} },
                },
              };
              console.log(i);
              res.data.forEach((a) => {
                console.log(a);
                for (var j = 0; j < filChar.length; j++) {
                  if (filChar[j].id === a.relationships.character.data.id) {
                    return (objNew.relationships.character.data = filChar[j]);
                  }
                }
              });
              res.data.forEach((b) => {
                for (var k = 0; k < filPer.length; k++) {
                  if (filPer[k].id === b.relationships.person.data.id) {
                    return (objNew.relationships.person.data = filPer[k]);
                  }
                }
              });
              return objNew;
            });
            console.log(newChar);
            setPage(newPage);
            if (res.length === 0) setNoData(true);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setLoadingChar(false);
          });
      }, 1500);
    }
  };

  // console.log(char);
  // console.log(people);

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
              {/* <p>Propblem Pending Oke Genres</p> */}
              {/* <Genres
                genres={details.data[0].relationships.categories.links.related}
              /> */}
              {/* <div className={styles.genres}>
                {details.included.map((genre) => (
                  <a
                    key={genre.id}
                    href={`/details/genre/${genre.attributes.slug}`}
                    className={styles.genre}
                  >
                    {genre.attributes.title}
                  </a>
                ))}
                
              </div> */}
              {/* <span>
                {" "}
                {details.data[0].relationships.categories.links.related}{" "}
              </span> */}
              {/* <span>Start Date{details.data[0].attributes.startDate}</span> */}
              {/* <div className={styles.genres}>
                {details.included
                  .filter((relasi) => relasi.type === "categories")
                  .map((genre) => (
                    <a
                      key={genre.id}
                      href={`/details/genre/${genre.attributes.slug}`}
                      className={styles.genre}
                    >
                      {genre.attributes.title}
                    </a>
                  ))}
              </div> */}

              {/* {pendingGenres && <Spinner />}
              {genredetailsErr && <p>{genredetailsErr}</p>} */}
              {/* <p>{details.data[0].relationships.categories.links.related}</p> */}

              {/* <iframe
                width="420"
                height="315"
                src={`https://www.youtube.com/embed/${details.data[0].attributes.youtubeVideoId}`}
              ></iframe> */}
              <article>{details.data[0].attributes.description}</article>
              <div className={styles.genres}>
                <button
                  // href={`/details/genre/${kederCuk.attributes.role}`}
                  className={styles.ok}
                  onClick={() => moreChar()}
                >
                  Character
                </button>
                <p>{details.data[0].id}</p>
                {/* <Character char={char} people={people} /> */}
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
