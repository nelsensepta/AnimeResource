import React from "react";
import styles from "../../../pages/Details.module.css";
import { useFetch } from "../../../hooks/useFetch";
import Spinner from "../../ui/Spinner";
export default function Character({ people, char }) {
  console.log(people);
  console.log(char);
  return (
    <div className={styles.grid}>
      {/* {people.map((anime) => (
        <RandomItem key={anime.id} item={anime} />
      ))} */}
      <p>ok</p>
    </div>
  );
}
