// styles
import styles from "./TrendingList.module.css";
import { useState, useEffect } from "react";
import TrendingItem from "./TrendingItem";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const TrendingList = ({ items }) => {
  // const [genres, setGenres] = useState([]);

  // console.log(items);
  // console.log(genres);

  // const fetchPost = async () => {
  //   const response = await fetch(
  //     `${process.env.REACT_APP_API_URL_ANIME}${anime.relationships.genres.links.related}`
  //   );
  //   const resData = await response.json();
  //   //update the state
  //   setGenres(resData.data);
  // };
  // useEffect(() => {
  //   fetchPost();
  // }, []);
  return (
    <div className={styles.container}>
      <button className="btn-left">
        <FiChevronLeft className="icon" />
      </button>
      {items.map((anime) => (
        <TrendingItem key={anime.id} anime={anime} />
      ))}
      <button className="btn-right">
        <FiChevronRight className="icon" />
      </button>
    </div>
  );
};

export default TrendingList;
