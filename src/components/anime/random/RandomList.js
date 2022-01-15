// styles
import styles from "./RandomList.module.css";
import RandomItem from "./RandomItem";
// import AnimeTrending from "../trending/TrendingItem";
import { useState, useEffect } from "react";

const RandomList = ({ items }) => {
  return (
    <div className={styles.grid}>
      {items.map((anime) => (
        <RandomItem key={anime.id} item={anime} />
      ))}
    </div>
  );
};

export default RandomList;
