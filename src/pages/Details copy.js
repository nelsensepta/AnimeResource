// import { useContext, useState, useEffect } from "react";
// import { useParams } from "react-router";
// import { AiFillHeart, AiFillWindows } from "react-icons/ai";
// import { GoBrowser } from "react-icons/go";
// import { useFetch } from "../hooks/useFetch";
// import { FavoritesContext } from "../context/FavoritesContext";
// import parse from "html-react-parser";
// import AnimeService from "../services/AnimeService";

// // styles
// import styles from "./Details.module.css";
// import Spinner from "../components/ui/Spinner";
// // import Layout from "../components/layout/Layout";
// import { Year } from "../lib/Lib";
// import Genres from "../components/genres/Genres";

// const Details = () => {
//   const { slug } = useParams();
//   const [genres, setGenres] = useState();
//   const [loading, setLoading] = useState();
//   const [detail, setDetail] = useState();
//   const [err, setErr] = useState("");

//   console.log(genres);

//   const {
//     res: anime,
//     isPending: animePending,
//     error: animeErr,
//   } = useFetch(
//     `${process.env.REACT_APP_API_URL_ANIME}/anime?filter[slug]=${slug}&include=categories`
//   );
//   console.log(anime);
//   // try {
//   //   const {
//   //     res: genreAnime,
//   //     isPending: genreAnimePending,
//   //     error: genreAnimeErr,
//   //   } = useFetch(`${anime.data[0].relationships.categories.links.related}`);
//   // } catch (error) {}

//   // console.log(anime);

//   // console.log(animePending);
//   // console.log(anime);
//   // if (animePending === false && anime !== null) {
//   //   console.log("ok");
//   //   console.log(anime.data[0].relationships.categories.links.related);
//   // }
//   // console.log(detail);

//   // try {
//   //   fetch(anime.data[0].relationships.categories.links.related)
//   //     .then((res) => res.json())
//   //     .then((resJson) => console.log(resJson));
//   // } catch (error) {
//   //   // setErr(`${error}`);
//   //   // throw error;
//   //   console.log("ok");
//   // }

//   // useEffect(() => {
//   //   let abortController = new AbortController();
//   //   if (anime !== null && animePending === false) {
//   //     console.log("Masuk");
//   //     console.log(anime.data[0]);
//   //     setLoading(true);
//   //     if (!abortController.signal.aborted) {
//   //       setTimeout(() => {
//   //         AnimeService.getGenres(
//   //           // "https://kitsu.io/api/edge/anime/44081/categories"
//   //           anime.data[0].relationships.categories.links.related
//   //         )
//   //           .then((data) => setGenres(data))
//   //           .catch((error) => setErr(`${error}`))
//   //           .finally(() => {
//   //             setLoading(false);
//   //           });
//   //       }, 500);
//   //     }
//   //   } else {
//   //     setLoading(false);
//   //   }
//   //   return () => {
//   //     abortController.abort();
//   //   };
//   // }, [genres]);

//   // const { gameIsFavorite, addToFavorite } = useContext(FavoritesContext);

//   // console.log(anime.data[0].attributes.youtubeVideoId);
//   return (
//    <>
//       {animePending && <Spinner />}
//       {animeErr && <p>{animeErr}</p>}
//       {anime && (
//         <section className={styles.detail}>
//           <div>
//             <div className={styles.wrapper_thumb}>
//               <img
//                 className={styles.thumbnail}
//                 src={
//                   anime.data[0].attributes.coverImage &&
//                   anime.data[0].attributes.coverImage.original
//                 }
//                 alt={anime.data[0].attributes.titles.en}
//                 style={{
//                   height: anime.data[0].attributes.coverImage
//                     ? `${anime.data[0].attributes.coverImage.meta.dimensions.small.height}px`
//                     : "800px",
//                 }}
//               />
//             </div>
//             <div className={styles.nav}>
//               <ul>
//                 <li>ok</li>
//                 <li>ok</li>
//                 <li>ok</li>
//                 <li>ok</li>
//                 <li>ok</li>
//                 <li>ok</li>
//                 <li>ok</li>
//                 <li>ok</li>
//                 <li>ok</li>
//                 <li>ok</li>
//                 <li>ok</li>
//                 <li>ok</li>
//                 <li>ok</li>
//               </ul>
//             </div>
//           </div>
//           <div className={styles.content_body}>
//             <div className={styles.data}>
//               <h1 className={styles.title}>
//                 {anime.data[0].attributes.titles.en ||
//                   (anime.data[0].attributes.titles.en_jp &&
//                     anime.data[0].attributes.titles.en_jp)}
//               </h1>
//               <span>
//                 {anime.data[0].attributes.subtype} |{" "}
//                 {anime.data[0].attributes.ageRatingGuide} |{" "}
//                 {Year(anime.data[0].attributes.startDate)}
//               </span>
//               {/* <p>Propblem Pending Oke Genres</p> */}
//               {/* <Genres
//                 genres={anime.data[0].relationships.categories.links.related}
//               /> */}
//               <div className={styles.genres}>
//                 {anime.included.map((genre) => (
//                   <a
//                     key={genre.id}
//                     href={`/anime/genre/${genre.attributes.slug}`}
//                     className={styles.genre}
//                   >
//                     {genre.attributes.title}
//                   </a>
//                 ))}
//               </div>

//               {/* {pendingGenres && <Spinner />}
//               {genreAnimeErr && <p>{genreAnimeErr}</p>} */}
//               {/* <p>{anime.data[0].relationships.categories.links.related}</p> */}

//               {/* <iframe
//                 width="420"
//                 height="315"
//                 src={`https://www.youtube.com/embed/${anime.data[0].attributes.youtubeVideoId}`}
//               ></iframe> */}

//               {/* <span>
//                 {" "}
//                 {anime.data[0].relationships.categories.links.related}{" "}
//               </span> */}
//               {/* <span>Start Date{anime.data[0].attributes.startDate}</span> */}
//               <article>{anime.data[0].attributes.description}</article>
//             </div>
//           </div>
//         </>
//         //  {parse(anime.data[0].attributes.) ||
//         //   (anime.data.descriptions.it && parse(anime.data.descriptions.it))}

//         // {/* {parse(anime.data.descriptions.en)} */}

//         // {/* <h3>Additional Information</h3>
//         // <ul className={styles.info_list}>
//         //   <li>
//         //     <span className="text-muted">Title</span>
//         //     <p>{anime.title}</p>
//         //   </li>
//         //   <li>
//         //     <span className="text-muted">Developer</span>
//         //     <p>{anime.developer}</p>
//         //   </li>
//         //   <li>
//         //     <span className="text-muted">Publisher</span>
//         //     <p>{anime.publisher}</p>
//         //   </li>
//         //   <li>
//         //     <span className="text-muted">Release Date</span>
//         //     <p>{anime.release_date}</p>
//         //   </li>
//         //   <li>
//         //     <span className="text-muted">Genre</span>
//         //     <p>{anime.genre}</p>
//         //   </li>
//         //   <li>
//         //     <span className="text-muted">Platform</span>
//         //     <div className={styles.platform}>
//         //       {anime.platform === "Windows" ? (
//         //         <AiFillWindows className={styles.platform_icon} />
//         //       ) : (
//         //         <GoBrowser className={styles.platform_icon} />
//         //       )}
//         //       <p>{anime.platform}</p>
//         //     </div>
//         //   </li>
//         // </ul> */}
//         // {/*
//         // {anime?.screenshots && <h3>{anime.title} Screenshots</h3>}
//         // {anime?.screenshots && (
//         //   <div className={styles.screenshot_grid}>
//         //     {anime?.screenshots?.map(({ image }) => (
//         //       <div key={image}>
//         //         <img src={image} alt="" />
//         //       </div>
//         //     ))}
//         //   </div>
//         // )} */}

//         // {/* {anime?.minimum_system_requirements && (
//         //   <h3>Minimum System Requirements (Windows)</h3>
//         // )}
//         // {anime?.minimum_system_requirements && (
//         //   <ul className={styles.info_list}>
//         //     <li>
//         //       <span className="text-muted">OS</span>
//         //       <p>{anime.minimum_system_requirements.os}</p>
//         //     </li>
//         //     <li>
//         //       <span className="text-muted">Processor</span>
//         //       <p>{anime.minimum_system_requirements.processor}</p>
//         //     </li>
//         //     <li>
//         //       <span className="text-muted">Memory</span>
//         //       <p>{anime.minimum_system_requirements.memory}</p>
//         //     </li>
//         //     <li>
//         //       <span className="text-muted">Graphics</span>
//         //       <p>{anime.minimum_system_requirements.graphics}</p>
//         //     </li>
//         //     <li>
//         //       <span className="text-muted">Storage</span>
//         //       <p>{anime.minimum_system_requirements.storage}</p>
//         //     </li>
//         //   </ul>
//         // )} */}

//         // {/* <button
//         //   onClick={() => addToFavorite(anime)}
//         //   className={`btn ${styles.btn_favorite}`}
//         //   title={
//         //     gameIsFavorite(anime.id)
//         //       ? "Remove from favorites"
//         //       : "Add to favorites"
//         //   }
//         // >
//         //   <AiFillHeart
//         //     className={styles.heart_icon}
//         //     color={gameIsFavorite(anime.id) ? "#ff0000" : "#fff"}
//         //   />
//         // </button> */}
//     </section>
//       )}
//       </>
//       </>
//   );
// };

// export default Details;
